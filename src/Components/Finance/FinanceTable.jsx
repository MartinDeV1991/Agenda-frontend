
import React, { useState, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { postFinanceAPI } from "../../Util/fetch";

const FinanceTable = ({ data, setFetchedData }) => {

    const defaultColDef = useMemo(
        () => ({
            filter: true,
            editable: true,
        }),
        []
    );

    const colDefs = useMemo(() => {
        if (data.length === 0) return [];

        const numberWithCommas = (value) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        return [
            { field: "_id", editable: false, width: 70 },
            { field: "date", headerName: "Date", width: 150, sort: 'desc' },
            {
                field: "total",
                headerName: "Total",
                width: 150,
                editable: false,
                valueFormatter: params => numberWithCommas(params.value.toFixed(2)),
            },
            ...Object.keys(data[0])
                .filter(key => key.startsWith("account"))
                .map(key => ({
                    field: key,
                    headerName: key.substring(8),
                    width: 150,
                    valueFormatter: params => params.value ? numberWithCommas(params.value.toFixed(2)) : "",
                })),


        ];
    }, [data]);

    const handleRowEditingStopped = (event) => {
        const editedRow = event.data;
        const numericalColumns = Object.keys(editedRow).filter(key => key.substring(0, 7) === 'account');
        editedRow.total = numericalColumns.reduce((sum, column) => sum + parseFloat(editedRow[column]), 0);

        postFinanceAPI(editedRow, setFetchedData);
    }

    return (
        <div>
            Finance Table
            <div className={"ag-theme-quartz"} style={{ height: '500px', width: '1800px', margin: '30px' }}>
                <AgGridReact
                    rowData={data}
                    defaultColDef={defaultColDef}
                    columnDefs={colDefs}
                    rowSelection="multiple"
                    editType="fullRow"
                    onRowEditingStopped={handleRowEditingStopped}
                    order="desc"
                />
            </div>
        </div >
    )
}

export default FinanceTable;