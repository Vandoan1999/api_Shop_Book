import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { IImportInvoice } from '../models/import_invoice-model'
import Import_invoice_service from '@services/Import_invoice-service';
import { addImportInvoiceRequest } from '@requestModel/addImportInvoiceRequest';
import { updateImportInvoiceRequest } from '@requestModel/updateImportInvoiceRequest';
import { deleteImportInvoiceRequest } from '@requestModel/deleteImportInvoiceRequest';

const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;


/**
 * Get all importInvoice.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const importInvoices = await Import_invoice_service.getAll();
        return res.status(OK).json({ importInvoices });
    } catch (err) {
        return res.status(500)
    }
});


router.post(p.add, async (req: Request<null, null, addImportInvoiceRequest>, res: Response) => {
    try {
        const importInvoice: addImportInvoiceRequest = {
            _id: req.body._id,
            idStaff:req.body.idStaff,
            idProvider: req.body.idProvider,
            dateImport: req.body.dateImport,
            totalMoney: Number(req.body.totalMoney)
        }
        
        const ImportInvoiceCreated = await Import_invoice_service.addOne(importInvoice)
        if(ImportInvoiceCreated.error || ImportInvoiceCreated.message)
        {
            return res.status(404).json({ error: ImportInvoiceCreated.error || ImportInvoiceCreated.message });
        }
        return res.status(CREATED).json({ ImportInvoiceCreated: ImportInvoiceCreated });
    } catch (error) {
        return res.status(500).json(error)
    }
});





/**
 * Update one importInvoice.
 */


router.put(p.update, async (req: Request<null, null, updateImportInvoiceRequest>, res: Response) => {
    try {
        const importInvoice: updateImportInvoiceRequest = {
            _id: req.body._id,
            idStaff: req.body.idStaff,
            idProvider: req.body.idProvider,
            dateImport: req.body.dateImport,
            totalMoney: req.body.totalMoney
        }

        const importInvoiceAfter = await Import_invoice_service.updateOne(importInvoice);
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
router.delete(p.delete, async (req: Request<deleteImportInvoiceRequest, null, null>, res: Response) => {
    try {
        const importInvoiceDeleted = await Import_invoice_service.deleteOne(req.params);
        if (importInvoiceDeleted.message || importInvoiceDeleted.error) {
            return res.status(404).json({ error: importInvoiceDeleted.message || importInvoiceDeleted.error });
        }
        return res.status(OK).json({ importInvoiceDeleted: importInvoiceDeleted });
    } catch (error) {
        return res.status(500).json(error)
    }
});


// Export default
export default router;


