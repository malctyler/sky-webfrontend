export type ThemeType = 'light' | 'dark'
export type LayoutOrientationType = 'vertical' | 'horizontal' | 'detached' | 'two-column'
export type LayoutWidthType = 'fluid' | 'boxed'
export type TopBarThemeType = 'light' | 'dark' | 'brand'
export type MenuPositionType = 'fixed' | 'scrollable'
export type MenuThemeType = 'light' | 'dark' | 'brand' | 'gradient'
export type MenuSizeType = 'default' | 'condensed' | 'compact'

export type MenuType = {
    theme: MenuThemeType
    size: MenuSizeType
    position: MenuPositionType
}

export type LayoutState = {
    theme: ThemeType
    orientation: LayoutOrientationType
    topbarTheme: TopBarThemeType
    width: LayoutWidthType
    menu: MenuType
    showUserInfo: boolean
}

export type OffcanvasControlType = {
    open: boolean
    toggle: () => void
}

export type LayoutOffcanvasStatesType = {
    showThemeCustomizer: boolean
    showBackdrop: boolean
}

export type LayoutType = LayoutState & {
    changeTheme: (theme: ThemeType) => void
    changeLayoutOrientation: (orientation: LayoutOrientationType) => void
    changeLayoutWidth: (mode: LayoutWidthType) => void
    changeTopbarTheme: (theme: TopBarThemeType) => void
    changeMenuTheme: (theme: MenuType['theme']) => void
    changeMenuPosition: (position: MenuType['position']) => void
    changeMenuSize: (size: MenuType['size']) => void
    toggleUserInfo: () => void
    themeCustomizer: OffcanvasControlType
    toggleBackdrop: () => void
    resetSettings: () => void
}