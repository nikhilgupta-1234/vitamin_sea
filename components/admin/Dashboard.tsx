import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductTable from "./ProductTable";
import StatsCards from "./StatsCards";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F4EC]">

      <Sidebar />

      <main className="flex-1">

        <Header />

        <div className="p-8">

          <ProductTable />

        </div>

      </main>

    </div>
  );
}