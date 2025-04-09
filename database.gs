
// Database interaction functions
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
