import { IImportInvoice,ImportInvoiceModel } from '@models/import_invoice-model';
import { StaffModel } from '@models/staff-model'
import { ProviderModel } from '@models/provider-model'
import { addImportInvoiceRequest } from '@requestModel/addImportInvoiceRequest';
import { updateImportInvoiceRequest } from '@requestModel/updateImportInvoiceRequest';
import { deleteImportInvoiceRequest } from '@requestModel/deleteImportInvoiceRequest';

async function getAll() {
    try {
        return await ImportInvoiceModel.find({}).lean();
    } catch (error) {
        return error;
    }
}




const validate_idStaff_and_idProvider = async(idStaff:string,idProvider:string):Promise<boolean> => {
        let idStaffPromise = StaffModel.findById(idStaff);
        let providerPromise = ProviderModel.findById(idProvider);
        let id_Staff = await idStaffPromise
        let id_Provider = await providerPromise;
        if (!id_Staff || !id_Provider) {
            return false
        }
        return true
}


async function addOne(request: addImportInvoiceRequest):Promise<IImportInvoice | any  > {
    try {
        let validate = await validate_idStaff_and_idProvider(request.idStaff,request.idProvider)
        if(validate===true)
        {
            return await new ImportInvoiceModel(request).save();
        }
        throw new Error("id_Staff or id id_Provider not exit");
    } catch (err) {
        return err
    }
}





/**
 * Update one issue An Invoice.
 * 
 * @param request:IIssueAnInvoiceUpdateRequest
 * @returns issue An Invoice Updated
 */
async function updateOne(request: updateImportInvoiceRequest) {
    try {
        let validate = await validate_idStaff_and_idProvider(request.idStaff,request.idProvider)
        if(validate===true)
        {
            return await ImportInvoiceModel.findByIdAndUpdate(request._id);
        }
        throw new Error("id_Staff or id id_Provider not exit");
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

async function deleteOne(request: deleteImportInvoiceRequest) {
    try {
        if (request.id) {
            let result = await ImportInvoiceModel.findByIdAndDelete(request.id);
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
