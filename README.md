# WIW-Code-Challenge
When I Work Code Challenge - Erik Hendrickson

## Getting Started

These instructions will get you a copy of the project up and running on your Google Apps instance. See deployment for notes on how to deploy the project.

### Prerequisites

```
A google.com account
Access to Google Apps 
  Google App Script (script.google.com)
  Google Drive (drive.google.com)
  Google Sheets
```

### Installing / Deployment

Start a new script by navigating to script.google.com

Select the file "Code.gs" in the list on the left, and paste the contents of the Code.gs file from Github. After pasting, click File > Save.
image 1

Select File > New > Html File to add an html file. Enter the name index.html
image 2

Select the file "index.html" in the list on the left, and paste the contents of the index.html file from Github. After pasting, click File > Save.
image 3

Click "Untitled project" near the top of the window, and rename your script

Click File > Save to save your progress.

To deploy this script as a web application, click Publish > Deploy as web app...

Select the appropriate values for "Project Version", "Execute the app as", and "Who has access to the app"
image 4

If authorization is required, there will be a popup. If so, click "Review Permissions"

Select the appropriate account for permissions
image 5

If this is the initial deployment, your web application will not have been "Google Verified". In the window shown, click "Advanced", then click the link near the bottom labeled "Go to [Your Script] (unsafe)"
image 6

Click "Allow" at the permissions summary window
image 7

Finally, you should receive a confirmation of app deployment. Copy the URL for later use, or click the "latest code" link to execute immediately.

image 8

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Testing / Execution

To test the application, navigate to the URL saved in the "Installation" step above. This can also be located by clicking Publish > Deploy as web app in the script itself.

Enter the URL referencing the location of the source csv files. The default URL is populated automatically.
*Note: csv's are assumed to be named a.csv, b.csv, ... z.csv at the location entered

image 9

When ready, click "Parse Data"
*Note: With larger amounts of data, the application may take a few moments to process. The page will update when the process is complete.

When parsing is complete, the application will display the number of files it attempted to parse, the number processed, and a link to a Google Sheet. The Google Sheet contains both the full set of raw data and a summary of the data in the requested format.

image 10

If a csv is required, click the "Prepare CSV" button. Preparation may take a moment.

When ready, the application will display a link where the csv may be downloaded.
image 11




