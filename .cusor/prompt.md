あなたはフルスタック開発をサポートする AI エージェントです。
以下の仕様に基づき、ローカル環境でアプリが動く状態まで構築してください。

▼ アプリ概要

- カウンターアプリ
- カウンターは複数作成できる
- カウンターごとに 1 ずつ増える
- データは DB(PostgreSQL)保存
- カウンター名の編集と削除あり
- 1 アカウントで複数のカウンター管理
- 認証はユーザー名＋パスワードのログイン
- ローカルで動作していることがゴール（デプロイは後で実施）

▼ 技術スタック

- Frontend: Next.js 14 + React 18
- App Router
- Server Actions + useFormState (react-dom)
- Client Component は \_components に配置
- Backend: Node.js + NestJS
- ORM: Prisma
- DB: PostgreSQL（ローカル：Docker）
- TypeScript
- パッケージマネージャ: pnpm
- モノレポ構成（Turborepo）

▼Next.js 実装要件

- page.tsx は **Server Component**
- Form UI は Client Component として `_components/` に分離
- API アクセスは **Server Action** で実施（actions.ts を配置）
- 認証トークンは **httpOnly Cookie** で管理

▼Next.js ディレクトリ構造例（auth 画面）
login/
├── page.tsx # Server Component
├── \_components/
│ └── login-form.tsx # Client Component
(auth)/
└── actions.ts # Server Actions

※ counters も同様に構成

▼NestJS API 実装要件
レイヤー構造を必ず分離してください：

- Controller 層：リクエスト/レスポンスのハンドリング
- Service 層：ビジネスロジックのみ
- Repository 層：DB 操作（Prisma）

モジュール構成：

- auth: signup / login
- counters: Counter の CRUD

▼ データモデル（Prisma）
User

- id (string, uuid)
- username (string, unique)
- passwordHash (string)

Counter

- id (string, uuid)
- name (string)
- count (int)
- userId (string) // User.id に紐づく

▼ 認証仕様

- password は bcrypt でハッシュ化して保存
- login 成功時に NestJS が JWT 生成
- Next.js 側は httpOnly Cookie で JWT 保持し Server Action 内で検証

▼ あなたが行うこと

1. 初期ディレクトリ構成の作成（Turborepo）
2. Next.js 初期設定（上記構造を踏襲）
3. NestJS 初期設定（Controller / Service / Repository 分割）
4. Docker Compose で PostgreSQL 起動
5. Prisma schema 記述 + migrate 実行 + seed 任意
6. Server Actions と API の接続
7. `pnpm dev` で Next+A Nest が同時に動くように設定
8. signup → login → counter 作成 → count 増加 の動作を確認
9. コードをファイル単位で提示
10. 各ステップごとに私へ確認をとってから次に進める

▼ 納品物

- 完全動作するローカル環境
- コマンド例:
  - `pnpm dev`
  - `docker-compose up -d`
- .env.example の提供
- 動作確認手順書

▼ 注意

- デプロイや AWS 等は扱わない（後で別タスク）
- 必ず私に確認しながら進行すること
- セキュリティ基準を満たすコードで実装すること

まず、ディレクトリ構成案を提示し、
「これで進めますか？」と私に質問してください。
