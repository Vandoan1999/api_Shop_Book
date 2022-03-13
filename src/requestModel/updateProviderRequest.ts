import { IProvider } from "@models/provider-model";
import mongoose from "mongoose";
export interface updateProviderRequest extends Omit<IProvider,'_id'>
{
    _id?: mongoose.Types.ObjectId
}