import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { take } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { BalanceModalComponent } from './modals/balance-modal/balance-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit  {
  @Input() user: any;
  currentIndex: number;

  constructor(public commonService: CommonService, private dialog: MatDialog) { }

  ngOnInit() {
    this.commonService.currentTabIndex.pipe(take(1)).subscribe(value => this.currentIndex = value);
  }

  onChange(event: MatTabChangeEvent) {
    this.commonService.currentTabIndex.next(event.index);
    this.commonService.navigateTo(event.tab.textLabel.toLowerCase());
  }

  openBalanceModal() {
      const dialogRef = this.dialog.open(BalanceModalComponent, {
        autoFocus: false,
        data: this.user
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user.savings = result;
         // this.commonService.saveData(this.data);
        }
      });
  }
}
