import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule { }
