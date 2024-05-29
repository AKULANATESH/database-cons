import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document<Types.ObjectId> {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  product_name: string;

  @Prop({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  product_price: number;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  product_description: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @Prop()
  product_type: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
