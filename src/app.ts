import { PrismaClient } from "@prisma/client";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  const server = new Server(envs.PORT, AppRoutes.routes);
  // connect to db to check if its works
  const prisma = new PrismaClient();
  await prisma.$connect();
  await prisma.$disconnect();
  server.start();
}
