import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function addSubscriber(email) {
  return prisma.subscriber
    .create({
      data: {
        email: email,
      },
    })
    .then((subscriber) => {
      return subscriber;
    })
    .catch((e) => {
      return { email: "", id: null };
    });
}

export function getSubscribers() {
  return prisma.subscriber
    .findMany({ select: { email: true } })
    .then((subscribers) => subscribers)
    .catch((e) => {
      console.log(e);
      return [];
    });
}

export function getTopArticles() {
  return prisma.article
    .findMany({
      select: {
        id: true,
        title: true,
      },
      where: {
        isDeleted: false,
      },
      orderBy: {
        viewsCount: "desc",
      },
    })
    .then((articles) => {
      return articles.slice(0, 5);
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}
export async function getCommentsByArticleId(articleId) {
  return prisma.comment
    .findMany({
      select: {
        id: true,
        content: true,
        parentCommentId: true,
        articleId: true,
        authorId: true,
        author: {
          select: {
            id: true,
            userName: true,
          },
        },
      },
      where: {
        articleId: +articleId,
      },
    })
    .then((data) => data)
    .catch((e) => {
      console.log(e);
      return [];
    });
}

export async function addComment({
  id,
  authorId,
  date,
  articleId,
  content,
  parentCommentId,
}) {
  return prisma.comment
    .create({
      data: {
        id,
        authorId,
        date,
        articleId,
        content,
        parentCommentId,
      },
    })
    .then((data) => data)
    .catch((e) => {
      console.log(e);
      return {};
    });
}
