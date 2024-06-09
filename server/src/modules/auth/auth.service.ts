import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Category } from 'src/schemas/category.schema';
import { Categories } from 'src/config/categories';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) { }

  async validateUser(profile: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ googleId: profile.id });

    if (existingUser) {
      return existingUser;
    }

    const user = new this.userModel({
      googleId: profile.id,
      name: profile.name,
      picture: profile._json.picture,
      email: profile._json.email,
      locale: profile._json.locale,
    });

    await user.save();

    const userCategories = Categories.map(({ name, icon, color }) => ({
      name,
      icon,
      color,
      _user: user._id,
    }));

    await this.categoryModel.insertMany(userCategories);

    return user;
  }

  async findUser(id: number) {
    const user = await this.userModel.findById({ _id: id });
    return user;
  }

}
