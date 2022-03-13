import { IStaff, StaffModel } from '@models/staff-model';
import { addStaffRequest } from '@requestModel/addStaffRequest'
import { updateStaffRequest } from '@requestModel/updateStaffRequest'
import { deleteStaffRequest } from '@requestModel/deleteStaffRequest'
/**`
 * Get all staff.
 * 
 * @returns 
 */
async function getAll() {
    try {
        return await StaffModel.find({}).lean();
    } catch (error) {
        return error;
    }
}

/**
 * Add one staff.
 * 
 * @param staff 
 * @returns 
 */
async function addOne(staffRequest: addStaffRequest) {
        let result = await new StaffModel(staffRequest).save()
        return result;
}





/**
 * Update one staff.
 * 
 * @param staff 
 * @returns staffUpdated
 */
async function updateOne(staffRequest: updateStaffRequest) {
    const staff:updateStaffRequest  = {
        _id:staffRequest._id,
        name: staffRequest.name,
        address: staffRequest.address,
        gender: staffRequest.gender,
        dob: staffRequest.dob,
        phone: staffRequest.phone
    }
        let staffNeedUpdate = { ...staff };
        delete staffNeedUpdate._id;
        let staffBeforeUpdated = await StaffModel.findByIdAndUpdate(staff._id, staffNeedUpdate).lean()
        if(staffBeforeUpdated)
        return {
            staffBeforeUpdated,
            staffAfterUpdated: staff
        }
        throw new Error("staff not exited");
        
}
/**
 * Delete a staff by their id.
 * 
 * @param id 
 * @returns 
 */

async function deleteOne(request: deleteStaffRequest) {
        if (request.id) {

            let result = await StaffModel.findByIdAndDelete(request.id).lean();
            if (result === null) {
                throw new Error("id staff not exit");
            }
            return result
        }
        throw new Error("Cannot delete staff because id empty");

    
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    deleteOne
} as const;
