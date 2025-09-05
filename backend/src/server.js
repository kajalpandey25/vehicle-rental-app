const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');


const prisma = new PrismaClient();
const app = express();


const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';


app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());


// Health
app.get('/api/health', (_, res) => res.json({ ok: true }));


// Distinct wheels from DB (usually [2,4])
app.get('/api/wheels', async (_, res) => {
const wheels = await prisma.vehicleType.findMany({
distinct: ['wheels'],
select: { wheels: true },
orderBy: { wheels: 'asc' }
});
res.json(wheels.map(w => w.wheels));
});

// Vehicle types filtered by wheels
app.get('/api/vehicle-types', async (req, res) => {
const wheels = parseInt(req.query.wheels, 10);
if (![2, 4].includes(wheels)) return res.status(400).json({ error: 'Invalid wheels' });
const types = await prisma.vehicleType.findMany({
where: { wheels },
orderBy: { name: 'asc' },
});
res.json(types);
}); 

// Vehicles filtered by typeId
app.get('/api/vehicles', async (req, res) => {
const typeId = parseInt(req.query.typeId, 10);
if (!typeId) return res.status(400).json({ error: 'typeId required' });
const vehicles = await prisma.vehicle.findMany({
where: { typeId },
orderBy: { model: 'asc' },
});
res.json(vehicles);
});


// Booking schema
const BookingSchema = z.object({
firstName: z.string().min(1),
lastName: z.string().min(1),
wheels: z.number().int().refine(v => v === 2 || v === 4, 'wheels must be 2 or 4'),
typeId: z.number().int().positive(),
vehicleId: z.number().int().positive(),
startDate: z.string(), // ISO
endDate: z.string(), // ISO
});


// Create booking with overlap check
app.post('/api/bookings', async (req, res) => {
const parse = BookingSchema.safeParse(req.body);
if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
const { firstName, lastName, wheels, typeId, vehicleId, startDate, endDate } = parse.data;


const start = new Date(startDate);
const end = new Date(endDate);
if (isNaN(start) || isNaN(end) || start > end) {
return res.status(400).json({ error: 'Invalid date range' });
}


// Ensure vehicle exists and matches selected type
const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
if (!vehicle || vehicle.typeId !== typeId) {
return res.status(400).json({ error: 'Vehicle/type mismatch' });
}


// Overlap: existing.start <= new.end AND existing.end >= new.start
const conflict = await prisma.booking.findFirst({
where: {
vehicleId,
AND: [
{ startDate: { lte: end } },
{ endDate: { gte: start } },
],
},
});


if (conflict) {
return res.status(409).json({
error: 'Vehicle already booked for selected dates',
conflict: { startDate: conflict.startDate, endDate: conflict.endDate },
});
}


const created = await prisma.booking.create({
data: { firstName, lastName, vehicleId, startDate: start, endDate: end },
});


res.status(201).json({ ok: true, bookingId: created.id });
});


app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));