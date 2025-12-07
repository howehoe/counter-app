import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CountersModule } from './counters/counters.module';

@Module({
  imports: [PrismaModule, AuthModule, CountersModule],
})
export class AppModule {}

