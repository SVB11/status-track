export const TAGS = ["TANKER", "TRUCK TRACTOR", "TRAILER", "RIGID", "SIDE TIPPER", "TIPPER TRUCK"] as const;

export const MAIN_TYPES = ["Fuel Tanker", "Tanker", "Truck Tractor", "Trailer", "Side Tipper", "Rigid", "Other"] as const;

export const SUB_TYPES = [
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
  "pump and meters",
] as const;

export const BAYS = ["Yard", "Bay 1 Reuben", "Bay 2 Ricardo", "Bay 3 Jonas", "Bay 4 Josiah", "Wash Bay"] as const;

export const THIRDS = [
  { category: "Barrel Test", name: "STT" },
  { category: "Barrel Test", name: "ITL" },
  { category: "Pressure Test", name: "PFT" },
  { category: "Pressure Test", name: "FK" },
  { category: "Calibration Test", name: "Liquid Flow" },
  { category: "Roadworthy", name: "East Rand Testing Station" },
  { category: "Auto Electrical", name: "MAN Auto (Scotty)" },
  { category: "Auto Electrical", name: "ODRS Airbrakes (Rayon)" },
  { category: "Auto Electrical", name: "Ryan (ABS)" },
  { category: "Other", name: "ATS Tarps" },
  { category: "Other", name: "Fambez" },
] as const;

const TANKER_TASKS = [
  "Pressure test (SLP)",
  "Barrel test - 3 and 6 year",
  "Calibration (if fitted with meters)",
  "DEKRA spec",
  "Roadworthy",
  "Brake tests",
  "Wash / clean for delivery",
];

const TRUCK_TASKS = ["Service", "Roadworthy", "Brake tests", "Touch-ups", "Polish cab and clean interior", "Wash / clean for delivery", "PDI"];

const TRAILER_TASKS = ["Lights", "Roadworthy", "Brake tests", "Touch-ups", "Wash / clean for delivery", "PDI"];

const TIPPER_TASKS = ["Tailgate and hinges", "Roadworthy", "Brake tests", "Wash / clean for delivery", "PDI"];

export function tasksFor(mainType: string): string[] {
  if (mainType === "Fuel Tanker" || mainType === "Tanker") return TANKER_TASKS;
  if (mainType === "Truck Tractor" || mainType === "Rigid") return TRUCK_TASKS;
  if (mainType === "Side Tipper") return TIPPER_TASKS;
  return TRAILER_TASKS;
}

export function classify(tag: string, description: string, model: string, extras = "") {
  const upperTag = (tag || "").toUpperCase();
  const text = `${description} ${model}`.toUpperCase();
  const detail = `${description} ${model} ${extras}`.toUpperCase();
  if (upperTag === "TRUCK TRACTOR" || (text.includes("TRUCK TRACTOR") && !text.includes("TIPPER"))) {
    return { tag: "TRUCK TRACTOR", main: "Truck Tractor", sub: model && model !== "0" ? model.trim() : "6x4" };
  }
  if (upperTag === "TIPPER TRUCK" || text.includes("TIPPER TRUCK")) {
    return { tag: "TIPPER TRUCK", main: "Tipper Truck", sub: "Tipper" };
  }
  if (upperTag === "SIDE TIPPER" || text.includes("SIDE TIPPER") || (text.includes("TIPPER") && text.includes("TRAILER"))) {
    return { tag: "SIDE TIPPER", main: "Side Tipper", sub: text.includes("45") ? "45m³ Interlink" : "Interlink" };
  }
  if (upperTag === "RIGID" || text.includes("RIGID")) {
    return { tag: "RIGID", main: "Rigid", sub: detail.includes("FUEL") || detail.includes("TANK") ? "Fuel rigid" : "Rigid" };
  }
  if (text.includes("TAUT")) return { tag: "TRAILER", main: "Trailer", sub: "Tautliner" };
  if (upperTag === "TRAILER" && !text.includes("TIPPER") && !text.includes("TANK")) {
    return { tag: "TRAILER", main: "Trailer", sub: model && model !== "0" ? model.trim() : "Trailer" };
  }
  let sub = "Tri-axle";
  if (detail.includes("LPG")) sub = "LPG";
  else if (detail.includes("MAXI")) sub = "MaxiCube";
  else if (detail.includes("BARTEC")) sub = "Bartec";
  else if (detail.includes("BRIDG")) sub = "Bridger";
  else if (detail.includes("METER") || detail.includes("METING") || detail.includes("PUMP")) sub = "Metered";
  return { tag: "TANKER", main: sub === "LPG" ? "Tanker" : "Fuel Tanker", sub };
}
