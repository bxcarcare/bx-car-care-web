"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ServiceCategory = "MECHANIC" | "OIL_CHANGE" | "DETAILING";

/* =========================
   MECHANIC (ROBUST)
   ========================= */
type MechanicSectionId =
  | "Brakes"
  | "Suspension & Steering"
  | "Engine"
  | "Transmission & Drivetrain"
  | "Electrical & Electronics"
  | "Fuel & Emissions"
  | "Cooling & Heating"
  | "AC & Climate"
  | "Exhaust"
  | "Tires & Wheels"
  | "Maintenance"
  | "Fluids & Leaks"
  | "Lighting"
  | "Body & Glass"
  | "Safety & Inspection"
  | "Performance"
  | "Other";

const MECHANIC_SECTIONS: { id: MechanicSectionId; items: string[] }[] = [
  {
    id: "Brakes",
    items: [
      "Brake pads replacement",
      "Brake rotors replacement / resurfacing",
      "Brake calipers replacement",
      "Brake fluid flush / bleed",
      "Brake hose / line repair",
      "Master cylinder replacement",
      "ABS diagnostics / repair",
      "Brake noise / vibration diagnosis",
      "Parking brake adjustment / repair",
      "Brake booster inspection / replacement",
    ],
  },
  {
    id: "Suspension & Steering",
    items: [
      "Shocks / struts replacement",
      "Control arms replacement",
      "Ball joints replacement",
      "Tie rods (inner/outer) replacement",
      "Sway bar links / bushings replacement",
      "Wheel alignment",
      "Power steering pump replacement",
      "Steering rack / gear replacement",
      "CV axle replacement",
      "Wheel bearing / hub assembly replacement",
      "Suspension noise diagnosis",
    ],
  },
  {
    id: "Engine",
    items: [
      "Check engine light diagnosis",
      "Engine misfire diagnosis",
      "Spark plugs replacement",
      "Ignition coils replacement",
      "Timing belt / timing chain service",
      "Serpentine belt replacement",
      "Engine mount replacement",
      "Valve cover gasket replacement",
      "Oil pan gasket replacement",
      "Intake manifold gasket replacement",
      "Head gasket diagnosis",
      "Engine overheating diagnosis",
      "Compression / leak-down test",
    ],
  },
  {
    id: "Transmission & Drivetrain",
    items: [
      "Transmission diagnostics",
      "Transmission fluid change / service",
      "Clutch replacement (manual)",
      "Shifter / linkage repair",
      "Differential service",
      "Driveshaft / U-joint repair",
      "Transfer case service (AWD/4WD)",
      "CV joint / axle service",
      "Drivetrain noise / vibration diagnosis",
    ],
  },
  {
    id: "Electrical & Electronics",
    items: [
      "Battery replacement / testing",
      "Alternator replacement",
      "Starter replacement",
      "Charging system diagnosis",
      "Parasitic drain diagnosis",
      "Fuses / relays replacement",
      "Wiring repair",
      "Power windows / locks diagnosis",
      "Instrument cluster issues",
      "Sensors diagnostics (MAF, O2, MAP, etc.)",
      "ECU / module diagnostics",
      "OBD scan + report",
    ],
  },
  {
    id: "Fuel & Emissions",
    items: [
      "Fuel pump replacement",
      "Fuel filter replacement",
      "Fuel injector cleaning / replacement",
      "Throttle body cleaning",
      "EVAP system diagnosis",
      "O2 sensor replacement",
      "Catalytic converter diagnosis",
      "Emissions / inspection readiness",
      "Smoke test (vacuum/leaks)",
      "Rough idle / stalling diagnosis",
    ],
  },
  {
    id: "Cooling & Heating",
    items: [
      "Coolant flush",
      "Radiator replacement",
      "Thermostat replacement",
      "Water pump replacement",
      "Cooling fan diagnosis / replacement",
      "Coolant leak diagnosis",
      "Heater core diagnosis",
      "Hose replacement",
      "Overheating diagnosis",
    ],
  },
  {
    id: "AC & Climate",
    items: [
      "A/C recharge",
      "A/C leak diagnosis",
      "Compressor replacement",
      "Condenser replacement",
      "Blower motor replacement",
      "Cabin air filter replacement",
      "Climate control diagnosis",
    ],
  },
  {
    id: "Exhaust",
    items: [
      "Exhaust leak diagnosis",
      "Muffler replacement",
      "Resonator replacement",
      "Exhaust pipe repair",
      "Flex pipe replacement",
      "Hangers / clamps repair",
    ],
  },
  {
    id: "Tires & Wheels",
    items: [
      "Tire rotation",
      "Tire mounting / balancing",
      "Flat repair / patch",
      "TPMS diagnosis / sensor replacement",
      "Wheel vibration diagnosis",
      "Rim bent inspection",
      "Spare tire install",
    ],
  },
  {
    id: "Maintenance",
    items: [
      "Oil change (basic) — use Oil Change category if preferred",
      "Air filter replacement",
      "Cabin filter replacement",
      "Spark plugs (maintenance)",
      "Brake inspection",
      "Multi-point inspection",
      "Tune-up",
      "Scheduled maintenance (30k/60k/90k)",
    ],
  },
  {
    id: "Fluids & Leaks",
    items: [
      "Oil leak diagnosis",
      "Coolant leak diagnosis",
      "Transmission leak diagnosis",
      "Power steering leak diagnosis",
      "Diff / transfer case leak diagnosis",
      "Fluid top-off",
      "Gasket / seal replacement",
    ],
  },
  {
    id: "Lighting",
    items: [
      "Headlight bulb replacement",
      "Tail light / brake light replacement",
      "Turn signal repair",
      "Fog light repair",
      "LED / HID diagnosis",
      "Wiring / connector repair",
    ],
  },
  {
    id: "Body & Glass",
    items: [
      "Door handle / latch repair",
      "Window regulator repair",
      "Mirror replacement",
      "Windshield chip / crack referral",
      "Wiper blades replacement",
      "Wiper motor diagnosis",
    ],
  },
  {
    id: "Safety & Inspection",
    items: [
      "State inspection prep",
      "Safety check",
      "ABS / traction control diagnosis",
      "Airbag light diagnosis",
      "Brake + tire safety inspection",
    ],
  },
  {
    id: "Performance",
    items: [
      "Performance diagnostics",
      "Boost / turbo diagnosis",
      "Intake / exhaust performance install",
      "Custom request",
    ],
  },
  {
    id: "Other",
    items: ["Other (describe what you need)"],
  },
];

