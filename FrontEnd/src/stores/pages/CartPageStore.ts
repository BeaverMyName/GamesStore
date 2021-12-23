import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import CardOfGame from "../../models/CardOfGame";
import { type GameService } from "../../services/GameService";
import { KeyType, type LocalStorageService } from "../../services/LocalStorageService";
import { type PaymentService } from "../../services/PaymentService";

@injectable()
export default class CartPageStore {
    public gameIds: number[] = [];
    public games: CardOfGame[] = [];
    public price = 0;

    public constructor(
        @inject(ownTypes.paymentService) private readonly paymentService: PaymentService,
        @inject(ownTypes.gameService) private readonly gameService: GameService,
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService
    ) {
        makeAutoObservable(this);
        this.getStored();
    }

    public getStored = async () => {
        this.gameIds = this.localStorageService.get<number[]>(KeyType.Order)?.toString().split(',').map(Number) ?? [];

        for (let i = 0; i < this.gameIds.length; i++) {
            console.log(this.gameIds[i])
            const game = await this.gameService.getById(this.gameIds[i]);
            this.games.push(game);
            this.price = Number((this.price + Number(game.price)).toPrecision(12));
        }
    }

    public setStored = () => {
        this.localStorageService.set(KeyType.Order, this.gameIds.toString());
    }

    public addGame = async (id: number) => {
        if (!this.gameIds.includes(id)) {
            this.gameIds.push(id);
            const game = await this.gameService.getById(id);
            this.games.push(game);
            this.price = Number((this.price + Number(game.price)).toPrecision(12));
            this.setStored();
        }
    }

    public removeGame(id: number) {
        const index = this.gameIds.indexOf(id);
        this.gameIds.splice(index, 1);
        this.price = Number((this.price - Number(this.games[index].price)).toPrecision(12))
        this.games.splice(index, 1);

        if (this.gameIds.length !== 0) {
            this.setStored();
        } else {
            this.localStorageService.remove(KeyType.Order);
        }
    }

    public async doPayment() {
        if (this.games.length > 0)
        {
            try {
                const result = await this.paymentService.doPayment(this.price);
                if (result.statusCode >= 200 && result.statusCode < 300) {
                    this.price = 0;
                    this.games = [];
                    this.gameIds = [];
                    this.setStored();
                }
            } catch(e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        }
    }
}