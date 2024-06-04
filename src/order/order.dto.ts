// import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
// import mongoose from 'mongoose';
// import { convertToObjectId } from './ObjectIdConverter';

export class createOrderDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  // @Transform(convertToObjectId)
  // get productIdAsObjectId(): mongoose.Types.ObjectId {
  //   return convertToObjectId(this.productId);
  // }

  // @Transform(convertToObjectId)
  // get userIdAsObjectId(): mongoose.Types.ObjectId {
  //   return convertToObjectId(this.userId);
  // }

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
export class updateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
