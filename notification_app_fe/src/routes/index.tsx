import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AllNotifications from '../pages/AllNotifications';
import PriorityNotifications from '../pages/PriorityNotifications';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AllNotifications />,
      },
      {
        path: 'priority',
        element: <PriorityNotifications />,
      },
    ],
  },
]);
