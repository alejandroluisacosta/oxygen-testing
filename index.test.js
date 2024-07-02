const { Room, Booking } = require('./index');

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

test('Check if room is occupied on date that is not the last day of any booking', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.isOccupied('2024-01-01')).toBe(true);
    expect(room.isOccupied('2024-01-06')).toBe(false);
    expect(room.isOccupied('2024-02-02')).toBe(true);
    expect(room.isOccupied('2024-02-03')).toBe(true);
    expect(room.isOccupied('2024-03-01')).toBe(false);
    expect(room.isOccupied('2024-03-30')).toBe(true);
    expect(room.isOccupied('2024-04-03')).toBe(true);

});

test('Check if room is occupied on last day of a booking', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.isOccupied('2024-01-04')).toBe(false);
    expect(room.isOccupied('2024-02-04')).toBe(false);
    expect(room.isOccupied('2024-04-05')).toBe(false);
});

test('Check if room is occupied if bookings array has falsy value (empty/undefined/null)', () => {
    const room1 = new Room({...roomTemplate});
    room1.bookings = [];
    
    const room2 = new Room({...roomTemplate});
    room2.bookings = undefined;
    
    const room3 = new Room({...roomTemplate});
    room3.bookings = null;

    expect(room1.isOccupied('2024-01-01')).toBe(false);
    expect(room2.isOccupied('2024-01-01')).toBe(false);
    expect(room3.isOccupied('2024-01-01')).toBe(false);
});

test('Check if room is occupied if date is equal to last day of a booking', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.isOccupied('2024-01-04')).toBe(false);
    expect(room.isOccupied('2024-02-04')).toBe(false);
    expect(room.isOccupied('2024-04-05')).toBe(false);
});

// occupancyPercentage

test('Confirm occupancy is 100% if room is occupied every day in the provided range', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.occupancyPercentage('2024-01-01', '2024-01-03')).toBe(100.00);
    expect(room.occupancyPercentage('2024-02-01', '2024-02-03')).toBe(100.00);
    expect(room.occupancyPercentage('2024-03-30', '2024-04-04')).toBe(100.00); // FUNCIONA CON DIA 5 POR CAMBIO DE HORARIO
});

test('Confirm occupancy is 0% if room is not occupied any day in the provided range', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.occupancyPercentage('2024-01-05', '2024-01-31')).toBe(0);
    expect(room.occupancyPercentage('2024-02-04', '2024-03-29')).toBe(0);
    expect(room.occupancyPercentage('2024-04-06', '2024-04-06')).toBe(0);
});

test('Check percentage of days the room is occupied in the provided range', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;
    room.bookings.push({checkIn: '2024-01-09', checkOut: '2024-01-15'});

    expect(room.occupancyPercentage('2024-01-02', '2024-01-11')).toBe(50);
    expect(room.occupancyPercentage('2024-02-02', '2024-02-09')).toBe(25);
    expect(room.occupancyPercentage('2024-01-01', '2024-04-05')).toBe(19.79);
})

test('Confirm occupancy is 0% if no booking are provided for the room', () => {
    const room = new Room({...roomTemplate});
    room.bookings = [];

    expect(room.occupancyPercentage('2024-01-01', '2024-01-04')).toBe(0);
    expect(room.occupancyPercentage('2024-01-02', '2024-01-03')).toBe(0);
    expect(room.occupancyPercentage('2024-03-31', '2024-04-04')).toBe(0);
});

test('Check occupancy if check-in and check-out dates are equal', () => {
    const room = new Room({...roomTemplate});
    room.bookings = bookingsTemplate;

    expect(room.occupancyPercentage('2024-01-01', '2024-01-01')).toBe(100);
    expect(room.occupancyPercentage('2024-01-15', '2024-01-15')).toBe(0);
    expect(room.occupancyPercentage('2024-03-30', '2024-03-30')).toBe(100);
});

// totalOccupancyPercentage

