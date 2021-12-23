export default interface CardOfGame {
    id: number;
    name: string;
    price: number;
    currency: string[];
    image: string;
    gameDetails: {
        systems: string[];
    };
}