import {
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsMongoId()
  participantAId: string;

  @IsNotEmpty()
  @IsMongoId()
  participantBId: string;
}

export class UpdateMatchDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  played?: boolean;

  @IsOptional()
  @IsNumber()
  pointsA?: number;

  @IsOptional()
  @IsNumber()
  pointsB?: number;
}
