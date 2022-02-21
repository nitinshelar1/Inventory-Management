import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit,OnDestroy {
  isLinear = false;
  productForm: FormGroup;
  catgeories: any[];
  locations: any[] = ['Pune', 'Mumbai', 'Delhi', 'Lucknow', 'Nashik', 'Chennai'];
  vendorList: any[] = ['Samsung Pvt Ltd', 'Nokia', 'Apple', 'Real Me'];
  invItem: any = {};
  isUpdate: boolean = false;
  title: string = 'New Inventory Item ';
  invSubscription:Subscription;

  constructor(private _formBuilder: FormBuilder, private _product: ProductsService, private _router: Router) {}

  ngOnInit() {
    this.invSubscription = this._product.UpdateInventoryRec.subscribe(
      (data: any) => {
        console.log('Got data in add-inv comp', data);
        if (data) {
          this.invItem = data;
          this.isUpdate = true;
          this.title = 'Update Inventory Item ';
        }
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.productForm = this._formBuilder.group({
      pName: ['', Validators.required],
      PStockLocation: ['', Validators.required],
      qtyInStock: ['', Validators.required],
      pUnitPrice: ['', Validators.required],
      inventoryValue: ['', Validators.required],
      reorder: ['', Validators.required],
      reorderQty: ['', Validators.required],
      vendor: ['', Validators.required],
      pDescription: ['', Validators.required],
    });
    // If Form is update then bind values from the object that we get from service.
    if (this.isUpdate) {
      this.productForm.patchValue(this.invItem);
    }

    // this.getCategories();
  }
  resetForm(){
    this.productForm.reset();
  } 



  valuechange(event:any){
    console.log('event',event);
    let qtyInstock = this.productForm.get('qtyInStock').value;
    let perPrice = this.productForm.get('pUnitPrice').value;
    if(qtyInstock && perPrice){ 
      let totalInvCost = parseInt(qtyInstock) * parseInt(perPrice);
      this.productForm.get('inventoryValue').setValue(totalInvCost);
    }


  }
  getCategories() {
    const apiUrl = 'http://localhost:3000/';
    const apiName = 'inventory';
    this._product.getData(apiUrl, apiName).subscribe(
      (data: any) => {
        this.catgeories = data;
      },
      (error) => {
        console.log('error occures while getting categories from server', error);
      }
    );
  }

  AddProdInventory() {
    if (this.productForm.invalid) {
      alert('Form is incomplete');
      return;
    }
    console.log(this.productForm.value);
    if (!this.isUpdate) {
      let product = this.productForm.value;
      const apiUrl = environment.apiUrl;
      const apiName = 'inventory';
      const id :string= Math.random().toString(16).slice(2, 8);
      product.id = id;
      product.sku = id;

      this._product.postData(apiUrl, apiName, product).subscribe(
        (data: any) => {
          console.log('succssfully added inventory');
          this._router.navigate(['/home']);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    } else {
      let product = this.productForm.value;
      const apiUrl = environment.apiUrl;
      const apiName = `inventory/${this.invItem.id}`;

      this._product.putData(apiUrl, apiName, product).subscribe(
        (data: any) => {
          console.log('succssfully added inventory');
          this._router.navigate(['/home']);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    }
  }


  goToInventory(){
    this._router.navigate(['/home']);
  }

  ngOnDestroy(): void {
      this.isUpdate = false;
      this.invItem = {};
      this.invSubscription.unsubscribe();
  }
}
