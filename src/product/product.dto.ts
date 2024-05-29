import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class productdto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsNumber()
  @IsNotEmpty()
  product_price: number;

  @IsString()
  @IsNotEmpty()
  product_description: string;

  @IsString()
  @IsNotEmpty()
  product_type: string;
}
