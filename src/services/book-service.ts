import { IBook, BookModel } from '@models/book-model';
import { addBookRequest } from '@requestModel/addBookRequest'
import { updateBookRequest } from '@requestModel/updateBookRequest'
import { deleteBookRequest } from '@requestModel/deleteBookRequest'
import { request } from 'express';
/**`
 * Get all book.
 * 
 * @returns 
 */
async function getAll() {
    return await BookModel.find({}).lean();
}
async function addOne(bookRequest: addBookRequest) {
    const book: addBookRequest = {
        _id: bookRequest._id,
        name: bookRequest.name,
        publicer: bookRequest.publicer,
        yearPublic: bookRequest.yearPublic,
        price: Number(bookRequest.price),
        author: bookRequest.author,
        amount: Number(bookRequest.amount),
        images: bookRequest.images
    }
    let result = await new BookModel(book).save();
    if (result.isNew) return result
    throw new Error("duplicate id book");

}


async function updateOne(bookRequest: updateBookRequest) {
    const book: updateBookRequest = {
        _id: bookRequest._id,
        name: bookRequest.name,
        publicer: bookRequest.publicer,
        yearPublic: bookRequest.yearPublic,
        price: Number(bookRequest.price),
        author: bookRequest.author,
        amount: Number(bookRequest.amount),
        images: bookRequest.images
    }
    let bookNeedUpdate = { ...book }
    delete bookNeedUpdate._id;
    let bookBeforeUpdated = await BookModel.findByIdAndUpdate(book._id, bookNeedUpdate);
    if (bookBeforeUpdated?.isModified) {
        return {
            bookBeforeUpdated,
            afterUpdated: book
        }
    }
    throw new Error("id book not exited");


}


async function deleteOne(request: deleteBookRequest) {
        if (request.id) {
            let result = await BookModel.findByIdAndDelete(request.id);
            if (!result) {
                throw new Error("_id not exits!");
            }
            return result
        }
        throw new Error("_id empty!");
}



// Export default
export default {
    getAll,
    addOne,
    updateOne,
    deleteOne
} as const;
