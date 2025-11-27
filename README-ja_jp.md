<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | [한국어](./README-ko_kr.md) | 日本語 | [简体中文](./README-zh_cn.md)

このプロジェクトは、Redmine と連携する Model-Context-Protocol (MCP) サーバーです。MCP 対応クライアントと組み合わせることで、Redmine のプロジェクト、チケット、ユーザー、作業時間を簡単に管理できます。

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
  "mcpServers": {
    "mcp-for-redmine": {
      "command": "npx",
      "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
      "env": {
        "REDMINE_BASE_URL": "https://your.redmine.tld",
        "REDMINE_API_KEY": "your_api_key_here",
        "REDMINE_TLS_VERIFY": "false"
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
        "REDMINE_API_KEY": "your_api_key_here",
        "REDMINE_TLS_VERIFY": "false"
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
        "REDMINE_API_KEY": "your_api_key_here",
        "REDMINE_TLS_VERIFY": "false"
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
        "REDMINE_API_KEY": "your_api_key_here",
        "REDMINE_TLS_VERIFY": "false"
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
REDMINE_TLS_VERIFY = "false"
```

</details>

## 設定オプション

サーバーは次の優先順位で設定を読み込みます:

<details>
<summary><b>CLI 引数 (最優先)</b></summary>

- `-u, --url <url>`
- `-k, --api-key <key>`
- `--no-tls-verify` (任意, TLS 検証を無効化)
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
- `REDMINE_TLS_VERIFY` (任意, `false` または `0` を設定して TLS 検証を無効化)
- ```json
  {
    "mcpServers": {
      "mcp-for-redmine": {
        "command": "npx",
        "args": ["-y", "@chspower1/mcp-for-redmine@latest"],
        "env": {
          "REDMINE_BASE_URL": "https://your.redmine.tld",
          "REDMINE_API_KEY": "your_api_key_here",
          "REDMINE_TLS_VERIFY": "false"
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
- `REDMINE_TLS_VERIFY` — `false` または `0` を設定して TLS 検証を無効化 (任意)
</details>

> [!WARNING] > **セキュリティ警告**: TLS 検証を無効化（`REDMINE_TLS_VERIFY=false` または `--no-tls-verify`）すると、中間者攻撃（MitM）に対して脆弱になります。信頼できる環境（例: 自己署名証明書を使用する内部ネットワーク）でのみ使用してください。インターネット経由で公開 Redmine インスタンスに接続する場合は絶対に使用しないでください。

## 主要機能

現在利用できる機能は次のとおりです。

**Stable API**

- **ユーザー (Users)**: `users_create`, `users_get`, `users_current`, `users_list`, `users_update`, `users_delete`
- **プロジェクト (Projects)**: `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **チケット (Issues)**: `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **作業時間 (Time Entries)**: `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

**Alpha API**

- **列挙 (Enumerations)**: `enumerations_issue_priorities_list`, `enumerations_time_entry_activities_list`
- **プロジェクト メンバーシップ (Memberships)**: `memberships_list_project_memberships`, `memberships_get`, `memberships_create`, `memberships_update`, `memberships_delete`
- **チケット関連 (Issue Relations)**: `issue_relations_list`, `issue_relations_get`, `issue_relations_create`, `issue_relations_delete`
- **バージョン (Versions)**: `versions_list`, `versions_get`, `versions_create`, `versions_update`, `versions_delete`
- **Wiki ページ (Wiki Pages)**: `wiki_pages_list`, `wiki_pages_get`, `wiki_pages_create_or_update`, `wiki_pages_delete`
- **クエリ (Queries)**: `queries_list`
- **ファイル (Files)**: `files_list`
- **添付 (Attachments)**: `attachments_get`, `attachments_delete`, `attachments_upload`
- **チケットステータス (Issue Statuses)**: `issue_statuses_list`
- **トラッカー (Trackers)**: `trackers_list`
- **ロール (Roles)**: `roles_list`, `roles_get`
- **グループ (Groups)**: `groups_list`, `groups_get`, `groups_create`, `groups_update`, `groups_delete`, `groups_add_user`, `groups_remove_user`
- **カスタムフィールド (Custom Fields)**: `custom_fields_list`
- **チケットカテゴリ (Issue Categories)**: `issue_categories_list`, `issue_categories_get`, `issue_categories_create`, `issue_categories_update`, `issue_categories_delete`
- **マイアカウント (My Account)**: `my_account_get`
- **検索 (Search)**: `search`

各機能の詳細な使い方（入力スキーマ）は `src/schema/*.schema.ts` に定義されています。実行結果は JSON 形式のテキストで返されます。

## 共通入力ルール (dev)

- **コレクションのページング**: 多くの一覧ツールは `offset`, `limit` をサポートします（既定 25、最大 100）
- **関連の展開**: 一部の `get`/`list` ツールは `include` をサポートします（例: issues の `children,attachments,journals,...`）
- **添付アップロードトークン**: `attachments_upload` は Base64 ファイルを `/uploads.json` に送信してトークンを返します。このトークンは `issues_create/update` や `wiki_pages_create_or_update` の `uploads` フィールドで使用し、添付を関連付けできます。
- **ツールごとの拡張項目/制約**: 具体的な制約（例: issue の `custom_fields`, `watcher_user_ids` など）は各ツールのスキーマ（`src/schema/*.schema.ts`）を参照してください。

## トラブルシューティングガイド

- **設定エラー**
  - **エラーメッセージ例**: `❌ Redmine URL is required!` または `❌ Redmine API key is required!`
  - **解決方法**: エラーメッセージに表示される複数の設定方法のいずれかを選んで使用してください。セキュリティのため、環境変数の使用を推奨します。
- **Node.js/ESM 関連のエラー**
  - Node.js 18 以上を使用しているか確認してください。
- **認証およびネットワークエラー（401, 403 など）**
  - API キーの権限や URL が正しいか、ネットワークに問題がないか確認してください。
- **Windows 環境での実行問題**
  - ガイドにある `cmd /c npx ...` の形式で実行してみてください。

## セキュリティと権限について

- API キーは機密情報です。Git のコミット、ログ、共有リポジトリなどに露出しないよう注意してください。
- プロジェクトやチケットの削除など、取り消せない操作を行う際は、必要な権限を再確認し慎重に実行してください。

## ロードマップ

ベータのエンドポイント（例: 添付アップロードフロー）の対応強化、SSE（Server-Sent Events）の追加、サンプル/テストの充実を予定しています。

## ライセンス

MIT
