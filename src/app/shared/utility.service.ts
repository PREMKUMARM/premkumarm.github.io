import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _config: ConfigurationService) { }

  getRiskPerTrade() {
    return this._config.riskPercentage;
  }

  getRewardPerTrade() {
    return this._config.rewardPercentage;
  }

  getTotalFunds() {
    return this._config.totalFunds;
  }

  setTotalFunds(fund) {
    this._config.totalFunds = fund;
  }

  getAvailableFunds() {
    return this._config.availableFund;
  }

  setAvailableFunds(fund) {
    this._config.availableFund = fund;
  }

  getUsedFunds() {
    return this._config.usedFunds;
  }

  getProfitNloss() {
    return this._config.profitNLoss;
  }

  calculateSuggestedTarget(entry, stoploss) {
    return  Number(entry + ((entry - stoploss) * 2));
  }

  calculateQuantity(entryPrice, stoploss): number {

    let lossPerTrade = this._config.availableFund * (this._config.riskPercentage / 100);
    let approxQty = Math.round(lossPerTrade / (entryPrice - Number(stoploss)));

    let lots = Math.floor(approxQty % this._config.lotSize);

    return (approxQty - lots) || this._config.lotSize;

  }

  calculateProfit(entryPrice, stoploss, targetPrice, qty) {
    let buyPrice = qty * entryPrice;
    let sellPrice = qty * targetPrice;

    return sellPrice - buyPrice;
  }

  calculateLoss(entryPrice, stoploss, targetPrice, qty) {
    let buyPrice = qty * entryPrice;
    let sellPrice = qty * stoploss;

    return  buyPrice - sellPrice;
  }

  calculateBuyValue(entryPrice, qty){
    return entryPrice * qty;
  }

  calculateStoplossValue(stoploss, qty){
    return stoploss * qty;
  }

  calculateSellValue(targetPrice, qty){
    return targetPrice * qty;
  }

  calculateRiskReward(entryPrice, stoploss, target, qty): {risk: number, reward: number} {
    let maxRiskAmt = (this._config.totalFunds * this._config.riskPercentage) / 100;
    let currentTradeRisk = (entryPrice - stoploss) * qty;
    let risk = Number((currentTradeRisk / maxRiskAmt)).toFixed(0);
    let reward: number = Number(Math.round((target - entryPrice) / (entryPrice - stoploss)).toFixed(0));
    console.log((entryPrice - stoploss), (target - entryPrice), reward);
    return {
      risk: Number(risk),
      reward
    }
  }

  executedTrade(tradeObj){
    console.log('executedTrade::', tradeObj);
    console.log('this._config.usedFunds::', this._config.usedFunds, tradeObj.buyValue, this._config.usedFunds + tradeObj.buyValue);
    this._config.usedFunds = this._config.usedFunds + tradeObj.buyValue;
    console.log('this._config.availableFund 1::', this._config.availableFund, this._config.usedFunds, this._config.totalFunds - this._config.usedFunds);
    this._config.availableFund = this._config.totalFunds - this._config.usedFunds;
    console.log('this._config.availableFund::', this._config.availableFund);
  }

  targetHit(tradeObj){
    this._config.profitNLoss = this._config.profitNLoss + tradeObj.maxProfit;
    //this._config.usedFunds = this._config.usedFunds - tradeObj.buyValue;
    this._config.availableFund = this._config.availableFund + tradeObj.buyValue + tradeObj.maxProfit;

    if(this._config.availableFund > this._config.totalFunds){
      this._config.availableFund =  this._config.totalFunds;
    }

    if(this._config.profitNLoss < 0) {
      this._config.usedFunds = this._config.totalFunds - this._config.availableFund;
    } else {
      this._config.usedFunds = 0;
    }
  }

  stoplossHit(tradeObj){
    this._config.profitNLoss = this._config.profitNLoss - tradeObj.maxLoss;
    //this._config.usedFunds = this._config.usedFunds -  tradeObj.buyValue + tradeObj.maxLoss;
    this._config.availableFund = this._config.availableFund + tradeObj.buyValue;

    if(this._config.profitNLoss < 0) {
      this._config.usedFunds = this._config.totalFunds - this._config.availableFund;
    } else {
      this._config.usedFunds = 0;
    }

    // - tradeObj.maxLoss
    if(this._config.profitNLoss < 0){
      this._config.availableFund = this._config.availableFund - this._config.profitNLoss;
    }
  }
}
