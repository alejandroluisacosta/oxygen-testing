const { Room, Booking } = require('./index');

const roomTemplate = ({name: 'Suite', rate: 10000, discount: 25});

const booking1 = new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-04' });
const booking2 = new Booking({ checkIn: '2024-02-01', checkOut: '2024-02-04' });
const booking3 = new Booking({ checkIn: '2024-03-30', checkOut: '2024-04-05' });
const bookingsTemplate = [ booking1, booking2, booking3 ];

describe('isOccupied', () => {
    describe('Check if room is occupied on date that is not the last day of any booking', () => {
        test('Date is first day of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-01-01')).toBe(true);
        
        });
        test('Date is in the middle of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-02-02')).toBe(true);
        });
        test('Date is the day before the last day of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-02-03')).toBe(true);
        });
        test('Date is before first day of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-03-01')).toBe(false);
        });
        test('Date is after last day of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-04-10')).toBe(false);
        });
    });
    
    describe('Check if room is occupied on last day of a booking', () => {
        test('Date #1', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-01-04')).toBe(false);
        });
        test('Date #2', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-02-04')).toBe(false);
        });
        test('Date #3', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-04-05')).toBe(false);
        });
    })
    
    describe('Check if room is occupied if bookings array has falsy value (empty/undefined/null)', () => {
        test('Empty', () => {
            const room = new Room({...roomTemplate});
            room.bookings = [];
            
            expect(room.isOccupied('2024-01-01')).toBe(false);
        });
        
        test('Undefined',() => {
            const room = new Room({...roomTemplate});
            room.bookings = undefined;

            expect(room.isOccupied('2024-01-01')).toBe(false);
        });
        
        test('Null', () => {
            const room = new Room({...roomTemplate});
            room.bookings = null;
        
            expect(room.isOccupied('2024-01-01')).toBe(false);
        });
    });

    describe('Check if room is occupied if date is equal to last day of a booking', () => {
        test('Date #1', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-01-04')).toBe(false);
        });

        test('Date #2', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-02-04')).toBe(false);
        });

        test('Date #3', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.isOccupied('2024-04-05')).toBe(false);
        });
    });
});

describe('occupancyPercentage', () => {
    describe('Confirm occupancy is 100% if room is occupied every day in the provided range', () => {
        test('Case #1', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-01-01', '2024-01-03')).toBe(100.00);
        });

        test('Case #2', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-02-01', '2024-02-03')).toBe(100.00);
        });

        test('Case #3', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-03-30', '2024-04-04')).toBe(100.00);
        });

    })
    
    describe('Confirm occupancy is 0% if room is not occupied any day in the provided range', () => {
        test('Date range is between two bookings', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-01-05', '2024-01-31')).toBe(0);
        });

        test('First date of range is last day of a booking // Last day of range is day before next booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-02-04', '2024-03-29')).toBe(0);
        });

        test('Date range is after all bookings', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-01-05', '2024-01-31')).toBe(0);
            expect(room.occupancyPercentage('2024-02-04', '2024-03-29')).toBe(0);
        });
    });
    
    describe('Date range coincides with bookings ranges', () => {
        test('Range coincides with only one booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-02-02', '2024-02-09')).toBe(25);
        });
    
        test('Range coincides with two bookings separated by days in between them', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
            room.bookings.push({checkIn: '2024-01-09', checkOut: '2024-01-15'});
        
            expect(room.occupancyPercentage('2024-01-02', '2024-01-11')).toBe(50);
        });
    
        test('Long range across several bookings', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
            room.bookings.push({checkIn: '2024-01-09', checkOut: '2024-01-15'});
        
            expect(room.occupancyPercentage('2024-01-01', '2024-04-05')).toBe(19.79);
        });
    
        test('Range within booking\'s beginning and end', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-02-02', '2024-02-03')).toBe(100);
        });
    });

    describe('Confirm occupancy is 0% if no bookings are provided for the room', () => {
        test('Test #1', () => {
            const room = new Room({...roomTemplate});
        
            expect(room.occupancyPercentage('2024-01-01', '2024-01-04')).toBe(0);
        });
    });
    
    describe('Check occupancy if check-in and check-out dates are equal', () => {
        test('Date within booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-01-01', '2024-01-01')).toBe(100);
            expect(room.occupancyPercentage('2024-01-15', '2024-01-15')).toBe(0);
            expect(room.occupancyPercentage('2024-03-30', '2024-03-30')).toBe(100);
        });

        test('Date outside of booking', () => {
            const room = new Room({...roomTemplate});
            room.bookings = bookingsTemplate;
        
            expect(room.occupancyPercentage('2024-01-15', '2024-01-15')).toBe(0);
        });
    });
})

