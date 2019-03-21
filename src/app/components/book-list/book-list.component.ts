import { RemoveBookService } from './../../service/remove-book.service';
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { GetBookListService } from '../../service/get-book-list.service';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public selectedBook: Book;
  public checked: boolean;
  public bookList: Book[];
  public allChecked: boolean;
  private removeBookList: Book[] = new Array();

  constructor(
    private getBookListService: GetBookListService,
    private removeBookService: RemoveBookService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }

  openDialog(book: Book) {
    const dialogRef = this.dialog.open(DialogResultExampleDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result === 'yes') {
          this.removeBookService.sendBook(book.id).subscribe(
            res => {
              console.log(res);
              this.getBookList();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRemoveBookList(checked: boolean, book: Book) {
    if (checked) {
      this.removeBookList.push(book);
    } else {
      this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
    }
  }

  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removeBookList = [];
    }
  }

  removeSelectedBooks() {
    const dialogRef = this.dialog.open(DialogResultExampleDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result === 'yes') {

          for (const book of this.removeBookList) {
            this.removeBookService.sendBook(book.id).subscribe(
              res => {
                // this.getBookList();
              },
              err => {
              }
            );
          }
          location.reload();
        }
      },
      err => {
        console.log(err);
      }
    );
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


@Component ({
  selector: 'app-dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html'
})
export class DialogResultExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialogComponent>) {}
}
