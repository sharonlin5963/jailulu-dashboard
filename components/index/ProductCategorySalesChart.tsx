import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

const data = [
  { category: "寢具用品", sales: 30 },
  { category: "燈具", sales: 24 },
  { category: "花器", sales: 18 },
];

const ProductCategorySalesChart = () => {
  return (
    <Box>
      <h3 className="mb-4 text-lg font-semibold text-gray-800 text-center">
        商品分類銷售統計
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="category" stroke="#a9abad" />
          <YAxis stroke="#a9abad" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;

              const salesData = payload.find(
                (entry) => entry.dataKey === "sales"
              );

              if (!salesData) return null;

              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    color: "#333",
                    fontSize: 14,
                  }}
                >
                  <div>{label}</div>
                  <div>{`銷售數：${salesData.value}`}</div>
                </div>
              );
            }}
          />

          <Bar
            dataKey="sales"
            fill="#91c4bc"
            radius={[8, 8, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProductCategorySalesChart;
