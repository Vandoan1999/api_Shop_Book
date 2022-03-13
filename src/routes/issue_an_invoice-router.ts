import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { IIssueAnInvoice } from '../models/issue_an_invoice-model'
import issue_an_invoice_Service from '@services/issue_an_invoice-service';
import { addIssueAnInvoiceRequest } from '@requestModel/addIsussueInvoiceRequest';
import { updateIssueAnInvoiceRequest } from '@requestModel/updateIssueAnInvoiceRequest';
import { deleteIssueInvoiceRequest } from '@requestModel/deleteIssueAnInvoiceRequest';

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
 * Get all issueAnInvoice.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const issueAnInvoices = await issue_an_invoice_Service.getAll();
        return res.status(OK).json({ issueAnInvoices });
    } catch (err) {
        return res.status(500)
    }
});


router.post(p.add, async (req: Request<null, null, IIssueAnInvoice>, res: Response) => {
    try {
        const issueAnInvoice: addIssueAnInvoiceRequest = {
            _id: req.body._id,
            idStaff: req.body.idStaff,
            idCustomer: req.body.idCustomer,
            dateSell: req.body.dateSell,
            totalMoney: Number(req.body.totalMoney)
        }

        const issueAnInvoiceCreated = await issue_an_invoice_Service.addOne(issueAnInvoice)
        if (issueAnInvoiceCreated.errors || issueAnInvoiceCreated.message) {
            return res.status(404).json({ error: issueAnInvoiceCreated.errors || issueAnInvoiceCreated.message });
        }
        return res.status(CREATED).json({ issueAnInvoiceCreated: issueAnInvoiceCreated });
    } catch (error) {
        return res.status(500)
    }
});





/**
 * Update one issueAnInvoice.
 */


router.put(p.update, async (req: Request<null, null, updateIssueAnInvoiceRequest>, res: Response) => {
    try {
        const issueAnInvoice: updateIssueAnInvoiceRequest = {
            _id: req.body._id,
            idStaff: req.body.idStaff,
            idCustomer: req.body.idCustomer,
            dateSell: req.body.dateSell,
            totalMoney: Number(req.body.totalMoney)
        }

        const issueAnInvoiceAfter = await issue_an_invoice_Service.updateOne(issueAnInvoice);
        if (issueAnInvoiceAfter.message || issueAnInvoiceAfter.error) {
            return res.status(404).json({ result: issueAnInvoiceAfter.message || issueAnInvoiceAfter.error});
        }
        return res.status(OK).json({ result: issueAnInvoiceAfter });
    } catch (error) {
        return res.status(500)
    }
});


/**
 * Delete one issueAnInvoice.
 */
router.delete(p.delete, async (req: Request<deleteIssueInvoiceRequest, null, null>, res: Response) => {
    try {
        const issueAnInvoiceDeleted = await issue_an_invoice_Service.deleteOne(req.params);
        if (issueAnInvoiceDeleted.message || issueAnInvoiceDeleted.error) {
            return res.status(404).json({ error: issueAnInvoiceDeleted.message || issueAnInvoiceDeleted.error });
        }
        return res.status(OK).json({ issueAnInvoiceDeleted: issueAnInvoiceDeleted });
    } catch (error) {
        return res.status(500).json(error)
    }
});


// Export default
export default router;


