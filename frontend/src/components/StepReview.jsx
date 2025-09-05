import React, { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { submitBooking } from '../api';

export default function StepReview({ data, back }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    try {
      await submitBooking({
        firstName: data.firstName,
        lastName: data.lastName,
        wheels: data.wheels,
        typeId: data.type,
        vehicleId: data.model,
        startDate: data.dates.start,
        endDate: data.dates.end,
      });
      setStatus({ ok: true, msg: 'Booking successful ✅' });
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.error || 'Booking failed' });
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Review your booking</Typography>
      <Typography>Name: {data.firstName} {data.lastName}</Typography>
      <Typography>Wheels: {data.wheels}</Typography>
      <Typography>Type ID: {data.type}</Typography>
      <Typography>Model ID: {data.model}</Typography>
      <Typography>From: {String(data.dates.start)}</Typography>
      <Typography>To: {String(data.dates.end)}</Typography>

      {status && (
        <Alert severity={status.ok ? 'success' : 'error'} sx={{ mt: 2 }}>
          {status.msg}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button onClick={back} variant="outlined">Back</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
}
