import { createFileRoute } from "@tanstack/react-router";
import { acceptCard, addExtra, addPart, approveExtra, approveShowroom, bookWash, confirmMorning, createCard, deliver, listCards, lockPart, markReady, signPdi, stampTask, TYPES } from "../../server/job-cards";

const PEOPLE = new Set(["Sebastian van Biljon", "Siegfried van Biljon", "Cindy", "Chantelle", "Fanie van Biljon", "Stanley Johnson", "Drickus van Biljon", "Calvin Kempenaar", "Rob Ling", "Jean-Pierre De Fillet", "Louis Koekemoer", "Tiaan Van Wyk", "Damian", "Andre", "Tanita van Biljon", "William"]);

export const Route = createFileRoute("/api/job-card")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as Record<string, string | number | string[]>;
        const name = String(body.name || "");
        if (!PEOPLE.has(name) || body.password !== "Test1234") return Response.json({ error: "Not signed in" }, { status: 401 });
        try {
          const action = String(body.action || "list");
          if (action === "create") createCard(name, { kind: body.kind === "showroom" ? "showroom" : "sold", ws: String(body.ws || ""), make: String(body.make || ""), year: String(body.year || ""), type: String(body.type || ""), subType: String(body.subType || ""), vin: String(body.vin || ""), reg: String(body.reg || ""), quoteNo: String(body.quoteNo || ""), client: String(body.client || ""), priority: String(body.priority || "Normal"), due: String(body.due || ""), tasks: Array.isArray(body.tasks) ? body.tasks.map(String) : [] });
          else if (action === "approve") approveShowroom(name, String(body.id || ""));
          else if (action === "accept") acceptCard(name, String(body.id || ""));
          else if (action === "task") stampTask(name, String(body.id || ""), Number(body.taskId), { status: String(body.status || ""), note: String(body.note || ""), location: String(body.location || ""), provider: String(body.provider || ""), date: String(body.date || "") });
          else if (action === "extra") addExtra(name, String(body.id || ""), String(body.task || ""));
          else if (action === "approve-extra") approveExtra(name, String(body.id || ""), Number(body.taskId));
          else if (action === "part") addPart(name, String(body.id || ""), String(body.item || ""), Number(body.qty || 1));
          else if (action === "lock") lockPart(name, String(body.id || ""), Number(body.partId), String(body.status || "Ordered"), String(body.inv || ""), Number(body.price || 0));
          else if (action === "pdi") signPdi(name, String(body.id || ""), body.side === "workshop" ? "workshop" : "sales", body.pass !== "0");
          else if (action === "ready") markReady(name, String(body.id || ""), body.side === "workshop" ? "workshop" : "sales");
          else if (action === "deliver") deliver(name, String(body.id || ""));
          else if (action === "wash") bookWash(name, String(body.ws || ""), String(body.note || ""));
          else if (action === "morning") confirmMorning(name, String(body.id || ""));
          return Response.json({ ...listCards(), types: TYPES });
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : "Not saved" }, { status: 400 });
        }
      },
    },
  },
});
