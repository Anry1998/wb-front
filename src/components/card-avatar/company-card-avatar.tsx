import { getRandomAvatarColor } from "@/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type CompanyCardAvatarProps = {
  name: string;
  type?: number | string;
};

function CompanyCardAvatar({
  name,
  type,
}: CompanyCardAvatarProps): JSX.Element {
  const fallback = name[0];
  const color = getRandomAvatarColor(fallback);
  const link = type === 1 ? "/wb.jpg" : type === 2 ? "/ozon.jpg" : "";
  return (
    <Avatar className="rounded-sm ">
      <AvatarImage src={link} />
      <AvatarFallback className={` ${color}`}>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export default CompanyCardAvatar;
