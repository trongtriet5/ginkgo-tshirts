'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from '../admin.module.css';

const API = 'http://localhost:3333';

interface OrderItem {
  id: number;
  orderId: number;
  productId: number | null;
  productName: string;
  sku: string;
  quantity: number;
  price: number | null;
  subtotal: number | null;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  status: string;
  totalAmount: number | null;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

const statusFlow = ['pending', 'confirmed', 'shipped', 'delivered'];

export default function AdminOrders() {
  const { token } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      if (search) params.set('search', search);
      const res = await fetch(`${API}/orders?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [token, page, statusFilter, search]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const openDetail = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setDetail(await res.json());
    } catch {}
  };

  const handleStatusChange = async (id: number, status: string) => {
    if (!token) return;
    setUpdating(true);
    try {
      await fetch(`${API}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
      if (detail?.id === id) openDetail(id);
    } catch {} finally {
      setUpdating(false);
    }
  };

  const nextStatus = (current: string): string | null => {
    const idx = statusFlow.indexOf(current);
    return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Orders</h1>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by customer name, email, or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#888' }}>No orders found.</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.customerName}</td>
                    <td style={{ fontSize: 12 }}>{o.customerEmail}</td>
                    <td>{o.customerPhone}</td>
                    <td>
                      <span className={`${styles.status} ${styles[o.status] || ''}`}>{o.status}</span>
                    </td>
                    <td>{o.totalAmount?.toLocaleString()} VND</td>
                    <td style={{ fontSize: 12 }}>{o.createdAt?.slice(0, 10)}</td>
                    <td>
                      <button className={styles.actionBtn} onClick={() => openDetail(o.id)}>View</button>
                      {nextStatus(o.status) && (
                        <button
                          className={`${styles.actionBtn} ${styles.editBtn}`}
                          onClick={() => handleStatusChange(o.id, nextStatus(o.status)!)}
                          disabled={updating}
                        >
                          Mark {nextStatus(o.status)}
                        </button>
                      )}
                      {o.status === 'pending' && (
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => handleStatusChange(o.id, 'cancelled')}
                          disabled={updating}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </>
      )}

      {detail && (
        <div className={styles.overlay} onClick={() => setDetail(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ width: 700 }}>
            <h2>Order #{detail.id}</h2>

            <div className={styles.detailGrid}>
              <div className={styles.detailSection}>
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {detail.customerName}</p>
                <p><strong>Email:</strong> {detail.customerEmail || '—'}</p>
                <p><strong>Phone:</strong> {detail.customerPhone || '—'}</p>
                <p><strong>Address:</strong> {detail.customerAddress || '—'}</p>
              </div>
              <div className={styles.detailSection}>
                <h3>Order Information</h3>
                <p><strong>Status:</strong> <span className={`${styles.status} ${styles[detail.status] || ''}`}>{detail.status}</span></p>
                <p><strong>Total:</strong> {detail.totalAmount?.toLocaleString()} VND</p>
                <p><strong>Payment:</strong> {detail.paymentMethod || '—'}</p>
                <p><strong>Created:</strong> {detail.createdAt?.slice(0, 16)}</p>
                <p><strong>Updated:</strong> {detail.updatedAt?.slice(0, 16)}</p>
                {detail.notes && <p><strong>Notes:</strong> {detail.notes}</p>}
              </div>
            </div>

            <div className={styles.detailSection} style={{ marginBottom: 16 }}>
              <h3>Items</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td style={{ fontSize: 11 }}>{item.sku || '—'}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price?.toLocaleString()} VND</td>
                      <td>{item.subtotal?.toLocaleString()} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.detailSection}>
              <h3>Update Status</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {statusFlow.map((s) => (
                  <button
                    key={s}
                    className={`${styles.actionBtn} ${detail.status === s ? styles.editBtn : ''}`}
                    onClick={() => handleStatusChange(detail.id, s)}
                    disabled={updating || detail.status === s || (s === 'delivered' && detail.status === 'cancelled')}
                  >
                    {detail.status === s ? `✓ ${s}` : s}
                  </button>
                ))}
                {detail.status !== 'cancelled' && detail.status !== 'delivered' && (
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleStatusChange(detail.id, 'cancelled')}
                    disabled={updating}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
