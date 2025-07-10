import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

const data = [
  { name: "1月", userCount: 10 },
  { name: "2月", userCount: 6 },
  { name: "3月", userCount: 19 },
  { name: "4月", userCount: 20 },
  { name: "5月", userCount: 34 },
  { name: "6月", userCount: 25 },
];

const UserGrowthChart = () => {
  return (
    <Box>
      <h3 className="mb-4 text-lg font-semibold text-gray-800 text-center">
        會員成長趨勢
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#a9abad" />
          <YAxis stroke="#a9abad" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;

              const areaData = payload.find(
                (entry) => entry.dataKey === "userCount"
              );

              if (!areaData) return null;

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
                  <div>{`會員數：${areaData.value}`}</div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="userCount"
            barSize={28}
            fill="#91c4bc"
            radius={[8, 8, 0, 0]}
          />
          <Area
            type="monotone"
            dataKey="userCount"
            stroke="#0766FF"
            fill="rgba(7, 102, 255, 0.3)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UserGrowthChart;
