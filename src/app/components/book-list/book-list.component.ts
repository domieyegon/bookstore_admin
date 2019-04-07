import { RemoveBookService } from './../../service/remove-book.service';
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { GetBookListService } from '../../service/get-book-list.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public bookSelected = false;
  public selectedBook: Book;
  public checked: boolean;
  public bookList: Book[];
  public allChecked: boolean;
  private removeBookList: Book[] = new Array();

  constructor(
    private getBookListService: GetBookListService,
    private removeBookService: RemoveBookService,
    private router: Router
  ) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }

  openDialog(book: Book) {

    Swal.fire({
      title: 'Are you sure You want to delete?',
      text: "This book will be deleted permanently!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.removeBookService.sendBook(book.id).subscribe(
          res => {
            console.log(res);
            this.getBookList();
          },
          err => {
            console.log(err);
          }
        );
        Swal.fire(
          'Deleted!',
          'The book have been deleted succcessfully.',
          'success'
        )
      }
    });
  }

  updateRemoveBookList(checked: boolean, book: Book) {
    if (checked) {
      this.bookSelected = true;
      this.removeBookList.push(book);
    } else {
      this.bookSelected = false;
      this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
    }
  }

  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      this.bookSelected = true;
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.bookSelected = false;
      this.removeBookList = [];
    }
  }

  removeSelectedBooks() {

    Swal.fire({
      title: 'Are you sure You want to delete selected books?',
      text: "These books will be deleted permanently!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        
        for (const book of this.removeBookList) {
          this.removeBookService.sendBook(book.id).subscribe(
            res => {
              this.getBookList();
            },
            err => {
            }
          );
        }
        
        Swal.fire(
          'Deleted!',
          'The books have been deleted succcessfully.',
          'success'
        );
      }
    });
  }

  getBookList() {
    this.getBookListService.getBookList().subscribe(
      res => {
        console.log(res.json());
        this.bookList = res.json();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getBookList();
  }

}
