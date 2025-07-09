import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Group } from "../../app/routes/admin/product-edit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/config";

interface SearchQuery {
  name: string;
  group: string;
  status: string;
  isSale: string;
}
interface ProductSearchBarProps {
  searchQuery: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  onSearch: () => void;
}

const ProductSearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: ProductSearchBarProps) => {
  const [groupOptions, setGroupOptions] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const resetSearchQuery = () => {
    setSearchQuery({
      name: "",
      group: "",
      status: "",
      isSale: "",
    });
    onSearch();
  };

  const getGroupOptions = async () => {
    setLoading(true);
    try {
      const groupSnapshot = await getDocs(collection(db, "groups"));
      const groupData = groupSnapshot.docs.map((doc) => doc.data()) as Group[];
      setGroupOptions(groupData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroupOptions();
  }, []);

  return (
    <Box className="flex flex-wrap gap-4 items-center">
      <TextField
        label="商品名稱"
        variant="outlined"
        value={searchQuery.name}
        onChange={(e) =>
          setSearchQuery({ ...searchQuery, name: e.target.value })
        }
      />

      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="group-select-label">商品分類</InputLabel>
        <Select
          labelId="group-select-label"
          value={searchQuery.group}
          label="商品分類"
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, group: e.target.value })
          }
        >
          <MenuItem value="">全部</MenuItem>
          {groupOptions.map((group) => (
            <MenuItem key={group.value} value={group.value}>
              {group.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="status-select-label">上下架</InputLabel>
        <Select
          labelId="status-select-label"
          value={searchQuery.status}
          label="上下架"
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, status: e.target.value })
          }
        >
          <MenuItem value="">全部</MenuItem>
          <MenuItem value="1">上架</MenuItem>
          <MenuItem value="0">下架</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="sale-select-label">商品價格</InputLabel>
        <Select
          labelId="sale-select-label"
          value={searchQuery.isSale}
          label="商品價格"
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, isSale: e.target.value })
          }
        >
          <MenuItem value="">全部</MenuItem>
          <MenuItem value="true">特價</MenuItem>
          <MenuItem value="false">原價</MenuItem>
        </Select>
      </FormControl>

      <Button disabled={loading} variant="contained" onClick={onSearch}>
        搜尋
      </Button>
      <Button disabled={loading} variant="outlined" onClick={resetSearchQuery}>
        清空
      </Button>
    </Box>
  );
};

export default ProductSearchBar;
