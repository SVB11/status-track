import { createFileRoute } from "@tanstack/react-router";
import {
  addLog,
  addTask,
  approveJobA,
  clearDiscount,
  clearOffer,
  issueOrder,
  issueQuote,
  loadCard,
  logQuote,
  markInvoice,
  openJob,
  openJobA,
  requestInvoice,
  saveOffer,
  setCost,
  setStatus,
  setTask,
  staffByName,
  submitQuote,
  view,
} from "../../server/yard-book";

export const Route = createFileRoute("/api/yard")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as Record<string, string | number>;
        const name = String(body.name || "");
        const person = staffByName(name);
        if (!person || body.password !== "Test1234") return Response.json({ error: "Wrong name or password" }, { status: 401 });
        try {
          const action = String(body.action || "list");
          if (action === "load") loadCard(name, String(body.ws || ""));
          else if (action === "quote") submitQuote(name, { ws: String(body.ws || ""), customer: String(body.customer || ""), phone: String(body.phone || ""), address: String(body.address || ""), email: String(body.email || ""), vatNo: String(body.vatNo || ""), tradeIn: Number(body.tradeIn || 0), extra: String(body.extra || ""), extraRate: Number(body.extraRate || 0), discount: Number(body.discount || 0), crossBorder: body.crossBorder === "1" || body.crossBorder === 1 });
          else if (action === "issue") issueQuote(name, String(body.ws || ""));
          else if (action === "clear-discount") clearDiscount(name, String(body.ws || ""));
          else if (action === "offer") saveOffer(name, { ws: String(body.ws || ""), selling: Number(body.selling || 0), profit: Number(body.profit || 0), estimated: Number(body.estimated || 0) });
          else if (action === "clear-offer") clearOffer(name, String(body.ws || ""));
          else if (action === "job-a") openJobA(name, String(body.ws || ""));
          else if (action === "approve-a") approveJobA(name, String(body.ws || ""));
          else if (action === "board") logQuote(name, Number(body.id), String(body.result || ""));
          else if (action === "invoice") requestInvoice(name, String(body.ws || ""), String(body.customer || ""));
          else if (action === "invoice-done") markInvoice(name, String(body.id || ""));
          else if (action === "job") openJob(name, { ws: String(body.ws || ""), quoteNo: String(body.quoteNo || ""), client: String(body.client || ""), vin: String(body.vin || ""), reg: String(body.reg || ""), priority: String(body.priority || "Normal"), due: String(body.due || ""), instruction: String(body.instruction || "") });
          else if (action === "status") setStatus(name, String(body.ws || ""), String(body.status || ""));
          else if (action === "task") setTask(name, Number(body.id), String(body.status || ""), String(body.note || ""));
          else if (action === "add-task") addTask(name, String(body.ws || ""), String(body.task || ""));
          else if (action === "log") addLog(name, String(body.ws || ""), String(body.line || ""));
          else if (action === "order") issueOrder(name, { ws: String(body.ws || ""), responsible: String(body.responsible || ""), supplier: String(body.supplier || ""), qty: Number(body.qty || 1), item: String(body.item || ""), quotedExcl: Number(body.quotedExcl || 0), notes: String(body.notes || "") });
          else if (action === "cost") setCost(name, Number(body.id), { supplier: String(body.supplier || ""), description: String(body.description || ""), unitPrice: Number(body.unitPrice || 0), qty: Number(body.qty || 0), inv: String(body.inv || "") });
          return Response.json(view(person.role, name));
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : "Not saved" }, { status: 400 });
        }
      },
    },
  },
});
