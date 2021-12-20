import { inject, injectable } from "inversify";
import UserDto from "../dtos/UserDto";
import ownTypes from "../ioc/ownTypes";
import { HttpService, MethodType } from "./HttpService";

export interface UserService {
    getUserByUsername(username: string): Promise<UserDto>;
}

@injectable()
export default class DefaultUserService implements UserService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async getUserByUsername(username: string): Promise<UserDto> {
        const result = await this.httpService.send<UserDto[]>(`accounts?username=${username}`, MethodType.GET);
        return result.data[0];
    }
}