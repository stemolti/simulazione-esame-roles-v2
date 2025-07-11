import {
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsMongoId,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validScore', async: false })
class ValidScoreConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const { pointsA, pointsB } = args.object as any;
    if (typeof pointsA !== 'number' || typeof pointsB !== 'number') return false;
    if (pointsA < 0 || pointsB < 0) return false;
    if (pointsA === pointsB) return false;
    const max = Math.max(pointsA, pointsB);
    const min = Math.min(pointsA, pointsB);
    if (max < 11) return false;
    if (max === 11 && min <= 9) return true;
    return max - min === 2;
  }
  defaultMessage() {
    return 'Punteggio non valido: vittoria a 11 con vantaggio di almeno 2 punti, nessun pareggio, punti >= 0.';
  }
}

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

export class UpdateResultDto {
  @IsNotEmpty()
  @IsNumber()
  pointsA: number;

  @IsNotEmpty()
  @IsNumber()
  pointsB: number;

  @IsNotEmpty()
  @IsBoolean()
  played: boolean;

  @Validate(ValidScoreConstraint)
  scoreValid: boolean;
}
