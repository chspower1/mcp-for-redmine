<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | [한국어](./README-ko_kr.md) | 日本語 | [简体中文](./README-zh_cn.md)

このプロジェクトは、Redmine と連携するための Model-Context-Protocol (MCP) サーバーです。MCP 対応クライアントを使用すると、Redmine のプロジェクト、チケット、ユーザー、作業時間を簡単に管理できます。

現在は標準入出力 (`stdio`) のみをサポートしています。

## 利用要件

- Node.js 18 以上
- Redmine API キー (Redmine アカウントの個人 API キー)

互換性の基準: Redmine 6.0.6

## はじめに

各開発環境で MCP サーバーを設定する方法:

<details>
<summary><b>Cursor</b></summary>

File(左上) -> Preferences -> Cursor Settings -> MCP & Integrations -> New MCP Server

<b>設定ファイル</b>: `~/.cursor/mcp.json` (グローバル) または `.cursor/mcp.json` (プロジェクト単位)

📚 <b>ドキュメント</b>: [Cursor MCP 公式ドキュメント](https://docs.cursor.com/en/context/mcp)

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=mcp-for-redmine&config=eyJjb21tYW5kIjoibnB4IC15IEBjaHNwb3dlcjEvbWNwLWZvci1yZWRtaW5lQGxhdGVzdCIsImVudiI6eyJSRURNSU5FX0JBU0VfVVJMIjoiaHR0cHM6Ly95b3VyLnJlZG1pbmUudGxkIiwiUkVETUlORV9BUElfS0VZIjoieW91cl9hcGlfa2V5X2hlcmUifX0%3D)

