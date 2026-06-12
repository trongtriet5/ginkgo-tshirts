'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from '../admin.module.css';

const API = 'http://localhost:3333';

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [prodRes, ordersRes] = await Promise.all([
          fetch(`${API}/products/admin/all?limit=1`, { headers }),
          fetch(`${API}/orders?limit=5`, { headers }),
        ]);

        if (!prodRes.ok) throw new Error(`Products API: ${prodRes.status}`);
        if (!ordersRes.ok) throw new Error(`Orders API: ${ordersRes.status}`);

        const prodData = await prodRes.json();
        const ordersData = await ordersRes.json();

        const pendingOrders = ordersData.data?.filter((o: any) => o.status === 'pending').length || 0;

        setStats({
          products: prodData.meta?.total || 0,
          orders: ordersData.meta?.total || 0,
          pendingOrders,
        });
        setRecentOrders(ordersData.data || []);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [token]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
      </div>

      {error && <div className={styles.error} style={{ textAlign: 'left', marginBottom: 12 }}>{error}</div>}

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <div className={styles.value}>{stats.products}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <div className={styles.value}>{stats.orders}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Orders</h3>
          <div className={styles.value}>{stats.pendingOrders}</div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <h3>Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p style={{ color: '#888', fontSize: 13 }}>No orders yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o: any) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.customerName}</td>
                  <td>
                    <span className={`${styles.status} ${styles[o.status] || ''}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.totalAmount?.toLocaleString()} VND</td>
                  <td>{o.createdAt?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
