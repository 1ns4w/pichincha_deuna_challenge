import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

const prisma = new PrismaClient();

export const excercise3Controller = async (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {

    const { tribeId } = req.params["tribeId"]

    try {
        let repositories = await prisma.repository.findMany({
            where: {
                tribe: {
                    id_tribe: tribeId
                }
            },
            select: {
                id_repository: true,
                name: true,
                status: true,
                state: true,
                metric: {
                    select: {
                        coverage: true,
                        code_smells: true,
                        bugs: true,
                        vulnerabilities: true,
                        hotspot: true,
                    },
                }
            }
        })

        if (repositories.length === 0) res.json({
            message: `No repositories found for tribe ${tribeId}`
        })

        repositories = repositories.filter(repository => repository.state === 'E' && repository.metric?.coverage > 75)

        if (repositories.length === 0) res.json({
            message: `No repositories found for tribe ${tribeId} with coverage > 75%`
        })

        res.json({
            repositories
        })

    }

    catch (e) {
        res.json({
            message: e
        })
    }
}
