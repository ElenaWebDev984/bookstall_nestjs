import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { JwtStrategy } from '../../core/guards/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
