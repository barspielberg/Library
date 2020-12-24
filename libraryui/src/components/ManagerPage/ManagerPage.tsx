import React, { CSSProperties, useState } from "react";
import DataTable from "./DataTable/DataTable";
import EditBook from "./EditBook/EditBook";
import Book from "../../models/Book";

const ManagerPage: React.FC = () => {
  const [selected, select] = useState<Book>(new Book());
  return (
    <div style={styles}>
      <DataTable select={select} />
      <EditBook selected={selected} select={select} />
    </div>
  );
};

export default ManagerPage;

const styles: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  marginTop: "1rem",
};
