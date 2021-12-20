import { makeAutoObservable } from "mobx";
import { inject, injectable } from 'inversify';
import ownTypes from "../../ioc/ownTypes";
import { AuthorizationService } from "../../services/AuthorizationService";

@injectable()
export default class SignupPageStore {
    public username = '';
    public email = '';
    public password = '';
    public token = '';

    public constructor(
        @inject(ownTypes.authorizationService) private readonly authorizationService: AuthorizationService
    ) {
        makeAutoObservable(this);
    }

    public signup = async () => {
        try {
            const result = await this.authorizationService.signup(this.username, this.email, this.password);
            this.token = result.token;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }

    public changeUsername = (username: string) => {
        this.username = username;
    }

    public changeEmail = (email: string) => {
        this.email = email;
    }

    public changePassword = (password: string) => {
        this.password = password;
    }
}