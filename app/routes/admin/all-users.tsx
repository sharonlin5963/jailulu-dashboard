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
  level: number;
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

interface MemberLevel {
  label: string;
  color: "default" | "success";
}
const renderLevelCell = (level: string) => {
  const memberLevelMap: Record<string, MemberLevel> = {
    1: {
      label: "一般會員",
      color: "default",
    },
    2: {
      label: "VIP會員",
      color: "success",
    },
  };

  const memberLevel = memberLevelMap[level];
  return (
    <Chip
      color={memberLevel.color}
      label={memberLevel.label}
      variant="outlined"
      size="small"
    />
  );
};

const columns: Column<User>[] = [
  {
    id: "name",
    label: "名稱",
    format: (_, row) => renderUserCell(row),
    minWidth: 160,
  },
  { id: "email", label: "信箱", minWidth: 200 },
  {
    id: "createdAt",
    label: "創建時間",
    minWidth: 140,
    format: (value: Timestamp) => formatFirestoreTimestamp(value),
  },
  {
    id: "level",
    label: "類型",
    align: "center",
    format: (value) => renderLevelCell(value),
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
        title="會員管理"
        description="篩選、排序並查看詳細的會員個人資料。"
      />

      <BaseTable columns={columns} rows={users} stickyHeader />
      <Loading open={isLoading} />
    </main>
  );
};

export default AllUsers;
