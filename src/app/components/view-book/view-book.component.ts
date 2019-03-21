import { Book } from './../../models/book';
import { GetBookService } from './../../service/get-book.service';
import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private book: Book = new Book();
  private bookId: number;

  constructor(
    private getBookService: GetBookService,
    private route: ActivatedRoute,
    private router: Router) { }

    onSelect(book: Book) {
     this.router.navigate(['/editBook', this.book.id]);
      // .then(s => location.reload());
    }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const val = 'id';
      this.bookId = Number.parseInt(params[val], 10);
    });
    this.getBookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },
      err => {
      console.log(err);
      });
  }

}
