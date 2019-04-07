import { UploadImageService } from './../../service/upload-image.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { AddBookService} from '../../service/add-book.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  public newBook: Book = new Book();

  public bookAdded: boolean;


  constructor(
    private addBookService: AddBookService,
    private uploadImageService: UploadImageService,
    private router: Router
    ) { }

  onSubmit() {

    this.addBookService.sendBook(this.newBook).subscribe(
      res => {
        this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        this.bookAdded = true;
        this.newBook = new Book();
        this.newBook.active = true;
        this.newBook.category = 'Management';
        this.newBook.language = 'English';
        this.newBook.format = 'Paperback';

        Swal.fire({
          type: 'success',
          title: 'Book added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/bookList']);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook.active = true;
    this.newBook.category = 'Management';
    this.newBook.language = 'english';
    this.newBook.format = 'paperback';
    }

}
