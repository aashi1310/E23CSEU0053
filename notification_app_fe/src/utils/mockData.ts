import type { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: 'mock-1',
    type: 'Placement',
    title: 'Google Interview Shortlisted',
    message: 'Your interview is scheduled tomorrow at 11 AM.',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60000).toISOString() // 2 mins ago
  },
  {
    id: 'mock-2',
    type: 'Result',
    title: 'Semester Result Published',
    message: 'Your semester 5 results are now available.',
    read: true,
    timestamp: new Date(Date.now() - 60 * 60000).toISOString() // 1 hour ago
  },
  {
    id: 'mock-3',
    type: 'Event',
    title: 'Hackathon Registration Open',
    message: 'Register for the upcoming national level hackathon before spots run out.',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString() // 2 hours ago
  },
  {
    id: 'mock-4',
    type: 'Placement',
    title: 'Amazon Online Assessment',
    message: 'Please complete the OA within 48 hours to proceed.',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60000).toISOString() // 1 day ago
  },
  {
    id: 'mock-5',
    type: 'Result',
    title: 'Midterm Grading Complete',
    message: 'Check your student portal for your updated scores.',
    read: true,
    timestamp: new Date(Date.now() - 48 * 60 * 60000).toISOString() // 2 days ago
  }
];
