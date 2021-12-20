import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export default class GameCardStore {
    public isMouseEnter = false;

    public constructor() {
        makeAutoObservable(this);
    }
}