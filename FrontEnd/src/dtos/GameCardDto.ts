export default interface GameCardDto {
    id: number;
    name: string;
    price: number;
    currency: string[];
    image: string;
    gameDetails: {
        systems: string[];
    };
}