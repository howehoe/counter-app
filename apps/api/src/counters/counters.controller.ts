import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto, UpdateCounterDto } from './dto/counter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: { id: string; username: string };
}

@Controller('counters')
@UseGuards(JwtAuthGuard)
export class CountersController {
  constructor(private countersService: CountersService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.countersService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.countersService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateCounterDto, @Request() req: RequestWithUser) {
    return this.countersService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCounterDto,
    @Request() req: RequestWithUser,
  ) {
    return this.countersService.update(id, dto, req.user.id);
  }

  @Post(':id/increment')
  increment(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.countersService.increment(id, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.countersService.delete(id, req.user.id);
  }
}

