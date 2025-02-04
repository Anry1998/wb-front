import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { ThemeContext } from "@/providers/theme-provider/theme-provider";
import { getUser } from "@/store/user/selectors";
import { AppRoute, BackgroundColorVariants } from "@/utils/constant";
import { getAvatarLetters, getRandomAvatarColor } from "@/utils/helpers";
import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import sprite from "/sprite.svg";
import { logout } from "@/store/user/api-actions";
import { getUserRoles } from "@/store/role/selectors";

const LogoutPopover = memo(function LogoutPopover() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const backgroundColor = BackgroundColorVariants[theme];
  const user = useAppSelector(getUser);
  const userRoles = useAppSelector(getUserRoles);
  if (!user) {
    return <></>;
  }
  // const roll = api.get<UserRoleServer>(`${ApiRoute.Role}/all`, {
  //   params: { limit: 5, page: 1 },
  // });

  const name = user.surname + " " + user.name;
  const role = userRoles?.map(({ name }) => name).join(", ");
  const fallback = getAvatarLetters(name);
  const color = getRandomAvatarColor(fallback);
  return (
    <div className="popover__container">
      <Popover>
        <PopoverTrigger className="p-1 bg-purple-50 border-none outline-none hover:border-none hover:outline-none focus:border-none focus:outline-none ">
          <div className="flex items-center relative gap-2 ">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className={`${color}`}>{fallback}</AvatarFallback>
            </Avatar>
            <div className="text-left [&_svg]:size-2 mr-6">
              <p className=" font-medium text-[14px] text-details leading-tight text-purple-1000">
                {name}
              </p>
              <p className=" font-medium text-[12px] text-details   text-solitude-100 min-w-fit truncate">
                {role}
              </p>
            </div>
            <svg className="max-w-2 max-h-2 absolute right-1">
              <use xlinkHref={`${sprite}#dropdown`}></use>
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`${backgroundColor} border-none w-24 sm:w-28 lg:w-36 mt-1 rounded-lg p-2 sm:px-4 lg:px-5 sm:py-3 lg:py-4`}
        >
          <div
            className="popover__content mb-2 flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 rounded-md  hover:cursor-pointer"
            onClick={() => navigate(AppRoute.Profile)}
          >
            <svg className="icon w-2 h-3 sm:w-3 sm:h-4 lg:w-4 lg:h-5">
              <use xlinkHref={`${sprite}#user`}></use>
            </svg>
            <span className="popover__text text-[12px]">Профиль</span>
          </div>
          <div
            className="popover__content flex items-center  gap-1.5 sm:gap-2 lg:gap-2.5 rounded-md text-error  hover:cursor-pointer"
            onClick={handleLogout}
          >
            <svg className="icon w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4">
              <use xlinkHref={`${sprite}#exit`}></use>
            </svg>
            <span className="popover__text text-[12px]">Выйти</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default LogoutPopover;
