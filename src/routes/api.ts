import { Router } from 'express';
import userRouter from './user-router';
import bookRouter from './book-router';
import staffRouter from './staff-router';
import providerRouter from './provider-router';
import customerRouter from './customer-router'
import issue_An_Invoice_Router from './issue_an_invoice-router';
import import_An_Invoice_Router from './import_invoice-router'
import detail_Issue_An_Invoice_Router from './detail_issue_an_invoice-router'
import detail_Import_Invoice_Router from './detail_import_invoice-router' 
// Export the base-router
const baseRouter = Router();
/*
    issue: phát hành bán ra
    invoice: Hóa Đơn
*/
// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/books', bookRouter);
baseRouter.use('/staffs', staffRouter);
baseRouter.use('/providers', providerRouter);
baseRouter.use('/customers', customerRouter);
baseRouter.use('/issue_an_invoices', issue_An_Invoice_Router);
baseRouter.use('/import_invoices', import_An_Invoice_Router);
baseRouter.use('/detail_issue_an_invoices', detail_Issue_An_Invoice_Router);
baseRouter.use('/detail_import_invoices', detail_Import_Invoice_Router);



// Export default.
export default baseRouter;
