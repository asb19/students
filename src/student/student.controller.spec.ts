import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import {
  GetStudentDto,
  GetStudentResponseDto,
  GetStudentsResponseDto,
} from './dtos/student.dto';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService, PrismaService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  describe('findAll', () => {
    const result = [
      {
        name: 'amir',
        age: 23,
        id: 1,
      },
    ];
    const data = {
      data: result,
      status: 'success',
      message: 'fetched all students',
    };
    it('should return all students', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(result);
      expect(await controller.getStudentss()).toEqual(data);
    });
  });
});
