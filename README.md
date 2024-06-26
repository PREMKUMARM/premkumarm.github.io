# Tradehandler - Experience the real trading

## Release Phase 1
1. Placeorder - Buy -- Done
2. Placeorder - Sell -- Done
3. Modify Order - Buy & Sell -- Done
4. Stoploss and Target in single order -- Pending
5. Limit number of trades per day -- Pending
6. Positions listing -- Pending
7. Orders Listing -- Done

## Release Phase 2
1. Implement websocket connection with API
2. Implement websocket for positions and holdings
3. Implement websocket for order executions

## Release Phase 3
1. Implement 1min candle break strategy
2. Implement RSI and Bollingerbands strategy
3. Add time based listener
4. Add auto-squareoff of all open orders feature

## Trade rules
1. Don't enter in between trends				
2. Don't enter in opposite direction of 30mins,1day candle				
3. Use Support-Resistence reversal strategy				
4. Use Risk management of 1% risk per trade and 2% rewards per trade				
5. Dont overtrade. Maximum 10 trades per day				
6. Stop trading once 2% profit per day is achieved.				
7. Beware of brokerage and tax deduction.				

## Strategy to be used
1. Check for gap up / down 				
2. Listen 9.15 candle to close				
3. Wait for 9.16 candle open price				
4. If new 1min candle opens 9.15 candle high or low - Check 1 Passed				
5. If opened candle is near to any support resistance - Check 2 Passed				
6. If RSI was reversal region - Check 3 passed				
7. If new candle was above the 9.15 candle high - Plan for CE order				
     -> Buy price will be above 9.15 candle				
     -> Stoploss price will be low of 9.15 candle				
     -> Target price will be 2x of 9.15 candle				
8. If new candle was below the 9.15 candle low - Plan for PE order				
     -> Buy price will be below 9.15 candle				
     -> Stoploss price will be high of 9.15 candle				
     -> Target price will be 2x of 9.15 candle				
