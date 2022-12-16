import { Component } from '@angular/core';
import {
  CellEditRequestEvent,
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  ExcelStyle,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private gridApi!: GridApi;
  rowImmutableStore: any = [];
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;


  title = 'blott';
  rowData: any[] = [
    {
      id: 1,
      CCY1: 'USD',
      CCY2: 'GBP',
      Buy_Rate: 90,
      Sell_Rate: 70,
      Buy_Offer: 0,
      Sell_Offer: 0,
      Buy_Deal: 0,
      Sell_Deal: 0,
      Date: '14-12-2022',
    },
    {
      id: 2,
      CCY1: 'AUD',
      CCY2: 'EUR',
      Buy_Rate: 80,
      Sell_Rate: 60,
      Buy_Offer: 0,
      Sell_Offer: 0,
      Buy_Deal: 0,
      Sell_Deal: 0,
      Date: '14-12-2022',
    },
    {
      id: 3,
      CCY1: 'EUR',
      CCY2: 'GBP',
      Buy_Rate: 70,
      Sell_Rate: 50,
      Buy_Offer: 0,
      Sell_Offer: 0,
      Buy_Deal: 0,
      Sell_Deal: 0,
      Date: '14-12-2022',
    },
    {
      id: 4,
      CCY1: 'AUD',
      CCY2: 'GBP',
      Buy_Rate: 100,
      Sell_Rate: 80,
      Buy_Offer: 0,
      Sell_Offer: 0,
      Buy_Deal: 0,
      Sell_Deal: 0,
      Date: '14-12-2022',
    },
  ];

  colDefs: ColDef[] = [
    { field: 'CCY1' },
    { field: 'CCY2' },
    { field: 'Buy_Rate', editable: true },
    { field: 'Sell_Rate', editable: true },
    { field: 'Buy_Offer', editable: true, valueFormatter: this.percentageFormate },
    { field: 'Sell_Offer', editable: true, valueFormatter: this.percentageFormate },
    { field: 'Buy_Deal' },
    { field: 'Sell_Deal' },
    { field: 'Date' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public excelStyles: ExcelStyle[] = [
    {
      id: 'multiline',
      alignment: {
        wrapText: true,
      },
    },
  ];

  /** Export data in excel */
  onBtExport() {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'filename_of_your_choice',
    };
    this.gridApi.exportDataAsCsv(params);
  }

  percentageFormate(params: ValueFormatterParams) {
    return params.value + '%'
  }

  formatNumber(number: number) {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = this.rowData;
    this.rowImmutableStore = this.rowData;
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('data after changes is: ', event.data);
  }


  onCellEditRequest(event: CellEditRequestEvent) {
    console.log("test");
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    var newItem: any = { ...data };

    if (field == 'Buy_Rate') {
      newItem.Buy_Deal = (newValue * newItem.Buy_Offer.toString()) / 100
    } else if (field == 'Buy_Offer') {
      newItem.Buy_Deal = (newValue * newItem.Buy_Rate.toString()) / 100
    } else if (field == 'Sell_Rate') {
      newItem.Sell_Deal = (newValue * newItem.Sell_Offer.toString()) / 100
    } else if (field == 'Sell_Offer') {
      newItem.Sell_Deal = (newValue * newItem.Sell_Rate.toString()) / 100

    }

    console.log(newItem)


    newItem[field!] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to 00' + newValue);
    this.rowImmutableStore = this.rowImmutableStore.map((oldItem: any) =>
      oldItem.id == newItem.id ? newItem : oldItem
    );
    this.gridApi.setRowData(this.rowImmutableStore);
  }
}
