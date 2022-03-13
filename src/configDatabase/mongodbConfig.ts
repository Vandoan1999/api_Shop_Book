import { connect } from 'mongoose';


export default async function run(): Promise<void> {
  // 4. Connect to MongoDB
  try { 
      await connect('mongodb://localhost:27017/shopbook',{
        
      });
      console.log("Connect to mongodb successfully");
      return;
  }catch(err) {
        console.log("Connect to mongodb failed");
      return;
  }
}