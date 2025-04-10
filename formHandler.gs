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
function saveCustomerData(formData, isEditing = false) {
  try {
    // Main customer sheet data
    const mainSheetData = saveMainCustomerData(formData, isEditing);
    
    // Save to separate sheets
    saveArquitecturaData(formData, isEditing);
    saveFeaturesData(formData, isEditing);
    saveAceleradoresData(formData, isEditing);
    saveContactData(formData, isEditing);
    
    return {
      success: true,
      message: isEditing ? 'Customer data updated successfully!' : 'Customer data saved successfully!'
    };
  } catch(error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

// Save to main CustomerData sheet
function saveMainCustomerData(formData, isEditing) {
  const sheet = getSheet('CustomerData');
  const customerName = formData.customerName || '';
  
  // Main sheet only stores basic customer info and references
  const rowData = [
    customerName,
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
    // Aceleradores data (JSON string)
    processAceleradores(formData.aceleradores),
    // Created/Modified dates
    new Date(),
    new Date()
  ];
  
  // If editing, update the existing row
  if (isEditing) {
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Find the row with the customer name
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === customerName) {
        // Keep original created date
        rowData[12] = values[i][12]; 
        
        // Update the row
        const rowRange = sheet.getRange(i + 1, 1, 1, rowData.length);
        rowRange.setValues([rowData]);
        return rowData;
      }
    }
    
    // If we get here, customer wasn't found, so add as new
    sheet.appendRow(rowData);
    return rowData;
  } else {
    // Add new customer
    sheet.appendRow(rowData);
    return rowData;
  }
}

// Save Arquitectura data to ArquitecturaData sheet
function saveArquitecturaData(formData, isEditing) {
  const sheet = getSheet('ArquitecturaData');
  const customerName = formData.customerName || '';
  
  // Arquitectura data fields
  const rowData = [
    customerName,
    formData.antiguedad || '',
    formData.tipoLicencia || '',
    formData.cloud || '',
    formData.tallaje || '',
    formData.comments || '',
    // Data ingestion fields
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
    formData.governmentComments || ''
  ];
  
  // Handle update or insert
  return saveOrUpdateRow(sheet, 0, customerName, rowData, isEditing);
}

// Save Features data to FeaturesData sheet
function saveFeaturesData(formData, isEditing) {
  const sheet = getSheet('FeaturesData');
  const customerName = formData.customerName || '';
  
  // Features data fields
  const rowData = [
    customerName,
    // Data Integration
    processArrayField(formData.sources),
    processBooleanField(formData.readFromSAP),
    formData.rangeVolumentria || '',
    formData.sourceFormat || '',
    processArrayField(formData.usage),
    formData.specificTableTypes || '',
    // Query Processing
    formData.canAdminPlatform || '',
    formData.hasDwhByProcessing || '',
    formData.pushdownOperations || '',
    formData.dynamicScaling || '',
    formData.multiclustering || '',
    // ETL
    formData.notebooksUsage || '',
    formData.storedProcedures || '',
    formData.cteUsage || '',
    formData.snowflakeApi || '',
    formData.snowpark || '',
    // Data Pipelines
    formData.snowflakeOrchestrator || '',
    formData.kafkaConnector || '',
    formData.snowpipe || '',
    // AI ML
    formData.cortexIA || '',
    formData.projectType || '',
    formData.streamlitApps || '',
    formData.snowparkTraining || '',
    formData.developmentPotential || '',
    // Disaster Recovery
    formData.environmentReplication || '',
    formData.zeroCopyCloning || '',
    formData.timeTravel || '',
    formData.dataCopyStrategy || '',
    // Security
    formData.infraTeamExists || '',
    formData.networkControls || '',
    formData.rolesManagement || '',
    formData.maskingPolicies || '',
    formData.mfaActive || '',
    formData.authPolicies || '',
    formData.serviceUsersAuth || '',
    formData.encryptionMeasures || ''
  ];
  
  // Handle update or insert
  return saveOrUpdateRow(sheet, 0, customerName, rowData, isEditing);
}

