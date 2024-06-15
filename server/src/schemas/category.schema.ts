// src/categories/schemas/category.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  icon: string;

  @Prop({ type: Number, default: 0 })
  exp: number;

  @Prop({ type: Number, default: 0 })
  inc: number;

  @Prop({ type: Number, default: 0 })
  transactionsCount: number;

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  _user: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
