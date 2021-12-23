import 'reflect-metadata';
import { injectable, inject } from "inversify";
import GameDto from "../dtos/GameDto";
import ownTypes from "../ioc/ownTypes";
import { MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import GameCardDto from '../dtos/GameCardDto';

export interface GameService {
    getById(id: number): Promise<GameDto>;
    getByPage(page: number, filter: string): Promise<GameCardDto[]>;
    getPagesCount(itemsPerPage: number, filter: string): Promise<number>;
}

@injectable()
export default class DefaultGameService implements GameService {

    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async getById(id: number): Promise<GameDto> {
        const result = await this.httpService.send<GameDto>(`games/${id}`, MethodType.GET);
        return result.data;
    }

    public async getByPage(page: number, filter: string): Promise<GameCardDto[]> {
        const result = await this.httpService.send<GameCardDto[]>(`games?_page=${page}&_limit=12${filter}`, MethodType.GET);
        return result.data;
    }

    public async getPagesCount(itemsPerPage: number, filter: string): Promise<number> {
        const result = await this.httpService.send<GameCardDto[]>(`games?${filter}`, MethodType.GET);
        return Math.ceil(result.data.length / itemsPerPage);
    }
}