/* ===== Oil change ===== */
const OIL_TYPES = ["Full Synthetic", "Synthetic Blend", "Conventional", "Not sure"] as const;
const VISCOSITIES = ["0W-20", "5W-20", "5W-30", "0W-30", "Other", "Not sure"] as const;

/* ===== Vehicle makes/models (common in US) ===== */
const MAKES_US = [
  "Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Fiat","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan","Porsche","Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo"
] as const;

const MODELS_BY_MAKE: Record<string, string[]> = {
  Toyota: ["Camry","Corolla","RAV4","Highlander","4Runner","Tacoma","Tundra","Prius","Sienna","Avalon","C-HR","Venza","Sequoia"],
  Honda: ["Civic","Accord","CR-V","HR-V","Pilot","Odyssey","Ridgeline","Fit"],
  Ford: ["F-150","Escape","Explorer","Edge","Bronco","Ranger","Mustang","Expedition","Fusion"],
  Chevrolet: ["Silverado 1500","Equinox","Tahoe","Suburban","Traverse","Malibu","Camaro","Colorado"],
  Nissan: ["Altima","Sentra","Rogue","Murano","Pathfinder","Versa","Frontier","Maxima"],
  Hyundai: ["Elantra","Sonata","Tucson","Santa Fe","Palisade","Kona"],
  Kia: ["Forte","K5","Sportage","Sorento","Telluride","Soul","Seltos"],
  Jeep: ["Grand Cherokee","Cherokee","Compass","Renegade","Wrangler","Gladiator"],
  Subaru: ["Outback","Forester","Crosstrek","Impreza","Legacy","Ascent"],
  BMW: ["3 Series","5 Series","X3","X5","X1","X7"],
  "Mercedes-Benz": ["C-Class","E-Class","GLC","GLE","GLA","S-Class"],
  Volkswagen: ["Jetta","Passat","Tiguan","Atlas","Golf"],
  Tesla: ["Model 3","Model Y","Model S","Model X","Cybertruck"],
  GMC: ["Sierra 1500","Terrain","Acadia","Yukon"],
  Ram: ["1500","2500","3500"],
  Lexus: ["RX","NX","ES","IS","GX","LX"],
  Mazda: ["Mazda3","Mazda6","CX-5","CX-30","CX-9"],
  Audi: ["A4","A6","Q5","Q7","Q3"],
  Dodge: ["Charger","Challenger","Durango"],
  Chrysler: ["300","Pacifica"],
  Buick: ["Encore","Envision","Enclave"],
  Cadillac: ["Escalade","XT5","XT4","CT5"],
  Acura: ["TLX","RDX","MDX"],
  Infiniti: ["Q50","QX60","QX50"],
  Mitsubishi: ["Outlander","Eclipse Cross","Mirage"],
  Volvo: ["XC60","XC90","S60"],
  Mini: ["Cooper","Countryman"],
  "Land Rover": ["Range Rover","Discovery","Defender"],
  Genesis: ["G70","G80","GV70","GV80"],
  Porsche: ["Cayenne","Macan","911"],
};

