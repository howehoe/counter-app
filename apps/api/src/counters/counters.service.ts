import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCounterDto, UpdateCounterDto } from './dto/counter.dto';

@Injectable()
export class CountersService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.counter.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const counter = await this.prisma.counter.findUnique({
      where: { id },
    });

    if (!counter) {
      throw new NotFoundException('Counter not found');
    }

    if (counter.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return counter;
  }

  async create(dto: CreateCounterDto, userId: string) {
    return this.prisma.counter.create({
      data: {
        name: dto.name,
        count: 0,
        userId,
      },
    });
  }

  async update(id: string, dto: UpdateCounterDto, userId: string) {
    const counter = await this.findOne(id, userId);

    return this.prisma.counter.update({
      where: { id: counter.id },
      data: { name: dto.name },
    });
  }

  async increment(id: string, userId: string) {
    const counter = await this.findOne(id, userId);

    return this.prisma.counter.update({
      where: { id: counter.id },
      data: { count: { increment: 1 } },
    });
  }

  async delete(id: string, userId: string) {
    const counter = await this.findOne(id, userId);

    await this.prisma.counter.delete({
      where: { id: counter.id },
    });

    return { message: 'Counter deleted successfully' };
  }
}

