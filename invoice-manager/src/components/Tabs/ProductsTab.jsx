import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  
  const ProductsTab = () => {
    const productData = [
      {
        name: "Laptop",
        quantity: 1,
        unitPrice: "$1000.00",
        tax: "$50.00",
        priceWithTax: "$1050.00",
      },
      {
        name: "Phone",
        quantity: 2,
        unitPrice: "$250.00",
        tax: "$30.00",
        priceWithTax: "$530.00",
      },
    ];
  
    return (
      <div className="flex justify-center p-4">
        <Table className="w-full">
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Price with Tax</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>{product.tax}</TableCell>
                <TableCell>{product.priceWithTax}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ProductsTab;  