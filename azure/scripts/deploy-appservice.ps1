# Deploy App Service infrastructure to Azure
param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroup,

    [string]$AppName,
    [string]$Location,
    [string]$Sku,
    [string]$LinuxFxVersion
)

$ErrorActionPreference = "Stop"

$templateFile = Join-Path (Join-Path $PSScriptRoot "..") (Join-Path "bicep" "appservice.bicep")
if (-not (Test-Path $templateFile)) {
    Write-Error "appservice.bicep not found in azure/"
    exit 1
}

$params = @()
if ($AppName) { $params += "appName=$AppName" }
if ($Location) { $params += "location=$Location" }
if ($Sku) { $params += "sku=$Sku" }
if ($LinuxFxVersion) { $params += "linuxFxVersion=$LinuxFxVersion" }

Write-Host "Deploying App Service to resource group '$ResourceGroup'..." -ForegroundColor Cyan

if ($params.Count -gt 0) {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile --parameters $params
} else {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile
}

if ($LASTEXITCODE -ne 0) { Write-Error "Deployment failed"; exit 1 }
Write-Host "Deployed successfully." -ForegroundColor Green
