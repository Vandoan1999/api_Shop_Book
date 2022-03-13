import {IDetailIssueAnInvoice} from '@models/detail_issue_an_invoice-model'
import mongoose from 'mongoose'
export interface updateDetailIssueAnInvoiceRequest extends IDetailIssueAnInvoice {
    _id?: mongoose.Types.ObjectId
    
}