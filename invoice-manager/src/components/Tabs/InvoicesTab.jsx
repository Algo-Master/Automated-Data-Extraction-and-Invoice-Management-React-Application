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
  const invoiceData = useSelector((state) => state.uploadedData.invoices);

  return (
    <div className="flex justify-center p-4">
      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
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
              <TableCell className="font-medium">{invoice.serial}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>{invoice.product}</TableCell>
              <TableCell>{invoice.qty}</TableCell>
              <TableCell>{invoice.tax}</TableCell>
              <TableCell>{invoice.total}</TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoicesTab;
