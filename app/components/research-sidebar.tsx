import Link from "next/link";

type ResearchSidebarProps = {
  activeKey: "overview" | "faculty";
};

const sidebarGroups = [
  {
    title: "Research Directions",
    href: "/research#directions",
  },
  {
    title: "Talent Team",
    items: [
      { key: "faculty", label: "Researcher", href: "/research#faculty" },
      { key: "overview", label: "Graduate Students", href: "/research#students" },
    ],
  },
  {
    title: "Research Training",
    href: "/research#training",
  },
  {
    title: "Achievements",
    href: "/research#publications",
  },
];

export function ResearchSidebar({ activeKey }: ResearchSidebarProps) {
  return (
    <aside className="research-sidebar" aria-label="Research sections">
      {sidebarGroups.map((group) => (
        <div className="sidebar-block" key={group.title}>
          {group.href ? (
            <Link className="sidebar-link sidebar-link-top" href={group.href}>
              {group.title}
            </Link>
          ) : (
            <>
              <div className="sidebar-heading">{group.title}</div>
              <div className="sidebar-subnav">
                {group.items?.map((item) => (
                  <Link
                    className={`sidebar-link sidebar-link-sub${item.key === activeKey ? " active" : ""}`}
                    href={item.href}
                    key={item.label}
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
