// 內存數據庫 - 適用於 Vercel 無服務器環境
// 注意：這是一個臨時解決方案，數據不會持久化

interface UrlRecord {
  id: number;
  short_code: string;
  original_url: string;
  created_at: string;
  expires_at?: string;
  click_count: number;
  title?: string;
  description?: string;
}

class MemoryDatabase {
  private urls: UrlRecord[] = [];
  private nextId = 1;

  async insertShortUrl(
    shortCode: string,
    originalUrl: string,
    expiresAt: string | null,
    title: string | null,
    description: string | null
  ): Promise<void> {
    const record: UrlRecord = {
      id: this.nextId++,
      short_code: shortCode,
      original_url: originalUrl,
      created_at: new Date().toISOString(),
      expires_at: expiresAt,
      click_count: 0,
      title: title || null,
      description: description || null,
    };

    this.urls.push(record);
  }

  async getUrlByCode(code: string): Promise<UrlRecord | null> {
    return this.urls.find(url => url.short_code === code) || null;
  }

  async checkCodeExists(code: string): Promise<boolean> {
    return this.urls.some(url => url.short_code === code);
  }

  async incrementClickCount(code: string): Promise<void> {
    const url = this.urls.find(url => url.short_code === code);
    if (url) {
      url.click_count++;
    }
  }

  async getRecentUrls(limit: number, offset: number): Promise<UrlRecord[]> {
    return this.urls
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(offset, offset + limit);
  }

  async getTotalUrlCount(): Promise<number> {
    return this.urls.length;
  }

  async deleteUrl(code: string): Promise<void> {
    const index = this.urls.findIndex(url => url.short_code === code);
    if (index !== -1) {
      this.urls.splice(index, 1);
    }
  }

  async deleteAllUrls(): Promise<void> {
    this.urls = [];
  }

  async cleanupExpired(): Promise<void> {
    const now = new Date();
    this.urls = this.urls.filter(url => {
      if (!url.expires_at) return true;
      return new Date(url.expires_at) > now;
    });
  }
}

// 創建全局實例
const memoryDb = new MemoryDatabase();

export const memoryDbQueries = {
  insertShortUrl: (shortCode: string, originalUrl: string, expiresAt: string | null, title: string | null, description: string | null) => {
    return memoryDb.insertShortUrl(shortCode, originalUrl, expiresAt, title, description);
  },

  getUrlByCode: (code: string) => {
    return memoryDb.getUrlByCode(code);
  },

  checkCodeExists: (code: string) => {
    return memoryDb.checkCodeExists(code);
  },

  incrementClickCount: (code: string) => {
    return memoryDb.incrementClickCount(code);
  },

  getRecentUrls: (limit: number, offset: number) => {
    return memoryDb.getRecentUrls(limit, offset);
  },

  getTotalUrlCount: () => {
    return memoryDb.getTotalUrlCount();
  },

  deleteUrl: (code: string) => {
    return memoryDb.deleteUrl(code);
  },

  deleteAllUrls: () => {
    return memoryDb.deleteAllUrls();
  },

  cleanupExpired: () => {
    return memoryDb.cleanupExpired();
  },
};
