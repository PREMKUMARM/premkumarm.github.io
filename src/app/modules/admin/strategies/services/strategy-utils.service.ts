import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrategyUtilsService {

  constructor() { }

  generateDateString(date){
    const year: number = new Date(date).getFullYear();

    const month: (string | number) = (new Date(date).getMonth() < 9 ? ('0'+Number(new Date(date).getMonth()+1)) : (new Date(date).getMonth()+1));

    const day: (string | number) = (new Date(date).getDate() < 10 ? ('0'+new Date(date).getDate()) : new Date(date).getDate());

    const dateString = year
    +'-'+ month
    +'-'+day;

    return dateString;
  }


  splitDays(dateArr){
    console.log(dateArr);
    let obj = {};
    dateArr.forEach(e => {
      let date = e[0].split('T')[0];
      if(obj[date]){
        obj[date].push(e);
      } else {
        obj[date] = [e];
      }
    });

    return obj;

  }


  createOHLCobj(jsonObj) {
    return {
      date: jsonObj[0].split('T')[0],
      time: ((jsonObj[0].split('T')[1]).split('+')[0]),
      dateTime: jsonObj[0],
      open: jsonObj[1],
      high: jsonObj[2],
      low: jsonObj[3],
      close: jsonObj[4],
      status: ''
    }
  }

  createCElogic(tObj) {
    return {
      buy: tObj.high,
      stoploss: tObj.open,
      risk: ((tObj.high - tObj.open)).toFixed(2),
      target: (tObj.high + ((tObj.high - tObj.open) * 2)).toFixed(2),
      reward: ((tObj.high - tObj.open) * 2).toFixed(2),
      orderCompleted: false
    }
  }

  createPElogic(tObj) {
    return {
      buy: tObj.low,
      stoploss: tObj.high,
      risk: ((tObj.open - tObj.low)).toFixed(2),
      target: (tObj.low + ((tObj.low - tObj.open) * 2)).toFixed(2),
      reward: ((tObj.open - tObj.low) * 2).toFixed(2),
      orderCompleted: false
    }
  }

  generateCEStatus(tObj, ohlcArr , limits, index) {
    if ((tObj.open > limits.buy) && (ohlcArr[index - 1].status !== 'Buy order placed') && (ohlcArr[index - 1].status !== 'In progress')
      && (ohlcArr[index - 1].status !== 'Stoploss hit') && (ohlcArr[index - 1].status !== 'Target hit') && !limits.orderCompleted) {
      tObj.status = 'Buy order placed';
    }

    else if (tObj.open > limits.stoploss && ohlcArr[index - 1].status == 'Buy order placed') {
      tObj.status = 'In progress';
    }

    else if ( this.between(limits.stoploss, tObj.low, tObj.open) && ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'Stoploss hit';
      limits.orderCompleted = true;
    }

    else if (this.between(limits.target, tObj.open, tObj.high) && ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'Target hit';
      limits.orderCompleted = true;
    }

    else if (ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'In progress';
    }

    return tObj;
  }

  generateStatusNew(tObj, ohlcArr , limits, index) {

    var isOrderPlaced = this.between(limits.buy, tObj.low, tObj.high);

    if(isOrderPlaced){
      limits.orderPlaced = true;
    }

    /* if ((tObj.open > limits.buy) && (ohlcArr[index - 1].status !== 'Buy order placed') && (ohlcArr[index - 1].status !== 'In progress')
      && (ohlcArr[index - 1].status !== 'Stoploss hit') && (ohlcArr[index - 1].status !== 'Target hit') && !limits.orderCompleted) {
      tObj.status = 'Buy order placed';
    }

    else if (tObj.open > limits.stoploss && ohlcArr[index - 1].status == 'Buy order placed') {
      tObj.status = 'In progress';
    }

    else if (tObj.open < limits.stoploss && ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'Stoploss hit';
      limits.orderCompleted = true;
    }

    else if (tObj.high > limits.target && ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'Target hit';
      limits.orderCompleted = true;
    }

    else if (ohlcArr[index - 1].status == 'In progress') {
      tObj.status = 'In progress';
    }
 */
    return tObj;
  }

  trimOutputArr(ohlcArr){
    let outputArr = [];
    ohlcArr.forEach(o => {
      if (o.status && o.status !== 'In progress') {
        outputArr.push(o);
      }
    });
    console.log(outputArr)
    return outputArr;
  }

  generateStatistics(outputObj){

    console.log('generateStatistics::', outputObj);

    let obj = {
      totalDays : Object.keys(outputObj).length,
      tradedDays: 0,
      targetHit: 0,
      stoplossHit: 0,
      error: 0
    };

    Object.keys(outputObj).forEach((date)=>{
      let output = outputObj[date].output;

      let isTargetHit = output.find(el => el.status === "Target hit");

      let isStoplossHit = output.find(el => el.status === "Stoploss hit");

      if(isTargetHit){
        obj.targetHit++;
      }

      if(isStoplossHit){
        obj.stoplossHit++;
      }
    })


    return obj;
  }

  between(x, low, high) {
    return x >= low && x <= high;
  }
}
