import { useCallback, useEffect, useState } from "react";

//constants
import { findAllParent, findMenuItem, getMenuItemFromURL, getTwoColumnMenuItems, } from "@/helpers/menu";

// components
import { useLayoutContext } from "@/context/useLayoutContext";
import IconMenu from "./IconMenu";
import MainMenu from "./MainMenu";

interface Item {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: Item[];
}

const LeftSidebar = () => {


    const menuItems = getTwoColumnMenuItems();

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    const {menu, changeMenuSize} = useLayoutContext()

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem: Item, show: boolean) => {
        if (menuItem.children) {
            if (menu.size === "condensed")
                changeMenuSize('default')
        }

        if (show)
            setActiveMenuItems([
                menuItem["key"],
                ...findAllParent(menuItems, menuItem),
            ]);
    };

    /**
     * activate the menuitems
     */
    const activeMenu = useCallback(() => {
        const trimmedURL = location.pathname?.replaceAll('', '')
        const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL)
    
        if (matchingMenuItem) {
          const activeMt = findMenuItem(menuItems, matchingMenuItem.key)
          if (activeMt) {
            setActiveMenuItems([
              activeMt.key,
              ...findAllParent(menuItems, activeMt),
            ])
          }
          setTimeout(function () {
            const activatedItem: HTMLAnchorElement | null = document.querySelector(`#sidebar-menu a[href="${trimmedURL}"]`)
            if (activatedItem) {
              const simplebarContent = document.querySelector('.left-side-menu .simplebar-content-wrapper')
              if(simplebarContent){
                const offset = activatedItem.offsetTop - (window.innerHeight*0.4)
                scrollTo(simplebarContent, offset>100?offset:100, 600)
              }
            }
          }, 200)
    
          // scrollTo (Right Side Bar Active Menu)
          const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
          }
    
          const scrollTo = (element: Element | null, to: number, duration: number) => {
            if (element) {
              const start = element.scrollTop,
                change = to - start,
                increment = 20
              let currentTime = 0
              const animateScroll = function () {
                currentTime += increment
                const val = easeInOutQuad(currentTime, start, change, duration)
                element.scrollTop = val
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment)
                }
              }
              animateScroll()
            }
          }
    
        }
      }, [location.pathname, menuItems]);
    
      useEffect(() => {
        activeMenu();
      }, [activeMenu]);

    useEffect(() => {
        if (
            activeMenuItems &&
            activeMenuItems.length &&
            activeMenuItems.length === 1
        ) {
            const parentLevel0 = findMenuItem(menuItems, activeMenuItems[0]);
            const hasChildren =
                parentLevel0 &&
                parentLevel0["children"] &&
                parentLevel0["children"].length;

            if (
                !hasChildren &&
                (menu.size === "default" || menu.size === "compact")
            ) {
                changeMenuSize('condensed');
            } else {
                changeMenuSize(menu.size);
            }
        }
    }, [activeMenuItems, menu.size, menuItems]);

    return (
        <>
            <div className="left-side-menu">
                <div className="h-100">
                    <div className="sidebar-content" id="sidebar-content">
                        <IconMenu
                            menuItems={getTwoColumnMenuItems()}
                            toggleMenu={toggleMenu}
                            activeMenuItems={activeMenuItems}
                        />

                        <MainMenu
                            menuItems={menuItems}
                            activeMenuItems={activeMenuItems}
                            toggleMenu={toggleMenu}
                        />
                    </div>

                    <div className="clearfix"/>
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;
