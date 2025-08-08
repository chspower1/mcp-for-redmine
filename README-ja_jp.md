<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | [한국어](./README-ko_kr.md) | 日本語 | [简体中文](./README-zh_cn.md)

このプロジェクトは、Redmine と連携するための Model-Context-Protocol (MCP) サーバーです。MCP 対応のクライアントを使用することで、Redmine のプロジェクト、チケット、ユーザー、作業時間などを手軽に管理できます。

現在、サーバーは標準入出力 (`stdio`) 方式のみをサポートしています。

### 利用要件

- Node.js 18 以上
- Redmine API キー (お使いの Redmine アカウントの個人 API キー)

### クイックスタート

以下のコマンドを実行するだけで、すぐにサーバーを起動できます。

```bash
npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key <YOUR_API_KEY>
```

### MCP クライアントとの連携例

お使いの MCP クライアントに、次のようにサーバーを登録できます。

```json
{
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": [
        "-y",
        "@chspower1/mcp-for-redmine",
        "--url",
        "https://your.redmine.tld",
        "--api-key",
        "YOUR_API_KEY"
      ]
    }
  }
}
```

**MCP Inspector でのテスト**

```bash
npx -y @modelcontextprotocol/inspector npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key YOUR_API_KEY
```

### 設定方法

サーバーの設定は、CLI フラグでのみ行えます。

- **CLI フラグ**
  - `-u, --url <url>`
  - `-k, --api-key <key>`

**注意**: このサーバーは`stdio`方式でのみ動作し、個別のポート設定や HTTP/SSE 設定はサポートしていません。

### 主な機能

現在利用可能な機能は以下の通りです。

- **ユーザー (Users)**
  - `users_create`, `users_get`, `users_list`, `users_update`, `users_delete`
- **プロジェクト (Projects)**
  - `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **チケット (Issues)**
  - `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **作業時間 (Time Entries)**
  - `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

各ツールの詳細な仕様 (入力スキーマ) は`src/schema/*.schema.ts`ファイルに定義されています。実行結果は JSON 形式のテキストで返されます。

### 簡単な使用例

- MCP クライアントから`projects_list`を呼び出すと、プロジェクト一覧を JSON 形式で受け取れます。
- `issues_create`を使用すると、新しいチケットを作成できます。その際、`project_id`と`subject`は必須項目です。

### トラブルシューティング

- **環境変数の不足エラー**
  - **エラーメッセージ例**: `REDMINE_API_KEY environment variable is not set.`
  - **解決策**: `--url`や`--api-key`フラグを使い、必要な値を直接指定してください。エラーメッセージに`.env`ファイルに関する言及がある場合でも、CLI フラグの使用を推奨します。
- **Node.js/ESM 関連のエラー**
  - Node.js のバージョンが 18 以上であることを確認してください。
- **認証・ネットワークエラー (401, 403 など)**
  - API キーの権限や URL が正しいか、ネットワーク接続に問題がないかを確認してください。
- **Windows 環境での実行問題**
  - ガイドに記載されている`cmd /c npx ...`のような形式でコマンドを実行してみてください。

### セキュリティと権限に関する注意

- API キーは機密情報です。Git のコミット、ログ、共有リポジトリなどに含まれないよう、取り扱いには十分注意してください。
- プロジェクトやチケットの削除など、元に戻せない操作を行う際は、適切な権限があることを再確認し、慎重に実行してください。

### ロードマップ

Redmine API の安定化に伴い、バージョン、チケット関連、Wiki など、さらに多くの機能を追加していく予定です。現在は`stdio`方式のみの対応ですが、将来的には SSE (Server-Sent Events) 方式もサポートし、より便利に使えるように開発を進めていきます。

### ライセンス

MIT
