export interface LedgerRecord
{
    id: string;
    date: string;
    trades: number;
    orders: number;
    openingBalance: number;
    pnl: number;
    charges: number;
    closingBalance: number;
}