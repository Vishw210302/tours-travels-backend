const mongoose = require('mongoose');

const allEmployeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employees: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    employeeRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true,
    },
    employeePassword: {
        type: String,
        required: true,
    },
});

const employees = mongoose.model('employees', allEmployeeSchema);

module.exports = employees;