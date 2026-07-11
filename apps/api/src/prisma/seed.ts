import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'demo@shelflife.dev',
      passwordHash: await bcrypt.hash('password123', 10),
    },
  });

  const foundation = await prisma.product.create({
    data: {
      name: 'Foundation',
      description: 'Long lasting foundation',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Lip Gloss',
      description: 'Hydrating gloss',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    },
  });

  await prisma.video.create({
    data: {
      title: 'Foundation Review',
      url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
      productId: foundation.id,
      views: 124,
      clicks: 14,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
