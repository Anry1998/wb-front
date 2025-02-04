import { ChevronLeft } from "lucide-react";
import sprite from "/sprite.svg";
import { useNavigate } from "react-router-dom";

type InfoHeaderProps = {
  icon: string;
  title: string;
  back?: boolean;
  total?: number;
  type?: string;
};

function InfoHeader({
  icon,
  title,
  back,
  total,
}: InfoHeaderProps): JSX.Element {
  const isTotalVisible = false;
  const navigate = useNavigate();
  // const isTotalVisible = type === "companies" || type === "employees";
  return (
    <div className="info__header flex items-center gap-[14px] ">
      {back && (
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="bg-purple-100 rounded-md p-0.5 hover:bg-purple-300 cursor-pointer"
        />
      )}
      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 xl:w-4 xl:h-4 ">
        <use xlinkHref={`${sprite}#${icon}`}></use>
      </svg>
      <h2 className="font-medium text-basic text-lg">{title}</h2>
      {isTotalVisible && (
        <span className="px-1.5 py-0.5 font-bold text-basic bg-purple-50 text-center rounded-sm ">
          {total}
        </span>
      )}
    </div>
  );
}

export default InfoHeader;
