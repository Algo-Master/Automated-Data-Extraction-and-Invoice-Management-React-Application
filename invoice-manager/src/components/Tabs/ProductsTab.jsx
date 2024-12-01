import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Quartz theme
import { useSelector, useDispatch } from "react-redux";
import { updateRecord } from "../../redux/slices/dataSlice"; // Adjust the import path as needed

const ProductsTab = () => {
  const dispatch = useDispatch();

  // Fetch product data from Redux store
  const productData = useSelector((state) =>
    state.data.map((product) => ({
      id: product.id,
      productName: product.productName,
      quantity: product.quantity,
      unitPrice: parseFloat(product.unitPrice).toFixed(2),
      tax: parseFloat(product.tax).toFixed(2),
      priceWithTax: parseFloat(product.priceWithTax).toFixed(2),
    }))
  );

  // Column definitions
  const colDefs = useMemo(
    () => [
      { field: "id", headerName: "ID", editable: false },
      { field: "productName", headerName: "Product Name", editable: true },
      { field: "quantity", headerName: "Quantity", editable: true },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        editable: true,
        valueFormatter: (params) => `$${parseFloat(params.value).toFixed(2)}`,
      },
      {
        field: "tax",
        headerName: "Tax",
        editable: true,
        valueFormatter: (params) => `$${parseFloat(params.value).toFixed(2)}`,
      },
      {
        field: "priceWithTax",
        headerName: "Price with Tax",
        editable: true,
        valueFormatter: (params) => `$${parseFloat(params.value).toFixed(2)}`,
      },
    ],
    []
  );

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
  };

  // Handle cell edits
  const onCellValueChanged = (params) => {
    const updatedField = { [params.colDef.field]: params.newValue };

    // Update Redux store
    dispatch(updateRecord({ id: params.data.id, updatedFields: updatedField }));
  };

  return (
    <div className="p-4 flex flex-col items-center" 
    style={{ width: "100%", height: "100%" }}>
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div
        className="ag-theme-quartz-dark"
        style={{ width: "100%", height: "75%" }}
      >
        <AgGridReact
          rowData={productData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default ProductsTab;
