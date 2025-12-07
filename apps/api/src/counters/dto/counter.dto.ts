import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateCounterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;
}

export class UpdateCounterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  name?: string;
}

export class CounterResponse {
  id: string;
  name: string;
  count: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

