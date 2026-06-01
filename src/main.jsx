import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sphere, Line, Torus, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Activity,
  Waves,
  Zap,
  Shield,
  Flame,
  Wind,
  Apple,
  Database,
  Network,
  Moon,
  Sun,
  Download,
  RotateCcw,
  Info,
  Sparkles,
  Microscope,
  HeartPulse,
  CircleDot,
  Atom,
  ExternalLink,
  FlaskConical,
  BookOpen,
  Stethoscope,
  Dna,
  GitBranch,
  Target,
  TestTube2,
  Cpu,
  Gauge,
  Layers3,
  Route,
  AlertTriangle,
  Lightbulb,
  LineChart as LineChartIcon
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line as RLine,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from "recharts";
import Plot from "react-plotly.js";
import "./style.css";

const evidenceLinks = [
  {
    title: "Uploaded Science Immunology review",
    topic: "Nervous system and type 2 immunity cross-regulation",
    url: "#local-review",
    note: "Core source for this app. It reviews how type 2 cytokines, mast cells, IgE, neurons, neuropeptides, and brain circuits interact."
  },
  {
    title: "PubMed search: neuroimmune type 2 immunity IL-33 IL-4 IL-13",
    topic: "General neuroimmune evidence",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=neuroimmune+type+2+immunity+IL-33+IL-4+IL-13",
    note: "Searches peer-reviewed biomedical literature on type 2 cytokines and nervous-system communication."
  },
  {
    title: "PubMed search: IL-31 itch sensory neurons",
    topic: "Itch and dermatitis",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=IL-31+itch+sensory+neurons",
    note: "Covers cytokine-driven itch, sensory neuron firing, and atopic dermatitis mechanisms."
  },
  {
    title: "PubMed search: IL-33 Alzheimer microglia amyloid",
    topic: "Ageing and Alzheimer’s models",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=IL-33+Alzheimer+microglia+amyloid",
    note: "Focuses on IL-33, microglial phagocytosis, amyloid clearance, and cognition in experimental models."
  },
  {
    title: "PubMed search: ILC2 brain injury spinal cord stroke",
    topic: "Brain injury and repair",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=ILC2+brain+injury+spinal+cord+stroke",
    note: "Explores type 2 innate lymphoid cells, regulatory immune cells, and CNS injury repair."
  },
  {
    title: "PubMed search: vagus nerve asthma allergy neuroimmune",
    topic: "Airway neuroimmune regulation",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=vagus+nerve+asthma+allergy+neuroimmune",
    note: "Shows how airway sensory and autonomic circuits influence asthma and allergic responses."
  },
  {
    title: "PubMed search: mast cell IgE food allergy avoidance behavior",
    topic: "Food allergy and behaviour",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=mast+cell+IgE+food+allergy+avoidance+behavior",
    note: "Links mast cells, IgE, food allergens, brain activation, and avoidance behaviour."
  },
  {
    title: "PubMed search: neuromedin U ILC2 eosinophil allergy",
    topic: "Neuropeptide immune control",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=neuromedin+U+ILC2+eosinophil+allergy",
    note: "Examines NMU as a neuropeptide amplifier of type 2 immunity."
  }
];

