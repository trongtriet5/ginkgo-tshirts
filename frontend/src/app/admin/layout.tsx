'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';
import { useEffect, type ReactNode } from 'react';
import styles from './admin.module.css';

const API = 'http://localhost:3333';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoginPage, router]);

  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Ginkgo CMS</h2>
          <span className={styles.userName}>{user?.displayName || 'Admin'}</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={`${styles.navItem} ${pathname === '/admin/dashboard' ? styles.active : ''}`}>
            Dashboard
          </Link>
          <Link href="/admin/products" className={`${styles.navItem} ${pathname === '/admin/products' ? styles.active : ''}`}>
            Products
          </Link>
          <Link href="/admin/orders" className={`${styles.navItem} ${pathname === '/admin/orders' ? styles.active : ''}`}>
            Orders
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navItem}>View Site</Link>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
