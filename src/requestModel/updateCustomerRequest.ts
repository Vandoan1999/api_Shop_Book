import {ICustomer} from '@models/customer-model'
import mongoose from 'mongoose'
export interface updateCustomerRequest extends Omit<ICustomer,'_id'>
{
    _id?: mongoose.Types.ObjectId
}