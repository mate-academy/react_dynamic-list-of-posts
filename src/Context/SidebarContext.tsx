import { createContext, useState } from 'react';

type SidebarContextType = {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType>({
  isSidebar: false,
  setSidebar: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebar, setSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
