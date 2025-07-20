import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ForbiddenException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number; //возрастные ограничения на книгу

  @Column({ nullable: true })
  ownerId: number; //id пользователя, который добавил книгу

  @Column({ nullable: true })
  image?: string;

  static createBook(dto: CreateBookDto, userId: number, userAge: number): Book {
    if (userAge < 18 && dto.ageRestriction >= 18) {
      throw new ForbiddenException('too yang, Bro');
    }

    const book = new Book();
    book.title = dto.title;
    book.ageRestriction = dto.ageRestriction;
    book.author = dto.author;
    book.ownerId = userId;

    return book;
  }
  updateBook(dto: UpdateBookDto, userId: number) {
    // TODO logic
    if (this.ownerId !== userId) {
      throw new ForbiddenException();
    }

    this.title = dto.title ?? this.title;
  }
}
