import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import { router } from './routes';

function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={router} />
    </CustomThemeProvider>
  );
}

export default App;
