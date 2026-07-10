import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@shelflife/shared';
import { InMemoryRepository } from '../common/in-memory-repository';

@Injectable()
export class ProductsService {
  private repo = new InMemoryRepository<Product>([
    {
      id: '1',
      name: 'Foundation',
      description: 'Long lasting foundation',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
    },
    {
      id: '2',
      name: 'Lip Gloss',
      description: 'Hydrating gloss',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    },
  ]);

  findAll(): Product[] {
    return this.repo.findAll();
  }

  findOne(id: string): Product {
    const product = this.repo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  update(id: string, updates: Partial<Omit<Product, 'id'>>): Product {
    this.findOne(id);
    return this.repo.update(id, updates)!;
  }
}
