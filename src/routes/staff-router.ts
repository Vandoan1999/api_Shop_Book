import StatusCodes from 'http-status-codes';
import { request, Request, Response, Router } from 'express';
import staffService from '@services/staff-service';
import {addStaffRequest} from '@requestModel/addStaffRequest'
import {updateStaffRequest} from '@requestModel/updateStaffRequest'
import {deleteStaffRequest} from '@requestModel/deleteStaffRequest'
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
 * Get all staff.
 */
 router.get(p.get, async (_: Request, res: Response) => {
    try {
        const staff = await staffService.getAll();
        return res.status(OK).json({staff});
    } catch (error) {
        return res.status(500)
    }
});


/**
 * Add one staff.
 */
router.post(p.add, async (req: Request<null,null,addStaffRequest>, res: Response) => {
    try {
        const staff:addStaffRequest  = {
            _id:req.body._id,
            name: req.body.name,
            address: req.body.address,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone
        }
        const staffCreated = await staffService.addOne(staff);
        
        return res.status(CREATED).json({staffCreated:staffCreated});
    } catch (error) {
        return res.status(500).json(error)
    }
});


/**
 * Update one staff.
 */


router.put(p.update, async (req: Request<null,null,updateStaffRequest>, res: Response) => {
    try {
       
        const result = await staffService.updateOne(req.body);
        return res.status(OK).json({result});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


/**
 * Delete one staff.
 */
router.delete(p.delete, async (req: Request<deleteStaffRequest,null,null>, res: Response) => {
    try {
        const staffDeleted =  await staffService.deleteOne(req.params);
        return res.status(OK).json({staffDeleted:staffDeleted});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


// Export default
export default router;


