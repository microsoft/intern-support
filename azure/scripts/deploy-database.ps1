# Deploy Cosmos DB infrastructure to Azure
param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroup,

    [string]$AccountName,
    [string]$Location,
    [string]$DatabaseName,
    [string]$ContainerName,
    [int]$MaxThroughput
)

$ErrorActionPreference = "Stop"

$templateFile = Join-Path (Join-Path $PSScriptRoot "..") (Join-Path "bicep" "database.bicep")
if (-not (Test-Path $templateFile)) {
    Write-Error "database.bicep not found in azure/"
    exit 1
}

$params = @()
if ($AccountName) { $params += "accountName=$AccountName" }
if ($Location) { $params += "location=$Location" }
if ($DatabaseName) { $params += "databaseName=$DatabaseName" }
if ($ContainerName) { $params += "containerName=$ContainerName" }
if ($MaxThroughput) { $params += "maxThroughput=$MaxThroughput" }

Write-Host "Deploying Cosmos DB to resource group '$ResourceGroup'..." -ForegroundColor Cyan

if ($params.Count -gt 0) {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile --parameters $params
} else {
    az deployment group create --resource-group $ResourceGroup --template-file $templateFile
}

if ($LASTEXITCODE -ne 0) { Write-Error "Deployment failed"; exit 1 }
Write-Host "Deployed successfully." -ForegroundColor Green
