import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TServiceRecipient } from "./serviceRecipient.interface";

const createServiceRecipient = async (data: TServiceRecipient) => {
    const union = await prisma.union.findUnique({ where: { id: data.unionId } });
    if (!union) throw new AppError(404, "Union not found!");

    const village = await prisma.village.findUnique({ where: { id: data.villageId } });
    if (!village) throw new AppError(404, "Village not found!");

    const donation = await prisma.donationSection.findUnique({ where: { id: data.donationId } });
    if (!donation) throw new AppError(404, "Donation section not found!");

    return await prisma.serviceRecipient.create({
        data: data,
        include: { union: true, village: true, donation: true },
    });
};

const getAllServiceRecipients = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const serviceRecipientQueryBuilder = new QueryBuilder(options)
        .searching(["name", "phone", "nidNumber", "address", "village.name", "union.name"])
        .sort()
        .fields()
        .paginate()

    delete serviceRecipientQueryBuilder.prismaQuery.where.isActive
    delete serviceRecipientQueryBuilder.prismaQuery.where.isDeleted
    delete serviceRecipientQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.serviceRecipient.findMany({
        ...serviceRecipientQueryBuilder.prismaQuery,
        include: { union: true, village: true, donation: true }
    })

    const total = await prisma.serviceRecipient.count({
        where: serviceRecipientQueryBuilder.prismaQuery.where
    })

    const returnData = {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
            total: total,
            skip: Number(skip)
        },
        data: result
    }

    return returnData
};

const getServiceRecipientById = async (id: string) => {
    const recipient = await prisma.serviceRecipient.findUnique({
        where: { id },
        include: { union: true, village: true, donation: true },
    });
    if (!recipient) throw new AppError(404, "Service recipient not found!");
    return recipient;
};

const updateServiceRecipient = async (id: string, data: Partial<TServiceRecipient>) => {
    const isExistServiceRecipient = await prisma.serviceRecipient.findUnique({ where: { id } })
    if (!isExistServiceRecipient) throw new AppError(404, "Service recipient not found!")

    if (data.unionId) {
        const union = await prisma.union.findUnique({ where: { id: data.unionId } });
        if (!union) throw new AppError(404, "Union not found!");
    }
    if (data.villageId) {
        const village = await prisma.village.findUnique({ where: { id: data.villageId } });
        if (!village) throw new AppError(404, "Village not found!");
    }
    if (data.donationId) {
        const donation = await prisma.donationSection.findUnique({ where: { id: data.donationId } });
        if (!donation) throw new AppError(404, "Donation section not found!");
    }

    if (data.nidNumber) {
        throw new AppError(400, "Nid number cannot be updated!")
    }

    return await prisma.serviceRecipient.update({
        where: { id },
        data: data,
        include: { union: true, village: true, donation: true },
    });
};

const deleteServiceRecipient = async (id: string) => {
    const recipient = await prisma.serviceRecipient.findUnique({ where: { id } });
    if (!recipient) throw new AppError(404, "Service recipient not found!");

    return await prisma.serviceRecipient.delete({ where: { id } });
};

export const serviceRecipientService = {
    createServiceRecipient,
    getAllServiceRecipients,
    getServiceRecipientById,
    updateServiceRecipient,
    deleteServiceRecipient
}