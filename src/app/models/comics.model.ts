export interface IComics {
    id: number;
    format: string;
    title: string;
    urls: any;
    thumbnail: any;
    images: any;
    prices: any;
    modified: any;
    pageCount: number;
    description: string;
}

export class Comics implements IComics {
    images: any;
    id: number;    format: string;
    title: string;
    urls: any;
    thumbnail: any;
    prices: any;
    modified: any;
    pageCount: number;
    description: string;
}
