export interface Report {
    user_id?: string;
    type: string;
    anonymous: boolean;
    description: string;
    date?: Date;
    longitude: number;
    latitude: number;
}