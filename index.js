class Room {
    constructor({ name, bookings, rate, discount }) {
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

        const checkDays = (date, days) => {
            let newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }

        if (this.bookings) {
            let occupiedDays = 0;
            for (let i = 0; i < totalDays; i++) {
                if (this.isOccupied(checkDays(startDate, i))) {
                    occupiedDays++;
                }
            }
            if (occupiedDays > 0) {
                const percentage = ((occupiedDays / totalDays) * 100).toFixed(2);
                const floatPercentage = parseFloat(percentage);
                return floatPercentage;
            }
            return 0;
        }
        return 0;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        if (!rooms) {
            throw('No rooms selected');
        }
        let aggregatePercentage = 0;
        rooms.forEach(room => {
            const individualPercentage = room.occupancyPercentage(startDate, endDate);
            aggregatePercentage += individualPercentage;
        });
        const totalPercentage = (aggregatePercentage / rooms.length).toFixed(2);
        const result = parseFloat(totalPercentage);
        return result;
    }

    static availableRooms(rooms, startDate, endDate) {
        const availableRoomsArray = [];
        rooms.forEach(room => {
            if (room.occupancyPercentage(startDate, endDate) === 0) {
                availableRoomsArray.push(room);
            }
        })
        return availableRoomsArray;
    }
}

class Booking {
    constructor({ name, email, checkIn, checkOut, discount, room }) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee () {
        const originalPrice = this.room.rate;
        console.log(this);
        const roomDiscount = this.room.discount;
        const bookingDiscount = this.discount;

        const basePrice = originalPrice * (100 - roomDiscount) / 100;
        const finalPrice = basePrice * (100 - bookingDiscount) / 100;

        return finalPrice;
    }
}

module.exports = {
    Room, Booking
};