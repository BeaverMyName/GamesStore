import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import GameCardDto from "../../dtos/GameCardDto";
import ownTypes from "../../ioc/ownTypes";
import { PaymentService } from "../../services/PaymentService";

@injectable()
export default class CartPageStore {
    public games: GameCardDto[] = [];
    public price = 0;

    public constructor(
        @inject(ownTypes.paymentService) private readonly paymentService: PaymentService
    ) {
        makeAutoObservable(this);
    }

    public addGame(game: GameCardDto) {
        if (!this.games.find(cartGame => cartGame.id === game.id)) {
            this.games.push(game);
            this.price += Number(game.price);
        }
    }

    public removeGame(game: GameCardDto) {
        this.games.splice(this.games.indexOf(game), 1);
        this.price -= game.price;
    }

    public async doPayment() {
        if (this.games.length > 0)
        {
            try {
                const result = await this.paymentService.doPayment(this.price);
                if (result.statusCode >= 200 && result.statusCode < 300) {
                    this.price = 0;
                    this.games = [];
                }
            } catch(e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        }
    }
}