# MCP for Redmine

This package provides a Model-Context-Protocol (MCP) server for interacting with a Redmine instance. It allows you to use MCP-compatible clients to manage projects, issues, users, and more in Redmine.

## Usage

To run the server, you must provide your Redmine URL and API key as command-line arguments.

### Command

```bash
npx @chspower1/mcp-for-redmine --url <your-redmine-url> --api-key <your-api-key>
```

### Required Arguments

- `-u, --url <url>`: The base URL of your Redmine instance (e.g., `https://my.redmine.org`).
- `-k, --api-key <key>`: Your personal API access key from your Redmine account page.

### Example

```bash
npx @chspower1/mcp-for-redmine --url "https://mycompany.redmine.com" --api-key "a1b2c3d4e5f6g7h8i9j0"
```

The server will start and listen for connections on the default port (3000). You can specify a different port by setting the `PORT` environment variable.

## Development

If you want to contribute to the project or run it from the source code:

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run the development server with the required arguments:
    ```bash
    npm run dev -- --url <your-url> --api-key <your-key>
    ```
