import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getVehicles } from '../api';

export default function StepModel({ data, setData, next, back }) {
  const [models, setModels] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (data.type) {
      getVehicles(data.type).then(setModels).catch(() => setModels([]));
    }
  }, [data.type]);

  const valid = Boolean(data.model);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Select vehicle model</Typography>
      <FormControl>
        <RadioGroup
          value={data.model || ''}
          onChange={e => setData(d => ({ ...d, model: Number(e.target.value) }))}
        >
          {models.map(m => (
            <FormControlLabel
              key={m.id}
              value={m.id}
              control={<Radio />}
              label={m.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {touched && !valid && (
        <Typography color="error" sx={{ mt: 1 }}>
          Please select a model
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
