import React from 'react';
import { Container, CssBaseline, Card, CardContent } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Wizard from './components/Wizard';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Wizard />
            </CardContent>
          </Card>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
