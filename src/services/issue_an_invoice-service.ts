import { IIssueAnInvoice, IssueAnInvoiceModel } from '@models/issue_an_invoice-model';
import { IStaff, StaffModel } from '@models/staff-model'
import { ICustomer, CustomerModel } from '@models/customer-model'
import { addIssueAnInvoiceRequest } from '@requestModel/addIsussueInvoiceRequest';
import { updateIssueAnInvoiceRequest } from '@requestModel/updateIssueAnInvoiceRequest';
import { deleteIssueInvoiceRequest } from '@requestModel/deleteIssueAnInvoiceRequest';
/**`
 * Get all issueAnInvoice.
 * 
 * @returns 
 */
async function getAll() {
    try {
        return await IssueAnInvoiceModel.find({}).lean();
    } catch (error) {
        return error;
    }
}


/**
 * Add one issueAnInvoice.
 * 
 * @param issueAnInvoice 
 * @returns 
 */
async function addOne(issueAnInvoiceRequest: addIssueAnInvoiceRequest) {
    try {
        let idStaffPromise = StaffModel.findById(issueAnInvoiceRequest.idStaff);
        let idCustomerPromise = CustomerModel.findById(issueAnInvoiceRequest.idCustomer);

        let idStaff = await idStaffPromise
        let idCustomer = await idCustomerPromise;
        if(!idStaff)
        {
            throw new Error("idStaff not exits!");
        }
        if(!idCustomer)
        {
            throw new Error("idCustomer not exits!");
        }
        if (idStaff && idCustomer) {

            return await new IssueAnInvoiceModel(issueAnInvoiceRequest).save();
        }
        throw new Error("Error When save add Issue An Invoice !");

    } catch (err) {
        return err
    }
}





/**
 * Update one issue An Invoice.
 * 
 * @param issueAnInvoice:IIssueAnInvoiceUpdateRequest
 * @returns issue An Invoice Updated
 */
async function updateOne(issueAnInvoice: updateIssueAnInvoiceRequest) {
    try {
        let idStaffPromise = StaffModel.findById(issueAnInvoice.idStaff);
        let idCustomerPromise = CustomerModel.findById(issueAnInvoice.idCustomer);

        
        let idStaff = await idStaffPromise
        let idCustomer = await idCustomerPromise;
        
        if(!idStaff)
        {
            throw new Error("id Staff  not exits !");
        }
        if(!idCustomer)
        {
            throw new Error("id Customer not exits !");
        }
        if (idStaff && idCustomer) {
            let InvoiceNeedUpdate = { ...issueAnInvoice };
            delete InvoiceNeedUpdate._id;
            let result =  await IssueAnInvoiceModel.findByIdAndUpdate(issueAnInvoice._id, InvoiceNeedUpdate);
            if(result)
            {
                return {
                    issueAnInvoiceBeforeUpdate:result,
                    issueAnInvoiceAfterUpdate:issueAnInvoice
                }
            }
            throw new Error("id Staff or id Customer not exits !");
        }
        else {
            throw new Error("id Staff or id Customer not exits !");
        }
    } catch (error) {
        return error;
    }
}
/**
 * Delete a issueAnInvoice by their id.
 * 
 * @param id 
 * @returns 
 */

async function deleteOne(request: deleteIssueInvoiceRequest) {
    try {
        if (request.id) {
            let result = await IssueAnInvoiceModel.findByIdAndDelete(request.id);
            if (!result) {
                throw new Error("id issue invoice not exits !");
            }
            return result;
        }
        else {
            throw new Error("id issue invoice not exits !");
        }

    } catch (error) {
        return error;
    }
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    deleteOne
} as const;
