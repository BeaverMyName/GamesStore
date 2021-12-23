import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import Filters from "../../models/Filters";
import StoreService from "../../services/StoreService";

@injectable()
export default class StorePageStore {
    public filters: Filters | null = null;
    public genre = '';
    public filter = '';

    public constructor(
        @inject(ownTypes.storeService) private readonly storeService: StoreService
    ) { 
        makeAutoObservable(this);
    }

    public setFilters = async () => {
        this.filters = await this.storeService.getFilters();
        this.filters.genres.unshift('All Games');
    }

    public setFilterByName(name: string){
        if (!this.filter.includes('&name_like=')) {
            this.filter += '&name_like=';
        }

        !!name ? 
        this.filter = this.filter.replace(/&name_like=[A-z- :,'%0-9]*/,`&name_like=${name}`) :
        this.filter = this.filter.replace(/&name_like=[A-z- :,'%0-9]*/,'');
    }

    public setFilterByGenre(){
        if (!this.filter.includes('&gameDetails.genres_like=')) {
            this.filter += '&gameDetails.genres_like=';
        }

        !!this.genre && this.genre !== 'All Games' ? 
        this.filter = this.filter.replace(/&gameDetails.genres_like=[A-z- :,'%0-9]*/,`&gameDetails.genres_like=${this.genre}`) :
        this.filter = this.filter.replace(/&gameDetails.genres_like=[A-z- :,'%0-9]*/,'');
    }

    public setGenre(genre: string) {
        this.genre = genre;
        this.setFilterByGenre();
    }

    public setFilterByItem(itemValue: string, itemName: string, checked: boolean) {
        if (checked) {
            this.filter += `&gameDetails.${itemName}_like=${itemValue}`
            return;
        }

        this.filter = this.filter.replace(`&gameDetails.${itemName}_like=${itemValue}`,'');
    }
}