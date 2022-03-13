import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { IIssueAnInvoice } from '../models/issue_an_invoice-model'
import detail_issue_an_invoice_Service from '@services/detail_issue_an_invoice-service';
import { addDetailIssueAnInvoiceRequest } from '@requestModel/addDetailIssueAnInvoiceRequest';
import { updateDetailIssueAnInvoiceRequest } from '@requestModel/updateDetailIssueAnInvoiceRequest';
import { deleteDetailIssueAnInvoiceRequest } from '@requestModel/deleteDetailIssueAnInvoiceRequest';

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
 * Get all DetailIssueAnInvoice.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const detailIssueAnInvoices = await detail_issue_an_invoice_Service.getAll();
        return res.status(OK).json({ detailIssueAnInvoices });
    } catch (err) {
        return res.status(500).json(err)
    }
});


router.post(p.add, async (req: Request<null, null, addDetailIssueAnInvoiceRequest>, res: Response) => {
    try {
        const detailIssueAnInvoice: addDetailIssueAnInvoiceRequest = {
            idIssueAnInvoice: req.body.idIssueAnInvoice,
            idBook:req.body.idBook ,
            amount: Number(req.body.amount)
        }

        const detailIssueAnInvoiceCreated = await detail_issue_an_invoice_Service.addOne(detailIssueAnInvoice)
        if (detailIssueAnInvoiceCreated.errors || detailIssueAnInvoiceCreated.message) {
            return res.status(404).json({ error: detailIssueAnInvoiceCreated.errors || detailIssueAnInvoiceCreated.message });
        }
        return res.status(CREATED).json({ detailIssueAnInvoiceCreated: detailIssueAnInvoiceCreated });
    } catch (error) {
        return res.status(500).json(error)
    }
});





/**
 * Update one detailIssueAnInvoice.
 */


router.put(p.update, async (req: Request<null, null, updateDetailIssueAnInvoiceRequest>, res: Response) => {
    try {
        const detailIssueAnInvoice: updateDetailIssueAnInvoiceRequest = {
            _id:req.body._id, 
            idIssueAnInvoice: req.body.idIssueAnInvoice,
            idBook:req.body.idBook ,
            amount: Number(req.body.amount)
        }

        const detailIssueAnInvoiceAfter = await detail_issue_an_invoice_Service.updateOne(detailIssueAnInvoice);
        if (detailIssueAnInvoiceAfter.message || detailIssueAnInvoiceAfter.error) {
            return res.status(404).json({ result: detailIssueAnInvoiceAfter.message || detailIssueAnInvoiceAfter.error});
        }
        return res.status(OK).json({ result: detailIssueAnInvoiceAfter });
    } catch (error) {
        return res.status(500).json(error)
    }
});


/**
 * Delete one detailIssueAnInvoice.
 */
router.delete(p.delete, async (req: Request<deleteDetailIssueAnInvoiceRequest, null, null>, res: Response) => {
    try {
        const detailIssueAnInvoiceDeleted = await detail_issue_an_invoice_Service.deleteOne(req.params);
        if (detailIssueAnInvoiceDeleted.message || detailIssueAnInvoiceDeleted.error) {
            return res.status(404).json({ error: detailIssueAnInvoiceDeleted.message || detailIssueAnInvoiceDeleted.error });
        }
        return res.status(OK).json({ detailIssueAnInvoiceDeleted: detailIssueAnInvoiceDeleted });
    } catch (error) {
        return res.status(500).json(error)
    }
});


// Export default
export default router;


