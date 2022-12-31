import * as fs from 'fs'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condition, ConditionDocument } from 'src/schemas/condition.schema';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { E_CSV, E_DB_FIND, E_DB_INSERT, E_DB_REMOVE, E_DB_UPDATE } from 'src/utils/errors';

@Injectable()
export class ConditionService {
  constructor(@InjectModel(Condition.name) private conditionModel: Model<ConditionDocument>) {}

  async create(createConditionDto: CreateConditionDto) {
    let records;

    // Read all conditions into MongoDB
    try{
      records = fs.readFileSync("./case-and-conditions-files/conditions.csv", { encoding: "utf-8" })
      .split("\n")
      .map((row: string): string[] => {
        return row.split("\t");
      });

      // delete the first element containing the title -> [ 'ICD_10', 'ICD_10_Description' ]
      records.shift();

    } catch(e) {
      console.error(E_CSV + e.message);
      return E_CSV.message
    }
    
    try{
      for(let i = 0; i < records.length; i++){
        new this.conditionModel({code: records[i][0], description: records[i][1]}).save();
      }
    } catch(e){
      console.error(E_DB_INSERT + e.message);
      return E_DB_INSERT.message
    }
    
    return 'Successfully saved the conditions: ' + records.length;
  }

  async findAll() {
    let records;

    try{
      records = await this.conditionModel.find();
    } catch(e){
      console.error(E_DB_FIND + e.message)
    }

    return records;
  }

  async findOne(id: number) {
    let records;

    try{
      records = await this.conditionModel.findOne({_id: id});
    } catch(e){
      console.error(E_DB_FIND + e.message)
    }

    return records;
  }

  async update(id: number, updateConditionDto: UpdateConditionDto) {
    let records;

    try{
      records = await this.conditionModel.updateOne({
        _id: id,
      },
      {
        $set:{
          description: updateConditionDto.description
        }
      });
    }catch(e){
      console.error(E_DB_UPDATE + e.message)
    }
    
    return records;
  }

  async remove(id: number) {
    let records;

    try{
      records = await this.conditionModel.deleteOne({_id: id});
    }catch(e){
      console.error(E_DB_REMOVE + e.message)
    }

    return records;
  }
}
