import mongoose,{ Schema, model } from 'mongoose';
import {IStaff} from './staff-model'
/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface ICustomer extends IStaff{

}

const schema = new Schema<ICustomer>({
  _id:{
    type: String,
    validate: {
      validator: function(v:string) {
        return /^KH-\d+$/.test(v);
      },
      message: props => `${props.value} id Customer invalid!`
    },
    required: [true, 'id Customer required']
},
    name:  { type: String, required: true },
    address:{ type: String, required: true },
    gender: { type: String,enum:["female","male"],required:true},
    dob:{ type: String, required:true},
    phone:{ type: String, required:true},
  });

export const CustomerModel = model<ICustomer>('Customer', schema);