import { Student } from '.prisma/client';
import { HttpException, Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { PrismaService } from '../prisma/prisma.service';

import * as csv from 'fast-csv';
import { CreateStudentDto, GetStudentDto } from './dtos/student.dto';

@Injectable()
export class StudentService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async addCsvData(file) {
    return new Promise((resolve, reject) => {
      const outputData = [];
      createReadStream(file.path)
        .pipe(csv.parse({ headers: false }))
        .on('data', async (row) => {
          await outputData.push(row);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', async () => {
          // await this.prismaService.student.createMany({
          //   data: outputData.map((data) => {
          //     return {
          //       ...data,
          //       age: parseInt(data.age),
          //       mark1: parseInt(data.mark1),
          //       mark2: parseInt(data.mark2),
          //       mark3: parseInt(data.mark3),
          //     };
          //   }),
          // });
          console.table(outputData[0]);
          resolve(outputData);
        });
    });
  }

  public async createStudentData(paylaod: CreateStudentDto) {
    return this.prismaService.student.create({
      data: paylaod,
    });
  }

  public async getResult(id: number) {
    const data = await this.prismaService.student.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  public async getAll(): Promise<Student[]> {
    const data = await this.prismaService.student.findMany();

    return data;
  }

  public async editUser(
    id: number,
    paylaod: CreateStudentDto,
  ): Promise<Student> {
    const data = await this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        name: paylaod.name || undefined,
        age: paylaod.age || undefined,
      },
    });

    return data;
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await this.prismaService.student.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (err) {
      throw new HttpException('student not found', 400);
    }
  }
}
