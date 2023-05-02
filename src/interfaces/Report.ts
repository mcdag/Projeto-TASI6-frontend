export interface Report {
    userId: string;
    authToken: string;
    reportType: string;
    anonymous: boolean;
    description: string;
    reportDate: Date;
    longitude: number;
    latitude: number;
}