// import { PrismaClient } from "@prisma/client"

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client


//Рабочий вариант

// declare global {
//     var prisma: PrismaClient | undefined;
//   }

//   import { PrismaClient } from "@prisma/client";

//   const client = globalThis.prisma || new PrismaClient();
//   if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

//   export default client;

//Тестовый вариант

// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient | undefined;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }

//   prisma = globalThis.prisma;
// }

// export default prisma;

import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global { }
  }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma