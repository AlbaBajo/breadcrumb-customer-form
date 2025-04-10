/**
 * Process array fields to string
 * @param {Array|any} field - The field to process
 * @returns {string} The processed field as a string
 */
function processArrayField(field) {
  if (Array.isArray(field) && field.length > 0) {
    return field.join(', ');
  }
  return '';
}

/**
 * Process boolean fields to Yes/No string
 * @param {boolean|any} field - The field to process
 * @returns {string} "Yes" if true, "No" if false
 */
function processBooleanField(field) {
  return field ? 'Yes' : 'No';
}

/**
 * Process Aceleradores table data to JSON string
 * @param {Array|any} aceleradores - The aceleradores data
 * @returns {string} JSON string representation of the aceleradores
 */
function processAceleradores(aceleradores) {
  if (Array.isArray(aceleradores) && aceleradores.length > 0) {
    return JSON.stringify(aceleradores);
  }
  return '[]';
}

/**
 * Save customer data to spreadsheet
 * Main entry point for saving form data
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Object} Response object with success status and message
 */
function saveCustomerDataToSheets(formData, isEditing = false) {
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

/**
 * Save to main CustomerData sheet
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Array} The row data that was saved
 */
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

/**
 * Save Arquitectura data to ArquitecturaData sheet
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Array} The row data that was saved
 */
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

/**
 * Save Features data to FeaturesData sheet
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Array} The row data that was saved
 */
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

/**
 * Save Contact data to ContactData sheet
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Array} The row data that was saved
 */
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

/**
 * Save Aceleradores data to AceleradoresData sheet
 * @param {Object} formData - The form data to save
 * @param {boolean} isEditing - Whether this is an edit of an existing customer
 * @returns {Array} The row data that was saved
 */
function saveAceleradoresData(formData, isEditing) {
  // First, if editing, delete any existing rows for this customer
  if (isEditing) {
    deleteCustomerAceleradores(formData.customerName);
  }
  
  // If no aceleradores, return early
  if (!formData.aceleradores || !Array.isArray(formData.aceleradores) || formData.aceleradores.length === 0) {
    return [];
  }
  
  const sheet = getSheet('AceleradoresData');
  const customerName = formData.customerName || '';
  const rowsData = [];
  
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
    rowsData.push(rowData);
  });
  
  return rowsData;
}

/**
 * Delete all aceleradores for a customer
 * @param {string} customerName - The name of the customer
 * @returns {boolean} True if any rows were deleted
 */
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
  
  return rowsToDelete.length > 0;
}

/**
 * Helper function to save or update a row based on a key column
 * @param {Sheet} sheet - The spreadsheet sheet
 * @param {number} keyColumnIndex - The index of the key column
 * @param {string} keyValue - The key value to match
 * @param {Array} rowData - The row data to save
 * @param {boolean} isEditing - Whether this is an edit operation
 * @returns {Array} The row data that was saved
 */
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
