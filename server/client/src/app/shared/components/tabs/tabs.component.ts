import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/interface/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SavingsService } from 'src/app/shared/services/savings.service';

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
  ) {}

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
