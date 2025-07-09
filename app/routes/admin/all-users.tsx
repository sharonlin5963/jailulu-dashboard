import { Header, BaseTable, Loading } from "components";
import type { Column } from "components/ui/BaseTable";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/firebase/config";
import { formatFirestoreTimestamp } from "~/lib/utils";
import FaceIcon from "@mui/icons-material/Face";
import { Chip } from "@mui/material";

interface User {
  createdAt: string;
  email: string;
  id: string;
  imageUrl: string;
  name: string;
  type: string;
  uId: string;
}

const renderUserCell = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => (
  <div className="flex items-center gap-1.5">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="user"
        className="rounded-full size-8 aspect-square"
        referrerPolicy="no-referrer"
      />
    ) : (
      <FaceIcon className="text-gray-100" sx={{ fontSize: 32 }} />
    )}
    <span>{name}</span>
  </div>
);

const renderTypeCell = (type: string) => {
  const bgColor: Record<string, "default" | "success"> = {
    admin: "default",
    user: "success",
  };
  return (
    <Chip color={bgColor[type]} label={type} variant="outlined" size="small" />
  );
};

const columns: Column<User>[] = [
  {
    id: "name",
    label: "名稱",
    format: (_, row) => renderUserCell(row),
  },
  { id: "email", label: "信箱", minWidth: 200 },
  {
    id: "createdAt",
    label: "創建時間",
    minWidth: 140,
    format: (value: Timestamp) => formatFirestoreTimestamp(value),
  },
  {
    id: "type",
    label: "類型",
    align: "center",
    format: (value) => renderTypeCell(value),
  },
];

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(users);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="wrapper dashboard">
      <Header
        title="用戶管理"
        description="篩選、排序並查看詳細的使用者個人資料。"
      />

      <BaseTable columns={columns} rows={users} stickyHeader />
      <Loading open={isLoading} />
    </main>
  );
};

export default AllUsers;
