import { IDetailImportInvoice } from "@models/detail_import_invoice-model";
import mongoose from "mongoose";

export interface updateDetailImportInvoiceRequest extends IDetailImportInvoice{
    _id?: mongoose.Types.ObjectId
}