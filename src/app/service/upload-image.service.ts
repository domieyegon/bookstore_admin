import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  filesToUpload: Array<File>;

  constructor() {
    this.filesToUpload = [];
   }

   upload(bookId: number) {
     this.makeFileRequest('http://localhost:8181/book/add/image?id=' + bookId, [], this.filesToUpload).then((result) => {
       console.log(result);
     }, (error) => {
       console.log(error);
     });
   }

   modify(bookId: number) {
     console.log(this.filesToUpload);

     if (this.filesToUpload.length > 0) {
      this.makeFileRequest('http://localhost:8181/book/update/image?id=' + bookId, [], this.filesToUpload).then((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      });
     }
   }

   fileChangeEvent(fileInput: any) {
     this.filesToUpload = fileInput.target.files as Array<File>;
   }

   makeFileRequest(url: string, params: Array<string>, files: Array<File>) {

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Image Uploaded Successfully!');
          } else {
            reject (xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      xhr.send(formData);

    });

   }
}
