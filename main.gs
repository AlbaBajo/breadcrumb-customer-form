
/**
 * Main entry point for the web app
 * @returns {HtmlOutput} The rendered HTML output
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Customer Information System')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Include HTML files in the main template
 * @param {string} filename - The name of the file to include
 * @returns {string} The content of the file
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Get customer by name - wrapper for the database function
 * @param {string} name - The name of the customer to retrieve
 * @returns {Object} Customer data object
 */
function getCustomer(name) {
  return getCustomerByName(name);
}

/**
 * Get all customers - wrapper for the database function
 * @returns {Array<Object>} Array of customer data objects
 */
function getAllCustomers() {
  return getAllCustomersFromDatabase();
}

/**
 * Save customer data - wrapper for formHandler functions
 * @param {Object} formData - The customer data to save
 * @param {boolean} isEditing - Whether this is an edit or a new customer
 * @returns {Object} Response object with success status and message
 */
function saveCustomerData(formData, isEditing) {
  // This function is implemented in formHandler.gs
  return saveCustomerDataToSheets(formData, isEditing);
}

/**
 * Delete a customer by name
 * @param {string} name - The name of the customer to delete
 * @returns {Object} Response object with success status and message
 */
function deleteCustomer(name) {
  try {
    // Delete from all sheets
    deleteFromSheet('CustomerData', 0, name);
    deleteFromSheet('ArquitecturaData', 0, name);
    deleteFromSheet('FeaturesData', 0, name);
    deleteFromSheet('ContactData', 0, name);
    deleteCustomerAceleradores(name);
    
    return {
      success: true,
      message: 'Customer deleted successfully'
    };
  } catch(e) {
    return {
      success: false,
      message: 'Error deleting customer: ' + e.toString()
    };
  }
}

/**
 * Helper function to delete a row from a sheet based on a value in a column
 * @param {string} sheetName - The name of the sheet
 * @param {number} columnIndex - The index of the column to check
 * @param {string} value - The value to search for
 * @returns {boolean} True if a row was deleted, false otherwise
 */
function deleteFromSheet(sheetName, columnIndex, value) {
  const sheet = getSheet(sheetName);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Find the row with the value, from bottom to top to avoid shifting issues
  for (let i = values.length - 1; i >= 1; i--) { // Start at 1 to skip header
    if (values[i][columnIndex] === value) {
      sheet.deleteRow(i + 1); // +1 because sheet is 1-indexed
      return true;
    }
  }
  
  return false; // Not found
}

/**
 * Generate reports from the customer data
 * @returns {Object} Object containing report data
 */
function generateReports() {
  // This function is implemented in reporting.gs
  return generateCustomerReports();
}

/**
 * Helper function to get the script URL for serving static files
 * @returns {string} The script URL
 */
function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}
