import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { Category } from 'src/schemas/category.schema';
import { Transaction } from 'src/schemas/transaction.schema';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) { }

    async findAll(categoryId: string, pageIndex: number, pageSize: number): Promise<{ transactions: Transaction[], length: number }> {
        const skip = pageIndex * pageSize;

        const count = await this.transactionModel.find({ _categoryId: new Types.ObjectId(categoryId) }).countDocuments();

        const transactions = await this.transactionModel
            .find({ _categoryId: new Types.ObjectId(categoryId) })
            .sort({ dateCreated: -1 })
            .skip(skip)
            .limit(pageSize)
            .exec();
        return { transactions, length: count };
    }

    async create(createTransactionDto: CreateTransactionDto, user): Promise<any> {
        debugger
        const { description, dateCreated, type, value, _categoryId } = createTransactionDto;

        await this.categoryModel.updateOne(
            { _id: _categoryId },
            { $inc: { [type]: value, transactionsCount: 1 } },
        ).exec();

        const transaction = new this.transactionModel({
            description,
            dateCreated,
            type,
            value,
            _categoryId: new Types.ObjectId(_categoryId),
        });

        user[type] += value;

        await transaction.save();
        await user.save();

        const category = await this.categoryModel.findOne({ _id: new Types.ObjectId(_categoryId) });

        return { _categoryId, category, user };
    }

    async delete(transactionId: string, type: string, value: number, categoryId: string, user): Promise<any> {
        const transaction = await this.transactionModel.deleteOne({ _id: new Types.ObjectId(transactionId), _categoryId: new Types.ObjectId(categoryId) }).exec();
        let updatedUser;

        if (transaction.deletedCount > 0) {
            user[type] -= value;
            updatedUser = await user.save();

            await this.categoryModel.updateOne(
                { _id: new Types.ObjectId(categoryId) },
                { $inc: { [type]: -value, transactionsCount: -1 } },
            ).exec();
        }

        return updatedUser;
    }

    async findMonthlyTransactions(user, year: number): Promise<Transaction[]> {
        const categories = await this.categoryModel.find({ _user: user._id });

        const categoryIds = categories.map(category => category._id);

        const transactions = await this.transactionModel.find({
            _categoryId: { $in: categoryIds },
            dateCreated: {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year}-12-31`)
            },
        }).exec();

        return transactions;
    }

    async findMonthlyTransactionsByMonth(user, year: number, month: string): Promise<Transaction[]> {
        const monthsList = [
            { name: 'january', id: 0 },
            { name: 'february', id: 1 },
            { name: 'march', id: 2 },
            { name: 'april', id: 3 },
            { name: 'may', id: 4 },
            { name: 'june', id: 5 },
            { name: 'july', id: 6 },
            { name: 'august', id: 7 },
            { name: 'september', id: 8 },
            { name: 'october', id: 9 },
            { name: 'november', id: 10 },
            { name: 'december', id: 11 }
        ];

        const currentMonth = monthsList.find(m => m.name.toLowerCase() === month.toLowerCase());
        if (!currentMonth) {
            throw new Error('Invalid month parameter');
        }

        const yearInt = parseInt(year.toString(), 10);

        const startDate = new Date(yearInt, currentMonth.id, 1, 0, 0, 0);
        const endDate = new Date(yearInt, currentMonth.id + 1, 1, 0, 0, 0);

        const categories = await this.categoryModel.find({ _user: user._id });
        const categoryIds = categories.map(category => category._id);

        const transactions = await this.transactionModel.find({
            _categoryId: { $in: categoryIds },
            dateCreated: {
                $gte: startDate,
                $lt: endDate
            }
        }).exec();

        return transactions;
    }

    async findYearlyTransactions(user, startYear: number, endYear: number): Promise<Transaction[]> {
        const categories = await this.categoryModel.find({ _user: user._id });
        const categoryIds = categories.map(category => category._id);

        const transactions = await this.transactionModel.find({
            _categoryId: { $in: categoryIds },
            dateCreated: {
                $gte: new Date(`${startYear}-01-01`),
                $lt: new Date(`${endYear}-12-31`)
            },
        }).exec();

        return transactions;
    }
}
