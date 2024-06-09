import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    color: string;

    @ApiProperty()
    @IsString()
    icon: string;

    @ApiProperty({ default: 0 })
    @IsNumber()
    @IsOptional()
    exp?: number;

    @ApiProperty({ default: 0 })
    @IsNumber()
    @IsOptional()
    categoryId?: number;

    @ApiProperty({ default: 0 })
    @IsNumber()
    @IsOptional()
    inc?: number;

    @ApiProperty({ default: 0 })
    @IsNumber()
    @IsOptional()
    transactionsCount?: number;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;
}
