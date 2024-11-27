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

const ProductsTab = () => {
  // Fetch product data from Redux store
  const productData = useSelector((state) =>
    state.data.map((product) => ({
      name: product.productName,
      quantity: product.quantity,
      unitPrice: `$${product.unitPrice.toFixed(2)}`,
      tax: `$${product.tax.toFixed(2)}`,
      priceWithTax: `$${product.priceWithTax.toFixed(2)}`,
    }))
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="w-[90%] lg:w-[80%] overflow-x-auto">
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
                <TableCell className="text-center">{product.quantity}</TableCell>
                <TableCell className="text-right">{product.unitPrice}</TableCell>
                <TableCell className="text-right">{product.tax}</TableCell>
                <TableCell className="text-right">{product.priceWithTax}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTab;
