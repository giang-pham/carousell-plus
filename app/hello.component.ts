import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {TruncatePipe} from './truncate';

@Component({
  selector: 'hello-component',
  viewProviders: [HTTP_PROVIDERS],
  pipes: [TruncatePipe],
  template: `
  <input #searchStr placeholder="books, camera, games, ..." />
  <button (click)="getProductList(searchStr.value)">Search</button>
  <div class="card-columns">
    <div *ngFor="#item of items; #i = index" class="card">
      <img class="card-img-top" data-src="{{item.primary_photo_url}}" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">{{item.title}}</h4>
        <p class="card-text">{{item.description | truncate : letterLimit}}</p>
        <a href="#" class="btn btn-primary">PM</a>
      </div>
    </div>
  </div>
  `
})
export class HelloComponent {
  items:Object[] = [];
  letterLimit:number = 100;
  searchStr:string = '';

  constructor(private http: Http) {
    this.getProductList(this.searchStr);
  }

  getProductList(searchStr:string) {
    this.http.get('http://localhost:8080/products', {
        search: "searchStr=" + searchStr
      })
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(
        data => this.items = data,
        err => console.log(err),
        () => console.log('Get Product Complete'));
  }
}
