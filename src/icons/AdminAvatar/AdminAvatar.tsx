import { FC } from "react";
type TAdminAvatarProps = {
  className: string;
};
export const AdminAvatar: FC<TAdminAvatarProps> = ({ className }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='16' cy='16' r='16' fill='#100C34' fill-opacity='0.15' />
    </svg>
  );
};
