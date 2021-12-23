import type GameDetails from "./GameDetails";

export default interface Game {
    id: number;
    name: string;
    price: number;
    currency: string[];
    description: string;
    youtubeTrailer: string;
    gameDetails: GameDetails;
    image: string;
}