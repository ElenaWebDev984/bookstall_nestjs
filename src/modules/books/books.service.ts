import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private userRepo: UsersRepository,
  ) {}

  // Получить список всех книг
  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: number, userId?: number): Promise<Book> {
    const book = await this.booksRepository.findOneOrNotFoundFail(id);

    // TODO HW Если книга 18+ и пользователь не авторизован или младше 18
    if (book.ageRestriction >= 18) {
      if (!userId) {
        throw new ForbiddenException('This book requires authentication');
      }

      const user = await this.userRepo.findByIdOrNotFoundFail(userId);
      if (user.age < 18) {
        throw new ForbiddenException('You are too young to view this book');
      }
    }

    return book;
  }

  // Создать новую книгу
  async createBook(dto: CreateBookDto, userId: number): Promise<Book> {
    const user = await this.userRepo.findByIdOrNotFoundFail(userId);
    const book = Book.createBook(dto, userId, user.age);
    await this.booksRepository.save(book);
    return book;
  }

  // Обновить информацию о книге
  async updateBook(
    bookId: number,
    dto: UpdateBookDto,
    userId: number,
  ): Promise<Book> {
    const book = await this.booksRepository.findOneOrNotFoundFail(bookId);

    if (book.ownerId !== userId) {
      throw new ForbiddenException(
        'You can only update books that you have created',
      );
    }

    book.updateBook(dto, userId);
    await this.booksRepository.save(book);
    return book;
  }

  // Удалить книгу
  async deleteBook(bookId: number, userId: number): Promise<void> {
    const book = await this.booksRepository.findOneOrNotFoundFail(bookId);

    if (book.ownerId !== userId) {
      throw new ForbiddenException(
        'You can only delete books that you have created',
      );
    }

    await this.booksRepository.remove(book.id);
  }
}
