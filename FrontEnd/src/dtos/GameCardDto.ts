import { CurrencyType, SystemType } from "../enums";

export default interface GameCardDto {
    id: number;
    name: string;
    price: number;
    currency: CurrencyType;
    image: string;
    gameDetails: {
        systems: SystemType[];
    };
}