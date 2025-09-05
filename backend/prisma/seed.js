/** prisma/seed.js */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function run() {
await prisma.booking.deleteMany();
await prisma.vehicle.deleteMany();
await prisma.vehicleType.deleteMany();


// 4 wheels — car types
const sedan = await prisma.vehicleType.create({ data: { name: 'Sedan', wheels: 4 } });
const suv = await prisma.vehicleType.create({ data: { name: 'SUV', wheels: 4 } });
const hatchback = await prisma.vehicleType.create({ data: { name: 'Hatchback', wheels: 4 } });


// 2 wheels — bike types
const cruiser = await prisma.vehicleType.create({ data: { name: 'Cruiser', wheels: 2 } });


// Vehicles per type
await prisma.vehicle.createMany({ data: [
// Sedans
{ model: 'Honda City', typeId: sedan.id },
{ model: 'Hyundai Verna', typeId: sedan.id },
// SUVs
{ model: 'Kia Seltos', typeId: suv.id },
{ model: 'Hyundai Creta', typeId: suv.id },
// Hatchbacks
{ model: 'Maruti Swift', typeId: hatchback.id },
{ model: 'Tata Altroz', typeId: hatchback.id },
// Cruisers (bikes)
{ model: 'Royal Enfield Classic 350', typeId: cruiser.id },
{ model: 'Bajaj Avenger', typeId: cruiser.id },
]});


console.log('Seed complete ✅');
}


run()
.catch(e => { console.error(e); process.exit(1); })
.finally(async () => { await prisma.$disconnect(); });