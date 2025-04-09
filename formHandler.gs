
// Form data handling and saving

// Process array fields to string
function processArrayField(field) {
  if (Array.isArray(field) && field.length > 0) {
    return field.join(', ');
  }
  return '';
}

// Process boolean fields
function processBooleanField(field) {
  return field ? 'Yes' : 'No';
}

// Process Aceleradores table data
function processAceleradores(aceleradores) {
  if (Array.isArray(aceleradores) && aceleradores.length > 0) {
    return JSON.stringify(aceleradores);
  }
  return '[]';
}

// Save form data to spreadsheet
function saveCustomerData(formData) {
  try {
    const sheet = getSheet();
    
    // Extract data from form object
    const rowData = [
      formData.customerName || '',
      formData.antiguedad || '',
      formData.tipoLicencia || '',
      formData.cloud || '',
      formData.tallaje || '',
      formData.comments || '',
      formData.phoneNumber || '',
      formData.mobileNumber || '',
      formData.workPhone || '',
      formData.alternativeEmail || '',
      formData.preferredContactMethod || '',
      // Aceleradores data
      processAceleradores(formData.aceleradores),
      // Arquitectura data fields
      processBooleanField(formData.sourcesToDLSDG),
      processArrayField(formData.sourcesToDLTechETL),
      formData.storageDL || '',
      formData.sourcesToDLComments || '',
      processBooleanField(formData.dlToDWHSDG),
      formData.dataModel || '',
      processArrayField(formData.dlToDWHTechETL),
      formData.storageDWH || '',
      formData.dlToDWHComments || '',
      processArrayField(formData.capaExplotacion),
      formData.explotacionDatoComments || '',
      processArrayField(formData.orquestacionTech),
      formData.orquestacionComments || '',
      processArrayField(formData.visualizationTech),
      formData.ratioDashboardsSnowflake || '',
      formData.visualizationComments || '',
      processBooleanField(formData.isDoingSomething),
      processArrayField(formData.advancedAnalyticsTech),
      formData.advancedAnalyticsComments || '',
      processArrayField(formData.governmentTech),
      formData.governmentComments || '',
      
      // Features - Data Integration
      processArrayField(formData.sources),
      processBooleanField(formData.readFromSAP),
      formData.rangeVolumentria || '',
      formData.sourceFormat || '',
      processArrayField(formData.usage),
      formData.specificTableTypes || '',
      
      // Features - Query Processing
      formData.canAdminPlatform || '',
      formData.hasDwhByProcessing || '',
      formData.pushdownOperations || '',
      formData.dynamicScaling || '',
      formData.multiclustering || '',
      
      // Features - ETL
      formData.notebooksUsage || '',
      formData.storedProcedures || '',
      formData.cteUsage || '',
      formData.snowflakeApi || '',
      formData.snowpark || '',
      
      // Features - Data Pipelines
      formData.snowflakeOrchestrator || '',
      formData.kafkaConnector || '',
      formData.snowpipe || '',
      
      // Features - AI ML
      formData.cortexIA || '',
      formData.projectType || '',
      formData.streamlitApps || '',
      formData.snowparkTraining || '',
      formData.developmentPotential || '',
      
      // Features - Disaster Recovery
      formData.environmentReplication || '',
      formData.zeroCopyCloning || '',
      formData.timeTravel || '',
      formData.dataCopyStrategy || '',
      
      // Features - Security
      formData.infraTeamExists || '',
      formData.networkControls || '',
      formData.rolesManagement || '',
      formData.maskingPolicies || '',
      formData.mfaActive || '',
      formData.authPolicies || '',
      formData.serviceUsersAuth || '',
      formData.encryptionMeasures || ''
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    return {
      success: true,
      message: 'Customer data saved successfully!'
    };
  } catch(error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}
