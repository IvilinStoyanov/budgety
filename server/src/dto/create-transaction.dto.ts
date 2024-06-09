import { IsString, IsDate, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    dateCreated: Date;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsNumber()
    value: number;

    @ApiProperty()
    @IsMongoId()
    _categoryId: string;
}
