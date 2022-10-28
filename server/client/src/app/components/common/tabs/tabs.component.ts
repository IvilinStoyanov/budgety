import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonService } from 'src/app/services/common.service';
import { SavingsService } from 'src/app/services/savings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceModalComponent } from './modals/balance-modal/balance-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() user: any;
  currentIndex: number;

  constructor(
    public commonService: CommonService,
    private savingsService: SavingsService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

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

    dialogRef.afterClosed().subscribe((savings) => {
      if (savings) {
        this.savingsService.updateSavings(savings).subscribe(user => {
          if (user) this.authService.setCurrentUser(user);
        });
      }
    });
  }
}
