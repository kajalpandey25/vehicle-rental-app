import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function StepDates({ data, setData, next, back }) {
  const [touched, setTouched] = useState(false);

  const valid = data.dates.start && data.dates.end && dayjs(data.dates.start).isBefore(dayjs(data.dates.end));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Select booking dates</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <DatePicker
            label="Start date"
            value={data.dates.start}
            onChange={(newValue) => setData(d => ({ ...d, dates: { ...d.dates, start: newValue } }))}
          />
          <DatePicker
            label="End date"
            value={data.dates.end}
            onChange={(newValue) => setData(d => ({ ...d, dates: { ...d.dates, end: newValue } }))}
          />
        </Box>
        {touched && !valid && (
          <Typography color="error" sx={{ mt: 1 }}>
            End date must be after start date
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button onClick={back} variant="outlined">Back</Button>
          <Button
            variant="contained"
            onClick={() => { setTouched(true); if (valid) next(); }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
