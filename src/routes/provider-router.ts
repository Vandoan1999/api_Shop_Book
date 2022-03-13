import StatusCodes from 'http-status-codes';
import { request, Request, Response, Router } from 'express';
import { IProvider } from '../models/provider-model'
import providerService from '@services/provider-service';
import { addProviderRequest } from '@requestModel/addProvierRequest';
import { updateProviderRequest } from '@requestModel/updateProviderRequest';
import { deleteProviderRequest } from '@requestModel/deleteProviderRequest';
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
 * Get all provider.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const provider = await providerService.getAll();
        return res.status(OK).json({ provider });
    } catch (error) {
        return res.status(500).jsonp(error)
    }
});


/**
 * Add one provider.
 */
router.post(p.add, async (req: Request<null,null, addProviderRequest>, res: Response) => {
    try {
        const providerCreated = await providerService.addOne(req.body);
        res.status(CREATED).json({ providerCreated: providerCreated });
    } catch (error) {
        return res.status(500).json(error)
    }
});


/**
 * Update one provider.
 */


router.put(p.update, async (req: Request<null,null, updateProviderRequest>, res: Response) => {
    try {
        
        const result = await providerService.updateOne(req.body);
        res.status(OK).json({ result });
    } catch (error) {
        return res.status(500).jsonp({error:error.message})
    }
});


/**
 * Delete one provider.
 */
router.delete(p.delete, async (req: Request<deleteProviderRequest, null, null>, res: Response) => {
    try {
        const providerDeleted = await providerService.deleteOne(req.params);
        return res.status(OK).json({ providerDeleted: providerDeleted });
    } catch (error) {
        return res.status(500).jsonp({error:error.message})
    }
});


// Export default
export default router;


