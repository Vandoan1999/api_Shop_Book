import {IImportInvoice} from '@models/import_invoice-model'
import mongoose from 'mongoose'
export interface updateImportInvoiceRequest extends Omit<IImportInvoice,'_id'>
{
    _id?: mongoose.Types.ObjectId
}