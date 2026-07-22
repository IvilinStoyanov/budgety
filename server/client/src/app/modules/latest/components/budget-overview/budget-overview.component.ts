import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { IUser } from 'src/app/shared/models/interface/User';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class BudgetOverviewComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  @Input() displayMode: 'both' | 'summary' | 'details' = 'both';
  latestTransactions$: Observable<ITransaction[]> = of([]);

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadLatestTransactions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.user && !changes.user.firstChange) || (changes.displayMode && !changes.displayMode.firstChange)) {
      this.loadLatestTransactions();
    }
  }

  private loadLatestTransactions(): void {
    if (this.displayMode === 'summary' || !this.user?._id) {
      this.latestTransactions$ = of([]);
      return;
    }

    this.latestTransactions$ = this.transactionsService.getLatestTransactions(10).pipe(
      catchError(() => of([]))
    );
  }
}
