import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  value: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  _categoryId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
