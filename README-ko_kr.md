<div align="center">
    <img src="./assets/cover.png" alt="MCP-FOR-REDMINE" />
</div>

# MCP-For-Redmine &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)

[English](./README.md) | 한국어 | [日本語](./README-ja_jp.md) | [简体中文](./README-zh_cn.md)

이 프로젝트는 Redmine과 상호작용하는 Model-Context-Protocol(MCP) 서버입니다. MCP를 지원하는 클라이언트와 함께라면 Redmine의 프로젝트, 이슈, 사용자, 작업 시간 등을 손쉽게 관리할 수 있습니다.

현재는 표준 입력/출력(`stdio`) 방식만 지원하고 있습니다.

### 사용 요구사항

- Node.js 18 이상 버전
- Redmine API 키 (Redmine 계정의 개인 API 키)

### 빠른 시작

아래 명령어를 사용하면 바로 서버를 실행해 볼 수 있어요.

```bash
npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key <YOUR_API_KEY>
```

### MCP 클라이언트 연동 예시

사용하시는 MCP 클라이언트에 아래와 같이 서버를 등록할 수 있습니다.

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

**MCP Inspector로 테스트하기**

```bash
npx -y @modelcontextprotocol/inspector npx -y @chspower1/mcp-for-redmine --url https://your.redmine.tld --api-key YOUR_API_KEY
```

### 설정 방법

서버 설정은 CLI 플래그를 통해서만 가능합니다.

- **CLI 플래그**
  - `-u, --url <url>`
  - `-k, --api-key <key>`

**참고**: 이 서버는 `stdio` 방식으로만 동작하며, 별도의 포트나 HTTP/SSE 설정은 지원하지 않습니다.

### 주요 기능

현재 사용할 수 있는 기능은 다음과 같습니다.

- **사용자(Users)**
  - `users_create`, `users_get`, `users_list`, `users_update`, `users_delete`
- **프로젝트(Projects)**
  - `projects_list`, `projects_get`, `projects_create`, `projects_update`, `projects_archive`, `projects_unarchive`, `projects_delete`
- **이슈(Issues)**
  - `issues_list`, `issues_get`, `issues_create`, `issues_update`, `issues_delete`
- **작업 시간(Time Entries)**
  - `time_entries_list`, `time_entries_get`, `time_entries_create`, `time_entries_update`, `time_entries_delete`

각 기능별 상세한 사용법(입력 스키마)은 `src/schema/*.schema.ts` 파일에 정의되어 있습니다. 실행 결과는 JSON 형식의 텍스트로 제공됩니다.

### 간단한 사용 예시

- MCP 클라이언트에서 `projects_list`를 호출하여 프로젝트 목록을 받아볼 수 있습니다. 결과는 JSON 형식으로 전달됩니다.
- `issues_create`를 사용해 새로운 이슈를 만들 수 있습니다. `project_id`와 `subject`는 필수로 입력해야 합니다.

### 문제 해결 가이드

- **환경변수 설정 오류**
  - **오류 메시지 예시**: `REDMINE_API_KEY environment variable is not set.`
  - **해결 방법**: `--url`, `--api-key` 플래그를 사용해 필요한 값을 직접 전달해주세요. 오류 메시지에 `.env` 파일이 언급될 수 있지만, CLI 플래그 사용을 권장합니다.
- **Node.js/ESM 관련 오류**
  - Node.js 18 이상 버전을 사용하고 있는지 확인해주세요.
- **인증 및 네트워크 오류 (401, 403 등)**
  - API 키의 권한과 URL이 올바른지, 네트워크 연결에 문제가 없는지 확인해보세요.
- **Windows 환경에서의 실행 문제**
  - 가이드에 안내된 `cmd /c npx ...` 와 같은 방식으로 실행해보세요.

### 보안 및 권한 안내

- API 키는 민감한 정보이므로, Git 커밋, 로그, 공유 저장소 등에 노출되지 않도록 각별히 주의해주세요.
- 프로젝트나 이슈 삭제와 같이 되돌릴 수 없는 작업을 수행할 때는, 필요한 권한을 가지고 있는지 다시 한번 확인하고 신중하게 실행해주세요.

### 로드맵

Redmine API가 안정화되는 대로 버전, 이슈 관계, 위키 등 더 많은 기능들을 추가해 나갈 계획입니다. 현재는 `stdio` 방식만 지원하지만, 앞으로 SSE(Server-Sent Events) 방식도 지원하여 활용도를 높일 예정입니다.

### 라이선스

MIT
