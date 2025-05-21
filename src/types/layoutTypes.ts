import { ReactNode } from 'react';

export interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
  roles?: string[];
}

export interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
  handleThemeToggle: () => void;
  isDarkMode: boolean;
  userName: string;
}

export interface MainLayoutProps {
  children: ReactNode;
}
