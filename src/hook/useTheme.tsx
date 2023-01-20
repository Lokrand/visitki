import { useLayoutEffect, useState } from "react";

import { TTemplate } from "../utils/types";

export const useTheme = (template: TTemplate) => {
  const [theme, setTheme] = useState<TTemplate>(template);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
