import { FC } from "react";

import styles from "./Delete.module.scss";

export const Delete: FC = () => {
  return (
    <div className={styles.main}>
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M1 4.6H19M8.2 9.1V13.6M11.8 9.1V13.6M2.8 4.6H17.2L15.778 17.398C15.7293 17.8384 15.5198 18.2454 15.1896 18.541C14.8595 18.8366 14.4319 19 13.9888 19H6.0112C5.56807 19 5.14051 18.8366 4.81037 18.541C4.48024 18.2454 4.27074 17.8384 4.222 17.398L2.8 4.6ZM5.8105 2.0323C5.95608 1.72357 6.18644 1.4626 6.4747 1.27982C6.76297 1.09704 7.09727 0.999996 7.4386 1H12.5614C12.9029 0.999825 13.2374 1.09679 13.5258 1.27958C13.8143 1.46237 14.0448 1.72343 14.1904 2.0323L15.4 4.6H4.6L5.8105 2.0323Z'
          stroke='#E90D41'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </div>
  );
};
