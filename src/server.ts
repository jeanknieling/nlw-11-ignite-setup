import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors, {
  //origin: 'http://localhost:3000' Apenas esse endereço poderia estar acessando o back-end
});

app.get('/', async (req, res) => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'Beber',
      },
    },
  });

  return habits;
});

const port = 3333;
app.listen({ port }).then(() => {
  console.log(`HTTP server running on port ${port}`);
});
