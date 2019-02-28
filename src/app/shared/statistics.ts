export interface Frequency {
    _id: string;
    count: number;
}

// just an interface for type safety.
export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}


export const STATISTICS: Frequency[] = [];
