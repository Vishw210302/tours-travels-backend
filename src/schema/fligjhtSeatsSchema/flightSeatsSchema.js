const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seat_number: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      required: true
    }
  });
  

const flightSeatShema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightsDetails',
        default: null
    },
    economy: [seatSchema],
    business: [seatSchema],
    first_class: [seatSchema],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const flightSeat = mongoose.model('flightSeat', flightSeatShema);

module.exports = flightSeat;