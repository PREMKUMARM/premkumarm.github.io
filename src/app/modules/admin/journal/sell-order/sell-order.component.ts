import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JournalApiService } from '../journal/journal-api.service';

@Component({
  selector: 'app-sell-order',
  templateUrl: './sell-order.component.html',
  styleUrls: ['./sell-order.component.scss']
})
export class SellOrderComponent implements OnInit {

  sellOrderForm: FormGroup;
  formFieldHelpers: string[] = [''];

  @Input() tradeObj: any;
  @Input() instrumentKey: any;

  constructor(private fb: FormBuilder, private _journalService: JournalApiService) { }

  ngOnInit(): void {
    console.log(this.tradeObj);
    this.initForm();
  }

  initForm(){
    this.sellOrderForm = this.fb.group({
        orderId: [''],
        scriptName: [this.tradeObj._tradingsymbol, []],
        sellPrice: [null, [Validators.required]],
        quantity: [this.tradeObj._quantity, [Validators.required]]
    }, { updateOn: 'blur' });
  }

  placeSellOrder(){
    let formObj = this.sellOrderForm.getRawValue();
    this._journalService.placeSellOrder(this.instrumentKey, formObj.sellPrice, formObj.quantity).subscribe(res=>{
      console.log("order::", res);
  }, err=>{
      console.log("order err::", err);
  })
  }



}
