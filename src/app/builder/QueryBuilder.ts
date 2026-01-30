
type QueryParams = Record<string, unknown>;

class QueryBuilder<T> {
    public query: QueryParams;
    public prismaQuery: any;

    constructor(query: QueryParams) {
        this.query = query;
        this.prismaQuery = {
            where: {
                isActive: true,
                isDeleted: false
            },
        };
    }

    searching(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string
        
        if (!searchTerm) return this

        const orConditions = searchableFields.map((field) => {
            if (field.includes('.')) {
                const [relation, relationField] = field.split('.')
                return {
                    [relation]: {
                        [relationField]: { contains: searchTerm, mode: "insensitive" }
                    }
                }

            }

            return {
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            };
        })
        
        this.prismaQuery.where = {
            ...this.prismaQuery.where,
            OR: orConditions,
        };

        return this;

    }

    category() {
        if (this.query.category) {
            this.prismaQuery.where.category = {
                OR: [
                    { id: this.query.category as string },
                    { slug: this.query.category as string },
                ],
            };
        }

        return this;
    }

    priceRange() {
        const min = this.query.minValue;
        const max = this.query.maxValue;

        if (min || max) {
            this.prismaQuery.where.price = {};
            if (min) this.prismaQuery.where.price.gte = Number(min);
            if (max) this.prismaQuery.where.price.lte = Number(max);
        }

        return this;
    }

    tags() {
        if (this.query.tags) {
            const tagsArray = (this.query.tags as string).split(',');
            this.prismaQuery.where.tags = {
                hasSome: tagsArray,
            };
        }
        return this;
    }

    brand() {
        if (this.query.brand) {
            this.prismaQuery.where.brand = {
                equals: this.query.brand as string,
                mode: 'insensitive',
            };
        }
        return this;
    }

    inStock() {
        if (this.query.inStock === 'true') {
            this.prismaQuery.where.stock = { gt: 0 };
        }
        return this;
    }

    sort() {
        const sort = this.query.sort as string;

        if (sort) {
            this.prismaQuery.orderBy = sort.split(',').map((field) => {
                if (field.startsWith('-')) {
                    return { [field.slice(1)]: 'desc' };
                }
                return { [field]: 'asc' };
            });
        } else {
            this.prismaQuery.orderBy = { createdAt: 'desc' };
        }

        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        this.prismaQuery.skip = (page - 1) * limit;
        this.prismaQuery.take = limit;

        return this;
    }

    fields() {
        if (this.query.fields) {
            this.prismaQuery.select = (this.query.fields as string)
                .split(',')
                .reduce((acc, field) => {
                    acc[field] = true;
                    return acc;
                }, {} as Record<string, boolean>);
        }
        
        return this;
    }

    build() {
        return this.prismaQuery;
    }
}
export default QueryBuilder;