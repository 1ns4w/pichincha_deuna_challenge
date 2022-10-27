import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const organizationRouter = Router();

organizationRouter.get('/', async (req, res) => {

    const organizations = await prisma.organization.findMany({
        select: {
            id_organization: true,
            name: true,
            status: true,
        }
    })

    res.json({
        organizations
    })
})

organizationRouter.post('/createOrganization', async (req, res) => {
    const { name, status } = req.body

    const organization = await prisma.organization.create({
        data: {
            name,
            status,
        }
    })

    res.json({
        organization
    })

})

organizationRouter.put('/updateOrganization/:organizationId', async (req, res) => {
    const { organizationId } = req.params;

    const organization = await prisma.organization.update({
        where: {
            id_organization: organizationId
        },
        data: {
            ...req.body
        }
    })

    res.json({
        organization
    })

})

organizationRouter.delete('/deleteOrganization/:organizationId', (req, res) => {
    const { organizationId } = req.params;

    prisma.organization.delete({
        where: {
            id_organization: organizationId
        }
    })

    res.json({
        message: `Deleted organization ${organizationId}`
    })
})

export default organizationRouter