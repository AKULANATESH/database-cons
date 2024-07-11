import { IsString, IsNotEmpty } from 'class-validator';
// import mongoose from 'mongoose';
// import { convertToObjectId } from './ObjectIdConverter';

export class createAccountDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class signInAccountDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
