import { FC } from "react";

import styles from "./SocialLink.module.scss";

interface ISocialLinkProps {
  nameSocialNetwork: "telegram" | "github";
  userName: string | undefined;
}

export const SocialLink: FC<ISocialLinkProps> = ({ nameSocialNetwork, userName }) => {
  if (nameSocialNetwork === "telegram") {
    return (
      <a className={styles.link} href={`https://t.me/${userName}`}>
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M29.3334 16.0001C29.3334 23.3639 23.3639 29.3334 16.0001 29.3334C8.63629 29.3334 2.66675 23.3639 2.66675 16.0001C2.66675 8.63629 8.63629 2.66675 16.0001 2.66675C23.3639 2.66675 29.3334 8.63629 29.3334 16.0001ZM16.4779 12.51C15.1811 13.0494 12.5891 14.1658 8.70221 15.8593C8.07103 16.1103 7.74039 16.3558 7.7103 16.5959C7.65943 17.0017 8.16757 17.1615 8.85953 17.3791C8.95365 17.4086 9.05117 17.4393 9.15115 17.4718C9.83193 17.6931 10.7477 17.952 11.2238 17.9623C11.6556 17.9716 12.1376 17.7936 12.6697 17.4282C16.3014 14.9767 18.1761 13.7376 18.2938 13.7109C18.3768 13.692 18.4919 13.6683 18.5698 13.7376C18.6478 13.8069 18.6401 13.9382 18.6319 13.9734C18.5816 14.188 16.5869 16.0424 15.5547 17.002C15.2329 17.3012 15.0046 17.5134 14.958 17.5618C14.8534 17.6704 14.7469 17.7731 14.6445 17.8718C14.0121 18.4815 13.5378 18.9387 14.6708 19.6853C15.2153 20.0441 15.6509 20.3408 16.0856 20.6368C16.5603 20.9601 17.0338 21.2825 17.6463 21.6841C17.8024 21.7864 17.9515 21.8927 18.0967 21.9962C18.6491 22.39 19.1454 22.7438 19.7585 22.6874C20.1148 22.6546 20.4828 22.3196 20.6697 21.3204C21.1115 18.9591 21.9797 13.8428 22.1804 11.7345C22.1979 11.5497 22.1758 11.3133 22.1581 11.2096C22.1403 11.1058 22.1032 10.9579 21.9683 10.8485C21.8085 10.7189 21.5619 10.6915 21.4516 10.6935C20.9501 10.7023 20.1807 10.9698 16.4779 12.51Z'
            fill='#100C34'
          />
        </svg>
      </a>
    );
  }
  if (nameSocialNetwork === "github") {
    return (
      <a className={styles.link} href={`https://github.com/${userName}`}>
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M15.835 3C8.47186 3 2.5 9.12169 2.5 16.6721C2.5 22.7129 6.32048 27.8377 11.62 29.6458C12.2857 29.7723 12.5013 29.3484 12.5013 28.9884V26.4431C8.7919 27.2703 8.01958 24.8298 8.01958 24.8298C7.41284 23.2495 6.53828 22.8291 6.53828 22.8291C5.32813 21.9803 6.63052 21.9985 6.63052 21.9985C7.96957 22.0942 8.67411 23.4079 8.67411 23.4079C9.86314 25.4975 11.7934 24.8936 12.5546 24.5438C12.6735 23.6608 13.0191 23.057 13.4014 22.7163C10.4399 22.3688 7.32616 21.1964 7.32616 15.9589C7.32616 14.4652 7.84733 13.2461 8.69966 12.2891C8.56187 11.9438 8.10514 10.5527 8.82968 8.67051C8.82968 8.67051 9.94982 8.30364 12.4979 10.0719C13.5614 9.76884 14.7015 9.6173 15.835 9.61161C16.9685 9.6173 18.1097 9.76884 19.1754 10.0719C21.7213 8.30364 22.8392 8.67051 22.8392 8.67051C23.5649 10.5538 23.1081 11.945 22.9703 12.2891C23.826 13.2461 24.3427 14.4663 24.3427 15.9589C24.3427 21.2101 21.2234 22.3665 18.2542 22.7049C18.732 23.1288 19.1688 23.9605 19.1688 25.2366V28.9884C19.1688 29.3519 19.3821 29.7791 20.0589 29.6447C25.354 27.8343 29.17 22.7106 29.17 16.6721C29.17 9.12169 23.1993 3 15.835 3Z'
            fill='#100C34'
          />
        </svg>
      </a>
    );
  }
  return null;
};
