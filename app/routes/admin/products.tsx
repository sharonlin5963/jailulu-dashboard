import {
  BaseTable,
  Header,
  Loading,
  Alert,
  ProductSearchBar,
} from "components";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/firebase/config";
import type { Column } from "components/ui/BaseTable";
import { Switch } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router";

export interface Product {
  name: string;
  describe: string;
  price: number;
  isSale: boolean;
  specialPrice: number;
  group: {
    label: string;
    value: string;
  };
  createdAt: string;
  id: string;
  imageUrl: string;
  status: 0 | 1;
}
export interface AlertState {
  message: string;
  type?: "error" | "success";
}

const renderImageCell = ({ imageUrl, name }: Product) => (
  <img
    src={imageUrl}
    alt={name}
    className="rounded size-20 aspect-square m-auto"
    referrerPolicy="no-referrer"
  />
);
const renderEditCell = ({ id, status }: Product) => (
  <Link
    to={status === 1 ? "#" : `/products/${id}`}
    onClick={(e) => {
      if (status === 1) e.preventDefault();
    }}
  >
    <EditNoteIcon
      sx={{
        fontSize: 32,
        color: status === 1 ? "#ccc" : "#7f7e83",
        cursor: status === 1 ? "not-allowed" : "pointer",
      }}
    />
  </Link>
);

const products = () => {
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({ message: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    group: "",
    status: "",
    isSale: "",
  });

  const getProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(products);
      setInitialProducts(products);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusCell = ({ id, status }: Product) => {
    const handleChange = async () => {
      const newStatus = status === 1 ? 0 : 1;
      const typeMsg = status === 1 ? "下架" : "上架";
      setIsSwitching(true);
      try {
        await updateDoc(doc(db, "products", id), {
          status: newStatus,
        });
        setAlertState({ message: `商品${typeMsg}成功`, type: "success" });
        setAlertOpen(true);
        getProducts();
      } catch (error) {
        setAlertState({ message: `商品${typeMsg}失敗`, type: "error" });
        setAlertOpen(true);
      } finally {
        setIsSwitching(false);
      }
    };

    return (
      <Switch
        checked={status === 1}
        onChange={handleChange}
        disabled={isSwitching}
        color="primary"
      />
    );
  };

  const columns: Column<Product>[] = [
    {
      id: "imageUrl",
      label: "商品圖片",
      align: "center",
      format: (_, row) => renderImageCell(row),
    },
    {
      id: "name",
      label: "商品名稱",
    },
    { id: "group", label: "商品分類", format: (group) => group.label },
    {
      id: "price",
      label: "價格",
      align: "right",
    },
    {
      id: "specialPrice",
      label: "特價價格",
      align: "right",
    },
    {
      id: "status",
      label: "上架",
      align: "center",
      format: (_, row) => renderStatusCell(row),
    },
    {
      id: "edit",
      label: "編輯",
      align: "center",
      format: (_, row) => renderEditCell(row),
    },
  ];

  const filterProducts = () => {
    const newProducts = initialProducts.filter(
      ({ name, group, status, isSale }) => {
        const {
          name: queryName,
          group: queryGroup,
          status: queryStatus,
          isSale: queryIsSale,
        } = searchQuery;

        return (
          name.toLowerCase().includes(queryName.toLowerCase()) &&
          (queryGroup === "" || group?.value === queryGroup) &&
          (queryStatus === "" || status === Number(queryStatus)) &&
          (queryIsSale === "" || isSale === (queryIsSale === "true"))
        );
      }
    );
    setProducts(newProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="wrapper dashboard">
      <Header
        title="商品管理"
        description="查看商品列表並管理商品資訊，包括新增、編輯、商品上下架功能。"
        ctaText="新增商品"
        ctaUrl="/products/create"
      />
      <ProductSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={filterProducts}
      />
      <BaseTable columns={columns} rows={products} stickyHeader />
      <Loading open={loading} />

      <Alert
        open={alertOpen}
        message={alertState.message}
        severity={alertState.type}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlertOpen(false)}
      />
    </main>
  );
};

export default products;
