import * as fs from 'fs'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condition, ConditionDocument } from 'src/schemas/condition.schema';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

@Injectable()
export class ConditionService {
  constructor(@InjectModel(Condition.name) private conditionModel: Model<ConditionDocument>) {}

  async create(createConditionDto: CreateConditionDto) {

    // Read all conditions into MongoDB
    const records = fs.readFileSync("./case-and-conditions-files/conditions.csv", { encoding: "utf-8" })
    .split("\n")
    .map((row: string): string[] => {
      return row.split("\t");
    });

    // delete the first element containing the title -> [ 'ICD_10', 'ICD_10_Description' ]
    records.shift();

    for(let i = 0; i < records.length; i++){
      new this.conditionModel({code: records[i][0], description: records[i][1]}).save();
    }

    return 'Successfully saved the conditions: ' + records.length;
  }

  async findAll() {
    return this.conditionModel.find();
  }

  async findOne(id: number) {
    return this.conditionModel.findOne({_id: id});
  }

  async update(id: number, updateConditionDto: UpdateConditionDto) {
    return this.conditionModel.updateOne({
      _id: id,
    },
    {
      $set:{
        description: updateConditionDto.description
      }
    });
  }

  async remove(id: number) {
    return this.conditionModel.deleteOne({_id: id});;
  }
}
