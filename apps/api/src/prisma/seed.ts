import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
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
      userId: user.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Lip Gloss',
      description: 'Hydrating gloss',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
      userId: user.id,
    },
  });

  await prisma.video.create({
    data: {
      title: 'Foundation Review',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
      publicId: 'seed/foundation-review',
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
