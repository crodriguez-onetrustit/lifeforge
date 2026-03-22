'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, BarChart2, Settings } from 'lucide-react';
import styles from './AppShell.module.css';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/library',   label: 'Library',   icon: Library },
  { href: '/progress',  label: 'Progress',  icon: BarChart2 },
  { href: '/settings',  label: 'Settings',  icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className={styles.logo}>
          <span>⚒️</span>
          <span>LifeForge</span>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${pathname === href ? styles.navActive : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
