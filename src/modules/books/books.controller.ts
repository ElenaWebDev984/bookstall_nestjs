import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Получить список всех книг
  @Get()
  async getAllBooks() {
    return this.booksService.getAllBooks();
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    //return result
  }

  // Получить книгу по ID
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    //return result
  }

  // Создать новую книгу
  @Post()
  @HttpCode(201)
  async createBook(@Body() bookDto: CreateBookDto) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    await this.booksService.createBook(bookDto);
  }

  // Обновить информацию о книге
  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
  }

  // Удалить книгу
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
  }
}
