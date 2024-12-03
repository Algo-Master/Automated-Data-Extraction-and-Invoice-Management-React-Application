import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Quartz theme
import { useSelector, useDispatch } from "react-redux";
import { updateRecord } from "../../redux/slices/dataSlice"; // Adjust the import path as needed

const InvoicesTab = () => {
  const dispatch = useDispatch();

  // Fetch invoice data from Redux store
  const invoiceData = useSelector((state) =>
    state.data.map((invoice) => ({
      id: invoice.id,
      customerName: invoice.customerName,
      productName: invoice.productName,
      quantity: invoice.quantity,
      tax: parseFloat(invoice.tax).toFixed(2),
      totalAmount: parseFloat(invoice.totalAmount).toFixed(2),
      date: invoice.date,
    }))
  );

  // Column definitions
  const colDefs = useMemo(
    () => [
      { field: "id", headerName: "ID", editable: false },
      { field: "customerName", headerName: "Customer Name", editable: true, flex: 2 },
      { field: "productName", headerName: "Product Name", editable: true, flex: 2 },
      { field: "quantity", headerName: "Quantity", editable: true },
      {
        field: "tax",
        headerName: "Tax",
        editable: true,
        valueFormatter: (params) => `$${parseFloat(params.value).toFixed(2)}`,
      },
      {
        field: "totalAmount",
        headerName: "Total Amount",
        editable: true,
        flex: 2,
        valueFormatter: (params) => `$${parseFloat(params.value).toFixed(2)}`,
      },
      { field: "date", headerName: "Date", editable: true },
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
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
      <div
        className="ag-theme-quartz-dark"
        style={{ width: "100%", height: "75%" }}
      >
        <AgGridReact
          rowData={invoiceData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default InvoicesTab;
