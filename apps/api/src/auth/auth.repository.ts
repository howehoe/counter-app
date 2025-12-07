import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
  }

  async createUser(username: string, passwordHash: string) {
    return this.prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });
  }
}


