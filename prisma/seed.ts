import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
    try {

        const mock = await prisma.organization.create({
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

    }

    catch (e) {
        console.error(e);
    }

    finally {
        await prisma.$disconnect();
    }

})();