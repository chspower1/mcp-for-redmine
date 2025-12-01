<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | [한국어](./README-ko_kr.md) | [日本語](./README-ja_jp.md) | 简体中文

本项目是一个与 Redmine 交互的 Model-Context-Protocol（MCP）服务器。配合支持 MCP 的客户端，可以轻松管理 Redmine 的项目、问题、用户与工时等。

目前仅支持标准输入/输出 (`stdio`) 方式。

## 使用要求

- Node.js 18 或更高版本
- Redmine API 密钥（来自您 Redmine 账户的个人 API 密钥）

兼容性基线：Redmine 6.0.6

## 开始使用

在各个开发环境中配置 MCP 服务器的方法：

<details>
<summary><b>Cursor</b></summary>

File（左上角）-> Preferences -> Cursor Settings -> MCP & Integrations -> New MCP Server

<b>配置文件</b>：`~/.cursor/mcp.json`（全局）或 `.cursor/mcp.json`（项目级）

📚 <b>文档</b>：[Cursor MCP 文档](https://docs.cursor.com/en/context/mcp)

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

<b>配置文件</b>：

- <b>Windows</b>：`%APPDATA%\\Claude\\claude_desktop_config.json`
- <b>macOS</b>：`~/Library/Application Support/Claude/claude_desktop_config.json`

📚 <b>文档</b>：[Claude Desktop MCP 指南](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)

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

📚 <b>文档</b>：[Claude Code MCP 文档](https://docs.anthropic.com/en/docs/claude-code/mcp)

<b>设置环境变量并运行 CLI</b>：

```bash
# 设置环境变量
export REDMINE_BASE_URL=https://your.redmine.tld
export REDMINE_API_KEY=your_api_key_here

# 添加 MCP 服务器
claude mcp add mcp-for-redmine -- npx -y @chspower1/mcp-for-redmine@latest
```

<b>或直接编辑配置文件</b>：`~/.claude/settings.local.json`

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

<b>配置文件</b>：`~/.gemini/settings.json`（全局）或 `.gemini/settings.json`（项目级）

📚 <b>文档</b>：[Gemini CLI MCP 指南](https://gemini-cli.xyz/docs/en/tools/mcp-server)

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

<b>配置文件</b>：`~/.codex/config.toml`

📚 <b>文档</b>：[OpenAI MCP 文档](https://platform.openai.com/docs/mcp)

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

## 配置选项

服务器按以下优先级读取配置：

<details>
<summary><b>CLI 参数（最高优先级）</b></summary>

- `-u, --url <url>`
- `-k, --api-key <key>`
- `--no-tls-verify` (可选，禁用 TLS 验证)
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

<details><summary><b>环境变量</b></summary>

- `REDMINE_BASE_URL` 或 `REDMINE_URL`
- `REDMINE_API_KEY` 或 `REDMINE_TOKEN`
- `REDMINE_TLS_VERIFY` (可选，设置为 `false` 或 `0` 以禁用 TLS 验证)
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

<details><summary><b>.env 文件值</b></summary>

<b>支持的变量：</b>

- `REDMINE_BASE_URL` 或 `REDMINE_URL` — Redmine 服务器 URL
- `REDMINE_API_KEY` 或 `REDMINE_TOKEN` — Redmine API 密钥
- `REDMINE_TLS_VERIFY` — 设置为 `false` 或 `0` 以禁用 TLS 验证 (可选)
</details>

> [!WARNING] > **安全警告**：禁用 TLS 验证（`REDMINE_TLS_VERIFY=false` 或 `--no-tls-verify`）会使您的连接容易受到中间人（MitM）攻击。请仅在受信任的环境（例如使用自签名证书的内部网络）中使用此选项。切勿在通过互联网连接到公共 Redmine 实例时使用它。

## 主要功能

当前可用的功能如下：

**Stable API**

- **用户 (Users)**: `users_create`, `users_get`, `users_current`, `users_list`, `users_update`, `users_delete`
- **项目 (Projects)**: `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **问题 (Issues)**: `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **工时 (Time Entries)**: `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

**Alpha API**

- **枚举 (Enumerations)**: `enumerations_issue_priorities_list`, `enumerations_time_entry_activities_list`
- **项目成员 (Memberships)**: `memberships_list_project_memberships`, `memberships_get`, `memberships_create`, `memberships_update`, `memberships_delete`
- **问题关系 (Issue Relations)**: `issue_relations_list`, `issue_relations_get`, `issue_relations_create`, `issue_relations_delete`
- **版本 (Versions)**: `versions_list`, `versions_get`, `versions_create`, `versions_update`, `versions_delete`
- **Wiki 页面 (Wiki Pages)**: `wiki_pages_list`, `wiki_pages_get`, `wiki_pages_create_or_update`, `wiki_pages_delete`
- **查询 (Queries)**: `queries_list`
- **文件 (Files)**: `files_list`
- **附件 (Attachments)**: `attachments_get`, `attachments_delete`, `attachments_upload`
- **问题状态 (Issue Statuses)**: `issue_statuses_list`
- **跟踪器 (Trackers)**: `trackers_list`
- **角色 (Roles)**: `roles_list`, `roles_get`
- **群组 (Groups)**: `groups_list`, `groups_get`, `groups_create`, `groups_update`, `groups_delete`, `groups_add_user`, `groups_remove_user`
- **自定义字段 (Custom Fields)**: `custom_fields_list`
- **问题类别 (Issue Categories)**: `issue_categories_list`, `issue_categories_get`, `issue_categories_create`, `issue_categories_update`, `issue_categories_delete`
- **我的账户 (My Account)**: `my_account_get`
- **搜索 (Search)**: `search`

每个功能的详细用法（输入模式）定义在 `src/schema/*.schema.ts` 文件中。执行结果以 JSON 文本返回。

## 通用输入规则 (dev)

- **集合分页**：大多数列表工具支持 `offset`、`limit`（默认 25，最大 100）
- **关联展开**：部分 `get`/`list` 工具支持 `include`（例如 issues 的 `children,attachments,journals,...`）
- **附件上传令牌**：`attachments_upload` 会将 Base64 文件发送至 `/uploads.json` 并返回令牌。该令牌可用于 `issues_create/update` 或 `wiki_pages_create_or_update` 的 `uploads` 字段以关联附件。
- **按工具的扩展字段/约束**：具体约束（如 issue 的 `custom_fields`、`watcher_user_ids` 等）请参考各工具的 `src/schema/*.schema.ts`。

## 问题解决指南

- **配置错误**
  - **错误消息示例**：`❌ Redmine URL is required!` 或 `❌ Redmine API key is required!`
  - **解决方法**：请选择错误消息中显示的配置方法之一。出于安全考虑，推荐使用环境变量。
- **Node.js/ESM 相关错误**
  - 请确认使用的是 Node.js 18 或更高版本。
- **认证与网络错误（401、403 等）**
  - 请检查 API 密钥权限与 URL 是否正确，以及网络连接是否正常。
- **Windows 环境下的执行问题**
  - 可尝试使用指南中的 `cmd /c npx ...` 形式执行。

## 安全与权限说明

- API 密钥属于敏感信息，请避免在 Git 提交、日志或共享仓库中泄露。
- 执行删除项目或问题等不可逆操作时，请再次确认权限并谨慎进行。

## 路线图

计划加强对 beta 端点（如附件上传流程）的支持，增加 SSE（Server‑Sent Events），并完善示例/测试。

## 许可证

MIT
