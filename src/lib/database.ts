import sqlite3 from 'sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'data', 'shorturls.db');

// 確保數據目錄存在
import { mkdirSync } from 'fs';
import { dirname } from 'path';
mkdirSync(dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath);

// 創建表
const createTables = () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS short_urls (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          short_code TEXT UNIQUE NOT NULL,
          original_url TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME,
          click_count INTEGER DEFAULT 0,
          title TEXT,
          description TEXT
        )
      `);
      
      db.run(`CREATE INDEX IF NOT EXISTS idx_short_code ON short_urls(short_code)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_created_at ON short_urls(created_at)`);
      
      resolve();
    });
  });
};

// 初始化數據庫
createTables();

export interface ShortUrl {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt?: string;
  clickCount: number;
  title?: string;
  description?: string;
}

export const dbQueries = {
  // 插入新的短網址
  insertShortUrl: (shortCode: string, originalUrl: string, expiresAt: string | null, title: string | null, description: string | null) => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO short_urls (short_code, original_url, expires_at, title, description) VALUES (?, ?, ?, ?, ?)',
        [shortCode, originalUrl, expiresAt, title, description],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  // 根據短碼查找URL
  getUrlByCode: (code: string) => {
    return new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT * FROM short_urls WHERE short_code = ?',
        [code],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  // 增加點擊次數
  incrementClickCount: (code: string) => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE short_urls SET click_count = click_count + 1 WHERE short_code = ?',
        [code],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  // 獲取最近的短網址記錄
  getRecentUrls: (limit: number, offset: number) => {
    return new Promise<any[]>((resolve, reject) => {
      db.all(
        'SELECT * FROM short_urls ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset],
        function(err, rows) {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  },

  // 獲取短網址總數
  getTotalUrlCount: () => {
    return new Promise<number>((resolve, reject) => {
      db.get(
        'SELECT COUNT(*) as count FROM short_urls',
        [],
        function(err, row: any) {
          if (err) reject(err);
          else resolve(row?.count || 0);
        }
      );
    });
  },

  // 刪除短網址
  deleteUrl: (code: string) => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        'DELETE FROM short_urls WHERE short_code = ?',
        [code],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  // 刪除所有短網址
  deleteAllUrls: () => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        'DELETE FROM short_urls',
        [],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },


  // 檢查短碼是否存在
  checkCodeExists: (code: string) => {
    return new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT short_code FROM short_urls WHERE short_code = ?',
        [code],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  // 清理過期的URL
  cleanupExpired: () => {
    return new Promise<void>((resolve, reject) => {
      const now = new Date().toISOString().replace('T', ' ').replace('Z', '');
      db.run(
        "DELETE FROM short_urls WHERE expires_at IS NOT NULL AND expires_at < ?",
        [now],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
};

export default db;
