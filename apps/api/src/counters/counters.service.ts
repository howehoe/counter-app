import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CountersRepository } from './counters.repository';
import { CreateCounterDto, UpdateCounterDto } from './dto/counter.dto';

@Injectable()
export class CountersService {
  constructor(private countersRepository: CountersRepository) {}

  async findAll(userId: string) {
    return this.countersRepository.findAllByUserId(userId);
  }

  async findOne(id: string, userId: string) {
    const counter = await this.countersRepository.findById(id);

    if (!counter) {
      throw new NotFoundException('Counter not found');
    }

    if (counter.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return counter;
  }

  async create(dto: CreateCounterDto, userId: string) {
    return this.countersRepository.create(dto.name, userId);
  }

  async update(id: string, dto: UpdateCounterDto, userId: string) {
    const counter = await this.findOne(id, userId);
    if (dto.name !== undefined) {
      return this.countersRepository.updateName(counter.id, dto.name);
    }
    return counter;
  }

  async increment(id: string, userId: string) {
    const counter = await this.findOne(id, userId);
    return this.countersRepository.incrementCount(counter.id);
  }

  async delete(id: string, userId: string) {
    const counter = await this.findOne(id, userId);
    await this.countersRepository.delete(counter.id);
    return { message: 'Counter deleted successfully' };
  }
}
