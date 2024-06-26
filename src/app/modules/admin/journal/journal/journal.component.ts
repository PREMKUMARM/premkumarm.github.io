import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { UtilityService } from 'app/shared/utility.service';
import { JournalApiService } from './journal-api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'journal',
    templateUrl: './journal.component.html',
    styleUrls: ['./journal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JournalComponent implements OnInit {

    mockTrades: any = [];

    formFieldHelpers: string[] = [''];

    investorForm: FormGroup;

    capital: number = 0;
    pnl: number = null;
    totalFund: number = 0;
    usedFunds: number = 0;
    availableFund: number = 0;
    dayProfit: number = 0;

    isGoodTrade: boolean = false;

    orderType: string = 'BUY';
    optionType: string = 'CE';

    orderCount: any;

    tradeStatus: {
        totalTrades: number;
        profitTrades: number;
        lossTrades: number;
        pnl: number;
    };

    selectedOption:any = {};

    selectedOptionType: string = "CE";

    instrumentControl = new FormControl('', [Validators.required]);
    //options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<any[]>;

    activeTradeObj: any = {};

    instruments = [];


    @ViewChild(MatTable, { static: false }) table: MatTable<any>

    activeTradeForm: FormGroup;

    data: any = {
        trades: {
            columns: ['scriptName', 'entryPrice', 'stoploss', 'targetPrice', 'quantity', 'riskReward', 'profitNloss', 'status', 'action'],
            rows: []
        }
    };

    trades: any = {
        columns: ['tradingsymbol', 'quantity', 'buy_price', 'sell_price', 'buy_value', 'sell_value', 'pnl'],
        rows: []
    };

    tradesGroup: any = [];

    /**
     * Constructor
     */
    constructor(private changeDetectorRefs: ChangeDetectorRef, private formBuilder: FormBuilder, private _utils: UtilityService, public fb: FormBuilder, private _journalService: JournalApiService) {

        //this.updateHeaders();
       
        this.initForm();
        this.invokeListeners();

        /* let o = this.generateTradesGroup(this.mockTrades);
        this.trades.rows = o;
        console.log("formatted obj::", o);
 */
        
    }

    initForm(){
        this.activeTradeForm = this.fb.group({
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

    invokeListeners(){
        this.updateHeaders();
        this.activeTradeForm.valueChanges.subscribe(fg =>{
            if(fg.entryPrice && fg.stoploss){
                this.activeTradeForm.get('suggestedTarget').patchValue(this._utils.calculateSuggestedTarget(fg.entryPrice , fg.stoploss), { emitEvent: false });
                this.calculateQty();

                if(this.activeTradeForm.valid){
                    this.updateCalculations();
                }
            }
        })
    }

    generateTradesGroup(tradesArr) {
        let tradesCount = tradesArr.length;
        let trades = [];
        let pnlTotal = 0;
        let profitTrades = 0;
        let lossTrades = 0;

        for (let i = 0; i < tradesCount; i++) {
            let obj = {
                tradingsymbol: tradesArr[i].tradingsymbol,
                buy_price: tradesArr[i].average_price,
                sell_price: tradesArr[i + 1] ? tradesArr[i + 1].average_price : '',
                quantity: tradesArr[i].quantity
            };

            if (obj.buy_price && obj.sell_price) {
                obj['buy_value'] = obj.buy_price * obj.quantity;
                obj['sell_value'] = obj.sell_price * obj.quantity;
                obj['pnl'] = obj['sell_value'] - obj['buy_value'];
            }
            if (tradesArr[i].status == 'complete') {
                trades.push(obj);
            }

            if (obj['pnl']) {
                pnlTotal += obj['pnl'];

                if (obj['pnl'] < 0) {
                    lossTrades++;
                }

                if (obj['pnl'] > 0) {
                    profitTrades++;
                }
            }


            i++;
        }

        this.tradeStatus = {
            pnl: pnlTotal,
            profitTrades,
            lossTrades,
            totalTrades: 0
        }
        return trades;
    }

    updateHeaders() {
        this.totalFund = this._utils.getTotalFunds();
        this.availableFund = this._utils.getAvailableFunds();
        this.usedFunds = this._utils.getUsedFunds();
        this.dayProfit = this._utils.getProfitNloss();


    }

    ngOnInit(): void {

        this.filteredOptions = this.instrumentControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
           
        this._journalService.getAccessToken().subscribe(t=>{
            this._journalService.getOptionChain('NSE_INDEX|Nifty Bank', t).subscribe(res=>{
                console.log(res);
                this.instruments = res.data;
            });
        });      


        this._journalService.getAccountBalance().subscribe(res => {
            console.log("Balance Response::", res);
            this._utils.setTotalFunds(res.data.equity._available_margin);
            this._utils.setAvailableFunds(res.data.equity._available_margin);
            this.updateHeaders();
        });
        /*
        this.activeTradeForm.get('entryPrice').valueChanges.subscribe((form) => {
            this.calculateQty();
            this.updateCalculations();
        });

        this.activeTradeForm.get('stoploss').valueChanges.subscribe((form) => {
            this.calculateQty();
            this.updateCalculations();
        });

        this.activeTradeForm.get('targetPrice').valueChanges.subscribe((form) => {
            this.updateCalculations();
        });

        this.activeTradeForm.get('quantity').valueChanges.subscribe((form) => {
            this.updateCalculations();
        }); */


    }

    instrumentSelected(ins){
        this.selectedOption = this.instruments.find(option => option.trading_symbol == ins.option.value);
        this.selectedOptionType = this.selectedOption.instrument_type;
    }

    setInstrumentKey(instrument_key){
        this.selectedOption = this.instruments.find(option => option.instrument_key == instrument_key);
        this.selectedOptionType = this.selectedOption.instrument_type;
        console.log(this.selectedOption);
    }

    _filter(value: any): any[] {
        let filterValue = '';
        if(value){
            filterValue = value.toString().toLowerCase();
        }
    
        return this.instruments.filter(option => option.trading_symbol.toString().toLowerCase().includes(filterValue));
      }

    updateCalculations() {
        this.calculateRiskReward();
        this.calculateBuyValue();
        this.calculateStoplossValue();
        this.calculateSellValue();
        this.calculateProfit();
        this.calculateLoss();
       // this.updateHeaders();
    }
    
    resetForm() {
        let instrument_key = '';
        if(this.selectedOptionType == 'CE'){
            instrument_key = this.selectedOption.instrument_key;
        } else {
            instrument_key = this.selectedOption.instrument_key;
        }
        this._journalService.getCandles(instrument_key).subscribe(res=>{
            console.log("candles::", res && res[0]);
        });
        this.activeTradeForm.reset();
        this.activeTradeForm.markAsUntouched();
        this.activeTradeForm.markAsPristine();
        this.activeTradeForm.updateValueAndValidity();
        Object.keys(this.activeTradeForm.controls).forEach(key => {
            this.activeTradeForm.controls[key].setErrors(null)
        });
        
    }
    /*
    edit(b) {
        console.log(b);
    }

    delete(idx) {
        this.data.trades.rows.splice(idx, 1);
        this.table.renderRows();
        this.resetForm();
    }
    */
    analyse() {
        let formObj = this.activeTradeForm.getRawValue();
        console.log("analyse::", formObj);
        if (formObj.tradeId) {
            let idx = this.data.trades.rows.findIndex((obj => obj.tradeId == formObj.tradeId));
            this.data.trades.rows[idx] = formObj;
        } else {
            formObj.tradeId = new Date().getDate().toString() + Math.random().toString(36).slice(2, 10);
            formObj.status = 'OPEN';
            this.data.trades.rows.push(formObj);
        }
        this.table.renderRows();
        this.resetForm();
    }
    
    calculateQty() {
        let formObj = this.activeTradeForm.getRawValue();
        console.log("formObj::", formObj);

        if (formObj.entryPrice && formObj.stoploss) {
            let qty = this._utils.calculateQuantity(formObj.entryPrice, formObj.stoploss);
            console.log("qty::", qty);
            this.activeTradeForm.get('quantity').setValue(qty, { emitEvent: false });
        }

    }

    calculateRiskReward() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let riskRewardObj = this._utils.calculateRiskReward(formObj.entryPrice, formObj.stoploss, formObj.targetPrice, formObj.quantity);
            this.activeTradeForm.get('riskReward').setValue(riskRewardObj.risk + ':' + riskRewardObj.reward, { emitEvent: false });

            this.isGoodTrade = (riskRewardObj.risk <= this._utils.getRiskPerTrade()) && (riskRewardObj.reward >= this._utils.getRewardPerTrade());
        }
    }

    calculateBuyValue() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let buyValue = this._utils.calculateBuyValue(formObj.entryPrice, formObj.quantity);
            this.activeTradeForm.get('buyValue').setValue(buyValue, { emitEvent: false });
        }
    }

    calculateStoplossValue() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let stoploss = this._utils.calculateStoplossValue(formObj.stoploss, formObj.quantity);
            this.activeTradeForm.get('stoplossValue').setValue(stoploss, { emitEvent: false });
        }
    }

    calculateSellValue() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let sellValue = this._utils.calculateSellValue(formObj.targetPrice, formObj.quantity);
            this.activeTradeForm.get('sellValue').setValue(sellValue, { emitEvent: false });
        }
    }

    calculateProfit() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let profit = this._utils.calculateProfit(formObj.entryPrice, formObj.stoploss, formObj.targetPrice, formObj.quantity);
            this.activeTradeForm.get('maxProfit').setValue(profit, { emitEvent: false });
        }
    }

    calculateLoss() {
        if (this.activeTradeForm.valid) {
            let formObj = this.activeTradeForm.getRawValue();
            console.log("formObj::", formObj);
            let loss = this._utils.calculateLoss(formObj.entryPrice, formObj.stoploss, formObj.targetPrice, formObj.quantity);
            this.activeTradeForm.get('maxLoss').setValue(loss, { emitEvent: false });
        }
    }

    updateTradeStatus(action, tradeObj) {
        this.activeTradeObj = tradeObj;
        console.log("action", action, tradeObj);
        switch (action) {
            case 'MODIFY':
                this.setInstrumentKey(tradeObj._instrument_token);
                let obj = {
                    tradeId: tradeObj._order_id,
                    scriptName: this.selectedOption.trading_symbol,
                    entryPrice: tradeObj._price,
                    stoploss: tradeObj._trigger_price,
                    targetPrice: this._utils.calculateSuggestedTarget(tradeObj._price , tradeObj._trigger_price),
                    quantity: tradeObj._quantity
                };

                this.instrumentControl.patchValue(this.selectedOption.trading_symbol, {emitEvent: false});
                /**
                 * tradeId: [''],
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
                 */
                this.activeTradeForm.patchValue(obj);
                break;

            case 'EXECUTED':
                this._utils.executedTrade(tradeObj);
                tradeObj.status = 'EXECUTED';
                break;

            case 'TARGET_HIT':
                this._utils.targetHit(tradeObj);
                tradeObj.status = 'TARGET_HIT';
                tradeObj.profitNloss = tradeObj.maxProfit;
                break;
            case 'STOPLOSS_HIT':
                this._utils.stoplossHit(tradeObj);
                tradeObj.status = 'STOPLOSS_HIT';
                tradeObj.profitNloss = -1 * tradeObj.maxLoss;
                break;
            case 'CANCEL_ORDER':
                this.cancelOrder(tradeObj._order_id)
                break;
            case 'SELL_ORDER':
                console.log(tradeObj);
                this.orderType = 'SELL';
                this.changeDetectorRefs.detectChanges();
                break;

        }

        this.updateHeaders();
    }

    placeOrder() {
        let formObj = this.activeTradeForm.getRawValue();
        let instrument_key = '';
        if(this.selectedOptionType == 'CE'){
            instrument_key = this.selectedOption.instrument_key;
        } else {
            instrument_key = this.selectedOption.instrument_key;
        }
        
        this._journalService.placeOrder(instrument_key, formObj.entryPrice, formObj.stoploss, formObj.quantity).subscribe(res=>{
            console.log("order::", res);
            this.resetForm();
        }, err=>{
            console.log("order err::", err);
            this.resetForm();
        })
    }

    modifyOrder() {
        let formObj = this.activeTradeForm.getRawValue();
        let instrument_key = '';
        if(this.selectedOptionType == 'CE'){
            instrument_key = this.selectedOption.instrument_key;
        } else {
            instrument_key = this.selectedOption.instrument_key;
        }
        this._journalService.modifyOrder(this.activeTradeObj._order_id, instrument_key, formObj.entryPrice, formObj.stoploss, formObj.quantity).subscribe(res=>{
            console.log("order::", res);
            this.resetForm();
        }, err=>{
            console.log("order err::", err);
            this.resetForm();
        })
    }

    cancelOrder(orderId){
        this._journalService.cancelOrder(orderId).subscribe(res=>{
            console.log("order::", res);
            this.resetForm();
        }, err=>{
            console.log("order err::", err);
            this.resetForm();
        })
    }

}
