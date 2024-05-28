import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const HistoryTablePopup = ({
  HistoryColumnDefs,
  historyRowData,
  closeModal,
}) => {
  console.log("GET DATA in HistoryTablePopup", {
    HistoryColumnDefs,
    historyRowData,
    closeModal,
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-gray-500 top-4 right-4"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="mb-4 text-xl font-bold">History</p>
        <div className="w-full ag-theme-alpine min-w-[600px] h-80">
          {" "}
          {/* Adjust width here */}
          <AgGridReact
            columnDefs={HistoryColumnDefs}
            rowData={historyRowData}
            pagination={true}
            paginationPageSize={10}
            loadingOverlayComponent={"Loading"}
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Please wait while loading...</span>'
            }
          />
        </div>
        <button
          className="px-4 py-2 mt-4 bg-gray-300 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryTablePopup;
