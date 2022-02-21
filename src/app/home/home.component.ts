import { AfterViewInit,  Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from './products.service';
import {MatDialog,MatDialogRef,} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '@app/sharedcomponents/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  quote: string | undefined;
  isLoading = false;
  displayedColumns: string[] = [
    'select',
    'id',
    'pName',
    'PStockLocation',
    'qtyInStock',
    'pUnitPrice',
    'inventoryValue',
    'reorder',
    'reorderQty',
    // 'itemDiscontinued',
    'vendor',
    // 'pDescription',
    'viewDetails',
  ];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  totalInventoryCount:number=0;
  totalInventoryCost:number = 0;
  totalInventoryVendors:number = 7;
  totalInventoryOrders :number =0;
  totalInventorySales:number=20;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor( private router: Router, private _products: ProductsService,public dialog: MatDialog) {}

  ngOnInit() {
    this.getInvetory();
  }

  ngAfterViewInit() {

  }
  getInvetory() {
    this.isLoading = true;
    const apiUrl = environment.apiUrl;
    const apiName = 'inventory';
    this._products.getData(apiUrl, apiName).subscribe(
      (data: any) => {
        console.log('got data into home', data);
        this.calcMainDIVInfo(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log('Error Occured while fetching data from server');
      }
    );
  }


  calcMainDIVInfo(data :any){
    this.totalInventoryCount=0;
    this.totalInventoryCost = 0;
    this.totalInventoryVendors = 7;
    this.totalInventoryOrders  =0;
    data.forEach((ele:any) =>{
      this.totalInventoryCount += parseInt(ele.qtyInStock);
      this.totalInventoryCost += parseInt(ele.qtyInStock) * parseInt(ele.pUnitPrice) ;    
      this.totalInventoryOrders  += parseInt(ele.reorderQty);


    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** W6000ther the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource !== undefined) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ProductId + 1}`;
  }
 /**
   * @function addInventory() add Inventory page 
   * @author Nitin Shelar 
   */
  addInventory() {
    // this.router.navigateByUrl('/add-inventory')
    this.router.navigate(['/add-inventory']);
  }

  /**
   * @function goToStcoks() navigate to stcoks page
   * @author Nitin Shelar 
   */
  goToStcoks(){
    this.router.navigate(['/stocks']);
  }

  /**
   * @function editInventory() Updates the enventory record
   * @author Nitin Shelar 
   */
  editInventory(inv: any) {
    console.log('Invnetory to updtae', inv);
    this._products.UpdateInventoryRec.next(inv);
    this.router.navigate(['/add-inventory']);
  }

  deliteInventory(data: any) {
    console.log(data);
   const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data: data,
    });

    dialogRef.componentInstance.onDelete.subscribe(
      (res:any)=>{
        console.log('success delete',res); 
        if(res){
            const apiUrl = environment.apiUrl;
            const apiName = `inventory/${data.id}/`;
            this._products.deleteData(apiUrl, apiName).subscribe(
              (data: any) => {
                console.log('deleted');
                this.getInvetory();
              },
              (error: any) => {
                console.log(error);
              }
            );
        }
      },
      (error:any)=>{
        console.log('error',error);
      }
    )
    
  
  }
}
