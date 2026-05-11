import api from '../services/api';
import { LogPayload } from '../types';

export const Log = async (
  stack: string,
  level: string,
  packageName: string,
  message: string
) => {
  try {
    const payload: LogPayload = {
      stack,
      level,
      package: packageName,
      message,
    };
    await api.post('/logs', payload);
  } catch (error) {
    console.error('Failed to send log:', error);
  }
};
