import {Component, Input} from 'angular2/core'
import {TruncatePipe} from '../utility/truncate';

@Component({
  selector: 'product-card',
  pipes: [TruncatePipe],
  templateUrl: 'app/product-card/product-card.html'
})

export class ProductCard {
  @Input() item;
  letterLimit:number = 100;

  constructor() {
  }
}
