import { AxiosResponse } from 'axios';
import { Report } from '../interfaces/Report';
import apiBack from './api';

export class ReportService {
  static async createReport(report: Report): Promise<AxiosResponse> {
    const response = await apiBack.post(
      '/report', report,
      {
        validateStatus: status => [201, 400].includes(status),
      },
    );
    return response;
  }

  static async getReports(): Promise<AxiosResponse> {
    const response = await apiBack.get(
      '/report',
      {
        validateStatus: status => [201, 400].includes(status),
      },
    );
    return response;
  }
}