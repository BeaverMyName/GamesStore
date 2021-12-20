import type { CurrencyType } from "../enums";
import type GameDetails from "./GameDetailsDto";

export default interface GameDto {
    id: number;
    name: string;
    price: number;
    currency: CurrencyType;
    description: string;
    youtubeTrailer: string;
    gameDetails: GameDetails;
    image: string;
}