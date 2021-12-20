import { makeAutoObservable } from "mobx";
import { inject, injectable } from 'inversify';
import ownTypes from "../../ioc/ownTypes";
import { AuthorizationService } from "../../services/AuthorizationService";
import AuthorizationStore from "../AuthorizationStore";
import { useNavigate } from "react-router-dom";

@injectable()
export default class LoginPageStore {
    public username = '';
    public password = '';
    public token = '';

    public constructor(
        @inject(ownTypes.authorizationService) private readonly authorizationService: AuthorizationService,
        @inject(ownTypes.authorizationStore) private readonly authorizationStore: AuthorizationStore
    ) {
        makeAutoObservable(this);
    }

    public login = async () => {
        try {
            const result = await this.authorizationService.login(this.username, this.password);
            this.token = result.token;
            this.authorizationStore.updateAuthorizedState();

        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }

    public changeUsername = (username: string) => {
        this.username = username;
    }

    public changePassword = (password: string) => {
        this.password = password;
    }
}