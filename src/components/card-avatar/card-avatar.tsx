import { getAvatarLetters, getRandomAvatarColor } from '@/utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type CardAvatarProps = {
  name:string;
  type:'employee'|'company';
  link?:string;
};

function CardAvatar({ name, type,  link }: CardAvatarProps): JSX.Element {
  const fallback = type === 'employee'? getAvatarLetters(name): name[0];
  const color = getRandomAvatarColor(fallback);
  return (
    <Avatar>
    <AvatarImage src={link} />
    <AvatarFallback className={`${color}`}>
      {fallback}
    </AvatarFallback>
  </Avatar>
  );
}

export default CardAvatar;