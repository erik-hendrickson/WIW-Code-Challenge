function doGet() {
	return HtmlService.createHtmlOutputFromFile('index');
}

function getAllData(URL) {

	// If a previous file exists, remove it
	var files = DriveApp.getRootFolder().getFilesByName('WIW CC All Data');

	while (files.hasNext()) {
		DriveApp.removeFile(files.next());
	}

	// Attempt to process files A through Z
	var url = URL;
      Logger.log("url before = " + url);
  if(url[url.length-1] != "/")
  {

   url = url.concat("/") 
   Logger.log("url after = " + url);
  }
	var stringOfLetters = "abcdefghijklmnopqrstuvwxyz";

	var csvContent;
	var csvData;
	var csvUrl;

	var allData = [];
	var filesTried = 0;
	var filesProcessed = 0;

	for (var i = 0; i < stringOfLetters.length; i++) {

		fileName = stringOfLetters[i] + ".csv"
		Logger.log(url + fileName);

		csvUrl = url + fileName;

		csvContent = UrlFetchApp.fetch(csvUrl).getContentText();
		csvData = Utilities.parseCsv(csvContent);
		if (i == 0) {
			allData = allData.concat(csvData);

		} else {
			csvData.shift();
			allData = allData.concat(csvData);
		}
		if (csvData.length > 0) {
			filesProcessed += 1;

		}
		filesTried += 1;
	}

	// If data array is not empty, creat Google Sheet
	if (allData.length) {
		var spreadsheet = SpreadsheetApp.create('WIW CC All Data');
		var sheet = spreadsheet.getActiveSheet();

		sheet.setName('Raw Data');

		sheet.getRange(1, 1, allData.length, allData[0].length).setValues(allData);
	}

	// Create pivoted summary sheet

	spreadsheet.insertSheet('Summary');
	spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Summary'));
	spreadsheet.getActiveSheet().getRange('A1').setValue('=QUERY(\'Raw Data\'!A:E,\"select E,sum(B) where E is not null group by E pivot C\",1)');

	// Return number of files tried, number of files processed, and the URL of the Google Sheet
	return [filesTried, filesProcessed, spreadsheet.getUrl()];
}

function isInArray(value, array) {
	// Determine if value exists in array
	return array.indexOf(value) > -1;
}

function getTotal(user, path, csvData) {
	// For each row in csvData, if there is a match on user and path, grab the length
	var values = [];
	var total = 0;

	for (var j = 0; j < csvData.length; j++) {
		if (csvData[j][4] == user && csvData[j][2] == path) {
			values.push(csvData[j][1]);
		}
	}

	// Sum length values from above
	for (var k = 0; k < values.length; k++) {

		total += parseInt(values[k]);

	}

	return total;
}

function saveAsCSV() {
	// Export Google Sheet summary tab as CSV

	var filename = "wiw_cc_summary.csv";
	var folder = DriveApp.getRootFolder().getId();
	var csv = "";

	// Find all files with the correct name
	var files = DriveApp.getFilesByName('WIW CC All Data');
	var spreadsheet = SpreadsheetApp.open(files.next());

	// Get spreadsheet values
	var v = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Summary')).getDataRange().getValues();

	v.forEach(function(e) {
		csv += e.join(",") + "\n";
	});

	var url = DriveApp.getFolderById(folder)
		.createFile(filename, csv, MimeType.CSV)
		.getDownloadUrl()
		.replace("?e=download&gd=true", "");

	return url;
}