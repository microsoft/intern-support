# Deploy server to Azure App Service
param(
    [string]$AppName = 'intern-support-server',
    [string]$ResourceGroup = 'shadow-me-interns'
)

$ErrorActionPreference = "Stop"

$serverDir = Join-Path (Join-Path $PSScriptRoot "..\..") "server"
if (-not (Test-Path $serverDir)) {
    Write-Error "server/ directory not found"
    exit 1
}

Push-Location $serverDir

# Build
Write-Host "Building server..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; Pop-Location; exit 1 }

# Install production deps only into a staging folder
$stagingDir = Join-Path $env:TEMP "intern-support-server-staging"
if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }
New-Item -ItemType Directory -Path $stagingDir | Out-Null

Write-Host "Preparing deployment package..." -ForegroundColor Cyan
Copy-Item -Path "dist" -Destination "$stagingDir\dist" -Recurse
Copy-Item -Path "package.json" -Destination "$stagingDir\"
Copy-Item -Path "package-lock.json" -Destination "$stagingDir\"

Push-Location $stagingDir
npm ci --omit=dev
if ($LASTEXITCODE -ne 0) { Write-Error "npm ci failed"; Pop-Location; Pop-Location; exit 1 }
Pop-Location

# Create zip using .NET (Kudu-compatible)
$zipPath = Join-Path $env:TEMP "intern-support-server.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath }

Write-Host "Packaging server..." -ForegroundColor Cyan
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stagingDir, $zipPath)

# Deploy
Write-Host "Deploying to App Service '$AppName'..." -ForegroundColor Cyan
az webapp deploy --resource-group $ResourceGroup --name $AppName --src-path $zipPath --type zip --async true
if ($LASTEXITCODE -ne 0) { Write-Error "Deployment failed"; Pop-Location; exit 1 }

Pop-Location
Remove-Item $zipPath -ErrorAction SilentlyContinue
Remove-Item $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Deployed successfully." -ForegroundColor Green
Write-Host "Deployed successfully." -ForegroundColor Green
