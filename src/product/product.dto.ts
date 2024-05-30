import { IsString, IsNumber, IsNotEmpty, IsIn } from 'class-validator';

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(
    [
      'footwear',
      'clothes',
      'mobiles',
      'watches',
      'accessories',
      'homeneeds',
      'domesticneeds',
    ],
    { message: 'Invalid product type' },
  ) // List of allowed values
  productType: string;
}

export class createUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsString()
  @IsNotEmpty()
  productDescription: string;
}
