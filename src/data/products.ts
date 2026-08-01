// Product images
import bandSawGrinderImage from "@/assets/products/band-saw-grinder-new.jpg";
import teethSettingImage from "@/assets/products/teeth-setting-machine.jpg";
import miniRipSawImage from "@/assets/products/mini-rip-saw.jpg";
import heavyRipSawImage from "@/assets/products/heavy-rip-saw.jpg";
import airPneumaticFingerImage from "@/assets/products/air-pneumatic-finger-forming.jpg";
import fingerJointingViceImage from "@/assets/products/finger-jointing-vice.jpg";
import autoFingerFormingImage from "@/assets/products/auto-finger-forming.png";
import hydraulicFingerFormingImage from "@/assets/products/hydraulic-finger-forming.jpg";
import manualFingerFormingImage from "@/assets/products/manual-finger-forming.jpg";
import panelDoorAssemblerImage from "@/assets/products/panel-door-assembler.jpg";
import slidingEndSawImage from "@/assets/products/sliding-end-saw.png";
import pedalChopperImage from "@/assets/products/pedal-chopper.jpg";
import zigzagCutterImage from "@/assets/products/zigzag-cutter.jpg";
import beltSanderHeavyImage from "@/assets/products/belt-sander-heavy.jpg";
import glueMixerImage from "@/assets/products/glue-mixer.jpg";
import ddSawImage from "@/assets/products/dd-saw.jpg";
import economicGlueSpreaderImage from "@/assets/products/economic-glue-spreader.jpg";
import deluxeGlueSpreaderImage from "@/assets/products/deluxe-glue-spreader.jpg";
import dustCollectorImage from "@/assets/products/dust-collector.jpg";
import autoDippingImage from "@/assets/products/auto-dipping-machine.jpg";
import brushSandingImage from "@/assets/products/brush-sanding-machine.jpg";
import steelWoolImage from "@/assets/products/steel-wool-machine.jpg";
import wideBeltSanderImage from "@/assets/products/wide-belt-sander.jpg";
import calibrationMachineImage from "@/assets/products/calibration-machine.jpg";
import autoEdgeCuttingImage from "@/assets/products/auto-edge-cutting.jpg";
import woodDryingChamberImage from "@/assets/products/wood-drying-chamber.png";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string;
  category: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  applications: string[];
  features: string[];
  specifications: ProductSpecification[];
  whyChoose: string[];
}

export const productCategories = [
  "Saw Mill Machinery",
  "Finger Jointing Machines",
  "Sanding Machines",
  "Glue Spreader Machines",
  "Edge Cutting Machines",
  "Wood Drying Chamber",
  "Plywood Machinery",
  "Wood Working Machinery",
] as const;

