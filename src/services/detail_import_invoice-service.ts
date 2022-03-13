import { ImportInvoiceModel } from '@models/import_invoice-model';
import { BookModel } from '@models/book-model'
import { addDetailImportInvoiceRequest } from '@requestModel/addDetailImportInvoiceRequest';
import { updateDetailImportInvoiceRequest } from '@requestModel/updateDetailImportInvoiceRequest';
import { deleteDetailImportInvoiceRequest } from '@requestModel/deleteDetailImportInvoiceRequest';
import { DetailImportInvoice } from '@models/detail_import_invoice-model'

async function getAll() {
    try {
        return await DetailImportInvoice.find({}).lean();
    } catch (error) {
        return error;
    }
}


async function addOne(request: addDetailImportInvoiceRequest) {
    try {
        let validate = await validate_idImportInvoice_and_idBook(request.idImportInvoice,request.idBook);
        if(!validate){throw new Error("invoice exited!");}
        let result = await new DetailImportInvoice(request).save();
        if(result)
        {
            return result
        }
    }
    catch(err)
    {
        return err
    }
}


async function updateOne(request: updateDetailImportInvoiceRequest) {
    try {
        let validate = await validate_idImportInvoice_and_idBook(request.idImportInvoice,request.idBook);
        if(!validate){throw new Error("id book or id invoice exited !");}
        else {
            let invoiceNeedUpdate = {...request}
            delete invoiceNeedUpdate._id
            let result = await DetailImportInvoice.findByIdAndUpdate(request._id,invoiceNeedUpdate).lean();
            return result;
        }
    } catch (error) {
        return error;
    }
}


async function deleteOne(request: deleteDetailImportInvoiceRequest) {
    try {
        if (request.id) {
            let result = await DetailImportInvoice.findByIdAndDelete(request.id);
            if (!result?.$isDeleted) {
                throw new Error("id DetailImportInvoice not exits !");
            }
            return result;
        }
        else {
            throw new Error("id DetailImportInvoice not exits !");
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


async function validate_idImportInvoice_and_idBook(idImportInvoice: string, idBook: string): Promise<boolean> {
    let id_ImportInvoice = await ImportInvoiceModel.findById(idImportInvoice);
    let id_Book = await BookModel.findById(idBook);

    if (!id_ImportInvoice || !id_Book) {
        throw new Error("id Import Invoice or id Book exited");
    }

    let list_Invoice_width_idImportInvoice = await DetailImportInvoice.find({ idIssueAnInvoice: idImportInvoice,idBook:idBook }).lean()
    if(list_Invoice_width_idImportInvoice.length > 0)
    {
        return false
    }
    return true
}