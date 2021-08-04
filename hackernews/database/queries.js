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
      return [];
    });
}
