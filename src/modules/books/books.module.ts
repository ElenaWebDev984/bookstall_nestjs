import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { JwtStrategy } from '../../core/guards/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