describe('totalOccupancyPercentage method testing', () => {
    test('All rooms are occupied for the whole provided period', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-05',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-01-11',
                    checkOut: '2024-01-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-01-06',
                    checkOut: '2024-01-12'
                },
                {
                    checkIn: '2024-01-12',
                    checkOut: '2024-01-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-07'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-01-11',
                    checkOut: '2024-01-15'
                }
            ],
            rate: 10000,
            discount: 25
        });

        const rooms = [room1, room2, room3];

        expect(Room.totalOccupancyPercentage(rooms, '2024-01-01', '2024-01-03')).toBe(100);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-05', '2024-01-10')).toBe(100);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-11', '2024-01-14')).toBe(100);
    });
    
    test('No room is occupied in the whole period', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-13',
                    checkOut: '2024-01-28'
                },
                {
                    checkIn: '2024-02-06',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-02',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-14',
                    checkOut: '2024-01-17'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-01-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-13',
                    checkOut: '2024-01-19'
                },
                {
                    checkIn: '2024-01-19',
                    checkOut: '2024-01-29'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-14'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-05', '2024-01-12')).toBe(0);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-29', '2024-02-05')).toBe(0);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-02-15', '2024-02-20')).toBe(0);
    });

    test('Some rooms are occupied for the whole period and others are completely free or partially occupied', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-20'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-16'
                },
                {
                    checkIn: '2024-02-07',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-03'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-16'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-20'
                }
            ],
            rate: 10000,
            discount: 25
        });

        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-01', '2024-01-05')).toBe(80);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-07', '2024-01-15')).toBe(66.67);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-02-10', '2024-02-19')).toBe(83.33);
    })

    test('A single room is completely occupied and the rest are either completely free or partially occupied', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-12'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-03',
                    checkOut: '2024-01-08'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-16'
                },
                {
                    checkIn: '2024-02-07',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-02'
                },
                {
                    checkIn: '2024-01-10',
                    checkOut: '2024-01-15'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-20'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-01', '2024-01-05')).toBe(60);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-07', '2024-01-15')).toBe(51.85);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-02-10', '2024-02-19')).toBe(56.67);
    });

    test('The array of rooms has falsy value', () => {
        expect(() => (Room.totalOccupancyPercentage(undefined, '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
        expect(() => (Room.totalOccupancyPercentage([], '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
        expect(() => (Room.totalOccupancyPercentage(null, '2024-01-01', '2024-01-05')).toThrow('No rooms selected'));
    });

    test('There\'s only one room in the array', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-12'
                }
            ],
            rate: 10000,
            discount: 25
        });

        expect(Room.totalOccupancyPercentage([room1], '2024-01-01', '2024-01-05')).toBe(100);
        expect(Room.totalOccupancyPercentage([room1], '2024-02-10', '2024-02-13')).toBe(50);
        expect(Room.totalOccupancyPercentage([room1], '2024-01-10', '2024-01-15')).toBe(0);
    })

    test('All rooms are partially occupied', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-03'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-12'
                },
                {
                    checkIn: '2024-02-10',
                    checkOut: '2024-02-14'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-02',
                    checkOut: '2024-01-05'
                },
                {
                    checkIn: '2024-01-09',
                    checkOut: '2024-01-14'
                },
                {
                    checkIn: '2024-02-07',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-05',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-14',
                    checkOut: '2024-02-22'
                }
            ],
            rate: 10000,
            discount: 25
        });

        // expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-01', '2024-01-05')).toBe(53.33);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-01-07', '2024-01-15')).toBe(51.85);
        expect(Room.totalOccupancyPercentage([room1, room2, room3], '2024-02-10', '2024-02-19')).toBe(50);
    })
});

