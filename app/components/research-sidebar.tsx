"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type SidebarItem = {
  key: string;
  label: string;
  href: string;
};

export type SidebarGroup = {
  title: string;
  key?: string;
  href?: string;
  items?: SidebarItem[];
};

type ResearchSidebarProps = {
  groups: SidebarGroup[];
  activeKey?: string;
  ariaLabel: string;
};

export function ResearchSidebar({ groups, activeKey, ariaLabel }: ResearchSidebarProps) {
  const pathname = usePathname();
  const clickableItems = useMemo(
    () =>
      groups.flatMap((group) => {
        if (group.items?.length) {
          return group.items;
        }

        if (group.href) {
          return [{ key: group.key ?? group.href, label: group.title, href: group.href }];
        }

        return [];
      }),
    [groups],
  );

  const [currentKey, setCurrentKey] = useState(activeKey ?? clickableItems[0]?.key ?? "");

  useEffect(() => {
    const updateCurrentKey = () => {
      if (activeKey) {
        setCurrentKey(activeKey);
        return;
      }

      const hash = window.location.hash;
      const exact = clickableItems.find((item) => item.href === `${pathname}${hash}`);
      const hashMatch = hash ? clickableItems.find((item) => item.href.endsWith(hash)) : undefined;
      const pathMatch = clickableItems.find((item) => item.href === pathname);
      setCurrentKey(exact?.key ?? hashMatch?.key ?? pathMatch?.key ?? clickableItems[0]?.key ?? "");
    };

    updateCurrentKey();
    window.addEventListener("hashchange", updateCurrentKey);
    return () => window.removeEventListener("hashchange", updateCurrentKey);
  }, [activeKey, clickableItems, pathname]);

  return (
    <aside className="research-sidebar" aria-label={ariaLabel}>
      {groups.map((group) => (
        <div className="sidebar-block" key={group.title}>
          {group.href ? (
            <Link
              className={`sidebar-link sidebar-link-top${currentKey === (group.key ?? group.href) ? " active" : ""}`}
              href={group.href}
              onClick={() => setCurrentKey(group.key ?? group.href ?? "")}
            >
              {group.title}
            </Link>
          ) : (
            <>
              <div className="sidebar-heading">{group.title}</div>
              <div className="sidebar-subnav">
                {group.items?.map((item) => (
                  <Link
                    className={`sidebar-link sidebar-link-sub${item.key === currentKey ? " active" : ""}`}
                    href={item.href}
                    key={item.key}
                    onClick={() => setCurrentKey(item.key)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </aside>
  );
}
