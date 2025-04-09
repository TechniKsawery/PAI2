import { Expose } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsPositive,
  Max,
  MinLength,
  IsNotEmpty,
  IsInt,
  Min,
} from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty({
    message: "Pole jest wymagane",
  })
  @MinLength(3, {
    message: "Nazwa musi mieć przynajmniej 3 znaki",
  })
  @IsString()
  @Expose()
  name!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({
    message: "Pole jest wymagane",
  })
  @Max(10000, {
    message: "Cena nie moze byc wyzsza niz 10k",
  })
  @Expose()
  price!: number;
  
  @Min(0, {
    message: "Ilość nie moze byc ujemna",
  })
  @IsNumber()
  @IsInt()
  @IsNotEmpty({
    message: "Pole jest wymagane",
  })
  @Expose()
  stock!: number;
}
