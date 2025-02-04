import LogoutPopover from "@/components/logout-popover/logout-popover";
import { useAppSelector } from "@/hooks/store-hooks";
import { ThemeContext } from "@/providers/theme-provider/theme-provider";
import { AuthorizationStatus, SecondaryColorVariants } from "@/utils/constant";
import { memo, useContext } from "react";
import sprite from "/sprite.svg";
import { getAuthStatus } from "@/store/user/selectors";

const Header = memo(function Header() {
  const isAuthorized = useAppSelector(getAuthStatus);
  const { theme } = useContext(ThemeContext);
  const backgroundColor = SecondaryColorVariants[theme];
  return (
    <header
      className={`header__container h-[45px] bg-purple-50  w-screen flex justify-between items-center px-2 ${backgroundColor} gap-2 border-b border-b-purple-100 `}
    >
      <svg className="header__icon w-[60px] ml-3.5 ">
        <use xlinkHref={`${sprite}#logo`}></use>
      </svg>
      <div className="header__controls flex items-baseline ">
        {isAuthorized === AuthorizationStatus.Auth && <LogoutPopover />}
      </div>
    </header>
  );
});

export default Header;
