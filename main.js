/** @format */

let app = SpreadsheetApp.openByUrl(
	'https://docs.google.com/spreadsheets/d/1LfhmFK2k-CZZKX7bo47UuLAbwXGb0slcnLSrPYZ2WzA/edit#gid=0'
);
let sheet = app.getSheetByName('Sheet1');
function doPost(e) {
	try {
		let obj = JSON.parse(e.postData.contents);
		let dcode = Utilities.base64Decode(obj.base64);
		let blob = Utilities.newBlob(dcode, obj.type, obj.name);
		let newFile = DriveApp.createFile(blob);
		let link = newFile
			.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
			.getDownloadUrl();
		let lr = sheet.getLastRow();
		sheet.getRange(lr + 1, 1).setFormula(`=IMAGE("${link}")`);
		return ContentService.createTextOutput('image uploaded');
	} catch (err) {
		return ContentService.createTextOutput(err);
	}
} /** @format */
