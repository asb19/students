import { Test, TestingModule } from '@nestjs/testing';
import { prisma, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetStudentDto } from './dtos/student.dto';
import { StudentService } from './student.service';
import { Student } from '.prisma/client';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService, PrismaService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should create a student and return id', async () => {
    const paylaod = {
      name: 'name1',
      age: 23,
    };
    const student = await service.createStudentData(paylaod);
    expect(student).toHaveProperty('id');
  });

  it('should return all students list', async () => {
    const students = await service.getAll();
    expect(students).toBeInstanceOf(Array);
  });

  it('should return single student', async () => {
    const student = await service.getResult(0);
    expect(student).toMatchObject<Student>(student);
  });
});
