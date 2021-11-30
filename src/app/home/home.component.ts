import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';

import { ShortenerService } from './shortener.service';

interface URLCard {
  hostname: string;
  long_url: string;
  short_url: string;
  created_at: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  inputURL: any = '';
  URLCards: URLCard[] = [];

  constructor(private shortenerService: ShortenerService) {}

  ngOnInit() {
    // this.isLoading = true;
    // this.quoteService.getRandomQuote({ category: 'dev' })
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((quote: string) => { this.quote = quote; });
  }

  shortURL(url: string) {
    this.shortenerService.postURL(url).subscribe((result: any) => {
      console.log(result);
      this.URLCards.push({
        hostname: result.url.match(
          /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/
        )[3],
        long_url: result.url,
        short_url: environment.serverUrl + '/' + result.code,
        created_at: result.created_at,
      });
      console.log(this.URLCards);
    });
  }
}
