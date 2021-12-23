import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import CardOfGame from "../../models/CardOfGame";
import type { GameService } from "../../services/GameService";

@injectable()
export default class GamesGridStore {
    public games: CardOfGame[] = [];
    public currentPage = 1;
    public totalPages = 0;
    public itemsPerPage = 12;

    constructor(
        @inject(ownTypes.gameService) private readonly gameService: GameService
    ) {
        makeAutoObservable(this);
    }

    public init = async (filter: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        this.currentPage = Number(page);

        try {
            const result = await this.gameService.getByPage(this.currentPage, filter);
            this.totalPages = await this.gameService.getPagesCount(this.itemsPerPage, filter)
            this.games = result;
        } catch (e) {
            if (e instanceof Error) {
                console.log("Exception");
            }
        }
    }

    public changePage = (page: number, filter: string) => {
        this.currentPage = page;
        this.getByPage(page, filter);
    }

    private getByPage = async (page: number, filter: string) => {
        try {
            const result = await this.gameService.getByPage(page, filter);
            this.games = result;
        } catch (e) {
            if (e instanceof Error) {
                console.log("Exception");
            }
        }
    }
}