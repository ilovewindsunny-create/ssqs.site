param(
  [string]$SourceRoot = "D:\ssqs\siqse-lab-website",
  [string]$PreviewRoot = "D:\ssqs\siqse-preview-local"
)

$ErrorActionPreference = "Stop"

$script:topLevelFiles = @(
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "next-env.d.ts"
)

function Ensure-ParentDirectory([string]$path) {
  $parent = Split-Path -Parent $path
  if ($parent -and -not (Test-Path $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }
}

function Get-RelativePath([string]$fullPath) {
  return $fullPath.Substring($SourceRoot.Length).TrimStart("\")
}

function Copy-ChangedFile([string]$fullPath) {
  if (-not $fullPath.StartsWith($SourceRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    return
  }

  $relative = Get-RelativePath $fullPath
  if ([string]::IsNullOrWhiteSpace($relative)) {
    return
  }

  $targetPath = Join-Path $PreviewRoot $relative

  if (Test-Path $fullPath -PathType Leaf) {
    Ensure-ParentDirectory $targetPath
    Copy-Item -Path $fullPath -Destination $targetPath -Force
  } elseif (Test-Path $targetPath) {
    Remove-Item -Path $targetPath -Force -Recurse -ErrorAction SilentlyContinue
  }
}

function Remove-ChangedPath([string]$fullPath) {
  if (-not $fullPath.StartsWith($SourceRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    return
  }

  $relative = Get-RelativePath $fullPath
  if ([string]::IsNullOrWhiteSpace($relative)) {
    return
  }

  $targetPath = Join-Path $PreviewRoot $relative
  if (Test-Path $targetPath) {
    Remove-Item -Path $targetPath -Force -Recurse -ErrorAction SilentlyContinue
  }
}

function Sync-Directory([string]$relativePath) {
  $source = Join-Path $SourceRoot $relativePath
  $target = Join-Path $PreviewRoot $relativePath
  New-Item -ItemType Directory -Path $target -Force | Out-Null
  $null = robocopy $source $target /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS /NP
  if ($LASTEXITCODE -gt 7) {
    throw "robocopy failed for $relativePath with exit code $LASTEXITCODE"
  }
}

function Sync-TopLevelFiles {
  foreach ($file in $script:topLevelFiles) {
    $sourcePath = Join-Path $SourceRoot $file
    $targetPath = Join-Path $PreviewRoot $file
    Ensure-ParentDirectory $targetPath
    Copy-Item -Path $sourcePath -Destination $targetPath -Force
  }
}

Sync-Directory "app"
Sync-Directory "public"
Sync-TopLevelFiles

Write-Host "Watching $SourceRoot and mirroring app/public/config changes to $PreviewRoot"

while ($true) {
  Sync-Directory "app"
  Sync-Directory "public"
  Sync-TopLevelFiles
  Start-Sleep -Seconds 2
}
