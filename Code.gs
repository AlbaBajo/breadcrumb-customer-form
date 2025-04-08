
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
      'Company Name', 'Business Type', 'Industry', 'Annual Revenue', 'Number of Employees',
      'Sources To DL SDG', 'Sources To DL Tech ETL', 'Storage DL', 'Sources To DL Comments',
      'DL To DWH SDG', 'Data Model', 'DL To DWH Tech ETL', 'Storage DWH', 'DL To DWH Comments',
      'Capa Explotacion', 'Explotacion Dato Comments',
      'Orquestacion Tech', 'Orquestacion Comments',
      'Visualization Tech', 'Ratio Dashboards Snowflake', 'Visualization Comments',
      'Is Doing Something', 'Advanced Analytics Tech', 'Advanced Analytics Comments',
      'Government Tech', 'Government Comments'
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
      formData.companyName || '',
      formData.businessType || '',
      formData.industry || '',
      formData.annualRevenue || '',
      formData.numberOfEmployees || '',
      // New fields
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
      customer[headers[j]] = row[j];
    }
    
    data.push(customer);
  }
  
  return data;
}

