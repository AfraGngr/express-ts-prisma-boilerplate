import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient({
    errorFormat: 'pretty',
}).$extends({
    query: {
        user: {
            $allOperations({ operation, args, query }) {
                if (operation === 'create' || operation === 'update') {
                    if (args.data['password']) {
                        args.data['password'] = bcrypt.hashSync(
                            args.data['password'] as string,
                            10,
                        );
                    }
                }
                return query(args);
            },
        },
    },
});
