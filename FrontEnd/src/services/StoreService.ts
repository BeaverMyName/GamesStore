import { injectable, inject } from "inversify";
import FiltersDto from "../dtos/FiltersDto";
import ownTypes from "../ioc/ownTypes";
import Filters from "../models/Filters";
import { type HttpService, MethodType } from "./HttpService";

export interface StoreService {
    getFilters(): Promise<Filters>;
}

@injectable()
export default class DefaultStoreService implements StoreService {
    public constructor (
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public getFilters = async (): Promise<Filters> => {
        const result = await this.httpService.send<FiltersDto>('filters', MethodType.GET);
        return result.data;
    }
}