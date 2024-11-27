import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";

const InvoicesTab = () => {
  // Fetch invoice data from Redux store
  const invoiceData = useSelector((state) =>
    state.data.map((invoice) => ({
      customer: invoice.customerName,
      product: invoice.productName,
      qty: invoice.quantity,
      tax: `$${invoice.tax.toFixed(2)}`,
      total: `$${invoice.totalAmount.toFixed(2)}`,
      date: invoice.date,
    }))
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
      <div className="w-[90%] lg:w-[80%] overflow-x-auto">
        <Table className="w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceData.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.product}</TableCell>
                <TableCell className="text-center">{invoice.qty}</TableCell>
                <TableCell className="text-right">{invoice.tax}</TableCell>
                <TableCell className="text-right">{invoice.total}</TableCell>
                <TableCell>{invoice.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesTab;
