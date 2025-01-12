"use client";

import Pagination from "@/common/components/Pagination/Pagination";
import { TableListData } from "@/common/components/Table";
import React, { useState } from "react";

type TableColumn<R extends Record<string, string | number>> = {
  key: Extract<keyof R, string>;
  title: string;
  renderRow?: (row: R) => React.ReactNode;
};

type User = {
  id: number;
  name: string;
};

const ListUser: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Tổng số trang

  const users: User[] = [
    {
      id: 1,
      name: "user1",
    },
    {
      id: 2,
      name: "user2",
    },
  ];

  const columns: TableColumn<User>[] = [
    {
      key: "id",
      title: "ID",
      renderRow: (row) => {
        return <p>{row.id}</p>;
      },
    },
    {
      key: "name",
      title: "Name",
    },
  ];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <TableListData rows={users} columns={columns} rowKey="id" />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListUser;
