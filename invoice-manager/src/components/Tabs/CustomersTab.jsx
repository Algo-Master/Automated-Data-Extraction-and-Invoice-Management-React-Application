import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  
  const CustomersTab = () => {
    const customerData = [
      {
        name: "John Doe",
        phone: "123-456-7890",
        totalPurchase: "$1050.00",
      },
      {
        name: "Jane Smith",
        phone: "987-654-3210",
        totalPurchase: "$530.00",
      },
    ];
  
    return (
      <div className="flex justify-center p-4">
        <Table className="w-full">
          <TableCaption>A list of your customers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Total Purchase Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerData.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.totalPurchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default CustomersTab;  