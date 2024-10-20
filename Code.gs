function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    // Set CORS headers for the preflight request
    if (e.postData.type == "application/json") {
      var output = ContentService.createTextOutput();
      var data = JSON.parse(e.postData.contents);
      // Process data and get result
      var result = processData(data);
      var output = ContentService.createTextOutput(JSON.stringify(result));
      output.setMimeType(ContentService.MimeType.JSON);
    } else {
      var output = ContentService.createTextOutput("Method not allowed");
    }
  } catch(e) {
    var output = ContentService.createTextOutput("Error: " + e.toString());
  } finally {
    lock.releaseLock();
  }
  
  // Set CORS headers
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  output.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  return output;
}

function processData(data) {
  // Your existing code to process form data
  // ...
}
