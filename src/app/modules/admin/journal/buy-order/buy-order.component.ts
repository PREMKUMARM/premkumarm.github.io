import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html',
  styleUrls: ['./buy-order.component.scss']
})
export class BuyOrderComponent implements OnInit {

  buyOrderForm: FormGroup;
  formFieldHelpers: string[] = [''];

  isGoodTrade: boolean = false;

  @Input() tradeObj: any;
  @Input() instrumentKey: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buyOrderForm = this.fb.group({
      tradeId: [''],
      scriptName: ['BANKNIFTY47100CE', []],
      entryPrice: [null, [Validators.required]],
      stoploss: [null, [Validators.required]],
      targetPrice: [null, [Validators.required]],
      quantity: [{value: 0, disabled:true}, [Validators.required]],
      suggestedTarget: [null, []],
      riskReward: ['', []],
      buyValue: ['', []],
      stoplossValue: ['', []],
      sellValue: ['', []],
      maxProfit: ['', []],
      maxLoss: ['', []],
      status: ['', []]
  }, { updateOn: 'blur' });
  }

  placeOrder() {

    


  }

  modifyOrder(){

  }

}
