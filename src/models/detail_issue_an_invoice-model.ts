//Hóa Đơn Xuất
import mongoose, { Schema, model } from 'mongoose';
/*
    issue: phát hành ,bán ra
    invoice: Hóa Đơn
*/

export interface IDetailIssueAnInvoice {
  idIssueAnInvoice:string;
  idBook:string;
  amount: number;
}
const schema = new Schema<IDetailIssueAnInvoice>({
  idIssueAnInvoice:{type:String,ref:"IssueAnInvoice",required:true},
  idBook:{type:String,ref:"Book",required:true},
  amount: { type: Number, default: 0, required: true },
});

export const DetailIssueAnInvoiceModel = model<IDetailIssueAnInvoice>('DetailIssueAnInvoice', schema);