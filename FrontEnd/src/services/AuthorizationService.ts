import 'reflect-metadata';
import type SignupResponse from '../dtos/SignupResponse';
import type LoginResponse from '../dtos/LoginResponse';
import { injectable, inject } from 'inversify';
import ownTypes from '../ioc/ownTypes';
import { ContentType, HttpService, MethodType } from './HttpService';
import { KeyType, LocalStorageService } from './LocalStorageService';

export interface AuthorizationService {
    signup(username: string, email: string, password: string): Promise<SignupResponse>;
    login(email: string, password: string): Promise<LoginResponse>;
    logout(): void;
}

@injectable()
export default class DefaultAuthorizationService implements AuthorizationService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService,
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService
    ) {
    }

    public async signup(username: string, email: string, password: string): Promise<SignupResponse> {
        const headers = { contentType: ContentType.Json };
        const data = { username, email, password };
        const result = await this.httpService.send<SignupResponse>('accounts', MethodType.POST, headers, data);

        // TODO: delete success token
        return { token: 'Success' };
    }

    public async login(email: string, password: string) : Promise<LoginResponse> {
        const headers = { contentType: ContentType.Json };
        const data = { email, password };
        // const result = await this.httpService.send<LoginResponse>('accounts', MethodType.GET, headers, data);

        // TODO: delete success token
        this.localStorageService.set(KeyType.Token, 'Success');
        return { token: 'Success' };
    }

    public logout(): void {
        this.localStorageService.remove(KeyType.Token);
    }
}