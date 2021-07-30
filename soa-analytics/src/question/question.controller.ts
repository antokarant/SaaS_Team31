import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

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

  @Get('latest')
  findAllLatest() {
    return this.questionService.findAllLatest();
  }

  @Get('unanswered')
  findUnanswered() {
    return this.questionService.findUnanswered();
  }

  @Get('popular')
  findMostPopular() {
    return this.questionService.findMostPopular();
  }

  @Get('keyword/:word')
  findKeyword(@Param('word') word: string) {
    return this.questionService.findAllKeyword(word);
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
