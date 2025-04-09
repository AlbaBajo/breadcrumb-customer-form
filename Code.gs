
// Main entry point for the web app
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Customer Information System')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Get spreadsheet and relevant sheet
function getSheet() {
  // ID for the Google Sheet to use as database
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CustomerData');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('CustomerData');
    // Add headers (extended for all the new fields)
    sheet.appendRow([
      'Customer Name', 'Antiguedad', 'Tipo Licencia', 'Cloud', 'Tallaje', 'Comments',
      'Phone Number', 'Mobile Number', 'Work Phone', 'Alternative Email', 'Preferred Contact Method',
      // Removing Business Info fields
      // 'Company Name', 'Business Type', 'Industry', 'Annual Revenue', 'Number of Employees',
      // Aceleradores fields
      'Aceleradores',
      'Sources To DL SDG', 'Sources To DL Tech ETL', 'Storage DL', 'Sources To DL Comments',
      'DL To DWH SDG', 'Data Model', 'DL To DWH Tech ETL', 'Storage DWH', 'DL To DWH Comments',
      'Capa Explotacion', 'Explotacion Dato Comments',
      'Orquestacion Tech', 'Orquestacion Comments',
      'Visualization Tech', 'Ratio Dashboards Snowflake', 'Visualization Comments',
      'Is Doing Something', 'Advanced Analytics Tech', 'Advanced Analytics Comments',
      'Government Tech', 'Government Comments',
      // Features - Data Integration
      'Sources', 'Read From SAP', 'Range Volumentria', 'Source Format', 'Usage', 'Specific Table Types',
      // Features - Query Processing
      'Can Admin Platform', 'Has Dwh By Processing', 'Pushdown Operations', 'Dynamic Scaling', 'Multiclustering',
      // Features - ETL
      'Notebooks Usage', 'Stored Procedures', 'CTE Usage', 'Snowflake API', 'Snowpark',
      // Features - Data Pipelines
      'Snowflake Orchestrator', 'Kafka Connector', 'Snowpipe',
      // Features - AI ML
      'Cortex IA', 'Project Type', 'Streamlit Apps', 'Snowpark Training', 'Development Potential',
      // Features - Disaster Recovery
      'Environment Replication', 'Zero Copy Cloning', 'Time Travel', 'Data Copy Strategy',
      // Features - Security
      'Infra Team Exists', 'Network Controls',
      'Roles Management', 'Masking Policies', 'MFA Active', 'Auth Policies', 'Service Users Auth',
      'Encryption Measures'
    ]);
  }
  
  return sheet;
}

