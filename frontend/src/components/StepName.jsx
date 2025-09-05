import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function StepName({ data, setData, next }) {
  const [touched, setTouched] = useState(false);
  const valid = data.firstName?.trim() && data.lastName?.trim();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>What is your name?</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="First name"
          value={data.firstName}
          onChange={e => setData(d => ({ ...d, firstName: e.target.value }))}
          error={touched && !data.firstName?.trim()}
          helperText={touched && !data.firstName?.trim() ? 'Required' : ''}
        />
        <TextField
          label="Last name"
          value={data.lastName}
          onChange={e => setData(d => ({ ...d, lastName: e.target.value }))}
          error={touched && !data.lastName?.trim()}
          helperText={touched && !data.lastName?.trim() ? 'Required' : ''}
        />
        <Button
          variant="contained"
          onClick={() => { setTouched(true); if (valid) next(); }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
