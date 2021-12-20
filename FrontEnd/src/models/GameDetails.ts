import type { GenreType, LanguageType, SystemType } from '../enums'

export default interface GameDetails {
    genres: GenreType[];
    releaseDate: string;
    languages: LanguageType[];
    company: string;
    systems: SystemType[];
}