```json
{
  // Linux / Mac
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
      "env": {
        "REDMINE_BASE_URL": "https://your.redmine.tld",
        "REDMINE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

<b>設定ファイル</b>:

- <b>Windows</b>: `%APPDATA%\\Claude\\claude_desktop_config.json`
- <b>macOS</b>: `~/Library/Application Support/Claude/claude_desktop_config.json`

📚 <b>ドキュメント</b>: [Claude Desktop MCP 公式ガイド](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

```json
{
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
      "env": {
        "REDMINE_BASE_URL": "https://your.redmine.tld",
        "REDMINE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Claude Code</b></summary>

📚 <b>ドキュメント</b>: [Claude Code MCP 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/mcp)

<b>環境変数を設定して CLI を実行</b>:

```bash
# 環境変数を設定
export REDMINE_BASE_URL=https://your.redmine.tld
export REDMINE_API_KEY=your_api_key_here

# MCP サーバーを追加
claude mcp add mcp-for-redmine -- npx -y @chspower1/mcp-for-redmine@latest
```

<b>または設定ファイルを直接編集</b>: `~/.claude/settings.local.json`

```json
{
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
      "env": {
        "REDMINE_BASE_URL": "https://your.redmine.tld",
        "REDMINE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Gemini CLI</b></summary>

<b>設定ファイル</b>: `~/.gemini/settings.json` (グローバル) または `.gemini/settings.json` (プロジェクト単位)

📚 <b>ドキュメント</b>: [Gemini CLI MCP 公式ガイド](https://gemini-cli.xyz/docs/en/tools/mcp-server)

```json
{
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
      "env": {
        "REDMINE_BASE_URL": "https://your.redmine.tld",
        "REDMINE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>OpenAI Codex</b></summary>

<b>設定ファイル</b>: `~/.codex/config.toml`

📚 <b>ドキュメント</b>: [OpenAI MCP 公式ドキュメント](https://platform.openai.com/docs/mcp)

```toml
[[mcp_servers]]
name = "mcp-for-redmine"
command = "npx"
args = ["-y", "@chspower1/mcp-for-redmine@latest"]

[mcp_servers.env]
REDMINE_BASE_URL = "https://your.redmine.tld"
REDMINE_API_KEY = "your_api_key_here"
```

</details>

## 設定オプション

サーバーは次の優先順位で設定を読み込みます:

<details>
<summary><b>CLI 引数 (最優先)</b></summary>

- `-u, --url <url>`
- `-k, --api-key <key>`
- ```json
  {
    "mcpServers": {
      "mcp-for-redmine": {
        "command": "npx",
        "args": [
          "-y",
          "@chspower1/mcp-for-redmine@latest",
          "--url",
          "https://your.redmine.tld",
          "--api-key",
          "YOUR_API_KEY"
        ]
      }
    }
  }
  ```

</details>

<details><summary><b>環境変数</b></summary>

- `REDMINE_BASE_URL` または `REDMINE_URL`
- `REDMINE_API_KEY` または `REDMINE_TOKEN`
- ```json
  {
    "mcpServers": {
      "mcp-for-redmine": {
        "command": "npx",
        "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
        "env": {
          "REDMINE_BASE_URL": "https://your.redmine.tld",
          "REDMINE_API_KEY": "your_api_key_here"
        }
      }
    }
  }
  ```
  </details>

<details><summary><b>.env ファイルの値</b></summary>

<b>サポートされる変数:</b>

- `REDMINE_BASE_URL` または `REDMINE_URL` — Redmine サーバー URL
- `REDMINE_API_KEY` または `REDMINE_TOKEN` — Redmine API キー
</details>

### 主な機能

現在利用可能な機能は以下の通りです。

Stable

- **ユーザー (Users)**: `users_create`, `users_get`, `users_list`, `users_update`, `users_delete`
- **プロジェクト (Projects)**: `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **チケット (Issues)**: `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **作業時間 (Time Entries)**: `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

Alpha

- **列挙 (Enumerations)**: `enumerations_issue_priorities_list`, `enumerations_time_entry_activities_list`
- **プロジェクト メンバーシップ (Memberships)**: `memberships_list_project_memberships`, `memberships_get`, `memberships_create`, `memberships_update`, `memberships_delete`
- **チケット 関連 (Issue Relations)**: `issue_relations_list`, `issue_relations_get`, `issue_relations_create`, `issue_relations_delete`
- **バージョン (Versions)**: `versions_list`, `versions_get`, `versions_create`, `versions_update`, `versions_delete`
- **Wiki ページ (Wiki Pages)**: `wiki_pages_list`, `wiki_pages_get`, `wiki_pages_create_or_update`, `wiki_pages_delete`
- **クエリ (Queries)**: `queries_list`
- **ファイル (Files)**: `files_list`
- **チケット ステータス (Issue Statuses)**: `issue_statuses_list`
- **トラッカー (Trackers)**: `trackers_list`
- **ロール (Roles)**: `roles_list`, `roles_get`
- **グループ (Groups)**: `groups_list`, `groups_get`, `groups_create`, `groups_update`, `groups_delete`, `groups_add_user`, `groups_remove_user`
- **カスタム フィールド (Custom Fields)**: `custom_fields_list`
- **チケット カテゴリ (Issue Categories)**: `issue_categories_list`, `issue_categories_get`, `issue_categories_create`, `issue_categories_update`, `issue_categories_delete`
- **マイ アカウント (My Account)**: `my_account_get`
- **検索 (Search)**: `search`

各ツールの詳細な仕様 (入力スキーマ) は`src/schema/*.schema.ts`ファイルに定義されています。実行結果は JSON 形式のテキストで返されます。

### パラメータ & 規約

- コレクションのページング: 多くの一覧 API は `offset` と `limit` をサポートします (既定 25、最大 100)
- 関連拡張: 一部の `get`/`list` API は `include` をサポートします (例: issues: `children,attachments,journals,...`)
- チケット 作成/更新の拡張:
  - `custom_fields`: `{ id, value }` の配列 (value は文字列または文字列配列)
  - `uploads`: `{ token, filename?, description?, content_type? }` の配列 (`/uploads.json` でトークン取得)
  - `watcher_user_ids`: number[]
  - `done_ratio` (0..100), `private_notes` (ジャーナルの非公開)
- 作業時間: 代理記録用に `user_id` をサポート (権限が必要)
- プロジェクト メンバーシップ: 一覧で `offset`/`limit` をサポート
- チケット カテゴリ: 削除時に `reassign_to_id` をサポート

### 簡単な使用例

- MCP クライアントから`projects_list`を呼び出すと、プロジェクト一覧を JSON 形式で受け取れます。
- `issues_create`を使用すると、新しいチケットを作成できます。その際、`project_id`と`subject`は必須項目です。
- プロジェクト メンバーシップのページング:
  - ツール: `memberships_list_project_memberships`
  - 引数: `{ "projectId": "my-project", "offset": 25, "limit": 50 }`
- チケット カテゴリの削除 (再割当あり):
  - ツール: `issue_categories_delete`
  - 引数: `{ "id": "12", "reassign_to_id": 7 }`

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

今後は、ベータのエンドポイント (例: 添付アップロードフロー) の対応拡充、SSE (Server-Sent Events) の追加、サンプルとテストの充実を進めます。

### ライセンス

MIT
