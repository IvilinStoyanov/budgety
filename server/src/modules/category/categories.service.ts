import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    async findAll(userId: string): Promise<Category[]> {
        return this.categoryModel.find({ _user: new Types.ObjectId(userId) }).exec();
    }

    async findOne(userId: string, id: string): Promise<Category> {
        return this.categoryModel.findOne({ _user: new Types.ObjectId(userId), _id: new Types.ObjectId(id) }).exec();
    }

    async createMany(categories: Partial<Category>[]): Promise<Category[]> {
        const createdCategories = await this.categoryModel.insertMany(categories);
        return createdCategories as Category[];
    }

    async create(category: Partial<Category>): Promise<Category> {
        const newCategory = new this.categoryModel(category);
        return newCategory.save();
    }
}
