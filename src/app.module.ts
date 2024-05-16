import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { \[nest1\]Controller } from './[nest1/]/[nest1/].controller';

@Module({
  imports: [UserModule ],
  controllers: [AppController, \[nest1\]Controller],
  providers: [AppService],
})
export class AppModule {}
