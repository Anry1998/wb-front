import { ThemeContext } from "@/providers/theme-provider/theme-provider";
import { SecondaryColorVariants, TextColorVariants } from "@/utils/constant";
import { memo, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import sprite from "/sprite.svg";
import { dropRaskItem, saveRaskItem } from "@/utils/helpers";

const SideMenu = memo(function SideMenu() {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const menuItems = [
    { id: "groups", icon: `${sprite}#companies`, text: "Группы" },
    { id: "companies", icon: `${sprite}#briefcase`, text: "Компании" },
    { id: "marketplaces", icon: `${sprite}#shop`, text: "Маркетплейсы" },
    { id: "employees", icon: `${sprite}#employees`, text: "Сотрудники" },
    { id: "roles", icon: `${sprite}#user-role`, text: "Роли" },
    { id: "catalog", icon: `${sprite}#catalog`, text: "Справочники" },
    { id: "reports", icon: `${sprite}#chart-pie`, text: "Отчеты" },
  ];
  const accentBgColor =
    theme === "light" ? "bg-purple-50" : SecondaryColorVariants["dark"];
  const textColor =
    theme === "light" ? "text-purple-500" : TextColorVariants["dark"];

  return (
    <div
      className={`side-menu__container p-2 bg-white  w-min border rounded-xl border-purple-100 ${textColor}`}
    >
      <nav className="side-menu__nav ">
        <ul>
          {menuItems.map(({ id, icon, text }) => (
            <li
              key={id}
              className={`p-1 pb-2 pt-2 h-sm:pt-1.5 h-sm:pb-1.5 md:px-3  xl:px-5 xl:py-4 mb-0.5  rounded-xl hover:cursor-pointer ${
                pathname.includes(id) ? accentBgColor : ""
              }`}
            >
              <Link
                to={id}
                className={`md:flex  items-center gap-1 xl:gap-5 group  ${
                  pathname.includes(id) ? textColor : TextColorVariants[theme]
                }`}
                onClick={() => {
                  saveRaskItem("pathname", id);
                  dropRaskItem("page");
                }}
              >
                <svg
                  className={`side-menu__icon w-4 h-4 md:w-4 md:h-4 xl:w-5 xl:h-5 ${
                    pathname.includes(id) && "[--svg-color:--svg-color-hover]"
                  } group-hover:[--svg-color:--svg-color-hover]`}
                >
                  <use xlinkHref={icon}></use>
                </svg>
                <p className="hidden md:inline text-basic text-sm">{text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default SideMenu;
