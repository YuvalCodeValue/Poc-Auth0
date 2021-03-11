import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(): Promise<any> {
    console.log('success');
    return this.appService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  async findl(@Req() req): Promise<any> {
    debugger;
    console.log(req.headers);
    return this.appService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<any> {
    return this.appService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body('item') item: any): Promise<void> {
    this.appService.create(item);
  }
}
