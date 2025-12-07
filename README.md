# Counter App

カウンターアプリケーション - 複数のカウンターを管理できるシンプルなフルスタックアプリ

## 技術スタック

- **Frontend**: Next.js 14 (App Router) + React 18
- **Backend**: NestJS + Prisma
- **Database**: PostgreSQL (Docker)
- **認証**: JWT (bcrypt + passport-jwt)
- **モノレポ**: Turborepo + pnpm

## セットアップ手順

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

`.env` ファイルの内容（デフォルトのままでOK）:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/counter_app?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. PostgreSQLの起動

```bash
docker-compose up -d
```

### 4. データベースのマイグレーション

```bash
pnpm db:migrate
```

マイグレーション名を聞かれたら `init` と入力してください。

### 5. 開発サーバーの起動

```bash
pnpm dev
```

## アクセス

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## API エンドポイント

### 認証

| Method | Endpoint | 説明 |
|--------|----------|------|
| POST | /auth/signup | 新規ユーザー登録 |
| POST | /auth/login | ログイン |

### カウンター（要認証）

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | /counters | カウンター一覧取得 |
| GET | /counters/:id | カウンター詳細取得 |
| POST | /counters | カウンター作成 |
| PATCH | /counters/:id | カウンター名更新 |
| POST | /counters/:id/increment | カウント+1 |
| DELETE | /counters/:id | カウンター削除 |

## 動作確認手順

1. http://localhost:3000 にアクセス
2. 「新規登録」からアカウント作成
3. ダッシュボードでカウンターを作成
4. 「+1」ボタンでカウントを増やす
5. カウンター名の編集・削除も可能

## その他のコマンド

```bash
# Prisma Studio（DB GUI）
pnpm db:studio

# ビルド
pnpm build

# DBコンテナ停止
docker-compose down

# DBコンテナ＋データ削除
docker-compose down -v
```

## ディレクトリ構成

```
counter-app/
├── apps/
│   ├── web/          # Next.js フロントエンド
│   └── api/          # NestJS バックエンド
├── packages/
│   └── database/     # Prisma スキーマ
├── docker-compose.yml
└── turbo.json
```

