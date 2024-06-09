import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CategoriesModule } from './modules/category/category.module';
import { TransactionsModule } from './modules/transaction/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    CategoriesModule,
    TransactionsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