const organs = [
  {
    id: "skin",
    label: "Skin itch circuit",
    icon: Flame,
    color: "#fb7185",
    summary:
      "Type 2 cytokines can make skin sensory nerves more excitable, producing itch and scratch cycles in allergic dermatitis.",
    players: ["IL-31", "IL-4", "IL-13", "JAK1", "TRPV1", "TRPA1", "Mast cells", "TH2 cells"],
    biomarkers: ["Serum IgE", "Eosinophils", "IL-31", "IL-4/IL-13 signature", "Skin barrier injury"],
    nerve: "Sensory neurons in dorsal root ganglia",
    immune: "TH2 cells, mast cells, macrophages, eosinophils",
    risk: "Chronic itch, sleep disruption, skin barrier breakdown, inflammatory amplification",
    treatment:
      "JAK inhibitors and IL-4/IL-13 pathway blockers may reduce symptoms partly by calming cytokine-sensitive nerves.",
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=IL-31+itch+atopic+dermatitis+sensory+neurons"
  },
  {
    id: "lung",
    label: "Asthma airway circuit",
    icon: Wind,
    color: "#38bdf8",
    summary:
      "Respiratory allergens activate immune cells and airway nerves, producing inflammation, bronchoconstriction, mucus, and airway hyperreactivity.",
    players: ["IL-33", "TSLP", "ILC2", "IL-5", "IL-13", "CGRP", "NMU", "Vagus nerve"],
    biomarkers: ["FeNO", "Blood eosinophils", "IgE", "IL-5", "IL-13", "Mucus score"],
    nerve: "Vagal and airway sensory neurons, brainstem circuits",
    immune: "ILC2s, eosinophils, mast cells, TH2 cells",
    risk: "Wheeze, cough, airway narrowing, mucus overproduction, exacerbation risk",
    treatment:
      "Future asthma strategies may combine immune modulation with neuroimmune circuit control.",
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=asthma+ILC2+vagus+nerve+IL-33+IL-13"
  },
  {
    id: "gut",
    label: "Food allergy and gut circuit",
    icon: Apple,
    color: "#facc15",
    summary:
      "Food allergens can activate IgE-decorated mast cells and brain circuits that teach avoidance behavior.",
    players: ["IgE", "Mast cells", "IL-4", "IL-13", "Enteric neurons", "NMU", "Eosinophils"],
    biomarkers: ["Food-specific IgE", "Mast cell activation", "Tryptase", "Gut symptoms", "Avoidance score"],
    nerve: "Enteric nervous system, vagal pathways, brainstem and amygdala",
    immune: "Mast cells, IgE pathways, ILC2s, eosinophils",
    risk: "Food avoidance, anaphylaxis risk, gut discomfort, learned aversion",
    treatment:
      "Food allergy may require both immune tolerance strategies and understanding of learned avoidance circuits.",
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=food+allergy+IgE+mast+cell+avoidance+behavior"
  },
  {
    id: "brain",
    label: "Brain repair and cognition",
    icon: Brain,
    color: "#a78bfa",
    summary:
      "IL-33, IL-4, IL-5, and IL-13 may influence synapses, microglia, brain repair, ageing, and Alzheimer’s-like pathology in experimental models.",
    players: ["IL-33", "ST2", "Microglia", "IL-4", "IL-5", "IL-13", "Treg cells", "ILC2s"],
    biomarkers: ["Microglial phagocytosis", "Aβ burden", "Synapse density", "IL-33/ST2", "Neurogenesis"],
    nerve: "Central nervous system neurons, hippocampus, cortex, brainstem",
    immune: "Microglia, meningeal ILC2s, Treg cells, macrophages",
    risk: "Cognitive decline, poor repair, excessive inflammatory damage, impaired debris clearance",
    treatment:
      "In selected brain injury or ageing contexts, boosting repair-like type 2 signals is an experimental therapeutic idea.",
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=IL-33+microglia+Alzheimer+amyloid+brain+injury"
  }
];

const cytokines = [
  { name: "IL-33", brain: 92, itch: 35, asthma: 78, repair: 95, allergy: 70 },
  { name: "IL-4", brain: 82, itch: 76, asthma: 72, repair: 81, allergy: 88 },
  { name: "IL-13", brain: 80, itch: 74, asthma: 94, repair: 84, allergy: 91 },
  { name: "IL-31", brain: 20, itch: 98, asthma: 38, repair: 18, allergy: 72 },
  { name: "IL-5", brain: 65, itch: 30, asthma: 88, repair: 62, allergy: 80 },
  { name: "TSLP", brain: 22, itch: 65, asthma: 85, repair: 20, allergy: 90 }
];

const peptides = [
  { name: "NMU", effect: 88, type: "Amplifies type 2 immunity", polarity: "up" },
  { name: "Substance P", effect: 82, type: "Amplifies allergy and mast cell activity", polarity: "up" },
  { name: "VIP", effect: 70, type: "Context-dependent immune tuning", polarity: "mixed" },
  { name: "CGRP", effect: 34, type: "Often dampens type 2 immunity", polarity: "down" },
  { name: "NMB", effect: 26, type: "Limits ILC2 activation", polarity: "down" }
];

const treatments = [
  {
    name: "IL-4/IL-13 pathway blockade",
    bestFor: "Atopic dermatitis, asthma, chronic type 2 inflammation",
    immuneEffect: 84,
    nerveEffect: 72,
    repairConcern: 45,
    maturity: 92,
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=dupilumab+IL-4R%CE%B1+IL-13+atopic+dermatitis+asthma"
  },
  {
    name: "JAK1 pathway inhibition",
    bestFor: "Cytokine-driven itch and inflammatory signalling",
    immuneEffect: 76,
    nerveEffect: 86,
    repairConcern: 52,
    maturity: 76,
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=JAK1+inhibitor+itch+atopic+dermatitis+sensory+neuron"
  },
  {
    name: "Anti-IgE or mast-cell axis",
    bestFor: "IgE-linked allergic disease and food-allergy pathways",
    immuneEffect: 82,
    nerveEffect: 58,
    repairConcern: 36,
    maturity: 80,
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=anti-IgE+mast+cell+food+allergy+asthma"
  },
  {
    name: "IL-33/ST2 repair-axis modulation",
    bestFor: "Experimental brain injury and Alzheimer’s-like models",
    immuneEffect: 62,
    nerveEffect: 48,
    repairConcern: 88,
    maturity: 28,
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=IL-33+ST2+brain+injury+Alzheimer+microglia"
  },
  {
    name: "Neuropeptide circuit tuning",
    bestFor: "Future precision neuroimmune medicine",
    immuneEffect: 70,
    nerveEffect: 91,
    repairConcern: 64,
    maturity: 20,
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=neuropeptide+ILC2+type+2+immunity+NMU+CGRP"
  }
];

