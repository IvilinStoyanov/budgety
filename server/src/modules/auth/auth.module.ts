import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { SessionSerializer } from './serializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    SessionSerializer
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
