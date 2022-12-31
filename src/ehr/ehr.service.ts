import * as fs from 'fs'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ehr, EhrDocument } from 'src/schemas/ehr.schema';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';

const FILE_NAMES = ['00D3FEF53970819CCC4D01C836555362.txt', '00F5FC934E3FCE1778B175D98B8E691C.txt', '00688F1A12C5787124CE2F75FD58F66F.txt']

@Injectable()
export class EhrService {
  constructor(@InjectModel(Ehr.name) private ehrModel: Model<EhrDocument>) {}

  async create(createEhrDto: CreateEhrDto) {

    // Read all EHRs into MongoDB
    for(let i = 0; i < FILE_NAMES.length; i++){
      fs.readFile(`./case-and-conditions-files/${FILE_NAMES[i]}`, (err, data) => {
        if (err) throw err;
        new this.ehrModel({description: data}).save();
      });
    }

    return 'Successfully saved the medical cases: ' + FILE_NAMES.length;
  }

  async findAll() {
    return this.ehrModel.find();
  }

  async findOne(id: number) {
    return this.ehrModel.findOne({_id: id});
  }

  async update(id: number, updateEhrDto: UpdateEhrDto) {
    return this.ehrModel.updateOne({
      _id: id,
    },
    {
      $set:{
        label: updateEhrDto.label
      }
    });
  }

  async remove(id: number) {
    return this.ehrModel.deleteOne({_id: id});
  }
}
