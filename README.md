TinyLink

新增英文翻譯（i18n）

- 已導入自訂的 i18n Provider（`src/i18n/I18nProvider.tsx`），支援 `zh` 與 `en`。
- 主要頁面與元件（首頁、`UrlForm`、`UrlResult`）已改用字串資源。
- 語言切換器：`src/components/LanguageSwitcher.tsx`，預設依瀏覽器語言決定顯示語言，並可手動切換。

使用方式

- 在任何元件中匯入：`import { useI18n } from '@/i18n/I18nProvider'`，使用 `const { t, locale, setLocale } = useI18n()`。
- 以鍵值取得文案：`t('form.submit')`。
- 語言切換：`setLocale('en')` 或 `setLocale('zh')`。切換後會寫入 `locale` cookie。

新增或修改翻譯

- 英文：`src/i18n/messages/en.ts`
- 中文：`src/i18n/messages/zh.ts`
- 新增鍵值後即可在元件中以 `t('your.key')` 取用。

開發預覽

- 啟動開發伺服器：`npm run dev`。
- 開啟瀏覽器：`http://localhost:3000`（若被占用會切換至其他 port，例如 `3001`）。