import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  onDelete = new EventEmitter();
  deleteName: any
  deletSatatus : boolean;
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public d: any,) { 
      this.deleteName = d.pName; 
    }

  ngOnInit(): void {
  }
   /** @author NITIN SHELAR @description  CLOSE THE DAILOG*/
   close(){
    this.deletSatatus = false;
    this.dialogRef.close();
    this.onDelete.emit(this.deletSatatus);
  }

  /** @author NITIN SHELAR @description  CONFIRM THE ACTION */
  deleteItem(){
      this.deletSatatus = true;
      this.onDelete.emit(this.deletSatatus);
      this.dialogRef.close();
  }


}