const baselineState = {
  allergenLoad: 55,
  epithelialDamage: 45,
  stressTone: 40,
  parasympatheticTone: 55,
  cytokineBlockade: 20,
  repairBoost: 35,
  mastCellTone: 48,
  vagalSensitivity: 52,
  microgliaClearance: 45
};

function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function computeModel(s) {
  const alarmin = clamp(0.42 * s.allergenLoad + 0.48 * s.epithelialDamage + 0.1 * s.mastCellTone);
  const type2 = clamp(
    0.38 * alarmin +
      0.22 * s.parasympatheticTone -
      0.18 * s.stressTone -
      0.36 * s.cytokineBlockade +
      0.11 * s.repairBoost +
      0.16 * s.mastCellTone +
      28
  );
  const nerveExcitability = clamp(
    0.38 * type2 + 0.28 * s.allergenLoad + 0.25 * s.vagalSensitivity - 0.25 * s.cytokineBlockade + 12
  );
  const itchAsthmaRisk = clamp(0.48 * nerveExcitability + 0.36 * type2 + 0.16 * s.mastCellTone);
  const brainRepair = clamp(
    0.34 * s.repairBoost + 0.28 * s.microgliaClearance + 0.18 * alarmin + 0.18 * type2 - 0.18 * s.allergenLoad
  );
  const avoidanceLearning = clamp(0.42 * nerveExcitability + 0.25 * type2 + 0.2 * s.allergenLoad + 0.13 * s.mastCellTone);
  const therapeuticIndex = clamp(brainRepair + 0.4 * s.cytokineBlockade - 0.45 * itchAsthmaRisk + 45);
  const inflammatoryMemory = clamp(0.4 * type2 + 0.22 * s.mastCellTone + 0.2 * s.epithelialDamage + 0.18 * s.vagalSensitivity);
  return { alarmin, type2, nerveExcitability, itchAsthmaRisk, brainRepair, avoidanceLearning, therapeuticIndex, inflammatoryMemory };
}

