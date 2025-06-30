import { Header } from "../../../components";

const Dashboard = () => {
  const user = { name: "Sharon" };

  return (
    <main className="wrapper dashboard">
      <Header
        title={`您好 ${user.name ?? ""} 👋`}
        description="提供商品管理、訂單追蹤與銷售分析功能，幫助快速更新商品資訊、查看客戶資料及掌握市場趨勢，高效提升運營效率。"
      />
    </main>
  );
};

export default Dashboard;
