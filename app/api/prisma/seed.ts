import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "test-sample@exampleMail.com",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is my first post",
          },
          {
            title: "Hello World 2",
            content: "This is my Second post",
          },
          {
            title: "Hello World 3",
            content: "This is my Third post",
          }
        ]
      }
    },
  });

};

main().then(() => {
  console.log("Seeded data successfully");
})
