import {
  Body,
  Controller,
  Delete,
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
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import {
  CreateStudentDto,
  DeleteStudentResponseDto,
  GetStudentResponseDto,
  GetStudentsResponseDto,
} from './dtos/student.dto';

@ApiTags('students')
@Controller('students')
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(GetStudentResponseDto),
    },
    type: GetStudentResponseDto,
  })
  @Post('/create')
  public async craeteStudent(
    @Body() paylaod: CreateStudentDto,
  ): Promise<GetStudentResponseDto> {
    const data = await this.studentService.createStudentData(paylaod);
    return {
      status: 'success',
      message: 'created student succesfully',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(GetStudentResponseDto),
    },
    type: GetStudentResponseDto,
  })
  @Post('/edit/:id')
  public async editStudent(
    @Body() paylaod: CreateStudentDto,
    @Param('id') id: string,
  ): Promise<GetStudentResponseDto> {
    const data = await this.studentService.editUser(parseInt(id), paylaod);
    return {
      status: 'success',
      message: 'edites student succesfully',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(GetStudentResponseDto),
    },
    type: GetStudentResponseDto,
  })
  @Get('/:id')
  public async getStudentById(
    @Param('id') id: string,
  ): Promise<GetStudentResponseDto> {
    const data = await this.studentService.getResult(parseInt(id));
    return {
      status: 'succes',
      message: 'got student data',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(GetStudentsResponseDto),
    },
    type: GetStudentsResponseDto,
  })
  @Get('/')
  public async getStudentss(): Promise<GetStudentsResponseDto> {
    const data = await this.studentService.getAll();
    return {
      status: 'success',
      message: 'fetched all students',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DeleteStudentResponseDto),
    },

    type: DeleteStudentResponseDto,
  })
  @Delete('/:id')
  public async deleteStudent(
    @Param('id') id: string,
  ): Promise<DeleteStudentResponseDto> {
    const data = await this.studentService.deleteUser(parseInt(id));
    return {
      status: 'success',
      message: 'deleted a student',
      data,
    };
  }
}
