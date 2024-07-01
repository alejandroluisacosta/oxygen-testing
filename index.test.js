const { Room } = require('./index');

const roomTemplate = new Room({name: 'Triple Pleasure', rate: 10000, discount: 25});

test('Checks if room is occupied on a given date', () => {
    const room = {...roomTemplate};
    const bookings = [
        {
            checkIn: '2024-01-01',
            checkOut: '2024-01-04'
        },
        {
            checkIn: '2024-02-01',
            checkOut: '2024-02-04'
        },
        {
            checkIn: '2024-03-01',
            checkOut: '2024-03-07'
        },
    ]
    room.bookings = bookings;
})

