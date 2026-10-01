import { createFileRoute } from "@tanstack/react-router";
import { addLog, listLogs } from "../../server/job-book";

const NAMES = new Set([
  "Sebastian van Biljon",
  "Siegfried van Biljon",
  "Cindy",
  "Chantelle",
  "Fanie van Biljon",
  "Stanley Johnson",
  "Drickus van Biljon",
  "Jean-Pierre De Fillet",
  "Louis Koekemoer",
  "Tiaan Van Wyk",
  "Damian",
  "Andre",
]);

export const Route = createFileRoute("/api/job-log")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as {
          name?: string;
          password?: string;
          action?: string;
          ws?: string;
          line?: string;
          kind?: string;
        };
        if (!body.name || !NAMES.has(body.name) || body.password !== "Test1234") {
          return Response.json({ error: "Not signed in" }, { status: 401 });
        }
        if (body.action === "add") {
          const line = (body.line || "").trim();
          const ws = (body.ws || "").trim();
          if (!ws || !line) return Response.json({ error: "A job card log needs a WS and one line" }, { status: 400 });
          const entry = addLog({ ws, person: body.name, line, kind: body.kind || "note" });
          return Response.json({ entry, logs: listLogs() });
        }
        return Response.json({ logs: listLogs() });
      },
    },
  },
});
