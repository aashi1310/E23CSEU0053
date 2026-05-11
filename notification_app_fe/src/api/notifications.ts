import api from '../services/api';
import { Log } from '../middleware/logger';
import { Notification, NotificationType, PaginatedResponse } from '../types';

export const getNotifications = async (
  page: number = 1,
  limit: number = 20,
  type?: NotificationType
): Promise<PaginatedResponse<Notification>> => {
  try {
    const params: Record<string, any> = { page, limit };
    if (type && type !== 'All') {
      params.notification_type = type;
    }
    
    const response = await api.get<PaginatedResponse<Notification>>('/notifications', { params });
    await Log('frontend', 'info', 'api', `Successfully fetched notifications page ${page}`);
    return response.data;
  } catch (error: any) {
    await Log('frontend', 'error', 'api', `Failed to fetch notifications: ${error.message}`);
    throw error;
  }
};
