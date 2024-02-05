import { prisma } from '../config/prisma';
import { TUserQuery } from '../utils/schema';

class UserRepository {
    // there will be db queries here

    async rawQuery(data: TUserQuery) {
        const res = await prisma.$queryRaw`${data}`;
        return res;
    }
}

export default new UserRepository();