/* ===== Year dropdown 1950–2026 ===== */
const YEARS = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => (1950 + i).toString()).reverse();

/* ===== Car colors ===== */
const CAR_COLORS = [
  "Black","White","Silver","Gray","Red","Blue","Green","Yellow","Orange","Brown","Beige","Gold","Purple","Pink","Bronze","Burgundy","Navy Blue","Dark Green","Other / Custom",
] as const;

/* ===== SVG thumbs (offline-safe) ===== */
function svgThumb(type: "interior" | "full" | "wax" | "ceramic" | "carseat") {
  const base = (icon: string, label: string) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="76" height="56" viewBox="0 0 76 56">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f2f2f2"/>
            <stop offset="1" stop-color="#d7d7d7"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="74" height="54" rx="12" fill="url(#g)" stroke="#bdbdbd"/>
        <text x="10" y="24" font-family="Arial" font-size="18">${icon}</text>
        <text x="10" y="44" font-family="Arial" font-size="11" fill="#111" opacity="0.9">${label}</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  if (type === "interior") return base("🧽", "Interior");
  if (type === "full") return base("🚗", "Full");
  if (type === "wax") return base("✨", "Wax");
  if (type === "ceramic") return base("🛡️", "Ceramic");

  const seatSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="76" height="56" viewBox="0 0 76 56">
      <rect x="1" y="1" width="74" height="54" rx="12" fill="#e9e9e9" stroke="#bdbdbd"/>
      <path d="M30 16c6-5 16-4 18 4l2 8c1 5-2 10-7 11H33c-5 0-9-4-9-9V23c0-3 2-6 6-7z" fill="#111" opacity="0.88"/>
      <path d="M26 30h7c3 0 6 2 7 5l2 7H29c-3 0-6-2-6-6v-6z" fill="#111" opacity="0.88"/>
      <text x="10" y="50" font-family="Arial" font-size="11" fill="#111" opacity="0.9">Seats</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(seatSvg)}`;
}

/* ===== Detailing options ===== */
const DETAILING_OPTIONS = [
  {
    id: "Interior Only",
    label: "Interior Only",
    description:
      "Vacuum + wipe down panels, dashboard, cupholders, and interior surfaces. Great for maintenance.",
    thumb: svgThumb("interior"),
  },
  {
    id: "Full Detail",
    label: "Full Detail",
    description:
      "Interior cleaning + exterior wash, wheels/tires, and full wipe-down. Best overall refresh.",
    thumb: svgThumb("full"),
  },
  {
    id: "Wax",
    label: "Wax",
    description:
      "Exterior wash + wax to boost shine and add short-term paint protection.",
    thumb: svgThumb("wax"),
  },
  {
    id: "Ceramic Coating",
    label: "Ceramic Coating",
    description:
      "Long-lasting paint protection with strong gloss and easier cleaning. (Prep may be required.)",
    thumb: svgThumb("ceramic"),
  },
  {
    id: "Seat Shampoo",
    label: "Seat Shampoo",
    description:
      "Deep fabric seat cleaning for stains, spills, and embedded dirt.",
    thumb: svgThumb("carseat"),
  },
] as const;

/* ===== Detailing add-ons ===== */
const DETAILING_ADDONS = [
  {
    id: "Headlight Polish",
    label: "Headlight Polish",
    description: "Restore clarity and improve night visibility (reduces haze/yellowing).",
  },
  {
    id: "Engine Bay Cleaning",
    label: "Engine Bay Cleaning",
    description: "Light degrease + safe cleaning for a clean engine bay finish.",
  },
  {
    id: "Odor Removal",
    label: "Odor Removal",
    description: "Targets unwanted smells (smoke, pets, food). May require ozone treatment.",
  },
] as const;

/* ===== Local backgrounds (files in /public) ===== */
const BG_DEFAULT = "/bg-default.jpg";
const BG_MECHANIC = "/bg-mechanic.jpg";
const BG_OIL = "/bg-oil.jpg";
const BG_DETAILING = "/bg-detailing.jpg";

export default function ClientAppointmentsPage() {
  const [category, setCategory] = useState<ServiceCategory | null>(null);

  // Common
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Vehicle
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [colorOther, setColorOther] = useState("");

  // Optional
  const [address, setAddress] = useState("");

  // Mechanic (robust)
  const [mechanicSection, setMechanicSection] = useState<MechanicSectionId | "">("");
  const [mechanicService, setMechanicService] = useState("");
  const [vehicleMileage, setVehicleMileage] = useState(""); // NEW
  const [isCarRunning, setIsCarRunning] = useState<"" | "YES" | "NO">(""); // NEW
  const [mechanicNotes, setMechanicNotes] = useState(""); // NEW (notes)
  const [mechanicOther, setMechanicOther] = useState(""); // kept for "Other" details

  // Oil change
  const [oilType, setOilType] = useState("");
  const [viscosity, setViscosity] = useState("");
  const [viscosityOther, setViscosityOther] = useState("");

  // Detailing
  const [detailingType, setDetailingType] = useState("");
  const [addons, setAddons] = useState<Record<string, boolean>>({
    "Headlight Polish": false,
    "Engine Bay Cleaning": false,
    "Odor Removal": false,
  });

  function selectCategory(next: ServiceCategory) {
    setCategory(next);

    // reset mechanic
    setMechanicSection("");
    setMechanicService("");
    setVehicleMileage("");
    setIsCarRunning("");
    setMechanicNotes("");
    setMechanicOther("");

    // reset oil
    setOilType("");
    setViscosity("");
    setViscosityOther("");

    // reset detailing
    setDetailingType("");
    setAddons({
      "Headlight Polish": false,
      "Engine Bay Cleaning": false,
      "Odor Removal": false,
    });
  }

  const modelsForMake = MODELS_BY_MAKE[make] || [];
  const finalColor = color === "Other / Custom" ? colorOther.trim() : color;

  const mechanicSectionObj = MECHANIC_SECTIONS.find((s) => s.id === mechanicSection);
  const mechanicServicesForSection = mechanicSectionObj?.items ?? [];

  const canSubmit = useMemo(() => {
    if (!category) return false;
    if (!date || !time) return false;
    if (!make || !model || !year) return false;
    if (color === "Other / Custom" && !colorOther.trim()) return false;

    if (category === "MECHANIC") {
      if (!mechanicSection) return false;
      if (!mechanicService) return false;
      if (!vehicleMileage.trim()) return false; // NEW required
      if (!isCarRunning) return false; // NEW required
      if (!mechanicNotes.trim()) return false; // NEW required notes

      if (mechanicSection === "Other" || mechanicService.toLowerCase().includes("other")) {
        if (!mechanicOther.trim()) return false;
      }
    }

    if (category === "OIL_CHANGE") {
      if (!oilType || !viscosity) return false;
      if (viscosity === "Other" && !viscosityOther.trim()) return false;
    }

    if (category === "DETAILING") {
      if (!detailingType) return false;
    }

    return true;
  }, [
    category,
    date,
    time,
    make,
    model,
    year,
    color,
    colorOther,
    mechanicSection,
    mechanicService,
    vehicleMileage,
    isCarRunning,
    mechanicNotes,
    mechanicOther,
    oilType,
    viscosity,
    viscosityOther,
    detailingType,
  ]);

  const selectedBg =
    category === "MECHANIC"
      ? BG_MECHANIC
      : category === "OIL_CHANGE"
      ? BG_OIL
      : category === "DETAILING"
      ? BG_DETAILING
      : BG_DEFAULT;

  function submit() {
    const selectedAddons = Object.entries(addons)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const payload = {
      category,
      date,
      time,
      vehicle: { make, model, year, color: finalColor || "" },
      address,
      mechanic:
        category === "MECHANIC"
          ? {
              section: mechanicSection,
              service: mechanicService,
              mileage: vehicleMileage,
              carRunning: isCarRunning === "YES",
              notes: mechanicNotes,
              otherDetails: mechanicOther,
            }
          : null,
      oil:
        category === "OIL_CHANGE"
          ? { oilType, viscosity: viscosity === "Other" ? viscosityOther : viscosity }
          : null,
      detailing:
        category === "DETAILING"
          ? { type: detailingType, addons: selectedAddons }
          : null,
    };

    alert("✅ Appointment submitted (mock)\n\n" + JSON.stringify(payload, null, 2));
  }

  return (
    <main style={{ ...containerBase, backgroundImage: `url('${selectedBg}')` }}>
      <div style={overlay} />

      <div style={card}>
        <div style={top}>
          <div>
            <h1 style={title}>Book Appointment</h1>
            <p style={subtitle}>
              {category
                ? category === "MECHANIC"
                  ? "Mechanic service"
                  : category === "OIL_CHANGE"
                  ? "Oil change"
                  : "Detailing service"
                : "Quick • Only what’s needed • Car care"}
            </p>
          </div>

          <Link href="/client" style={{ textDecoration: "none" }}>
            <button style={backBtn}>← Back</button>
          </Link>
        </div>

        {/* Service */}
        <section style={section}>
          <h2 style={sectionTitle}>Service</h2>
          <div style={grid3}>
            <button type="button" style={serviceBtn(category === "MECHANIC")} onClick={() => selectCategory("MECHANIC")}>
              🔧 Mechanic
              <span style={serviceHint}>By system (brakes, engine, electrical…)</span>
            </button>

            <button type="button" style={serviceBtn(category === "OIL_CHANGE")} onClick={() => selectCategory("OIL_CHANGE")}>
              🛢️ Oil Change
              <span style={serviceHint}>Oil + viscosity</span>
            </button>

            <button type="button" style={serviceBtn(category === "DETAILING")} onClick={() => selectCategory("DETAILING")}>
              ✨ Detailing
              <span style={serviceHint}>Interior / wax / ceramic…</span>
            </button>
          </div>

          {!category && <p style={helperText}>Select a service to continue.</p>}
        </section>

        {category && (
          <>
            {/* When */}
            <section style={section}>
              <h2 style={sectionTitle}>When</h2>
              <div style={grid2}>
                <div>
                  <label style={label}>Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={input} />
                </div>
                <div>
                  <label style={label}>Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={input} />
                </div>
              </div>
            </section>

            {/* Vehicle */}
            <section style={section}>
              <h2 style={sectionTitle}>Vehicle</h2>

              <div style={grid2}>
                <div>
                  <label style={label}>Make</label>
                  <select
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                      setModel("");
                    }}
                    style={input}
                  >
                    <option value="">Select make…</option>
                    {MAKES_US.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={label}>Model</label>
                  <select value={model} onChange={(e) => setModel(e.target.value)} style={input} disabled={!make}>
                    <option value="">{make ? "Select model…" : "Select make first…"}</option>
                    {modelsForMake.map((mo) => (
                      <option key={mo} value={mo}>{mo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={label}>Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} style={input}>
                    <option value="">Select year…</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={label}>Color (optional)</label>
                  <select
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      if (e.target.value !== "Other / Custom") setColorOther("");
                    }}
                    style={input}
                  >
                    <option value="">Select color…</option>
                    {CAR_COLORS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {color === "Other / Custom" && (
                    <input
                      style={{ ...input, marginTop: 8 }}
                      placeholder="Type the color"
                      value={colorOther}
                      onChange={(e) => setColorOther(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* MECHANIC: Section + Service + Mileage + Running + Notes */}
            {category === "MECHANIC" && (
              <section style={section}>
                <h2 style={sectionTitle}>Mechanic Service</h2>

                <div style={grid2}>
                  <div>
                    <label style={label}>System / Category</label>
                    <select
                      value={mechanicSection}
                      onChange={(e) => {
                        setMechanicSection(e.target.value as MechanicSectionId);
                        setMechanicService("");
                        setMechanicOther("");
                      }}
                      style={input}
                    >
                      <option value="">Select system…</option>
                      {MECHANIC_SECTIONS.map((s) => (
                        <option key={s.id} value={s.id}>{s.id}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>Service</label>
                    <select
                      value={mechanicService}
                      onChange={(e) => setMechanicService(e.target.value)}
                      style={input}
                      disabled={!mechanicSection}
                    >
                      <option value="">
                        {mechanicSection ? "Select service…" : "Select system first…"}
                      </option>
                      {mechanicServicesForSection.map((it) => (
                        <option key={it} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>Mileage</label>
                    <input
                      value={vehicleMileage}
                      onChange={(e) => setVehicleMileage(e.target.value)}
                      placeholder="e.g. 124500"
                      style={input}
                      inputMode="numeric"
                    />
                    <p style={micro}>Enter current mileage (numbers only if possible).</p>
                  </div>

                  <div>
                    <label style={label}>Does the car run?</label>
                    <div style={segWrap}>
                      <button
                        type="button"
                        style={segBtn(isCarRunning === "YES")}
                        onClick={() => setIsCarRunning("YES")}
                      >
                        ✅ Yes
                      </button>
                      <button
                        type="button"
                        style={segBtn(isCarRunning === "NO")}
                        onClick={() => setIsCarRunning("NO")}
                      >
                        ❌ No
                      </button>
                    </div>
                    <p style={micro}>Helps decide if tow is needed.</p>
                  </div>
                </div>

                <label style={{ ...label, marginTop: 12 }}>Problem description / Notes</label>
                <textarea
                  value={mechanicNotes}
                  onChange={(e) => setMechanicNotes(e.target.value)}
                  placeholder={`Describe the issue:\n- What happens?\n- When does it happen?\n- Any warning lights?\n- Any noises/smells/leaks?`}
                  style={textarea}
                  rows={5}
                />

                {(mechanicSection === "Other" ||
                  mechanicService.toLowerCase().includes("other") ||
                  mechanicService.toLowerCase().includes("custom")) && (
                  <>
                    <label style={{ ...label, marginTop: 12 }}>Other details</label>
                    <input
                      value={mechanicOther}
                      onChange={(e) => setMechanicOther(e.target.value)}
                      placeholder="Write the service you want (custom request)."
                      style={input}
                    />
                  </>
                )}
              </section>
            )}

            {/* Oil */}
            {category === "OIL_CHANGE" && (
              <section style={section}>
                <h2 style={sectionTitle}>Oil Change</h2>

                <div style={grid2}>
                  <div>
                    <label style={label}>Oil type</label>
                    <select value={oilType} onChange={(e) => setOilType(e.target.value)} style={input}>
                      <option value="">Select…</option>
                      {OIL_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>Viscosity</label>
                    <select value={viscosity} onChange={(e) => setViscosity(e.target.value)} style={input}>
                      <option value="">Select…</option>
                      {VISCOSITIES.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {viscosity === "Other" && (
                  <>
                    <label style={{ ...label, marginTop: 12 }}>Other viscosity</label>
                    <input
                      value={viscosityOther}
                      onChange={(e) => setViscosityOther(e.target.value)}
                      placeholder="e.g. 10W-30"
                      style={input}
                    />
                  </>
                )}
              </section>
            )}

            {/* Detailing */}
            {category === "DETAILING" && (
              <>
                <section style={section}>
                  <h2 style={sectionTitle}>Detailing Package</h2>

                  <div style={detailGrid}>
                    {DETAILING_OPTIONS.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDetailingType(d.id)}
                        style={detailCard(detailingType === d.id)}
                      >
                        <img src={d.thumb} alt="" style={thumb} />
                        <div style={{ display: "grid", gap: 6 }}>
                          <div style={{ fontWeight: 900, fontSize: 14 }}>{d.label}</div>
                          <div style={detailDesc}>{d.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section style={section}>
                  <h2 style={sectionTitle}>Detailing Add-ons (optional)</h2>

                  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                    {DETAILING_ADDONS.map((a) => (
                      <label key={a.id} style={addonRow}>
                        <input
                          type="checkbox"
                          checked={!!addons[a.id]}
                          onChange={(e) => setAddons((prev) => ({ ...prev, [a.id]: e.target.checked }))}
                        />
                        <div style={{ display: "grid" }}>
                          <span style={addonTitle}>{a.label}</span>
                          <span style={addonDesc}>{a.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Optional address */}
            <section style={section}>
              <h2 style={sectionTitle}>Location (optional)</h2>
              <label style={label}>Address</label>
              <input
                placeholder="Street, City, State, ZIP"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={input}
              />
              <p style={micro}>Leave blank if you will bring the car to the shop.</p>
            </section>

            <button
              style={{
                ...submitBtn,
                opacity: canSubmit ? 1 : 0.55,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
              disabled={!canSubmit}
              onClick={submit}
            >
              Confirm Appointment
            </button>
          </>
        )}
      </div>
    </main>
  );
}

/* ===== Styles ===== */

const containerBase: React.CSSProperties = {
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "grid",
  placeItems: "center",
  padding: 24,
  position: "relative",
};

const overlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.50)",
};

const card: React.CSSProperties = {
  position: "relative",
  width: 900,
  maxWidth: "100%",
  background: "rgba(247,247,247,0.96)",
  borderRadius: 20,
  padding: 22,
  boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
};

const top: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const title: React.CSSProperties = { margin: 0, fontSize: 26, fontWeight: 900, color: "#111" };
const subtitle: React.CSSProperties = { margin: 0, marginTop: 4, fontSize: 14, opacity: 0.75, color: "#111" };

const section: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.10)",
};

const sectionTitle: React.CSSProperties = { margin: 0, marginBottom: 10, fontSize: 14, fontWeight: 900, color: "#111" };

const label: React.CSSProperties = { display: "block", marginBottom: 6, fontSize: 12, fontWeight: 800, color: "#111" };

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.20)",
  background: "#fff",
  color: "#111",
  outline: "none",
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.20)",
  background: "#fff",
  color: "#111",
  outline: "none",
  resize: "vertical",
};

const micro: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: "#222",
  opacity: 0.85,
};

const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 };

const backBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.20)",
  background: "#efefef",
  fontWeight: 900,
  color: "#111",
  cursor: "pointer",
};

function serviceBtn(active: boolean): React.CSSProperties {
  return {
    padding: 14,
    borderRadius: 14,
    border: active ? "2px solid #111" : "1px solid rgba(0,0,0,0.20)",
    background: active ? "#111" : "#f0f0f0",
    color: active ? "#fff" : "#111",
    fontWeight: 900,
    cursor: "pointer",
    textAlign: "left",
  };
}

const serviceHint: React.CSSProperties = {
  display: "block",
  marginTop: 6,
  fontSize: 11,
  opacity: 0.7,
  fontWeight: 700,
};

const helperText: React.CSSProperties = { marginTop: 10, fontSize: 12, opacity: 0.75, color: "#111" };

/* Segmented buttons */
const segWrap: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

function segBtn(active: boolean): React.CSSProperties {
  return {
    padding: 12,
    borderRadius: 12,
    border: active ? "2px solid #111" : "1px solid rgba(0,0,0,0.20)",
    background: active ? "#111" : "#fff",
    color: active ? "#fff" : "#111",
    fontWeight: 900,
    cursor: "pointer",
  };
}

/* Detailing cards */
const detailGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

function detailCard(active: boolean): React.CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: "76px 1fr",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    border: active ? "2px solid #111" : "1px solid rgba(0,0,0,0.20)",
    background: active ? "#111" : "#fff",
    color: active ? "#fff" : "#111",
    textAlign: "left",
    cursor: "pointer",
  };
}

const thumb: React.CSSProperties = {
  width: 76,
  height: 56,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  objectFit: "cover",
  background: "#eee",
};

const detailDesc: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.85,
  lineHeight: 1.35,
};

const addonRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "18px 1fr",
  gap: 10,
  alignItems: "start",
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#f7f7f7",
};

const addonTitle: React.CSSProperties = {
  fontWeight: 900,
  color: "#111",
};

const addonDesc: React.CSSProperties = {
  fontSize: 12,
  color: "#222",
  opacity: 0.95,
};

const submitBtn: React.CSSProperties = {
  marginTop: 18,
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 900,
};