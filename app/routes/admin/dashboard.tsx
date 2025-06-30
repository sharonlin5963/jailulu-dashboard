import { Header, StatsCard } from "../../../components";

const user = { name: "Sharon" };
const dashboardStats = {
  usersJoined: { total: 125, currentMonth: 100, lastMonth: 92 },
  itemsCreated: { total: 60, currentMonth: 0, lastMonth: 2 },
  userRole: { total: 23, currentMonth: 30, lastMonth: 15 },
};
const Dashboard = () => {
  const { usersJoined, itemsCreated, userRole } = dashboardStats;

  return (
    <main className="wrapper dashboard">
      <Header
        title={`您好 ${user.name ?? ""} 👋`}
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
    </main>
  );
};

export default Dashboard;