describe('availableRooms method testing', () => {
    test('No room is available', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-05',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-01-06',
                    checkOut: '2024-01-12'
                },
                {
                    checkIn: '2024-02-12',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-07'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });

        const rooms = [room1, room2, room3];

        expect(Room.availableRooms(rooms, '2024-01-01', '2024-01-03')).toEqual([]);
        expect(Room.availableRooms(rooms, '2024-01-07', '2024-01-015')).toEqual([]);
        expect(Room.availableRooms(rooms, '2024-02-10', '2024-02-20')).toEqual([]);
    });

    test('All rooms are available', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-05',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-06'
                },
                {
                    checkIn: '2024-01-06',
                    checkOut: '2024-01-12'
                },
                {
                    checkIn: '2024-02-12',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-07'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });

        const rooms = [room1, room2, room3];

        expect(Room.availableRooms(rooms, '2024-01-12', '2024-01-25')).toEqual(rooms);
        expect(Room.availableRooms(rooms, '2024-01-15', '2024-01-25')).toEqual(rooms);
        expect(Room.availableRooms(rooms, '2025-01-15', '2025-01-25')).toEqual(rooms);
    });

    test('Some rooms are available', () => {
        const room1 = new Room({
            name: 'Suite 1',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-04'
                },
                {
                    checkIn: '2024-01-12',
                    checkOut: '2024-01-16'
                },
            ],
            rate: 10000,
            discount: 25
        });
        
        const room2 = new Room({
            name: 'Suite 2',
            bookings: [
                {
                    checkIn: '2024-01-06',
                    checkOut: '2024-01-12'
                },
                {
                    checkIn: '2024-02-12',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });
        
        const room3 = new Room({
            name: 'Suite 3',
            bookings: [
                {
                    checkIn: '2024-01-01',
                    checkOut: '2024-01-07'
                },
                {
                    checkIn: '2024-01-07',
                    checkOut: '2024-01-11'
                },
                {
                    checkIn: '2024-02-11',
                    checkOut: '2024-02-15'
                }
            ],
            rate: 10000,
            discount: 25
        });

        const rooms = [room1, room2, room3];

        expect(Room.availableRooms(rooms, '2024-01-01', '2024-01-05')).toEqual([room2]);
        expect(Room.availableRooms(rooms, '2024-01-12', '2024-01-14')).toEqual([room2, room3]);
        expect(Room.availableRooms(rooms, '2024-02-11', '2024-02-15')).toEqual([room1]);
    });
});

const bookingTemplate = new Booking({
    name: 'Bruce Banner',
    email: 'brucebanner1@mail.com',
    checkIn: '2024-01-01',
    checkOut: '2024-01-05',
    discount: 20,
    room: roomTemplate,
})

describe('getFee method testing', () => {
    test('Room\'s discount is zero', () => {
        const booking1 = bookingTemplate;
        booking1.price = 15000;
        booking1.room.discount = 0;

        const booking2 = bookingTemplate;
        booking2.price = 30000;
        booking2.room.discount = 0;

        const booking3 = bookingTemplate;
        booking3.price = 45000;
        booking3.room.discount = 0;

        expect(booking1.getFee()).toBe(12000);
        expect(booking2.getFee()).toBe(24000);
        expect(booking3.getFee()).toBe(36000);
    });

    test('Booking\'s discount is zero', () => {
        const booking1 = bookingTemplate;
        booking1.price = 15000;
        booking1.discount = 0;

        const booking2 = bookingTemplate;
        booking2.price = 30000;
        booking2.discount = 0;

        const booking3 = bookingTemplate;
        booking3.price = 45000;
        booking3.discount = 0;

        expect(booking1.getFee()).toBe(11250);
        expect(booking2.getFee()).toBe(22500);
        expect(booking3.getFee()).toBe(33750);
    });

    test('Room\'s price is zero', () => {
        const booking1 = bookingTemplate;
        booking1.price = 0;

        const booking2 = bookingTemplate;
        booking2.price = 0;

        const booking3 = bookingTemplate;
        booking3.price = 0;

        expect(booking1.getFee()).toBe(0);
        expect(booking2.getFee()).toBe(0);
        expect(booking3.getFee()).toBe(0);
    });

    test('Either discount is 100%', () => {
        const booking1 = bookingTemplate;
        booking1.price = 15000;
        booking1.discount = 100;

        const booking2 = bookingTemplate;
        booking2.price = 30000;
        booking2.room.discount = 100;
        
        const booking3 = bookingTemplate;
        booking3.price = 45000;
        booking3.discount = 100;
        booking3.room.discount = 100;
        
        expect(booking1.getFee()).toBe(0);
        expect(booking2.getFee()).toBe(0);
        expect(booking3.getFee()).toBe(0);
    });

    test('Both discounts are between 1 and 99%', () => {
        const booking1 = bookingTemplate;
        booking1.price = 15000;

        const booking2 = bookingTemplate;
        booking2.price = 30000;
        booking2.room.discount = 15;
        
        const booking3 = bookingTemplate;
        booking3.price = 45000;
        booking3.discount = 15;

        expect(booking1.getFee()).toBe(9000);
        expect(booking2.getFee()).toBe(20400);
        expect(booking2.getFee()).toBe(28687.50);
    })
})