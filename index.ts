const checkDays = (date: string, days: number) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

interface RoomInput {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;
}

export class Room {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;

    constructor({ name, bookings, rate, discount }: RoomInput) {
        this.name = name;
        this.bookings = bookings || [];
        this.rate = rate || 0;
        this.discount = discount || 0;
    }

    isOccupied(date: string | Date): boolean {
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

    occupancyPercentage(start: string, end: string): number {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) + 1;

        let occupiedDays = 0;
        for (let i = 0; i < totalDays; i++) {
            if (this.isOccupied(checkDays(start, i))) {
                occupiedDays++;
            }
        }
        const percentage = ((occupiedDays / totalDays) * 100).toFixed(2);
        const floatPercentage = parseFloat(percentage);
        return floatPercentage;
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
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

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
        return rooms.filter(room => room.occupancyPercentage(startDate, endDate) === 0)
    }
}

interface BookingInput {
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    room: Room;
}

export class Booking {
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    room: Room;

    constructor({ name, email, checkIn, checkOut, discount, room }: BookingInput) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee (): number {
        const originalPrice = this.room.rate;
        const roomDiscount = this.room.discount;
        const bookingDiscount = this.discount;

        const basePrice = originalPrice * (100 - roomDiscount) / 100;
        const finalPrice = basePrice * (100 - bookingDiscount) / 100;

        return finalPrice;
    }
}