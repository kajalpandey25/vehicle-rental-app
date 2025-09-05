import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, LinearProgress } from '@mui/material';
import StepName from './StepName';
import StepWheels from './StepWheels';
import StepType from './StepType';
import StepModel from './StepModel';
import StepDates from './StepDates';
import StepReview from './StepReview';

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    wheels: null,
    type: null,
    model: null,
    dates: { start: null, end: null }
  });

  const steps = useMemo(() => [
    { title: 'Your name', comp: StepName },
    { title: 'Number of wheels', comp: StepWheels },
    { title: 'Type of vehicle', comp: StepType },
    { title: 'Specific model', comp: StepModel },
    { title: 'Date range', comp: StepDates },
    { title: 'Review & submit', comp: StepReview },
  ], []);

  const Current = steps[step].comp;

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  useEffect(() => {
    if (step <= 1) setData(d => ({ ...d, type: null, model: null }));
    if (step <= 2) setData(d => ({ ...d, model: null }));
  }, [step]);

  const progress = (step / (steps.length - 1)) * 100;

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <Current data={data} setData={setData} next={next} back={back} step={step} steps={steps} />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button disabled={step === 0} onClick={back} variant="outlined">Back</Button>
      </Box>
    </Box>
  );
}
