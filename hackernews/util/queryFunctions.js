const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function getAllArticles() {
  const articles = await prisma.article.findMany({
    include: {
      userTable: {
        select: {
          id: true,
          userName: true,
          role: true,
        },
      },
    },
    orderBy: [{ date: 'desc' }],
  });
  return articles;
}
export async function getArticleById(id) {
  const article = await prisma.article.findFirst({
    where: {
      id,
    },
    include: {
      userTable: {
        select: {
          id: true,
          userName: true,
          role: true,
        },
      },
    },
  });
  return article;
}
export async function createData(data) {
  const newData = await prisma.article.create({
    data,
  });
  return newData;
}
