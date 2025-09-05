import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getWheels } from '../api';

export default function StepWheels({ data, setData, next, back }) {
  const [options, setOptions] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    getWheels()
      .then(setOptions)
      .catch(() => setOptions([2, 4])); // fallback agar API fail kare
  }, []);

  const valid = Boolean(data.wheels);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>How many wheels does your vehicle have?</Typography>
      <FormControl>
        <RadioGroup
          value={data.wheels || ''}
          onChange={e => setData(d => ({ ...d, wheels: Number(e.target.value) }))}
        >
          {options.map(opt => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio />}
              label={`${opt} wheels`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {touched && !valid && (
        <Typography color="error" sx={{ mt: 1 }}>
          Please select number of wheels
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
