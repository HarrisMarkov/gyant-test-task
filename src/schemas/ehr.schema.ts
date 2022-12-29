import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EhrDocument = HydratedDocument<Ehr>;

@Schema()
export class Ehr {
  @Prop()
  description: string;

  @Prop()
  label: string
}

export const EhrSchema = SchemaFactory.createForClass(Ehr);