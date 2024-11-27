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

const CustomersTab = () => {
  // Fetch customer data from Redux store
  const customerData = useSelector((state) =>
    state.data.map((customer) => ({
      name: customer.customerName,
      phone: customer.phoneNumber,
      totalPurchase: `$${customer.totalAmount.toFixed(2)}`,
    }))
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <div className="w-[90%] lg:w-[80%] overflow-x-auto">
        <Table className="w-full">
          <TableCaption>A list of your customers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Total Purchase Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerData.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="text-center">{customer.phone}</TableCell>
                <TableCell className="text-right">{customer.totalPurchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersTab;
