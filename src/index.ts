import express from 'express';
import configs from './configs';
import { PrismaClient } from '@prisma/client';
import excercisesRouter from './routes/routers/excercises';
import organizationRouter from './routes/routers/organizations';


const app = express();
app.use(express.json());

app.listen(configs.PORT, () => {
    console.log(`Example app listening on port ${configs.PORT}!`);
});

app.post('/mock', async (req, res) => {

    const prisma = new PrismaClient();

    try {
        const { id_organization } = await prisma.organization.create({
            data: {
                name: 'mock',
                status: 604,
                tribes: {
                    create: {
                        name: 'mock',
                        status: 604,
                        repositories: {
                            create: {
                                name: 'mock',
                                status: 'A',
                                state: 'E',
                                metric: {
                                    create: {
                                        coverage: 0,
                                        bugs: 0,
                                        vulnerabilities: 0,
                                        hotspot: 0,
                                        code_smells: 0,
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });

        const mockTribe = await prisma.tribe.findFirst({
            where: {
                organization: {
                    id_organization: id_organization
                }
            },
            select: {
                id_tribe: true
            }
        })

        res.json({
            tribeId: mockTribe?.id_tribe,
            message: `Created mock repositories for tribe ${mockTribe?.id_tribe}`
        })
    }

    catch (e) {
        res.json({
            message: e
        })
    }

})

app.put('/mock/:tribeId', async (req, res) => {

    const prisma = new PrismaClient();

    try {

        const { tribeId } = req.params;

        const repositories = await prisma.repository.createMany({
            data: [
                {
                    name: 'mock',
                    status: 'A',
                    state: 'E',
                    tribeId: tribeId,
                }
            ],
        });

        res.json({
            message: `Created ${JSON.stringify(repositories.count)} repositories for tribe ${tribeId}`
        })

    }

    catch (e) {
        res.json({
            message: e
        })

    }

})

app.use('/excercises', excercisesRouter);
app.use('/organizations', organizationRouter)

export default app