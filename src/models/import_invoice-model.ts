//Hóa Đơn Xuất
import mongoose, { Schema, model } from 'mongoose';

/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
    representative:/ reprəˈzen(t)ədiv / :Người Đại diện
*/
export interface IImportInvoice {
   _id:string;
   idStaff: string;
   idProvider:string;
   representative?:string;
   dateImport: string;
   totalMoney:number;
}
const schema = new Schema<IImportInvoice>({
  _id:{
    type: String,
    validate: {
      validator: function(v:string) {
        return /^HDN-\d+$/.test(v);
      },
      message: props => `${props.value} id Issue An Invoice invalid!`
    },
    required: [true, 'id Issue An Invoice required']
},
    idStaff:{type:String,ref:"Staff",required:true},
    idProvider:{type:String,ref:"Customer",required:true},
    representative:{type:String,required:true,default:"no representative !"},
    dateImport:{type:String,default:Date.now().toString(),required:true},
    totalMoney:{type:Number,default:0,required:true}
  });

export const ImportInvoiceModel = model<IImportInvoice>('ImportInvoice', schema);