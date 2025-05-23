# Redmine REST API Documentation

> **Reference date:** 23 May 2025  •  Redmine stable 5.1.8 / devel 6.0.x.
> This file condenses the official Redmine Wiki ([https://www.redmine.org/projects/redmine/wiki/REST_api](https://www.redmine.org/projects/redmine/wiki/REST_api)) into a single Markdown document. Always consult the Wiki’s **API Change history** for the very latest additions or breaking changes.

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [General Conventions](#general-conventions)

   - [Request Headers & Content‑Type](#request-headers--content-type)
   - [Pagination](#pagination)
   - [Including Related Objects](#including-related-objects)
   - [File Upload Workflow](#file-upload-workflow)

4. [Resource Endpoints](#resource-endpoints)

   - [Issues](#issues)
   - [Projects](#projects)
   - [Users](#users)
   - [Time Entries](#time-entries)
   - [Groups](#groups)
   - [Roles](#roles)
   - [Custom Fields](#custom-fields)
   - [Versions](#versions)

5. [cURL Snippets](#curl-snippets)
6. [Change Log & Further Reading](#change-log--further-reading)
7. [License](#license)

---

## API Overview<a id="api-overview"></a>

Redmine exposes a REST‑style interface that returns JSON or XML, selectable via a file‑type extension (`.:format`, e.g. `.json`). Most resources offer full CRUD operations.

| Resource          | Stability | Introduced in |
| ----------------- | --------- | ------------- |
| Issues            | Stable    | 1.0           |
| Projects          | Stable    | 1.0           |
| Users             | Stable    | 1.1           |
| Time Entries      | Stable    | 1.1           |
| Groups            | Alpha     | 2.1           |
| Roles (read‑only) | Stable    | 2.1           |
| Custom Fields     | Stable    | 2.1           |

_Status legend —_ **Stable:** feature‑complete; **Beta:** minor gaps; **Alpha:** may change significantly; **Prototype:** experimental.

---

## Authentication<a id="authentication"></a>

Enable **Administration → Settings → API → Enable REST API**. Two alternatives are available:

| Method                                          | Details                               |
| ----------------------------------------------- | ------------------------------------- |
| **HTTP Basic**                                  | Use your Redmine login + password.    |
| **API Key** (recommended)                       | Provide the key in one of three ways: |
|   – `X-Redmine-API-Key: <key>` header           |                                       |
|   – `?key=<key>` query parameter                |                                       |
|   – Use the key as the _username_ in Basic Auth |                                       |

Administrators can impersonate another user by adding `X-Redmine-Switch-User: <login>`.

---

## General Conventions<a id="general-conventions"></a>

### Request Headers & Content‑Type<a id="request-headers--content-type"></a>

`POST` and `PUT` calls **must** declare a body type (`Content-Type: application/json` or `application/xml`).

### Pagination<a id="pagination"></a>

Collection endpoints return 25 items by default. Control pages with `limit` (max 100) and `offset` parameters. Responses include `total_count`, `limit`, and `offset` fields.

```http
GET /issues.json?offset=50&limit=20
```

### Including Related Objects<a id="including-related-objects"></a>

Fetch associated data in a single call with the `include` query parameter.

```http
GET /issues/296.json?include=journals,attachments
```

Allowed values: `attachments`, `relations`, `journals`, `changesets`, `children`, `watchers`, etc.

### File Upload Workflow<a id="file-upload-workflow"></a>

1. **Upload the binary** to `/uploads.[format]?filename=<name>` (header `Content-Type: application/octet-stream`). The response returns an `<token>`.
2. **Attach the token** inside the create/update body:

```xml
<issue>
  <project_id>1</project_id>
  <subject>API upload example</subject>
  <uploads type="array">
    <upload>
      <token>7167.ed1ccdb0...</token>
      <filename>screenshot.png</filename>
      <description>Sample screenshot</description>
      <content_type>image/png</content_type>
    </upload>
  </uploads>
</issue>
```

---

## Resource Endpoints<a id="resource-endpoints"></a>

All `:id`, `:project_id`, etc. placeholders accept either numeric IDs or _identifier_ strings where supported.

### Issues<a id="issues"></a> ([Wiki page](https://www.redmine.org/projects/redmine/wiki/Rest_Issues))

| Action             | HTTP          | Path                           | Notes / Parameters                                                                                                         |
| ------------------ | ------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| List               | GET           | `/issues.:format`              | Filters: `project_id`, `tracker_id`, `status_id`, `assigned_to_id`, `cf_<id>`, & more; supports `offset`, `limit`, `sort`. |
| Retrieve           | GET           | `/issues/:id.:format`          | `include` for attachments, journals, etc.                                                                                  |
| Create             | POST          | `/issues.:format`              | Body root `issue`. Required: `project_id`, `subject`. Optional: `description`, `tracker_id`, `custom_fields`, `uploads`.   |
| Update             | PUT           | `/issues/:id.:format`          | Body `issue` with fields to change.                                                                                        |
| Delete             | DELETE        | `/issues/:id.:format`          | Returns _204 No Content_.                                                                                                  |
| Add/Remove Watcher | POST / DELETE | `/issues/:id/watchers.:format` | Param `user_id`.                                                                                                           |

### Projects<a id="projects"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_Projects))

| Action               | HTTP   | Path                                   | Notes                                                      |
| -------------------- | ------ | -------------------------------------- | ---------------------------------------------------------- |
| List                 | GET    | `/projects.:format`                    | Supports `offset`, `limit`, `include=repositories` (≥3.4). |
| Retrieve             | GET    | `/projects/:id.:format`                | `include=trackers,issue_categories`.                       |
| Create               | POST   | `/projects.:format`                    | Required: `name`, `identifier`.                            |
| Update               | PUT    | `/projects/:id.:format`                |                                                            |
| Archive / Un‑archive | PUT    | `/projects/:id/archive` / `/unarchive` | Admin only.                                                |
| Delete               | DELETE | `/projects/:id.:format`                | _204 No Content_.                                          |

### Users<a id="users"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_Users))

| Action   | HTTP   | Path                 | Notes                                                                            |
| -------- | ------ | -------------------- | -------------------------------------------------------------------------------- |
| List     | GET    | `/users.:format`     | Admin‑only. Non‑admins use `/users/current.:format`.                             |
| Retrieve | GET    | `/users/:id.:format` |                                                                                  |
| Create   | POST   | `/users.:format`     | `login`, `password` **or** `generate_password`, `firstname`, `lastname`, `mail`. |
| Update   | PUT    | `/users/:id.:format` | e.g. `admin=true/false`.                                                         |
| Delete   | DELETE | `/users/:id.:format` | _204 No Content_.                                                                |

### Time Entries<a id="time-entries"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries))

| Action   | HTTP   | Path                        | Notes                                                        |
| -------- | ------ | --------------------------- | ------------------------------------------------------------ |
| List     | GET    | `/time_entries.:format`     | Filter by project, user, or issue.                           |
| Retrieve | GET    | `/time_entries/:id.:format` |                                                              |
| Create   | POST   | `/time_entries.:format`     | Required: `issue_id` _or_ `project_id`, `hours`, `spent_on`. |
| Update   | PUT    | `/time_entries/:id.:format` |                                                              |
| Delete   | DELETE | `/time_entries/:id.:format` |                                                              |

### Groups<a id="groups"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_Groups)) — _Admin only_

| Action          | HTTP          | Path                        | Notes                          |
| --------------- | ------------- | --------------------------- | ------------------------------ |
| List            | GET           | `/groups.:format`           |                                |
| Create          | POST          | `/groups.:format`           | `name`, optional `user_ids[]`. |
| Retrieve        | GET           | `/groups/:id.:format`       | `include=users,memberships`.   |
| Update          | PUT           | `/groups/:id.:format`       |                                |
| Delete          | DELETE        | `/groups/:id.:format`       | _204 No Content_.              |
| Add/Remove User | POST / DELETE | `/groups/:id/users.:format` | Param `user_id`.               |

### Roles<a id="roles"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_Roles))

| Action   | HTTP | Path                 | Notes                              |
| -------- | ---- | -------------------- | ---------------------------------- |
| List     | GET  | `/roles.:format`     | All roles.                         |
| Retrieve | GET  | `/roles/:id.:format` | Permissions per role. _Read‑only_. |

### Custom Fields<a id="custom-fields"></a>

List all custom fields with `/custom_fields.:format`. When creating or updating entities, pass a `custom_fields` array with `id` and `value` pairs.

### Versions<a id="versions"></a> ([Wiki](https://www.redmine.org/projects/redmine/wiki/Rest_Versions))

| Action                     | HTTP               | Path                                     | Notes                                                                      |
| -------------------------- | ------------------ | ---------------------------------------- | -------------------------------------------------------------------------- |
| List project versions      | GET                | `/projects/:project_id/versions.:format` | Shared versions included.                                                  |
| Create                     | POST               | `/projects/:project_id/versions.:format` | Required: `name`; optional `status`, `sharing`, `due_date`, `description`. |
| Retrieve / Update / Delete | GET / PUT / DELETE | `/versions/:id.:format`                  |                                                                            |

---

## cURL Snippets<a id="curl-snippets"></a>

```bash
# Create an issue (JSON + API key)
curl -X POST \
  -H "X-Redmine-API-Key: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "issue": {
          "project_id": 1,
          "subject": "API test issue",
          "description": "Created via script",
          "tracker_id": 2
        }
      }' \
  https://redmine.example.com/issues.json
```

```bash
# Upload a file and extract the token (XML output)
TOKEN=$(curl -s -X POST \
  -H "X-Redmine-API-Key: <API_KEY>" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @screenshot.png \
  "https://redmine.example.com/uploads.xml?filename=screenshot.png" \
  | xmllint --xpath 'string(//token)' -)
```

---

## Change Log & Further Reading<a id="change-log--further-reading"></a>

- **Developer Guide → REST API → API Change history** — exhaustive revision notes.
- Key milestones: 3.4.0 (_attachments_ with `include`), 4.1.0 (`/my/account`), 5.0.x (`allowed_statuses` on issues), 6.0.x (in‑progress).

---

## License<a id="license"></a>

This file summarizes GPLv2‑licensed documentation from redmine.org and is itself released under the same license. Feel free to use, modify, and redistribute.
