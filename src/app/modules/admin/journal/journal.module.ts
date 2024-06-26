import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { JournalComponent } from './journal/journal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { OrdersComponent } from './orders/orders.component';
import { SellOrderComponent } from './sell-order/sell-order.component';
import { BuyOrderComponent } from './buy-order/buy-order.component';

const journalRoutes: Route[] = [
  {
      path     : '',
      component: JournalComponent
  }
];


@NgModule({
  declarations: [
    JournalComponent,
    PortfolioComponent,
    OrdersComponent,
    SellOrderComponent,
    BuyOrderComponent
  ],
  imports: [
    RouterModule.forChild(journalRoutes),
    MatButtonModule,
    MatAutocompleteModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        SharedModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        TranslocoModule
  ]
})
export class JournalModule { }
