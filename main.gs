
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

// Get customer by name - wrapper for the database function
function getCustomer(name) {
  return getCustomerByName(name);
}

// Delete a customer by name
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

// Helper function to delete a row from a sheet based on a value in a column
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
