import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { UtilityService } from 'app/shared/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formFieldHelpers: string[] = [''];

  investorForm: FormGroup;

  capital: number = 0;
  pnl: number= null;

  @ViewChild(MatTable, {static: false}) table : MatTable<any>

  investorInfo: {
      investorName: string;
      investedAmount: number;
      investorId: string;
  };

  data: any = {
      budgetDetails: {
          columns: ['investorName', 'investedAmount', 'sharePercent', 'pnlAmount', 'actions'],
          rows: [ { "investorName": "Jaya", "investedAmount": 200000, "investorId": "8me8ugind" } ]
      }
  };
  

  /**
   * Constructor
   */
  constructor(private changeDetectorRefs: ChangeDetectorRef, private formBuilder: FormBuilder, private _utils: UtilityService)
  {
      
  }

  ngOnInit(): void {
      this.resetForm();

      this.calculateCapital(this.data.budgetDetails.rows);
  }

  resetForm(){
      this.investorInfo = {
          investorName: '',
          investedAmount: null,
          investorId: null
      };
  }

  edit(b){
      console.log(b);
      this.investorInfo = Object.assign({}, b);
  }

  delete(idx){
      this.data.budgetDetails.rows.splice(idx, 1);
      this.calculateCapital(this.data.budgetDetails.rows);
      this.table.renderRows();
      this.resetForm();
  }

  calculateCapital(investors) {
      this.capital = 0;
      investors.forEach((c)=>{
          this.capital += Number(c.investedAmount);
      });

      this._utils.setTotalFunds(this.capital);
      this._utils.setAvailableFunds(this.capital);
  }

  addInvestor(){
      if(this.investorInfo.investorId){
         let idx = this.data.budgetDetails.rows.findIndex((obj => obj.investorId == this.investorInfo.investorId));
         this.data.budgetDetails.rows[idx] = this.investorInfo;

      } else {
          this.investorInfo.investorId = new Date().getDate().toString() + Math.random().toString(36).slice(2, 10);;
          this.data.budgetDetails.rows.push(this.investorInfo);
      }
      this.calculateCapital(this.data.budgetDetails.rows);
      if(this.table){
          this.table.renderRows();
      }
      this.resetForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the form field helpers as string
   */
  getFormFieldHelpersAsString(): string
  {
      return this.formFieldHelpers.join(' ');
  }

}
