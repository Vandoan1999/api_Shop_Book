import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ICustomer  } from '../models/customer-model'
import customerService from '@services/customer-service';
import {addCustomerRequest} from '@requestModel/addCustomerRequest'
import {updateCustomerRequest} from '@requestModel/updateCustomerRequest'
import {deleteCustomerRequest} from '@requestModel/deleteCustomerRequest'
import mongoose from 'mongoose';
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
 * Get all customer.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const customers = await customerService.getAll();
        return res.status(OK).json({ customers });
    } catch (err) {
        return res.status(500)
    }
});


/**
 * Add one customer.
 */
router.post(p.add, async (req: Request<null,null, addCustomerRequest>, res: Response) => {
    try {
       
        const customerCreated = await customerService.addOne(req.body);
        return res.status(CREATED).json({ customerCreated: customerCreated });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


/**
 * Update one customer.
 */


router.put(p.update, async (req: Request<null,null, updateCustomerRequest>, res: Response) => {
    try {
      
        const result = await customerService.updateOne(req.body);
        return res.status(OK).json({ result: result });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


/**
 * Delete one customer.
 */
router.delete(p.delete, async (req: Request<deleteCustomerRequest, null, null>, res: Response) => {
    try {
       
        const customerDeleted = await customerService.deleteOne(req.params);
        return res.status(OK).json({ customerDeleted: customerDeleted });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


// Export default
export default router;


