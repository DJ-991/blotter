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
      CCY1: 'EUR',
      CCY2: 'USD',
      Buy_Rate: 72000,
      Sell_Rate: 'Porsche',
      Buy_Offer: 'Boxter',
      Sell_Offer: 72000,
      Buy_Deal: 'Porsche',
      Sell_Deal: 'Boxter',
      Date: '14-12-2022',
    },
    {
      CCY1: 'EUR',
      CCY2: 'GBP',
      Buy_Rate: 72000,
      Sell_Rate: 'Porsche',
      Buy_Offer: 'Boxter',
      Sell_Offer: 72000,
      Buy_Deal: 'Porsche',
      Sell_Deal: 'Boxter',
      Date: '14-12-2022',
    },
    {
      CCY1: 'USD',
      CCY2: 'AUD',
      Buy_Rate: 72000,
      Sell_Rate: 'Porsche',
      Buy_Offer: 'Boxter',
      Sell_Offer: 72000,
      Buy_Deal: 'Porsche',
      Sell_Deal: 'Boxter',
      Date: '14-12-2022',
    },
    {
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 72000,
      Sell_Rate: 'Porsche',
      Buy_Offer: 'Boxter',
      Sell_Offer: 72000,
      Buy_Deal: 'Porsche',
      Sell_Deal: 'Boxter',
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
