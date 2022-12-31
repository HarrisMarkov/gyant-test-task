import * as fs from 'fs'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ehr, EhrDocument } from 'src/schemas/ehr.schema';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';
import { E_CSV, E_DB_FIND, E_DB_INSERT, E_DB_REMOVE, E_DB_UPDATE } from 'src/utils/errors';

const FILE_NAMES = ['00D3FEF53970819CCC4D01C836555362.txt', '00F5FC934E3FCE1778B175D98B8E691C.txt', '00688F1A12C5787124CE2F75FD58F66F.txt']

@Injectable()
export class EhrService {
  constructor(@InjectModel(Ehr.name) private ehrModel: Model<EhrDocument>) {}

  async create(createEhrDto: CreateEhrDto) {
    // Read all EHRs into MongoDB
    for(let i = 0; i < FILE_NAMES.length; i++){
      try{
        fs.readFile(`./case-and-conditions-files/${FILE_NAMES[i]}`, (err, data) => {
          if (err) throw err;

          try{
            new this.ehrModel({description: data}).save();
          } catch(e){
            console.error(E_DB_INSERT + e.message);
            return E_DB_INSERT.message
          }
        });
      } catch(e){
        console.error(E_CSV + e.message);
        return E_CSV.message
      }
      
    }

    return 'Successfully saved the medical cases: ' + FILE_NAMES.length;
  }

  async findAll() {
    let records;

    try{
      records = await this.ehrModel.find();
    } catch(e){
      console.error(E_DB_FIND + e.message)
    }

    return records;
  }

  async findOne(id: number) {
    let records;

    try{
      records = await this.ehrModel.findOne({_id: id});
    } catch(e){
      console.error(E_DB_FIND + e.message)
    }

    return records;
  }

  async update(id: number, updateEhrDto: UpdateEhrDto) {
    let records;

    try{
      records = await this.ehrModel.updateOne({
        _id: id,
      },
      {
        $set:{
          label: updateEhrDto.label
        }
      });
    }catch(e){
      console.error(E_DB_UPDATE + e.message)
    }
    
    return await this.findOne(id);
  }

  async remove(id: number) {
    let records;

    try{
      records = await this.ehrModel.deleteOne({_id: id});
    }catch(e){
      console.error(E_DB_REMOVE + e.message)
    }

    return records;
  }
}
