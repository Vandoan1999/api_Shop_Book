import mongoose,{ Schema, model } from 'mongoose';
/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface IProvider {
    _id:string;
    name: string;
    address: string;
    phone:string;
}

const schema = new Schema<IProvider>({
    _id:{
        type: String,
        validate: {
          validator: function(v:string) {
            return /^NCC-\d+$/.test(v);
          },
          message: props => `${props.value} id Provider invalid!`
        },
        required: [true, 'id Provider required']
    },
    name:  { type: String, required: true },
    address:{ type: String, required: true },
    phone:{ type: String, required:true},
  });

export const ProviderModel = model<IProvider>('Provider', schema);