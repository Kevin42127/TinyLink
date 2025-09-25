// 數據庫選擇器 - 根據環境選擇合適的數據庫

export function isVercelEnvironment(): boolean {
  return !!(
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_URL
  );
}

export function getDatabase() {
  if (isVercelEnvironment()) {
    console.log('Using memory database for Vercel environment');
    // 動態導入內存數據庫
    return import('./memory-database').then(module => module.memoryDbQueries);
  } else {
    console.log('Using SQLite database for local environment');
    // 動態導入 SQLite 數據庫
    return import('./database').then(module => module.dbQueries);
  }
}
