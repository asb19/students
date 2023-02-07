import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dtos/response.dto';

export class GetStudentDto {
  public name: string;
  public age: number;
  public id: number;
}

export class GetStudentResponseDto extends ResponseDto {
  public data: GetStudentDto;
}

export class GetStudentsResponseDto extends ResponseDto {
  public data: GetStudentDto[];
}

export class DeleteStudentResponseDto extends ResponseDto {
  public data: boolean;
}

export class CreateStudentDto {
  public name: string;
  public age: number;
}
