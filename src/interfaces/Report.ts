export interface Report {
    userId?: string;
    username?: string;
    authToken?: string;
    type: string;
    anonymous?: boolean;
    description: string;
    date?: Date;
    longitude: number;
    latitude: number;
}