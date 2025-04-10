/**
 * Get a sheet from the active spreadsheet by name, creates it if it doesn't exist
 * @param {string} sheetName - The name of the sheet to get
 * @returns {Sheet} The sheet object
 */
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(sheetName);
    
    // Add headers based on sheet name
    switch (sheetName) {
      case 'CustomerData':
        sheet.appendRow([
          'Customer Name', 'Antiguedad', 'Tipo Licencia', 'Cloud', 'Tallaje',
          'Comments', 'Phone Number', 'Mobile Number', 'Work Phone',
          'Alternative Email', 'Preferred Contact Method', 'Aceleradores',
          'Created Date', 'Last Modified Date'
        ]);
        break;
      case 'ArquitecturaData':
        sheet.appendRow([
          'Customer Name', 'Antiguedad', 'Tipo Licencia', 'Cloud', 'Tallaje',
          'Comments', 'Sources to DL SDG', 'Sources to DL Tech ETL', 'Storage DL',
          'Sources to DL Comments', 'DL to DWH SDG', 'Data Model', 'DL to DWH Tech ETL',
          'Storage DWH', 'DL to DWH Comments', 'Capa Explotacion', 'Explotacion Dato Comments',
          'Orquestacion Tech', 'Orquestacion Comments', 'Visualization Tech',
          'Ratio Dashboards Snowflake', 'Visualization Comments', 'Advanced Analytics',
          'Advanced Analytics Tech', 'Advanced Analytics Comments', 'Government Tech',
          'Government Comments'
        ]);
        break;
      case 'FeaturesData':
        sheet.appendRow([
          'Customer Name', 'Sources', 'Read From SAP', 'Range Volumentria', 'Source Format',
          'Usage', 'Specific Table Types', 'Can Admin Platform', 'Has Dwh By Processing',
          'Pushdown Operations', 'Dynamic Scaling', 'Multiclustering', 'Notebooks Usage',
          'Stored Procedures', 'CTE Usage', 'Snowflake API', 'Snowpark',
          'Snowflake Orchestrator', 'Kafka Connector', 'Snowpipe', 'Cortex IA',
          'Project Type', 'Streamlit Apps', 'Snowpark Training', 'Development Potential',
          'Environment Replication', 'Zero Copy Cloning', 'Time Travel', 'Data Copy Strategy',
          'Infra Team Exists', 'Network Controls', 'Roles Management', 'Masking Policies',
          'MFA Active', 'Auth Policies', 'Service Users Auth', 'Encryption Measures'
        ]);
        break;
      case 'AceleradoresData':
        sheet.appendRow([
          'Customer Name', 'Artefacto', 'Objetivo', 'Desarrollo', 'Technology Base',
          'Technology', 'Data Ingestion', 'Data Transformation', 'Monitoring',
          'Securitization', 'Data Modeling', 'MLOps', 'CICD'
        ]);
        break;
      case 'ContactData':
        sheet.appendRow([
          'Customer Name', 'Phone Number', 'Mobile Number', 'Work Phone', 'Alternative Email',
          'Preferred Contact Method', 'Street Address', 'City', 'State', 'Postal Code',
          'Country', 'Address Type', 'Billing Address Same', 'Billing Street', 'Billing City',
          'Billing State', 'Billing Postal Code', 'Billing Country', 'Preferred Language',
          'Communication Frequency', 'Subscribe Newsletter', 'Marketing Consent',
          'Preferred Payment Method', 'Credit Limit', 'Currency', 'Timezone',
          'Account Type', 'Tags'
        ]);
        break;
    }
    
    // Format header row
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold').setBackground('#dddddd');
  }
  
  return sheet;
}

/**
 * Get customer data by name
 * @param {string} customerName - The name of the customer to retrieve
 * @returns {Object|null} Customer data object or null if not found
 */
