import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/services/common.service';
import { BalanceModalComponent } from './modals/balance-modal/balance-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @Input() data: any;

  private subscription: Subscription;
  currentIndex: number;

  constructor(public commonService: CommonService, private dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const currentTabIndexSubscription$ = this.commonService.currentTabIndex.subscribe(value => this.currentIndex = value);

    this.subscription.add(currentTabIndexSubscription$);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onChange(event: MatTabChangeEvent) {
    this.commonService.currentTabIndex.next(event.index);
    this.commonService.navigateTo(event.tab.textLabel.toLowerCase());
  }

  openBalanceModal() {
      const dialogRef = this.dialog.open(BalanceModalComponent, {
        autoFocus: false,
        data: this.data
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.data.savings = result;
          this.commonService.saveData(this.data);
        }
      });
  }
}
