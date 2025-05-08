import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { toggleDocumentAttribute } from '@/helpers/layout';
const ThemeContext = createContext(undefined);
const useLayoutContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider');
  }
  return context;
};
const LayoutProvider = ({
  children
}) => {
  const INIT_STATE = {
    theme: 'light',
    orientation: 'vertical',
    topbarTheme: 'light',
    menu: {
      theme: 'dark',
      size: 'default',
      position: 'fixed'
    },
    width: 'fluid',
    showUserInfo: false
  };
  const [settings, setSettings] = useLocalStorage('__MINTON_NEXT_CONFIG__', INIT_STATE);
  const [offcanvasStates, setOffcanvasStates] = useState({
    showThemeCustomizer: false,
    showBackdrop: false
  });
  const updateSettings = _newSettings => setSettings({
    ...settings,
    ..._newSettings
  });
  const changeTheme = newTheme => {
    updateSettings({
      theme: newTheme
    });
  };
  const changeLayoutOrientation = newOrientation => {
    updateSettings({
      orientation: newOrientation
    });
  };
  const changeTopbarTheme = newTheme => {
    updateSettings({
      topbarTheme: newTheme
    });
  };
  const changeLayoutWidth = newWidth => {
    updateSettings({
      width: newWidth
    });
  };
  const changeMenuTheme = newTheme => {
    updateSettings({
      menu: {
        ...settings.menu,
        theme: newTheme
      }
    });
  };
  const changeMenuSize = newSize => {
    updateSettings({
      menu: {
        ...settings.menu,
        size: newSize
      }
    });
  };
  const changeMenuPosition = newPosition => {
    updateSettings({
      menu: {
        ...settings.menu,
        position: newPosition
      }
    });
  };
  const toggleUserInfo = () => {
    updateSettings({
      showUserInfo: !settings.showUserInfo
    });
  };
  const toggleThemeCustomizer = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showThemeCustomizer: !offcanvasStates.showThemeCustomizer
    });
  };
  const themeCustomizer = {
    open: offcanvasStates.showThemeCustomizer,
    toggle: toggleThemeCustomizer
  };

  // toggle backdrop
  const toggleBackdrop = useCallback(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable');else htmlTag.classList.add('sidebar-enable');
    setOffcanvasStates({
      ...offcanvasStates,
      showBackdrop: !offcanvasStates.showBackdrop
    });
  }, [offcanvasStates.showBackdrop]);
  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme);
    toggleDocumentAttribute('data-layout-width', settings.width);
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme);
    toggleDocumentAttribute('data-menu-color', settings.menu.theme);
    toggleDocumentAttribute('data-sidebar-size', settings.menu.size);
    toggleDocumentAttribute('data-layout-position', settings.menu.position);
    toggleDocumentAttribute('data-layout-mode', settings.orientation);
  }, [settings]);
  const resetSettings = () => updateSettings(INIT_STATE);
  return <ThemeContext.Provider value={useMemo(() => ({
    ...settings,
    changeTheme,
    changeLayoutOrientation,
    changeLayoutWidth,
    changeTopbarTheme,
    changeMenuTheme,
    changeMenuSize,
    changeMenuPosition,
    toggleUserInfo,
    themeCustomizer,
    toggleBackdrop,
    resetSettings
  }), [settings, offcanvasStates])}>
            {children}
            {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade show" onClick={toggleBackdrop} />}
        </ThemeContext.Provider>;
};
export { LayoutProvider, useLayoutContext };