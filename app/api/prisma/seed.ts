import { PrismaClient } from "@prisma/client"
import { fakerJA } from "@faker-js/faker";
import { connect } from "http2";

const faker = fakerJA;
const prisma = new PrismaClient()

const main = async () =>{
  await prisma.team.createMany({
    data: [
      {
        name: "Team A",
      },
      {
        name: "Team B",
      },
      {
        name: "Team C",
      },
    ]
  })
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: `test${i + 1}@example.com`,
        thumbnailUrl: faker.image.avatar(),
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
      }
    })
  }
}

main().then(() => {
  console.log("Seeded data successfully");
})
