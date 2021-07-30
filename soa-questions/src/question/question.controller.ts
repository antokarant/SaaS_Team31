import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto,@Request() req) {
    createQuestionDto.user = {"id": req.user.id}
    return this.questionService.create(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  findAllUser(@Request() req) {
    return this.questionService.findAllUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
