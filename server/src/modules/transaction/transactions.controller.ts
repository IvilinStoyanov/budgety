import { Controller, Get, Post, Body, Param, Query, Req, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { RequireLoginGuard } from 'src/common/guards/requireLogin.guard';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { RequestWithUser } from 'src/interfaces/user';
import { Transaction } from 'src/schemas/transaction.schema';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(RequireLoginGuard)

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all transactions' })
    @ApiResponse({ status: 200, description: 'List of transactions', type: [Transaction] })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async findAll(@Query('_categoryId') categoryId: string, @Query('pageIndex') pageIndex: number, @Query('pageSize') pageSize: number): Promise<{ transactions: Transaction[], length: number }> {
        return this.transactionsService.findAll(categoryId, pageIndex, pageSize);
    }

    @Post('global')
    @ApiOperation({ summary: 'Create a global transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created', type: Transaction })
    @ApiResponse({ status: 422, description: 'Unprocessable entity' })
    async createGlobal(@Req() req: RequestWithUser, @Body() createTransactionDto: CreateTransactionDto): Promise<any> {
        return this.transactionsService.create(createTransactionDto, req.user);
    }

    @Post()
    @ApiOperation({ summary: 'Create a transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created', type: Transaction })
    @ApiResponse({ status: 422, description: 'Unprocessable entity' })
    async create(@Req() req: RequestWithUser, @Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return this.transactionsService.create(createTransactionDto, req.user);
    }
}
