import { Student } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

import * as csv from 'fast-csv';

@Injectable()
export class StudentService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async addCsvData(file) {
    return new Promise((resolve, reject) => {
      const outputData = [];
      createReadStream(file.path)
        .pipe(csv.parse({ headers: true }))
        .on('data', async (row) => {
          await outputData.push(row);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', async () => {
          await this.prismaService.student.createMany({
            data: outputData.map((data) => {
              return {
                ...data,
                age: parseInt(data.age),
                mark1: parseInt(data.mark1),
                mark2: parseInt(data.mark2),
                mark3: parseInt(data.mark3),
              };
            }),
          });
          resolve(outputData);
        });
    });
  }

  public async getResult(id: number) {
    const data = await this.prismaService.student.findUnique({
      where: {
        id,
      },
    });

    const res = { total: 300, ...data };

    return res;
  }

  public async getStatus(status: string) {
    const data =
      status == 'passed'
        ? await this.prismaService.$queryRawUnsafe(
            `SELECT * FROM "Student" WHERE mark1+mark2+mark3>100`,
          )
        : await this.prismaService.$queryRawUnsafe(
            `SELECT * FROM "Student" WHERE mark1+mark2+mark3<100`,
          );

    return data;
  }
}
