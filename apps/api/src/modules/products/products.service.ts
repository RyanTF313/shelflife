import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@shelflife/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(pagination: PaginationQueryDto = {}): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip: pagination.skip,
      take: pagination.take,
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updates: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: updates });
  }
}
