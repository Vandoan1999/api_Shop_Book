import { IBook } from '@models/book-model';
import mongoose from 'mongoose'

export interface updateBookRequest extends Omit<IBook,'_id'> {
    _id? :mongoose.Types.ObjectId
}
 