function getCustomerByName(customerName) {
  // Get data from all sheets
  const mainData = getCustomerMainData(customerName);
  if (!mainData) return null;
  
  const arquitecturaData = getCustomerArquitecturaData(customerName);
  const featuresData = getCustomerFeaturesData(customerName);
  const contactData = getCustomerContactData(customerName);
  const aceleradoresData = getCustomerAceleradoresData(customerName);
  
  // Combine all data
  const customerData = {
    ...mainData,
    ...arquitecturaData,
    ...featuresData,
    ...contactData,
    aceleradores: aceleradoresData || []
  };
  
  return customerData;
}

/**
 * Get main customer data
 * @param {string} customerName - The name of the customer to retrieve
 * @returns {Object|null} Main customer data or null if not found
 */
function getCustomerMainData(customerName) {
  const sheet = getSheet('CustomerData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  
  // Find customer by name
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === customerName) {
      const row = values[i];
      const data = {};
      
      // Basic fields
      data.customerName = row[0];
      data.antiguedad = row[1];
      data.tipoLicencia = row[2];
      data.cloud = row[3];
      data.tallaje = row[4];
      data.comments = row[5];
      data.phoneNumber = row[6];
      data.mobileNumber = row[7];
      data.workPhone = row[8];
      data.alternativeEmail = row[9];
      data.preferredContactMethod = row[10];
      
      // Parse JSON fields
      try {
        const aceleradoresJson = row[11];
        if (aceleradoresJson) {
          data.aceleradores = JSON.parse(aceleradoresJson);
        }
      } catch (e) {
        // If JSON parsing fails, set as empty array
        data.aceleradores = [];
      }
      
      return data;
    }
  }
  
  return null;
}

/**
 * Get arquitectura data for a customer
 * @param {string} customerName - The name of the customer
 * @returns {Object|null} Arquitectura data or null if not found
 */
function getCustomerArquitecturaData(customerName) {
  const sheet = getSheet('ArquitecturaData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find customer by name
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === customerName) {
      const row = values[i];
      
      return {
        // Basic fields from arquitectura
        antiguedad: row[1],
        tipoLicencia: row[2],
        cloud: row[3],
        tallaje: row[4],
        comments: row[5],
        
        // Sources to DL fields
        sourcesToDLSDG: row[6] === 'Yes',
        sourcesToDLTechETL: row[7] ? row[7].split(', ') : [],
        storageDL: row[8],
        sourcesToDLComments: row[9],
        
        // DL to DWH fields
        dlToDWHSDG: row[10] === 'Yes',
        dataModel: row[11],
        dlToDWHTechETL: row[12] ? row[12].split(', ') : [],
        storageDWH: row[13],
        dlToDWHComments: row[14],
        
        // Other fields
        capaExplotacion: row[15] ? row[15].split(', ') : [],
        explotacionDatoComments: row[16],
        orquestacionTech: row[17] ? row[17].split(', ') : [],
        orquestacionComments: row[18],
        visualizationTech: row[19] ? row[19].split(', ') : [],
        ratioDashboardsSnowflake: row[20],
        visualizationComments: row[21],
        isDoingSomething: row[22] === 'Yes',
        advancedAnalyticsTech: row[23] ? row[23].split(', ') : [],
        advancedAnalyticsComments: row[24],
        governmentTech: row[25] ? row[25].split(', ') : [],
        governmentComments: row[26]
      };
    }
  }
  
  return {};
}

/**
 * Get features data for a customer
 * @param {string} customerName - The name of the customer
 * @returns {Object|null} Features data or null if not found
 */
