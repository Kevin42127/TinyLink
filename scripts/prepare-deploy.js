#!/usr/bin/env node

/**
 * Vercel 部署準備腳本
 * 確保數據目錄存在並設置正確的權限
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 準備 Vercel 部署...');

// 創建數據目錄
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ 創建數據目錄:', dataDir);
} else {
  console.log('✅ 數據目錄已存在:', dataDir);
}

// 檢查必要的環境變數
const requiredEnvVars = [
  'NEXT_PUBLIC_BASE_URL'
];

console.log('🔍 檢查環境變數...');
requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: ${process.env[envVar]}`);
  } else {
    console.log(`⚠️  ${envVar}: 未設置 (將使用默認值)`);
  }
});

console.log('✅ Vercel 部署準備完成！');
