const { default: mongoose } = require("mongoose");
const employees = require("../schema/allEmployeeSchema/allEmployeeSchema");
const rolesAndPermission = require("../schema/roleAndPermissionSchema/roleAndPermissionSchema");
const userAndPermission = require("../schema/userAndPermissionSchema/userAndPermissionSchema");

exports.roleAndPermission = async (userId) => {
    const id = new mongoose.Types.ObjectId(userId);
    try {
        const employeeWithPermission = await employees.findById(id).populate('employeeRole');

        const allRoleAndPermission = await rolesAndPermission
            .findOne({ roleId: employeeWithPermission?.employeeRole?._id })
            .populate("permissionId");

        const allUserAndPermission = await userAndPermission
            .findOne({ userId: id })
            .populate("permissionId")
            .populate("removedPermissionId");

        const rolePermissions = allRoleAndPermission?.permissionId.map(
            (permission) => permission.permissionName
        ) || [];

        const userPermissions = allUserAndPermission?.permissionId.map(
            (permission) => permission.permissionName
        ) || [];

        const removedPermissions = allUserAndPermission?.removedPermissionId.map(
            (permission) => permission.permissionName
        ) || [];

        const permissions = [...new Set([...rolePermissions, ...userPermissions])]
            .filter((permission) => !removedPermissions.includes(permission));

        const hasPermission = (permission) => permissions.includes(permission);

        return hasPermission;

    } catch (error) {
        console.log("error", error);
        return null;
    }
};