function App() {
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState(organs[0]);
  const [state, setState] = useState(baselineState);
  const [activeTab, setActiveTab] = useState("overview");

  const model = useMemo(() => computeModel(state), [state]);

  const radarData = [
    { axis: "Alarmins", value: model.alarmin },
    { axis: "Type 2 activation", value: model.type2 },
    { axis: "Nerve firing", value: model.nerveExcitability },
    { axis: "Itch/asthma risk", value: model.itchAsthmaRisk },
    { axis: "Brain repair", value: model.brainRepair },
    { axis: "Avoidance", value: model.avoidanceLearning },
    { axis: "Therapeutic index", value: model.therapeuticIndex },
    { axis: "Inflammatory memory", value: model.inflammatoryMemory }
  ];

  const timeData = Array.from({ length: 22 }, (_, i) => {
    const t = i + 1;
    const wave = Math.sin(i / 2.1) * 8;
    return {
      time: t,
      cytokine: clamp(model.type2 * (1 - Math.exp(-t / 5)) + wave),
      nerve: clamp(model.nerveExcitability * (1 - Math.exp(-t / 4)) + Math.cos(i / 2) * 7),
      repair: clamp(model.brainRepair * (1 - Math.exp(-t / 8)) + Math.sin(i / 3) * 6),
      memory: clamp(model.inflammatoryMemory * (1 - Math.exp(-t / 7)) + Math.cos(i / 4) * 5)
    };
  });

  const scatterData = cytokines.map((c) => ({
    name: c.name,
    x: c.allergy,
    y: c.brain,
    z: c.repair,
    itch: c.itch
  }));

  const exportReport = () => {
    const report = {
      title: "Neuroimmune Type 2 Explorer Report",
      selectedCircuit: selected.label,
      inputs: state,
      modelOutputs: model,
      interpretation: selected.summary,
      therapeuticLogic: selected.treatment,
      biomarkers: selected.biomarkers,
      evidenceLinks
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "neuroimmune-type2-report.json";
    a.click();
  };

  return (
    <main className={dark ? "app dark" : "app light"}>
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      <header className="hero">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="heroText"
        >
          <div className="badge">
            <Sparkles size={16} />
            Advanced neuroimmune systems studio
          </div>
          <h1>Nerves, allergy, brain repair, immune memory, and precision treatment logic</h1>
          <p>
            A 3D animated scientific app for exploring how type 2 immune signals and nervous-system circuits
            communicate across skin, lung, gut, and brain. Built for teaching, hypothesis generation, patient-friendly
            explanation, translational immunology, and AI-assisted drug-discovery thinking.
          </p>
          <div className="heroButtons">
            <button onClick={() => setActiveTab("simulator")}>
              <Activity size={18} /> Launch simulator
            </button>
            <button className="secondary" onClick={exportReport}>
              <Download size={18} /> Export report
            </button>
            <button className="secondary" onClick={() => setDark(!dark)}>
              {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heroCanvas"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={1.15} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <Stars radius={80} depth={40} count={900} factor={4} saturation={0} fade speed={0.5} />
            <Network3D selected={selected} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </motion.div>
      </header>

      <nav className="tabs">
        {[
          ["overview", "Overview", Network],
          ["circuits", "Organ circuits", CircleDot],
          ["simulator", "Simulator", Activity],
          ["3d", "3D analytics", Atom],
          ["biomarkers", "Biomarkers", TestTube2],
          ["treatments", "Treatment logic", Shield],
          ["evidence", "Evidence links", BookOpen],
          ["hypotheses", "Hypothesis engine", Lightbulb],
          ["education", "Layman mode", Info]
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={activeTab === id ? "active" : ""}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <Section key="overview">
            <div className="grid two">
              <Card title="Main scientific idea" icon={Brain}>
                <p>
                  Type 2 immunity is the immune program used for allergens, parasites, irritants, tissue damage,
                  mucus production, wound repair, and allergic inflammation. It is not isolated from the nervous system.
                  Cytokines, neuropeptides, mast-cell products, sensory neurons, autonomic circuits, and brain regions
                  form an integrated communication network.
                </p>
                <p>
                  The uploaded Science Immunology review describes bidirectional control: immune signals influence
                  neurons, while neurons release neurotransmitters and neuropeptides that amplify or suppress type 2
                  immunity.
                </p>
              </Card>

              <Card title="Use cases" icon={Cpu}>
                <div className="featureGrid">
                  <Feature icon={Stethoscope} title="Clinical explanation" text="Explain itch, asthma, food allergy, and nerve symptoms clearly." />
                  <Feature icon={Microscope} title="Research design" text="Generate cytokine, neuron, and biomarker hypotheses." />
                  <Feature icon={Target} title="Drug discovery" text="Prioritise neuroimmune pathway targets and treatment combinations." />
                  <Feature icon={BookOpen} title="Teaching" text="Turn complex immunology into visual, interactive learning." />
                </div>
              </Card>
            </div>

            <div className="grid four">
              <Metric label="Type 2 activation" value={model.type2} />
              <Metric label="Nerve excitability" value={model.nerveExcitability} />
              <Metric label="Repair potential" value={model.brainRepair} />
              <Metric label="Therapeutic index" value={model.therapeuticIndex} />
            </div>

            <Card title="Cytokine functional map" icon={Database}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={cytokines}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="brain" name="Brain/synapse relevance" />
                    <Bar dataKey="itch" name="Itch relevance" />
                    <Bar dataKey="asthma" name="Asthma relevance" />
                    <Bar dataKey="repair" name="Repair relevance" />
                    <Bar dataKey="allergy" name="Allergy relevance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Section>
        )}

        {activeTab === "circuits" && (
          <Section key="circuits">
            <div className="organGrid">
              {organs.map((o) => {
                const Icon = o.icon;
                return (
                  <motion.button
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={o.id}
                    className={selected.id === o.id ? "organCard activeOrgan" : "organCard"}
                    onClick={() => setSelected(o)}
                    style={{ "--accent": o.color }}
                  >
                    <Icon size={28} />
                    <h3>{o.label}</h3>
                    <p>{o.summary}</p>
                    <a href={o.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      PubMed evidence <ExternalLink size={13} />
                    </a>
                  </motion.button>
                );
              })}
            </div>

            <div className="grid two">
              <Card title={selected.label} icon={selected.icon}>
                <p>{selected.summary}</p>
                <h4>Major immune and nerve players</h4>
                <div className="chips">
                  {selected.players.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <h4>Biomarker readouts</h4>
                <div className="chips">
                  {selected.biomarkers.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <h4>Nerve axis</h4>
                <p>{selected.nerve}</p>
                <h4>Immune axis</h4>
                <p>{selected.immune}</p>
                <h4>Main risk</h4>
                <p>{selected.risk}</p>
                <a className="linkBtn" href={selected.link} target="_blank" rel="noreferrer">
                  Open related PubMed search <ExternalLink size={16} />
                </a>
              </Card>

              <Card title="Animated circuit logic" icon={Zap}>
                <CircuitDiagram selected={selected} />
              </Card>
            </div>
          </Section>
        )}

        {activeTab === "simulator" && (
          <Section key="simulator">
            <div className="grid two">
              <Card title="Adjust biological inputs" icon={Activity}>
                <Slider label="Allergen or parasite exposure" value={state.allergenLoad} setValue={(v) => setState({ ...state, allergenLoad: v })} />
                <Slider label="Epithelial tissue damage" value={state.epithelialDamage} setValue={(v) => setState({ ...state, epithelialDamage: v })} />
                <Slider label="Sympathetic fight-or-flight tone" value={state.stressTone} setValue={(v) => setState({ ...state, stressTone: v })} />
                <Slider label="Parasympathetic rest-and-digest tone" value={state.parasympatheticTone} setValue={(v) => setState({ ...state, parasympatheticTone: v })} />
                <Slider label="Cytokine blockade strength" value={state.cytokineBlockade} setValue={(v) => setState({ ...state, cytokineBlockade: v })} />
                <Slider label="Repair-program boost" value={state.repairBoost} setValue={(v) => setState({ ...state, repairBoost: v })} />
                <Slider label="Mast-cell and IgE tone" value={state.mastCellTone} setValue={(v) => setState({ ...state, mastCellTone: v })} />
                <Slider label="Vagal sensory sensitivity" value={state.vagalSensitivity} setValue={(v) => setState({ ...state, vagalSensitivity: v })} />
                <Slider label="Microglial clearance capacity" value={state.microgliaClearance} setValue={(v) => setState({ ...state, microgliaClearance: v })} />
                <button className="wideBtn" onClick={() => setState(baselineState)}>
                  <RotateCcw size={16} /> Reset baseline
                </button>
              </Card>

              <Card title="System state radar" icon={Waves}>
                <div className="chartBox">
                  <ResponsiveContainer width="100%" height={390}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="axis" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar dataKey="value" name="Model output" fillOpacity={0.55} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card title="Dynamic response over time" icon={LineChartIcon}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={390}>
                  <AreaChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="time" label={{ value: "Relative time", position: "insideBottom", offset: -4 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="cytokine" name="Cytokine wave" fillOpacity={0.24} strokeWidth={3} />
                    <Area type="monotone" dataKey="nerve" name="Nerve firing" fillOpacity={0.22} strokeWidth={3} />
                    <Area type="monotone" dataKey="repair" name="Repair program" fillOpacity={0.20} strokeWidth={3} />
                    <Area type="monotone" dataKey="memory" name="Inflammatory memory" fillOpacity={0.20} strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Section>
        )}

        {activeTab === "3d" && (
          <Section key="3d">
            <Card title="3D neuroimmune activation landscape" icon={Atom}>
              <p>
                This surface graph shows how allergen exposure and tissue damage can jointly raise type 2 activation.
                Cytokine blockade lowers pathological activation, while repair boosting changes how the same pathway
                may be interpreted in brain injury or ageing contexts.
              </p>
              <Plot
                data={[
                  {
                    z: Array.from({ length: 30 }, (_, y) =>
                      Array.from({ length: 30 }, (_, x) => {
                        const allergen = x * 3.45;
                        const damage = y * 3.45;
                        return clamp(
                          0.38 * allergen +
                            0.44 * damage +
                            0.16 * state.parasympatheticTone +
                            0.12 * state.mastCellTone -
                            0.28 * state.cytokineBlockade +
                            Math.sin(x / 2.6) * 8 +
                            Math.cos(y / 3.7) * 8
                        );
                      })
                    ),
                    type: "surface",
                    contours: { z: { show: true, usecolormap: true, highlightcolor: "#ffffff", project: { z: true } } }
                  }
                ]}
                layout={{
                  autosize: true,
                  height: 620,
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  scene: {
                    xaxis: { title: "Allergen exposure" },
                    yaxis: { title: "Tissue damage" },
                    zaxis: { title: "Type 2 activation" }
                  },
                  margin: { l: 0, r: 0, b: 0, t: 0 }
                }}
                config={{ responsive: true, displaylogo: false }}
                style={{ width: "100%" }}
              />
            </Card>

            <div className="grid two">
              <Card title="Cytokine positioning matrix" icon={GitBranch}>
                <div className="chartBox">
                  <ResponsiveContainer width="100%" height={360}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" dataKey="x" name="Allergy" domain={[0, 100]} />
                      <YAxis type="number" dataKey="y" name="Brain relevance" domain={[0, 100]} />
                      <ZAxis type="number" dataKey="z" range={[100, 550]} name="Repair relevance" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value, name) => [value, name]} />
                      <Scatter name="Cytokines" data={scatterData}>
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Neuropeptide control dial" icon={Zap}>
                <div className="chartBox">
                  <ResponsiveContainer width="100%" height={360}>
                    <BarChart data={peptides}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value, name, item) => [value, item.payload.type]} />
                      <Bar dataKey="effect" name="Activation tendency" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </Section>
        )}

        {activeTab === "biomarkers" && (
          <Section key="biomarkers">
            <div className="grid two">
              <Card title="Biomarker dashboard" icon={TestTube2}>
                <p>
                  This module turns each organ circuit into measurable readouts. It is useful for experimental planning,
                  teaching, clinical explanation, and translational biomarker thinking.
                </p>
                {organs.map((o) => {
                  const Icon = o.icon;
                  return (
                    <div key={o.id} className="biomarkerRow" style={{ "--accent": o.color }}>
                      <Icon size={22} />
                      <div>
                        <h3>{o.label}</h3>
                        <div className="chips">
                          {o.biomarkers.map((b) => <span key={b}>{b}</span>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>

              <Card title="Translational readout score" icon={Gauge}>
                <div className="scoreStack">
                  <ScoreLine label="Inflammatory burden" value={model.type2} />
                  <ScoreLine label="Neural symptom burden" value={model.nerveExcitability} />
                  <ScoreLine label="Mast-cell/IgE contribution" value={state.mastCellTone} />
                  <ScoreLine label="Repair suitability" value={model.brainRepair} />
                  <ScoreLine label="Treatment precision index" value={model.therapeuticIndex} />
                </div>
              </Card>
            </div>

            <Card title="Suggested experiments" icon={FlaskConical}>
              <div className="experimentGrid">
                <Experiment title="Cytokine-to-neuron assay" text="Treat sensory neurons with IL-4, IL-13, or IL-31 and quantify calcium firing or phospho-JAK/STAT signalling." />
                <Experiment title="Immune-cell co-culture" text="Co-culture ILC2s or mast cells with neurons and test whether neuropeptide release changes cytokine output." />
                <Experiment title="Barrier injury model" text="Increase epithelial-damage inputs and measure IL-33, TSLP, IL-25, mucus, eosinophils, and nerve activation." />
                <Experiment title="Brain repair model" text="Measure microglial phagocytosis, synapse density, IL-33/ST2 activation, and behavioural recovery after injury models." />
              </div>
            </Card>
          </Section>
        )}

        {activeTab === "treatments" && (
          <Section key="treatments">
            <div className="grid two">
              <Card title="When type 2 immunity is harmful" icon={Flame}>
                <p>
                  In allergy, asthma, dermatitis, and food allergy, type 2 immunity can become excessive.
                  Immune signals sensitize nerves, nerves amplify symptoms, and the result can be itch,
                  airway narrowing, coughing, mucus, swelling, and avoidance behavior.
                </p>
                <ul>
                  <li>Block IL-4/IL-13 signalling when type 2 inflammation is excessive.</li>
                  <li>Block JAK-linked cytokine signalling when itch circuits are overactive.</li>
                  <li>Target mast-cell and IgE pathways in severe allergic responses.</li>
                  <li>Study vagal and sensory nerve pathways as symptom amplifiers.</li>
                </ul>
              </Card>

              <Card title="When type 2 immunity may be helpful" icon={Shield}>
                <p>
                  In brain injury, ageing, and Alzheimer’s-like experimental models, selected type 2 signals may
                  support repair. The challenge is to preserve repair-like signalling without triggering pathological allergy.
                </p>
                <ul>
                  <li>Boost repair-like cytokines locally rather than systemically.</li>
                  <li>Avoid generalized allergy activation.</li>
                  <li>Separate protective repair signals from pathological allergic signals.</li>
                  <li>Use biomarkers to identify the right tissue, timing, and dose.</li>
                </ul>
              </Card>
            </div>

            <Card title="Treatment comparator with clickable evidence" icon={Target}>
              <div className="treatmentGrid">
                {treatments.map((t) => (
                  <motion.a
                    whileHover={{ y: -5 }}
                    key={t.name}
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                    className="treatmentCard"
                  >
                    <h3>{t.name}</h3>
                    <p>{t.bestFor}</p>
                    <ScoreLine label="Immune modulation" value={t.immuneEffect} />
                    <ScoreLine label="Nerve symptom relevance" value={t.nerveEffect} />
                    <ScoreLine label="Repair-axis relevance" value={t.repairConcern} />
                    <ScoreLine label="Clinical maturity" value={t.maturity} />
                    <span className="openLink">Open PubMed <ExternalLink size={14} /></span>
                  </motion.a>
                ))}
              </div>
            </Card>

            <Card title="Decision assistant" icon={HeartPulse}>
              <DecisionAssistant model={model} selected={selected} />
            </Card>
          </Section>
        )}

        {activeTab === "evidence" && (
          <Section key="evidence">
            <Card title="Clickable evidence library" icon={BookOpen}>
              <p>
                These links open evidence searches in PubMed or point to the uploaded review source. They are designed
                for fast literature exploration, teaching, and manuscript planning.
              </p>
              <div className="evidenceGrid">
                {evidenceLinks.map((e) => (
                  <motion.a whileHover={{ y: -5 }} className="evidenceCard" key={e.title} href={e.url} target={e.url.startsWith("#") ? "_self" : "_blank"} rel="noreferrer">
                    <h3>{e.title}</h3>
                    <strong>{e.topic}</strong>
                    <p>{e.note}</p>
                    <span>Open evidence <ExternalLink size={14} /></span>
                  </motion.a>
                ))}
              </div>
            </Card>

            <Card title="Evidence strength map" icon={Layers3}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={treatments}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={95} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="maturity" name="Clinical maturity" />
                    <Bar dataKey="repairConcern" name="Repair-axis relevance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Section>
        )}

        {activeTab === "hypotheses" && (
          <Section key="hypotheses">
            <Card title="AI-style hypothesis generator" icon={Lightbulb}>
              <p>
                The module below converts the selected circuit and simulator state into testable research ideas.
                These are not medical claims. They are structured hypotheses for literature review and experimental design.
              </p>
              <HypothesisEngine selected={selected} state={state} model={model} />
            </Card>

            <div className="grid three">
              <MiniLesson title="Mechanistic hypothesis" text="Which immune signal changes which neuron subtype, and through which receptor?" />
              <MiniLesson title="Translational hypothesis" text="Which biomarker best separates harmful allergy from helpful repair?" />
              <MiniLesson title="Therapeutic hypothesis" text="Which intervention calms symptoms without blocking tissue repair?" />
            </div>
          </Section>
        )}

        {activeTab === "education" && (
          <Section key="education">
            <Card title="Layman explanation" icon={Info}>
              <p>
                Think of the immune system as the body’s emergency repair and defence crew, and the nervous system
                as the body’s electrical communication network. This app shows that the repair crew and the electrical
                network are constantly talking.
              </p>
              <p>
                In allergy, the immune system may shout too loudly, and the nerves become irritated. That can feel like
                itching, coughing, wheezing, gut discomfort, or a strong urge to avoid a food. In brain injury or ageing,
                some of the same immune messengers may help clean up damage and support repair.
              </p>
              <p>
                The practical message is simple: future treatments may need to control both sides, the immune signal and
                the nerve response. Allergy may be treated by calming harmful immune-to-nerve signalling. Brain repair may
                eventually benefit from carefully controlled repair-like immune signals.
              </p>
            </Card>

            <div className="grid three">
              <MiniLesson title="Allergy is not just immunity" text="Nerves help turn immune activity into itch, cough, airway tightness, and avoidance." />
              <MiniLesson title="Brain repair is not just neurons" text="Microglia, ILC2s, Treg cells, and cytokines may influence cleanup and repair after injury." />
              <MiniLesson title="Treatment needs precision" text="The same type 2 pathway can be harmful in allergy but useful in repair, depending on context." />
            </div>

            <Card title="Public explanation script" icon={Route}>
              <p>
                This app helps people understand why allergic disease can feel so physical and neurological.
                The immune system releases chemical messages, nerves detect them, the brain interprets them,
                and the body responds with scratching, coughing, airway tightening, gut discomfort, or avoidance.
                The same language of immune repair may also help the injured or ageing brain, but only if it is
                controlled precisely.
              </p>
            </Card>
          </Section>
        )}
      </AnimatePresence>

      <footer>
        <p>
          Educational research app. Not medical advice. Built from peer-reviewed neuroimmunology concepts for teaching,
          hypothesis generation, translational analysis, and public scientific communication.
        </p>
      </footer>
    </main>
  );
}

function Section({ children }) {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.section>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="card">
      <div className="cardTitle">
        <Icon size={20} />
        <h2>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="feature">
      <Icon size={22} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <motion.div className="metric" initial={{ scale: 0.96 }} animate={{ scale: 1 }}>
      <span>{label}</span>
      <strong>{Math.round(value)}</strong>
      <div className="meter">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} />
      </div>
    </motion.div>
  );
}

function Slider({ label, value, setValue }) {
  return (
    <label className="slider">
      <div>
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </label>
  );
}

function ScoreLine({ label, value }) {
  return (
    <div className="scoreLine">
      <div>
        <span>{label}</span>
        <b>{Math.round(value)}</b>
      </div>
      <div className="meter slim">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CircuitDiagram({ selected }) {
  return (
    <div className="circuit" style={{ "--accent": selected.color }}>
      <motion.div className="node immune" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        Immune cells
      </motion.div>
      <motion.div className="signal s1" animate={{ x: [0, 130, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} />
      <motion.div className="node nerve" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}>
        Nerves
      </motion.div>
      <motion.div className="signal s2" animate={{ x: [0, -130, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 3.4 }} />
      <motion.div className="node brain" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        Brain / organ response
      </motion.div>
      <motion.div className="pulseRing" animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0.1, 0.5] }} transition={{ repeat: Infinity, duration: 2.5 }} />
      <p>{selected.summary}</p>
    </div>
  );
}

function Network3D({ selected }) {
  const nodes = [
    [-2.5, 1.25, 0],
    [0, 1.85, 0],
    [2.5, 1.25, 0],
    [-2.25, -1.25, 0],
    [0, -1.85, 0],
    [2.25, -1.25, 0],
    [0, 0, 1.2]
  ];

  return (
    <group>
      <Torus args={[3.2, 0.01, 16, 100]} rotation={[0.4, 0.2, 0]}>
        <meshStandardMaterial color={selected.color} emissive={selected.color} emissiveIntensity={0.5} transparent opacity={0.45} />
      </Torus>
      {nodes.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.8}>
          <Sphere args={[i === 6 ? 0.36 : 0.25, 32, 32]} position={p}>
            <meshStandardMaterial color={i % 2 ? "#a78bfa" : selected.color} emissive={selected.color} emissiveIntensity={0.28} />
          </Sphere>
        </Float>
      ))}
      {nodes.slice(1).map((p, i) => (
        <Line key={i} points={[nodes[6], p]} color={selected.color} lineWidth={2} transparent opacity={0.62} />
      ))}
      <Text position={[0, 0, 0]} fontSize={0.28} color="#ffffff" anchorX="center" anchorY="middle">
        Neuroimmune network
      </Text>
    </group>
  );
}

function DecisionAssistant({ model, selected }) {
  let message = "";
  let tone = "mixed";
  if (model.itchAsthmaRisk > 70 && model.brainRepair < 55) {
    message = "The model suggests a harmful allergy-dominant state. Prioritise calming cytokine-to-nerve signalling and mast-cell/IgE amplification.";
    tone = "danger";
  } else if (model.brainRepair > 65 && model.itchAsthmaRisk < 65) {
    message = "The model suggests a repair-leaning state. This is the context where controlled type 2 signals may be biologically useful.";
    tone = "good";
  } else {
    message = "The model suggests a mixed state. The key challenge is separating helpful repair signals from harmful allergic amplification.";
  }

  return (
    <div className={`decision ${tone}`}>
      <h3>{selected.label}</h3>
      <p>{message}</p>
      <div className="chips">
        <span>Type 2 score: {Math.round(model.type2)}</span>
        <span>Nerve score: {Math.round(model.nerveExcitability)}</span>
        <span>Repair score: {Math.round(model.brainRepair)}</span>
        <span>Therapeutic index: {Math.round(model.therapeuticIndex)}</span>
      </div>
    </div>
  );
}

function HypothesisEngine({ selected, state, model }) {
  const highAllergy = model.itchAsthmaRisk > 65;
  const highRepair = model.brainRepair > 60;
  const mastHigh = state.mastCellTone > 60;
  const vagalHigh = state.vagalSensitivity > 60;

  const hypotheses = [
    {
      title: `${selected.label}: cytokine-to-neuron signalling hypothesis`,
      text: highAllergy
        ? `High predicted nerve excitability suggests that blocking IL-4/IL-13, IL-31, or JAK-linked pathways may reduce symptoms in the ${selected.label.toLowerCase()} without requiring complete immune suppression.`
        : `Moderate nerve excitability suggests that symptoms may depend more on local tissue damage, epithelial alarmins, or cell recruitment than direct neuronal sensitisation.`
    },
    {
      title: "Mast-cell and IgE contribution hypothesis",
      text: mastHigh
        ? "High mast-cell/IgE tone suggests that mast-cell mediators may be a major driver of symptoms, learned avoidance, or acute allergic amplification."
        : "Lower mast-cell/IgE tone suggests that cytokines, epithelial alarmins, or neuropeptides may be more important than classical immediate hypersensitivity."
    },
    {
      title: "Repair versus allergy separation hypothesis",
      text: highRepair
        ? "The model predicts a repair-permissive state. Experiments should test whether IL-33/ST2, IL-4, IL-5, or IL-13 improves cleanup or tissue recovery without increasing allergic readouts."
        : "The model predicts limited repair potential. Experiments should test whether microglial clearance, regulatory immune cells, or local cytokine delivery can improve repair."
    },
    {
      title: "Vagal or sensory-neuron control hypothesis",
      text: vagalHigh
        ? "High vagal sensitivity suggests that organ-to-brain signalling may strongly influence symptoms. Test sensory neuron activation, brainstem markers, and autonomic outputs."
        : "Lower vagal sensitivity suggests that local immune-tissue signalling may dominate over systemic organ-to-brain communication."
    }
  ];

  return (
    <div className="hypothesisGrid">
      {hypotheses.map((h, i) => (
        <motion.div
          key={h.title}
          className="hypothesisCard"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <h3>{h.title}</h3>
          <p>{h.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Experiment({ title, text }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="experiment">
      <FlaskConical size={22} />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

function MiniLesson({ title, text }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="miniLesson">
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
