import type { Column } from "components/ui/BaseTable";
import BaseTable from "components/ui/BaseTable";

interface SellingProduct {
  id: number;
  name: string;
  category: string;
  sales: number;
}

const columns: Column<SellingProduct>[] = [
  { id: "name", label: "商品名稱", minWidth: 120 },
  { id: "category", label: "商品分類" },
  { id: "sales", label: "銷售數量", align: "right" },
];

const rows: SellingProduct[] = [
  { id: 1, name: "天絲床包組", category: "寢具用品", sales: 340 },
  { id: 2, name: "香氛擴香瓶", category: "花器", sales: 310 },
  { id: 3, name: "記憶枕", category: "寢具用品", sales: 280 },
  { id: 4, name: "陶瓷花瓶", category: "花器", sales: 250 },
  { id: 5, name: "吊燈 - 北歐風", category: "燈具", sales: 220 },
];

export default function TopSellingProductsTable() {
  return (
    <div className="flex flex-col">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        熱門商品 TOP 5
      </h3>
      <BaseTable columns={columns} rows={rows} />
    </div>
  );
}
