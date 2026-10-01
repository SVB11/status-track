import { createFileRoute } from "@tanstack/react-router";
import { askInvoice, markGenerated, openNotices } from "../../server/invoice-notes";

const ASK = new Set(["Fanie van Biljon", "Stanley Johnson", "Drickus van Biljon", "Sebastian van Biljon", "Siegfried van Biljon"]);
const MAKE = new Set(["Cindy", "Chantelle", "Sebastian van Biljon", "Siegfried van Biljon"]);

export const Route = createFileRoute("/api/invoice-note")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as {
          name?: string;
          password?: string;
          action?: string;
          id?: string;
          ws?: string;
          number?: string;
          customer?: string;
          salesman?: string;
          excl?: number;
          vat?: number;
          total?: number;
        };
        if (!body.name || body.password !== "Test1234") return Response.json({ error: "Not signed in" }, { status: 401 });
        if (body.action === "add") {
          if (!ASK.has(body.name)) return Response.json({ error: "Only sales can request an invoice" }, { status: 403 });
          if (!body.ws || !body.number) return Response.json({ error: "Need a WS and an invoice number" }, { status: 400 });
          const note = askInvoice({
            ws: body.ws,
            number: body.number,
            customer: body.customer || "",
            salesman: body.salesman || body.name,
            excl: Number(body.excl || 0),
            vat: Number(body.vat || 0),
            total: Number(body.total || 0),
          });
          return Response.json({ note, notices: openNotices() });
        }
        if (body.action === "done") {
          if (!MAKE.has(body.name)) return Response.json({ error: "Only Chantelle or Cindy can generate it" }, { status: 403 });
          if (!body.id) return Response.json({ error: "No notice" }, { status: 400 });
          return Response.json({ notices: markGenerated(body.id) });
        }
        if (!MAKE.has(body.name) && !ASK.has(body.name)) return Response.json({ error: "Not for this desk" }, { status: 403 });
        return Response.json({ notices: openNotices() });
      },
    },
  },
});
