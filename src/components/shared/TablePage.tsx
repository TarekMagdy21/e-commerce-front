import React from "react";
import { TablePagination } from "@mui/material";

interface TablePageProps {
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const TablePage: React.FC<TablePageProps> = ({ count, page, rowsPerPage, setPage, setRowsPerPage }) => {
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event)

    setPage(newPage);
  };

  return (
    <TablePagination
      className={`w-full justify-center flex `}
      component="div"
      count={count || 1}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

export default TablePage;
