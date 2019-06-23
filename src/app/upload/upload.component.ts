import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as AzureStorage from '../scripts/azure-storage.blob.min.js';

declare var AzureStorage: any;

// Blob-related code goes here
const account = {
  name: "resumestg",
  sas:  "?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-06-23T21:02:13Z&st=2019-06-23T13:02:13Z&spr=https&sig=HBhQNql2RU4cgjMokowqGr0pnnXmL3I%2BG5iDdFhAYLQ%3D"
}

const blobUri = 'https://' + account.name + '.blob.core.windows.net';
const blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, account.sas);

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selected: string = 'Select a file';

  constructor(public router: Router) { }

  ngOnInit() {
  }

  setFileName() {
    const file = document.getElementById('file-input')['files'][0];

    if (!file) return;
    
    this.selected = file.name;
    document.getElementById('file-disguise').innerHTML = file.name;
    console.log(file.name);
  }

  //upload file
  upload() {
    const file = document.getElementById('file-input')['files'][0];

    blobService.createBlockBlobFromBrowserFile('mycontainer', 
    file.name, 
    file, 
    (error, result) => {
        if(error) {
            // Handle blob error
            console.log(error);
        } else {
            console.log('Upload is successful');
            console.log(result.name);

            //document.getElementById('cont-button').style="display;inline-block";

            const url = blobService.getUrl("mycontainer", result.name);
            console.log(url)
            this.router.navigate(['/interview']);
        }
    });
  }
}