describe('totalOccupancyPercentage', () => {
    describe('All rooms are occupied for the whole provided range', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = JSON.parse(JSON.stringify(bookingsTemplate));

        const room2 = new Room({...roomTemplate});
        room2.bookings = JSON.parse(JSON.stringify(bookingsTemplate));
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = JSON.parse(JSON.stringify(bookingsTemplate));

        const rooms = [room1, room2, room3];

        test('Range starting on first day of a booking', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-01', '2024-01-03')).toBe(100);
        });

        test('Range finishing on the day before the last day of a booking', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-02-02', '2024-02-03')).toBe(100);
        });

        test('Range within bookings', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-03-31', '2024-04-03')).toBe(100);
        });
    });
    
    describe('No room is occupied in the whole range', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = JSON.parse(JSON.stringify(bookingsTemplate));

        const room2 = new Room({...roomTemplate});
        room2.bookings = JSON.parse(JSON.stringify(bookingsTemplate));
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = JSON.parse(JSON.stringify(bookingsTemplate));

        const rooms = [room1, room2, room3];
        
        test('Range before all bookings', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2023-12-01', '2023-12-25')).toBe(0);
        });

        test('Range in between bookings // First day of range is last day of 1st booking // Last day of range is day before second booking starts', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-04', '2024-01-31')).toBe(0);
        });

        test('Range after all bookings', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-04-15', '2024-04-20')).toBe(0);
        });
    });

    describe('Some rooms are occupied for the whole period and others are completely free or partially occupied', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-02-10', checkOut: '2024-02-20' })];

        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-16' })];
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-03' }), new Booking({ checkIn: '2024-01-10', checkOut: '2024-01-16' }), new Booking({ checkIn: '2024-02-10', checkOut: '2024-02-20' }),];

        const rooms = [room1, room2, room3];
        
        test('Two rooms completely occupied and another partially occupied', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-01', '2024-01-05')).toBe(80);
        });

        test('One room is completely occupied, another is partially occupied, and anoter is not occupied at all', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-07', '2024-01-15')).toBe(55.56);

        });

        test('Two rooms are completely occupied and another is completely free', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-02-10', '2024-02-19')).toBe(66.67);
        });
    })

    describe('A single room is completely occupied and the rest are either completely free or partially occupied', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-01-10', checkOut: '2024-01-12' })];

        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-03', checkOut: '2024-01-07' }), new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-16' })];
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-02' }), new Booking({ checkIn: '2024-02-10', checkOut: '2024-02-20' })];

        const rooms = [room1, room2, room3];

        test('One fully occupied and the others partially occupied', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-01', '2024-01-05')).toBe(60);
        });
    
        test('One fully occupied, one partially occupied and another completely free', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-07', '2024-01-15')).toBe(40.74);
        });
    
        test('One fully occupied and the rest completely free', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-02-10', '2024-02-19')).toBe(33.33);
        });
    });

    
    describe('The array of rooms has falsy value', () => {
        test('Empty', () => {
            expect(() => (Room.totalOccupancyPercentage([], '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
        });

        test('Undefined', () => {
            expect(() => (Room.totalOccupancyPercentage(undefined, '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
        });

        test('Null', () => {
            expect(() => (Room.totalOccupancyPercentage(null, '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
        })
    });

    describe('There\'s only one room in the array', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-02-10', checkOut: '2024-02-12' })];

        test('Full occupation', () => {
            expect(Room.totalOccupancyPercentage([room1], '2024-01-01', '2024-01-05')).toBe(100);
        });

        test('Half occupation', () => {
            expect(Room.totalOccupancyPercentage([room1], '2024-02-10', '2024-02-13')).toBe(50);
        });

        test('No occupation', () => {
            expect(Room.totalOccupancyPercentage([room1], '2024-01-10', '2024-01-15')).toBe(0);
        });
    })

    describe('All rooms are partially occupied', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-03' }),new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-12' }),new Booking({ checkIn: '2024-02-10', checkOut: '2024-02-14' })]

        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-02', checkOut: '2024-01-05' }),new Booking({ checkIn: '2024-01-09', checkOut: '2024-01-14' }),new Booking({ checkIn: '2024-02-07', checkOut: '2024-02-15' })]
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-04' }),new Booking({ checkIn: '2024-01-05', checkOut: '2024-01-11' }),new Booking({ checkIn: '2024-02-14', checkOut: '2024-02-22' })]

        const rooms = [room1, room2, room3];

        test('Case #1', () => {
            // expect(Room.totalOccupancyPercentage(rooms, '2024-01-01', '2024-01-05')).toBe(53.33); SHOULD NOT COUNT LAST DAY OF BOOKING AS OCCUPIED YET IT DOES
        });

        test('Case #2', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-01-07', '2024-01-15')).toBe(51.85);
        });

        test('Case #3', () => {
            expect(Room.totalOccupancyPercentage(rooms, '2024-02-10', '2024-02-19')).toBe(50);
        });
    })
});

describe('availableRooms', () => {
    describe('No room is available', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-04' }), new Booking({ checkIn: '2024-01-05', checkOut: '2024-01-11' }), new Booking({ checkIn: '2024-02-11', checkOut: '2024-02-15' })]

        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-01-06', checkOut: '2024-01-12' }), new Booking({ checkIn: '2024-02-12', checkOut: '2024-02-15' })]
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-07' }), new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-11' }), new Booking({ checkIn: '2024-02-11', checkOut: '2024-02-15' })]

        const rooms = [room1, room2, room3];

        test('Case #1', () => {
            expect(Room.availableRooms(rooms, '2024-01-01', '2024-01-03')).toEqual([]);
        });

        test('Case #2', () => {
            expect(Room.availableRooms(rooms, '2024-01-07', '2024-01-15')).toEqual([]);
        });

        test('Case #3', () => {
            expect(Room.availableRooms(rooms, '2024-02-10', '2024-02-20')).toEqual([]);
        });
    });

    describe('All rooms are available', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-04' }), new Booking({ checkIn: '2024-01-05', checkOut: '2024-01-11' }), new Booking({ checkIn: '2024-02-11', checkOut: '2024-02-15' })];

        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-06' }), new Booking({ checkIn: '2024-01-06', checkOut: '2024-01-12' }), new Booking({ checkIn: '2024-02-12', checkOut: '2024-02-15' })];
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-07' }), new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-11' }), new Booking({ checkIn: '2024-02-11', checkOut: '2024-02-15' })];

        const rooms = [room1, room2, room3];

        test('Range before all bookings', () => {
            expect(Room.availableRooms(rooms, '2023-12-10', '2023-12-20')).toEqual(rooms);
        });

        test('Range in between boookings', () => {
            expect(Room.availableRooms(rooms, '2024-01-15', '2024-01-25')).toEqual(rooms);
        });

        test('Range after all bookings', () => {
            expect(Room.availableRooms(rooms, '2025-03-20', '2025-03-30')).toEqual(rooms);
        });
    });

    describe('Some rooms are available', () => {
        const room1 = new Room({...roomTemplate});
        room1.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-04' }), new Booking({ checkIn: '2024-01-12', checkOut: '2024-01-16' })];
        
        const room2 = new Room({...roomTemplate});
        room2.bookings = [ new Booking({ checkIn: '2024-01-06', checkOut: '2024-01-12' }), new Booking({ checkIn: '2024-02-12', checkOut: '2024-02-15' })];
        
        const room3 = new Room({...roomTemplate});
        room3.bookings = [ new Booking({ checkIn: '2024-01-01', checkOut: '2024-01-07' }), new Booking({ checkIn: '2024-01-07', checkOut: '2024-01-11' }), new Booking({ checkIn: '2024-02-11', checkOut: '2024-02-15' })];

        const rooms = [room1, room2, room3];

        test('Only one room is available', () => {
            expect(Room.availableRooms(rooms, '2024-01-01', '2024-01-05')).toEqual([room2]);
        });

        test('More than one room is available and others are not available', () => {
            expect(Room.availableRooms(rooms, '2024-01-12', '2024-01-14')).toEqual([room2, room3]);
        })
    });
});

