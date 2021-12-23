import { injectable, inject } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../ioc/ownTypes";
import { type AuthorizationService } from "../services/AuthorizationService";
import { KeyType, type LocalStorageService } from "../services/LocalStorageService";

@injectable()
export default class AuthorizationStore {
    isAuthorized = false;

    public constructor(
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService,
        @inject(ownTypes.authorizationService) private readonly authorizationService: AuthorizationService
    ) {
        makeAutoObservable(this);
        this.updateAuthorizedState();
    }

    public updateAuthorizedState = (): void => {
        this.isAuthorized = !!this.localStorageService.get<string>(KeyType.Token);
    }

    public logout = (): void => {
        this.authorizationService.logout();
        this.updateAuthorizedState();
    }
}