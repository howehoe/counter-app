import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountersRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.counter.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.counter.findUnique({
      where: { id },
    });
  }

  async create(name: string, userId: string) {
    return this.prisma.counter.create({
      data: {
        name,
        count: 0,
        userId,
      },
    });
  }

  async updateName(id: string, name: string) {
    return this.prisma.counter.update({
      where: { id },
      data: { name },
    });
  }

  async incrementCount(id: string) {
    return this.prisma.counter.update({
      where: { id },
      data: { count: { increment: 1 } },
    });
  }

  async delete(id: string) {
    return this.prisma.counter.delete({
      where: { id },
    });
  }
}


