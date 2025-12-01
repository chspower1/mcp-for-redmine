<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine · [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

English | [한국어](./README-ko_kr.md) | [日本語](./README-ja_jp.md) | [简体中文](./README-zh_cn.md)

This project is a Model-Context-Protocol (MCP) server for interacting with Redmine. With an MCP-compatible client, you can easily manage Redmine projects, issues, users, and time entries.

Currently, only the standard input/output (`stdio`) transport is supported.

## Requirements

- Node.js 18 or higher
- Redmine API key (your personal API key from your Redmine account)

Compatibility baseline: Redmine 6.0.6

## Getting Started

How to configure the MCP server for each environment:

<details>
<summary><b>Cursor</b></summary>

File (top-left) -> Preferences -> Cursor Settings -> MCP & Integrations -> New MCP Server

<b>Config file</b>: `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per-project)

📚 <b>Docs</b>: [Cursor MCP documentation](https://docs.cursor.com/en/context/mcp)

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=mcp-for-redmine&config=eyJjb21tYW5kIjoibnB4IC15IEBjaHNwb3dlcjEvbWNwLWZvci1yZWRtaW5lQGxhdGVzdCIsImVudiI6eyJSRURNSU5FX0JBU0VfVVJMIjoiaHR0cHM6Ly95b3VyLnJlZG1pbmUudGxkIiwiUkVETUlORV9BUElfS0VZIjoieW91cl9hcGlfa2V5X2hlcmUifX0%3D)

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
<summary><b>Claude Desktop</b></summary>

<b>Config files</b>:

- <b>Windows</b>: `%APPDATA%\Claude\claude_desktop_config.json`
- <b>macOS</b>: `~/Library/Application Support/Claude/claude_desktop_config.json`

📚 <b>Docs</b>: [Claude Desktop MCP guide](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

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

📚 <b>Docs</b>: [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)

<b>Set environment variables and run CLI</b>:

```bash
# Set environment variables
export REDMINE_BASE_URL=https://your.redmine.tld
export REDMINE_API_KEY=your_api_key_here

# Add MCP server
claude mcp add mcp-for-redmine -- npx -y @chspower1/mcp-for-redmine@latest
```

<b>Or edit the settings file directly</b>: `~/.claude/settings.local.json`

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

<b>Config file</b>: `~/.gemini/settings.json` (global) or `.gemini/settings.json` (per-project)

📚 <b>Docs</b>: [Gemini CLI MCP guide](https://gemini-cli.xyz/docs/en/tools/mcp-server)

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

<b>Config file</b>: `~/.codex/config.toml`

📚 <b>Docs</b>: [OpenAI MCP documentation](https://platform.openai.com/docs/mcp)

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

## Configuration Options

The server reads configuration in the following priority:

<details>
<summary><b>CLI flags (highest priority)</b></summary>

- `-u, --url <url>`
- `-k, --api-key <key>`
- `--no-tls-verify` (optional, disable TLS verification)
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

<details><summary><b>Environment variables</b></summary>

- `REDMINE_BASE_URL` or `REDMINE_URL`
- `REDMINE_API_KEY` or `REDMINE_TOKEN`
- `REDMINE_TLS_VERIFY` (optional, set to `false` or `0` to disable TLS verification)
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

<details><summary><b>.env file values</b></summary>

<b>Supported variables:</b>

- `REDMINE_BASE_URL` or `REDMINE_URL` — Redmine server URL
- `REDMINE_API_KEY` or `REDMINE_TOKEN` — Redmine API key
- `REDMINE_TLS_VERIFY` — Set to `false` or `0` to disable TLS verification (optional)
</details>

> [!WARNING] > **Security Warning**: Disabling TLS verification (`REDMINE_TLS_VERIFY=false` or `--no-tls-verify`) makes your connection vulnerable to Man-in-the-Middle (MitM) attacks. Only use this option in trusted environments (e.g., internal networks with self-signed certificates). Never use it when connecting to public Redmine instances over the internet.

## Key Features

Currently available tools:

**Stable API**

- **Users**: `users_create`, `users_get`, `users_current`, `users_list`, `users_update`, `users_delete`
- **Projects**: `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **Issues**: `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **Time Entries**: `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

**Alpha API**

- **Enumerations**: `enumerations_issue_priorities_list`, `enumerations_time_entry_activities_list`
- **Memberships**: `memberships_list_project_memberships`, `memberships_get`, `memberships_create`, `memberships_update`, `memberships_delete`
- **Issue Relations**: `issue_relations_list`, `issue_relations_get`, `issue_relations_create`, `issue_relations_delete`
- **Versions**: `versions_list`, `versions_get`, `versions_create`, `versions_update`, `versions_delete`
- **Wiki Pages**: `wiki_pages_list`, `wiki_pages_get`, `wiki_pages_create_or_update`, `wiki_pages_delete`
- **Queries**: `queries_list`
- **Files**: `files_list`
- **Attachments**: `attachments_get`, `attachments_delete`, `attachments_upload`
- **Issue Statuses**: `issue_statuses_list`
- **Trackers**: `trackers_list`
- **Roles**: `roles_list`, `roles_get`
- **Groups**: `groups_list`, `groups_get`, `groups_create`, `groups_update`, `groups_delete`, `groups_add_user`, `groups_remove_user`
- **Custom Fields**: `custom_fields_list`
- **Issue Categories**: `issue_categories_list`, `issue_categories_get`, `issue_categories_create`, `issue_categories_update`, `issue_categories_delete`
- **My Account**: `my_account_get`
- **Search**: `search`

The input schema for each tool is defined in `src/schema/*.schema.ts`. Results are returned as JSON-formatted text.

## Common Input Rules (dev)

- **Collection pagination**: most list tools support `offset` and `limit` (default 25, max 100)
- **Association expansion**: some `get`/`list` tools support `include` (e.g., issues: `children,attachments,journals,...`)
- **Attachment upload token**: `attachments_upload` sends a Base64 file to `/uploads.json` and returns a token. Use this token in the `uploads` field of `issues_create/update` or `wiki_pages_create_or_update` to associate attachments.
- **Tool-specific extras/constraints**: for detailed constraints (e.g., issue `custom_fields`, `watcher_user_ids`, etc.), see each tool’s schema in `src/schema/*.schema.ts`.

## Troubleshooting Guide

- **Configuration errors**
  - **Example messages**: `❌ Redmine URL is required!` or `❌ Redmine API key is required!`
  - **How to fix**: Choose one of the configuration methods shown in the error message. For security, environment variables are recommended.
- **Node.js/ESM-related errors**
  - Ensure you are using Node.js 18 or higher.
- **Authentication and network errors (401, 403, etc.)**
  - Verify your API key permissions and URL, and check for network issues.
- **Execution issues on Windows**
  - Try running with `cmd /c npx ...` as shown in the guide.

## Security & Permissions

- API keys are sensitive; avoid exposing them in Git commits, logs, or shared repositories.
- For irreversible actions like deleting projects or issues, double-check permissions and proceed carefully.

## Roadmap

We plan to deepen coverage of beta endpoints (e.g., attachment upload flows), add SSE (Server-Sent Events), and enhance examples/tests.

## License

MIT
