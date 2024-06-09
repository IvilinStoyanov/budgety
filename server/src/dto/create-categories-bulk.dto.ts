import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriesBulkDto {
    @ApiProperty({ type: [CreateCategoryDto] })
    categories: CreateCategoryDto[];
}
