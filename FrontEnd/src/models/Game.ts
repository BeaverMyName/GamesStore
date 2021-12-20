import type { CurrencyType } from "../enums";
import type GameDetails from "./GameDetails";

export default interface Game {
    id: number;
    name: string;
    price: number;
    currency: CurrencyType;
    description: string;
    youtubeTrailer: string;
    gameDetails: GameDetails;
    image: string;
}