import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#2563eb' },
                background: { default: '#f8fafc', paper: '#ffffff' },
                text: { primary: '#0f172a', secondary: '#475569' },
              }
            : {
                primary: { main: '#3b82f6' },
                background: { default: '#0f172a', paper: '#111827' },
                text: { primary: '#f8fafc', secondary: '#94a3b8' },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: { fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' },
          h6: { fontSize: '18px', fontWeight: 600 },
          body1: { fontSize: '14px' },
          body2: { fontSize: '14px' },
          caption: { fontSize: '12px' },
          subtitle1: { fontSize: '14px', color: '#64748b' },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: mode === 'light' 
                  ? 'linear-gradient(to bottom right, #f8fafc, #eef2ff)' 
                  : 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                minHeight: '100vh',
                backgroundAttachment: 'fixed',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                backgroundImage: 'none',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
                fontWeight: 600,
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
