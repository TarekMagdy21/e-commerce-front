interface TablePageProps {
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const TablePage: React.FC<TablePageProps> = ({
  count,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}) => {
  const availableOptions = [5, 10, 15]; // Define available options for rows per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(count / rowsPerPage);
  const maxButtonsPage = 5;
  
  // Calculate the start and end index for the page buttons
  let startIndex = Math.max(page - Math.floor(maxButtonsPage / 2), 0);
  const endIndex = Math.min(startIndex + maxButtonsPage - 1, totalPages - 1);
  if (endIndex - startIndex + 1 < maxButtonsPage) {
    startIndex = Math.max(endIndex - maxButtonsPage + 1, 0);
  }
  return (
    <>
      <div className="flex items-center justify-center mt-5 mr-1">
        Rows Per Page:
        <div className="flex items-center justify-center gap-2 px-2 ml-4">
          {availableOptions.map((option) => (
            <button
              key={option}
              className={`hover:border-blue-400  border-2 p-2 px-3 rounded-lg ${
                rowsPerPage === option ? "border-blue-600" : ""
              }`}
              onClick={() => {
                setRowsPerPage(option);
                setPage(0);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-6">
        <div className="flex items-center justify-center ">
          <button
            onClick={() => {
              setPage(0);
            }}
            disabled={page === 0}
            className="p-2 mr-1 border-2 border-blue-400 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:border-gray-300"
          >
            First
          </button>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage(page - 1);
            }}
            className="p-2 border-2 border-blue-400 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:border-gray-300"
          >
            Prev
          </button>
          {Array.from({ length: endIndex - startIndex + 1 }).map((_, index) => (
            <div
              key={startIndex + index + 1}
              className={`
            mx-1 border-2 p-2 px-4 rounded-lg cursor-pointer hover:border-blue-400 ${
              page + 1 === startIndex + index + 1 ? "border-blue-500" : ""
            }`}
              onClick={() => {
                setPage(startIndex + index);
              }}
            >
              {startIndex + index + 1}
            </div>
          ))}
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === totalPages - 1}
            className="p-2 px-4 border-2 border-blue-400 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:border-gray-300"
          >
            Next
          </button>
          <button
            onClick={() => {
              setPage(totalPages - 1);
            }}
            disabled={page === totalPages - 1}
            className="p-2 ml-2 border-2 border-blue-400 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:border-gray-300"
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default TablePage;
{
  /* <TablePagination
        className={`w-full justify-center flex `}
        component="div"
        count={count || 1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      /> */
}