export const products: Product[] = [
  // SAW MILL MACHINERY
  {
    id: "1",
    slug: "automatic-band-saw-blade-grinder",
    name: "Automatic Band Saw Blade Grinder",
    model: "SSE-ABSG",
    category: "Saw Mill Machinery",
    image: bandSawGrinderImage,
    shortDescription: "India's No.1 Band Saw Blade Grinder - First Indian machine running without lubricant in saw mill industries.",
    longDescription: "SHIV TECH Automatic Band Saw Blade Grinder is first Indian machine which runs without any lubricant in saw mill industries. This is the first invented machine specially designed on bearing sliding movement. This design makes the machine easy to operate and gives best quality of grinding on blade. This blade gives good quality of cutting, so saw blade life is increased.",
    applications: ["Saw Mills", "Plywood Industries", "Timber Processing", "Furniture Manufacturing", "Wood Panel Production"],
    features: [
      "First Indian machine without lubricant",
      "Bearing sliding movement design",
      "Easy to operate",
      "Best quality grinding",
      "Increased blade life",
      "High precision grinding"
    ],
    specifications: [
      { label: "Capacity", value: "1\" to 3\" Width (2TPI, 4TPI)" },
      { label: "Grinding Wheel Size", value: "12\" x 1/2\" (A 46 Course)" },
      { label: "Weight", value: "125 kg (Approx)" },
      { label: "Electric Motor", value: "1 HP 2880 RPM 3 Phase & 1 Phase" },
      { label: "Sharpening Speed", value: "70 to 90 teeth per minute" },
      { label: "Tool Kit", value: "Diamond Dresser, 5/16, 13/16, Fix tools" },
    ],
    whyChoose: [
      "India's No.1 Blade Grinder",
      "No lubricant required",
      "Extends blade life significantly",
      "Reduces replacement costs",
      "1 year warranty included"
    ],
  },
  {
    id: "2",
    slug: "automatic-teeth-setting-machine",
    name: "Automatic Teeth Setting Machine",
    model: "SSE-ATS",
    category: "Saw Mill Machinery",
    image: teethSettingImage,
    shortDescription: "Best machine for teeth setting of band saw blade with double teeth punch for accurate setting.",
    longDescription: "Best machine for teeth setting of band saw blade. Features accurate setting mechanism that avoids blade cracking. Easy operating with simple punch replacing and lever settings. Double teeth punch system ensures precise and consistent results.",
    applications: ["Saw Mills", "Plywood Industries", "Timber Processing", "Wood Cutting Units"],
    features: [
      "Best for teeth setting",
      "Accurate setting mechanism",
      "Avoids blade cracking",
      "Easy to operate",
      "Easy punch replacing",
      "Double teeth punch"
    ],
    specifications: [
      { label: "Electric Motor", value: "0.25 HP 3 Phase" },
      { label: "RPM", value: "950 RPM" },
      { label: "Capacity", value: "1\" to 3\" Width" },
      { label: "Punch Type", value: "Double Teeth Punch" },
    ],
    whyChoose: [
      "Accurate teeth setting",
      "Prevents blade damage",
      "Low power consumption",
      "Easy maintenance",
      "Durable construction"
    ],
  },
  {
    id: "3",
    slug: "mini-rip-saw-light-duty",
    name: "Mini Rip Saw (Light Duty)",
    model: "SSE-RS-01",
    category: "Saw Mill Machinery",
    image: miniRipSawImage,
    shortDescription: "Light duty rip saw machine for wood cutting rips with auto gear feed system.",
    longDescription: "We offer heavy rip saw machine, which is used for wood cutting rips. This mini rip saw is perfect for light duty applications with auto gear feed and 3 feed rollers for smooth operation.",
    applications: ["Small Saw Mills", "Furniture Units", "Wood Cutting", "Timber Processing"],
    features: [
      "Auto gear feed (3F x 1R)",
      "3 feed rollers",
      "Compact design",
      "Easy operation",
      "Suitable for light duty work"
    ],
    specifications: [
      { label: "Table Width", value: "5\"" },
      { label: "Feed", value: "Auto Gear (3F x 1R)" },
      { label: "Feed Rollers", value: "3" },
      { label: "Shaft Diameter", value: "38 mm" },
      { label: "Saw Cutter Diameter", value: "8\" or 10\"" },
      { label: "Cutting Height", value: "32 mm" },
      { label: "Power Requirement", value: "7.5 HP to 10 HP" },
    ],
    whyChoose: [
      "Compact & efficient",
      "Low power consumption",
      "Ideal for small operations",
      "Easy to maintain",
      "Affordable pricing"
    ],
  },
  {
    id: "4",
    slug: "running-rip-saw",
    name: "Running Rip Saw",
    model: "SSE-RS-02",
    category: "Saw Mill Machinery",
    image: miniRipSawImage,
    shortDescription: "Medium duty rip saw with larger cutting capacity for continuous wood cutting operations.",
    longDescription: "Running Rip Saw machine designed for continuous operation with enhanced cutting capacity. Features auto gear feed system with 3 feed rollers for consistent and smooth wood cutting performance.",
    applications: ["Saw Mills", "Timber Industry", "Pallet Manufacturing", "Wood Processing"],
    features: [
      "Auto gear feed (3F x 1R)",
      "3 feed rollers",
      "Larger cutting capacity",
      "Continuous operation capable",
      "Heavy duty shaft"
    ],
    specifications: [
      { label: "Table Width", value: "9\"" },
      { label: "Feed", value: "Auto Gear (3F x 1R)" },
      { label: "Feed Rollers", value: "3" },
      { label: "Shaft Diameter", value: "63.5 mm" },
      { label: "Saw Cutter Diameter", value: "10\" or 13\"" },
      { label: "Cutting Height", value: "75 mm" },
      { label: "Power Requirement", value: "15 HP" },
    ],
    whyChoose: [
      "Medium duty performance",
      "Higher cutting capacity",
      "Reliable operation",
      "Durable construction",
      "Good value for money"
    ],
  },
  {
    id: "5",
    slug: "heavy-rip-saw",
    name: "Heavy Rip Saw",
    model: "SSE-HRS-03/04",
    category: "Saw Mill Machinery",
    image: heavyRipSawImage,
    shortDescription: "Heavy duty rip saw machine specially designed for pallet manufacturing with maximum cutting capacity.",
    longDescription: "This Heavy Rip Saw Machine is specially designed for Pallet Manufacturing and heavy duty wood cutting applications. Available in multiple power configurations to suit different production requirements.",
    applications: ["Pallet Manufacturing", "Heavy Timber Cutting", "Industrial Saw Mills", "Large Scale Wood Processing"],
    features: [
      "Heavy duty construction",
      "Auto gear feed",
      "4 feed rollers",
      "Multiple power options",
      "Suitable for pallet manufacturing"
    ],
    specifications: [
      { label: "Table Width", value: "9\"" },
      { label: "Feed", value: "Auto Gear (3F x 1R)" },
      { label: "Feed Rollers", value: "4" },
      { label: "Shaft Diameter", value: "63.5 mm" },
      { label: "Saw Cutter Diameter", value: "13\" / 16\" / 18\" / 20\"" },
      { label: "Cutting Height", value: "75mm / 100mm / 125mm / 150mm" },
      { label: "Power Requirement", value: "20 HP / 30 HP / 35 HP / 40 HP" },
    ],
    whyChoose: [
      "Maximum cutting capacity",
      "Pallet manufacturing ready",
      "Multiple configurations",
      "Industrial grade build",
      "High productivity"
    ],
  },
  {
    id: "6",
    slug: "sliding-end-saw",
    name: "Sliding End Saw",
    model: "SSE-SES",
    category: "Saw Mill Machinery",
    image: slidingEndSawImage,
    shortDescription: "Sliding end saw with trolley table and linear bearing slide for precise 90° end cutting.",
    longDescription: "Sliding End Saw with Trolley Table features Linear Bearing Slide for smooth operation. Used for end cutting of wooden planks at 90° for joinery or sizing purpose. Available in multiple table sizes to suit different requirements.",
    applications: ["Joinery Work", "Wood Sizing", "Furniture Manufacturing", "Panel Production"],
    features: [
      "Trolley table design",
      "Linear bearing slide",
      "90° end cutting",
      "Multiple table sizes available",
      "Precision cutting"
    ],
    specifications: [
      { label: "Table Size", value: "4 ft / 5 ft / 6 ft / 7 ft (Length)" },
      { label: "Cutting Angle", value: "90°" },
      { label: "Slide Type", value: "Linear Bearing" },
    ],
    whyChoose: [
      "Precise 90° cuts",
      "Smooth sliding operation",
      "Multiple size options",
      "Durable construction",
      "Suitable for joinery"
    ],
  },
  {
    id: "7",
    slug: "pedal-chopper",
    name: "Pedal Chopper",
    model: "SSE-PC-54",
    category: "Saw Mill Machinery",
    image: pedalChopperImage,
    shortDescription: "Foot operated pedal chopper for chopping wood in plywood industrial applications.",
    longDescription: "Our Pedal Chopper finds its application in chopping the wood for Plywood industrial purpose. This foot operated machine is efficient and easy to use for wood chopping operations.",
    applications: ["Plywood Industry", "Wood Chopping", "Core Preparation", "Panel Manufacturing"],
    features: [
      "Foot operated",
      "54\" size available",
      "Easy operation",
      "Low maintenance",
      "Suitable for plywood industry"
    ],
    specifications: [
      { label: "Size", value: "54\" (Foot Operated)" },
      { label: "Operation", value: "Pedal / Foot Operated" },
    ],
    whyChoose: [
      "No power required",
      "Simple operation",
      "Low maintenance cost",
      "Reliable performance",
      "Ideal for plywood units"
    ],
  },
  {
    id: "8",
    slug: "core-zigzag-cutter",
    name: "Core Zig Zag Cutter",
    model: "SSE-ZC",
    category: "Plywood Machinery",
    image: zigzagCutterImage,
    shortDescription: "Mechanized zig-zag cutting for ply-core pieces ensuring high quality plywood layers.",
    longDescription: "Zigzag setting of ply-core pieces improve ply layers, ensuring High Quality of plywood. For preparing ply-core pieces, the plywood industry has been labour-intensive in regard to core layering. This machine mechanizes the process very economically. No ply industry can remain viable in global competition era without adopting to 'ZigZag'.",
    applications: ["Plywood Manufacturing", "Core Layer Preparation", "High Quality Plywood Production"],
    features: [
      "Mechanized zigzag cutting",
      "Improves ply layers",
      "High quality output",
      "Labour cost reduction",
      "Economic operation"
    ],
    specifications: [
      { label: "M/c Working Size", value: "700mm width (max)" },
      { label: "Work Piece Thickness", value: "Up to 3mm of wood core" },
      { label: "Electric Motor", value: "3 HP" },
    ],
    whyChoose: [
      "Essential for quality plywood",
      "Reduces labour cost",
      "Mechanized process",
      "High productivity",
      "Competitive advantage"
    ],
  },
  // FINGER JOINTING MACHINES
  {
    id: "9",
    slug: "air-pneumatic-finger-forming",
    name: "Air Pneumatic Finger Forming Machine",
    model: "SSE-AF-101",
    category: "Finger Jointing Machines",
    image: airPneumaticFingerImage,
    shortDescription: "Comprehensive finger jointing machine with air pneumatic operation for superior wood panel production.",
    longDescription: "SHIV TECH offers a comprehensive range of finest quality Air Pneumatic Finger Jointing Machine. Our Air Pneumatic Finger Jointing Machine is designed using purest of raw materials procured from trusted vendors. It is user friendly machine and is capable of performing in almost all industrial conditions. Air pneumatic jointer vice can easily hold a job as requirement for join.",
    applications: ["Plywood Manufacturing", "Panel Board Production", "Door Manufacturing", "Furniture Industry", "Block Board Production"],
    features: [
      "Air pneumatic operation",
      "User friendly design",
      "All industrial conditions suitable",
      "Easy job holding",
      "Quality raw materials"
    ],
    specifications: [
      { label: "Power Required", value: "10 HP" },
      { label: "Working Capacity", value: "6\" x 12\"" },
      { label: "Cutter Size", value: "7 x 25" },
    ],
    whyChoose: [
      "Superior build quality",
      "Versatile operation",
      "User friendly",
      "Trusted by industry",
      "Expert support"
    ],
  },
  {
    id: "10",
    slug: "air-pneumatic-finger-jointing-vice",
    name: "Air Pneumatic Finger Jointing Vice",
    model: "SSE-AFJ-201",
    category: "Finger Jointing Machines",
    image: fingerJointingViceImage,
    shortDescription: "Air pneumatic finger jointing vice for flush door and block board industries.",
    longDescription: "Air Pneumatic Finger Jointing Vice designed for flush door and block board industries. Features precise working capacity and multiple width options for versatile applications.",
    applications: ["Flush Door Industry", "Block Board Production", "Plywood Industry", "Panel Manufacturing"],
    features: [
      "Air pneumatic operation",
      "Multiple width options",
      "Precise jointing",
      "Easy operation",
      "Durable construction"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Size in Width", value: "6 x 3 & 8 x 3" },
    ],
    whyChoose: [
      "Precise finger jointing",
      "Multiple size options",
      "Industrial grade",
      "Low maintenance",
      "Long service life"
    ],
  },
  {
    id: "11",
    slug: "cutting-vice",
    name: "Cutting Vice",
    model: "SSE-JCV-814",
    category: "Finger Jointing Machines",
    image: fingerJointingViceImage,
    shortDescription: "Ending cutting system for flush door and block board industries with air pneumatic & hydraulic options.",
    longDescription: "Cutting Vice with Ending Cutting System useful in Plywood Industry for Flush door Making. Available in Air Pneumatic & Hydraulic Cutting System options for versatile applications.",
    applications: ["Flush Door Making", "Block Board Industry", "Plywood Industry", "Panel Production"],
    features: [
      "Ending cutting system",
      "Air pneumatic option",
      "Hydraulic option available",
      "Useful for flush door making",
      "Low power consumption"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Power Requirement", value: "1 HP" },
      { label: "Cutting System", value: "Air Pneumatic & Hydraulic" },
    ],
    whyChoose: [
      "Multiple system options",
      "Low power consumption",
      "Versatile application",
      "Easy operation",
      "Cost effective"
    ],
  },
  {
    id: "12",
    slug: "auto-finger-forming-plc",
    name: "Auto Finger Forming Machine (PLC Based)",
    model: "SSE-AF-1210",
    category: "Finger Jointing Machines",
    image: autoFingerFormingImage,
    shortDescription: "PLC based auto finger forming with automatic feeding, pressing, and end-cutting for high volume production.",
    longDescription: "SHIV TECH Model SSE-AF-1210 works well for units that need high quality in high volumes. With new PLC based auto controls on vice unit, the feeding, pressing, end-cutting of the job pieces is made effortless. Suitable for industries like finger jointed board, flush doors and block boards.",
    applications: ["Finger Jointed Board", "Flush Doors", "Block Boards", "High Volume Production"],
    features: [
      "PLC based auto controls",
      "Auto feeding",
      "Auto pressing",
      "Auto end-cutting",
      "High volume capability"
    ],
    specifications: [
      { label: "Working Capacity", value: "300mm x 150mm" },
      { label: "Power Requirement", value: "10 HP" },
      { label: "Control", value: "PLC Based Auto" },
    ],
    whyChoose: [
      "Fully automatic operation",
      "High volume production",
      "PLC controlled precision",
      "Labour saving",
      "Consistent quality"
    ],
  },
  {
    id: "13",
    slug: "auto-function-jointer",
    name: "Auto Function Jointer",
    model: "SSE-AFJ-710",
    category: "Finger Jointing Machines",
    image: autoFingerFormingImage,
    shortDescription: "Auto function jointer with online end cutting, pressing and auto ejecting features.",
    longDescription: "Auto Function Jointer with online features including end cutting, pressing & auto ejecting. This machine streamlines the finger jointing process with automated operations for higher productivity.",
    applications: ["Panel Production", "Door Manufacturing", "Block Board", "Furniture Industry"],
    features: [
      "Online end cutting",
      "Auto pressing",
      "Auto ejecting",
      "Streamlined operation",
      "Higher productivity"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Power Requirement", value: "3 HP" },
    ],
    whyChoose: [
      "Automated operations",
      "Low power consumption",
      "High productivity",
      "Easy operation",
      "Reliable performance"
    ],
  },
  {
    id: "14",
    slug: "hydro-pneumatic-pressing-vice",
    name: "Hydro Pneumatic Pressing Vice",
    model: "SSE-MF-812",
    category: "Finger Jointing Machines",
    image: hydraulicFingerFormingImage,
    shortDescription: "Hydro pneumatic pressing vice for finger jointing with combined hydraulic and pneumatic power.",
    longDescription: "Hydro Pneumatic Pressing Vice for Finger Jointing combines the power of hydraulic and pneumatic systems for superior pressing performance. Ideal for various finger jointing applications.",
    applications: ["Finger Jointing", "Panel Production", "Block Board", "Door Manufacturing"],
    features: [
      "Hydro pneumatic system",
      "Combined power",
      "Superior pressing",
      "Versatile application",
      "Durable construction"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Power Requirement", value: "2 HP" },
    ],
    whyChoose: [
      "Combined hydraulic & pneumatic",
      "Superior pressing force",
      "Low power consumption",
      "Reliable operation",
      "Long service life"
    ],
  },
  {
    id: "15",
    slug: "auto-hydraulic-finger-forming",
    name: "Auto Hydraulic Finger Forming Machine",
    model: "SSE-HF-2410",
    category: "Finger Jointing Machines",
    image: hydraulicFingerFormingImage,
    shortDescription: "Hydraulic finger forming machine with larger working capacity for high productivity operations.",
    longDescription: "Hydraulic Finger Forming Machines that do not require mechanical gears accomplish the respective tasks quite comfortably. These machines are highly alert and made using genuine components for reliable performance.",
    applications: ["Large Scale Production", "Panel Manufacturing", "Furniture Industry", "Block Board Production"],
    features: [
      "No mechanical gears required",
      "Hydraulic operation",
      "Genuine components",
      "Comfortable operation",
      "Large capacity"
    ],
    specifications: [
      { label: "Model", value: "SSE-HF-1210 / SSE-HF-2410" },
      { label: "Working Capacity (1210)", value: "300mm x 150mm" },
      { label: "Working Capacity (2410)", value: "600mm x 150mm" },
      { label: "Power Requirement (1210)", value: "11 HP" },
      { label: "Power Requirement (2410)", value: "4 HP" },
    ],
    whyChoose: [
      "No mechanical gears",
      "Smooth hydraulic operation",
      "Large working capacity",
      "Genuine components",
      "High reliability"
    ],
  },
  {
    id: "16",
    slug: "hydraulic-jointer-vice",
    name: "Hydraulic Jointer Vice",
    model: "SSE-HFJ-710",
    category: "Finger Jointing Machines",
    image: hydraulicFingerFormingImage,
    shortDescription: "Hydraulic jointer vice for precise finger jointing with powerful hydraulic pressing.",
    longDescription: "Hydraulic Jointer Vice provides powerful hydraulic pressing for precise finger jointing operations. Designed for consistent results and long service life.",
    applications: ["Finger Jointing", "Panel Production", "Door Manufacturing", "Furniture Industry"],
    features: [
      "Hydraulic pressing",
      "Precise jointing",
      "Powerful operation",
      "Consistent results",
      "Low maintenance"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Power Requirement", value: "2 HP" },
    ],
    whyChoose: [
      "Powerful hydraulic press",
      "Precise jointing",
      "Low power consumption",
      "Easy maintenance",
      "Durable build"
    ],
  },
  {
    id: "17",
    slug: "manual-finger-forming",
    name: "Manual Finger Forming Machine",
    model: "SSE-MF-410",
    category: "Finger Jointing Machines",
    image: manualFingerFormingImage,
    shortDescription: "Finger shaping machine with manual drive and clamping for small, medium and large wood sizes.",
    longDescription: "Finger shaping M/c. with manual drive and clamping. It can handle wood size of small, medium and large. Ideal for smaller operations requiring flexibility and control.",
    applications: ["Small Scale Production", "Furniture Units", "Custom Jointing", "Workshop Applications"],
    features: [
      "Manual drive",
      "Manual clamping",
      "Multiple wood sizes",
      "Flexible operation",
      "Good control"
    ],
    specifications: [
      { label: "Working Capacity", value: "150mm x 300mm" },
      { label: "Power Requirement", value: "9 HP" },
      { label: "Cutter Size", value: "7 x 21" },
    ],
    whyChoose: [
      "Manual control",
      "Flexible sizing",
      "Affordable option",
      "Easy operation",
      "Reliable performance"
    ],
  },
  {
    id: "18",
    slug: "manual-jointer-vice",
    name: "Manual Jointer Vice",
    model: "SSE-MFJ-810",
    category: "Finger Jointing Machines",
    image: manualFingerFormingImage,
    shortDescription: "Manual single platform pressing vice for finger jointing operations.",
    longDescription: "Model with Manual Single Platform Pressing Vice for finger jointing applications. Ideal for operations requiring manual control and flexibility.",
    applications: ["Small Production Units", "Workshop Applications", "Custom Jointing", "Furniture Manufacturing"],
    features: [
      "Single platform",
      "Manual pressing",
      "Flexible operation",
      "Easy control",
      "Compact design"
    ],
    specifications: [
      { label: "Working Capacity", value: "2500mm x 150mm x 75mm" },
      { label: "Power Requirement", value: "2 HP" },
    ],
    whyChoose: [
      "Manual control",
      "Low power consumption",
      "Compact design",
      "Easy operation",
      "Affordable"
    ],
  },
  {
    id: "19",
    slug: "panel-door-assembler",
    name: "Panel Cum Door Assembler",
    model: "SSE-2P1D",
    category: "Plywood Machinery",
    image: panelDoorAssemblerImage,
    shortDescription: "Hydraulic panel and door assembler for efficient assembly of panels and doors.",
    longDescription: "Panel Cum Door Assembler with hydraulic power pack for efficient assembly of both panels and doors. Versatile machine suitable for various assembly requirements.",
    applications: ["Panel Assembly", "Door Assembly", "Flush Door Manufacturing", "Panel Production"],
    features: [
      "Dual purpose",
      "Hydraulic power pack",
      "Panel assembly",
      "Door assembly",
      "Efficient operation"
    ],
    specifications: [
      { label: "Panel Assembler Model", value: "SSE-2P1D" },
      { label: "Max Working Length (Panel)", value: "2500mm" },
      { label: "Max Working Thickness", value: "40mm" },
      { label: "Power Required", value: "2 HP (for hydro power pack)" },
      { label: "Max Working Length (Door)", value: "2150mm" },
      { label: "Max Working Width (Door)", value: "1050mm" },
    ],
    whyChoose: [
      "Dual purpose machine",
      "Low power consumption",
      "Versatile applications",
      "Hydraulic operation",
      "Space saving"
    ],
  },
  // SANDING MACHINES
  {
    id: "20",
    slug: "belt-sander-heavy-duty",
    name: "Belt Sander (Heavy Duty)",
    model: "SSE-MBS",
    category: "Sanding Machines",
    image: beltSanderHeavyImage,
    shortDescription: "Heavy duty belt sander precisely designed for professional sanding operations.",
    longDescription: "We are delicately offering our clients an excellent range of Belt Sander which is very precisely designed by professionals. Esteemed customers can attain these sanders according to their detailed technical specifications.",
    applications: ["Plywood Finishing", "Panel Sanding", "Furniture Production", "Wood Surface Finishing"],
    features: [
      "Heavy duty construction",
      "Precision designed",
      "Large sanding area",
      "Professional grade",
      "Customizable specifications"
    ],
    specifications: [
      { label: "Sanding Area", value: "2440 x 1220 mm" },
      { label: "Power", value: "5 HP (RPM 1440)" },
      { label: "Belt Size", value: "150 x 7500 mm" },
    ],
    whyChoose: [
      "Heavy duty performance",
      "Large sanding area",
      "Professional results",
      "Durable construction",
      "Customizable options"
    ],
  },
  {
    id: "21",
    slug: "brush-sanding-machine",
    name: "Brush Sanding Machine (Fully Automatic)",
    model: "SSE-BS-04/06",
    category: "Sanding Machines",
    image: brushSandingImage,
    shortDescription: "Fully automatic brush roller sanding machine for uniform sanding with new brushing concept.",
    longDescription: "Sanding machine specially developed for uniform sanding operation on ply board with new brushing concept. It provides consistent grain and roughness as desired against belt process. The brush requires less brushing time and works long lasting. Saves belt replacement time & increases efficiency in sanding with Steel Wool operation.",
    applications: ["Plywood Sanding", "Panel Finishing", "Quality Sanding", "Surface Preparation"],
    features: [
      "Fully automatic",
      "New brushing concept",
      "Uniform sanding",
      "Top & bottom side sanding",
      "Steel wool compatible",
      "Digital count meter option"
    ],
    specifications: [
      { label: "Model", value: "SSE-BS-04 / SSE-BS-06" },
      { label: "Brushing Roller (04)", value: "4 Head (Roller)" },
      { label: "Brushing Roller (06)", value: "6 Head (Roller)" },
      { label: "Brushing Roller Size (04)", value: "200mm OD x 1280mm Length" },
      { label: "Brushing Roller Size (06)", value: "210mm OD x 1320mm Length" },
      { label: "Sanding", value: "Top & Bottom side" },
      { label: "Max Sanding Speed", value: "3 Ply sheet/min" },
      { label: "Sheet Thickness", value: "Min 4mm to Max 52mm" },
      { label: "Power (04)", value: "17.5 HP" },
      { label: "Power (06)", value: "22.5 HP" },
    ],
    whyChoose: [
      "Uniform sanding output",
      "Long lasting brush",
      "Saves belt replacement",
      "Increased efficiency",
      "Steel wool operation"
    ],
  },
  {
    id: "22",
    slug: "steel-wool-machine",
    name: "Steel Wool Machine",
    model: "SSE-SW-02",
    category: "Sanding Machines",
    image: steelWoolImage,
    shortDescription: "Specially developed for uniform and precise steel wool operation on plywood sheets.",
    longDescription: "Steel wool machine specially developed for uniform and precise steel wool operation on plywood sheet with new concept. It will able to finish steel wool work in short time with high productivity result in minimum time period. Special skill operator requirement is negative. Easy to operate and also in maintenance.",
    applications: ["Plywood Finishing", "Surface Treatment", "Quality Enhancement", "Final Finishing"],
    features: [
      "Uniform operation",
      "Precise finishing",
      "High productivity",
      "No special skill required",
      "Easy operation",
      "Easy maintenance"
    ],
    specifications: [
      { label: "Brushing Roller", value: "2 Head" },
      { label: "Brushing Roller Size", value: "190mm Dia x 1280mm Length" },
      { label: "Steel Wool Cleaning", value: "Top and Bottom Side" },
      { label: "Max Feeding Speed", value: "7 Mtr / Min" },
      { label: "Sheet Thickness", value: "Min 4mm to Max 52mm" },
      { label: "Weight", value: "1300 kg" },
      { label: "Power", value: "16.5 HP" },
    ],
    whyChoose: [
      "Precise steel wool finish",
      "High productivity",
      "Easy to operate",
      "No skilled operator needed",
      "Quick results"
    ],
  },
  {
    id: "23",
    slug: "single-head-wide-belt-sander",
    name: "Single Head Wide Belt Sanding Machine",
    model: "SSE-SHS-2150",
    category: "Sanding Machines",
    image: wideBeltSanderImage,
    shortDescription: "Specially designed for veneer faced flush door and small plywood manufacturing.",
    longDescription: "This Machine is specially designed for Veneer Faced Flush Door & small Plywood Manufacturing. Combination of Roller & Pad makes this machine very useful, while keeping machine as well as operational cost low.",
    applications: ["Veneer Faced Flush Door", "Small Plywood Manufacturing", "Panel Finishing", "Door Production"],
    features: [
      "Roller & Pad combination",
      "Sanding with polishing",
      "Low operational cost",
      "Variable feeding speed",
      "Suitable for flush doors"
    ],
    specifications: [
      { label: "Working Thickness", value: "2-100 mm" },
      { label: "Working Width", value: "200-1250 mm" },
      { label: "No. of Heads", value: "1" },
      { label: "Heads Configuration", value: "R/P" },
      { label: "TOP - Head 1", value: "Sanding Pad With Polishing" },
      { label: "Sanding Belt Size", value: "2620 x 1350 mm" },
      { label: "Feeding Speed", value: "5-40 mm" },
      { label: "Feed Motor", value: "3 HP" },
      { label: "Total Power", value: "28.5 HP" },
      { label: "Weight", value: "3000 kg Approx" },
    ],
    whyChoose: [
      "Roller & Pad combination",
      "Low operational cost",
      "Wide working range",
      "Polishing capability",
      "Heavy duty build"
    ],
  },
  {
    id: "24",
    slug: "single-head-calibration-machine",
    name: "Single Head Calibration Machine",
    model: "SSE-SHS-2250",
    category: "Sanding Machines",
    image: calibrationMachineImage,
    shortDescription: "Developed to produce uniform thickness ply with lowest variation of 0.05 to 0.15mm.",
    longDescription: "This Calibration Machine Single Head is developed to produce the uniform thickness ply with possibly the lowest thickness variation in 0.05 to 0.15 mm. Ideal for precision calibration requirements.",
    applications: ["Precision Plywood", "Calibrated Panels", "Uniform Thickness Production", "Quality Control"],
    features: [
      "Uniform thickness output",
      "Lowest variation",
      "Steel roller calibration",
      "40 HP calibration head",
      "Precision control"
    ],
    specifications: [
      { label: "Working Thickness", value: "2-55 mm" },
      { label: "Working Width", value: "200-1250 mm" },
      { label: "No. of Heads", value: "1" },
      { label: "Heads Configuration", value: "R/P" },
      { label: "TOP - Head 1", value: "Calibration With Steel Roller (40 HP)" },
      { label: "Sanding Belt Size", value: "2620 x 1350 mm" },
      { label: "Feeding Speed", value: "5-30 mm" },
      { label: "Feed Motor", value: "5 HP" },
      { label: "Total Power", value: "45.5 HP" },
      { label: "Weight", value: "3800 kg Approx" },
    ],
    whyChoose: [
      "Precision calibration",
      "Minimum thickness variation",
      "High power calibration",
      "Quality output",
      "Industrial grade"
    ],
  },
  // GLUE SPREADER MACHINES
  {
    id: "25",
    slug: "glue-mixer",
    name: "Glue Mixer",
    model: "SSE-GM-05",
    category: "Glue Spreader Machines",
    image: glueMixerImage,
    shortDescription: "Spiral screw mixture design for easily mixing high viscosity chemicals.",
    longDescription: "This machine is easily mixed high viscosity chemical with our new spiral screw mixture design. Available in multiple capacities and materials to suit different requirements.",
    applications: ["Glue Mixing", "Chemical Mixing", "Plywood Industry", "Adhesive Preparation"],
    features: [
      "Spiral screw design",
      "High viscosity mixing",
      "Multiple capacities",
      "V belt drive",
      "SS tank option available"
    ],
    specifications: [
      { label: "Tank Material", value: "MS Steel Tank / SS Tank (Optional)" },
      { label: "Tank Type", value: "Horizontal Type" },
      { label: "Capacity", value: "150Ltr / 200Ltr / 250Ltr / 300Ltr / 500Ltr" },
      { label: "Power", value: "2 HP or 3 HP" },
      { label: "Drive", value: "V Belt Drive" },
    ],
    whyChoose: [
      "High viscosity capable",
      "Multiple capacities",
      "SS tank option",
      "Efficient mixing",
      "Low maintenance"
    ],
  },
  {
    id: "26",
    slug: "economic-glue-spreader",
    name: "Economic Glue Spreader",
    model: "SSE-EGS-04",
    category: "Glue Spreader Machines",
    image: economicGlueSpreaderImage,
    shortDescription: "Four roller chain drive machine for uniform glue spreading on core and face veneer.",
    longDescription: "Widely used in plywood (panel), ply, block board & woodwork manufacturing companies to spread the glue uniformly on the core veneer & face veneer. Rubber glue rollers are fitted with double ball bearing brackets. Features stainless steel tray for excess glue collection. Easy maintenance with rubber glue rollers able to move forward and lift up by handle & cylinders.",
    applications: ["Plywood Manufacturing", "Block Board", "Veneer Processing", "Panel Production"],
    features: [
      "Four rollers",
      "Chain drive",
      "Double ball bearing brackets",
      "SS glue tray",
      "Easy maintenance",
      "Adjustable rollers"
    ],
    specifications: [
      { label: "Size in Width", value: "36\" / 48\" / 54\" / 56\"" },
      { label: "Power", value: "2 or 3 HP" },
      { label: "Rollers", value: "4 (Rubberized with Threading & 2 MS Hard Chrome)" },
      { label: "Drive", value: "Chain Drive" },
    ],
    whyChoose: [
      "Uniform glue spreading",
      "Economic operation",
      "Easy maintenance",
      "Multiple width options",
      "Durable construction"
    ],
  },
  {
    id: "27",
    slug: "deluxe-glue-spreader",
    name: "New Deluxe Glue Spreader",
    model: "SSE-DGS-1000/1350",
    category: "Glue Spreader Machines",
    image: deluxeGlueSpreaderImage,
    shortDescription: "Heavy duty four roller glue spreader with VFD speed for one side and two side operation.",
    longDescription: "Four Roller Glue Spreader Machine is a Heavy Duty & High Quality Precision Machine used in all Plywood Manufacturing Industry. This Machine is Glue Saver with One Side & Two Side Operated capability.",
    applications: ["Plywood Manufacturing", "Large Scale Production", "Panel Processing", "Industrial Applications"],
    features: [
      "Heavy duty construction",
      "Four roller system",
      "VFD speed control",
      "Glue saver design",
      "One side & two side operation",
      "Gear box drive"
    ],
    specifications: [
      { label: "Model", value: "SSE-DGS-1000 / SSE-DGS-1350" },
      { label: "Max Passing Height", value: "1-55mm" },
      { label: "Nominal Length of Rubber Roller", value: "1000mm / 1350mm" },
      { label: "Coating Width", value: "1000mm / 1350mm" },
      { label: "Rubber Roller", value: "300mm Dia" },
      { label: "Doctor Roller", value: "180mm Dia" },
      { label: "Motor for Main Roller", value: "3HP 1440RPM / 5HP 1440RPM" },
      { label: "Drive", value: "VFD Speed" },
    ],
    whyChoose: [
      "Heavy duty quality",
      "VFD speed control",
      "Glue saving design",
      "Versatile operation",
      "Precision application"
    ],
  },
  // EDGE CUTTING MACHINES
  {
    id: "28",
    slug: "dd-saw-heavy-duty",
    name: "D.D. Saw (Heavy Duty)",
    model: "SSE-MDS-15",
    category: "Edge Cutting Machines",
    image: ddSawImage,
    shortDescription: "Heavy duty double disc saw for cutting plywood and boards at desired specifications.",
    longDescription: "Widely used for cutting plywood and boards at the desired specifications. The offered machine is designed & assembled using highly durable components and innovative technology by our skilled professionals. This Machine can be installed easily and highly appreciated for robust construction, corrosion resistance and longer service life.",
    applications: ["Plywood Cutting", "Board Trimming", "Panel Sizing", "Industrial Cutting"],
    features: [
      "Heavy duty design",
      "Durable components",
      "Innovative technology",
      "Easy installation",
      "Corrosion resistant",
      "Long service life"
    ],
    specifications: [
      { label: "Max Cutting Size", value: "2440 x 1220 mm" },
      { label: "Min Cutting Size", value: "2438 x 610 mm" },
      { label: "Saw Size", value: "16\" x 108T x Bore 25.4mm" },
      { label: "Power", value: "5 or 7.5 HP x 2 Nos. Electric Motor" },
    ],
    whyChoose: [
      "Heavy duty performance",
      "Precise cutting",
      "Robust construction",
      "Corrosion resistant",
      "Long service life"
    ],
  },
  {
    id: "29",
    slug: "automatic-edge-cutting-machine",
    name: "Automatic Edge Cutting Machine",
    model: "SSE-ADS-3660",
    category: "Edge Cutting Machines",
    image: autoEdgeCuttingImage,
    shortDescription: "Heavy duty auto D.D. Saw with roller conveyor system for labourless door, block board and plywood cutting.",
    longDescription: "We Make Heavy Duty Roller Feed Auto D.D.Saw Machine Suitable For Cutting Door, Block Board & Plywood Sheet With a Roller Conveyor System On both Side Of Machine. Labourless automatic operation for high productivity.",
    applications: ["Door Cutting", "Block Board Cutting", "Plywood Sheet Cutting", "Automatic Production Lines"],
    features: [
      "Heavy duty roller feed",
      "Auto D.D. saw",
      "Roller conveyor both sides",
      "Labourless operation",
      "Automatic thickness adjustment",
      "High productivity"
    ],
    specifications: [
      { label: "Door Cutting Size Width", value: "24\" Min to 48\" Max" },
      { label: "Block Board Size Width", value: "48\" Max" },
      { label: "Plywood Size Width", value: "48\" Max" },
      { label: "Plywood & Block Board Length", value: "66\" Min to 96\" Max" },
      { label: "Sheet Thickness Adjustment", value: "Automatic From Main Control Panel" },
      { label: "Working Size", value: "6mm to 50mm" },
      { label: "Total Power Requirement", value: "51 HP" },
      { label: "Weight", value: "5400 kg Approx" },
      { label: "Installation Size", value: "40 ft x 15 ft x 6 ft (L x W x H)" },
    ],
    whyChoose: [
      "Labourless operation",
      "Automatic controls",
      "High productivity",
      "Heavy duty build",
      "Complete conveyor system"
    ],
  },
  // DUST COLLECTOR
  {
    id: "30",
    slug: "dust-collector",
    name: "Dust Collector",
    model: "SSE-39/69",
    category: "Wood Working Machinery",
    image: dustCollectorImage,
    shortDescription: "Low-cost solution for tackling saw dust with dynamically balanced impellers.",
    longDescription: "A useful yet low-cost solution of tackling saw dust in your workshop. Manufacturing any size, any requirement to suit your plan/project. Technically Superior, Operationally Economical with dynamically balanced impellers and swivel wheels for easy movements.",
    applications: ["Workshop Dust Collection", "Saw Mill", "Wood Processing", "Industrial Cleaning"],
    features: [
      "Dynamically balanced impellers",
      "Swivel wheels",
      "Multiple bag options",
      "Custom sizes available",
      "Economical operation"
    ],
    specifications: [
      { label: "Model", value: "Single Bag / Double Bag / Four Bag" },
      { label: "Motor (Single Bag)", value: "3 HP 3 Phase" },
      { label: "Motor (Double Bag)", value: "5HP / 7.5 HP" },
      { label: "Motor (Four Bag)", value: "7.5 HP" },
      { label: "Inlet Dia (Single Bag)", value: "4\" x 2" },
      { label: "Inlet Dia (Double Bag)", value: "4\" x 3 / 4" },
      { label: "Inlet Dia (Four Bag)", value: "4\" x 3" },
      { label: "Air Volume (Single Bag)", value: "1200 CFM" },
      { label: "Air Volume (Double Bag)", value: "1800 / 2700 / 4000 CFM" },
      { label: "Air Volume (Four Bag)", value: "2700 / 4000 CFM" },
    ],
    whyChoose: [
      "Low cost solution",
      "Custom sizes available",
      "Economical operation",
      "Easy mobility",
      "High air volume"
    ],
  },
  // AUTO DIPPING MACHINE
  {
    id: "31",
    slug: "auto-dipping-machine",
    name: "Auto Dipping Machine",
    model: "SSE-DP-08/12",
    category: "Plywood Machinery",
    image: autoDippingImage,
    shortDescription: "Heavy duty dipping machine with neoprene rubber rollers for chemical dipping operations.",
    longDescription: "This Dipping machine works through heavy Neoprene Rubber rollers, Heavy duty gear box & pump, Heavy duty chemical tank, Electrical starter or panel with machine. Features Heavy Duty MS fabricated frame and body.",
    applications: ["Chemical Dipping", "Plywood Treatment", "Surface Treatment", "Industrial Coating"],
    features: [
      "Heavy Neoprene Rubber rollers",
      "Heavy duty gear box & pump",
      "Smoothly running",
      "Vibration less",
      "Chemical saving",
      "Low maintenance",
      "Reduces labor cost",
      "Easy repairable"
    ],
    specifications: [
      { label: "Model", value: "SSE-DP-08 / SSE-DP-12" },
      { label: "Rollers (DP-08)", value: "10 Roller" },
      { label: "Rollers (DP-12)", value: "8 Roller" },
      { label: "Roller Dimension", value: "160mm with Neoprene Rubber Coating" },
      { label: "Pump (DP-08)", value: "1 HP Centrifugal Pump" },
      { label: "Pump (DP-12)", value: "2 HP Centrifugal Pump" },
      { label: "Con. Drive Gearbox", value: "2HP, 50 RPM" },
      { label: "Sheet Thickness Adjustment", value: "Automatic From Main Control Panel" },
      { label: "Chemical Tank", value: "Heavy Duty MS or SS Sheet (Optional)" },
      { label: "Chemical Heating System", value: "Electric Heater Fin Tube" },
      { label: "Total Power (DP-08)", value: "8.5 HP" },
      { label: "Total Power (DP-12)", value: "7.5 HP" },
    ],
    whyChoose: [
      "Chemical saving design",
      "Vibration less operation",
      "Low maintenance",
      "Reduces labor cost",
      "Easy to operate"
    ],
  },
  // WOOD DRYING CHAMBER
  {
    id: "32",
    slug: "wood-drying-chamber",
    name: "Wood Waste Fired Furnace Seasoning Chamber",
    model: "SSE-WDC",
    category: "Wood Drying Chamber",
    image: woodDryingChamberImage,
    shortDescription: "Seasoning chamber with heat exchanger using thermic fluid or steam for wood drying.",
    longDescription: "Wood Waste Fired Furnace Seasoning Chamber available with room for heat exchanger with thermic fluid or steam. Multiple CFT models available with chamber accessories including aluminium & seamless pipe, MS fan blower, and heat exchanger.",
    applications: ["Timber Seasoning", "Wood Drying", "Plywood Processing", "Furniture Wood Preparation"],
    features: [
      "Heat exchanger option",
      "Thermic fluid option",
      "Steam option",
      "Multiple CFT models",
      "MS fan blower",
      "Aluminium pipes"
    ],
    specifications: [
      { label: "CFT Model 100-500", value: "2 HP, 2 Blower" },
      { label: "CFT Model 700-1200", value: "3 HP, 3 Blower" },
      { label: "CFT Model 1200-1500", value: "3 HP, 4 Blower" },
      { label: "Heat Exchanger", value: "Thermic Fluid or Steam" },
      { label: "Accessories", value: "Aluminium & Seamless Pipe, MS Fan Blower" },
    ],
    whyChoose: [
      "Multiple capacity options",
      "Heat exchanger included",
      "Energy efficient",
      "Quality drying results",
      "Complete accessories"
    ],
  },
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

// Helper function to get all unique categories with their product counts
export const getCategoriesWithCounts = (): { category: string; count: number }[] => {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return Object.entries(counts).map(([category, count]) => ({ category, count }));
};
