const mongoose = require('mongoose');

const userAndPermissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        default: null
    },
    permissionId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'permission',
        required: true,
    },
    removedPermissionId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'permission',
        required: true,
    },
    createdAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const userAndPermission = mongoose.model('userAndPermission', userAndPermissionSchema);

module.exports = userAndPermission;