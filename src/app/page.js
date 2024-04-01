import LoginPage from "@/components/AuthComp/LoginPage";
import LandingPage from "@/components/HomeComp/LandingPage";
import ProductionTable from "@/components/HomeComp/ProductionTable";
import SideBar from "@/components/common/SideBar";

export default function Home() {
  return (
    <main className="scroll-smooth h-screen bg-gray-200">
      {/* <LandingPage /> */}
      <ProductionTable />
      {/* <SideBar /> */}
      {/* <LoginPage /> */}
    </main>
  );
}
