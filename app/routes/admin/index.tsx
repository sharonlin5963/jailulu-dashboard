import { useEffect, useState } from "react";
import { Header, ItemCard, Loading, StatsCard } from "../../../components";
import type { Product } from "../admin/products";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/config";
import { Link } from "react-router";
import { Button } from "@mui/material";

const dashboardStats = {
  usersJoined: { total: 125, currentMonth: 20, lastMonth: 10 },
  itemsCreated: { total: 60, currentMonth: 3, lastMonth: 2 },
  userRole: { total: 23, currentMonth: 10, lastMonth: 15 },
};

const Dashboard = () => {
  const { usersJoined, itemsCreated, userRole } = dashboardStats;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      const filteredProducts = products.filter(
        (product) => product.status === 1
      );
      setProducts(filteredProducts.slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main className="wrapper dashboard">
      <Header
        title="您好 👋"
        description="提供商品管理、訂單追蹤與銷售分析功能，幫助快速更新商品資訊、查看客戶資料及掌握市場趨勢，高效提升運營效率。"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="總商品數"
            total={itemsCreated.total}
            currentMonthCount={itemsCreated.currentMonth}
            lastMonthCount={itemsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="總用戶數"
            total={usersJoined.total}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="今日用戶活躍度"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>

      <section className="flex flex-col gap-5 mt-2.5">
        <h1 className="text-xl font-semibold text-dark-100">商品列表</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
          {products.length === 0 ? (
            <Link to="/products" className="col-span-full m-auto">
              <Button variant="contained">暫無商品，前往商品管理頁</Button>
            </Link>
          ) : (
            products
              .slice(0, 4)
              .map((product) => (
                <ItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  group={product.group.value}
                  price={product.price}
                  isSale={product.isSale}
                  specialPrice={product.specialPrice}
                />
              ))
          )}
        </div>
        <Loading open={loading} />
      </section>
    </main>
  );
};

export default Dashboard;
