const mongoose = require('mongoose');

const HotelBookingPaymentSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    checkInDate: {  
        type: String,
        required: true,
    },
    checkOutDate: { 
        type: String,
        required: true,
    },
    numberOfNights: { 
        type: String,
        required: true,
    },
    numberOfRooms: { 
        type: String,
        required: true,
    },
    totalGuests: {  
        type: String,
        required: true,
    },
    accommodationType: {  
        type: String,
        required: true,
    },
    bookingAmount: { 
        type: String,
        required: true,
    },
    transactionId: { 
        type: String,
        required: true,
    },
    bookerFullName: {  
        type: String,
        required: true,
    },
    bookerEmail: { 
        type: String,
        required: true,
    },
    bookerPhone: { 
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const HotelBookingPayment = mongoose.model('HotelBookingPayment', HotelBookingPaymentSchema);

module.exports = HotelBookingPayment;
