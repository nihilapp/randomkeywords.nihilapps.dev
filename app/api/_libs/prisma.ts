import { PrismaClient } from '@prisma/client';

// PrismaClient는 전역 싱글톤으로 사용합니다.
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

export class DB {
  static client() {
    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    const prisma = globalForPrisma.prisma
  || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? [ 'query', 'error', 'warn', ] : [ 'error', ],
  });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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
