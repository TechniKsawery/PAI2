import { Expose } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
  Matches
} from "class-validator";

export class CreatePersonDTO {
  @IsNotEmpty({
    message: "Imię jest wymagane"
  })
  @MinLength(2, {
    message: "Imię musi mieć przynajmniej 2 znaki"
  })
  @MaxLength(50, {
    message: "Imię nie może być dłuższe niż 50 znaków"
  })
  @IsString()
  @Expose()
  firstName!: string;

  @IsNotEmpty({
    message: "Nazwisko jest wymagane"
  })
  @MinLength(2, {
    message: "Nazwisko musi mieć przynajmniej 2 znaki"
  })
  @MaxLength(50, {
    message: "Nazwisko nie może być dłuższe niż 50 znaków"
  })
  @IsString()
  @Expose()
  lastName!: string;

  @IsNotEmpty({
    message: "Email jest wymagany"
  })
  @IsEmail({}, {
    message: "Nieprawidłowy format email"
  })
  @Expose()
  email!: string;

  @IsOptional()
  @IsDate()
  @Expose()
  birthDate?: Date;

  @IsOptional()
  @Matches(/^\+?[0-9]{9,15}$/, {
    message: "Nieprawidłowy format numeru telefonu"
  })
  @Expose()
  phoneNumber?: string;
} 