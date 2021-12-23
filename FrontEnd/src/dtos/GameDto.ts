import type GameDetails from "./GameDetailsDto";

export default interface GameDto {
    id: number;
    name: string;
    price: number;
    currency: string[];
    description: string;
    youtubeTrailer: string;
    gameDetails: GameDetails;
    image: string;
}