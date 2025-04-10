// Database interaction functions
function getSheet(sheetName = 'CustomerData') {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    if (sheetName === 'ArquitecturaData') {
      sheet.appendRow([
        'Customer Name', 'Antiguedad', 'Tipo Licencia', 'Cloud', 'Tallaje', 'Comments',
        'Sources To DL SDG', 'Sources To DL Tech ETL', 'Storage DL', 'Sources To DL Comments',
        'DL To DWH SDG', 'Data Model', 'DL To DWH Tech ETL', 'Storage DWH', 'DL To DWH Comments',
        'Capa Explotacion', 'Explotacion Dato Comments',
        'Orquestacion Tech', 'Orquestacion Comments',
        'Visualization Tech', 'Ratio Dashboards Snowflake', 'Visualization Comments',
        'Is Doing Something', 'Advanced Analytics Tech', 'Advanced Analytics Comments',
        'Government Tech', 'Government Comments'
      ]);
    } else if (sheetName === 'FeaturesData') {
      sheet.appendRow([
        'Customer Name',
        'Sources', 'Read From SAP', 'Range Volumentria', 'Source Format', 'Usage', 'Specific Table Types',
        'Can Admin Platform', 'Has Dwh By Processing', 'Pushdown Operations', 'Dynamic Scaling', 'Multiclustering',
        'Notebooks Usage', 'Stored Procedures', 'CTE Usage', 'Snowflake API', 'Snowpark',
        'Snowflake Orchestrator', 'Kafka Connector', 'Snowpipe',
        'Cortex IA', 'Project Type', 'Streamlit Apps', 'Snowpark Training', 'Development Potential',
        'Environment Replication', 'Zero Copy Cloning', 'Time Travel', 'Data Copy Strategy',
        'Infra Team Exists', 'Network Controls',
        'Roles Management', 'Masking Policies', 'MFA Active', 'Auth Policies', 'Service Users Auth',
        'Encryption Measures'
      ]);
    } else if (sheetName === 'AceleradoresData') {
      sheet.appendRow([
        'Customer Name',
        'Acelerador Name', 'Objetivo', 'Desarrollo', 'Technology Base', 'Technology', 
        'Data Ingestion', 'Data Transformation', 'Monitoring', 'Securitization',
        'Data Modeling', 'MLOps', 'CICD'
      ]);
    } else if (sheetName === 'ContactData') {
      sheet.appendRow([
        'Customer Name',
        'Phone Number', 'Mobile Number', 'Work Phone', 'Alternative Email', 'Preferred Contact Method',
        'Street Address', 'City', 'State', 'Postal Code', 'Country', 'Address Type',
        'Billing Address Same', 'Billing Street', 'Billing City', 'Billing State',
        'Billing Postal Code', 'Billing Country',
        'Preferred Language', 'Communication Frequency', 'Subscribe Newsletter', 
        'Marketing Consent', 'Preferred Payment Method', 'Credit Limit', 
        'Currency', 'Timezone', 'Account Type', 'Tags'
      ]);
    } else {
      sheet.appendRow([
        'Customer Name', 'Antiguedad', 'Tipo Licencia', 'Cloud', 'Tallaje', 'Comments',
        'Phone Number', 'Mobile Number', 'Work Phone', 'Alternative Email', 'Preferred Contact Method',
        'Aceleradores',
        'Created Date', 'Last Modified'
      ]);
    }
  }
  
  return sheet;
}

function getAllCustomers() {
  const sheet = getSheet('CustomerData');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  const headers = values[0];
  const data = [];
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const customer = {};
    
    for (let j = 0; j < headers.length; j++) {
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
    
    const customerName = customer['Customer Name'];
    if (customerName) {
      const arquitecturaData = getCustomerDataFromSheet('ArquitecturaData', customerName);
      const featuresData = getCustomerDataFromSheet('FeaturesData', customerName);
      const contactData = getCustomerDataFromSheet('ContactData', customerName);
      
      Object.assign(customer, arquitecturaData, featuresData, contactData);
    }
    
    data.push(customer);
  }
  
  return data;
}

function getCustomerDataFromSheet(sheetName, customerName) {
  const sheet = getSheet(sheetName);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  const headers = values[0];
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[0] === customerName) {
      const data = {};
      
      for (let j = 0; j < headers.length; j++) {
        data[headers[j]] = row[j];
      }
      
      return data;
    }
  }
  
  return {};
}

function getCustomerByName(customerName) {
  const customers = getAllCustomers();
  return customers.find(customer => customer['Customer Name'] === customerName) || null;
}
