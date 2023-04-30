export interface Report {
    reportType: Array<string>;
    isAnonymous: boolean;
    description: string;
    date: Date;
    lng: number;
    lat: number;
}