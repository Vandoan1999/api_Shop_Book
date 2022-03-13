import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { IIssueAnInvoice } from '../models/issue_an_invoice-model'
import detail_import_invoice_service from '@services/detail_import_invoice-service';
import { addDetailImportInvoiceRequest } from '@requestModel/addDetailImportInvoiceRequest';
import { updateDetailImportInvoiceRequest } from '@requestModel/updateDetailImportInvoiceRequest';
import { deleteDetailImportInvoiceRequest } from '@requestModel/deleteDetailImportInvoiceRequest';

const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;


router.get(p.get, async (_: Request, res: Response) => {
    try {
        const importInvoices = await detail_import_invoice_service.getAll();
        return res.status(OK).json({ importInvoices });
    } catch (err) {
        return res.status(500).json(err)
    }
});


router.post(p.add, async (req: Request<null, null, addDetailImportInvoiceRequest>, res: Response) => {
    try {
        const importInvoice: addDetailImportInvoiceRequest = {
            idImportInvoice: req.body.idImportInvoice,
            idBook:req.body.idBook ,
            amount: Number(req.body.amount)
        }

        const importInvoiceCreated = await detail_import_invoice_service.addOne(importInvoice)
        if (importInvoiceCreated.errors || importInvoiceCreated.message) {
            return res.status(404).json({ error: importInvoiceCreated.errors || importInvoiceCreated.message });
        }
        return res.status(CREATED).json({ importInvoiceCreated: importInvoiceCreated });
    } catch (error) {
        return res.status(500).json(error)
    }
});





/**
 * Update one importInvoice.
 */


router.put(p.update, async (req: Request<null, null, updateDetailImportInvoiceRequest>, res: Response) => {
    try {
        const importInvoice: updateDetailImportInvoiceRequest = {
            _id: req.body._id,
            idImportInvoice: req.body.idImportInvoice,
            idBook: req.body.idBook,
            amount: Number(req.body.amount)
        }

        const importInvoiceAfter = await detail_import_invoice_service.updateOne(importInvoice);
        if (importInvoiceAfter.message || importInvoiceAfter.error) {
            return res.status(404).json({ result: importInvoiceAfter.message || importInvoiceAfter.error});
        }
        return res.status(OK).json({ result: importInvoiceAfter });
    } catch (error) {
        return res.status(500).json(error)
    }
});


/**
 * Delete one importInvoice.
 */
 router.put(p.delete, async (req: Request<deleteDetailImportInvoiceRequest>, res: Response) => {
    try {
        const importInvoiceDeleted = await detail_import_invoice_service.deleteOne(req.params);
        if (importInvoiceDeleted.message || importInvoiceDeleted.error) {
            return res.status(404).json({ error: importInvoiceDeleted.message || importInvoiceDeleted.error });
        }
        return res.status(OK).json({ importInvoiceDeleted: importInvoiceDeleted });
    
    } catch (error) {
        return res.status(500).json(error)
    }
})


// Export default
export default router;


