import {IStaff} from '@models/staff-model'
import mongoose from 'mongoose'
export interface updateStaffRequest extends Omit<IStaff,'_id'>
{
    _id?: mongoose.Types.ObjectId
}