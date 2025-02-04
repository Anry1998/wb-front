import Header from "@/components/header/header";
import SideMenu from "@/components/side-menu/side-menu";
import { ThemeContext } from "@/providers/theme-provider/theme-provider";
import {
  AppRoute,
  BackgroundColorVariants,
  TextColorVariants,
} from "@/utils/constant";
import { getRaskItem } from "@/utils/helpers";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function PersonalPage(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const textColor = TextColorVariants[theme];
  const backgroundColor = BackgroundColorVariants[theme];
  const navigate = useNavigate();
  const path = getRaskItem("pathname");
  const { pathname } = useLocation();
  const pageQuery = `?page=${getRaskItem("page") ? getRaskItem("page") : 1}`;
  const savedPath = `${path}${path !== AppRoute.Catalog ? pageQuery : ""}`;
  useEffect(() => {
    if (pathname === "/personal") {
      navigate(savedPath);
    }
  }, [pathname]);
  return (
    <div
      className={`personal-page__wrapper w-screen h-screen overflow-hidden ${backgroundColor} ${textColor}`}
    >
      <Header />
      <div className="flex bg-purple-10 pl-2 py-2 h-[calc(100vh-42px)]">
        <SideMenu />
        <Outlet />
      </div>
    </div>
  );
}
export default PersonalPage;
