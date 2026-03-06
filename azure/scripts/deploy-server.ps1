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

# Create zip for deployment (exclude dev files)
$zipPath = Join-Path $env:TEMP "intern-support-server.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath }

Write-Host "Packaging server..." -ForegroundColor Cyan
Compress-Archive -Path "dist", "package.json", "package-lock.json", ".deployment" -DestinationPath $zipPath

# Deploy
Write-Host "Deploying to App Service '$AppName'..." -ForegroundColor Cyan
az webapp deploy --resource-group $ResourceGroup --name $AppName --src-path $zipPath --type zip
if ($LASTEXITCODE -ne 0) { Write-Error "Deployment failed"; Pop-Location; exit 1 }

Pop-Location
Remove-Item $zipPath -ErrorAction SilentlyContinue
Write-Host "Deployed successfully." -ForegroundColor Green
