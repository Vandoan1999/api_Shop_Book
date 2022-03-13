import { ICustomer, CustomerModel } from '@models/customer-model';
import { addCustomerRequest } from '@requestModel/addCustomerRequest'
import { updateCustomerRequest } from '@requestModel/updateCustomerRequest'
import { deleteCustomerRequest } from '@requestModel/deleteCustomerRequest'
/**`
 * Get all customer.
 * 
 * @returns 
 */
async function getAll() {
    return await CustomerModel.find({}).lean();
}

/**
 * Add one customer.
 * 
 * @param customer 
 * @returns 
 */
async function addOne(customerRequest: addCustomerRequest) {
    const customer: addCustomerRequest = {
        _id: customerRequest._id,
        name: customerRequest.name,
        address: customerRequest.address,
        gender: customerRequest.gender,
        dob: customerRequest.dob,
        phone: customerRequest.phone
    }
    let result = await new CustomerModel(customer).save();
    return result;

}



/**
 * Update one customer.
 * 
 * @param customer 
 * @returns customer Updated
 */
async function updateOne(customerRequest: updateCustomerRequest) {
    const customer: updateCustomerRequest = {
        _id: customerRequest._id,
        name: customerRequest.name,
        address: customerRequest.address,
        gender: customerRequest.gender,
        dob: customerRequest.dob,
        phone: customerRequest.phone
    }
    let customerNeedUpdate = { ...customer };
    delete customerNeedUpdate._id;
    let customerBeforeUpdated = await CustomerModel.findByIdAndUpdate(customer._id, customerNeedUpdate).lean();
    if (!customerBeforeUpdated) {
        throw new Error("Customer not exited");

    }
    return {
        customerBeforeUpdated,
        customerAfterUpdated: customer
    }

}
/**
 * Delete a customer by their id.
 * 
 * @param id 
 * @returns 
 */

async function deleteOne(request: deleteCustomerRequest) {
    if (request.id) {
        let result = await CustomerModel.findByIdAndDelete(request.id).lean();
        if (!result) {
            throw new Error(" id not exits!");
        }
    }
    throw new Error("cannot delete customer because _id empty");
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    deleteOne
} as const;
