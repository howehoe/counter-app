'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { counterApi, Counter } from '@/lib/api';
import { getToken, getUser, clearAuth, isAuthenticated } from '@/lib/auth';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCounterName, setNewCounterName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');
  const user = getUser();

  const fetchCounters = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const data = await counterApi.getAll(token);
      setCounters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch counters');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchCounters();
  }, [router, fetchCounters]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const handleCreateCounter = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !newCounterName.trim()) return;

    try {
      const counter = await counterApi.create(newCounterName.trim(), token);
      setCounters([counter, ...counters]);
      setNewCounterName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create counter');
    }
  };

  const handleIncrement = async (id: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const updated = await counterApi.increment(id, token);
      setCounters(counters.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to increment');
    }
  };

  const handleStartEdit = (counter: Counter) => {
    setEditingId(counter.id);
    setEditName(counter.name);
  };

  const handleSaveEdit = async (id: string) => {
    const token = getToken();
    if (!token || !editName.trim()) return;

    try {
      const updated = await counterApi.update(id, editName.trim(), token);
      setCounters(counters.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) return;

    if (!confirm('このカウンターを削除しますか？')) return;

    try {
      await counterApi.delete(id, token);
      setCounters(counters.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.logo}>Counter App</h1>
          <span className={styles.username}>@{user?.username}</span>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          ログアウト
        </button>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={() => setError('')} className={styles.errorClose}>
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleCreateCounter} className={styles.createForm}>
          <input
            type="text"
            value={newCounterName}
            onChange={(e) => setNewCounterName(e.target.value)}
            placeholder="新しいカウンター名..."
            maxLength={50}
          />
          <button type="submit" className="btn-primary" disabled={!newCounterName.trim()}>
            作成
          </button>
        </form>

        <div className={styles.countersGrid}>
          {counters.length === 0 ? (
            <div className={styles.empty}>
              <p>カウンターがありません</p>
              <p className={styles.emptyHint}>上のフォームから新しいカウンターを作成してください</p>
            </div>
          ) : (
            counters.map((counter) => (
              <div key={counter.id} className={styles.counterCard}>
                <div className={styles.counterHeader}>
                  {editingId === counter.id ? (
                    <div className={styles.editForm}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={styles.editInput}
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(counter.id)}
                        className={styles.saveBtn}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className={styles.cancelBtn}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className={styles.counterName}>{counter.name}</h3>
                      <div className={styles.counterActions}>
                        <button
                          onClick={() => handleStartEdit(counter)}
                          className="btn-icon"
                          title="編集"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDelete(counter.id)}
                          className="btn-icon"
                          title="削除"
                          style={{ color: 'var(--danger)' }}
                        >
                          ✕
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.counterBody}>
                  <span className={styles.countValue}>{counter.count}</span>
                  <button
                    onClick={() => handleIncrement(counter.id)}
                    className={styles.incrementBtn}
                  >
                    +1
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

