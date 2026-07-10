import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Video } from '@shelflife/shared';
import { InMemoryRepository } from '../common/in-memory-repository';

@Injectable()
export class VideosService {
  private repo = new InMemoryRepository<Video>([
    {
      id: '1',
      title: 'Foundation Review',
      url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
      productId: '1',
      views: 124,
      clicks: 14,
    },
  ]);

  findByProduct(productId: string): Video[] {
    return this.repo.findAll().filter((v) => v.productId === productId);
  }

  create(video: Omit<Video, 'id' | 'views' | 'clicks'>): Video {
    return this.repo.create({
      ...video,
      id: randomUUID(),
      views: 0,
      clicks: 0,
    });
  }
}
