import { GenreType, LanguageType, SystemType } from '../enums'

export default interface GameDetailsDto {
    genres: GenreType[];
    releaseDate: string;
    languages: LanguageType[];
    company: string;
    systems: SystemType[];
}