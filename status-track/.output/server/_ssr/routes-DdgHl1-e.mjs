import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LogOut, c as Camera, i as Receipt, o as FileText, r as Share2, s as ClipboardList, t as Wrench } from "../_libs/lucide-react.mjs";
import { a as tasksFor, i as TAGS, n as MAIN_TYPES, r as SUB_TYPES } from "./router-C1NT6qGI.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdgHl1-e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var seedUnits = [
	{
		"id": 1,
		"ws": "WS5242",
		"jobNumber": "JC-2026-0001",
		"year": "2017",
		"make": "Tank Clinic",
		"model": "Fuel Tanker",
		"description": "Tank Clinic Fuel Tanker",
		"tag": "Tanker",
		"vin": "AA911FJA1HZDW1981",
		"reg": "FW37BNGP",
		"client": "Benrise enterprises",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "C20920",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2017 Tank Clinic Fuel Tanker",
		"location": "Yard",
		"status": "PDI Completed",
		"instructions": "Meter and pump system needs to be de-installed (friedel to quote)",
		"priority": "High",
		"due": "2026-09-25",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "PDI Completed",
		"copy": true
	},
	{
		"id": 2,
		"ws": "WS5589",
		"jobNumber": "JC-2026-0002",
		"year": "2010",
		"make": "Grw",
		"model": "Tanker",
		"description": "Grw Tanker",
		"tag": "Tanker",
		"vin": "Ac9503aa80ccv1929",
		"reg": "LS 37 DZ GP",
		"client": "Panthera logistics",
		"salesman": "Stanley Johnson",
		"seller": "",
		"quoteNo": "8610",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2010 Grw Tanker",
		"location": "Yard",
		"status": "Work Completed",
		"instructions": "",
		"priority": "Urgent",
		"due": "2026-09-18",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Work Completed",
		"copy": true
	},
	{
		"id": 3,
		"ws": "5598",
		"jobNumber": "JC-2026-0003",
		"year": "2019",
		"make": "GRW",
		"model": "Fuel Tanker",
		"description": "GRW Fuel Tanker",
		"tag": "Tanker",
		"vin": "ACGFT5009KA002854",
		"reg": "HY69ZGGP",
		"client": "Commercial Fuel Trading",
		"salesman": "Drickus van Biljon",
		"seller": "",
		"quoteNo": "C20899",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2019 GRW Fuel Tanker",
		"location": "Yard",
		"status": "Accepted by Workshop",
		"instructions": "Bestel mudguards en brackets vir sy trok soos vorige keer. Is gelaai op inv. ",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Accepted by Workshop",
		"copy": true
	},
	{
		"id": 4,
		"ws": "5339",
		"jobNumber": "JC-2026-0005",
		"year": "2012",
		"make": "GRW",
		"model": "Tanker",
		"description": "GRW Tanker",
		"tag": "Tanker",
		"vin": "AC9FT5002CACV1222",
		"reg": "FXC968MP",
		"client": "Commercial Fuel Trading",
		"salesman": "Drickus van Biljon",
		"seller": "",
		"quoteNo": "C20900",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2012 GRW Tanker",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "Mudguards oor vir sy trok saam brackets asb. ",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 5,
		"ws": "WS5599",
		"jobNumber": "JC-2026-0006",
		"year": "2012",
		"make": "Grw tanker",
		"model": "Tanker",
		"description": "Grw tanker Tanker",
		"tag": "Tanker",
		"vin": "Ac9ft5002cacv1140",
		"reg": "MD 35 RN GO",
		"client": "Tsoga molemi trading &projects pty",
		"salesman": "Stanley Johnson",
		"seller": "",
		"quoteNo": "8615",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2012 Grw tanker Tanker",
		"location": "Yard",
		"status": "Work Completed",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-25",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Work Completed",
		"copy": true
	},
	{
		"id": 6,
		"ws": "WS5608",
		"jobNumber": "JC-2026-0008",
		"year": "2022",
		"make": "SA Truck Bodies",
		"model": "Tautliner",
		"description": "SA Truck Bodies Tautliner",
		"tag": "Trailer",
		"vin": "AHBDSB2FTNB014621/4622",
		"reg": "KL10WCGP/KL10VXGP",
		"client": "Naletsana Africa Consulting",
		"salesman": "Calvin Kempenaar",
		"seller": "",
		"quoteNo": "8574",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2022 SA Truck Bodies Tautliner",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "Trailer was already through workshop - just double check everything, trailer stood for a 2 month. ATS is fitting new tarps Friday - and 16 new tyres needs to be ordered and fitted @louis - old tyres can be booked back in stock",
		"priority": "Normal",
		"due": "2026-09-29",
		"photo": "/brand/trailer.jpg",
		"photos": ["/brand/trailer.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 7,
		"ws": "WS5603",
		"jobNumber": "JC-2026-0009",
		"year": "2021",
		"make": "SA Road Tautliner 6x12",
		"model": "Tautliner",
		"description": "SA Road Tautliner 6x12 Tautliner",
		"tag": "Other",
		"vin": "AHBDSB2FTMB042160 / AHBDSB2RTMB042161",
		"reg": "JZ95PCGP / JZ88HNGP",
		"client": "Allied Integrated Services (PTY) Ltd",
		"salesman": "Rob Ling",
		"seller": "",
		"quoteNo": "INV8573",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2021 SA Road Tautliner 6x12 Tautliner",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "Please fit spare wheel, fix spare wheel mechanism. ",
		"priority": "Normal",
		"due": "2026-09-29",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 8,
		"ws": "WS5422",
		"jobNumber": "JC-2026-0010",
		"year": "2014",
		"make": "Tank clinic",
		"model": "Trail tanker",
		"description": "Tank clinic Trail tanker",
		"tag": "Tanker",
		"vin": "Aa911fja1ezdw1550",
		"reg": "DG 90 CP GP",
		"client": "Mokara investments pty",
		"salesman": "Stanley Johnson",
		"seller": "",
		"quoteNo": "8603",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2014 Tank clinic Trail tanker",
		"location": "Yard",
		"status": "Work Completed",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Work Completed",
		"copy": true
	},
	{
		"id": 9,
		"ws": "WS5424",
		"jobNumber": "JC-2026-0011",
		"year": "2014",
		"make": "Tank clinic",
		"model": "Fuel tanker",
		"description": "Tank clinic Fuel tanker",
		"tag": "Tanker",
		"vin": "Aa911fja1ezdw1551",
		"reg": "DG 90 CS GP",
		"client": "Mokara investment pty",
		"salesman": "Stanley Johnson",
		"seller": "",
		"quoteNo": "8599",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2014 Tank clinic Fuel tanker",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 10,
		"ws": "WS5655",
		"jobNumber": "JC-2026-0012",
		"year": "2022",
		"make": "Man TGS26-480",
		"model": "Truck tractor",
		"description": "Man TGS26-480 Truck tractor",
		"tag": "Truck Tractor",
		"vin": "Aam29k1865px45813",
		"reg": "LW 24 BM GP",
		"client": "Benrise enterprises",
		"salesman": "Stanley Johnson",
		"seller": "",
		"quoteNo": "8615",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2022 Man TGS26-480 Truck tractor",
		"location": "Yard",
		"status": "Work Completed",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/truck.jpg",
		"photos": ["/brand/truck.jpg"],
		"cleared": true,
		"step": "Work Completed",
		"copy": true
	},
	{
		"id": 11,
		"ws": "WS5657",
		"jobNumber": "JC-2026-0013",
		"year": "2022",
		"make": "Henred",
		"model": "MaxiCube",
		"description": "Henred MaxiCube",
		"tag": "Fuel Tanker",
		"vin": "MC21NKGP",
		"reg": "MC21KPGP",
		"client": "Showroom",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "Showroom",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2022 Henred MaxiCube",
		"location": "Bay 2 Ricardo",
		"status": "In Progress",
		"instructions": "Full respray (Refurbishment)",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 12,
		"ws": "WS5659",
		"jobNumber": "JC-2026-0014",
		"year": "2020",
		"make": "HENRED/FRUEHAUF. 2020",
		"model": "pump and meters",
		"description": "HENRED/FRUEHAUF. 2020 pump and meters",
		"tag": "Fuel Tanker",
		"vin": "AF9F341A1LRTE2027",
		"reg": "LV63PRGP",
		"client": "Showroom",
		"salesman": "Jean-Pierre De Fillet",
		"seller": "",
		"quoteNo": "SHOWROOM",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2020 HENRED/FRUEHAUF. 2020 pump and meters",
		"location": "Bay 3 Jonas",
		"status": "Accepted by Workshop",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Accepted by Workshop",
		"copy": true
	},
	{
		"id": 13,
		"ws": "WS5631",
		"jobNumber": "JC-2026-0015",
		"year": "2010",
		"make": "GRW",
		"model": "Tri axle metered",
		"description": "GRW Tri axle metered",
		"tag": "Fuel Tanker",
		"vin": "Ac9503aa80ccv1747",
		"reg": "DR12GSGP",
		"client": "Showroom",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "Showroom",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2010 GRW Tri axle metered",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "Service undercarriage ",
		"priority": "Normal",
		"due": "2026-09-29",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 14,
		"ws": "WS5617",
		"jobNumber": "JC-2026-0016",
		"year": "2018",
		"make": "AFRIT SIDE TIPPER 45m3",
		"model": "SIDE TIPPER",
		"description": "AFRIT SIDE TIPPER 45m3 SIDE TIPPER",
		"tag": "Side Tipper",
		"vin": "ADV18863AJ25T0464",
		"reg": "JLY519MP",
		"client": "Showroom",
		"salesman": "Jean-Pierre De Fillet",
		"seller": "",
		"quoteNo": "SHOWROOM",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2018 AFRIT SIDE TIPPER 45m3 SIDE TIPPER",
		"location": "Bay 4 Josiah",
		"status": "Work Completed",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-09-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Work Completed",
		"copy": true
	},
	{
		"id": 15,
		"ws": "5583",
		"jobNumber": "JC-2026-0017",
		"year": "2025",
		"make": "Tank Clinic",
		"model": "Tri-axle",
		"description": "Tank Clinic Tri-axle",
		"tag": "Fuel Tanker",
		"vin": "AA911FJA1SZDW1937",
		"reg": "MG60NX",
		"client": "Inyameko Northen Cape T/A Chris 2 Verspreiders",
		"salesman": "Drickus van Biljon",
		"seller": "",
		"quoteNo": "C20884",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2025 Tank Clinic Tri-axle",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "Kry vir my asb Barrel toets by TC en hoor of ons name change moet doen op hom of nie. \n",
		"priority": "Normal",
		"due": "2026-10-09",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 16,
		"ws": "WS5660",
		"jobNumber": "JC-2026-0019",
		"year": "2021",
		"make": "HENRED/FRUEHAUF/2021",
		"model": "FUEL TANKER/PUMP AND METERS",
		"description": "HENRED/FRUEHAUF/2021 FUEL TANKER/PUMP AND METERS",
		"tag": "Fuel Tanker",
		"vin": "AF9F341A1LRTE2063",
		"reg": "LW24CBGP",
		"client": "SHOWROOM",
		"salesman": "Jean-Pierre De Fillet",
		"seller": "",
		"quoteNo": "SHOWROOM",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2021 HENRED/FRUEHAUF/2021 FUEL TANKER/PUMP AND METERS",
		"location": "Bay 4 Josiah",
		"status": "Accepted by Workshop",
		"instructions": "",
		"priority": "Normal",
		"due": "2026-10-30",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Accepted by Workshop",
		"copy": true
	},
	{
		"id": 17,
		"ws": "WS5629",
		"jobNumber": "JC-2026-0020",
		"year": "2021",
		"make": "GRW BRIDGER",
		"model": "TRI AXLE BRIDGER",
		"description": "GRW BRIDGER TRI AXLE BRIDGER",
		"tag": "Fuel Tanker",
		"vin": "ACGFT5009MA003698",
		"reg": "KGD664MP",
		"client": "INTERSTATE CLEARING 116 (NKOMAZI)",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "INV8620",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2021 GRW BRIDGER TRI AXLE BRIDGER",
		"location": "Yard",
		"status": "In Progress",
		"instructions": "CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION",
		"priority": "Normal",
		"due": "2026-10-09",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 18,
		"ws": "WS5638",
		"jobNumber": "JC-2026-0021",
		"year": "2023",
		"make": "GRW (BARTEC)",
		"model": "TRI-AXLE BARTEC",
		"description": "GRW (BARTEC) TRI-AXLE BARTEC",
		"tag": "Fuel Tanker",
		"vin": "ACGFT5009PA004965",
		"reg": "CS73PMZN",
		"client": "SEBOKENG FUELS",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "8621",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2023 GRW (BARTEC) TRI-AXLE BARTEC",
		"location": "3rd Party: Liquid Flow",
		"status": "In Progress",
		"instructions": "CHANGE LIFT UP AXLE REAR TO FRONT.",
		"priority": "High",
		"due": "2026-10-07",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "In Progress",
		"copy": true
	},
	{
		"id": 19,
		"ws": "WS5639",
		"jobNumber": "JC-2026-0022",
		"year": "2023",
		"make": "GRW (BARTEC)",
		"model": "TRI-AXLE BARTEC",
		"description": "GRW (BARTEC) TRI-AXLE BARTEC",
		"tag": "Fuel Tanker",
		"vin": "ACGFT5009PA004966",
		"reg": "CT00WTZN",
		"client": "SEBOKENG FUELS",
		"salesman": "Sebastian van Biljon",
		"seller": "",
		"quoteNo": "8622",
		"priceExcl": 0,
		"buyExcl": 0,
		"invoiceNo": "",
		"invoiceStatus": "None",
		"sentence": "1 x Used 2023 GRW (BARTEC) TRI-AXLE BARTEC",
		"location": "3rd Party: Liquid Flow",
		"status": "Submitted to Workshop",
		"instructions": "CHANGE REAR LIFT UP AXLE TO FRONT",
		"priority": "High",
		"due": "2026-10-07",
		"photo": "/brand/tanker.jpg",
		"photos": ["/brand/tanker.jpg"],
		"cleared": true,
		"step": "Submitted to Workshop",
		"copy": true
	}
];
var seedTasks = [
	{
		"id": 1,
		"unitId": 1,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "2026-09-29 05:43 Louis Koekemoer: Slp requested",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": ""
	},
	{
		"id": 2,
		"unitId": 1,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": "2026-09-22"
	},
	{
		"id": 3,
		"unitId": 1,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-25"
	},
	{
		"id": 4,
		"unitId": 1,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 5,
		"unitId": 1,
		"job": "B",
		"name": "Touch-ups",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 6,
		"unitId": 1,
		"job": "B",
		"name": "Other: Meter and pump system needs to be de-installed (friedel to quote)",
		"status": "Completed",
		"notes": "Convert to Bridger!!!",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 7,
		"unitId": 1,
		"job": "B",
		"name": "Full respray tank and chassis",
		"status": "Completed",
		"notes": "",
		"location": "Bay 4 Josiah",
		"provider": "",
		"booked": ""
	},
	{
		"id": 8,
		"unitId": 1,
		"job": "B",
		"name": "Parts: 385 tyres",
		"status": "Completed",
		"notes": "2026-09-25 11:52 Jean-Pierre De Fillet: IN WASH BAY TO WASH IN SIDE  OF BARREL",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 9,
		"unitId": 1,
		"job": "B",
		"name": "Activity: Preparation started on refurbishment",
		"status": "Completed",
		"notes": "",
		"location": "Bay 4 Josiah",
		"provider": "",
		"booked": ""
	},
	{
		"id": 10,
		"unitId": 1,
		"job": "B",
		"name": "Activity: FK tankers pressure test",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": ""
	},
	{
		"id": 11,
		"unitId": 2,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: PFT",
		"provider": "PFT",
		"booked": "2026-09-17"
	},
	{
		"id": 12,
		"unitId": 2,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: PFT",
		"provider": "PFT",
		"booked": "2026-09-21"
	},
	{
		"id": 13,
		"unitId": 2,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-17"
	},
	{
		"id": 14,
		"unitId": 2,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 15,
		"unitId": 2,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 16,
		"unitId": 2,
		"job": "B",
		"name": "Activity: Slp by Pft",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 17,
		"unitId": 2,
		"job": "B",
		"name": "Activity: Suspension work",
		"status": "Completed",
		"notes": "2 x Springhanger bushes\nRH rear lifting axle booster\nAIRBAG fault",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 18,
		"unitId": 2,
		"job": "B",
		"name": "Activity: CONTAINERS PRESURE TEST PFT",
		"status": "Completed",
		"notes": "STIL IN PROGRES",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 19,
		"unitId": 2,
		"job": "B",
		"name": "Activity: PFT TO COMPLEAT PRESSURE TEST",
		"status": "Completed",
		"notes": "90 DEGREE BOTTEM VALVE LEAKING",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 20,
		"unitId": 2,
		"job": "B",
		"name": "Activity: AIR BAGS NOT WORKING/REPLACE 2XREAR SPRING HANGER BUSHING/RIGHT REAR BRAKE BOO",
		"status": "Completed",
		"notes": "RIGHT REAR BRAKE BOOSTER LIFT VAXEL BOOSTER TO REPLACE/BOLTS LOOSE LEFT MIDDEL AIR BAG HOUSING",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 21,
		"unitId": 2,
		"job": "B",
		"name": "Parts: 2X LIFT AXEL BRACKETS/ 2X SRING HANGER BUSHING/ GLOBAL AIR BRAKES",
		"status": "Completed",
		"notes": "2026-09-28 13:23 Tiaan Van Wyk: Lift axle system removed completely",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 22,
		"unitId": 3,
		"job": "B",
		"name": "Other: Bestel mudguards en brackets vir sy trok soos vorige keer. Is gelaai op inv.",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 23,
		"unitId": 4,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 24,
		"unitId": 4,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 25,
		"unitId": 4,
		"job": "B",
		"name": "Calibration (if fitted with meters)",
		"status": "In Progress",
		"notes": "Calibration Test — Liquid Flow on 2026-09-21",
		"location": "3rd Party: Liquid Flow",
		"provider": "Liquid Flow",
		"booked": "2026-09-21"
	},
	{
		"id": 26,
		"unitId": 4,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 27,
		"unitId": 4,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-18"
	},
	{
		"id": 28,
		"unitId": 4,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 29,
		"unitId": 4,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 30,
		"unitId": 4,
		"job": "B",
		"name": "Other: Mudguards oor vir sy trok saam brackets asb.",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 31,
		"unitId": 4,
		"job": "B",
		"name": "Parts: 4X 90 DEGREE WHEEL SPEED SENSORS/3XWHEEL SPEED RINGS",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 32,
		"unitId": 4,
		"job": "B",
		"name": "REAR AXEL BRAKE BOOSTERS CONNECTED WITH SUZI PIPE YELLOW TO REPAIR WEN BACK FROM LIQUID FLOW",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 33,
		"unitId": 5,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": "2026-07-07"
	},
	{
		"id": 34,
		"unitId": 5,
		"job": "B",
		"name": "Barrel test - 3 year",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 35,
		"unitId": 5,
		"job": "B",
		"name": "Barrel test - 6 year",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 36,
		"unitId": 5,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: STT",
		"provider": "STT",
		"booked": "2026-07-14"
	},
	{
		"id": 37,
		"unitId": 5,
		"job": "B",
		"name": "Calibration (if fitted with meters)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: Liquid Flow",
		"provider": "Liquid Flow",
		"booked": "2026-07-27"
	},
	{
		"id": 38,
		"unitId": 5,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 39,
		"unitId": 5,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": "2026-09-22"
	},
	{
		"id": 40,
		"unitId": 5,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": "2026-09-22"
	},
	{
		"id": 41,
		"unitId": 5,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 42,
		"unitId": 5,
		"job": "B",
		"name": "Activity: WASH BAY",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 43,
		"unitId": 6,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 44,
		"unitId": 6,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 45,
		"unitId": 6,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 46,
		"unitId": 6,
		"job": "B",
		"name": "Already refurbished",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 47,
		"unitId": 6,
		"job": "B",
		"name": "Other: Trailer was already through workshop - just double check everything, trailer sto",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 48,
		"unitId": 6,
		"job": "B",
		"name": "Activity: STARTING TO REMOVE AND FIT NEW TYRES",
		"status": "In Progress",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 49,
		"unitId": 7,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 50,
		"unitId": 7,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 51,
		"unitId": 7,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 52,
		"unitId": 7,
		"job": "B",
		"name": "Already refurbished",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 53,
		"unitId": 7,
		"job": "B",
		"name": "Other: Please fit spare wheel, fix spare wheel mechanism.",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 54,
		"unitId": 8,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": "2026-08-20"
	},
	{
		"id": 55,
		"unitId": 8,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: STT",
		"provider": "STT",
		"booked": "2026-09-14"
	},
	{
		"id": 56,
		"unitId": 8,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 57,
		"unitId": 8,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": "2026-09-14"
	},
	{
		"id": 58,
		"unitId": 8,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": "2026-09-14"
	},
	{
		"id": 59,
		"unitId": 8,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 60,
		"unitId": 9,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: PFT",
		"provider": "PFT",
		"booked": "2026-09-22"
	},
	{
		"id": 61,
		"unitId": 9,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: STT",
		"provider": "STT",
		"booked": "2026-09-14"
	},
	{
		"id": 62,
		"unitId": 9,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Completed",
		"notes": "",
		"location": "Wash Bay",
		"provider": "",
		"booked": ""
	},
	{
		"id": 63,
		"unitId": 9,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-14"
	},
	{
		"id": 64,
		"unitId": 9,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 65,
		"unitId": 9,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 66,
		"unitId": 9,
		"job": "B",
		"name": "Parts: PREP VALVE TO REPLACE",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 67,
		"unitId": 9,
		"job": "B",
		"name": "Activity: ABS ROWER SUPPLEY TO FIT SCOTTY TO CARRIE OUT WORK",
		"status": "In Progress",
		"notes": "NEW POWER SUPPLEY FOR ABS TO FIT . DUE TO OLD CABLE CUT AND FOUND TO SHORT",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 68,
		"unitId": 10,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-28"
	},
	{
		"id": 69,
		"unitId": 10,
		"job": "B",
		"name": "Brake tests",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 70,
		"unitId": 10,
		"job": "B",
		"name": "Polish cab and clean interior. Showroom condition",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 71,
		"unitId": 11,
		"job": "B",
		"name": "Other: Full respray (Refurbishment)",
		"status": "In Progress",
		"notes": "",
		"location": "Bay 2 Ricardo",
		"provider": "",
		"booked": ""
	},
	{
		"id": 72,
		"unitId": 11,
		"job": "B",
		"name": "Service undercarriage",
		"status": "Not Started",
		"notes": "",
		"location": "Bay 2 Ricardo",
		"provider": "",
		"booked": ""
	},
	{
		"id": 73,
		"unitId": 12,
		"job": "B",
		"name": "Touch-ups",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 74,
		"unitId": 13,
		"job": "B",
		"name": "Touch-ups",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 75,
		"unitId": 13,
		"job": "B",
		"name": "Other: Service undercarriage",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 76,
		"unitId": 13,
		"job": "B",
		"name": "Parts: 2X ANTI SPLASH MUDGAURDS/2X FIRE EXTING BOX",
		"status": "Completed",
		"notes": "",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 77,
		"unitId": 13,
		"job": "B",
		"name": "Parts: 6X HALF ROUND SUPER SINGEL PLASTICK MUDGAURDS HALF ROUD/3X 6 METER SIDE RAIL/ QUALITY PARTS",
		"status": "In Progress",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 78,
		"unitId": 14,
		"job": "B",
		"name": "Activity: UNDER CARRIGE SERVICE",
		"status": "Completed",
		"notes": "CARREY OUT UNDER CARRIGE REPAIRS AND SERVICE",
		"location": "Bay 4 Josiah",
		"provider": "",
		"booked": ""
	},
	{
		"id": 79,
		"unitId": 14,
		"job": "B",
		"name": "Parts: Shock absorber",
		"status": "Completed",
		"notes": "",
		"location": "Bay 4 Josiah",
		"provider": "",
		"booked": ""
	},
	{
		"id": 80,
		"unitId": 15,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "In Progress",
		"notes": "",
		"location": "3rd Party: FK",
		"provider": "FK",
		"booked": "2020-09-29"
	},
	{
		"id": 81,
		"unitId": 15,
		"job": "B",
		"name": "Calibration (if fitted with meters)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: Liquid Flow",
		"provider": "Liquid Flow",
		"booked": "2026-09-29"
	},
	{
		"id": 82,
		"unitId": 15,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 83,
		"unitId": 15,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: East Rand Testing Station",
		"provider": "East Rand Testing Station",
		"booked": "2026-09-30"
	},
	{
		"id": 84,
		"unitId": 15,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 85,
		"unitId": 15,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 86,
		"unitId": 15,
		"job": "B",
		"name": "Other: Kry vir my asb Barrel toets by TC en hoor of ons name change moet doen op hom of",
		"status": "In Progress",
		"notes": "2026-09-29 12:33 Jean-Pierre De Fillet: LOUIE HET REEL MET STAN VIR DIE DATA PACK",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 87,
		"unitId": 16,
		"job": "B",
		"name": "Touch-ups",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 88,
		"unitId": 17,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: PFT",
		"provider": "PFT",
		"booked": "2026-09-08"
	},
	{
		"id": 89,
		"unitId": 17,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: STT",
		"provider": "STT",
		"booked": "2026-09-30"
	},
	{
		"id": 90,
		"unitId": 17,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 91,
		"unitId": 17,
		"job": "B",
		"name": "Roadworthy",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 92,
		"unitId": 17,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 93,
		"unitId": 17,
		"job": "B",
		"name": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION",
		"status": "In Progress",
		"notes": "2026-10-01 07:21 Jean-Pierre De Fillet: ONTHE WAY BACK FROM STT\n2026-10-01 11:13 Jean-Pierre De Fillet: PUT ON HOLD Till FURTHER NOTICE  SABASTIAAN",
		"location": "Yard",
		"provider": "",
		"booked": ""
	},
	{
		"id": 94,
		"unitId": 18,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 95,
		"unitId": 18,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Not Started",
		"notes": "",
		"location": "3rd Party: STT",
		"provider": "STT",
		"booked": "2026-10-05"
	},
	{
		"id": 96,
		"unitId": 18,
		"job": "B",
		"name": "Calibration (if fitted with meters)",
		"status": "Not Started",
		"notes": "2026-10-01 13:34 Louis Koekemoer: Booked for 05/10/2026",
		"location": "3rd Party: Liquid Flow",
		"provider": "Liquid Flow",
		"booked": "2026-10-05"
	},
	{
		"id": 97,
		"unitId": 18,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 98,
		"unitId": 18,
		"job": "B",
		"name": "Roadworthy",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 99,
		"unitId": 18,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 100,
		"unitId": 18,
		"job": "B",
		"name": "Wash / clean for delivery",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 101,
		"unitId": 18,
		"job": "B",
		"name": "Other: CHANGE LIFT UP AXLE REAR TO FRONT.",
		"status": "In Progress",
		"notes": "2026-10-01 13:26 Sebastian van Biljon: WABCO TO CONNECT",
		"location": "Bay 1 Reuben",
		"provider": "",
		"booked": ""
	},
	{
		"id": 102,
		"unitId": 18,
		"job": "B",
		"name": "Outside 3rd party: Program lifting axles — ODRS",
		"status": "Not Started",
		"notes": "",
		"location": "3rd Party: ODRS",
		"provider": "ODRS",
		"booked": "2026-10-01"
	},
	{
		"id": 103,
		"unitId": 19,
		"job": "B",
		"name": "Pressure test (SLP)",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 104,
		"unitId": 19,
		"job": "B",
		"name": "Barrel test - 3 and 6 year",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 105,
		"unitId": 19,
		"job": "B",
		"name": "Calibration (if fitted with meters)",
		"status": "Completed",
		"notes": "",
		"location": "3rd Party: Liquid Flow",
		"provider": "Liquid Flow",
		"booked": ""
	},
	{
		"id": 106,
		"unitId": 19,
		"job": "B",
		"name": "DEKRA spec",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 107,
		"unitId": 19,
		"job": "B",
		"name": "Roadworthy",
		"status": "Completed",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 108,
		"unitId": 19,
		"job": "B",
		"name": "Brake tests",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	},
	{
		"id": 109,
		"unitId": 19,
		"job": "B",
		"name": "Other: CHANGE REAR LIFT UP AXLE TO FRONT",
		"status": "Not Started",
		"notes": "",
		"location": "",
		"provider": "",
		"booked": ""
	}
];
var seedLogs = [
	{
		"id": 1,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:38:58"
	},
	{
		"id": 2,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:39:07"
	},
	{
		"id": 3,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:39:07"
	},
	{
		"id": 4,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:39:27"
	},
	{
		"id": 5,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:39:28"
	},
	{
		"id": 6,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:39:29"
	},
	{
		"id": 7,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:41:59"
	},
	{
		"id": 8,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:42:01"
	},
	{
		"id": 9,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:42:15"
	},
	{
		"id": 10,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:42:16"
	},
	{
		"id": 11,
		"unitId": 1,
		"person": "Louis Koekemoer",
		"line": "385 tyres: Delivered",
		"at": "2026-09-30T13:43:42"
	},
	{
		"id": 12,
		"unitId": 1,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:40"
	},
	{
		"id": 13,
		"unitId": 2,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Activity: Suspension work",
		"at": "2026-09-28T08:24:29"
	},
	{
		"id": 14,
		"unitId": 2,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Activity: Slp by Pft",
		"at": "2026-09-28T08:24:30"
	},
	{
		"id": 15,
		"unitId": 2,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:02:15"
	},
	{
		"id": 16,
		"unitId": 2,
		"person": "Tiaan Van Wyk",
		"line": "Barrel test - 3 and 6 year: status In Progress → Completed",
		"at": "2026-09-28T13:21:10"
	},
	{
		"id": 17,
		"unitId": 2,
		"person": "Tiaan Van Wyk",
		"line": "Activity: AIR BAGS NOT WORKING/REPLACE 2XREAR SPRING HANGER BUSHING/RIGHT REAR BRAKE BOO: status In Progress → Completed",
		"at": "2026-09-28T13:22:47"
	},
	{
		"id": 18,
		"unitId": 2,
		"person": "Tiaan Van Wyk",
		"line": "Parts: 2X LIFT AXEL BRACKETS/ 2X SRING HANGER BUSHING/ GLOBAL AIR BRAKES: status In Progress → Completed",
		"at": "2026-09-28T13:22:54"
	},
	{
		"id": 19,
		"unitId": 2,
		"person": "Tiaan Van Wyk",
		"line": "Parts: 2X LIFT AXEL BRACKETS/ 2X SRING HANGER BUSHING/ GLOBAL AIR BRAKES: note updated",
		"at": "2026-09-28T13:23:16"
	},
	{
		"id": 20,
		"unitId": 2,
		"person": "Tiaan Van Wyk",
		"line": "Activity: Slp by Pft: status In Progress → Completed",
		"at": "2026-09-28T13:23:56"
	},
	{
		"id": 21,
		"unitId": 2,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:28"
	},
	{
		"id": 22,
		"unitId": 2,
		"person": "Louis Koekemoer",
		"line": "Wash / clean for delivery: status Not Started → Completed",
		"at": "2026-09-29T07:07:29"
	},
	{
		"id": 23,
		"unitId": 2,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:27"
	},
	{
		"id": 24,
		"unitId": 2,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:28:14"
	},
	{
		"id": 25,
		"unitId": 3,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Other: Bestel mudguards en brackets vir sy trok soos vorige keer. Is gelaai op inv.",
		"at": "2026-09-17T12:00:27"
	},
	{
		"id": 26,
		"unitId": 3,
		"person": "Jean-Pierre De Fillet",
		"line": "Job accepted by Jean-Pierre De Fillet",
		"at": "2026-09-18T05:09:47"
	},
	{
		"id": 27,
		"unitId": 3,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:05:52"
	},
	{
		"id": 28,
		"unitId": 3,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:13"
	},
	{
		"id": 29,
		"unitId": 3,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:26:56"
	},
	{
		"id": 30,
		"unitId": 3,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:36"
	},
	{
		"id": 31,
		"unitId": 4,
		"person": "Sebastian van Biljon",
		"line": "Follow-up requested: 4X 90 DEGREE WHEEL SPEED SENSORS/3XWHEEL SPEED RINGS on 5339 — LOUIS KOEKEMOER",
		"at": "2026-09-18T21:21:45"
	},
	{
		"id": 32,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Calibration Test — Liquid Flow on 2026-09-21",
		"at": "2026-09-21T06:28:25"
	},
	{
		"id": 33,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Calibration (if fitted with meters): status Not Started → In Progress",
		"at": "2026-09-21T10:02:11"
	},
	{
		"id": 34,
		"unitId": 4,
		"person": "Sebastian van Biljon",
		"line": "Workshop responded to sales update request",
		"at": "2026-09-21T17:14:19"
	},
	{
		"id": 35,
		"unitId": 4,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: REAR AXEL BRAKE BOOSTERS CONNECTED WITH SUZI PIPE YELLOW TO REPAIR WEN BACK FROM LIQUID FLOW",
		"at": "2026-09-21T17:14:53"
	},
	{
		"id": 36,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard",
		"at": "2026-09-22T11:54:11"
	},
	{
		"id": 37,
		"unitId": 4,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Parts: 4X 90 DEGREE WHEEL SPEED SENSORS/3XWHEEL SPEED RINGS",
		"at": "2026-09-28T08:24:23"
	},
	{
		"id": 38,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T09:37:39"
	},
	{
		"id": 39,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:05:32"
	},
	{
		"id": 40,
		"unitId": 4,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:11"
	},
	{
		"id": 41,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:25:44"
	},
	{
		"id": 42,
		"unitId": 4,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:33"
	},
	{
		"id": 43,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "DEKRA spec: status Not Started → Completed",
		"at": "2026-09-22T06:46:35"
	},
	{
		"id": 44,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Pressure test (SLP): 3rd party —",
		"at": "2026-09-22T06:47:31"
	},
	{
		"id": 45,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Pressure test (SLP): 3rd party FK",
		"at": "2026-09-22T06:47:44"
	},
	{
		"id": 46,
		"unitId": 5,
		"person": "Louis Koekemoer",
		"line": "Roadworthy: status Completed → Completed",
		"at": "2026-09-22T06:51:41"
	},
	{
		"id": 47,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard — WASH BAY",
		"at": "2026-09-22T06:52:04"
	},
	{
		"id": 48,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Wash / clean for delivery: status In Progress → Completed",
		"at": "2026-09-22T06:56:45"
	},
	{
		"id": 49,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Activity: WASH BAY: status In Progress → Completed",
		"at": "2026-09-22T06:57:01"
	},
	{
		"id": 50,
		"unitId": 5,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Activity: WASH BAY",
		"at": "2026-09-28T08:24:22"
	},
	{
		"id": 51,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:05:58"
	},
	{
		"id": 52,
		"unitId": 5,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:17"
	},
	{
		"id": 53,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:07"
	},
	{
		"id": 54,
		"unitId": 5,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:38"
	},
	{
		"id": 55,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Job accepted by Jean-Pierre De Fillet",
		"at": "2026-09-23T04:42:30"
	},
	{
		"id": 56,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status Not Started → In Progress",
		"at": "2026-09-23T04:42:39"
	},
	{
		"id": 57,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status In Progress → Completed",
		"at": "2026-09-23T08:01:17"
	},
	{
		"id": 58,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status Completed → Completed",
		"at": "2026-09-23T08:01:19"
	},
	{
		"id": 59,
		"unitId": 6,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Other: Trailer was already through workshop - just double check everything, trailer sto",
		"at": "2026-09-25T08:30:12"
	},
	{
		"id": 60,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:06:03"
	},
	{
		"id": 61,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard — STARTING TO REMOVE AND FIT NEW TYRES",
		"at": "2026-09-28T11:18:19"
	},
	{
		"id": 62,
		"unitId": 6,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Activity: STARTING TO REMOVE AND FIT NEW TYRES",
		"at": "2026-09-28T11:28:01"
	},
	{
		"id": 63,
		"unitId": 6,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:38:35"
	},
	{
		"id": 64,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:38"
	},
	{
		"id": 65,
		"unitId": 6,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:28:16"
	},
	{
		"id": 66,
		"unitId": 7,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Other: Please fit spare wheel, fix spare wheel mechanism.",
		"at": "2026-09-23T07:39:21"
	},
	{
		"id": 67,
		"unitId": 7,
		"person": "Sebastian van Biljon",
		"line": "Already refurbished: status Not Started → In Progress",
		"at": "2026-09-25T20:05:52"
	},
	{
		"id": 68,
		"unitId": 7,
		"person": "Sebastian van Biljon",
		"line": "Other: Please fit spare wheel, fix spare wheel mechanism.: status Not Started → Completed",
		"at": "2026-09-25T20:05:53"
	},
	{
		"id": 69,
		"unitId": 7,
		"person": "Sebastian van Biljon",
		"line": "Already refurbished: status In Progress → Completed",
		"at": "2026-09-25T20:06:01"
	},
	{
		"id": 70,
		"unitId": 7,
		"person": "Sebastian van Biljon",
		"line": "Other: Please fit spare wheel, fix spare wheel mechanism.: status Completed → Not Started",
		"at": "2026-09-25T20:06:06"
	},
	{
		"id": 71,
		"unitId": 7,
		"person": "Rob Ling",
		"line": "Sales requested an update: please update regarding sparewheel carrier",
		"at": "2026-09-28T08:34:02"
	},
	{
		"id": 72,
		"unitId": 7,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: Please fit spare wheel, fix spare wheel mechanism.: status Not Started → Completed",
		"at": "2026-09-28T09:20:00"
	},
	{
		"id": 73,
		"unitId": 7,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:06:01"
	},
	{
		"id": 74,
		"unitId": 7,
		"person": "Jean-Pierre De Fillet",
		"line": "Workshop responded to sales update request",
		"at": "2026-09-28T10:07:55"
	},
	{
		"id": 75,
		"unitId": 7,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:38:31"
	},
	{
		"id": 76,
		"unitId": 7,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:33"
	},
	{
		"id": 77,
		"unitId": 7,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:28:12"
	},
	{
		"id": 78,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status In Progress → Completed",
		"at": "2026-09-23T05:15:39"
	},
	{
		"id": 79,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status Completed → Completed",
		"at": "2026-09-23T05:15:41"
	},
	{
		"id": 80,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard",
		"at": "2026-09-23T08:51:50"
	},
	{
		"id": 81,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Brake tests: 3rd party —",
		"at": "2026-09-23T08:52:35"
	},
	{
		"id": 82,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Brake tests: 3rd party —",
		"at": "2026-09-23T08:52:40"
	},
	{
		"id": 83,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Brake tests: status Not Started → Completed",
		"at": "2026-09-23T08:52:46"
	},
	{
		"id": 84,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Wash / clean for delivery: status Not Started → Completed",
		"at": "2026-09-23T08:52:54"
	},
	{
		"id": 85,
		"unitId": 8,
		"person": "Stanley Johnson",
		"line": "Vehicle details corrected: WS 5422 Tanker 2014 → WS 5422 Tank clinic 2014",
		"at": "2026-09-25T11:49:43"
	},
	{
		"id": 86,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:05:34"
	},
	{
		"id": 87,
		"unitId": 8,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:15"
	},
	{
		"id": 88,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:03"
	},
	{
		"id": 89,
		"unitId": 8,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:37"
	},
	{
		"id": 90,
		"unitId": 9,
		"person": "Sebastian van Biljon",
		"line": "Vehicle details corrected: WS5424 Tank Clinic 2014 → WS5424 Tank Clinic 2014",
		"at": "2026-09-25T11:44:48"
	},
	{
		"id": 91,
		"unitId": 9,
		"person": "Sebastian van Biljon",
		"line": "Vehicle details corrected: WS5424 Tank Clinic 2014 → WS5424 Tank Clinic 2014",
		"at": "2026-09-25T11:45:06"
	},
	{
		"id": 92,
		"unitId": 9,
		"person": "Sebastian van Biljon",
		"line": "Vehicle details corrected: WS5424 Tank Clinic 2014 → WS5424 Tank Clinic 2014",
		"at": "2026-09-25T11:45:09"
	},
	{
		"id": 93,
		"unitId": 9,
		"person": "Stanley Johnson",
		"line": "Vehicle details corrected: WS5424 Tank Clinic 2014 → WS5424 Tank clinic 2014",
		"at": "2026-09-25T11:49:01"
	},
	{
		"id": 94,
		"unitId": 9,
		"person": "Jean-Pierre De Fillet",
		"line": "Barrel test - 3 and 6 year: status In Progress → Completed",
		"at": "2026-09-28T07:51:14"
	},
	{
		"id": 95,
		"unitId": 9,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard — ABS ROWER SUPPLEY TO FIT SCOTTY TO CARRIE OUT WORK",
		"at": "2026-09-28T08:05:18"
	},
	{
		"id": 96,
		"unitId": 9,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Activity: ABS ROWER SUPPLEY TO FIT SCOTTY TO CARRIE OUT WORK",
		"at": "2026-09-28T08:24:18"
	},
	{
		"id": 97,
		"unitId": 9,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Parts: PREP VALVE TO REPLACE",
		"at": "2026-09-28T08:24:21"
	},
	{
		"id": 98,
		"unitId": 9,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:02:14"
	},
	{
		"id": 99,
		"unitId": 9,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:22"
	},
	{
		"id": 100,
		"unitId": 9,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:23"
	},
	{
		"id": 101,
		"unitId": 9,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:28:10"
	},
	{
		"id": 102,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: 3rd party East Rand Testing Station",
		"at": "2026-09-28T07:50:01"
	},
	{
		"id": 103,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: 3rd party East Rand Testing Station",
		"at": "2026-09-28T07:50:01"
	},
	{
		"id": 104,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Roadworthy: status Completed → Completed",
		"at": "2026-09-28T07:50:06"
	},
	{
		"id": 105,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Brake tests: status Not Started → Completed",
		"at": "2026-09-28T07:50:18"
	},
	{
		"id": 106,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Brake tests: location Yard",
		"at": "2026-09-28T07:50:25"
	},
	{
		"id": 107,
		"unitId": 10,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:01:45"
	},
	{
		"id": 108,
		"unitId": 10,
		"person": "Louis Koekemoer",
		"line": "Roadworthy: status Completed → Completed",
		"at": "2026-09-28T10:03:46"
	},
	{
		"id": 109,
		"unitId": 10,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-29T05:39:20"
	},
	{
		"id": 110,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-30T05:27:13"
	},
	{
		"id": 111,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:39"
	},
	{
		"id": 112,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Polish cab and clean interior. Showroom condition: status Not Started → Completed",
		"at": "2026-10-01T04:58:52"
	},
	{
		"id": 113,
		"unitId": 10,
		"person": "Jean-Pierre De Fillet",
		"line": "Polish cab and clean interior. Showroom condition: status Completed → Completed",
		"at": "2026-10-01T04:58:55"
	},
	{
		"id": 114,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-09-28T10:06:05"
	},
	{
		"id": 115,
		"unitId": 11,
		"person": "Sebastian van Biljon",
		"line": "Sales requested an update: Jean??? Waar staan die tanker???",
		"at": "2026-09-28T10:12:17"
	},
	{
		"id": 116,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Tanker empty check signed by workshop — compartments and pipelines to APIs empty",
		"at": "2026-09-28T10:12:40"
	},
	{
		"id": 117,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Workshop responded to sales update request",
		"at": "2026-09-28T10:12:45"
	},
	{
		"id": 118,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: Full respray (Refurbishment): location Bay 2 Ricardo",
		"at": "2026-09-28T10:13:23"
	},
	{
		"id": 119,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Service undercarriage: location Bay 2 Ricardo",
		"at": "2026-09-28T10:13:27"
	},
	{
		"id": 120,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Service undercarriage: note updated",
		"at": "2026-09-28T10:13:28"
	},
	{
		"id": 121,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: Full respray (Refurbishment): note updated",
		"at": "2026-09-28T10:13:29"
	},
	{
		"id": 122,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Bay 2 Ricardo",
		"at": "2026-09-28T10:14:16"
	},
	{
		"id": 123,
		"unitId": 11,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Bay 2 Ricardo",
		"at": "2026-09-29T05:38:10"
	},
	{
		"id": 124,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 2 Ricardo",
		"at": "2026-09-30T05:28:05"
	},
	{
		"id": 125,
		"unitId": 11,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 2 Ricardo",
		"at": "2026-10-01T04:28:27"
	},
	{
		"id": 126,
		"unitId": 12,
		"person": "Sebastian van Biljon",
		"line": "Showroom job approved by Sebastian van Biljon",
		"at": "2026-09-28T11:11:51"
	},
	{
		"id": 127,
		"unitId": 12,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 3 Jonas",
		"at": "2026-09-28T11:12:28"
	},
	{
		"id": 128,
		"unitId": 12,
		"person": "Jean-Pierre De Fillet",
		"line": "Job accepted by Jean-Pierre De Fillet",
		"at": "2026-09-28T11:12:51"
	},
	{
		"id": 129,
		"unitId": 12,
		"person": "Louis Koekemoer",
		"line": "Morning location confirmed: Bay 3 Jonas",
		"at": "2026-09-29T05:38:13"
	},
	{
		"id": 130,
		"unitId": 12,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 3 Jonas",
		"at": "2026-09-30T05:28:11"
	},
	{
		"id": 131,
		"unitId": 12,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 3 Jonas",
		"at": "2026-10-01T04:28:29"
	},
	{
		"id": 132,
		"unitId": 13,
		"person": "Louis Koekemoer",
		"line": "6X HALF ROUND SUPER SINGEL PLASTICK MUDGAURDS HALF ROUD/3X 6 METER SIDE RAIL/ QUALITY PARTS: Delivered",
		"at": "2026-09-30T13:33:44"
	},
	{
		"id": 133,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 1 Reuben",
		"at": "2026-10-01T04:28:26"
	},
	{
		"id": 134,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Touch-ups: status In Progress → Completed",
		"at": "2026-10-01T04:50:32"
	},
	{
		"id": 135,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Bay 1 Reuben → Yard",
		"at": "2026-10-01T04:50:37"
	},
	{
		"id": 136,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Touch-ups: location Yard",
		"at": "2026-10-01T04:50:37"
	},
	{
		"id": 137,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: Service undercarriage: location Yard",
		"at": "2026-10-01T04:50:46"
	},
	{
		"id": 138,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Yard → Bay 1 Reuben",
		"at": "2026-10-01T04:51:36"
	},
	{
		"id": 139,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Bay 1 Reuben",
		"at": "2026-10-01T04:51:36"
	},
	{
		"id": 140,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Bay 1 Reuben → Yard",
		"at": "2026-10-01T12:27:59"
	},
	{
		"id": 141,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Yard",
		"at": "2026-10-01T12:27:59"
	},
	{
		"id": 142,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Parts: 2X ANTI SPLASH MUDGAURDS/2X FIRE EXTING BOX: status In Progress → Completed",
		"at": "2026-10-01T12:28:26"
	},
	{
		"id": 143,
		"unitId": 13,
		"person": "Jean-Pierre De Fillet",
		"line": "Parts: 2X ANTI SPLASH MUDGAURDS/2X FIRE EXTING BOX: location Yard",
		"at": "2026-10-01T12:28:30"
	},
	{
		"id": 144,
		"unitId": 14,
		"person": "Louis Koekemoer",
		"line": "Job accepted by Louis Koekemoer",
		"at": "2026-09-29T07:01:29"
	},
	{
		"id": 145,
		"unitId": 14,
		"person": "Louis Koekemoer",
		"line": "Parts: Shock absorber: status Not Started → In Progress",
		"at": "2026-09-29T07:02:10"
	},
	{
		"id": 146,
		"unitId": 14,
		"person": "Louis Koekemoer",
		"line": "Parts: Shock absorber: location Bay 4 Josiah",
		"at": "2026-09-29T07:02:19"
	},
	{
		"id": 147,
		"unitId": 14,
		"person": "Louis Koekemoer",
		"line": "Parts: Shock absorber: status In Progress → In Progress",
		"at": "2026-09-29T07:03:21"
	},
	{
		"id": 148,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Activity: UNDER CARRIGE SERVICE: status In Progress → Completed",
		"at": "2026-09-29T07:32:50"
	},
	{
		"id": 149,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Parts: Shock absorber: status In Progress → Completed",
		"at": "2026-09-29T07:33:04"
	},
	{
		"id": 150,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Parts: Shock absorber: status Completed → Completed",
		"at": "2026-09-29T07:33:06"
	},
	{
		"id": 151,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Bay 4 Josiah",
		"at": "2026-09-29T07:33:32"
	},
	{
		"id": 152,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Parts: Shock absorber: status Completed → Completed",
		"at": "2026-09-29T07:34:02"
	},
	{
		"id": 153,
		"unitId": 14,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Parts: Shock absorber",
		"at": "2026-09-29T08:27:56"
	},
	{
		"id": 154,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 4 Josiah",
		"at": "2026-09-30T05:27:42"
	},
	{
		"id": 155,
		"unitId": 14,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 4 Josiah",
		"at": "2026-10-01T04:28:21"
	},
	{
		"id": 156,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Pressure test (SLP): status Not Started → In Progress",
		"at": "2026-09-30T13:19:10"
	},
	{
		"id": 157,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: 3rd Party: East Rand Testing Station → Yard",
		"at": "2026-09-30T13:19:19"
	},
	{
		"id": 158,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Pressure test (SLP): location Yard",
		"at": "2026-09-30T13:19:19"
	},
	{
		"id": 159,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Yard → 3rd Party: FK",
		"at": "2026-09-30T13:19:23"
	},
	{
		"id": 160,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Pressure test (SLP): 3rd party FK",
		"at": "2026-09-30T13:19:23"
	},
	{
		"id": 161,
		"unitId": 15,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:49:34"
	},
	{
		"id": 162,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): note updated",
		"at": "2026-10-01T13:11:51"
	},
	{
		"id": 163,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): status In Progress → Not Started",
		"at": "2026-10-01T13:12:05"
	},
	{
		"id": 164,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): note updated",
		"at": "2026-10-01T13:12:06"
	},
	{
		"id": 165,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): note updated",
		"at": "2026-10-01T13:12:10"
	},
	{
		"id": 166,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): status Not Started → In Progress",
		"at": "2026-10-01T13:12:25"
	},
	{
		"id": 167,
		"unitId": 15,
		"person": "Sebastian van Biljon",
		"line": "Pressure test (SLP): note updated",
		"at": "2026-10-01T13:12:26"
	},
	{
		"id": 168,
		"unitId": 16,
		"person": "Sebastian van Biljon",
		"line": "Showroom job approved by Sebastian van Biljon",
		"at": "2026-09-29T10:16:40"
	},
	{
		"id": 169,
		"unitId": 16,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 4 Josiah",
		"at": "2026-09-29T10:19:13"
	},
	{
		"id": 170,
		"unitId": 16,
		"person": "Tiaan Van Wyk",
		"line": "Job accepted by Tiaan Van Wyk",
		"at": "2026-09-29T10:21:00"
	},
	{
		"id": 171,
		"unitId": 16,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 4 Josiah",
		"at": "2026-09-30T05:28:13"
	},
	{
		"id": 172,
		"unitId": 16,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Bay 4 Josiah",
		"at": "2026-10-01T04:28:30"
	},
	{
		"id": 173,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Barrel test - 3 and 6 year: 3rd party STT",
		"at": "2026-09-30T05:34:20"
	},
	{
		"id": 174,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Barrel test - 3 and 6 year: 3rd party STT",
		"at": "2026-09-30T05:34:49"
	},
	{
		"id": 175,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Barrel test - 3 and 6 year: 3rd party STT",
		"at": "2026-09-30T05:34:50"
	},
	{
		"id": 176,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T04:28:24"
	},
	{
		"id": 177,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Barrel test - 3 and 6 year: status In Progress → Completed",
		"at": "2026-10-01T07:20:40"
	},
	{
		"id": 178,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION: status Not Started → In Progress",
		"at": "2026-10-01T07:21:12"
	},
	{
		"id": 179,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Yard → Bay 1 Reuben",
		"at": "2026-10-01T07:21:41"
	},
	{
		"id": 180,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION: location Bay 1 Reuben",
		"at": "2026-10-01T07:21:41"
	},
	{
		"id": 181,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION: note updated",
		"at": "2026-10-01T07:21:55"
	},
	{
		"id": 182,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Location changed: Bay 1 Reuben → Yard",
		"at": "2026-10-01T11:13:20"
	},
	{
		"id": 183,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION: location Yard",
		"at": "2026-10-01T11:13:20"
	},
	{
		"id": 184,
		"unitId": 17,
		"person": "Jean-Pierre De Fillet",
		"line": "Other: CUSTOM PAINT JOB TO CUSTOMERS SPECIFICATION: note updated",
		"at": "2026-10-01T11:13:23"
	},
	{
		"id": 185,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Job accepted by Louis Koekemoer",
		"at": "2026-10-01T13:25:40"
	},
	{
		"id": 186,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Other: CHANGE LIFT UP AXLE REAR TO FRONT.: status In Progress → In Progress",
		"at": "2026-10-01T13:26:14"
	},
	{
		"id": 187,
		"unitId": 18,
		"person": "Sebastian van Biljon",
		"line": "Other: CHANGE LIFT UP AXLE REAR TO FRONT.: note updated",
		"at": "2026-10-01T13:26:29"
	},
	{
		"id": 188,
		"unitId": 18,
		"person": "Sebastian van Biljon",
		"line": "Location changed: 3rd Party: Liquid Flow → 3rd Party: STT",
		"at": "2026-10-01T13:26:59"
	},
	{
		"id": 189,
		"unitId": 18,
		"person": "Sebastian van Biljon",
		"line": "Barrel test - 3 and 6 year: 3rd party STT",
		"at": "2026-10-01T13:26:59"
	},
	{
		"id": 190,
		"unitId": 18,
		"person": "Sebastian van Biljon",
		"line": "Barrel test - 3 and 6 year: 3rd party STT",
		"at": "2026-10-01T13:27:03"
	},
	{
		"id": 191,
		"unitId": 18,
		"person": "Sebastian van Biljon",
		"line": "Barrel test - 3 and 6 year: note updated",
		"at": "2026-10-01T13:27:06"
	},
	{
		"id": 192,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Program lifting axles — ODRS on 2026-10-01",
		"at": "2026-10-01T13:27:20"
	},
	{
		"id": 193,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Location changed: 3rd Party: STT → 3rd Party: ODRS",
		"at": "2026-10-01T13:27:20"
	},
	{
		"id": 194,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Location changed: 3rd Party: ODRS → 3rd Party: Liquid Flow",
		"at": "2026-10-01T13:34:09"
	},
	{
		"id": 195,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Calibration (if fitted with meters): 3rd party Liquid Flow",
		"at": "2026-10-01T13:34:09"
	},
	{
		"id": 196,
		"unitId": 18,
		"person": "Louis Koekemoer",
		"line": "Calibration (if fitted with meters): note updated",
		"at": "2026-10-01T13:34:41"
	},
	{
		"id": 197,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Admin approved extra task: Other: CHANGE REAR LIFT UP AXLE TO FRONT",
		"at": "2026-10-01T12:17:04"
	},
	{
		"id": 198,
		"unitId": 19,
		"person": "Jean-Pierre De Fillet",
		"line": "Morning location confirmed: Yard",
		"at": "2026-10-01T12:29:08"
	},
	{
		"id": 199,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Location changed: Yard → 3rd Party: Liquid Flow",
		"at": "2026-10-01T13:33:00"
	},
	{
		"id": 200,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Calibration (if fitted with meters): 3rd party Liquid Flow",
		"at": "2026-10-01T13:33:00"
	},
	{
		"id": 201,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Calibration (if fitted with meters): status Not Started → Completed",
		"at": "2026-10-01T13:33:03"
	},
	{
		"id": 202,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Calibration (if fitted with meters): note updated",
		"at": "2026-10-01T13:33:06"
	},
	{
		"id": 203,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Roadworthy: status Not Started → Completed",
		"at": "2026-10-01T13:33:27"
	},
	{
		"id": 204,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Roadworthy: note updated",
		"at": "2026-10-01T13:33:30"
	},
	{
		"id": 205,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Brake tests: status Not Started → Completed",
		"at": "2026-10-01T13:33:32"
	},
	{
		"id": 206,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Brake tests: note updated",
		"at": "2026-10-01T13:33:33"
	},
	{
		"id": 207,
		"unitId": 19,
		"person": "Sebastian van Biljon",
		"line": "Brake tests: status Completed → Not Started",
		"at": "2026-10-01T13:33:36"
	}
];
var seedPdi = [
	{
		"id": 1,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": "Pass"
	},
	{
		"id": 2,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": "Pass"
	},
	{
		"id": 3,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": "Pass"
	},
	{
		"id": 4,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": "Pass"
	},
	{
		"id": 5,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": "Pass"
	},
	{
		"id": 6,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": "Pass"
	},
	{
		"id": 7,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": "Pass"
	},
	{
		"id": 8,
		"unitId": 1,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": "Pass"
	},
	{
		"id": 9,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": "Pass"
	},
	{
		"id": 10,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": "Pass"
	},
	{
		"id": 11,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": "Pass"
	},
	{
		"id": 12,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": "Pass"
	},
	{
		"id": 13,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": "Pass"
	},
	{
		"id": 14,
		"unitId": 1,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Remove all strikers from air pipes",
		"status": "Pass"
	},
	{
		"id": 15,
		"unitId": 1,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": "Pass"
	},
	{
		"id": 16,
		"unitId": 1,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": "Pass"
	},
	{
		"id": 17,
		"unitId": 1,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": "Pass"
	},
	{
		"id": 18,
		"unitId": 1,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": "Pass"
	},
	{
		"id": 19,
		"unitId": 1,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Tanker ride height / level valves",
		"status": "Pass"
	},
	{
		"id": 20,
		"unitId": 1,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Indicators / hazards",
		"status": "Pass"
	},
	{
		"id": 21,
		"unitId": 1,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Side marker lights & rear tail lights",
		"status": "Pass"
	},
	{
		"id": 22,
		"unitId": 1,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Reverse buzzer",
		"status": "Pass"
	},
	{
		"id": 23,
		"unitId": 1,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Power cable / screen / electrical connections",
		"status": "Pass"
	},
	{
		"id": 24,
		"unitId": 1,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Light switch / control box",
		"status": "Pass"
	},
	{
		"id": 25,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 26,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 27,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 28,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 29,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": ""
	},
	{
		"id": 30,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": ""
	},
	{
		"id": 31,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": ""
	},
	{
		"id": 32,
		"unitId": 2,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": ""
	},
	{
		"id": 33,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": ""
	},
	{
		"id": 34,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": ""
	},
	{
		"id": 35,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": ""
	},
	{
		"id": 36,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 37,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": ""
	},
	{
		"id": 38,
		"unitId": 2,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Remove all strikers from air pipes",
		"status": ""
	},
	{
		"id": 39,
		"unitId": 2,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 40,
		"unitId": 2,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 41,
		"unitId": 2,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 42,
		"unitId": 2,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 43,
		"unitId": 2,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Tanker ride height / level valves",
		"status": ""
	},
	{
		"id": 44,
		"unitId": 2,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Indicators / hazards",
		"status": ""
	},
	{
		"id": 45,
		"unitId": 2,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Side marker lights & rear tail lights",
		"status": ""
	},
	{
		"id": 46,
		"unitId": 2,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Reverse buzzer",
		"status": ""
	},
	{
		"id": 47,
		"unitId": 2,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Power cable / screen / electrical connections",
		"status": ""
	},
	{
		"id": 48,
		"unitId": 2,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Light switch / control box",
		"status": ""
	},
	{
		"id": 49,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 50,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 51,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 52,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 53,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": ""
	},
	{
		"id": 54,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": ""
	},
	{
		"id": 55,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": ""
	},
	{
		"id": 56,
		"unitId": 5,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": ""
	},
	{
		"id": 57,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": ""
	},
	{
		"id": 58,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": ""
	},
	{
		"id": 59,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": ""
	},
	{
		"id": 60,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 61,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": ""
	},
	{
		"id": 62,
		"unitId": 5,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Remove all strikers from air pipes",
		"status": ""
	},
	{
		"id": 63,
		"unitId": 5,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 64,
		"unitId": 5,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 65,
		"unitId": 5,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 66,
		"unitId": 5,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 67,
		"unitId": 5,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Tanker ride height / level valves",
		"status": ""
	},
	{
		"id": 68,
		"unitId": 5,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Indicators / hazards",
		"status": ""
	},
	{
		"id": 69,
		"unitId": 5,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Side marker lights & rear tail lights",
		"status": ""
	},
	{
		"id": 70,
		"unitId": 5,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Reverse buzzer",
		"status": ""
	},
	{
		"id": 71,
		"unitId": 5,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Power cable / screen / electrical connections",
		"status": ""
	},
	{
		"id": 72,
		"unitId": 5,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Light switch / control box",
		"status": ""
	},
	{
		"id": 73,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 74,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 75,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 76,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 77,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": ""
	},
	{
		"id": 78,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": ""
	},
	{
		"id": 79,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": ""
	},
	{
		"id": 80,
		"unitId": 7,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": ""
	},
	{
		"id": 81,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": ""
	},
	{
		"id": 82,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": ""
	},
	{
		"id": 83,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": ""
	},
	{
		"id": 84,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 85,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Hand / park brake",
		"status": ""
	},
	{
		"id": 86,
		"unitId": 7,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": ""
	},
	{
		"id": 87,
		"unitId": 7,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 88,
		"unitId": 7,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 89,
		"unitId": 7,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 90,
		"unitId": 7,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 91,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Headlights",
		"status": ""
	},
	{
		"id": 92,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Indicators / hazard lights",
		"status": ""
	},
	{
		"id": 93,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Side marker lights",
		"status": ""
	},
	{
		"id": 94,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Tail lights, brake lights, reverse lights",
		"status": ""
	},
	{
		"id": 95,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Fog lights (if fitted)",
		"status": ""
	},
	{
		"id": 96,
		"unitId": 7,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Reverse buzzer / alarm",
		"status": ""
	},
	{
		"id": 97,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 98,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 99,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 100,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 101,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": ""
	},
	{
		"id": 102,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": ""
	},
	{
		"id": 103,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": ""
	},
	{
		"id": 104,
		"unitId": 9,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": ""
	},
	{
		"id": 105,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": ""
	},
	{
		"id": 106,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": ""
	},
	{
		"id": 107,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": ""
	},
	{
		"id": 108,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 109,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": ""
	},
	{
		"id": 110,
		"unitId": 9,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Remove all strikers from air pipes",
		"status": ""
	},
	{
		"id": 111,
		"unitId": 9,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 112,
		"unitId": 9,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 113,
		"unitId": 9,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 114,
		"unitId": 9,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 115,
		"unitId": 9,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Tanker ride height / level valves",
		"status": ""
	},
	{
		"id": 116,
		"unitId": 9,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Indicators / hazards",
		"status": ""
	},
	{
		"id": 117,
		"unitId": 9,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Side marker lights & rear tail lights",
		"status": ""
	},
	{
		"id": 118,
		"unitId": 9,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Reverse buzzer",
		"status": ""
	},
	{
		"id": 119,
		"unitId": 9,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Power cable / screen / electrical connections",
		"status": ""
	},
	{
		"id": 120,
		"unitId": 9,
		"section": "4. LIGHTS & ELECTRICAL",
		"item": "Light switch / control box",
		"status": ""
	},
	{
		"id": 121,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 122,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 123,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 124,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 125,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards (front & rear)",
		"status": ""
	},
	{
		"id": 126,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudflaps",
		"status": ""
	},
	{
		"id": 127,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguard end caps",
		"status": ""
	},
	{
		"id": 128,
		"unitId": 10,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel indicators / markers",
		"status": ""
	},
	{
		"id": 129,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Service brakes",
		"status": ""
	},
	{
		"id": 130,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brake boosters / chambers",
		"status": ""
	},
	{
		"id": 131,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS system",
		"status": ""
	},
	{
		"id": 132,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 133,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Hand / park brake",
		"status": ""
	},
	{
		"id": 134,
		"unitId": 10,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air leaks check",
		"status": ""
	},
	{
		"id": 135,
		"unitId": 10,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 136,
		"unitId": 10,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 137,
		"unitId": 10,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 138,
		"unitId": 10,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 139,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Headlights",
		"status": ""
	},
	{
		"id": 140,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Indicators / hazard lights",
		"status": ""
	},
	{
		"id": 141,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Side marker lights",
		"status": ""
	},
	{
		"id": 142,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Tail lights, brake lights, reverse lights",
		"status": ""
	},
	{
		"id": 143,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Fog lights (if fitted)",
		"status": ""
	},
	{
		"id": 144,
		"unitId": 10,
		"section": "4. LIGHTS, INDICATORS & ELECTRICAL",
		"item": "Reverse buzzer / alarm",
		"status": ""
	},
	{
		"id": 145,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel nuts fastened",
		"status": ""
	},
	{
		"id": 146,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel studs condition",
		"status": ""
	},
	{
		"id": 147,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Tyres – condition & pressure",
		"status": ""
	},
	{
		"id": 148,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Rims / Wheels",
		"status": ""
	},
	{
		"id": 149,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Mudguards & mudflaps",
		"status": ""
	},
	{
		"id": 150,
		"unitId": 14,
		"section": "1. WHEELS, TYRES & RIMS",
		"item": "Wheel markers",
		"status": ""
	},
	{
		"id": 151,
		"unitId": 14,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Brakes",
		"status": ""
	},
	{
		"id": 152,
		"unitId": 14,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Air system",
		"status": ""
	},
	{
		"id": 153,
		"unitId": 14,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "ABS / EBS",
		"status": ""
	},
	{
		"id": 154,
		"unitId": 14,
		"section": "2. BRAKES & AIR SYSTEM",
		"item": "Park brake",
		"status": ""
	},
	{
		"id": 155,
		"unitId": 14,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Suspension overall",
		"status": ""
	},
	{
		"id": 156,
		"unitId": 14,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Airbags (if equipped)",
		"status": ""
	},
	{
		"id": 157,
		"unitId": 14,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Shock absorbers",
		"status": ""
	},
	{
		"id": 158,
		"unitId": 14,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Lift axle (if equipped)",
		"status": ""
	},
	{
		"id": 159,
		"unitId": 14,
		"section": "3. SUSPENSION & RUNNING GEAR",
		"item": "Landing legs",
		"status": ""
	},
	{
		"id": 160,
		"unitId": 14,
		"section": "4. COUPLING & STRUCTURE",
		"item": "Fifth wheel / kingpin",
		"status": ""
	},
	{
		"id": 161,
		"unitId": 14,
		"section": "4. COUPLING & STRUCTURE",
		"item": "No loose hanging pipes or wiring",
		"status": ""
	},
	{
		"id": 162,
		"unitId": 14,
		"section": "4. COUPLING & STRUCTURE",
		"item": "Spare wheel",
		"status": ""
	},
	{
		"id": 163,
		"unitId": 14,
		"section": "4. COUPLING & STRUCTURE",
		"item": "Spare wheel hangers / carrier",
		"status": ""
	},
	{
		"id": 164,
		"unitId": 14,
		"section": "5. TIPPER SPECIFIC (if applicable)",
		"item": "Tipper lift cylinder(s)",
		"status": ""
	},
	{
		"id": 165,
		"unitId": 14,
		"section": "5. TIPPER SPECIFIC (if applicable)",
		"item": "Tipper hydraulics",
		"status": ""
	},
	{
		"id": 166,
		"unitId": 14,
		"section": "5. TIPPER SPECIFIC (if applicable)",
		"item": "Chock blocks & holding brackets",
		"status": ""
	},
	{
		"id": 167,
		"unitId": 14,
		"section": "5. TIPPER SPECIFIC (if applicable)",
		"item": "Sails / covers (if fitted)",
		"status": ""
	},
	{
		"id": 168,
		"unitId": 14,
		"section": "5. TIPPER SPECIFIC (if applicable)",
		"item": "Belt / ratchets to lock sails",
		"status": ""
	}
];
var STAFF = [
	{
		name: "Sebastian van Biljon",
		code: "BVB",
		role: "director"
	},
	{
		name: "Siegfried van Biljon",
		code: "SVB",
		role: "director"
	},
	{
		name: "Cindy",
		code: "",
		role: "accounts"
	},
	{
		name: "Chantelle",
		code: "",
		role: "stock"
	},
	{
		name: "Fanie van Biljon",
		code: "FVB",
		role: "sales"
	},
	{
		name: "Stanley Johnson",
		code: "SJ",
		role: "sales"
	},
	{
		name: "Drickus van Biljon",
		code: "DVB",
		role: "sales"
	},
	{
		name: "Jean-Pierre De Fillet",
		code: "",
		role: "workshop"
	},
	{
		name: "Louis Koekemoer",
		code: "",
		role: "workshop"
	},
	{
		name: "Tiaan Van Wyk",
		code: "",
		role: "workshop"
	},
	{
		name: "Damian",
		code: "",
		role: "marketing"
	},
	{
		name: "Andre",
		code: "",
		role: "admin"
	}
];
var COST_LINES = [
	"Acid Wash",
	"Air Suzi",
	"Courier",
	"Dealer stock",
	"Electrical Suzi",
	"Jack / W / Spanner / Triangle",
	"Labour",
	"Natis",
	"Permit",
	"RWC",
	"Sundries",
	"Valet",
	"Weighbridge"
];
var PRICE = /* @__PURE__ */ new Set([
	"director",
	"accounts",
	"stock",
	"sales"
]);
var seesPrice = (role) => !!role && PRICE.has(role);
var seesCost = (role) => role === "director" || role === "accounts";
function now() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function addDays(n) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + n);
	return d.toISOString().slice(0, 10);
}
function photoFor(tag) {
	const t = tag.toLowerCase();
	if (t.includes("trailer")) return "/brand/trailer.jpg";
	if (t.includes("truck") || t.includes("horse")) return "/brand/truck.jpg";
	return "/brand/tanker.jpg";
}
function blankCosts(unitId, start) {
	return COST_LINES.map((name, i) => ({
		id: start + i,
		unitId,
		name,
		supplier: "",
		qty: 0,
		unitPrice: 0,
		inv: ""
	}));
}
var initialCosts = seedUnits.flatMap((u, i) => blankCosts(u.id, i * 20 + 1));
var useYard = create()(persist((set, get) => ({
	me: null,
	units: seedUnits.map((u) => ({
		...u,
		photos: [...u.photos]
	})),
	tasks: seedTasks.map((t) => ({ ...t })),
	logs: seedLogs.map((l) => ({ ...l })),
	pdi: seedPdi.map((p) => ({ ...p })),
	orders: [],
	quotes: [],
	invoices: [],
	notices: [],
	costs: initialCosts,
	signIn: (name, password) => {
		const staff = STAFF.find((s) => s.name === name);
		if (!staff || password !== "Test1234") return "Wrong name or password";
		set({ me: staff });
		return null;
	},
	signOut: () => set({
		me: null,
		units: get().units.map((u) => u.onHand ? {
			...u,
			priceExcl: null,
			buyExcl: 0,
			vin: "",
			reg: "",
			sentence: ""
		} : {
			...u,
			priceExcl: null,
			buyExcl: 0
		})
	}),
	loadHand: (rows) => {
		const existing = get().units;
		const byWs = new Map(existing.map((u) => [u.ws, u]));
		let nextId = existing.reduce((m, u) => Math.max(m, u.id), 0) + 1;
		let taskId = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
		let costId = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
		const next = [];
		const seen = /* @__PURE__ */ new Set();
		const extraTasks = [];
		const extraCosts = [];
		const extraQuotes = [];
		const extraInvoices = [];
		const extraOrders = [];
		let quoteId = get().quotes.reduce((m, q) => Math.max(m, q.id), 0) + 1;
		let invoiceId = get().invoices.reduce((m, i) => Math.max(m, i.id), 0) + 1;
		let orderId = get().orders.reduce((m, o) => Math.max(m, o.id), 0) + 1;
		for (const row of rows) {
			seen.add(row.ws);
			const prev = byWs.get(row.ws);
			if (prev) next.push({
				...prev,
				year: row.year || prev.year,
				make: row.make || prev.make,
				model: row.model || prev.model,
				description: row.description || prev.description,
				tag: row.tag || prev.tag,
				vin: row.vin,
				reg: row.reg,
				extras: row.extras,
				km: row.km,
				engine: row.engine,
				availability: row.availability,
				priceExcl: row.priceExcl,
				buyExcl: row.buyExcl == null ? prev.buyExcl : row.buyExcl,
				sentence: row.sentence || prev.sentence,
				client: row.client || prev.client,
				salesman: row.salesman || prev.salesman,
				invoiceNo: row.invoiceNo || prev.invoiceNo,
				invoiceStatus: row.invoiceStatus || prev.invoiceStatus,
				mainType: row.mainType || prev.mainType,
				subType: row.subType || prev.subType,
				loaded: row.loaded ?? prev.loaded,
				salesCode: row.salesCode || prev.salesCode,
				location: row.location || prev.location,
				priority: row.priority || prev.priority,
				onHand: true,
				step: row.step || prev.step || "On hand"
			});
			else {
				const id = nextId++;
				const photo = photoFor(row.tag);
				next.push({
					id,
					ws: row.ws,
					jobNumber: "",
					year: row.year,
					make: row.make,
					model: row.model,
					description: row.description,
					tag: row.tag,
					vin: row.vin,
					reg: row.reg,
					client: row.client || "",
					salesman: row.salesman || "",
					seller: "",
					quoteNo: row.quote?.number || "",
					priceExcl: row.priceExcl,
					buyExcl: row.buyExcl || 0,
					invoiceNo: row.invoiceNo || "",
					invoiceStatus: row.invoiceStatus || "None",
					sentence: row.sentence,
					location: row.location || "Yard",
					status: row.step || "On hand",
					instructions: "",
					priority: row.priority || "Normal",
					due: "",
					photo,
					photos: [photo],
					cleared: true,
					step: row.step || "On hand",
					onHand: true,
					extras: row.extras,
					km: row.km,
					engine: row.engine,
					availability: row.availability,
					mainType: row.mainType,
					subType: row.subType,
					loaded: !!row.loaded,
					salesCode: row.salesCode || ""
				});
				extraCosts.push(...blankCosts(id, costId));
				costId += COST_LINES.length;
			}
			const unitId = prev?.id || next[next.length - 1].id;
			if (row.tasks?.length && !get().tasks.some((t) => t.unitId === unitId) && !extraTasks.some((t) => t.unitId === unitId)) row.tasks.forEach((task) => {
				extraTasks.push({
					id: taskId++,
					unitId,
					job: task.job || "A",
					name: task.name,
					status: task.status || "Not Started",
					notes: "",
					location: task.location || "Yard",
					provider: task.provider || "",
					booked: ""
				});
			});
			if (row.costs) for (const line of row.costs) {
				const held = extraCosts.find((c) => c.unitId === unitId && c.name === line.name) || get().costs.find((c) => c.unitId === unitId && c.name === line.name);
				if (held) {
					if (held.qty === 0) Object.assign(held, line);
				} else extraCosts.push({
					id: costId++,
					unitId,
					...line
				});
			}
			if (row.quote && !get().quotes.some((q) => q.unitId === unitId)) extraQuotes.push({
				id: quoteId++,
				unitId,
				customer: row.quote.customer,
				phone: "",
				address: "",
				email: "",
				vatNo: "",
				code: row.quote.code,
				item: row.quote.item,
				sentence: row.quote.sentence,
				fee: row.quote.fee,
				tradeIn: row.quote.tradeIn,
				excl: row.quote.excl,
				vat: row.quote.vat,
				total: row.quote.total,
				followDay: row.quote.followDay,
				dueOn: row.quote.dueOn,
				result: "",
				at: now(),
				number: row.quote.number,
				make: row.quote.make,
				year: row.quote.year,
				vin: row.quote.vin,
				engine: row.quote.engine,
				reg: row.quote.reg,
				ws: row.quote.ws,
				lines: [{
					description: row.quote.sentence,
					qty: 1,
					rate: Math.max(0, row.quote.excl - row.quote.fee)
				}]
			});
			if (row.invoice && !get().invoices.some((i) => i.unitId === unitId)) extraInvoices.push({
				id: invoiceId++,
				unitId,
				...row.invoice,
				at: now()
			});
			if (row.orders) for (const order of row.orders) {
				if (get().orders.some((o) => o.orderNo === order.orderNo)) continue;
				extraOrders.push({
					id: orderId++,
					unitId,
					orderNo: order.orderNo,
					responsible: order.responsible,
					supplier: order.supplier,
					qty: order.qty,
					item: order.item,
					invoicedExcl: order.invoicedExcl || 0
				});
			}
		}
		for (const unit of existing) if (!seen.has(unit.ws)) next.push(unit);
		next.sort((a, b) => Number(!!b.onHand) - Number(!!a.onHand));
		set({
			units: next,
			tasks: extraTasks.length ? [...extraTasks, ...get().tasks] : get().tasks,
			costs: extraCosts.length ? [...extraCosts, ...get().costs] : get().costs,
			quotes: extraQuotes.length ? [...extraQuotes, ...get().quotes] : get().quotes,
			invoices: extraInvoices.length ? [...extraInvoices, ...get().invoices] : get().invoices,
			orders: extraOrders.length ? [...extraOrders, ...get().orders] : get().orders
		});
	},
	openWs: (input) => {
		const { units, me } = get();
		let max = 9004;
		units.forEach((u) => {
			const n = Number(String(u.ws).replace(/\D/g, ""));
			if (n >= 9e3 && n < 1e4 && n > max) max = n;
		});
		const ws = "WS" + (max + 1);
		const id = units.reduce((m, u) => Math.max(m, u.id), 0) + 1;
		const photo = photoFor(input.tag || "TANKER");
		const unit = {
			id,
			ws,
			jobNumber: "",
			year: input.year || "",
			make: input.make || "",
			model: input.model || "",
			description: input.description || "",
			tag: input.tag || "TANKER",
			mainType: input.mainType,
			subType: input.subType,
			vin: input.vin || "",
			reg: "",
			client: "",
			salesman: "",
			seller: input.seller || "",
			quoteNo: "",
			priceExcl: Number(input.priceExcl || 0),
			buyExcl: Number(input.buyExcl || 0),
			invoiceNo: "",
			invoiceStatus: "None",
			sentence: input.sentence || `1 x Used ${input.year || ""} ${input.make || ""} ${input.description || ""}`.replace(/\s+/g, " ").trim(),
			location: "Yard",
			status: "WS opened",
			instructions: "",
			priority: "Normal",
			due: "",
			photo,
			photos: [photo],
			cleared: false,
			step: "WS opened"
		};
		const taskStart = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
		const jobA = tasksFor(input.mainType || "Fuel Tanker").map((name, i) => ({
			id: taskStart + i,
			unitId: id,
			job: "A",
			name,
			status: "Not Started",
			notes: "",
			location: "Yard",
			provider: "",
			booked: ""
		}));
		const costStart = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
		set({
			units: [unit, ...get().units],
			tasks: [...jobA, ...get().tasks],
			costs: [...blankCosts(id, costStart), ...get().costs],
			logs: [{
				id: Date.now(),
				unitId: id,
				person: me?.name || "Chantelle",
				line: "Opened " + ws,
				at: now()
			}, ...get().logs]
		});
		return ws;
	},
	patchUnit: (id, patch) => set({ units: get().units.map((u) => u.id === id ? {
		...u,
		...patch
	} : u) }),
	clearUnit: (id) => {
		const me = get().me;
		set({
			units: get().units.map((u) => u.id === id ? {
				...u,
				cleared: true,
				step: "Cleared"
			} : u),
			logs: [{
				id: Date.now(),
				unitId: id,
				person: me?.name || "Director",
				line: "Cleared for quote",
				at: now()
			}, ...get().logs]
		});
	},
	setTask: (id, status, note) => {
		const me = get().me;
		const task = get().tasks.find((t) => t.id === id);
		if (!task) return null;
		const stamp = now().slice(0, 16).replace("T", " ") + " " + (me?.name || "Workshop");
		const line = task.name + " → " + status + (note ? " · " + note : "");
		set({ tasks: get().tasks.map((t) => t.id === id ? {
			...t,
			status,
			notes: note ? (t.notes ? t.notes + " | " : "") + stamp + ": " + note : t.notes
		} : t) });
		return line;
	},
	addTask: (unitId, name) => {
		set({ tasks: [{
			id: get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1,
			unitId,
			job: "B",
			name,
			status: "Not Started",
			notes: "",
			location: "Yard",
			provider: "",
			booked: ""
		}, ...get().tasks] });
		return "Added " + name;
	},
	openJobCard: (input) => {
		const me = get().me;
		const unit = get().units.find((u) => u.id === input.unitId);
		if (!unit) return "";
		const hasTasks = get().tasks.some((t) => t.unitId === unit.id);
		let taskId = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
		const extra = hasTasks ? [] : tasksFor(unit.mainType || "Fuel Tanker").map((name) => ({
			id: taskId++,
			unitId: unit.id,
			job: "B",
			name,
			status: "Not Started",
			notes: "",
			location: "Yard",
			provider: "",
			booked: ""
		}));
		const jobNumber = unit.jobNumber || "JC-" + unit.ws;
		set({
			units: get().units.map((u) => u.id === unit.id ? {
				...u,
				jobNumber,
				quoteNo: input.quoteNo || u.quoteNo,
				client: input.client || u.client,
				salesman: me?.name || u.salesman,
				vin: input.vin || u.vin,
				reg: input.reg,
				priority: input.priority || "Normal",
				due: input.due,
				instructions: input.instruction || u.instructions,
				status: "Submitted to Workshop",
				step: "Submitted to Workshop"
			} : u),
			tasks: extra.length ? [...extra, ...get().tasks] : get().tasks
		});
		return "Job card opened · " + (input.quoteNo || "no quote") + (input.client ? " · " + input.client : "") + (input.instruction ? " · " + input.instruction : "");
	},
	rememberLog: (entry) => {
		if (get().logs.some((l) => String(l.id) === String(entry.id))) return;
		set({ logs: [entry, ...get().logs] });
	},
	takeServerLogs: (entries) => {
		const byWs = new Map(get().units.map((u) => [u.ws, u.id]));
		const known = new Set(get().logs.map((l) => String(l.id)));
		const added = [];
		for (const entry of entries) {
			if (known.has(entry.id)) continue;
			const unitId = byWs.get(entry.ws);
			if (!unitId) continue;
			added.push({
				id: entry.id,
				unitId,
				person: entry.person,
				line: entry.line,
				at: entry.at
			});
		}
		if (added.length) set({ logs: [...added, ...get().logs] });
	},
	setPdi: (id, status) => set({ pdi: get().pdi.map((p) => p.id === id ? {
		...p,
		status
	} : p) }),
	submitQuote: (input) => {
		const me = get().me;
		const unit = get().units.find((u) => u.id === input.unitId);
		if (!unit) throw new Error("No unit");
		const lines = input.lines?.length ? input.lines : [{
			description: unit.sentence,
			qty: 1,
			rate: Number(input.askExcl || 0)
		}];
		const goods = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
		const fee = 2500;
		const excl = goods + fee - Number(input.tradeIn || 0);
		const quote = {
			id: get().quotes.reduce((m, q) => Math.max(m, q.id), 0) + 1,
			unitId: unit.id,
			number: "C" + (20920 + get().quotes.length),
			customer: input.customer,
			phone: input.phone,
			address: input.address || "",
			email: input.email || "",
			vatNo: input.vatNo || "",
			code: me?.code || unit.salesCode || "",
			item: unit.ws + " " + unit.year + " " + unit.description,
			sentence: unit.sentence,
			fee,
			tradeIn: Number(input.tradeIn || 0),
			excl,
			vat: excl * .15,
			total: excl * 1.15,
			followDay: 1,
			dueOn: addDays(1),
			result: "",
			at: now(),
			make: unit.make,
			year: unit.year,
			vin: unit.vin,
			engine: unit.engine,
			reg: unit.reg,
			ws: unit.ws,
			lines
		};
		set({
			quotes: [quote, ...get().quotes],
			units: get().units.map((u) => u.id === unit.id ? {
				...u,
				client: input.customer,
				salesman: me?.name || "",
				quoteNo: quote.number,
				priceExcl: Number(input.askExcl || 0),
				step: "Quoted"
			} : u)
		});
		return quote;
	},
	logQuote: (id, result) => {
		set({ quotes: get().quotes.map((q) => {
			if (q.id !== id) return q;
			const next = q.followDay === 1 ? 3 : q.followDay === 3 ? 7 : 14;
			return {
				...q,
				result,
				followDay: next,
				dueOn: addDays(next)
			};
		}) });
	},
	requestInvoice: (unitId, customer) => {
		const me = get().me;
		const unit = get().units.find((u) => u.id === unitId);
		const q = get().quotes.find((x) => x.unitId === unitId);
		const excl = q ? q.excl : Number(unit?.priceExcl || 0);
		const inv = {
			id: get().invoices.reduce((m, i) => Math.max(m, i.id), 0) + 1,
			unitId,
			number: "INV-" + (8600 + get().invoices.length),
			customer: customer || unit?.client || "",
			salesman: me?.name || "",
			excl,
			vat: excl * .15,
			total: excl * 1.15,
			status: "Requested",
			at: now()
		};
		set({
			invoices: [inv, ...get().invoices],
			units: get().units.map((u) => u.id === unitId ? {
				...u,
				invoiceNo: inv.number,
				invoiceStatus: "Requested",
				client: inv.customer,
				step: "Invoice requested"
			} : u),
			logs: [{
				id: Date.now(),
				unitId,
				person: me?.name || "",
				line: "Invoice requested " + inv.number,
				at: now()
			}, ...get().logs]
		});
		return inv;
	},
	setNotices: (rows) => set({ notices: rows }),
	issueOrder: (input) => {
		const me = get().me;
		const unit = get().units.find((u) => u.id === input.unitId);
		if (!unit) throw new Error("No unit");
		const n = get().orders.filter((o) => o.unitId === unit.id).length + 1;
		const order = {
			id: get().orders.reduce((m, o) => Math.max(m, o.id), 0) + 1,
			unitId: unit.id,
			orderNo: unit.ws + "-" + String(n).padStart(3, "0"),
			responsible: input.responsible,
			supplier: input.supplier,
			qty: input.qty,
			item: input.item,
			invoicedExcl: input.invoicedExcl
		};
		const costId = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
		set({
			orders: [order, ...get().orders],
			costs: [{
				id: costId,
				unitId: unit.id,
				name: input.item,
				supplier: input.supplier,
				qty: input.qty,
				unitPrice: input.qty ? input.invoicedExcl / input.qty : 0,
				inv: ""
			}, ...get().costs],
			logs: [{
				id: Date.now(),
				unitId: unit.id,
				person: me?.name || "Chantelle",
				line: order.orderNo + " marked " + input.responsible,
				at: now()
			}, ...get().logs]
		});
		return order;
	},
	setCost: (id, patch) => set({ costs: get().costs.map((c) => c.id === id ? {
		...c,
		...patch
	} : c) }),
	addPhoto: (unitId, dataUrl) => {
		const me = get().me;
		set({
			units: get().units.map((u) => u.id === unitId ? {
				...u,
				photo: dataUrl,
				photos: [dataUrl, ...u.photos]
			} : u),
			logs: [{
				id: Date.now(),
				unitId,
				person: me?.name || "Damian",
				line: "Picture loaded",
				at: now()
			}, ...get().logs]
		});
	}
}), { name: "status-yard-v3" }));
var DESKS = {
	director: [
		"Yard",
		"Job card",
		"Clear",
		"Board"
	],
	stock: [
		"Yard",
		"Load card",
		"Open WS",
		"Order",
		"Invoices"
	],
	sales: [
		"Yard",
		"Job card",
		"Quote",
		"Invoice",
		"Share",
		"Board"
	],
	workshop: ["Job cards"],
	accounts: ["Ledger", "Invoices"],
	marketing: ["Pictures"],
	admin: ["Natis", "Yard"]
};
function money(n) {
	if (n == null) return "Hidden";
	return "R " + Number(n).toLocaleString("en-ZA", { maximumFractionDigits: 0 });
}
async function saveLog(name, ws, line, kind) {
	const res = await fetch("/api/job-log", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			password: "Test1234",
			action: "add",
			ws,
			line,
			kind
		})
	});
	if (!res.ok) throw new Error("The log was not saved");
	return await res.json();
}
function Gate() {
	const signIn = useYard((s) => s.signIn);
	const loadHand = useYard((s) => s.loadHand);
	const takeServerLogs = useYard((s) => s.takeServerLogs);
	const setNotices = useYard((s) => s.setNotices);
	const signOut = useYard((s) => s.signOut);
	const [name, setName] = (0, import_react.useState)(STAFF[4].name);
	const [password, setPassword] = (0, import_react.useState)("Test1234");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen md:grid-cols-[420px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex flex-col justify-between bg-side px-8 py-10 text-sidefg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/status-logo.png",
					alt: "Status Truck Sales",
					className: "w-64"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/slogan.png",
					alt: "Quality, Reliability.",
					className: "mt-4 w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-xs text-base leading-relaxed",
					children: "Partner demo. Current stock stays behind this sign-in. Do not forward the link outside the yard."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "148 Nolte Street, Bartlett · VAT 4840181335"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "flex items-center justify-center p-6",
			onSubmit: async (e) => {
				e.preventDefault();
				const local = signIn(name, password);
				if (local) {
					setErr(local);
					return;
				}
				setBusy(true);
				try {
					const res = await fetch("/api/yard", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name,
							password
						})
					});
					if (!res.ok) {
						signOut();
						setErr("Stock file refused");
						return;
					}
					const data = await res.json();
					loadHand(data.units);
					const book = await fetch("/api/job-log", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name,
							password,
							action: "list"
						})
					});
					if (book.ok) {
						const saved = await book.json();
						takeServerLogs(saved.logs);
					}
					const notes = await fetch("/api/invoice-note", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name,
							password,
							action: "list"
						})
					});
					if (notes.ok) {
						const saved = await notes.json();
						setNotices(saved.notices || []);
					}
				} catch {
					signOut();
					setErr("Could not open the stock file");
				} finally {
					setBusy(false);
				}
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-xl border border-line bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl text-ink",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Password Test1234. Stock prices are not on the public page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 block text-sm text-muted",
						children: ["Person", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 w-full rounded-lg border border-line bg-card px-3 py-3 text-ink",
							value: name,
							onChange: (e) => setName(e.target.value),
							children: STAFF.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s.name }, s.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm text-muted",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-1 w-full rounded-lg border border-line px-3 py-3 text-ink",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-5 min-h-11 w-full rounded-lg bg-blue px-4 text-card",
						type: "submit",
						disabled: busy,
						children: busy ? "Opening stock…" : "Enter yard"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-late",
						children: err
					}) : null
				]
			})
		})]
	});
}
function Chip({ children, tone = "chip" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block rounded-full px-2 py-0.5 text-xs ${tone === "ok" ? "bg-okbg text-ok" : tone === "warn" ? "bg-warnbg text-warn" : tone === "late" ? "bg-latebg text-late" : "bg-chip text-blue"}`,
		children
	});
}
function YardApp() {
	if (!useYard((s) => s.me)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
function Shell() {
	const me = useYard((s) => s.me);
	const signOut = useYard((s) => s.signOut);
	const desks = DESKS[me.role];
	const [desk, setDesk] = (0, import_react.useState)(desks[0]);
	const [unitId, setUnitId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen md:grid md:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "bg-side px-3 py-4 text-sidefg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/status-logo.png",
					alt: "",
					className: "mb-3 w-40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 text-xs uppercase tracking-wide text-muted",
					children: me.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-2 pb-3 text-sm",
					children: [me.name, me.code ? " · " + me.code : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto md:block",
					children: desks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `mb-1 min-h-11 whitespace-nowrap rounded-lg px-3 text-left text-sm ${desk === d ? "bg-ink text-card" : "text-sidefg"}`,
						onClick: () => {
							setDesk(d);
							setUnitId(null);
						},
						children: d
					}, d))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "mt-4 flex min-h-11 items-center gap-2 px-3 text-sm",
					onClick: signOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-line bg-card px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: desk
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: me.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "p-4",
			children: [
				me.role === "accounts" || me.role === "stock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceAlert, { onOpen: () => setDesk("Invoices") }) : null,
				desk === "Yard" || desk === "Job cards" || desk === "Ledger" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YardList, {
					mode: desk,
					onOpen: setUnitId,
					openId: unitId
				}) : null,
				desk === "Load card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadCard, {}) : null,
				desk === "Open WS" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenWs, {}) : null,
				desk === "Job card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, {}) : null,
				desk === "Clear" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearDesk, {}) : null,
				desk === "Quote" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDesk, {}) : null,
				desk === "Invoice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDesk, {}) : null,
				desk === "Invoices" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceQueue, {}) : null,
				desk === "Share" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDesk, {}) : null,
				desk === "Board" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {}) : null,
				desk === "Order" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDesk, {}) : null,
				desk === "Pictures" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoDesk, {}) : null,
				desk === "Natis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Natis, {}) : null
			]
		})] })]
	});
}
function YardList({ mode, onOpen, openId }) {
	const units = useYard((s) => s.units);
	const tasks = useYard((s) => s.tasks);
	const me = useYard((s) => s.me);
	const withWork = (0, import_react.useMemo)(() => new Set(tasks.map((t) => t.unitId)), [tasks]);
	const [filter, setFilter] = (0, import_react.useState)(mode === "Job cards" ? "work" : "hand");
	const [tag, setTag] = (0, import_react.useState)("All");
	const rows = units.filter((u) => {
		if (tag !== "All" && u.tag !== tag) return false;
		if (filter === "hand") return !!u.onHand;
		if (filter === "work") return withWork.has(u.id);
		return true;
	});
	const handCount = units.filter((u) => u.onHand).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: mode === "Job cards" ? "No asking price. Tap a card, then a task. On hand is the current stock file." : mode === "Ledger" ? "Buy, client, work, salesman and the invoice requested. Asking price is the stock file. Buy is still entered here." : `${handCount} on hand. The tab is the yard group. The line under the unit is the label.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					["hand", "On hand"],
					["work", "Job cards"],
					["all", "All"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `min-h-11 rounded-lg border px-3 text-sm ${filter === key ? "border-blue bg-chip text-blue" : "border-line bg-card"}`,
					onClick: () => setFilter(key),
					children: label
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: ["All", ...TAGS].map((name) => {
					const count = units.filter((u) => u.onHand && (name === "All" || u.tag === name)).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `min-h-11 shrink-0 rounded-full border px-3 text-sm ${tag === name ? "border-blue bg-chip text-blue" : "border-line bg-card"}`,
						onClick: () => setTag(name),
						children: name === "All" ? `All ${count}` : `${name} ${count}`
					}, name);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-line bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "WS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "Unit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "Where"
							}),
							seesPrice(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "Ask"
							}) : null,
							seesCost(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2",
								children: "Buy"
							}) : null
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "cursor-pointer border-t border-line",
						onClick: () => onOpen(u.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: u.photo,
									alt: "",
									className: "h-12 w-16 rounded-md object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 font-semibold",
								children: u.ws
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2",
								children: [
									u.year,
									" ",
									u.make,
									" ",
									u.description,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [u.tag, u.subType ? " · " + u.subType : ""]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2",
								children: [
									u.client || "—",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: u.salesman
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2",
								children: [
									u.location,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										tone: /completed/i.test(u.status) ? "ok" : "warn",
										children: u.step || u.status
									})
								]
							}),
							seesPrice(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: money(u.priceExcl)
							}) : null,
							seesCost(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: money(u.buyExcl)
							}) : null
						]
					}, u.id)) })]
				})
			}),
			openId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitFile, {
				id: openId,
				start: mode === "Job cards" ? "Tasks" : mode === "Ledger" ? "Picture" : "File"
			}) : null
		]
	});
}
function UnitFile({ id, start }) {
	const me = useYard((s) => s.me);
	const unit = useYard((s) => s.units.find((u) => u.id === id));
	const allTasks = useYard((s) => s.tasks);
	const allLogs = useYard((s) => s.logs);
	const allPdi = useYard((s) => s.pdi);
	const allOrders = useYard((s) => s.orders);
	const allQuotes = useYard((s) => s.quotes);
	const allInvoices = useYard((s) => s.invoices);
	const allCosts = useYard((s) => s.costs);
	const tasks = (0, import_react.useMemo)(() => allTasks.filter((t) => t.unitId === id), [allTasks, id]);
	const logs = (0, import_react.useMemo)(() => allLogs.filter((l) => l.unitId === id), [allLogs, id]);
	const pdi = (0, import_react.useMemo)(() => allPdi.filter((p) => p.unitId === id), [allPdi, id]);
	const orders = (0, import_react.useMemo)(() => allOrders.filter((o) => o.unitId === id), [allOrders, id]);
	const quotes = (0, import_react.useMemo)(() => allQuotes.filter((q) => q.unitId === id), [allQuotes, id]);
	const invoices = (0, import_react.useMemo)(() => allInvoices.filter((i) => i.unitId === id), [allInvoices, id]);
	const costs = (0, import_react.useMemo)(() => allCosts.filter((c) => c.unitId === id), [allCosts, id]);
	const setTask = useYard((s) => s.setTask);
	const addTask = useYard((s) => s.addTask);
	const setPdi = useYard((s) => s.setPdi);
	const patchUnit = useYard((s) => s.patchUnit);
	const setCost = useYard((s) => s.setCost);
	const rememberLog = useYard((s) => s.rememberLog);
	const tabs = [
		"File",
		"Tasks",
		"PDI",
		"Orders",
		"Log"
	];
	if (seesPrice(me.role)) tabs.push("Quote");
	if (seesCost(me.role)) tabs.push("Picture", "Costs");
	const [tab, setTab] = (0, import_react.useState)(tabs.includes(start) ? start : "File");
	const [openTask, setOpenTask] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const [logLine, setLogLine] = (0, import_react.useState)("");
	const [logErr, setLogErr] = (0, import_react.useState)("");
	const [newTask, setNewTask] = (0, import_react.useState)("");
	if (!unit) return null;
	const done = tasks.filter((t) => t.status === "Completed").map((t) => t.name).join(", ") || "None completed";
	const workshop = me.role === "workshop" || me.role === "director" || me.role === "stock";
	const canLog = workshop || me.role === "sales" || me.role === "admin";
	async function keep(line, kind) {
		try {
			const saved = await saveLog(me.name, unit.ws, line, kind);
			rememberLog({
				id: saved.entry.id,
				unitId: unit.id,
				person: saved.entry.person,
				line: saved.entry.line,
				at: saved.entry.at
			});
			setLogErr("");
		} catch {
			setLogErr("Not on the book. Try the line again.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex flex-wrap gap-2",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `min-h-11 rounded-lg border px-3 text-sm ${tab === t ? "border-blue bg-chip text-blue" : "border-line"}`,
					onClick: () => setTab(t),
					children: t
				}, t))
			}),
			tab === "File" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[280px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: unit.photo,
					alt: "",
					className: "h-44 w-full rounded-lg object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: unit.ws
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						unit.year,
						" ",
						unit.make,
						" ",
						unit.description
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [unit.tag, unit.subType ? " · " + unit.subType : ""]
					}),
					seesPrice(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: unit.sentence
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							me.role === "marketing" ? "VIN hidden" : unit.vin,
							" · ",
							unit.reg || "reg open",
							" · ",
							unit.km || "",
							" · ",
							unit.location
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							unit.availability || unit.step,
							unit.extras ? " · " + unit.extras : "",
							unit.engine && unit.engine !== "N/A" ? " · " + unit.engine : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							"Client ",
							unit.client || "—",
							" · Sales ",
							unit.salesman || "—",
							" · Invoice ",
							unit.invoiceNo || "none",
							" (",
							unit.invoiceStatus,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [seesPrice(me.role) ? "Ask " + money(unit.priceExcl) : "Price hidden", seesCost(me.role) ? " · Buy " + money(unit.buyExcl) : ""]
					}),
					unit.instructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: unit.instructions
					}) : null
				] })]
			}) : null,
			tab === "Tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 flex items-center gap-2 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" }), " Folded work. Tap a line. A stamp cannot be deleted."]
				}),
				tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex w-full min-h-11 items-center justify-between text-left",
						onClick: () => setOpenTask(openTask === t.id ? null : t.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Job ",
							t.job,
							" · ",
							t.name
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: t.status === "Completed" ? "ok" : t.status === "In Progress" ? "warn" : "chip",
							children: t.status
						})]
					}), openTask === t.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pb-2 pl-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted",
								children: [
									t.location || "Yard",
									" ",
									t.provider,
									" ",
									t.booked
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: t.notes || "No note yet."
							}),
							workshop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "min-h-11 rounded-lg border border-line px-3",
										onClick: () => {
											const line = setTask(t.id, "In Progress");
											if (line) keep(line, "progress");
										},
										children: "Start"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "min-h-11 rounded-lg bg-blue px-3 text-card",
										onClick: () => {
											const line = setTask(t.id, "Completed", note);
											if (line) keep(line, "progress");
										},
										children: "Done"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "min-h-11 flex-1 rounded-lg border border-line px-3",
										placeholder: "Short note",
										value: note,
										onChange: (e) => setNote(e.target.value)
									})
								]
							}) : null
						]
					}) : null]
				}, t.id)),
				workshop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "min-h-11 flex-1 rounded-lg border border-line px-3",
						placeholder: "Add a task",
						value: newTask,
						onChange: (e) => setNewTask(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "min-h-11 rounded-lg bg-blue px-3 text-card",
						onClick: () => {
							if (newTask.trim()) {
								keep(addTask(id, newTask.trim()), "task");
								setNewTask("");
							}
						},
						children: "Add"
					})]
				}) : null
			] }) : null,
			tab === "PDI" ? pdi.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm",
				children: pdi.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b border-line py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: p.section
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						p.item
					] }), workshop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "rounded-lg border border-line px-2 py-2",
						value: p.status,
						onChange: (e) => setPdi(p.id, e.target.value),
						children: [
							"Pass",
							"Fail",
							"N/A",
							"Not Started",
							""
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: p.status || "Open" })]
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No PDI on this card yet."
			}) : null,
			tab === "Orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm",
				children: orders.length ? orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-b border-line py-2",
					children: [
						o.orderNo,
						" · ",
						o.responsible,
						" · ",
						o.supplier,
						" · ",
						o.qty,
						" × ",
						o.item,
						seesCost(me.role) || me.role === "stock" ? " · " + money(o.invoicedExcl) : ""
					]
				}, o.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "No order number yet."
				})
			}) : null,
			tab === "Log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm",
				children: [
					canLog ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mb-3 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							if (!logLine.trim()) return;
							keep(logLine.trim(), "note");
							setLogLine("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "min-h-11 flex-1 rounded-lg border border-line px-3",
							placeholder: "One line. It cannot be deleted.",
							value: logLine,
							onChange: (e) => setLogLine(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-11 rounded-lg bg-blue px-3 text-card",
							type: "submit",
							children: "Log"
						})]
					}) : null,
					logErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-late",
						children: logErr
					}) : null,
					logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "border-b border-line py-2",
						children: [
							l.person,
							" · ",
							l.line,
							" · ",
							String(l.at).slice(0, 16).replace("T", " ")
						]
					}, l.id))
				]
			}) : null,
			tab === "Quote" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: quotes.length ? quotes.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotePaper, { q }, q.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No quote on this number."
			}) }) : null,
			tab === "Picture" && unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picture, {
				unit,
				done,
				invoices,
				onBuy: (buyExcl) => patchUnit(unit.id, { buyExcl })
			}) : null,
			tab === "Costs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostTable, {
				rows: costs,
				onChange: setCost
			}) : null
		]
	});
}
function Picture({ unit, done, invoices, onBuy }) {
	const [buy, setBuy] = (0, import_react.useState)(String(unit.buyExcl || ""));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Buy ",
				money(unit.buyExcl),
				" · Ask ",
				money(unit.priceExcl)
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Client ",
				unit.client || "—",
				" · Sold by ",
				unit.salesman || "—"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Work ", done] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Invoice ",
				unit.invoiceNo || "none",
				" · ",
				unit.invoiceStatus
			] }),
			invoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				i.number,
				" · ",
				i.customer,
				" · ",
				money(i.total),
				" · ",
				i.status
			] }, i.number)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "min-h-11 rounded-lg border border-line px-3",
					value: buy,
					onChange: (e) => setBuy(e.target.value),
					placeholder: "Buy excl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "min-h-11 rounded-lg bg-blue px-3 text-card",
					onClick: () => onBuy(Number(buy || 0)),
					children: "Save buy"
				})]
			})
		]
	});
}
function CostTable({ rows, onChange }) {
	const total = rows.filter((c) => c.qty > 0).reduce((s, c) => s + c.qty * c.unitPrice, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-muted",
				children: "Qty 0 is skipped on the total."
			}),
			rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 grid gap-2 border-b border-line pb-2 md:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "py-2",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "min-h-11 rounded-lg border border-line px-2",
						placeholder: "Supplier",
						defaultValue: c.supplier,
						onBlur: (e) => onChange(c.id, { supplier: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "min-h-11 rounded-lg border border-line px-2",
						type: "number",
						placeholder: "Qty",
						defaultValue: c.qty,
						onBlur: (e) => onChange(c.id, { qty: Number(e.target.value || 0) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "min-h-11 rounded-lg border border-line px-2",
						type: "number",
						placeholder: "Unit",
						defaultValue: c.unitPrice,
						onBlur: (e) => onChange(c.id, { unitPrice: Number(e.target.value || 0) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "py-2",
						children: c.qty > 0 ? money(c.qty * c.unitPrice) : "Skip"
					})
				]
			}, c.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold",
				children: ["Cost total ", money(total)]
			})
		]
	});
}
function QuotePaper({ q }) {
	const lines = q.lines?.length ? q.lines : [{
		description: q.sentence,
		qty: 1,
		rate: Math.max(0, q.excl - q.fee + q.tradeIn)
	}];
	const goods = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
	const text = `PRO-FORMA TAX INVOICE ${q.number}\n${q.customer}\n${q.sentence}\nTOTAL ${money(q.total)}\nSUBJECT TO PRIOR SALE`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mb-4 rounded-lg border border-line bg-card p-4 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/status-logo.png",
				alt: "",
				className: "w-44"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Trailerlink (Pty) Ltd",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"148 Nolte Street, Bartlett, Boksburg / PO Box 10407, Fonteinriet, 1464",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Tel (011) 823 4516 / Fax (011) 823 3602 · VAT 4840181335"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-2xl",
				children: "PRO-FORMA TAX INVOICE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Invoice no ",
				q.number,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Date ",
				q.at.slice(0, 10),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"WS code ",
				q.ws || q.item,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Sales code ",
				q.code
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Charged to" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					q.customer,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					q.address,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Cell ",
					q.phone || "—",
					" · ",
					q.email,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"VAT ",
					q.vatNo || "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs uppercase text-muted",
				children: "Description"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-1 w-full text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Description" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Qty" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rate" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" })
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-2",
							children: line.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: line.qty
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: money(line.rate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: money(line.qty * line.rate)
						})
					]
				}, i)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Make ",
					q.make || "—",
					" · Year ",
					q.year || "—",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Chassis no ",
					q.vin || "—",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Engine no ",
					q.engine || "N/A",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Reg no ",
					q.reg || "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3",
				children: [
					"Goods ",
					money(goods),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Admin fee ",
					money(q.fee),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Sub total ",
					money(goods + q.fee),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Less trade-in / deposit ",
					money(q.tradeIn),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Plus 15% VAT ",
					money(q.vat),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Total ", money(q.total)] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs",
				children: [
					"SUBJECT TO PRIOR SALE",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"FNB East Rand Mall · Branch 253442 · Acc 620 162 916 77",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Follow-up day ",
					q.followDay,
					" · ",
					q.dueOn
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "min-h-11 rounded-lg bg-blue px-3 text-card",
					onClick: () => {
						window.location.href = "mailto:?subject=" + encodeURIComponent("Pro-forma " + q.number) + "&body=" + encodeURIComponent(text);
					},
					children: "Send"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex min-h-11 items-center gap-2 rounded-lg border border-line px-3",
					onClick: async () => {
						if (navigator.share) await navigator.share({
							title: q.number,
							text
						});
						else {
							await navigator.clipboard.writeText(text);
							alert("Copied for WhatsApp");
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share"]
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
var inputCls = "min-h-11 w-full rounded-lg border border-line bg-card px-3 text-ink";
function LoadCard() {
	const me = useYard((s) => s.me);
	const units = useYard((s) => s.units);
	const patchUnit = useYard((s) => s.patchUnit);
	const [err, setErr] = (0, import_react.useState)("");
	const rows = units.filter((u) => u.onHand);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Load the quote onto the card"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The description is already typed on the quote list. Chantelle loads it onto the WS. Sales can only make the pro-forma after that."
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-late",
				children: err
			}) : null,
			rows.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-line bg-card p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: [
							u.ws,
							" · ",
							u.salesCode || "code open",
							" · ",
							u.salesman || "no salesman"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1",
						children: [
							u.year,
							" ",
							u.make,
							" ",
							u.description
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: u.sentence || "No pro-forma description on the quote list."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							seesPrice(me.role) ? money(u.priceExcl) + " excl" : "Price hidden",
							" · ",
							u.vin
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: u.loaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: "ok",
							children: "Loaded"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-11 rounded-lg bg-blue px-3 text-card",
							disabled: !u.sentence,
							onClick: async () => {
								if (!(await fetch("/api/yard", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										name: me.name,
										password: "Test1234",
										action: "load",
										ws: u.ws
									})
								})).ok) {
									setErr("The card was not loaded.");
									return;
								}
								patchUnit(u.id, { loaded: true });
								setErr("");
							},
							children: "Load onto card"
						})
					})
				]
			}, u.id))
		]
	});
}
function OpenWs() {
	const openWs = useYard((s) => s.openWs);
	const [form, setForm] = (0, import_react.useState)({
		seller: "",
		year: "2024",
		make: "",
		description: "",
		vin: "",
		priceExcl: "",
		buyExcl: "",
		tag: "TANKER",
		mainType: "Fuel Tanker",
		subType: "Tri-axle",
		sentence: ""
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "max-w-3xl rounded-xl border border-line bg-card p-4",
		onSubmit: (e) => {
			e.preventDefault();
			const ws = openWs({
				...form,
				priceExcl: Number(form.priceExcl || 0),
				buyExcl: Number(form.buyExcl || 0)
			});
			alert(ws + " opened. A director must clear it before a quote.");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 font-display text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" }), " Open a purchased unit"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Seller",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: form.seller,
							onChange: (e) => set("seller", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Year",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: form.year,
							onChange: (e) => set("year", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Make",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: form.make,
							onChange: (e) => set("make", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Description",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: form.description,
							onChange: (e) => set("description", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "VIN",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: form.vin,
							onChange: (e) => set("vin", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tag",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputCls,
							value: form.tag,
							onChange: (e) => set("tag", e.target.value),
							children: TAGS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: tag }, tag))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputCls,
							value: form.mainType,
							onChange: (e) => set("mainType", e.target.value),
							children: MAIN_TYPES.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: tag }, tag))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Sub type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputCls,
							value: form.subType,
							onChange: (e) => set("subType", e.target.value),
							children: SUB_TYPES.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: tag }, tag))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ask excl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							type: "number",
							value: form.priceExcl,
							onChange: (e) => set("priceExcl", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Buy excl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							type: "number",
							value: form.buyExcl,
							onChange: (e) => set("buyExcl", e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Quote sentence",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: form.sentence,
					onChange: (e) => set("sentence", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mt-4 min-h-11 rounded-lg bg-blue px-4 text-card",
				type: "submit",
				children: "Open file"
			})
		]
	});
}
function ClearDesk() {
	const units = useYard((s) => s.units.filter((u) => !u.cleared));
	const clearUnit = useYard((s) => s.clearUnit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: "Clear before quote or share"
		}), units.length ? units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 flex items-center justify-between gap-3 text-sm",
			children: [
				u.ws,
				" · ",
				u.description,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "min-h-11 rounded-lg bg-blue px-3 text-card",
					onClick: () => clearUnit(u.id),
					children: "Clear"
				})
			]
		}, u.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Nothing waiting. Restored cards are already cleared so sales can quote them."
		})]
	});
}
function QuoteDesk() {
	const ready = useYard((s) => s.units).filter((u) => u.loaded && u.sentence);
	const submit = useYard((s) => s.submitQuote);
	const [unitId, setUnitId] = (0, import_react.useState)(String(ready[0]?.id || ""));
	const unit = ready.find((u) => u.id === Number(unitId));
	const [customer, setCustomer] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [vatNo, setVatNo] = (0, import_react.useState)("");
	const [trade, setTrade] = (0, import_react.useState)("0");
	const [extra, setExtra] = (0, import_react.useState)("");
	const [extraRate, setExtraRate] = (0, import_react.useState)("");
	const [made, setMade] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "rounded-xl border border-line bg-card p-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!unit || !customer.trim()) return;
				const lines = [{
					description: unit.sentence,
					qty: 1,
					rate: Number(unit.priceExcl || 0)
				}];
				if (extra.trim()) lines.push({
					description: extra.trim(),
					qty: 1,
					rate: Number(extraRate || 0)
				});
				setMade(submit({
					unitId: unit.id,
					customer,
					phone,
					address,
					email,
					vatNo,
					askExcl: Number(unit.priceExcl || 0),
					tradeIn: Number(trade || 0),
					lines
				}));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-2 flex items-center gap-2 font-display text-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-5" }), " Pro-forma"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "The description is the one Chantelle loaded. It is not retyped. Admin fee R 2 500. Subject to prior sale."
				}),
				ready.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Loaded card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: inputCls,
						value: unitId,
						onChange: (e) => setUnitId(e.target.value),
						children: ready.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: u.id,
							children: [
								u.ws,
								" · ",
								u.salesCode,
								" · ",
								u.description
							]
						}, u.id))
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-late",
					children: "No card loaded yet. Chantelle loads it from the quote list first."
				}),
				unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-lg bg-paper p-3 text-sm",
					children: unit.sentence
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Charged to",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: customer,
						onChange: (e) => setCustomer(e.target.value),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Address",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: address,
						onChange: (e) => setAddress(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cell",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: email,
						onChange: (e) => setEmail(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Customer VAT",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: vatNo,
						onChange: (e) => setVatNo(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Trade-in excl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						type: "number",
						value: trade,
						onChange: (e) => setTrade(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Extra line, if the quote has more than one item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: extra,
						onChange: (e) => setExtra(e.target.value),
						placeholder: "Optional extras"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Extra rate excl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						type: "number",
						value: extraRate,
						onChange: (e) => setExtraRate(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-4 min-h-11 rounded-lg bg-blue px-4 text-card",
					type: "submit",
					disabled: !unit,
					children: "Make pro-forma"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: made ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotePaper, { q: made }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "The pro-forma prints here. Four cards are already loaded so you can show a paper before Chantelle loads the rest."
		}) })]
	});
}
function TaxInvoice({ number, customer, unit, excl, vat, total, bank }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mt-4 rounded-lg border border-line p-4 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/status-logo.png",
				alt: "",
				className: "w-44"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-2xl",
				children: "TAX INVOICE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Invoice no ",
				number,
				" · VAT NO 4840181335",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"WS code ",
				unit?.ws,
				" · Sales code ",
				unit?.salesCode
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Charged to" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					customer
				]
			}),
			bank ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "To be delivered on your behalf to: the financing bank"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: unit?.sentence || unit?.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Make ",
					unit?.make,
					" · Year ",
					unit?.year,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Chassis no ",
					unit?.vin || "—",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Engine no ",
					unit?.engine || "N/A",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Reg no ",
					unit?.reg || "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2",
				children: [
					"Sub total ",
					money(excl),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Plus 15% VAT ",
					money(vat),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Total ", money(total)] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs",
				children: [
					"Bank First National Bank · Branch East Rand Mall · Branch no 253442 · Acc no 620 162 916 77",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Contact Siegfried van Biljon"
				]
			})
		]
	});
}
function InvoiceDesk() {
	const me = useYard((s) => s.me);
	const units = useYard((s) => s.units);
	const request = useYard((s) => s.requestInvoice);
	const [unitId, setUnitId] = (0, import_react.useState)(String(units.find((u) => u.loaded)?.id || units[0]?.id || ""));
	const [customer, setCustomer] = (0, import_react.useState)("");
	const [made, setMade] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const unit = units.find((u) => u.id === Number(unitId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "rounded-xl border border-line bg-card p-4",
			onSubmit: async (e) => {
				e.preventDefault();
				if (!unit) return;
				const inv = request(Number(unitId), customer);
				setMade(inv);
				const res = await fetch("/api/invoice-note", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: me.name,
						password: "Test1234",
						action: "add",
						ws: unit.ws,
						number: inv.number,
						customer: inv.customer,
						salesman: me.name,
						excl: inv.excl,
						vat: inv.vat,
						total: inv.total
					})
				});
				setNote(res.ok ? "Chantelle and Cindy have the notice to generate " + inv.number + "." : "The invoice is on this screen, but the notice did not go out.");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Ask for the invoice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Chantelle and Cindy are notified. They generate the client copy and the bank copy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Customer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: customer,
						onChange: (e) => setCustomer(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Unit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: inputCls,
						value: unitId,
						onChange: (e) => setUnitId(e.target.value),
						children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: u.id,
							children: [
								u.ws,
								" · ",
								u.client || "no client"
							]
						}, u.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-4 min-h-11 rounded-lg bg-blue px-4 text-card",
					type: "submit",
					children: "Request invoice"
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: note
				}) : null
			]
		}), made && unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoice, {
				number: made.number,
				customer: made.customer,
				unit,
				excl: made.excl,
				vat: made.vat,
				total: made.total
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoice, {
				number: made.number,
				customer: made.customer,
				unit,
				excl: made.excl,
				vat: made.vat,
				total: made.total,
				bank: true
			})]
		}) : null]
	});
}
function InvoiceAlert({ onOpen }) {
	const notices = useYard((s) => s.notices);
	if (!notices.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "mb-4 flex min-h-11 w-full items-center justify-between rounded-xl border border-late bg-latebg px-4 text-left text-sm text-late",
		onClick: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			notices.length,
			" invoice",
			notices.length === 1 ? "" : "s",
			" to generate · ",
			notices.map((n) => n.number + " " + n.ws).join(", ")
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open" })]
	});
}
function InvoiceQueue() {
	const me = useYard((s) => s.me);
	const notices = useYard((s) => s.notices);
	const setNotices = useYard((s) => s.setNotices);
	const units = useYard((s) => s.units);
	const [openId, setOpenId] = (0, import_react.useState)(notices[0]?.id || null);
	const open = notices.find((n) => n.id === openId) || notices[0];
	const unit = units.find((u) => u.ws === open?.ws);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Generate the invoice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Sales asked. Chantelle or Cindy prints the client copy and the bank copy, then marks it generated."
			}),
			notices.length ? notices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `mb-2 flex min-h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-sm ${open?.id === n.id ? "border-blue bg-chip" : "border-line bg-card"}`,
				onClick: () => setOpenId(n.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					n.number,
					" · ",
					n.ws,
					" · ",
					n.customer || "No customer",
					" · asked by ",
					n.salesman
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(n.total) })]
			}, n.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nothing waiting."
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoice, {
						number: open.number,
						customer: open.customer,
						unit,
						excl: open.excl,
						vat: open.vat,
						total: open.total
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoice, {
						number: open.number,
						customer: open.customer,
						unit,
						excl: open.excl,
						vat: open.vat,
						total: open.total,
						bank: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-3 min-h-11 rounded-lg bg-blue px-4 text-card",
					onClick: async () => {
						const res = await fetch("/api/invoice-note", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								name: me.name,
								password: "Test1234",
								action: "done",
								id: open.id
							})
						});
						if (!res.ok) return;
						const data = await res.json();
						setNotices(data.notices);
					},
					children: "Mark generated"
				})]
			}) : null
		]
	});
}
function ShareDesk() {
	const units = useYard((s) => s.units);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-2 flex items-center gap-2 font-display text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" }), " Share stock"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Price off. Damian’s pictures are on the unit."
			}),
			units.map((u) => {
				const text = `${u.year} ${u.description}. ${u.ws}. Price off.`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-3 border-b border-line py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.photo,
							alt: "",
							className: "h-12 w-16 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1",
							children: [
								u.ws,
								" · ",
								u.description
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-11 rounded-lg bg-blue px-3 text-card",
							onClick: async () => {
								if (navigator.share) await navigator.share({
									title: u.ws,
									text
								});
								else {
									await navigator.clipboard.writeText(text);
									alert("Copied. Paste into WhatsApp.");
								}
							},
							children: "Share"
						})
					]
				}, u.id);
			})
		]
	});
}
function Board() {
	const me = useYard((s) => s.me);
	const quotes = useYard((s) => s.quotes);
	const units = useYard((s) => s.units);
	const logQuote = useYard((s) => s.logQuote);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const mine = quotes.filter((q) => q.code === me.code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-2 flex items-center gap-2 font-display text-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
					" ",
					me.code || "Sales",
					" board"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm text-muted",
				children: [me.name, " only. Day 1, then 3, then 7, then 14. Log the result. Nobody else sees this board."]
			}),
			mine.length ? mine.map((q) => {
				const late = q.dueOn < today && !q.result;
				const ws = units.find((u) => u.id === q.unitId)?.ws;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							q.code,
							" · ",
							ws,
							" · ",
							q.customer
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							tone: late ? "late" : "ok",
							children: [
								"Day ",
								q.followDay,
								" · ",
								q.dueOn
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-11 rounded-lg border border-line px-3",
							onClick: () => {
								const result = window.prompt("One line result");
								if (result) logQuote(q.id, result);
							},
							children: "Log result"
						})
					]
				}, q.id);
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nothing on this board."
			})
		]
	});
}
function OrderDesk() {
	const units = useYard((s) => s.units);
	const issue = useYard((s) => s.issueOrder);
	const [unitId, setUnitId] = (0, import_react.useState)(String(units[0]?.id || ""));
	const [responsible, setResponsible] = (0, import_react.useState)("Jean-Pierre De Fillet");
	const [supplier, setSupplier] = (0, import_react.useState)("");
	const [item, setItem] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)("1");
	const [amount, setAmount] = (0, import_react.useState)("0");
	const [msg, setMsg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "max-w-xl rounded-xl border border-line bg-card p-4",
		onSubmit: (e) => {
			e.preventDefault();
			const order = issue({
				unitId: Number(unitId),
				responsible,
				supplier,
				item,
				qty: Number(qty || 1),
				invoicedExcl: Number(amount || 0)
			});
			setMsg(order.orderNo + " marked " + responsible);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Order number"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "WS####-001, then 002. Chantelle marks who booked it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Unit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: inputCls,
					value: unitId,
					onChange: (e) => setUnitId(e.target.value),
					children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: u.id,
						children: u.ws
					}, u.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Who booked it",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: responsible,
					onChange: (e) => setResponsible(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Supplier",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: supplier,
					onChange: (e) => setSupplier(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Item",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: item,
					onChange: (e) => setItem(e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Qty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					type: "number",
					value: qty,
					onChange: (e) => setQty(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Invoiced excl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					type: "number",
					value: amount,
					onChange: (e) => setAmount(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mt-4 min-h-11 rounded-lg bg-blue px-4 text-card",
				type: "submit",
				children: "Issue number"
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: msg
			}) : null
		]
	});
}
function PhotoDesk() {
	const units = useYard((s) => s.units);
	const addPhoto = useYard((s) => s.addPhoto);
	const [unitId, setUnitId] = (0, import_react.useState)(String(units[0]?.id || ""));
	const unit = units.find((u) => u.id === Number(unitId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl rounded-xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-2 flex items-center gap-2 font-display text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5" }), " Load stock pictures"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Damian loads the picture. Sales shares it. Price stays off."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Unit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: inputCls,
					value: unitId,
					onChange: (e) => setUnitId(e.target.value),
					children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: u.id,
						children: [
							u.ws,
							" · ",
							u.description
						]
					}, u.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Picture",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					type: "file",
					accept: "image/*",
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (!file) return;
						const reader = new FileReader();
						reader.onload = () => addPhoto(Number(unitId), String(reader.result));
						reader.readAsDataURL(file);
					}
				})
			}),
			unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: unit.photo,
				alt: "",
				className: "mt-4 h-48 w-full rounded-lg object-cover"
			}) : null
		]
	});
}
function Natis() {
	const units = useYard((s) => s.units);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-2xl",
			children: "Natis"
		}), units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border-b border-line py-2 text-sm",
			children: [
				u.ws,
				" · ",
				u.vin || "VIN open",
				" · ",
				u.reg || "reg open",
				" · ",
				u.client || "no client"
			]
		}, u.id))]
	});
}
var CARD_FLOW = [
	"Submitted to Workshop",
	"Accepted by Workshop",
	"In Progress",
	"Work Completed",
	"PDI Completed"
];
function JobCard() {
	const me = useYard((s) => s.me);
	const units = useYard((s) => s.units);
	const tasks = useYard((s) => s.tasks);
	const logs = useYard((s) => s.logs);
	const openJobCard = useYard((s) => s.openJobCard);
	const patchUnit = useYard((s) => s.patchUnit);
	const setTask = useYard((s) => s.setTask);
	const addTask = useYard((s) => s.addTask);
	const rememberLog = useYard((s) => s.rememberLog);
	const [unitId, setUnitId] = (0, import_react.useState)(String(units.find((u) => u.onHand)?.id || units[0]?.id || ""));
	const unit = units.find((u) => u.id === Number(unitId));
	const [quoteNo, setQuoteNo] = (0, import_react.useState)("");
	const [client, setClient] = (0, import_react.useState)("");
	const [vin, setVin] = (0, import_react.useState)("");
	const [reg, setReg] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("Normal");
	const [due, setDue] = (0, import_react.useState)("");
	const [instruction, setInstruction] = (0, import_react.useState)("");
	const [line, setLine] = (0, import_react.useState)("");
	const [taskName, setTaskName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [openTask, setOpenTask] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!unit) return;
		setQuoteNo(unit.quoteNo || "");
		setClient(unit.client || "");
		setVin(unit.vin || "");
		setReg(unit.reg || "");
		setPriority(unit.priority || "Normal");
		setDue(unit.due || "");
		setInstruction(unit.instructions || "");
	}, [unit]);
	if (!unit) return null;
	const cardTasks = tasks.filter((t) => t.unitId === unit.id);
	const cardLogs = logs.filter((l) => l.unitId === unit.id);
	const workshop = me.role === "workshop" || me.role === "director";
	async function keep(text, kind) {
		const saved = await saveLog(me.name, unit.ws, text, kind);
		rememberLog({
			id: saved.entry.id,
			unitId: unit.id,
			person: saved.entry.person,
			line: saved.entry.line,
			at: saved.entry.at
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-xl border border-line bg-card p-4",
				onSubmit: async (e) => {
					e.preventDefault();
					if (!quoteNo.trim()) {
						setErr("A pro-forma or invoice number opens the card.");
						return;
					}
					const text = openJobCard({
						unitId: unit.id,
						quoteNo: quoteNo.trim(),
						client: client.trim(),
						vin,
						reg,
						priority,
						due,
						instruction: instruction.trim()
					});
					try {
						await keep(text, "opened");
						setErr("");
					} catch {
						setErr("The card changed here, but the book did not take the log.");
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Log a job card"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "One card per WS. Pro-forma opens it. Invoice within 48 hours or workshop can cancel. Client name stays off certificates until paid."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Unit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: inputCls,
									value: unitId,
									onChange: (e) => setUnitId(e.target.value),
									children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: u.id,
										children: [
											u.ws,
											" · ",
											u.mainType || u.tag,
											" · ",
											u.description
										]
									}, u.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Quote or invoice",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									value: quoteNo,
									onChange: (e) => setQuoteNo(e.target.value),
									placeholder: "C20920"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Client",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									value: client,
									onChange: (e) => setClient(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Priority",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: inputCls,
									value: priority,
									onChange: (e) => setPriority(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Normal" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "High" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Urgent" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "VIN",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									value: vin,
									onChange: (e) => setVin(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Registration",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									value: reg,
									onChange: (e) => setReg(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Target date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									type: "date",
									value: due,
									onChange: (e) => setDue(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Instruction",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									value: instruction,
									onChange: (e) => setInstruction(e.target.value),
									placeholder: "One line for the workshop"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-4 min-h-11 rounded-lg bg-blue px-4 text-card",
						type: "submit",
						children: "Log job card"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-late",
						children: err
					}) : null,
					!unit.invoiceNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-warn",
						children: "No invoice on this WS yet. 48 hours."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							unit.ws,
							" · ",
							unit.mainType || unit.tag,
							unit.subType ? " · " + unit.subType : "",
							" · ",
							unit.jobNumber || "Not logged"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-xl",
						children: [
							unit.year,
							" ",
							unit.description
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							unit.status || "On hand",
							" · ",
							unit.location,
							" · ",
							unit.salesman || me.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: CARD_FLOW.map((status) => {
							if (!(status === "Submitted to Workshop" ? me.role !== "workshop" : workshop)) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `min-h-11 rounded-lg border px-3 text-sm ${unit.status === status ? "border-blue bg-chip text-blue" : "border-line"}`,
								onClick: async () => {
									patchUnit(unit.id, {
										status,
										step: status
									});
									try {
										await keep("Status · " + status, "progress");
										setErr("");
									} catch {
										setErr("Status changed here, but the book did not take the log.");
									}
								},
								children: status
							}, status);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [cardTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex min-h-11 w-full items-center justify-between text-left",
								onClick: () => setOpenTask(openTask === t.id ? null : t.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: t.status === "Completed" ? "ok" : t.status === "In Progress" ? "warn" : "chip",
									children: t.status
								})]
							}), openTask === t.id && workshop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "min-h-11 rounded-lg border border-line px-3",
									onClick: async () => {
										const text = setTask(t.id, "In Progress");
										if (text) await keep(text, "progress");
									},
									children: "Start"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "min-h-11 rounded-lg bg-blue px-3 text-card",
									onClick: async () => {
										const text = setTask(t.id, "Completed");
										if (text) await keep(text, "progress");
									},
									children: "Done"
								})]
							}) : null]
						}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "min-h-11 flex-1 rounded-lg border border-line px-3",
								placeholder: "Add one task",
								value: taskName,
								onChange: (e) => setTaskName(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "min-h-11 rounded-lg border border-line px-3",
								onClick: async () => {
									if (!taskName.trim()) return;
									const text = addTask(unit.id, taskName.trim());
									setTaskName("");
									try {
										await keep(text, "task");
									} catch {
										setErr("Task added here, but the book did not take the log.");
									}
								},
								children: "Add"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-muted",
						children: "Saved on the yard book. A line cannot be removed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mb-3 flex gap-2",
						onSubmit: async (e) => {
							e.preventDefault();
							if (!line.trim()) return;
							try {
								await keep(line.trim(), "note");
								setLine("");
								setErr("");
							} catch {
								setErr("The book did not take that line.");
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "min-h-11 flex-1 rounded-lg border border-line px-3",
							placeholder: "What happened",
							value: line,
							onChange: (e) => setLine(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-11 rounded-lg bg-blue px-3 text-card",
							type: "submit",
							children: "Log"
						})]
					}),
					cardLogs.length ? cardLogs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "border-b border-line py-2 text-sm",
						children: [
							l.person,
							" · ",
							l.line,
							" · ",
							String(l.at).slice(0, 16).replace("T", " ")
						]
					}, l.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing on the book for this WS yet."
					})
				]
			})
		]
	});
}
var SplitComponent = YardApp;
//#endregion
export { SplitComponent as component };