function getCustomerFeaturesData(customerName) {
  const sheet = getSheet('FeaturesData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find customer by name
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === customerName) {
      const row = values[i];
      
      return {
        // Data Integration
        sources: row[1] ? row[1].split(', ') : [],
        readFromSAP: row[2] === 'Yes',
        rangeVolumentria: row[3],
        sourceFormat: row[4],
        usage: row[5] ? row[5].split(', ') : [],
        specificTableTypes: row[6],
        
        // Query Processing
        canAdminPlatform: row[7],
        hasDwhByProcessing: row[8],
        pushdownOperations: row[9],
        dynamicScaling: row[10],
        multiclustering: row[11],
        
        // ETL
        notebooksUsage: row[12],
        storedProcedures: row[13],
        cteUsage: row[14],
        snowflakeApi: row[15],
        snowpark: row[16],
        
        // Data Pipelines
        snowflakeOrchestrator: row[17],
        kafkaConnector: row[18],
        snowpipe: row[19],
        
        // AI ML
        cortexIA: row[20],
        projectType: row[21],
        streamlitApps: row[22],
        snowparkTraining: row[23],
        developmentPotential: row[24],
        
        // Disaster Recovery
        environmentReplication: row[25],
        zeroCopyCloning: row[26],
        timeTravel: row[27],
        dataCopyStrategy: row[28],
        
        // Security
        infraTeamExists: row[29],
        networkControls: row[30],
        rolesManagement: row[31],
        maskingPolicies: row[32],
        mfaActive: row[33],
        authPolicies: row[34],
        serviceUsersAuth: row[35],
        encryptionMeasures: row[36]
      };
    }
  }
  
  return {};
}

/**
 * Get contact data for a customer
 * @param {string} customerName - The name of the customer
 * @returns {Object|null} Contact data or null if not found
 */
function getCustomerContactData(customerName) {
  const sheet = getSheet('ContactData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find customer by name
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === customerName) {
      const row = values[i];
      
      return {
        // Contact Info
        phoneNumber: row[1],
        mobileNumber: row[2],
        workPhone: row[3],
        alternativeEmail: row[4],
        preferredContactMethod: row[5],
        
        // Address Info
        streetAddress: row[6],
        city: row[7],
        state: row[8],
        postalCode: row[9],
        country: row[10],
        addressType: row[11],
        billingAddressSame: row[12] === 'Yes',
        billingStreet: row[13],
        billingCity: row[14],
        billingState: row[15],
        billingPostalCode: row[16],
        billingCountry: row[17],
        
        // Preferences
        preferredLanguage: row[18],
        communicationFrequency: row[19],
        subscribeNewsletter: row[20] === 'Yes',
        marketingConsent: row[21] === 'Yes',
        preferredPaymentMethod: row[22],
        creditLimit: row[23],
        currency: row[24],
        timezone: row[25],
        accountType: row[26],
        tags: row[27]
      };
    }
  }
  
  return {};
}

/**
 * Get aceleradores data for a customer
 * @param {string} customerName - The name of the customer
 * @returns {Array} Array of aceleradores
 */
function getCustomerAceleradoresData(customerName) {
  const sheet = getSheet('AceleradoresData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const aceleradores = [];
  
  // Find all aceleradores for this customer
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === customerName) {
      const row = values[i];
      
      aceleradores.push({
        artefacto: row[1],
        objetivo: row[2],
        desarrollo: row[3],
        technologyBase: row[4] ? row[4].split(', ') : [],
        technology: row[5] ? row[5].split(', ') : [],
        dataIngestion: row[6] === 'Yes',
        dataTransformation: row[7] === 'Yes',
        monitoring: row[8] === 'Yes',
        securitization: row[9] === 'Yes',
        dataModeling: row[10] === 'Yes',
        mlops: row[11] === 'Yes',
        cicd: row[12] === 'Yes'
      });
    }
  }
  
  return aceleradores;
}

/**
 * Get all customers from the database
 * @returns {Array<Object>} Array of customer data objects
 */
function getAllCustomersFromDatabase() {
  const sheet = getSheet('CustomerData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const customers = [];
  
  // Skip header row
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    
    // Skip empty rows
    if (!row[0]) continue;
    
    // Get the customer name and then fetch full customer data
    const customerName = row[0];
    const customerData = getCustomerByName(customerName);
    
    if (customerData) {
      customers.push(customerData);
    }
  }
  
  return customers;
}
