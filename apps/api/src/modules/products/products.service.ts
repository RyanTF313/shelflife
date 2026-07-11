import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@shelflife/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { VideosService } from '../videos/videos.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private videosService: VideosService,
  ) {}

  findAll(pagination: PaginationQueryDto = {}): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip: pagination.skip,
      take: pagination.take,
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    // No auth wired up yet, so new products are owned by the single seeded user.
    const owner = await this.prisma.user.findFirst({
      orderBy: { createdAt: 'asc' },
    });
    if (!owner) {
      throw new NotFoundException('No user found to own this product');
    }

    return this.prisma.product.create({
      data: { ...data, userId: owner.id },
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

  async remove(id: string): Promise<Product> {
    await this.findOne(id);

    const videos = await this.prisma.video.findMany({
      where: { productId: id },
    });
    for (const video of videos) {
      await this.videosService.remove(video.id);
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
