import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import generateCSV from "../../utils/generateCSV";

const prisma = new PrismaClient();

export const excercise4Controller = async (req: Request<{ tribe: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {

    const tribeId = req.params.tribe

    const tribe = await prisma.tribe.findFirst({

        where: {
            id_tribe: tribeId
        },

        select: {

            name: true,

            repositories: {
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
                        }
                    }
                }
            },

            organization: {
                select: {
                    name: true
                }
            },
        }
    });

    const tribeRepositories = tribe?.repositories.map((tribeRepository, index) => {
        return {
            id: tribeRepository.id_repository,
            name: tribeRepository.name,
            tribe: tribe.name,
            organization: tribe.organization.name,
            status: tribeRepository.status,
            state: tribeRepository.state,
            coverage: tribeRepository.metric?.coverage,
            code_smells: tribeRepository.metric?.code_smells,
            bugs: tribeRepository.metric?.bugs,
            vulnerabilities: tribeRepository.metric?.vulnerabilities,
            hotspot: tribeRepository.metric?.hotspot,
        }
    });

    generateCSV(tribeRepositories);
    res.download("report.csv")
}