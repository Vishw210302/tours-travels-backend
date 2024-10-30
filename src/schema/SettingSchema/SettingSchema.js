const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({

  keyName: {
    type: String,
    required: true,
  },

  contentType: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },

  valueContent: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

const Setting = mongoose.model('Setting', SettingSchema);

module.exports = Setting;