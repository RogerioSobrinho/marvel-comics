import { Component, OnInit } from '@angular/core';
import { HttpStatusService } from '../../services/http-status.service';
import { IComics } from 'src/app/models/comics.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  private comics: Array<IComics>;
  constructor(private httpStatusService: HttpStatusService) { }

  ngOnInit() {
    this.getComics();
  }

  getComics() {
    this.httpStatusService
      .get('/v1/public/comics', true)
      .subscribe(
        res => {
          this.comics = res.body.data.results;
        },
        err => console.error(err)
      );
  }

  getImage(comic) {
    console.log(comic);
    return comic.images.length > 0
          ? `${comic.images[0].path}/portrait_xlarge.${comic.images[0].extension}`
          : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg';
  }

}
