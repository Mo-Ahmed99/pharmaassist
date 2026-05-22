import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export default function Layout() {
  return (
    <>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
    </>
  );
}
