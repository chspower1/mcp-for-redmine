<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | [한국어](./README-ko_kr.md) | [日本語](./README-ja_jp.md) | 简体中文

本项目是一个用于与 Redmine 交互的 Model-Context-Protocol (MCP) 服务器。通过兼容 MCP 的客户端，您可以轻松管理 Redmine 中的项目、问题、用户和工时等信息。

目前，服务器仅支持标准输入/输出 (`stdio`) 传输方式。

### 使用要求

- Node.js 18 或更高版本
- Redmine API 密钥 (您 Redmine 账户中的个人 API 密钥)

### 快速入门

您可以使用以下命令快速启动服务器。

```bash
npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key <YOUR_API_KEY>
```

### MCP 客户端集成示例

您可以将此服务器添加到您的 MCP 客户端中，示例如下：

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

**使用 MCP Inspector 进行测试**

```bash
npx -y @modelcontextprotocol/inspector npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key YOUR_API_KEY
```

### 配置方法

服务器仅支持通过 CLI 标志进行配置。

- **CLI 标志**
  - `-u, --url <url>`
  - `-k, --api-key <key>`

**请注意**: 该服务器仅通过 `stdio` 方式运行，不支持独立的端口或 HTTP/SSE 配置。

### 主要功能

目前可用的功能如下：

- **用户 (Users)**
  - `users_create`, `users_get`, `users_list`, `users_update`, `users_delete`
- **项目 (Projects)**
  - `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **问题 (Issues)**
  - `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **工时 (Time Entries)**
  - `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

每个功能的详细使用说明 (输入模式) 定义在 `src/schema/*.schema.ts` 文件中。执行结果将以 JSON 格式的文本返回。

### 简单使用示例

- 您可以从 MCP 客户端调用 `projects_list` 来获取项目列表，结果将以 JSON 格式返回。
- 使用 `issues_create` 可以创建新问题，至少需要提供 `project_id` 和 `subject`。

### 问题排查指南

- **缺少环境变量错误**
  - **错误消息示例**: `REDMINE_API_KEY environment variable is not set.`
  - **解决方案**: 请使用 `--url` 和 `--api-key` 标志直接传递所需的值。尽管某些错误消息可能提及 `.env` 文件，但我们推荐使用 CLI 标志。
- **Node.js/ESM 相关错误**
  - 请确保您使用的是 Node.js 18 或更高版本。
- **身份验证及网络错误 (如 401, 403)**
  - 请检查您的 API 密钥权限、URL 是否正确以及网络连接是否正常。
- **Windows 环境下的执行问题**
  - 请尝试使用指南中提到的 `cmd /c npx ...` 格式来执行命令。

### 安全与权限说明

- API 密钥是敏感信息，请务必小心保管，避免在 Git 提交、日志或共享存储库中泄露。
- 在执行删除项目或问题等不可逆操作时, 请再次确认您拥有相应权限，并谨慎操作。

### 路线图

随着 Redmine API 的稳定，我们计划添加更多功能，如版本、问题关系、Wiki 等。目前仅支持 `stdio` 方式，未来我们计划增加对 SSE (Server-Sent Events) 方式的支持，以提升其可用性。

### 许可证

MIT
