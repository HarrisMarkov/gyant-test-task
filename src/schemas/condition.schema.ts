import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConditionDocument = HydratedDocument<Condition>;

@Schema()
export class Condition {
  @Prop()
  code: string

  @Prop()
  description: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);