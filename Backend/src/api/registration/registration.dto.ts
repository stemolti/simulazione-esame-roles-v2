import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  event: string;

  @IsOptional()
  @IsBoolean()
  checkinEffettuato?: boolean;

  @IsOptional()
  @IsDateString()
  oraCheckin?: string;
}

export class UpdateRegistrationDto {
  @IsOptional()
  @IsMongoId()
  user?: string;

  @IsOptional()
  @IsMongoId()
  event?: string;

  @IsOptional()
  @IsBoolean()
  checkinEffettuato?: boolean;

  @IsOptional()
  @IsDateString()
  oraCheckin?: string;
}
