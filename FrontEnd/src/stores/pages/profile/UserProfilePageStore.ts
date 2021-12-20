import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../../ioc/ownTypes";
import User from "../../../models/User";
import UserService from "../../../services/UserService";

@injectable()
export default class UserProfilePageStore {
    public user: User | null = null;

    public constructor(
        @inject(ownTypes.userService) private readonly userService: UserService
    ) {
        makeAutoObservable(this);
    }

    public init = async (username: string) => {
        try {
            const result = await this.userService.getUserByUsername(username);
        } catch(e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }
}