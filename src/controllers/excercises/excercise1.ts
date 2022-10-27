import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

export const excercise1Controller = async (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {

    const prisma = new PrismaClient();

    const repositories = await prisma.repository.findMany({
        select: {
            id_repository: true,
            state: true,
        }
    })

    res.json({
        repositories
    })

}