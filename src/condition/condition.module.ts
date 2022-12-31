import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Condition, ConditionSchema } from 'src/schemas/condition.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Condition.name, schema: ConditionSchema }])],
  controllers: [ConditionController],
  providers: [ConditionService]
})
export class ConditionModule {}
