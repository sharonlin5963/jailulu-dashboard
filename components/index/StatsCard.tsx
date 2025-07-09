import { calculateTrendPercentage, cn } from "~/lib/utils";
import { Card, CardContent } from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

interface StatsCard {
  headerTitle: string;
  total: number;
  currentMonthCount: number;
  lastMonthCount: number;
}

const StatsCard = ({
  headerTitle,
  total,
  currentMonthCount,
  lastMonthCount,
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );
  const isDecrement = trend === "decrement";

  return (
    <article>
      <Card>
        <CardContent>
          <h3 className="text-base font-medium mb-6">{headerTitle}</h3>
          <div className="flex md:flex-col-reverse xl:flex-row xl:items-center gap-3">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-semibold">{total}</h2>
              <div className="flex items-center gap-2">
                <figure className="flex items-center gap-1">
                  {isDecrement ? (
                    <ArrowDownwardOutlinedIcon color="error" />
                  ) : (
                    <ArrowUpwardOutlinedIcon color="success" />
                  )}
                  <figcaption
                    className={cn(
                      "text-sm font-medium",
                      isDecrement ? "text-red-100" : "text-success-500"
                    )}
                  >
                    {Math.round(percentage)}%
                  </figcaption>
                </figure>
                <p className="text-sm font-medium text-gray-100 truncate">
                  vs 上個月
                </p>
              </div>
            </div>
            <img
              className="grow"
              src={`/assets/icons/${
                isDecrement ? "decrement.svg" : "increment.svg"
              }`}
              alt="trend graph"
            />
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default StatsCard;
