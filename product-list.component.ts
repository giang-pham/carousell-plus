import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {TruncatePipe} from './app/utility/truncate';
import {ProductCard} from './app/product-card/product-card.component';
//import * as spinner from 'ng2-spin-kit/app/spinners'

@Component({
  selector: 'product-list',
  directives: [ProductCard],
  viewProviders: [HTTP_PROVIDERS],
  pipes: [TruncatePipe],
  templateUrl: 'app/product-card/product-list.html'
})
export class ProductListComponent {
  public isRunning: boolean;
  public items: Array<any>;
  searchStr: string = '';

  constructor(private http: Http) {
    //this.getProductList(this.searchStr);
  }

  getProductList(searchStr:string) {
    this.isRunning = true;
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
        () => this.stopRefreshing());
  }
  private stopRefreshing() {
    this.isRunning = false;
  }
}
