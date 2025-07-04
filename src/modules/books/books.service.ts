import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  // Получить список всех книг
  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneOrNotFoundFail(id);
  }

  // Создать новую книгу
  async createBook(dto: any): Promise<void> {
    const book = new Book();
    book.title = dto.title;
    book.ageRestriction = dto.ageRestrict;
    book.author = dto.author;

    await this.booksRepository.save(book);
  }
}
