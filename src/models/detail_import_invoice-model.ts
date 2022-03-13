//Hóa Đơn Xuất
import mongoose, { Schema, model } from 'mongoose';

/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface IDetailImportInvoice {
  idImportInvoice: string;
  idBook: string;
  amount: number;
}
const schema = new Schema<IDetailImportInvoice>({
  idImportInvoice:{type:String,required:true,ref:"ImportInvoice"},
  idBook:{type:String,required:true,ref:"Book"},
  amount: { type: Number, default: 0, required: true },
});

export const DetailImportInvoice = model<IDetailImportInvoice>('DetailImportInvoice', schema);