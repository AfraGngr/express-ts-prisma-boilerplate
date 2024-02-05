import userRepository from '../repository/userRepository';
import { TUserQuery } from '../utils/schema';
export class UserService {
    constructor() {}

    public getAllUsers = async (data: TUserQuery) => {
        const res = await userRepository.rawQuery(data);
        return res;
    };
}
