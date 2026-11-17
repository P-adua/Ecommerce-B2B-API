import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error("JWT_SECRET não definido no .env");
}
const JWT_SECRET: string = rawSecret;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Hash falso, usado para a comparação demorar o mesmo tempo quando o e-mail não existe
const DUMMY_HASH = bcrypt.hashSync("senha-falsa", 10);

function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não informado." });
    return;
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    res.locals.auth = {
      userId: Number(payload.sub),
      role: payload.role as string,
    };
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

function requireRole(role: string) {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (res.locals.auth?.role !== role) {
      res.status(403).json({ message: "Sem permissão para este recurso." });
      return;
    }
    next();
  };
}

app.use(
  cors({
    origin: ["http://localhost:5173", "https://localhost:5173"],
  }),
);
app.use(express.json());

app.get("/products", async (_req, res) => {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  res.json(products);
});

app.get("/me", authenticate, async (_req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.auth.userId },
  });

  if (!user) {
    res.status(401).json({ message: "Usuário não encontrado." });
    return;
  }

  res.json({
    cnpj: user.cnpj,
    companyName: user.companyName,
    email: user.email,
    segment: user.segment,
    role: user.role,
  });
});

// Rota temporária, só para testar o 403
app.get("/admin/ping", authenticate, requireRole("ADMIN"), (_req, res) => {
  res.json({ message: "Acesso de administrador confirmado." });
});

app.listen(3333, () => console.log("API rodando em https://localhost:3333"));

app.post("/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Informe e-mail e senha válidos." });
    return;
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  const passwordOk = await bcrypt.compare(
    password,
    user?.passwordHash ?? DUMMY_HASH,
  );

  if (!user || !passwordOk) {
    res.status(401).json({ message: "E-mail ou senha inválidos." });
    return;
  }

  const token = jwt.sign({ role: user.role }, JWT_SECRET, {
    subject: String(user.id),
    expiresIn: "2h",
  });

  res.json({
    token,
    user: {
      cnpj: user.cnpj,
      companyName: user.companyName,
      email: user.email,
      segment: user.segment,
      role: user.role,
    },
  });
});
