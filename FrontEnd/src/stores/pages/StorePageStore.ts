import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export default class StorePageStore {
    public filter = '';

    public constructor() { 
        makeAutoObservable(this);
    }

    public setFilterByName(name: string){
        if (!this.filter.includes('&name_like=')) {
            this.filter += '&name_like=';
        }

        !!name ? 
        this.filter = this.filter.replace(/&name_like=[A-z :'%0-9]*/,`&name_like=${name}`) :
        this.filter = this.filter.replace(/&name_like=[A-z :'%0-9]*/,'');
    }

    public setFilterByGenre(genre: string){
        if (!this.filter.includes('&gameDetails.genres_like=')) {
            this.filter += '&gameDetails.genres_like=';
        }

        !!genre ? 
        this.filter = this.filter.replace(/&gameDetails.genres_like=[A-z :'%0-9]*/,`&gameDetails.genres_like=${genre}`) :
        this.filter = this.filter.replace(/&gameDetails.genres_like=[A-z :'%0-9]*/,'');
    }
}