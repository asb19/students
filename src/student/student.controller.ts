import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path/posix';
import { StudentService } from './student.service';
import * as csv from 'fast-csv';

@Controller('student')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  public async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return await this.studentService.addCsvData(file);
  }

  @Get('/:id/results')
  public async getResultById(@Param('id') id: string) {
    return this.studentService.getResult(parseInt(id));
  }

  @Get('/')
  public async getResultByStatus(@Query('resultStatus') resultStatus: string) {
    return this.studentService.getStatus(resultStatus);
  }
}
