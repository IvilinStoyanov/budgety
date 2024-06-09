import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Types } from 'mongoose';
import { RequireLoginGuard } from 'src/common/guards/requireLogin.guard';
import { CreateCategoriesBulkDto } from 'src/dto/create-categories-bulk.dto';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { RequestWithUser } from 'src/interfaces/user';
import { Category } from 'src/schemas/category.schema';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(RequireLoginGuard)

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'List of categories', type: [Category] })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async findAll(@Req() req: RequestWithUser): Promise<Category[]> {
        return this.categoriesService.findAll(req.user._id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    @ApiResponse({ status: 200, description: 'Category found', type: Category })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async findOne(@Req() req: RequestWithUser, @Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(req.user._id, id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created', type: Category })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(@Req() req: RequestWithUser, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = {
            ...createCategoryDto,
            _user: new Types.ObjectId(req.user._id),
        };
        return this.categoriesService.create(category);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Create multiple categories' })
    @ApiResponse({ status: 201, description: 'Categories created', type: [Category] })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async createMany(@Req() req: RequestWithUser, @Body() createCategoriesBulkDto: CreateCategoriesBulkDto): Promise<Category[]> {
        const categories = createCategoriesBulkDto.categories.map(category => ({
            ...category,
            _user: new Types.ObjectId(req.user._id),
        }));
        return this.categoriesService.createMany(categories);
    }
}
