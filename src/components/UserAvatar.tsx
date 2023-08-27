import { User } from 'next-auth';
import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type UserAvatarProps = {
  user: User;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar className='w-8 h-8'>
      {user.image ? (
        <div className='relative aspect-square '>
          <Image
            fill
            src={user.image}
            alt='User profile'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};
