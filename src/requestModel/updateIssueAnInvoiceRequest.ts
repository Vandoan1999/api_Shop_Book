import {IIssueAnInvoice} from '@models/issue_an_invoice-model'
import mongoose from 'mongoose'
export interface updateIssueAnInvoiceRequest extends Omit<IIssueAnInvoice,'_id'>
{
    _id?: mongoose.Types.ObjectId
}