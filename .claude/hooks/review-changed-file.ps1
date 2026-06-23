#Requires -Version 5.1
<#
.SYNOPSIS
  Code-review hook: review a changed source file with the read-only
  `code-reviewer` subagent and append the review to .claude/reviews/.

.DESCRIPTION
  Shared by two hooks: PostToolUse(Write|Edit) (fires on Claude's own edits)
  and FileChanged (fires on external/on-disk edits). Reads the hook payload
  (JSON) from stdin, extracts the changed file path, filters out noise
  (dependencies, build output, VCS, our own artifacts) and non-source files,
  then runs the reviewer headlessly:

      claude -p "<prompt>" --agent code-reviewer

  The `code-reviewer` agent is restricted to read-only tools (Read/Grep/Glob),
  so it can never edit a file and re-trigger this hook — there is no
  review -> edit -> review loop. The script always exits 0 so a review never
  blocks the session, and it is intended to be run async (see settings).
#>

# Read-only by nature; keep going on non-fatal errors so a review never blocks.
$ErrorActionPreference = 'Continue'

# --- 1. Read the hook payload from stdin --------------------------------------
$raw = [Console]::In.ReadToEnd()
if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }

try { $payload = $raw | ConvertFrom-Json -ErrorAction Stop } catch { exit 0 }

# The changed-file path lives in a different field per event:
#   FileChanged             -> .file_path
#   PostToolUse(Write|Edit) -> .tool_input.file_path
$file = $payload.file_path
if ([string]::IsNullOrWhiteSpace($file)) { $file = $payload.tool_input.file_path }
if ([string]::IsNullOrWhiteSpace($file)) { exit 0 }

# --- 2. Skip deleted / missing files ------------------------------------------
if (-not (Test-Path -LiteralPath $file)) { exit 0 }

# --- 3. Ignore dependencies, build output, VCS, and our own artifacts ---------
#        (.claude is excluded so writing the review log never loops back here.)
if ($file -match '[\\/](node_modules|dist|\.git|\.astro|\.claude)[\\/]') { exit 0 }

# --- 4. Only review real source files -----------------------------------------
$ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
$allowed = @('.astro', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.json')
if ($allowed -notcontains $ext) { exit 0 }

# --- 5. Prepare the review log ------------------------------------------------
$reviewsDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'reviews'
if (-not (Test-Path $reviewsDir)) {
  New-Item -ItemType Directory -Path $reviewsDir -Force | Out-Null
}

$name  = [System.IO.Path]::GetFileName($file)
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss-fff'
$log   = Join-Path $reviewsDir "$stamp-$name.md"

# --- 6. Run the read-only reviewer headlessly ---------------------------------
$prompt = "Review the changed file at this absolute path: `"$file`". " +
          'Read it in full and follow your review rubric. Be concise and ' +
          'prioritized. If there are no substantive issues, say so in one line.'

$header = @(
  "# Code review - $name",
  '',
  "- File: ``$file``",
  "- Generated: $stamp",
  ''
) -join "`r`n"

try {
  # Pipe $null so `claude -p` does not wait ~3s for piped stdin.
  $review = $null | claude -p $prompt --agent code-reviewer | Out-String
  if ([string]::IsNullOrWhiteSpace($review)) {
    $review = '_(reviewer returned no output)_'
  }
} catch {
  $review = "Review failed to run: $($_.Exception.Message)"
}

Set-Content -LiteralPath $log -Value ($header + $review) -Encoding UTF8
exit 0
