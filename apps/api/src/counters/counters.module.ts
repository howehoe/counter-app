import { Module } from '@nestjs/common';
import { CountersController } from './counters.controller';
import { CountersService } from './counters.service';
import { CountersRepository } from './counters.repository';

@Module({
  controllers: [CountersController],
  providers: [CountersService, CountersRepository],
})
export class CountersModule {}
