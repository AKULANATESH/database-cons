import { Module ,forwardRef} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
