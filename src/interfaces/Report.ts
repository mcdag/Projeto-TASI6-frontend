export interface Report {
    type: string;
    anonymous: boolean;
    description: string;
    date?: Date;
    longitude: number;
    latitude: number;
}