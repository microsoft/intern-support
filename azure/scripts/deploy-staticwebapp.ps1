# Deploy Static Web App infrastructure to Azure
param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroup,

    [string]$AppName,
    [string]$Location,
    [string]$SkuName,
    [string]$CustomDomain
)

$ErrorActionPreference = "Stop"

$templateFile = Join-Path (Join-Path $PSScriptRoot "..") (Join-Path "bicep" "staticwebapp.bicep")
if (-not (Test-Path $templateFile)) {
    Write-Error "staticwebapp.bicep not found in azure/"
    exit 1
}

$params = @()
if ($AppName) { $params += "appName=$AppName" }
if ($Location) { $params += "location=$Location" }
if ($SkuName) { $params += "skuName=$SkuName" }
if ($CustomDomain) { $params += "customDomain=$CustomDomain" }

Write-Host "Deploying Static Web App to resource group '$ResourceGroup'..." -ForegroundColor Cyan

if ($params.Count -gt 0) {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile --parameters $params
} else {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile
}

if ($LASTEXITCODE -ne 0) { Write-Error "Deployment failed"; exit 1 }
Write-Host "Deployed successfully." -ForegroundColor Green
