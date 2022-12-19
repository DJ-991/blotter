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
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private gridApi!: GridApi;
  rowImmutableStore: any = [];
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
  searchValue: boolean = true;
  dateValue: boolean = true;
  exportButton: boolean = false;
  noRowsTemplate: any
  loadingTemplate: any;

  public overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">No records found!</span>';
  public overlayNoRowsTemplate =
    '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';

  dropDownList: any = [
    {
      name: 'USD',
      disable: false,
    },
    {
      name: 'EUR',
      disable: false,
    },
    {
      name: 'GBP',
      disable: false,
    },
    {
      name: 'AUD',
      disable: false,
    },
  ];

  selectedCCY1: any = 'select';
  selectedCCY2: any = 'select';
  searchBox: any = null;
  dateBox: any = null;


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
      Date: new Date('2022-12-05').toLocaleDateString('en-US'),
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
      Date: new Date('2022-12-10').toLocaleDateString('en-US'),
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
      Date: new Date('2022-12-15').toLocaleDateString('en-US'),
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
      Date: new Date('2022-12-16').toLocaleDateString('en-US'),
    },
  ];

  colDefs: ColDef[] = [
    { field: 'CCY1' },
    { field: 'CCY2' },
    { field: 'Buy_Rate', editable: true },
    { field: 'Sell_Rate', editable: true },
    {
      field: 'Buy_Offer',
      editable: true,
      valueFormatter: this.percentageFormate,
    },
    {
      field: 'Sell_Offer',
      editable: true,
      valueFormatter: this.percentageFormate,
    },
    { field: 'Buy_Deal' },
    { field: 'Sell_Deal' },
    {
      field: 'Date',
      valueFormatter: function (params) {
        return moment(params.value).format('DD-MM-YYYY');
      },
    },
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

  constructor() {
    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">data is loading...</span>`;
    this.noRowsTemplate =
      `"<span">no rows to show</span>"`;
  }

  ngOnInit() { }

  /** Export data in excel */
  onBtExport() {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'CCY_pair',
    };
    this.gridApi.exportDataAsCsv(params);
  }

  percentageFormate(params: ValueFormatterParams) {
    return params.value + '%';
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
    this.rowImmutableStore = this.getDataFromLocalStorage();
    if (this.rowImmutableStore.length == 0) {
      this.rowData = this.rowData;
      this.rowImmutableStore = this.rowData;
      localStorage.setItem('ag-grid-data', JSON.stringify(this.rowData));
      this.rowImmutableStore = this.getDataFromLocalStorage();
    } else {
      this.rowImmutableStore = this.getDataFromLocalStorage();
      this.rowData = this.rowImmutableStore;
    }
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('data after changes is: ', event.data);
  }

  onCellEditRequest(event: CellEditRequestEvent) {
    console.log('test');
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    var newItem: any = { ...data };

    if (field == 'Buy_Rate') {
      newItem.Buy_Deal = (newValue * newItem.Buy_Offer.toString()) / 100;
    } else if (field == 'Buy_Offer') {
      newItem.Buy_Deal = (newValue * newItem.Buy_Rate.toString()) / 100;
    } else if (field == 'Sell_Rate') {
      newItem.Sell_Deal = (newValue * newItem.Sell_Offer.toString()) / 100;
    } else if (field == 'Sell_Offer') {
      newItem.Sell_Deal = (newValue * newItem.Sell_Rate.toString()) / 100;
    }

    console.log(newItem);

    newItem[field!] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to 00' + newValue);
    this.rowImmutableStore = this.rowImmutableStore.map((oldItem: any) =>
      oldItem.id == newItem.id ? newItem : oldItem
    );
    this.gridApi.setRowData(this.rowImmutableStore);

    localStorage.setItem(
      'ag-grid-data',
      JSON.stringify(this.rowImmutableStore)
    );
    this.rowImmutableStore = this.getDataFromLocalStorage();
    this.rowData = this.rowImmutableStore;
  }

  /** Change event */
  onChange($event: any, type: any) {
    this.dropDownList = this.dropDownList.map((item: any) => {
      if (item.name == $event.target.value) {
        item.disable = true;
      } else if (
        this.selectedCCY1 != item.name ||
        this.selectedCCY2 != item.name
      ) {
        item.disable = false;
      }
      return item;
    });
  }

  /** Add new record */
  addNewRecord() {
    if (this.selectedCCY1 != 'select' && this.selectedCCY2 != 'select') {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

      const obj = {
        id: s4(),
        CCY1: this.selectedCCY1,
        CCY2: this.selectedCCY2,
        Buy_Rate: 0,
        Sell_Rate: 0,
        Buy_Offer: 0,
        Sell_Offer: 0,
        Buy_Deal: 0,
        Sell_Deal: 0,
        Date: new Date().toLocaleDateString('en-US'),
      };

      this.rowImmutableStore.push(obj);
      this.gridApi.setRowData(this.rowImmutableStore);
      this.resetAddForm();

      localStorage.setItem(
        'ag-grid-data',
        JSON.stringify(this.rowImmutableStore)
      );
      this.rowImmutableStore = this.getDataFromLocalStorage();
      this.rowData = this.rowImmutableStore;
    } else {
      window.alert('Please select CCY Pair');
    }
  }

  /** Reset form */
  resetAddForm() {
    this.selectedCCY1 = 'select';
    this.selectedCCY2 = 'select';
    this.dropDownList = this.dropDownList.map((item: any) => {
      item.disable = false;
      return item;
    });
  }

  /** Reset selected input */
  resetSelectedInput() {
    this.resetAddForm();
  }

  /** When no text in input box */
  onFilterTextBoxChanged() {
    if (this.searchBox == null) {
      this.gridApi.setQuickFilter(this.searchBox);
    }
  }

  /** When no Date in input box */
  onFilterDateBoxChanged() {
    if (this.dateBox == null) {
      this.gridApi.setQuickFilter(this.dateBox);
    }
  }

  /** When click on go filter */
  ongoFilter() {
    var rowImmutableStore: any = [];
    if (this.dateBox && this.searchBox) {
      this.gridApi.setQuickFilter(
        this.searchBox
      );
      this.rowImmutableStore.filter((item: any) => {
        if (moment(item.Date).isSameOrBefore(moment(this.dateBox))) {
          rowImmutableStore.push(item);
          this.gridApi.setRowData(rowImmutableStore);
        } else {
          this.gridApi.setRowData(rowImmutableStore);
        }
      });
    } else if (this.dateBox) {
      this.rowImmutableStore.filter((item: any) => {
        if (moment(item.Date).isSameOrBefore(moment(this.dateBox))) {
          rowImmutableStore.push(item);
          this.gridApi.setRowData(rowImmutableStore);
        } else {
          this.gridApi.setRowData(rowImmutableStore);
        }
      });
    }
    else {
      this.gridApi.setQuickFilter(
        this.searchBox
      );
      if (this.gridApi.getDisplayedRowCount() == 0) {
        // this.gridApi.setRowData(rowImmutableStore);
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
        this.exportButton = false;
      }
    }

    console.log(this.gridApi.getDisplayedRowCount());

    if (this.gridApi.getDisplayedRowCount() == 0) {
      this.gridApi.showLoadingOverlay();
      this.exportButton = true;
    } else {
      this.gridApi.hideOverlay();
      this.exportButton = false;
    }

  }

  /** Reset form */
  resetSearchForm() {
    this.dateBox = null;
    this.searchBox = null;
    this.searchValue = true;
    this.dateValue = true;
    this.exportButton = false;
    this.gridApi.setRowData(this.rowImmutableStore);
    this.gridApi.setQuickFilter(this.searchBox);
  }

  /** Set data in local storage */
  setDataInLocalStorage() { }

  /** Get data from localStorage */
  getDataFromLocalStorage() {
    if (localStorage.getItem('ag-grid-data') === null) {
      this.rowImmutableStore = [];
    } else {
      this.rowImmutableStore = JSON.parse(
        localStorage.getItem('ag-grid-data') || ''
      );
    }
    return this.rowImmutableStore;
  }

  /** Input change event */
  onSearchChange(searchValue: string, type: any): void {
    if (type == 'text') {
      if (searchValue) {
        this.searchValue = false;
      } else {
        this.searchValue = true;
        this.resetSearchForm();
      }
    } else {
      if (searchValue) {
        this.dateValue = false;
      } else {
        this.dateValue = true;
        this.resetSearchForm();
      }
    }
  }

  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  onBtShowNoRows() {
    this.gridApi.showNoRowsOverlay();
  }

  onBtHide() {
    this.gridApi.hideOverlay();
  }
}
