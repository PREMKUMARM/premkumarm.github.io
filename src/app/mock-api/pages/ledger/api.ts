import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { ledgerRecords as ledgerRecordsData } from 'app/mock-api/pages/ledger/data';

@Injectable({
    providedIn: 'root'
})
export class LedgerMockApi
{
    private _ledgerRecords: any = ledgerRecordsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Activities - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ledger/records')
            .reply(() => [200, cloneDeep(this._ledgerRecords)]);
    }
}
