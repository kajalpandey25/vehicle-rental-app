import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getVehicleTypes } from '../api';

export default function StepType({ data, setData, next, back }) {
  const [types, setTypes] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (data.wheels) {
      getVehicleTypes(data.wheels).then(setTypes).catch(() => setTypes([]));
    }
  }, [data.wheels]);

  const valid = Boolean(data.type);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Select vehicle type</Typography>
      <FormControl>
        <RadioGroup
          value={data.type || ''}
          onChange={e => setData(d => ({ ...d, type: Number(e.target.value) }))}
        >
          {types.map(t => (
            <FormControlLabel
              key={t.id}
              value={t.id}
              control={<Radio />}
              label={t.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {touched && !valid && (
        <Typography color="error" sx={{ mt: 1 }}>
          Please select a vehicle type
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
  );
}