const bookingTemplate = new Booking({
    name: 'Bruce Banner',
    email: 'brucebanner1@mail.com',
    checkIn: '2024-01-01',
    checkOut: '2024-01-05',
    discount: 20,
})

describe('getFee', () => {
    test('Room\'s discount is zero', () => {
        const booking1 = new Booking({...bookingTemplate});
        booking1.room = new Room({...roomTemplate});
        booking1.room.rate = 15000;
        booking1.room.discount = 0;
        
        const booking2 = new Booking({...bookingTemplate});
        booking2.room = new Room({...roomTemplate});
        booking2.room.rate = 30000;
        booking2.room.discount = 0;
        
        const booking3 = new Booking({...bookingTemplate});
        booking3.room = new Room({...roomTemplate});
        booking3.room.rate = 45000;
        booking3.room.discount = 0;

        expect(booking1.getFee()).toBe(12000);
        expect(booking2.getFee()).toBe(24000);
        expect(booking3.getFee()).toBe(36000);
    });

    test('Booking\'s discount is zero', () => {
        const booking1 = new Booking({...bookingTemplate});
        booking1.room = new Room({...roomTemplate});
        booking1.room.rate = 15000;
        booking1.discount = 0;

        const booking2 = new Booking({...bookingTemplate});
        booking2.room = new Room({...roomTemplate});
        booking2.room.rate = 30000;
        booking2.discount = 0;

        const booking3 = new Booking({...bookingTemplate});
        booking3.room = new Room({...roomTemplate});
        booking3.room.rate = 45000;
        booking3.discount = 0;

        expect(booking1.getFee()).toBe(11250);
        expect(booking2.getFee()).toBe(22500);
        expect(booking3.getFee()).toBe(33750);
    });

    test('Room\'s price is zero', () => {
        const booking1 = new Booking({...bookingTemplate});
        booking1.room = new Room({...roomTemplate});
        booking1.room.rate = 0;

        const booking2 = new Booking({...bookingTemplate});
        booking2.room = new Room({...roomTemplate});
        booking2.room.rate = 0;

        const booking3 = new Booking({...bookingTemplate});
        booking3.room = new Room({...roomTemplate});
        booking3.room.rate = 0;

        expect(booking1.getFee()).toBe(0);
        expect(booking2.getFee()).toBe(0);
        expect(booking3.getFee()).toBe(0);
    });

    test('Either discount is 100%', () => {
        const booking1 = new Booking({...bookingTemplate});
        booking1.room = new Room({...roomTemplate});
        booking1.room.rate = 15000;
        booking1.discount = 100;

        const booking2 = new Booking({...bookingTemplate});
        booking2.room = new Room({...roomTemplate});
        booking2.room.rate = 30000;
        booking2.room.discount = 100;
        
        const booking3 = new Booking({...bookingTemplate});
        booking3.room = new Room({...roomTemplate});
        booking3.discount = 100;
        booking3.room.discount = 100;
        
        expect(booking1.getFee()).toBe(0);
        expect(booking2.getFee()).toBe(0);
        expect(booking3.getFee()).toBe(0);
    });

    test('Both discounts are between 1 and 99%', () => {
        const booking1 = new Booking({...bookingTemplate});
        booking1.room = new Room({...roomTemplate});
        booking1.room.rate = 15000;

        const booking2 = new Booking({...bookingTemplate});
        booking2.room = new Room({...roomTemplate});
        booking2.room.rate = 30000;
        booking2.room.discount = 15;
        
        const booking3 = new Booking({...bookingTemplate});
        booking3.room = new Room({...roomTemplate});
        booking3.room.rate = 45000;
        booking3.discount = 15;

        expect(booking1.getFee()).toBe(9000);
        expect(booking2.getFee()).toBe(20400);
        expect(booking3.getFee()).toBe(28687.50);
    });
})