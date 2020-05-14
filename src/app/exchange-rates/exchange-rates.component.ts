import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';

const feedQuery = gql`
query getUsdExchangeRate {
  rates(currency: "USD") {
    currency
    rate
  }
}
`;

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: feedQuery
    })
    .valueChanges.subscribe((result: any) => {
      this.rates = result.data.rates;
      this.loading = result.loading;
      this.error = result.error;
    })
  }


}
