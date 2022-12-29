import { Module } from '@nestjs/common';
import { EhrService } from './ehr.service';
import { EhrController } from './ehr.controller';
import { Ehr, EhrSchema } from 'src/schemas/ehr.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ehr.name, schema: EhrSchema }])],
  controllers: [EhrController],
  providers: [EhrService]
})
export class EhrModule {}
