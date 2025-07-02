import { useLoaderData } from "react-router";
import { Header, ItemCard, StatsCard } from "../../../components";
import { getCurrentUser } from "~/firebase/auth";

const dashboardStats = {
  usersJoined: { total: 125, currentMonth: 100, lastMonth: 92 },
  itemsCreated: { total: 60, currentMonth: 0, lastMonth: 2 },
  userRole: { total: 23, currentMonth: 60, lastMonth: 15 },
};
const allItems = [
  {
    id: 1,
    name: "清水模",
    imageUrls: ["/assets/images/card-img-1.png"],
    group: "盆栽",
    price: 1000,
    specialPrice: null,
  },
  {
    id: 2,
    name: "就是花盆花盆花盆花盆花盆花盆花盆花盆花盆花盆",
    imageUrls: ["/assets/images/card-img-1.png"],
    group: "盆栽",
    price: 690,
    specialPrice: 590,
  },
  {
    id: 3,
    name: "安心小毯毯",
    imageUrls: ["/assets/images/card-img-1.png"],
    group: "毛毯",
    price: 1200,
    specialPrice: null,
  },
  {
    id: 4,
    name: "時光機",
    imageUrls: ["/assets/images/card-img-1.png"],
    group: "時鐘",
    price: 99999,
    specialPrice: null,
  },
];

export const clientLoader = async () => await getCurrentUser();

const Dashboard = () => {
  const user = useLoaderData();
  const { usersJoined, itemsCreated, userRole } = dashboardStats;

  return (
    <main className="wrapper dashboard">
      <Header
        title={`您好 ${user?.name || user?.email} 👋`}
        description="提供商品管理、訂單追蹤與銷售分析功能，幫助快速更新商品資訊、查看客戶資料及掌握市場趨勢，高效提升運營效率。"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="總用戶數"
            total={usersJoined.total}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="總商品數"
            total={itemsCreated.total}
            currentMonthCount={itemsCreated.currentMonth}
            lastMonthCount={itemsCreated.lastMonth}
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
        <h1 className="text-xl font-semibold text-dark-100">新增商品</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
          {allItems.slice(0, 4).map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              imageUrls={item.imageUrls}
              group={item.group}
              price={item.price}
              specialPrice={item.specialPrice}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
