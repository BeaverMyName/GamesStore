import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import CardOfGame from "../../models/CardOfGame";

@injectable()
export default class GameCardStore {
    public isOnWindows = false;
    public isOnMacOS = false;

    public constructor() {
        makeAutoObservable(this);
    }

    public setSystems = (game: CardOfGame) => {
        this.isOnWindows = game.gameDetails.systems.includes('Windows');
        this.isOnMacOS = game.gameDetails.systems.includes('MacOS');
    }
}