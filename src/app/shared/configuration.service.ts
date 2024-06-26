import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  totalFunds: number = 300000;
  availableFund: number = 300000;
  usedFunds: number = 0;
  riskPercentage: number = 1;
  rewardPercentage: number = 2;
  lotSize: number = 15;
  profitNLoss: number = 0;

  constructor() { }
}
