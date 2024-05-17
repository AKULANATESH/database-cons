import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [forwardRef(() =>UserModule )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
