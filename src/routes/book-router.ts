import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import bookService from '@services/book-service';
import { addBookRequest } from '@requestModel/addBookRequest'
import { updateBookRequest } from '@requestModel/updateBookRequest'
import { deleteBookRequest } from '@requestModel/deleteBookRequest'
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
 * Get all book.
 */
router.get(p.get, async (_: Request, res: Response) => {
    try {
        const books = await bookService.getAll()
        if(books)
        {
            return res.status(OK).json({ books });
        }
        else{
            throw new Error("Book empty");
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});


/**
 * Add one book.
 * Examples:
 */
router.post(p.add, async (req: Request<null, null, addBookRequest>, res: Response) => {
   try{
        const result = await bookService.addOne(req.body)
        return res.status(CREATED).json({ result: result });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});




router.put(p.update, async (req: Request<null, null, updateBookRequest>, res: Response) => {
   try {
        const result = await bookService.updateOne(req.body);
        return res.status(OK).json({ result });
    } catch (error) {
        return res.status(500)
    }
});


router.delete(p.delete, async (req: Request<deleteBookRequest, null, null>, res: Response) => {
    try {
        const result = await bookService.deleteOne(req.params);
    
        return res.status(OK).json({BookDeleted: result });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


// Export default
export default router;


