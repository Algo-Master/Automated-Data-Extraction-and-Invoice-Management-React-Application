import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Quartz theme
import { useSelector, useDispatch } from "react-redux";
import { updateRecord } from "../../redux/slices/dataSlice"; // Adjust the import path as needed

const CustomersTab = () => {
  const dispatch = useDispatch();

  // Fetch customer data from Redux store
  const customerData = useSelector((state) =>
    state.data.map((customer) => ({
      id: customer.id, // Unique identifier
      customerName: customer.customerName,
      phoneNumber: customer.phoneNumber,
      totalAmount: parseFloat(customer.totalAmount).toFixed(2), // Format as needed
    }))
  );

  // Column definitions
  const colDefs = useMemo(
    () => [
      { field: "id", headerName: "ID", editable: false }, // Display the unique ID
      { field: "customerName", headerName: "Customer Name", editable: true },
      { field: "phoneNumber", headerName: "Phone Number", editable: true },
      {
        field: "totalAmount",
        headerName: "Total Purchase Amount",
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
    console.log(updatedField);

    // Update Redux store
    dispatch(updateRecord({ id: params.data.id, updatedFields: updatedField }));
  };

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        rowData={customerData} // Directly use data from the Redux store
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged} // Triggered on edit
      />
    </div>
  );
};

export default CustomersTab;