// Save Contact data to ContactData sheet
function saveContactData(formData, isEditing) {
  const sheet = getSheet('ContactData');
  const customerName = formData.customerName || '';
  
  // Contact data fields
  const rowData = [
    customerName,
    formData.phoneNumber || '',
    formData.mobileNumber || '',
    formData.workPhone || '',
    formData.alternativeEmail || '',
    formData.preferredContactMethod || '',
    // Address Info
    formData.streetAddress || '',
    formData.city || '',
    formData.state || '',
    formData.postalCode || '',
    formData.country || '',
    formData.addressType || '',
    processBooleanField(formData.billingAddressSame),
    formData.billingStreet || '',
    formData.billingCity || '',
    formData.billingState || '',
    formData.billingPostalCode || '',
    formData.billingCountry || '',
    // Preferences
    formData.preferredLanguage || '',
    formData.communicationFrequency || '',
    processBooleanField(formData.subscribeNewsletter),
    processBooleanField(formData.marketingConsent),
    formData.preferredPaymentMethod || '',
    formData.creditLimit || '',
    formData.currency || '',
    formData.timezone || '',
    formData.accountType || '',
    formData.tags || ''
  ];
  
  // Handle update or insert
  return saveOrUpdateRow(sheet, 0, customerName, rowData, isEditing);
}

// Save Aceleradores data to AceleradoresData sheet
function saveAceleradoresData(formData, isEditing) {
  // First, if editing, delete any existing rows for this customer
  if (isEditing) {
    deleteCustomerAceleradores(formData.customerName);
  }
  
  // If no aceleradores, return early
  if (!formData.aceleradores || !Array.isArray(formData.aceleradores) || formData.aceleradores.length === 0) {
    return;
  }
  
  const sheet = getSheet('AceleradoresData');
  const customerName = formData.customerName || '';
  
  // Add each acelerador as a separate row
  formData.aceleradores.forEach(function(acelerador) {
    const rowData = [
      customerName,
      acelerador.artefacto || '',
      acelerador.objetivo || '',
      acelerador.desarrollo || '',
      processArrayField(acelerador.technologyBase),
      processArrayField(acelerador.technology),
      processBooleanField(acelerador.dataIngestion),
      processBooleanField(acelerador.dataTransformation),
      processBooleanField(acelerador.monitoring),
      processBooleanField(acelerador.securitization),
      processBooleanField(acelerador.dataModeling),
      processBooleanField(acelerador.mlops),
      processBooleanField(acelerador.cicd)
    ];
    
    // Always append as we already deleted the existing ones
    sheet.appendRow(rowData);
  });
}

// Delete all aceleradores for a customer
function deleteCustomerAceleradores(customerName) {
  const sheet = getSheet('AceleradoresData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find all rows with this customer name, from bottom to top to avoid shifting issues
  const rowsToDelete = [];
  for (let i = values.length - 1; i >= 1; i--) { // Start at 1 to skip header
    if (values[i][0] === customerName) {
      rowsToDelete.push(i + 1); // +1 because sheet is 1-indexed
    }
  }
  
  // Delete each row
  rowsToDelete.forEach(function(rowIndex) {
    sheet.deleteRow(rowIndex);
  });
}

// Helper function to save or update a row based on a key column
function saveOrUpdateRow(sheet, keyColumnIndex, keyValue, rowData, isEditing) {
  if (isEditing) {
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Find the row with the key value
    for (let i = 1; i < values.length; i++) { // Start at 1 to skip header
      if (values[i][keyColumnIndex] === keyValue) {
        // Update the row
        const rowRange = sheet.getRange(i + 1, 1, 1, rowData.length);
        rowRange.setValues([rowData]);
        return rowData;
      }
    }
  }
  
  // If not editing or row not found, append a new row
  sheet.appendRow(rowData);
  return rowData;
}
