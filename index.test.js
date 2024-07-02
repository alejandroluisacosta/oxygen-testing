const { Room } = require('./index');

const roomTemplate = new Room({name: 'Suite', rate: 10000, discount: 25});
const bookingsTemplate = [
    {
        checkIn: '2024-01-01',
        checkOut: '2024-01-04'
    },
    {
        checkIn: '2024-02-01',
        checkOut: '2024-02-04'
    },
    {
        checkIn: '2024-03-30',
        checkOut: '2024-04-05'
    },
];

// isOccupied

// test('Check if room is occupied on date that is not the last day of any booking', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.isOccupied('2024-01-01')).toBe(true);
//     expect(room.isOccupied('2024-01-06')).toBe(false);
//     expect(room.isOccupied('2024-02-02')).toBe(true);
//     expect(room.isOccupied('2024-02-03')).toBe(true);
//     expect(room.isOccupied('2024-03-01')).toBe(false);
//     expect(room.isOccupied('2024-03-30')).toBe(true);
//     expect(room.isOccupied('2024-04-03')).toBe(true);

// });

// test('Check if room is occupied on last day of a booking', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.isOccupied('2024-01-04')).toBe(false);
//     expect(room.isOccupied('2024-02-04')).toBe(false);
//     expect(room.isOccupied('2024-04-05')).toBe(false);
// });

// test('Check if room is occupied if bookings array has falsy value (empty/undefined/null)', () => {
//     const room1 = new Room({...roomTemplate});
//     room1.bookings = [];
    
//     const room2 = new Room({...roomTemplate});
//     room2.bookings = undefined;
    
//     const room3 = new Room({...roomTemplate});
//     room3.bookings = null;

//     expect(room1.isOccupied('2024-01-01')).toBe(false);
//     expect(room2.isOccupied('2024-01-01')).toBe(false);
//     expect(room3.isOccupied('2024-01-01')).toBe(false);
// });

// test('Check if room is occupied if date is equal to last day of a booking', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.isOccupied('2024-01-04')).toBe(false);
//     expect(room.isOccupied('2024-02-04')).toBe(false);
//     expect(room.isOccupied('2024-04-05')).toBe(false);
// });

// occupancyPercentage

// test('Confirm occupancy is 100% if room is occupied every day in the provided range', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.occupancyPercentage('2024-01-01', '2024-01-03')).toBe(100.00);
//     expect(room.occupancyPercentage('2024-02-01', '2024-02-03')).toBe(100.00);
//     expect(room.occupancyPercentage('2024-03-30', '2024-04-04')).toBe(100.00); // FUNCIONA CON DIA 5 POR CAMBIO DE HORARIO
// });

// test('Confirm occupancy is 0% if room is not occupied any day in the provided range', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.occupancyPercentage('2024-01-05', '2024-01-31')).toBe(0);
//     expect(room.occupancyPercentage('2024-02-04', '2024-03-29')).toBe(0);
//     expect(room.occupancyPercentage('2024-04-06', '2024-04-06')).toBe(0);
// });

// test('Check percentage of days the room is occupied in the provided range', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;
//     room.bookings.push({checkIn: '2024-01-09', checkOut: '2024-01-15'});

//     expect(room.occupancyPercentage('2024-01-02', '2024-01-11')).toBe(50);
//     expect(room.occupancyPercentage('2024-02-02', '2024-02-09')).toBe(25);
//     expect(room.occupancyPercentage('2024-01-01', '2024-04-05')).toBe(19.79);
// })

// test('Confirm occupancy is 0% if no booking are provided for the room', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = [];

//     expect(room.occupancyPercentage('2024-01-01', '2024-01-04')).toBe(0);
//     expect(room.occupancyPercentage('2024-01-02', '2024-01-03')).toBe(0);
//     expect(room.occupancyPercentage('2024-03-31', '2024-04-04')).toBe(0);
// });

// test('Check occupancy if check-in and check-out dates are equal', () => {
//     const room = new Room({...roomTemplate});
//     room.bookings = bookingsTemplate;

//     expect(room.occupancyPercentage('2024-01-01', '2024-01-01')).toBe(100);
//     expect(room.occupancyPercentage('2024-01-15', '2024-01-15')).toBe(0);
//     expect(room.occupancyPercentage('2024-03-30', '2024-03-30')).toBe(100);
// });
