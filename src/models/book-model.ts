import mongoose, { Schema, model } from 'mongoose';
/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
export interface IBook {
    _id:string;
    name: string;
    publicer: string;
    yearPublic: string;
    price: number;
    author:string;
    amount: number;
    images: string;
}

const schema = new Schema<IBook>({
    _id:{
        type: String,
        validate: {
          validator: function(v:string) {
            return /^S-\d+$/.test(v);
          },
          message: props => `${props.value} id book invalid phone number!`
        },
        required: [true, 'id book required']
    },
    name:  { type: String, required: true },
    publicer:{ type: String, required: true },
    yearPublic: { type: String, required: true, default: Date.now().toLocaleString.toString()},
    price: { type: Number, required: true,default:0.0 },
    author:{ type: String, required: true },
    amount:  { type: Number, required: true,default:0 },
    images:  { type: String,default:"none",required:true },
  });
  schema.pre("remove",(next)=>{
    console.log("book removed");
    return next();
  })
export const BookModel = model<IBook>('Book', schema);