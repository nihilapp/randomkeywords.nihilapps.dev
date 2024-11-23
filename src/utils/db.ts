import { PrismaClient } from '@prisma/client';

export class DB {
  static client() {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
      }
      prisma = globalWithPrisma.prisma;
    }

    return prisma;
  }

  static categories() {
    return this.client().category;
  }

  static subCategories() {
    return this.client().subCategory;
  }

  static keywords() {
    return this.client().keyword;
  }
}
