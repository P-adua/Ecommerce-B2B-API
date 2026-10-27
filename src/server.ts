import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/products", async (_req, res) => {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  res.json(products);
});

app.listen(3333, () => console.log("API rodando em http://localhost:3333"));