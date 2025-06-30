import { Link, useLocation } from "react-router";
import { formatTWD } from "~/lib/utils";
import { Card, CardActionArea, CardContent, Chip } from "@mui/material";

interface ItemCardProps {
  id: number;
  name: string;
  imageUrls: string[];
  group: string;
  price: number;
  specialPrice: number | null;
}

const ItemCard = ({
  id,
  name,
  imageUrls,
  group,
  price,
  specialPrice,
}: ItemCardProps) => {
  const path = useLocation();

  const isSale = specialPrice !== null;

  return (
    <Card>
      <CardActionArea
        component={Link}
        to={
          path.pathname === "/" || path.pathname.startsWith("/products")
            ? `/products/${id}`
            : `/items/${id}`
        }
      >
        <img
          src={imageUrls[0]}
          alt={name}
          className=" w-full h-[180px] rounded-t-xl object-cover aspect-square"
        />

        <CardContent>
          <article className="flex flex-col gap-3 text-sm md:text-lg">
            <h2 className="font-semibold text-dark-100 line-clamp-1">{name}</h2>
            <div className="flex justify-between">
              <Chip
                color="primary"
                variant="outlined"
                label={group}
                size="small"
              />
              <div className="flex gap-1 font-normal">
                <span
                  className={
                    isSale
                      ? "text-gray-100 line-through decoration-red-100"
                      : "text-dark-300"
                  }
                >
                  {formatTWD(price)}
                </span>
                {isSale && (
                  <span className="text-red-100">
                    {formatTWD(specialPrice)}
                  </span>
                )}
              </div>
            </div>
          </article>

          {isSale && (
            <Chip
              color="error"
              label="SALE"
              className="absolute top-3 right-3 tracking-wider"
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
