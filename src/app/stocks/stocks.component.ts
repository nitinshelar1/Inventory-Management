import { AfterViewInit, AfterContentChecked, Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from '@app/home/products.service';
import { StocksService } from '@app/home/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = [
    'orderId',
    'pName',
    'orderAmt',
    'orderStatus',
    'orderDate',
    'deliveryDate',
    'stockLocation',
    'addToInv'
  ];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router,
     private _products: ProductsService,
     private _stcoks :StocksService
     ) { }

  ngOnInit(): void {
    this.getStocks()
  }
  ngAfterViewInit() {

  }

  /**
   * 
   */
  getStocks(){
    
  }
  
}
