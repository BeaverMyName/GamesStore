import { injectable, inject } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import Game from "../../models/Game";
import GameService from "../../services/GameService";

@injectable()
export default class GamePageStore {
    public game: Game | null = null;
    
    public constructor(
        @inject(ownTypes.gameService) private readonly gameService: GameService
    ) {
        makeAutoObservable(this);
    }

    public init = async (id: number) => {
        try {
            const result = await this.gameService.getById(id);
            this.game = result;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }
}