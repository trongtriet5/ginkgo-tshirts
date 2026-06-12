'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from '../admin.module.css';

const API = 'http://localhost:3333';

interface Product {
  id: number;
  upc: string;
  productGroup: string;
  name: string;
  sku: string;
  fabric: string;
  gender: string;
  category: string;
  style: string;
  design: string;
  color: string;
  size: string;
  price: number | null;
  typeNameDetailEn: string;
  typeNameGroup: string;
  active: boolean;
  imageUrl?: string;
}

const emptyProduct: Partial<Product> = {
  upc: '', productGroup: 'Apparel', name: '', sku: '',
  fabric: '', gender: '', category: '', style: '', design: '',
  color: '', size: '', price: null,
  typeNameDetailEn: '', typeNameGroup: '',
};

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      const res = await fetch(`${API}/products/admin/all?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(data.data || []);
      setTotal(data.meta?.total || 0);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openCreate = () => {
    setEditing({ ...emptyProduct });
    setError('');
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setError('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).message || 'Upload failed';
        throw new Error(Array.isArray(msg) ? msg[0] : msg);
      }
      const data = await res.json();
      setEditing((prev) => prev ? { ...prev, imageUrl: data.url } : prev);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const validate = (): string | null => {
    if (!editing?.name?.trim()) return 'Product name is required';
    if (editing.price != null && (isNaN(Number(editing.price)) || Number(editing.price) < 0)) return 'Price must be a positive number';
    return null;
  };

  const handleSave = async () => {
    if (!editing || !token) return;
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSaving(true);
    setError('');
    try {
      const body = {
        upc: editing.upc || null,
        productGroup: editing.productGroup || null,
        productName: editing.name,
        sku: editing.sku || null,
        fabric: editing.fabric || null,
        gender: editing.gender || null,
        category: editing.category || null,
        style: editing.style || null,
        design: editing.design || null,
        color: editing.color || null,
        size: editing.size || null,
        price: editing.price != null ? Number(editing.price) : null,
        typeNameDetailEn: editing.typeNameDetailEn || null,
        typeNameGroup: editing.typeNameGroup || null,
        imageUrl: editing.imageUrl || null,
      };

      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

      if (editing.id) {
        const res = await fetch(`${API}/products/${editing.id}`, {
          method: 'PUT', headers, body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: 'Update failed' }));
          throw new Error(err.message);
        }
      } else {
        const res = await fetch(`${API}/products`, {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: 'Create failed' }));
          throw new Error(err.message);
        }
      }
      closeModal();
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    setError('');
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRestore = async (id: number) => {
    if (!token) return;
    try {
      await fetch(`${API}/products/${id}/restore`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch {}
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Products <span style={{ fontSize: 14, fontWeight: 400, color: '#888' }}>({total})</span></h1>
        <button className={styles.addBtn} onClick={openCreate}>+ Add Product</button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, SKU, or UPC..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {error && <div className={styles.error} style={{ textAlign: 'left', marginBottom: 12 }}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: 50 }}>ID</th>
                  <th style={{ width: 60 }}>Image</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Group</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th style={{ width: 50 }}>On</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: 'center', color: '#888', padding: 32 }}>No products found.</td></tr>
                ) : (
                  products.map((p) => (
                    <tr key={`${p.id}-${p.color}-${p.size}`}>
                      <td style={{ fontSize: 12 }}>{p.id}</td>
                      <td>
                        <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#bbb' }}>—</div>
                          )}
                        </div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td style={{ fontSize: 11, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.sku}</td>
                      <td>{p.productGroup}</td>
                      <td>{p.color}</td>
                      <td>{p.size}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{p.price != null ? `${p.price.toLocaleString()} VND` : '—'}</td>
                      <td style={{ color: p.active ? '#4caf50' : '#ef5350', fontWeight: 600 }}>{p.active ? '✓' : '✗'}</td>
                      <td>
                        <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEdit(p)}>Edit</button>
                        {p.active ? (
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(p.id)}>Del</button>
                        ) : (
                          <button className={`${styles.actionBtn} ${styles.restoreBtn}`} onClick={() => handleRestore(p.id)}>Res</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </>
      )}

      {showModal && editing && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{editing.id ? `Edit Product #${editing.id}` : 'Add Product'}</h2>

            {error && <div className={styles.error} style={{ textAlign: 'left', marginBottom: 12 }}>{error}</div>}

            {/* Image upload */}
            <div className={styles.detailSection} style={{ marginBottom: 16 }}>
              <h3>Product Image</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80, height: 80, background: '#f0f0f0', borderRadius: 6, overflow: 'hidden', border: '1px solid #ddd' }}>
                  {editing.imageUrl ? (
                    <img src={editing.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#bbb' }}>No image</div>
                  )}
                </div>
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ fontSize: 12 }}
                    disabled={uploading}
                  />
                  {uploading && <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>Uploading...</span>}
                  {editing.imageUrl && (
                    <button
                      className={styles.actionBtn}
                      style={{ display: 'block', marginTop: 4 }}
                      onClick={() => setEditing({ ...editing, imageUrl: undefined })}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Product fields */}
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Product Name *</label>
                <input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Enter product name" />
              </div>
              <div className={styles.formGroup}>
                <label>UPC</label>
                <input value={editing.upc || ''} onChange={(e) => setEditing({ ...editing, upc: e.target.value })} placeholder="Barcode" />
              </div>
              <div className={styles.formGroup}>
                <label>SKU</label>
                <input value={editing.sku || ''} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} placeholder="Product code" />
              </div>
              <div className={styles.formGroup}>
                <label>Product Group</label>
                <select value={editing.productGroup || ''} onChange={(e) => setEditing({ ...editing, productGroup: e.target.value })}>
                  <option value="">— Select —</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Concept">Concept</option>
                  <option value="Art">Art</option>
                  <option value="CF">CF</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Price (VND)</label>
                <input type="number" min="0" value={editing.price ?? ''} onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : null })} placeholder="0" />
              </div>
              <div className={styles.formGroup}>
                <label>Fabric</label>
                <input value={editing.fabric || ''} onChange={(e) => setEditing({ ...editing, fabric: e.target.value })} placeholder="e.g. GBA" />
              </div>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <select value={editing.gender || ''} onChange={(e) => setEditing({ ...editing, gender: e.target.value })}>
                  <option value="">— Select —</option>
                  <option value="MEN">MEN</option>
                  <option value="WOM">WOM</option>
                  <option value="KID">KID</option>
                  <option value="UNI">UNI</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <input value={editing.category || ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="e.g. TSS" />
              </div>
              <div className={styles.formGroup}>
                <label>Style</label>
                <input value={editing.style || ''} onChange={(e) => setEditing({ ...editing, style: e.target.value })} placeholder="e.g. ONE" />
              </div>
              <div className={styles.formGroup}>
                <label>Design</label>
                <input value={editing.design || ''} onChange={(e) => setEditing({ ...editing, design: e.target.value })} placeholder="e.g. URB" />
              </div>
              <div className={styles.formGroup}>
                <label>Color</label>
                <input value={editing.color || ''} onChange={(e) => setEditing({ ...editing, color: e.target.value })} placeholder="e.g. BLK" />
              </div>
              <div className={styles.formGroup}>
                <label>Size</label>
                <input value={editing.size || ''} onChange={(e) => setEditing({ ...editing, size: e.target.value })} placeholder="e.g. S, M, L" />
              </div>
              <div className={styles.formGroup}>
                <label>Type Detail (EN)</label>
                <input value={editing.typeNameDetailEn || ''} onChange={(e) => setEditing({ ...editing, typeNameDetailEn: e.target.value })} placeholder="e.g. T-Shirt Short Sleeves" />
              </div>
              <div className={styles.formGroup}>
                <label>Type Group</label>
                <input value={editing.typeNameGroup || ''} onChange={(e) => setEditing({ ...editing, typeNameGroup: e.target.value })} placeholder="e.g. T-Shirt" />
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : (editing.id ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
