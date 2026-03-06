param appName string = 'intern-support-client'
param location string = 'West Europe'
param skuName string = 'Standard'
param customDomain string = 'intern.support'

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: appName
  location: location
  tags: {
    SecurityControl: 'Ignore'
  }
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'SwaCli'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource basicAuth 'Microsoft.Web/staticSites/basicAuth@2024-04-01' = {
  parent: staticWebApp
  name: 'default'
  properties: {
    applicableEnvironmentsMode: 'SpecifiedEnvironments'
  }
}

resource domain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = {
  parent: staticWebApp
  name: customDomain
  properties: {}
}
