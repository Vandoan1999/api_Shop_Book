//Hóa Đơn Xuất
import mongoose, { Schema, model } from 'mongoose';

/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface IIssueAnInvoice {
   _id:string;
   idStaff: string;
   idCustomer:string;
   dateSell: string;
   totalMoney:number;
}
const schema = new Schema<IIssueAnInvoice>({
  _id:{
    type: String,
    validate: {
      validator: function(v:string) {
        return /^HDX-\d+$/.test(v);
      },
      message: props => `${props.value} id Issue An Invoice invalid!`
    },
    required: [true, 'id Issue An Invoice required']
},
    idStaff:{type:String,ref:"Staff",required:true},
    idCustomer:{type:String,ref:"Customer",required:true},
    dateSell:{type:String,default:Date.now().toString(),required:true},
    totalMoney:{type:Number,default:0,required:true}
  });

export const IssueAnInvoiceModel = model<IIssueAnInvoice>('IssueAnInvoice', schema);