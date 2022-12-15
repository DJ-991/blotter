import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blott';
  rowData: any[] = [
    {
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 90,
      Sell_Rate: 70,
      Buy_Offer: '10%',
      Sell_Offer: '6%',
      Buy_Deal: 'Buy R x Buy Off',
      Sell_Deal: 'Sell R x Sell Off',
      Date: '14-12-2022',
    },
    {
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 80,
      Sell_Rate: 60,
      Buy_Offer: '20%',
      Sell_Offer: '12%',
      Buy_Deal: 'Buy R x Buy Off',
      Sell_Deal: 'Sell R x Sell Off',
      Date: '14-12-2022',
    },
    {
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 70,
      Sell_Rate: 50,
      Buy_Offer: '25%',
      Sell_Offer: '15%',
      Buy_Deal: 'Buy R x Buy Off',
      Sell_Deal: 'Sell R x Sell Off',
      Date: '14-12-2022',
    },
    {
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 100,
      Sell_Rate: 80,
      Buy_Offer: '5%',
      Sell_Offer: '2%',
      Buy_Deal: 'Buy R x Buy Off',
      Sell_Deal: 'Sell R x Sell Off',
      Date: '14-12-2022',
    },
  ];

  colDefs: ColDef[] = [
    { field: 'CCY1' },
    { field: 'CCY2' },
    { field: 'Buy_Rate', editable: true },
    { field: 'Sell_Rate', editable: true },
    { field: 'Buy_Offer', editable: true },
    { field: 'Sell_Offer', editable: true },
    { field: 'Buy_Deal' },
    { field: 'Sell_Deal' },
    { field: 'Date' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
}
