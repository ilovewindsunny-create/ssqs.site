import Link from "next/link";
import { navItems, siteMeta } from "../site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-width header-inner">
        <Link className="brand-link" href="/">
          <span className="brand-mark">{siteMeta.shortName}</span>
          <span className="brand-copy">
            <strong>{siteMeta.groupName}</strong>
            <small>{siteMeta.institution}</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
