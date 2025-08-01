import {
  CallToolResult,
  ServerNotification,
  ServerRequest,
  ToolAnnotations,
} from "@modelcontextprotocol/sdk/dist/esm/types.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/dist/esm/shared/protocol.js";
import { z, ZodRawShape, ZodTypeAny } from "zod";

export type McpTool<T extends ZodRawShape> = {
  name: string;
  config: {
    description?: string;
    inputSchema?: T;
    outputSchema?: ZodRawShape;
    annotations?: ToolAnnotations;
  };
  execute: (
    args: z.objectOutputType<T, ZodTypeAny>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ) => CallToolResult | Promise<CallToolResult>;
};
