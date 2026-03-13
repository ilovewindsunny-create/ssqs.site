param(
  [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$OutputDir = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
  $OutputDir = Join-Path $ProjectRoot "release"
}

$items = @(
  "app",
  "public",
  "deploy",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
  "DEPLOY.md"
)

New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

$paths = $items | ForEach-Object { Join-Path $ProjectRoot $_ }
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archivePath = Join-Path $OutputDir "ssqs-deploy-$timestamp.zip"

Compress-Archive -Path $paths -DestinationPath $archivePath -Force

Write-Output $archivePath
