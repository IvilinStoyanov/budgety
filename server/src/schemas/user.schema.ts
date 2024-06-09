import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  googleId: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  email: string;

  @Prop()
  locale: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
