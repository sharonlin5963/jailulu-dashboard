import type { Column } from "components/ui/BaseTable";
import BaseTable from "components/ui/BaseTable";

interface ReturnedProduct {
  id: number;
  name: string;
  category: string;
  returnCount: number;
  returnRate: string;
}

const columns: Column<ReturnedProduct>[] = [
  { id: "name", label: "商品名稱", minWidth: 120 },
  { id: "category", label: "商品分類", minWidth: 90 },
  { id: "returnCount", label: "退貨數量", align: "right", minWidth: 90 },
  { id: "returnRate", label: "退貨率", align: "right", minWidth: 90 },
];

const rows: ReturnedProduct[] = [
  {
    id: 1,
    name: "玻璃花器",
    category: "花器",
    returnCount: 12,
    returnRate: "6%",
  },
  {
    id: 2,
    name: "擺飾花瓶",
    category: "花器",
    returnCount: 10,
    returnRate: "5%",
  },
  {
    id: 3,
    name: "雙人棉被",
    category: "寢具用品",
    returnCount: 14,
    returnRate: "7%",
  },
  {
    id: 4,
    name: "燈泡吊燈組",
    category: "燈具",
    returnCount: 9,
    returnRate: "4%",
  },
  {
    id: 5,
    name: "床墊保潔墊",
    category: "寢具用品",
    returnCount: 8,
    returnRate: "3%",
  },
];

export default function ReturnedProductsTable() {
  return (
    <div className="flex flex-col">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        商品退貨排行榜
      </h3>
      <BaseTable columns={columns} rows={rows} />
    </div>
  );
}
