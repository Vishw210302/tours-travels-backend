const mongoose = require('mongoose');

const roleAndPermissionSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        default: null
    },
    permissionId: {
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

const rolesAndPermission = mongoose.model('rolesAndPermission', roleAndPermissionSchema);

module.exports = rolesAndPermission;