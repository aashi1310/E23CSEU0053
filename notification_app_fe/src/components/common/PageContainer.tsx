import React from 'react';
import { Container, Box } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;
