import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { take } from 'rxjs/operators';
import { IUser } from '../../../shared/models/interface/User';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonService } from '../../../shared/services/common.service';
import { SavingsService } from '../../../shared/services/savings.service';

import { BalanceModalComponent } from '../balance-modal/balance-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() user: IUser;
  currentIndex: number;

  constructor(
    public commonService: CommonService,
    private savingsService: SavingsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.commonService.currentTabIndex
      .pipe(take(1))
      .subscribe(value => (this.currentIndex = value));
  }

  onChange(event: MatTabChangeEvent): void {
    this.commonService.currentTabIndex.next(event.index);
    this.commonService.navigateTo(event.tab.textLabel.toLowerCase());
  }

  openBalanceModal(): void {
    const dialogRef = this.dialog.open(BalanceModalComponent, {
      autoFocus: false,
      data: this.user
    });

    dialogRef.afterClosed().subscribe(savings => {
      if (savings) {
        this.savingsService.updateSavings(savings).subscribe(user => {
          if (user) {
            this.authService.setCurrentUser(user);
          }
        });
      }
    });
  }
}
