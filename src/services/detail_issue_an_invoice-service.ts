import { IssueAnInvoiceModel } from '@models/issue_an_invoice-model';
import { BookModel } from '@models/book-model'
import { addDetailIssueAnInvoiceRequest } from '@requestModel/addDetailIssueAnInvoiceRequest';
import { updateDetailIssueAnInvoiceRequest } from '@requestModel/updateDetailIssueAnInvoiceRequest';
import { deleteDetailIssueAnInvoiceRequest } from '@requestModel/deleteDetailIssueAnInvoiceRequest';
import { DetailIssueAnInvoiceModel } from '@models/detail_issue_an_invoice-model'
/**`
 * Get all Detail Issue An Invoice Model.
 * 
 * @returns 
 */
async function getAll() {
    try {
        return await DetailIssueAnInvoiceModel.find({}).lean();
    } catch (error) {
        return error;
    }
}


async function validateDetailIssueAnInvoice(idIssueAnInvoice: string, idBook: string) {
    let idIssueAnInvoicePromise = IssueAnInvoiceModel.findById(idIssueAnInvoice)
    let idBookPromise = BookModel.findById(idBook)

    let idIssueAnInvoiceExited = await idIssueAnInvoicePromise.lean()
    let idBookExited = await idBookPromise.lean()
    //kiểm tra ID HDX và ID BOOK có tồn tại không

    if (!idIssueAnInvoiceExited || !idBookExited) {
        throw new Error("idIssueAnInvoice or idBook exited");
    }

    let IssueAnInvoiceInDetailIssueAnInvoice = await DetailIssueAnInvoiceModel.find({ idIssueAnInvoice: idIssueAnInvoice, idBook: idBook }).lean();
    if (IssueAnInvoiceInDetailIssueAnInvoice.length > 0) {
        return false
    }
    return true
}

/**
 * Add one Detail Issue An Invoice Model.
 * @param request
 * @returns
 */
async function addOne(request: addDetailIssueAnInvoiceRequest) {
    try {
        let validated = await validateDetailIssueAnInvoice(request.idIssueAnInvoice, request.idBook);
        if (validated) {
            let DetailIssueAnInvoice = await new DetailIssueAnInvoiceModel(request).save();
            return DetailIssueAnInvoice
        }
        throw new Error("Detail Issue An Invoice exited");

    } catch (err) {
        return err
    }
}





/**
 * Update one issue An Invoice.
 * 
 * @param request
 * @returns issue An Invoice Updated
 */
async function updateOne(request: updateDetailIssueAnInvoiceRequest) {
    try {
        let validated = await validateDetailIssueAnInvoice(request.idIssueAnInvoice, request.idBook);
        if (validated) {
            let invoice = { ...request }
            delete invoice._id
            let result = await DetailIssueAnInvoiceModel.findByIdAndUpdate(request._id, invoice).lean()
            if (result) {
                return {
                    DetailIssueAnInvoiceBeforeUpdate: result,
                    DetailIssueAnInvoiceAfterUpdate: request
                }
            }
        }
        throw new Error("idBook or id idIssueAnInvoice not exitd!");
    } catch (error) {
        return error;
    }
}
/**
 * Delete a issueAnInvoice by their id.
 * 
 * @param request 
 * @returns 
 */

async function deleteOne(request: deleteDetailIssueAnInvoiceRequest) {
    try {
        if (request.id) {
            let result = await DetailIssueAnInvoiceModel.findByIdAndDelete(request.id).lean()
            if (!result) {
                throw new Error("id DetailIssueAnInvoiceModel not exits !");
            }
            return result;
        }
        else {
            throw new Error("id DetailIssueAnInvoiceModel not exits !");
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
