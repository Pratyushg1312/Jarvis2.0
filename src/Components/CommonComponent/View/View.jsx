import React from "react";
import CustomTable from "../CustomTable/CustomTable";
import CustomTableWrapper from "./CustomTableWrapper";

//c
const View = ({
  data,
  columns,
  isLoading,
  title,
  rowSelectable = false,
  pagination = false,
  tableName,
  selectedData,
  showTotal = false,
  addHtml,
  exportData,
}) => {
  return (
    <CustomTableWrapper title={title} addHtml={addHtml}>
      <CustomTable
        fixedHeader
        columns={columns}
        data={data}
        dataLoading={isLoading}
        Pagination={pagination}
        rowSelectable={rowSelectable}
        tableName={tableName}
        selectedData={selectedData}
        showTotal={showTotal}
        exportData={exportData}
      />
    </CustomTableWrapper>
  );
};

export default View;
