import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConditionModule } from './condition/condition.module';
import { EhrModule } from './ehr/ehr.module';

@Module({
  imports: [EhrModule, ConditionModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
