import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EhrService } from './ehr.service';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';

@Controller('ehr')
export class EhrController {
  constructor(private readonly ehrService: EhrService) {}

  @Post()
  create(@Body() createEhrDto: CreateEhrDto) {
    return this.ehrService.create(createEhrDto);
  }

  @Get()
  findAll() {
    return this.ehrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ehrService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEhrDto: UpdateEhrDto) {
    return this.ehrService.update(id, updateEhrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ehrService.remove(+id);
  }
}
