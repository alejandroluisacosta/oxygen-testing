class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings || [];
        this.rate = rate || 0;
        this.discount = discount || 0;
    }

    isOccupied(date) {
        const checkDate = new Date(date);
        if (this.bookings) {
            return this.bookings.some(booking => {
                const checkIn = new Date(booking.checkIn);
                const checkOut = new Date(booking.checkOut);
                return checkDate >= checkIn && checkDate < checkOut;
            });
        }
        return false;
    }

    occupancyPercentage(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round((endDate - startDate) / millisecondsPerDay) + 1;
        if (this.bookings) {
            let occupiedDays = 0;
            for (let i = 0; i < totalDays; i++) {
                if (this.isOccupied(startDate + i)) { // HOW TO ADD 1 TO A DATE?
                    console.log(startDate + i);
                    occupiedDays++;
                }
            }
            if (occupiedDays > 0)
                return ((occupiedDays / totalDays).toFixed(2)) * 100;
            return 0;
        }
        return 0;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms(rooms, startDate, endDate) {

    }
}

module.exports = {
    Room
};