import { CardFieldToName } from "@/utils/constant";
import sprite from "/sprite.svg";

type CardFooterProps = {
  name: string;
  icon: string;
  descrtiption: string | number;
};

function CardFooterItem({
  name,
  icon,
  descrtiption,
}: CardFooterProps): JSX.Element {
  return (
    <div className="flex justify-start items-center gap-1 [&_svg]:size-3">
      <svg className="[--svg-color:--svg-color-light]">
        <use xlinkHref={`${sprite}#${icon}`}></use>
      </svg>
      <p className="text-details text-[12px] h-[16px] ">
        {CardFieldToName[name as keyof typeof CardFieldToName]} : {descrtiption}
      </p>
    </div>
  );
}

export default CardFooterItem;
