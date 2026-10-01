import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, _ as createFileRoute, b as require_jsx_runtime, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C1NT6qGI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Bt9c3QJT.css";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Status Track" },
			{
				name: "theme-color",
				content: "#141b22"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/brand/status-logo.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,640&family=Source+Sans+3:wght@400;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter = () => import("./routes-DdgHl1-e.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var file$2 = join(process.cwd(), "data", "invoice-notes.json");
var notes = [];
var ready$1 = false;
var seq$1 = 1;
function load$1() {
	if (ready$1) return;
	ready$1 = true;
	try {
		const raw = JSON.parse(readFileSync(file$2, "utf8"));
		if (Array.isArray(raw)) notes = raw;
		for (const note of notes) {
			const n = Number(String(note.id).replace(/\D/g, ""));
			if (n >= seq$1) seq$1 = n + 1;
		}
	} catch {
		notes = [];
	}
}
function save$1() {
	try {
		mkdirSync(join(process.cwd(), "data"), { recursive: true });
		writeFileSync(file$2, JSON.stringify(notes));
	} catch {}
}
function openNotices() {
	load$1();
	return notes.filter((note) => note.status === "Requested");
}
function askInvoice(input) {
	load$1();
	const note = {
		...input,
		id: "inv-" + seq$1++,
		at: (/* @__PURE__ */ new Date()).toISOString(),
		status: "Requested"
	};
	notes = [note, ...notes];
	save$1();
	return note;
}
function markGenerated(id) {
	load$1();
	notes = notes.map((note) => note.id === id ? {
		...note,
		status: "Generated"
	} : note);
	save$1();
	return openNotices();
}
var ASK = /* @__PURE__ */ new Set([
	"Fanie van Biljon",
	"Stanley Johnson",
	"Drickus van Biljon",
	"Sebastian van Biljon",
	"Siegfried van Biljon"
]);
var MAKE = /* @__PURE__ */ new Set([
	"Cindy",
	"Chantelle",
	"Sebastian van Biljon",
	"Siegfried van Biljon"
]);
var Route$2 = createFileRoute("/api/invoice-note")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json().catch(() => ({}));
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
			total: Number(body.total || 0)
		});
		return Response.json({
			note,
			notices: openNotices()
		});
	}
	if (body.action === "done") {
		if (!MAKE.has(body.name)) return Response.json({ error: "Only Chantelle or Cindy can generate it" }, { status: 403 });
		if (!body.id) return Response.json({ error: "No notice" }, { status: 400 });
		return Response.json({ notices: markGenerated(body.id) });
	}
	if (!MAKE.has(body.name) && !ASK.has(body.name)) return Response.json({ error: "Not for this desk" }, { status: 403 });
	return Response.json({ notices: openNotices() });
} } } });
var file$1 = join(process.cwd(), "data", "job-logs.json");
var entries = [];
var loaded$1 = false;
var seq = 1;
function load() {
	if (loaded$1) return;
	loaded$1 = true;
	try {
		const raw = JSON.parse(readFileSync(file$1, "utf8"));
		if (Array.isArray(raw)) entries = raw;
		for (const entry of entries) {
			const n = Number(String(entry.id).replace(/\D/g, ""));
			if (n >= seq) seq = n + 1;
		}
	} catch {
		entries = [];
	}
}
function save() {
	try {
		mkdirSync(join(process.cwd(), "data"), { recursive: true });
		writeFileSync(file$1, JSON.stringify(entries));
	} catch {}
}
function listLogs() {
	load();
	return entries;
}
function addLog(input) {
	load();
	const entry = {
		id: "log-" + seq++,
		ws: input.ws,
		person: input.person,
		line: input.line.trim(),
		kind: input.kind || "note",
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
	entries = [entry, ...entries];
	save();
	return entry;
}
var NAMES = /* @__PURE__ */ new Set([
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
	"Andre"
]);
var Route$1 = createFileRoute("/api/job-log")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json().catch(() => ({}));
	if (!body.name || !NAMES.has(body.name) || body.password !== "Test1234") return Response.json({ error: "Not signed in" }, { status: 401 });
	if (body.action === "add") {
		const line = (body.line || "").trim();
		const ws = (body.ws || "").trim();
		if (!ws || !line) return Response.json({ error: "A job card log needs a WS and one line" }, { status: 400 });
		const entry = addLog({
			ws,
			person: body.name,
			line,
			kind: body.kind || "note"
		});
		return Response.json({
			entry,
			logs: listLogs()
		});
	}
	return Response.json({ logs: listLogs() });
} } } });
var stock_default = /*#__PURE__*/ JSON.parse("[{\"ws\":\"WS5617SL\",\"year\":\"2018\",\"make\":\"AFRIT\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"ADV18863AJ25T0464 ADV18863AJ26T0465\",\"engine\":\"N/A\",\"reg\":\"JLY519MP JLY528MP\",\"tag\":\"TRAILER\",\"priceExcl\":425000,\"sentence\":\"1 x Used 2018 AFRIT INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5619SL\",\"year\":\"2018\",\"make\":\"AFRIT\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"ADV18863AJ09T0448 ADV18863AJ10T0449\",\"engine\":\"N/A\",\"reg\":\"JLX489MP JLX487MP\",\"tag\":\"TRAILER\",\"priceExcl\":425000,\"sentence\":\"1 x Used 2018 AFRIT INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5666\",\"year\":\"2021\",\"make\":\"AFRIT\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"ADV19773AM05T0628 ADV19773AM06T0629\",\"engine\":\"N/A\",\"reg\":\"JX61RYGP JX61SCGP\",\"tag\":\"TRAILER\",\"priceExcl\":550000,\"sentence\":\"1 x Used 2021 AFRIT INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5647\",\"year\":\"2023\",\"make\":\"EURO LPG\",\"model\":\"\",\"description\":\"60m³ LPG TANKER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"NR9DYZ010NT012053\",\"engine\":\"N/A\",\"reg\":\"LC03NZGP\",\"tag\":\"TANKER\",\"priceExcl\":2300000,\"sentence\":\"1 x Used 2023 EURO LPG 0 60m³ LPG TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5656\",\"year\":\"2024\",\"make\":\"FAW\",\"model\":\"28-500FT\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAULICS STANDARD\",\"km\":\"98 956KM\",\"vin\":\"AAK2850FTRB064474\",\"engine\":\"CA6DM350E554049082\",\"reg\":\"MK78VKGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":950000,\"sentence\":\"1 x Used 2024 FAW 28-500FT 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5538SL\",\"year\":\"2007\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING\",\"km\":\"N/A\",\"vin\":\"AC9503AA87ACV1889\",\"engine\":\"N/A\",\"reg\":\"HS89FHGP\",\"tag\":\"TANKER\",\"priceExcl\":795000,\"sentence\":\"1 x Used 2007 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5631SL\",\"year\":\"2010\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"SINGLE FMC METERS, PUMP\",\"km\":\"N/A\",\"vin\":\"AC9593AA80CCV1747\",\"engine\":\"N/A\",\"reg\":\"DR12GSGP\",\"tag\":\"TANKER\",\"priceExcl\":1025000,\"sentence\":\"1 x Used 2010 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5339WMS\",\"year\":\"2012\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM\",\"km\":\"N/A\",\"vin\":\"AC9FT5002CACV1222\",\"engine\":\"N/A\",\"reg\":\"FXC968MP\",\"tag\":\"TANKER\",\"priceExcl\":1150000,\"sentence\":\"1 x Used 2012 GRW TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5511SL-S3P052\",\"year\":\"2012\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"FMC METERS & PUMP\",\"km\":\"N/A\",\"vin\":\"AC9FT5002CACV1072\",\"engine\":\"N/A\",\"reg\":\"CX63DTGP\",\"tag\":\"TANKER\",\"priceExcl\":1195000,\"sentence\":\"1 x Used 2012 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5410SL\",\"year\":\"2015\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"SINGLE FMC METING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AC9FT5002FBCV1126\",\"engine\":\"N/A\",\"reg\":\"KZ01SGGP\",\"tag\":\"TANKER\",\"priceExcl\":1395000,\"sentence\":\"1 x Used 2015 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5630RL\",\"year\":\"2015\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING\",\"km\":\"N/A\",\"vin\":\"AC9FT5002FBCV1023\",\"engine\":\"N/A\",\"reg\":\"LC34JFGP\",\"tag\":\"TANKER\",\"priceExcl\":995000,\"sentence\":\"1 x Used 2015 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5613SL\",\"year\":\"2016\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING\",\"km\":\"N/A\",\"vin\":\"ACGFT5002GA001449\",\"engine\":\"N/A\",\"reg\":\"FJ64LPGP\",\"tag\":\"TANKER\",\"priceExcl\":1095000,\"sentence\":\"1 x Used 2016 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5636SL\",\"year\":\"2018\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BARTEC - 5 COMP\",\"km\":\"N/A\",\"vin\":\"ACGFT5008JA002279\",\"engine\":\"N/A\",\"reg\":\"JDG640EC\",\"tag\":\"TANKER\",\"priceExcl\":1950000,\"sentence\":\"1 x Used 2018 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5594SL\",\"year\":\"2020\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"FMC METERS, PUMP\",\"km\":\"N/A\",\"vin\":\"ACGFT5009LA003480\",\"engine\":\"N/A\",\"reg\":\"JP49JGGP\",\"tag\":\"TANKER\",\"priceExcl\":1695000,\"sentence\":\"1 x Used 2020 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5658\",\"year\":\"2020\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BARTEC VOLU SYSTEM\",\"km\":\"N/A\",\"vin\":\"0\",\"engine\":\"N/A\",\"reg\":\"LT95GVGP\",\"tag\":\"TANKER\",\"priceExcl\":2025000,\"sentence\":\"1 x Used 2020 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5628SL\",\"year\":\"2021\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING - SINGLE LINE - 4 COMP\",\"km\":\"N/A\",\"vin\":\"ACGFT5009MA003699\",\"engine\":\"N/A\",\"reg\":\"KGD658MP\",\"tag\":\"TANKER\",\"priceExcl\":1325000,\"sentence\":\"1 x Used 2021 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5605SL\",\"year\":\"2022\",\"make\":\"GRW\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"FMC METERING SYSTEM\",\"km\":\"N/A\",\"vin\":\"ACGFT5009MA004251\",\"engine\":\"N/A\",\"reg\":\"KL72LPGP\",\"tag\":\"TANKER\",\"priceExcl\":1925000,\"sentence\":\"1 x Used 2022 GRW TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5659\",\"year\":\"2020\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1LRTE2027\",\"engine\":\"N/A\",\"reg\":\"LV63PRGP\",\"tag\":\"TANKER\",\"priceExcl\":1495000,\"sentence\":\"1 x Used 2020 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5661\",\"year\":\"2020\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1LRTE2942\",\"engine\":\"N/A\",\"reg\":\"JR99WGGP\",\"tag\":\"TANKER\",\"priceExcl\":1495000,\"sentence\":\"1 x Used 2020 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5615SL\",\"year\":\"2021\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"METER\",\"km\":\"N/A\",\"vin\":\"AF9F341A1LRTE2066\",\"engine\":\"N/A\",\"reg\":\"JX64YVGP\",\"tag\":\"TANKER\",\"priceExcl\":1550000,\"sentence\":\"1 x Used 2021 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5660\",\"year\":\"2021\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING\",\"km\":\"N/A\",\"vin\":\"AF9F341A1LRTE2063\",\"engine\":\"N/A\",\"reg\":\"LW24CBGP\",\"tag\":\"TANKER\",\"priceExcl\":1050000,\"sentence\":\"1 x Used 2021 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5657\",\"year\":\"2022\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"53000LT MAXICUBE\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1MRTE2518 AAH166699EM100025\",\"engine\":\"N/A\",\"reg\":\"MC21KPGP MC21NKGP\",\"tag\":\"TANKER\",\"priceExcl\":1795000,\"sentence\":\"1 x Used 2022 HENRED FRUEHAUF TRI - AXLE 53000LT MAXICUBE\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5662\",\"year\":\"2022\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1NRTE2554\",\"engine\":\"N/A\",\"reg\":\"B448BUX\",\"tag\":\"TANKER\",\"priceExcl\":1650000,\"sentence\":\"1 x Used 2022 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5663\",\"year\":\"2023\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1NRTE2730\",\"engine\":\"N/A\",\"reg\":\"B451BUX\",\"tag\":\"TANKER\",\"priceExcl\":1695000,\"sentence\":\"1 x Used 2023 HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5664\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1NRTE2732\",\"engine\":\"N/A\",\"reg\":\"B456BUX\",\"tag\":\"TANKER\",\"priceExcl\":0,\"sentence\":\"1 x Used T.B.C HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5665\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1NRTE2739\",\"engine\":\"N/A\",\"reg\":\"B461BUX\",\"tag\":\"TANKER\",\"priceExcl\":0,\"sentence\":\"1 x Used T.B.C HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5671\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERING SYSTEM, PUMP\",\"km\":\"N/A\",\"vin\":\"AF9F341A1NRTE2553\",\"engine\":\"N/A\",\"reg\":\"B140BUU\",\"tag\":\"TANKER\",\"priceExcl\":0,\"sentence\":\"1 x Used T.B.C HENRED FRUEHAUF TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5654\",\"year\":\"2022\",\"make\":\"MAN\",\"model\":\"26-480 TGS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAULICS STANDARD\",\"km\":\"208 235KM\",\"vin\":\"AAM29K0999PX44922\",\"engine\":\"51560911036094\",\"reg\":\"LV63PNGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":950000,\"sentence\":\"1 x Used 2022 MAN 26-480 TGS 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5649SL\",\"year\":\"2016\",\"make\":\"MERCEDES BENZ\",\"model\":\"2654 ACTROS\",\"description\":\"18000Lt FUEL RIGID\",\"extras\":\"MECHANICAL METER, PUMP\",\"km\":\"0\",\"vin\":\"WDB93024320083443\",\"engine\":\"542942C0995922\",\"reg\":\"CL34XKZN\",\"tag\":\"RIGID\",\"priceExcl\":1200000,\"sentence\":\"1 x Used 2016 MERCEDES BENZ 2654 ACTROS 18000Lt FUEL RIGID\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5460SL\",\"year\":\"2017\",\"make\":\"MERCEDES BENZ\",\"model\":\"2646 ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"\",\"km\":\"0\",\"vin\":\"WDB93424160099851\",\"engine\":\"541948C1000063\",\"reg\":\"JDC781FS\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":595000,\"sentence\":\"1 x Used 2017 MERCEDES BENZ 2646 ACTROS 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5650SL\",\"year\":\"2023\",\"make\":\"MERCEDES BENZ\",\"model\":\"2652LS/33 FS ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAPACK\",\"km\":\"296 712KM\",\"vin\":\"ABJ96342060671898\",\"engine\":\"473915C0801709\",\"reg\":\"LK36LYGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1525000,\"sentence\":\"1 x Used 2023 MERCEDES BENZ 2652LS/33 FS ACTROS 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5651SL\",\"year\":\"2023\",\"make\":\"MERCEDES BENZ\",\"model\":\"2652LS/33 FS ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAPACK\",\"km\":\"339 787KM\",\"vin\":\"ABJ96342X60678809\",\"engine\":\"473915C0826961\",\"reg\":\"LK41KWGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1525000,\"sentence\":\"1 x Used 2023 MERCEDES BENZ 2652LS/33 FS ACTROS 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5437\",\"year\":\"2019\",\"make\":\"MERCEDES BENZ\",\"model\":\"2645 ACTROS PURE\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAULICS, FUEL SPEC\",\"km\":\"774 000KM\",\"vin\":\"ABJ96342460394040\",\"engine\":\"V0390686109\",\"reg\":\"KX34RGGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":795000,\"sentence\":\"1 x Used 2019 MERCEDES BENZ 2645 ACTROS PURE 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5653\",\"year\":\"2022\",\"make\":\"MERCEDES BENZ\",\"model\":\"2652 RE ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"HYDRAULICS STANDARD\",\"km\":\"0\",\"vin\":\"0\",\"engine\":\"0\",\"reg\":\"LT95GXGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1395000,\"sentence\":\"1 x Used 2022 MERCEDES BENZ 2652 RE ACTROS 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"CWS288\",\"year\":\"2026\",\"make\":\"MERCEDES BENZ\",\"model\":\"2645 ACTROS PURE\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"\",\"km\":\"24 821KM\",\"vin\":\"ABJ96342060848692\",\"engine\":\"460972U1175163\",\"reg\":\"MT23RZGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1995000,\"sentence\":\"1 x Used 2026 MERCEDES BENZ 2645 ACTROS PURE 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"CWS289\",\"year\":\"2021\",\"make\":\"SA TRUCK BODIES\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"AHBDSB2FSMB042180 AHBDSB2RSMB042181\",\"engine\":\"N/A\",\"reg\":\"KHP537MP KHP539MP\",\"tag\":\"TRAILER\",\"priceExcl\":565000,\"sentence\":\"1 x Used 2021 SA TRUCK BODIES INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"CWS286\",\"year\":\"2019\",\"make\":\"SCANIA\",\"model\":\"R560\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"\",\"km\":\"888 125KM\",\"vin\":\"9BSR6X40003951859\",\"engine\":\"0\",\"reg\":\"JDT799FS\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":895000,\"sentence\":\"1 x Used 2019 SCANIA R560 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5526RL\",\"year\":\"2022\",\"make\":\"SCANIA\",\"model\":\"G460\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"\",\"km\":\"580 000KM\",\"vin\":\"9BSG6X40004006927\",\"engine\":\"DC13144L018396121\",\"reg\":\"KM29DZGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1150000,\"sentence\":\"1 x Used 2022 SCANIA G460 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5529SL\",\"year\":\"2022\",\"make\":\"SCANIA\",\"model\":\"G460\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"\",\"km\":\"590 000KM\",\"vin\":\"9BSG6X40004007625\",\"engine\":\"DC13144L018396842\",\"reg\":\"KM29GCGP\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1150000,\"sentence\":\"1 x Used 2022 SCANIA G460 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5606SL\",\"year\":\"2014\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"SINGLE FMC MULTIFLOW, PUMP - SPD\",\"km\":\"N/A\",\"vin\":\"AA911FJA1EZDW1496\",\"engine\":\"N/A\",\"reg\":\"CP08WJZN\",\"tag\":\"TANKER\",\"priceExcl\":1195000,\"sentence\":\"1 x Used 2014 TANK CLINIC TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5572\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERS & PUMP\",\"km\":\"N/A\",\"vin\":\"AA911FJA1SZDW1945\",\"engine\":\"N/A\",\"reg\":\"MJ16BSGP\",\"tag\":\"TANKER\",\"priceExcl\":1825000,\"sentence\":\"1 x Used 2025 TANK CLINIC TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5573SL\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERS & PUMP\",\"km\":\"N/A\",\"vin\":\"AA911FJA1SZDW1890\",\"engine\":\"N/A\",\"reg\":\"MH22SHGP\",\"tag\":\"TANKER\",\"priceExcl\":1825000,\"sentence\":\"1 x Used 2025 TANK CLINIC TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5575SL\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERS & PUMP\",\"km\":\"N/A\",\"vin\":\"AA911FJA1SZDW1938\",\"engine\":\"N/A\",\"reg\":\"MG73FYGP\",\"tag\":\"TANKER\",\"priceExcl\":1825000,\"sentence\":\"1 x Used 2025 TANK CLINIC TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5582\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"ACCURATE METERS & PUMP\",\"km\":\"N/A\",\"vin\":\"AA911FJA1SZDW1927\",\"engine\":\"N/A\",\"reg\":\"MG45FJGP\",\"tag\":\"TANKER\",\"priceExcl\":1825000,\"sentence\":\"1 x Used 2025 TANK CLINIC TRI - AXLE 49000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"CWS287\",\"year\":\"2026\",\"make\":\"TANK CLINIC\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"extras\":\"BRIDGING\",\"km\":\"N/A\",\"vin\":\"AA911HJA1TZDW1019\",\"engine\":\"N/A\",\"reg\":\"MT23VCGP\",\"tag\":\"TANKER\",\"priceExcl\":1545000,\"sentence\":\"1 x Used 2026 TANK CLINIC TRI - AXLE 50000Lt ALUMINIUM FUEL TANKER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5586SL\",\"year\":\"2018\",\"make\":\"TRAILMAX\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"AA9H236FAJMSU2445 AA9H236FAJMSU2446\",\"engine\":\"N/A\",\"reg\":\"JRZ945MP JRZ943MP\",\"tag\":\"TRAILER\",\"priceExcl\":395000,\"sentence\":\"1 x Used 2018 TRAILMAX INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5623SL\",\"year\":\"2018\",\"make\":\"TRAILMAX\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"extras\":\"\",\"km\":\"N/A\",\"vin\":\"AA9H236FAJMSU2199 AA9H236FAJMSU2200\",\"engine\":\"N/A\",\"reg\":\"JKV902MP JKV898MP\",\"tag\":\"TRAILER\",\"priceExcl\":395000,\"sentence\":\"1 x Used 2018 TRAILMAX INTERLINK 45M³ SIDE TIPPER TRAILER\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5667\",\"year\":\"2024\",\"make\":\"VOLVO\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"TANKER HYDRAULICS\",\"km\":\"209 565KM\",\"vin\":\"YV2RS02D9RM988456\",\"engine\":\"D132364788\",\"reg\":\"B549BVW\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1725000,\"sentence\":\"1 x Used 2024 VOLVO FH 440 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5668\",\"year\":\"2024\",\"make\":\"VOLVO\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"TANKER HYDRAULICS\",\"km\":\"193 719KM\",\"vin\":\"YV2RS02D2RM988461\",\"engine\":\"D132365115\",\"reg\":\"B552BVW\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1725000,\"sentence\":\"1 x Used 2024 VOLVO FH 440 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5669\",\"year\":\"2024\",\"make\":\"VOLVO\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"TANKER HYDRAULICS\",\"km\":\"218 864KM\",\"vin\":\"YV2RS02D4RM988462\",\"engine\":\"D132364748\",\"reg\":\"B556BVW\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1725000,\"sentence\":\"1 x Used 2024 VOLVO FH 440 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"},{\"ws\":\"WS5670\",\"year\":\"2024\",\"make\":\"VOLVO\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"extras\":\"TANKER HYDRAULICS\",\"km\":\"216 931KM\",\"vin\":\"YV2RS02D5RM988454\",\"engine\":\"D132364786\",\"reg\":\"B513BVW\",\"tag\":\"TRUCK TRACTOR\",\"priceExcl\":1725000,\"sentence\":\"1 x Used 2024 VOLVO FH 440 6 X 4 TRUCK TRACTOR\",\"availability\":\"AVAILABLE\"}]");
var quote_list_default = /*#__PURE__*/ JSON.parse("[{\"ws\":\"WS5617SL\",\"year\":\"2018\",\"make\":\"AFRIT\",\"vin\":\"ADV18863AJ25T0464 ADV18863AJ26T0465\",\"engine\":\"N/A\",\"reg\":\"JLY519MP JLY528MP\",\"sentence\":\"1 x Used Afrit 45m³ Interlink Side Tipper Trailer\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"SEBASTIAN VAN BILJON\",\"priceExcl\":425000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5619SL\",\"year\":\"2018\",\"make\":\"AFRIT\",\"vin\":\"ADV18863AJ09T0448 ADV18863AJ10T0449\",\"engine\":\"N/A\",\"reg\":\"JLX489MP JLX487MP\",\"sentence\":\"1 x Used Afrit 45m³ Interlink Side Tipper Trailer\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"FANIE VAN BILJON\",\"priceExcl\":425000,\"salesCode\":\"SVB\"},{\"ws\":\"WS5666\",\"year\":\"2021\",\"make\":\"AFRIT\",\"vin\":\"ADV19773AM05T0628 ADV19773AM06T0629\",\"engine\":\"N/A\",\"reg\":\"JX61RYGP JX61SCGP\",\"sentence\":\"\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"FANIE VAN BILJON\",\"priceExcl\":550000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5647\",\"year\":\"2023\",\"make\":\"EURO LPG\",\"vin\":\"NR9DYZ010NT012053\",\"engine\":\"N/A\",\"reg\":\"LC03NZGP\",\"sentence\":\"1 x Used Euro 60m³ LPG Gas Tanker with Precinote C400 Alfons Haar Metering System, Corken Z-3200 Pump & Loading, 15m x 1¼ Hose on Hose Reel, Rotary Level Indicator & Validation - Full Distribution Version\",\"km\":\"N/A\",\"model\":\"0\",\"description\":\"60m³ LPG TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":2300000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5656\",\"year\":\"2024\",\"make\":\"FAW\",\"vin\":\"AAK2850FTRB064474\",\"engine\":\"CA6DM350E554049082\",\"reg\":\"MK78VKGP\",\"sentence\":\"1 x Used FAW 28-500FT JH6 6x4 Truck Tractor\",\"km\":\"98 956KM\",\"model\":\"28-500FT\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"DRICKUS VAN BILJON\",\"priceExcl\":950000,\"salesCode\":\"SJ\"},{\"ws\":\"WS5538SL\",\"year\":\"2007\",\"make\":\"GRW\",\"vin\":\"AC9503AA87ACV1889\",\"engine\":\"N/A\",\"reg\":\"HS89FHGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Optic Socket, 100mm API, Jet A1 Sample Lines, Hand/Side Rails & Transfer Hose                                                                                                 SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":795000,\"salesCode\":\"\"},{\"ws\":\"WS5631SL\",\"year\":\"2010\",\"make\":\"GRW\",\"vin\":\"AC9593AA80CCV1747\",\"engine\":\"N/A\",\"reg\":\"DR12GSGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Single FMC Electronic Meter, Electronic Overfill Sensors, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                                                                                                                                                                    SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1025000,\"salesCode\":\"\"},{\"ws\":\"WS5339WMS\",\"year\":\"2012\",\"make\":\"GRW\",\"vin\":\"AC9FT5002CACV1222\",\"engine\":\"N/A\",\"reg\":\"FXC968MP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Accurate Metering System, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                  SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1150000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5511SL-S3P052\",\"year\":\"2012\",\"make\":\"GRW\",\"vin\":\"AC9FT5002CACV1072\",\"engine\":\"N/A\",\"reg\":\"CX63DTGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, FMC Electronic Metering System, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                 SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"FANIE VAN BILJON\",\"priceExcl\":1195000,\"salesCode\":\"\"},{\"ws\":\"WS5410SL\",\"year\":\"2015\",\"make\":\"GRW\",\"vin\":\"AC9FT5002FBCV1126\",\"engine\":\"N/A\",\"reg\":\"KZ01SGGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Single FMC Metering System, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                 SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"ROB LING\",\"priceExcl\":1395000,\"salesCode\":\"\"},{\"ws\":\"WS5630RL\",\"year\":\"2015\",\"make\":\"GRW\",\"vin\":\"AC9FT5002FBCV1023\",\"engine\":\"N/A\",\"reg\":\"LC34JFGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                                                                                                                  SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":995000,\"salesCode\":\"\"},{\"ws\":\"WS5613SL\",\"year\":\"2016\",\"make\":\"GRW\",\"vin\":\"ACGFT5002GA001449\",\"engine\":\"N/A\",\"reg\":\"FJ64LPGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"SEBASTIAN VAN BILJON\",\"priceExcl\":1095000,\"salesCode\":\"\"},{\"ws\":\"WS5636SL\",\"year\":\"2018\",\"make\":\"GRW\",\"vin\":\"ACGFT5008JA002279\",\"engine\":\"N/A\",\"reg\":\"JDG640EC\",\"sentence\":\"1 x Used GRW 50000Lt Tri - Axle Bartec Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Bartec Volu System, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                                                                                                                                            SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"DRICKUS VAN BILJON\",\"priceExcl\":1950000,\"salesCode\":\"\"},{\"ws\":\"WS5594SL\",\"year\":\"2020\",\"make\":\"GRW\",\"vin\":\"ACGFT5009LA003480\",\"engine\":\"N/A\",\"reg\":\"JP49JGGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, FMC Metering System, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                                                   SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1695000,\"salesCode\":\"\"},{\"ws\":\"WS5658\",\"year\":\"2020\",\"make\":\"GRW\",\"vin\":\"0\",\"engine\":\"N/A\",\"reg\":\"LT95GVGP\",\"sentence\":\"1 x Used GRW 50000Lt Tri - Axle Bartec Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Bartec Volu System, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                                            SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"DRICKUS VAN BILJON\",\"priceExcl\":2025000,\"salesCode\":\"\"},{\"ws\":\"WS5628SL\",\"year\":\"2021\",\"make\":\"GRW\",\"vin\":\"ACGFT5009MA003699\",\"engine\":\"N/A\",\"reg\":\"KGD658MP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                                                                                                                                                                  SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"ROB LING\",\"priceExcl\":1325000,\"salesCode\":\"RL\"},{\"ws\":\"WS5605SL\",\"year\":\"2022\",\"make\":\"GRW\",\"vin\":\"ACGFT5009MA004251\",\"engine\":\"N/A\",\"reg\":\"KL72LPGP\",\"sentence\":\"1 x Used GRW 50000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, FMC Metering System, Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                             SPECIALISED EQUIPEMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1925000,\"salesCode\":\"\"},{\"ws\":\"WS5659\",\"year\":\"2020\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1LRTE2027\",\"engine\":\"N/A\",\"reg\":\"LV63PRGP\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1495000,\"salesCode\":\"\"},{\"ws\":\"WS5661\",\"year\":\"2020\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1LRTE2942\",\"engine\":\"N/A\",\"reg\":\"JR99WGGP\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1495000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5615SL\",\"year\":\"2021\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1LRTE2066\",\"engine\":\"N/A\",\"reg\":\"JX64YVGP\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"SEBASTIAN VAN BILJON\",\"priceExcl\":1550000,\"salesCode\":\"\"},{\"ws\":\"WS5660\",\"year\":\"2021\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1LRTE2063\",\"engine\":\"N/A\",\"reg\":\"LW24CBGP\",\"sentence\":\"\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"DRICKUS VAN BILJON\",\"priceExcl\":1050000,\"salesCode\":\"\"},{\"ws\":\"WS5657\",\"year\":\"2022\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1MRTE2518 AAH166699EM100025\",\"engine\":\"N/A\",\"reg\":\"MC21KPGP MC21NKGP\",\"sentence\":\"1 x Used Route Management 53000Lt Tri-Axle Maxicube Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                              SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"53000LT MAXICUBE\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1795000,\"salesCode\":\"\"},{\"ws\":\"WS5662\",\"year\":\"2022\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1NRTE2554\",\"engine\":\"N/A\",\"reg\":\"B448BUX\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1650000,\"salesCode\":\"\"},{\"ws\":\"WS5663\",\"year\":\"2023\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1NRTE2730\",\"engine\":\"N/A\",\"reg\":\"B451BUX\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":1695000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5664\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1NRTE2732\",\"engine\":\"N/A\",\"reg\":\"B456BUX\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":0,\"salesCode\":\"\"},{\"ws\":\"WS5665\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1NRTE2739\",\"engine\":\"N/A\",\"reg\":\"B461BUX\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":0,\"salesCode\":\"DVB\"},{\"ws\":\"WS5671\",\"year\":\"T.B.C\",\"make\":\"HENRED FRUEHAUF\",\"vin\":\"AF9F341A1NRTE2553\",\"engine\":\"N/A\",\"reg\":\"B140BUU\",\"sentence\":\"1 x Used Henred Fruehauf 50000Lt Tri -Axle Aluminium Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, Earth, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                          SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":0,\"salesCode\":\"DVB\"},{\"ws\":\"WS5654\",\"year\":\"2022\",\"make\":\"MAN\",\"vin\":\"AAM29K0999PX44922\",\"engine\":\"51560911036094\",\"reg\":\"LV63PNGP\",\"sentence\":\"\",\"km\":\"208 235KM\",\"model\":\"26-480 TGS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"STANLEY JOHNSON\",\"priceExcl\":950000,\"salesCode\":\"SJ\"},{\"ws\":\"WS5649SL\",\"year\":\"2016\",\"make\":\"MERCEDES BENZ\",\"vin\":\"WDB93024320083443\",\"engine\":\"542942C0995922\",\"reg\":\"CL34XKZN\",\"sentence\":\"1 x Used Mercedes Benz 2654 Actros 18000Lt Fuel Rigid with Vapour Recovery, Electronic Overfill Sensor, Mechanical Metering System, Earth, 65mm Drybrake, PTO, Pneumatic Control Buttons, Pneumatic Bottom Valves, Hydraulics, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                                                     SPECIALISED EQUIPMENT\",\"km\":\"0\",\"model\":\"2654 ACTROS\",\"description\":\"18000Lt FUEL RIGID\",\"salesman\":\"\",\"priceExcl\":1200000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5460SL\",\"year\":\"2017\",\"make\":\"MERCEDES BENZ\",\"vin\":\"WDB93424160099851\",\"engine\":\"541948C1000063\",\"reg\":\"JDC781FS\",\"sentence\":\"1 x Used Mercedes Benz 2646 Actros 6x4 Truck Tractor with PTO & Hydraulics\",\"km\":\"0\",\"model\":\"2646 ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"SEBASTIAN VAN BILJON\",\"priceExcl\":595000,\"salesCode\":\"BVB\"},{\"ws\":\"WS5650SL\",\"year\":\"2023\",\"make\":\"MERCEDES BENZ\",\"vin\":\"ABJ96342060671898\",\"engine\":\"473915C0801709\",\"reg\":\"LK36LYGP\",\"sentence\":\"1 x Used Mercedes Benz 2652 Actros 6x4 Truck Tractor with PTO & Hydraulics                                                                                        Fuel Spec\",\"km\":\"296 712KM\",\"model\":\"2652LS/33 FS ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1525000,\"salesCode\":\"\"},{\"ws\":\"WS5651SL\",\"year\":\"2023\",\"make\":\"MERCEDES BENZ\",\"vin\":\"ABJ96342X60678809\",\"engine\":\"473915C0826961\",\"reg\":\"LK41KWGP\",\"sentence\":\"1 x Used Mercedes Benz 2652 Actros 6x4 Truck Tractor with PTO & Hydraulics                                                                                        Fuel Spec\",\"km\":\"339 787KM\",\"model\":\"2652LS/33 FS ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1525000,\"salesCode\":\"\"},{\"ws\":\"WS5437\",\"year\":\"2019\",\"make\":\"MERCEDES BENZ\",\"vin\":\"ABJ96342460394040\",\"engine\":\"V0390686109\",\"reg\":\"KX34RGGP\",\"sentence\":\"1 x Used Merceds Benz 2645 Actros 6x4 Truck Tractor                                                                                                                     Fuel spec\",\"km\":\"774 000KM\",\"model\":\"2645 ACTROS PURE\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":795000,\"salesCode\":\"\"},{\"ws\":\"WS5653\",\"year\":\"2022\",\"make\":\"MERCEDES BENZ\",\"vin\":\"0\",\"engine\":\"0\",\"reg\":\"LT95GXGP\",\"sentence\":\"\",\"km\":\"0\",\"model\":\"2652 RE ACTROS\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1395000,\"salesCode\":\"NONE\"},{\"ws\":\"CWS288\",\"year\":\"2026\",\"make\":\"MERCEDES BENZ\",\"vin\":\"ABJ96342060848692\",\"engine\":\"460972U1175163\",\"reg\":\"MT23RZGP\",\"sentence\":\"1 x Used Mercedes Benz 2645 Actros Pure 6x4 Truck Tractor with PTO & Hydraulics                                                                              Fuel Spec\",\"km\":\"24 821KM\",\"model\":\"2645 ACTROS PURE\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1995000,\"salesCode\":\"\"},{\"ws\":\"CWS289\",\"year\":\"2021\",\"make\":\"SA TRUCK BODIES\",\"vin\":\"AHBDSB2FSMB042180 AHBDSB2RSMB042181\",\"engine\":\"N/A\",\"reg\":\"KHP537MP KHP539MP\",\"sentence\":\"\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"\",\"priceExcl\":565000,\"salesCode\":\"\"},{\"ws\":\"CWS286\",\"year\":\"2019\",\"make\":\"SCANIA\",\"vin\":\"9BSR6X40003951859\",\"engine\":\"0\",\"reg\":\"JDT799FS\",\"sentence\":\"\",\"km\":\"888 125KM\",\"model\":\"R560\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":895000,\"salesCode\":\"\"},{\"ws\":\"WS5526RL\",\"year\":\"2022\",\"make\":\"SCANIA\",\"vin\":\"9BSG6X40004006927\",\"engine\":\"DC13144L018396121\",\"reg\":\"KM29DZGP\",\"sentence\":\"1 x Used Scania G460 6x4 Truck Tractor\",\"km\":\"580 000KM\",\"model\":\"G460\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1150000,\"salesCode\":\"\"},{\"ws\":\"WS5529SL\",\"year\":\"2022\",\"make\":\"SCANIA\",\"vin\":\"9BSG6X40004007625\",\"engine\":\"DC13144L018396842\",\"reg\":\"KM29GCGP\",\"sentence\":\"1 x Used Scania G460 6x4 Truck Tractor\",\"km\":\"590 000KM\",\"model\":\"G460\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1150000,\"salesCode\":\"\"},{\"ws\":\"WS5606SL\",\"year\":\"2014\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911FJA1EZDW1496\",\"engine\":\"N/A\",\"reg\":\"CP08WJZN\",\"sentence\":\"1 x Used Tank Clinic 49000Lt Aluminium Tri- Axle Fuel Tanker with Vapour Recovery, Electronic Overfill Sensors, Single FMC Electronic Metering System - SPD,  Earth, 65mm Drybrake, Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand/Side Rails & Transfer Hose                                                                                                                                                                                                                                                    SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1195000,\"salesCode\":\"\"},{\"ws\":\"WS5572\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911FJA1SZDW1945\",\"engine\":\"N/A\",\"reg\":\"MJ16BSGP\",\"sentence\":\"1 x Used Tank Clinic 49000Lt Tri - Axle Aluminium  Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, SPD into Manufold, Earth, 65mm Drybrake, PTO,  Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                                                                                                                                                                                                                                   SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1825000,\"salesCode\":\"NONE\"},{\"ws\":\"WS5573SL\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911FJA1SZDW1890\",\"engine\":\"N/A\",\"reg\":\"MH22SHGP\",\"sentence\":\"1 x Used Tank Clinic 49000Lt Tri - Axle Aluminium  Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, SPD into Manufold, Earth, 65mm Drybrake, PTO,  Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                                                                                                                                                                                                                                   SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1825000,\"salesCode\":\"\"},{\"ws\":\"WS5575SL\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911FJA1SZDW1938\",\"engine\":\"N/A\",\"reg\":\"MG73FYGP\",\"sentence\":\"1 x Used Tank Clinic 49000Lt Tri - Axle Aluminium  Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, SPD into Manufold, Earth, 65mm Drybrake, PTO,  Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                                                                                                                                                                                                                                   SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1825000,\"salesCode\":\"\"},{\"ws\":\"WS5582\",\"year\":\"2025\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911FJA1SZDW1927\",\"engine\":\"N/A\",\"reg\":\"MG45FJGP\",\"sentence\":\"1 x Used Tank Clinic 49000Lt Tri - Axle Aluminium  Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Accurate Metering System, SPD into Manufold, Earth, 65mm Drybrake, PTO,  Pneumatic Control Buttons, Pneumatic Bottom Valves, Pump, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose - 4 Compartment                                                                                                                                                                                                                                                                                                                                                                                                                                                                   SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"49000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1825000,\"salesCode\":\"\"},{\"ws\":\"CWS287\",\"year\":\"2026\",\"make\":\"TANK CLINIC\",\"vin\":\"AA911HJA1TZDW1019\",\"engine\":\"N/A\",\"reg\":\"MT23VCGP\",\"sentence\":\"1 x Used Tank Clinic X50 50000Lt Tri - Axle Aluminium  Fuel Tanker with Vapour Recovery, Electronic Overfill Sensor, Earth, 65mm Drybrake, PTO,  Pneumatic Control Buttons, Pneumatic Bottom Valves, Optic Socket, 100mm API, Hand / Side Rails & Transfer Hose                                                                                                                                                                                                                                                                                                                                                                                                                                                                   SPECIALISED EQUIPMENT\",\"km\":\"N/A\",\"model\":\"TRI - AXLE\",\"description\":\"50000Lt ALUMINIUM FUEL TANKER\",\"salesman\":\"\",\"priceExcl\":1545000,\"salesCode\":\"\"},{\"ws\":\"WS5586SL\",\"year\":\"2018\",\"make\":\"TRAILMAX\",\"vin\":\"AA9H236FAJMSU2445 AA9H236FAJMSU2446\",\"engine\":\"N/A\",\"reg\":\"JRZ945MP JRZ943MP\",\"sentence\":\"1 x Used Trailmax 45m³ Interlink Side Tipper Trailer\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"\",\"priceExcl\":395000,\"salesCode\":\"\"},{\"ws\":\"WS5623SL\",\"year\":\"2018\",\"make\":\"TRAILMAX\",\"vin\":\"AA9H236FAJMSU2199 AA9H236FAJMSU2200\",\"engine\":\"N/A\",\"reg\":\"JKV902MP JKV898MP\",\"sentence\":\"1 x Used Trailmax 45m³ Interlink Side Tipper Trailer\",\"km\":\"N/A\",\"model\":\"INTERLINK\",\"description\":\"45M³ SIDE TIPPER TRAILER\",\"salesman\":\"\",\"priceExcl\":395000,\"salesCode\":\"\"},{\"ws\":\"WS5667\",\"year\":\"2024\",\"make\":\"VOLVO\",\"vin\":\"YV2RS02D9RM988456\",\"engine\":\"D132364788\",\"reg\":\"B549BVW\",\"sentence\":\"1 x Used Volvo FH 440 6x4 Truck Tractor with Tanker Hydraulics\",\"km\":\"209 565KM\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1725000,\"salesCode\":\"\"},{\"ws\":\"WS5668\",\"year\":\"2024\",\"make\":\"VOLVO\",\"vin\":\"YV2RS02D2RM988461\",\"engine\":\"D132365115\",\"reg\":\"B552BVW\",\"sentence\":\"1 x Used Volvo FH 440 6x4 Truck Tractor with Tanker Hydraulics\",\"km\":\"193 719KM\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1725000,\"salesCode\":\"\"},{\"ws\":\"WS5669\",\"year\":\"2024\",\"make\":\"VOLVO\",\"vin\":\"YV2RS02D4RM988462\",\"engine\":\"D132364748\",\"reg\":\"B556BVW\",\"sentence\":\"1 x Used Volvo FH 440 6x4 Truck Tractor with Tanker Hydraulics\",\"km\":\"218 864KM\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1725000,\"salesCode\":\"\"},{\"ws\":\"WS5670\",\"year\":\"2024\",\"make\":\"VOLVO\",\"vin\":\"YV2RS02D5RM988454\",\"engine\":\"D132364786\",\"reg\":\"B513BVW\",\"sentence\":\"1 x Used Volvo FH 440 6x4 Truck Tractor with Tanker Hydraulics\",\"km\":\"216 931KM\",\"model\":\"FH 440\",\"description\":\"6 X 4 TRUCK TRACTOR\",\"salesman\":\"\",\"priceExcl\":1725000,\"salesCode\":\"\"}]");
var TAGS = [
	"TANKER",
	"TRUCK TRACTOR",
	"TRAILER",
	"RIGID",
	"SIDE TIPPER",
	"TIPPER TRUCK"
];
var MAIN_TYPES = [
	"Fuel Tanker",
	"Tanker",
	"Truck Tractor",
	"Trailer",
	"Side Tipper",
	"Rigid",
	"Other"
];
var SUB_TYPES = [
	"TRI-AXLE BARTEC",
	"TRI AXLE BRIDGER",
	"Tri-axle",
	"Tri axle metered",
	"FUEL TANKER/PUMP AND METERS",
	"Trail tanker",
	"LPG",
	"Interlink",
	"Tautliner",
	"SIDE TIPPER",
	"MaxiCube",
	"Truck tractor",
	"pump and meters"
];
var BAYS = [
	"Yard",
	"Bay 1 Reuben",
	"Bay 2 Ricardo",
	"Bay 3 Jonas",
	"Bay 4 Josiah",
	"Wash Bay"
];
var TANKER_TASKS = [
	"Pressure test (SLP)",
	"Barrel test - 3 and 6 year",
	"Calibration (if fitted with meters)",
	"DEKRA spec",
	"Roadworthy",
	"Brake tests",
	"Wash / clean for delivery"
];
var TRUCK_TASKS = [
	"Service",
	"Roadworthy",
	"Brake tests",
	"Touch-ups",
	"Polish cab and clean interior",
	"Wash / clean for delivery",
	"PDI"
];
var TRAILER_TASKS = [
	"Lights",
	"Roadworthy",
	"Brake tests",
	"Touch-ups",
	"Wash / clean for delivery",
	"PDI"
];
var TIPPER_TASKS = [
	"Tailgate and hinges",
	"Roadworthy",
	"Brake tests",
	"Wash / clean for delivery",
	"PDI"
];
function tasksFor(mainType) {
	if (mainType === "Fuel Tanker" || mainType === "Tanker") return TANKER_TASKS;
	if (mainType === "Truck Tractor" || mainType === "Rigid") return TRUCK_TASKS;
	if (mainType === "Side Tipper") return TIPPER_TASKS;
	return TRAILER_TASKS;
}
function classify(tag, description, model, extras = "") {
	const upperTag = (tag || "").toUpperCase();
	const text = `${description} ${model}`.toUpperCase();
	const detail = `${description} ${model} ${extras}`.toUpperCase();
	if (upperTag === "TRUCK TRACTOR" || text.includes("TRUCK TRACTOR") && !text.includes("TIPPER")) return {
		tag: "TRUCK TRACTOR",
		main: "Truck Tractor",
		sub: model && model !== "0" ? model.trim() : "6x4"
	};
	if (upperTag === "TIPPER TRUCK" || text.includes("TIPPER TRUCK")) return {
		tag: "TIPPER TRUCK",
		main: "Tipper Truck",
		sub: "Tipper"
	};
	if (upperTag === "SIDE TIPPER" || text.includes("SIDE TIPPER") || text.includes("TIPPER") && text.includes("TRAILER")) return {
		tag: "SIDE TIPPER",
		main: "Side Tipper",
		sub: text.includes("45") ? "45m³ Interlink" : "Interlink"
	};
	if (upperTag === "RIGID" || text.includes("RIGID")) return {
		tag: "RIGID",
		main: "Rigid",
		sub: detail.includes("FUEL") || detail.includes("TANK") ? "Fuel rigid" : "Rigid"
	};
	if (text.includes("TAUT")) return {
		tag: "TRAILER",
		main: "Trailer",
		sub: "Tautliner"
	};
	if (upperTag === "TRAILER" && !text.includes("TIPPER") && !text.includes("TANK")) return {
		tag: "TRAILER",
		main: "Trailer",
		sub: model && model !== "0" ? model.trim() : "Trailer"
	};
	let sub = "Tri-axle";
	if (detail.includes("LPG")) sub = "LPG";
	else if (detail.includes("MAXI")) sub = "MaxiCube";
	else if (detail.includes("BARTEC")) sub = "Bartec";
	else if (detail.includes("BRIDG")) sub = "Bridger";
	else if (detail.includes("METER") || detail.includes("METING") || detail.includes("PUMP")) sub = "Metered";
	return {
		tag: "TANKER",
		main: sub === "LPG" ? "Tanker" : "Fuel Tanker",
		sub
	};
}
var file = join(process.cwd(), "data", "loaded-cards.json");
var loaded = /* @__PURE__ */ new Set();
var ready = false;
function read() {
	if (ready) return;
	ready = true;
	try {
		const raw = JSON.parse(readFileSync(file, "utf8"));
		if (Array.isArray(raw)) loaded = new Set(raw);
	} catch {
		loaded = /* @__PURE__ */ new Set();
	}
}
function isLoaded(ws) {
	read();
	return loaded.has(ws);
}
function markLoaded(ws) {
	read();
	loaded.add(ws);
	try {
		mkdirSync(join(process.cwd(), "data"), { recursive: true });
		writeFileSync(file, JSON.stringify([...loaded]));
	} catch {}
}
var STAFF = {
	"Sebastian van Biljon": {
		code: "BVB",
		role: "director"
	},
	"Siegfried van Biljon": {
		code: "SVB",
		role: "director"
	},
	Cindy: {
		code: "",
		role: "accounts"
	},
	Chantelle: {
		code: "",
		role: "stock"
	},
	"Fanie van Biljon": {
		code: "FVB",
		role: "sales"
	},
	"Stanley Johnson": {
		code: "SJ",
		role: "sales"
	},
	"Drickus van Biljon": {
		code: "DVB",
		role: "sales"
	},
	"Jean-Pierre De Fillet": {
		code: "",
		role: "workshop"
	},
	"Louis Koekemoer": {
		code: "",
		role: "workshop"
	},
	"Tiaan Van Wyk": {
		code: "",
		role: "workshop"
	},
	Damian: {
		code: "",
		role: "marketing"
	},
	Andre: {
		code: "",
		role: "admin"
	}
};
var PRICE = /* @__PURE__ */ new Set([
	"director",
	"accounts",
	"stock",
	"sales"
]);
var COST = /* @__PURE__ */ new Set(["director", "accounts"]);
var CLIENTS = [
	"Reef Bulk",
	"Highveld Fuels",
	"East Rand Haulage",
	"Vaal Tippers",
	"Natal Tankers",
	"Bartlett Logistics",
	"Goldfield Transport"
];
var SALES = [
	{
		name: "Fanie van Biljon",
		code: "FVB"
	},
	{
		name: "Stanley Johnson",
		code: "SJ"
	},
	{
		name: "Drickus van Biljon",
		code: "DVB"
	},
	{
		name: "Sebastian van Biljon",
		code: "BVB"
	}
];
function hash(value) {
	let h = 2166136261;
	for (const ch of value) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
	return h >>> 0;
}
function askFor(tag, h) {
	const [lo, hi] = {
		TANKER: [78e4, 245e4],
		"TRUCK TRACTOR": [89e4, 185e4],
		TRAILER: [265e3, 64e4],
		"SIDE TIPPER": [39e4, 76e4],
		RIGID: [42e4, 98e4],
		"TIPPER TRUCK": [51e4, 11e5]
	}[tag] || [3e5, 9e5];
	const step = 5e3;
	return lo + h % Math.max(1, Math.floor((hi - lo) / step)) * step;
}
var PRESET = /* @__PURE__ */ new Set([
	"WS5647",
	"WS5538SL",
	"WS5656",
	"WS5617SL"
]);
var quoteByWs = new Map(quote_list_default.map((row) => [row.ws, row]));
function salesFromList(raw) {
	const name = raw.toUpperCase();
	if (name.includes("FANIE")) return {
		name: "Fanie van Biljon",
		code: "FVB"
	};
	if (name.includes("STANLEY")) return {
		name: "Stanley Johnson",
		code: "SJ"
	};
	if (name.includes("DRICKUS")) return {
		name: "Drickus van Biljon",
		code: "DVB"
	};
	if (name.includes("SEBASTIAN")) return {
		name: "Sebastian van Biljon",
		code: "BVB"
	};
	if (name.includes("SIEGFRIED")) return {
		name: "Siegfried van Biljon",
		code: "SVB"
	};
	return null;
}
function day(offset) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offset);
	return d.toISOString().slice(0, 10);
}
function forRole(row, role, index) {
	const showPrice = PRICE.has(role);
	const showCost = COST.has(role);
	const showIdentity = role !== "marketing";
	const h = hash(row.ws);
	const kind = classify(row.tag, row.description, row.model, row.extras);
	const listed = quoteByWs.get(row.ws);
	const listedSales = listed ? salesFromList(listed.salesman) : null;
	const ask = listed?.priceExcl || askFor(row.tag, h);
	const sentence = listed?.sentence || "";
	const cardLoaded = !!sentence && (PRESET.has(row.ws) || isLoaded(row.ws));
	const seeSentence = cardLoaded || role === "stock" || role === "director";
	const buy = Math.round(ask * (72 + h % 12) / 100 / 1e3) * 1e3;
	const lane = h % 10;
	const client = lane >= 4 ? CLIENTS[h % CLIENTS.length] : "";
	const sales = listedSales || SALES[h % SALES.length];
	const quoted = cardLoaded && !!sentence && (PRESET.has(row.ws) || lane >= 6);
	const invoiced = lane >= 7;
	const inBay = lane === 6 || lane === 8;
	const fee = 2500;
	const excl = ask + fee;
	const location = inBay ? BAYS[1 + h % (BAYS.length - 1)] : "Yard";
	const step = invoiced ? "Invoice requested" : quoted ? "Quoted" : inBay ? "In workshop" : "On hand";
	const tasks = tasksFor(kind.main).map((name, i) => {
		return {
			name,
			job: "A",
			status: lane === 9 && i < 3 ? "Completed" : inBay && i < 2 ? "In Progress" : "Not Started",
			location: name.includes("Pressure") ? "3rd Party: FK" : name.includes("Barrel") ? "3rd Party: STT" : name.includes("Calibration") ? "3rd Party: Liquid Flow" : name === "Roadworthy" ? "3rd Party: East Rand Testing Station" : location,
			provider: name.includes("Pressure") ? "FK" : name.includes("Barrel") ? "STT" : name.includes("Calibration") ? "Liquid Flow" : name === "Roadworthy" ? "East Rand Testing Station" : ""
		};
	});
	const labour = 4500 + h % 8 * 750;
	const costs = showCost ? [
		{
			name: "Labour",
			supplier: "Yard",
			qty: lane >= 6 ? 1 : 0,
			unitPrice: labour,
			inv: lane >= 6 ? "LAB-" + (100 + index) : ""
		},
		{
			name: "RWC",
			supplier: "East Rand Testing Station",
			qty: lane >= 8 ? 1 : 0,
			unitPrice: 1850,
			inv: lane >= 8 ? "RWC-" + (200 + index) : ""
		},
		{
			name: "Valet",
			supplier: "Yard",
			qty: lane === 9 ? 1 : 0,
			unitPrice: 1200,
			inv: ""
		}
	] : [];
	const orders = lane >= 6 ? [{
		orderNo: row.ws + "-001",
		responsible: h % 2 ? "Jean-Pierre De Fillet" : "Louis Koekemoer",
		supplier: h % 2 ? "Quality Parts" : "Global Air Brakes",
		qty: 1 + h % 3,
		item: kind.main.includes("Tank") ? "Suzi set" : "Mudguards",
		invoicedExcl: showCost || role === "stock" ? 1800 + h % 5 * 250 : null
	}] : [];
	return {
		ws: row.ws,
		year: row.year,
		make: row.make,
		model: row.model,
		description: row.description,
		extras: row.extras,
		km: row.km,
		vin: showIdentity ? row.vin : "",
		engine: row.engine,
		reg: showIdentity ? row.reg : "",
		tag: kind.tag,
		mainType: kind.main,
		subType: kind.sub,
		priceExcl: showPrice ? ask : null,
		buyExcl: showCost ? buy : null,
		sentence: showPrice && seeSentence ? sentence : "",
		loaded: cardLoaded,
		salesCode: sales.code,
		availability: row.availability,
		client,
		salesman: sales.name,
		invoiceNo: invoiced ? "INV-" + (8600 + index) : "",
		invoiceStatus: invoiced ? "Requested" : "None",
		location,
		step,
		priority: h % 17 === 0 ? "Urgent" : h % 5 === 0 ? "High" : "Normal",
		tasks,
		costs,
		orders,
		quote: quoted ? {
			number: "C" + (21040 + index),
			customer: client,
			code: sales.code,
			item: row.ws + " " + row.year + " " + row.description,
			sentence: showPrice && seeSentence ? sentence : row.year + " " + row.description,
			fee,
			tradeIn: 0,
			excl: showPrice ? excl : 0,
			vat: showPrice ? Math.round(excl * .15) : 0,
			total: showPrice ? Math.round(excl * 1.15) : 0,
			followDay: 1,
			dueOn: day(1),
			make: row.make,
			year: row.year,
			vin: showIdentity ? row.vin : "",
			engine: row.engine,
			reg: showIdentity ? row.reg : "",
			ws: row.ws
		} : null,
		invoice: invoiced ? {
			number: "INV-" + (8600 + index),
			customer: client,
			salesman: sales.name,
			excl: showPrice ? excl : 0,
			vat: showPrice ? Math.round(excl * .15) : 0,
			total: showPrice ? Math.round(excl * 1.15) : 0,
			status: "Requested"
		} : null
	};
}
var Route = createFileRoute("/api/yard")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json().catch(() => ({}));
	const staff = body.name ? STAFF[body.name] : void 0;
	if (!staff || body.password !== "Test1234") return Response.json({ error: "Wrong name or password" }, { status: 401 });
	if (body.action === "load") {
		if (staff.role !== "stock" && staff.role !== "director") return Response.json({ error: "Only Chantelle loads a card" }, { status: 403 });
		if (!body.ws) return Response.json({ error: "No WS" }, { status: 400 });
		markLoaded(body.ws);
		return Response.json({
			ok: true,
			ws: body.ws
		});
	}
	return Response.json({
		role: staff.role,
		units: stock_default.map((row, index) => forRole(row, staff.role, index))
	});
} } } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	ApiInvoiceNoteRoute: Route$2.update({
		id: "/api/invoice-note",
		path: "/api/invoice-note",
		getParentRoute: () => Route$4
	}),
	ApiJobLogRoute: Route$1.update({
		id: "/api/job-log",
		path: "/api/job-log",
		getParentRoute: () => Route$4
	}),
	ApiYardRoute: Route.update({
		id: "/api/yard",
		path: "/api/yard",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { tasksFor as a, TAGS as i, MAIN_TYPES as n, SUB_TYPES as r, router_exports as t };
