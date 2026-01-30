import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TDonationSection } from "./donationSection.interface";

const createDonationSection = async (data: TDonationSection) => {
    return await prisma.donationSection.create({
        data,
    });
};

const getAllDonationSection = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const donationSectionQueryBuilder = new QueryBuilder(options)
        .searching(["title"])
        .sort()
        .paginate()

    delete donationSectionQueryBuilder.prismaQuery.where.isActive
    delete donationSectionQueryBuilder.prismaQuery.where.isDeleted
    delete donationSectionQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.donationSection.findMany({
        ...donationSectionQueryBuilder.prismaQuery
    })

    const total = await prisma.donationSection.count({
        where: donationSectionQueryBuilder.prismaQuery.where
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

const getSingleDonationSection = async (id: string) => {
    const isExistDonationSection = await prisma.donationSection.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistDonationSection) {
        throw new AppError(404, "Donation section not found!")
    }

    return isExistDonationSection
};

const updateDonationSection = async (id: string, data: Partial<TDonationSection>) => {
    const isExistDonationSection = await prisma.donationSection.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistDonationSection) {
        throw new AppError(404, "Donation section not found!")
    }
    const updateDonationSection = await prisma.donationSection.update({
        where: { id },
        data,
    });
    return updateDonationSection
};

const deleteDonationSection = async (id: string) => {
    const isExistDonationSection = await prisma.donationSection.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistDonationSection) {
        throw new AppError(404, "Donation section not found!")
    }

    const softDeleteDonationSection = await prisma.donationSection.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });

    return null
};

export const donationService = {
    createDonationSection,
    getAllDonationSection,
    getSingleDonationSection,
    updateDonationSection,
    deleteDonationSection
}