// Save form data to spreadsheet
function saveCustomerData(formData) {
  try {
    const sheet = getSheet();
    
    // Process array fields to string
    const processArrayField = (field) => {
      if (Array.isArray(field) && field.length > 0) {
        return field.join(', ');
      }
      return '';
    };
    
    // Process boolean fields
    const processBooleanField = (field) => {
      return field ? 'Yes' : 'No';
    };

    // Process Aceleradores table data
    const processAceleradores = (aceleradores) => {
      if (Array.isArray(aceleradores) && aceleradores.length > 0) {
        return JSON.stringify(aceleradores);
      }
      return '[]';
    };
    
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
      // Removing Business Info fields
      // formData.companyName || '',
      // formData.businessType || '',
      // formData.industry || '',
      // formData.annualRevenue || '',
      // formData.numberOfEmployees || '',
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

// Get all customer data
function getAllCustomers() {
  const sheet = getSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Skip header row
  const headers = values[0];
  const data = [];
  
  // Start from index 1 to skip headers
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const customer = {};
    
    // Map each column to its header
    for (let j = 0; j < headers.length; j++) {
      // Parse aceleradores JSON if present
      if (headers[j] === 'Aceleradores' && row[j]) {
        try {
          customer[headers[j]] = JSON.parse(row[j]);
        } catch (e) {
          customer[headers[j]] = [];
        }
      } else {
        customer[headers[j]] = row[j];
      }
    }
    
    data.push(customer);
  }
  
  return data;
}

// Generate reports based on customer data
function generateReports() {
  const customers = getAllCustomers();
  
  // Initialize report objects
  const reports = {
    arquitectura: {
      cloudDistribution: {},
      tipoLicenciaDistribution: {},
      tallajeDistribution: {},
      totalCustomers: customers.length
    },
    features: {
      sourcesDistribution: {},
      sourceFormatDistribution: {},
      etlToolsDistribution: {}
    },
    aceleradores: {
      totalArtefactos: 0,
      typeDistribution: {
        'Desarrollado': 0,
        'Desde Cero': 0
      },
      technologyDistribution: {},
      categoriesDistribution: {
        'Data Ingestion': 0,
        'Data Transformation DQ': 0,
        'Monitoring': 0,
        'Securitization': 0,
        'Data Modeling': 0,
        'MLOps': 0,
        'CICD': 0
      }
    }
  };
  
  // Process customer data for reports
  customers.forEach(customer => {
    // Arquitectura reports
    if (customer['Cloud']) {
      reports.arquitectura.cloudDistribution[customer['Cloud']] = 
        (reports.arquitectura.cloudDistribution[customer['Cloud']] || 0) + 1;
    }
    
    if (customer['Tipo Licencia']) {
      reports.arquitectura.tipoLicenciaDistribution[customer['Tipo Licencia']] = 
        (reports.arquitectura.tipoLicenciaDistribution[customer['Tipo Licencia']] || 0) + 1;
    }
    
    if (customer['Tallaje']) {
      reports.arquitectura.tallajeDistribution[customer['Tallaje']] = 
        (reports.arquitectura.tallajeDistribution[customer['Tallaje']] || 0) + 1;
    }
    
    // Features reports
    if (customer['Sources'] && typeof customer['Sources'] === 'string') {
      const sources = customer['Sources'].split(', ');
      sources.forEach(source => {
        reports.features.sourcesDistribution[source] = 
          (reports.features.sourcesDistribution[source] || 0) + 1;
      });
    }
    
    if (customer['Source Format']) {
      reports.features.sourceFormatDistribution[customer['Source Format']] = 
        (reports.features.sourceFormatDistribution[customer['Source Format']] || 0) + 1;
    }
    
    // Aceleradores reports
    if (customer['Aceleradores'] && Array.isArray(customer['Aceleradores'])) {
      const aceleradores = customer['Aceleradores'];
      reports.aceleradores.totalArtefactos += aceleradores.length;
      
      aceleradores.forEach(artefacto => {
        // Count development types
        if (artefacto.desarrollo) {
          reports.aceleradores.typeDistribution[artefacto.desarrollo] = 
            (reports.aceleradores.typeDistribution[artefacto.desarrollo] || 0) + 1;
        }
        
        // Count technologies
        if (Array.isArray(artefacto.technology)) {
          artefacto.technology.forEach(tech => {
            reports.aceleradores.technologyDistribution[tech] = 
              (reports.aceleradores.technologyDistribution[tech] || 0) + 1;
          });
        }
        
        // Count categories
        if (artefacto.dataIngestion) reports.aceleradores.categoriesDistribution['Data Ingestion']++;
        if (artefacto.dataTransformation) reports.aceleradores.categoriesDistribution['Data Transformation DQ']++;
        if (artefacto.monitoring) reports.aceleradores.categoriesDistribution['Monitoring']++;
        if (artefacto.securitization) reports.aceleradores.categoriesDistribution['Securitization']++;
        if (artefacto.dataModeling) reports.aceleradores.categoriesDistribution['Data Modeling']++;
        if (artefacto.mlops) reports.aceleradores.categoriesDistribution['MLOps']++;
        if (artefacto.cicd) reports.aceleradores.categoriesDistribution['CICD']++;
      });
    }
  });
  
  return reports;
}
