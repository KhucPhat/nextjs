import { TableListData } from "@/common/components/Table";
import React from "react";

type TableColumn<R extends Record<string, string | number>> = {
  key: Extract<keyof R, string>;
  title: string;
  renderRow?: (row: R) => React.ReactNode;
};

type User = {
  id: number;
  name: string;
};
const page = () => {
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
  return (
    <div>
      <TableListData rows={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default page;
