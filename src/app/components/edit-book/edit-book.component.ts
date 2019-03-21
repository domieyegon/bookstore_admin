import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import {UploadImageService} from '../../service/upload-image.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EditBookService } from './../../service/edit-book.service';
import { GetBookService } from './../../service/get-book.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  public bookId: number;
  public book: Book = new Book();
  public bookUpdated: boolean;

  constructor(
    private uploadImageService: UploadImageService,
    private editBookService: EditBookService,
    private getBookService: GetBookService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

    onSubmit() {
      this.editBookService.sendBook(this.book).subscribe(
        data => {
          this.uploadImageService.modify(JSON.parse(JSON.parse(JSON.stringify(data))._body).id);
          this.bookUpdated = true;
          console.log(this.book);
        },
        err => {
          console.log(err);
        });
    }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = 'id';
      this.bookId = Number.parseInt(params[id], 10);
    });

    this.getBookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },
      err => {
        console.log(err);
      }
    );
  }

}
