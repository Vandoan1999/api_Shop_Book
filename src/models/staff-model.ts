import mongoose,{ Schema, model } from 'mongoose';
/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface IStaff {
    _id:string;
    name: string;
    address: string;
    gender: "female"|"male";
    dob:string;
    phone:string;
}

const schema = new Schema<IStaff>({
    _id:{
        type: String,
        validate: {
          validator: function(v:string) {
            return /^NV-\d+$/.test(v);
          },
          message: props => `${props.value} id Staff invalid!`
        },
        required: [true, 'id Staff required']
    },
    name:  { type: String, required: true },
    address:{ type: String, required: true },
    gender: { type: String,enum:["female","male"],required:true},
    dob:{ type: String, required:true},
    phone:{ type: String, required:true},
  });

export const StaffModel = model<IStaff>('Staff', schema);