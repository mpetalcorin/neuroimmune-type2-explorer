import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sphere, Line } from "@react-three/drei";
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
  Atom
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
  Line as RLine
} from "recharts";
import Plot from "react-plotly.js";
import "./style.css";

const organs = [
  {
    id: "skin",
    label: "Skin itch circuit",
    icon: Flame,
    color: "#fb7185",
    summary:
      "Type 2 cytokines can make skin sensory nerves more excitable, producing itch and scratch cycles in allergic dermatitis.",
    players: ["IL-31", "IL-4", "IL-13", "JAK1", "TRPV1", "TRPA1", "Mast cells", "TH2 cells"],
    nerve: "Sensory neurons in dorsal root ganglia",
    immune: "TH2 cells, mast cells, macrophages, eosinophils",
    treatment:
      "JAK inhibitors and IL-4/IL-13 pathway blockers may reduce symptoms partly by calming cytokine-sensitive nerves."
  },
  {
    id: "lung",
    label: "Asthma airway circuit",
    icon: Wind,
    color: "#38bdf8",
    summary:
      "Respiratory allergens activate immune cells and airway nerves, producing inflammation, bronchoconstriction, and airway hyperreactivity.",
    players: ["IL-33", "TSLP", "ILC2", "IL-5", "IL-13", "CGRP", "NMU", "Vagus nerve"],
    nerve: "Vagal and airway sensory neurons, brainstem circuits",
    immune: "ILC2s, eosinophils, mast cells, TH2 cells",
    treatment:
      "Future asthma strategies may combine immune modulation with neuroimmune circuit control."
  },
  {
    id: "gut",
    label: "Food allergy and gut circuit",
    icon: Apple,
    color: "#facc15",
    summary:
      "Food allergens can activate IgE-decorated mast cells and brain circuits that teach avoidance behavior.",
    players: ["IgE", "Mast cells", "IL-4", "IL-13", "Enteric neurons", "NMU", "Eosinophils"],
    nerve: "Enteric nervous system, vagal pathways, brainstem and amygdala",
    immune: "Mast cells, IgE pathways, ILC2s, eosinophils",
    treatment:
      "Food allergy may require both immune tolerance strategies and understanding of learned avoidance circuits."
  },
  {
    id: "brain",
    label: "Brain repair and cognition",
    icon: Brain,
    color: "#a78bfa",
    summary:
      "IL-33, IL-4, IL-5, and IL-13 may influence synapses, microglia, brain repair, ageing, and Alzheimer’s-like pathology in experimental models.",
    players: ["IL-33", "ST2", "Microglia", "IL-4", "IL-5", "IL-13", "Treg cells", "ILC2s"],
    nerve: "Central nervous system neurons, hippocampus, cortex, brainstem",
    immune: "Microglia, meningeal ILC2s, Treg cells, macrophages",
    treatment:
      "In selected brain injury or ageing contexts, boosting repair-like type 2 signals is an experimental therapeutic idea."
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
  { name: "NMU", effect: 88, type: "Amplifies type 2 immunity" },
  { name: "Substance P", effect: 82, type: "Amplifies allergy and mast cell activity" },
  { name: "CGRP", effect: 34, type: "Often dampens type 2 immunity" },
  { name: "NMB", effect: 26, type: "Limits ILC2 activation" },
  { name: "VIP", effect: 70, type: "Context-dependent immune tuning" }
];

const baselineState = {
  allergenLoad: 55,
  epithelialDamage: 45,
  stressTone: 40,
  parasympatheticTone: 55,
  cytokineBlockade: 20,
  repairBoost: 35
};

function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function computeModel(s) {
  const alarmin = clamp(0.45 * s.allergenLoad + 0.55 * s.epithelialDamage);
  const type2 = clamp(
    0.42 * alarmin +
      0.25 * s.parasympatheticTone -
      0.22 * s.stressTone -
      0.35 * s.cytokineBlockade +
      0.1 * s.repairBoost +
      35
  );
  const nerveExcitability = clamp(
    0.45 * type2 + 0.35 * s.allergenLoad - 0.25 * s.cytokineBlockade + 15
  );
  const itchAsthmaRisk = clamp(0.55 * nerveExcitability + 0.45 * type2);
  const brainRepair = clamp(0.46 * s.repairBoost + 0.34 * alarmin + 0.2 * type2 - 0.2 * s.allergenLoad);
  const avoidanceLearning = clamp(0.5 * nerveExcitability + 0.3 * type2 + 0.2 * s.allergenLoad);
  return { alarmin, type2, nerveExcitability, itchAsthmaRisk, brainRepair, avoidanceLearning };
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
    { axis: "Avoidance learning", value: model.avoidanceLearning }
  ];

  const timeData = Array.from({ length: 16 }, (_, i) => {
    const t = i + 1;
    const wave = Math.sin(i / 2.1) * 8;
    return {
      time: t,
      cytokine: clamp(model.type2 * (1 - Math.exp(-t / 5)) + wave),
      nerve: clamp(model.nerveExcitability * (1 - Math.exp(-t / 4)) + Math.cos(i / 2) * 7),
      repair: clamp(model.brainRepair * (1 - Math.exp(-t / 8)) + Math.sin(i / 3) * 6)
    };
  });

  const exportReport = () => {
    const report = {
      title: "Neuroimmune Type 2 Explorer Report",
      selectedCircuit: selected.label,
      inputs: state,
      modelOutputs: model,
      interpretation: selected.summary,
      therapeuticLogic: selected.treatment
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
            Neuroimmune type 2 immunity explorer
          </div>
          <h1>Nerves, allergy, brain repair, and immune memory in one living system</h1>
          <p>
            An interactive scientific app that converts neuroimmune biology into useful visual analysis.
            Explore how cytokines, mast cells, IgE, ILC2s, TH2 cells, sensory neurons, vagal circuits,
            microglia, and brain repair signals communicate across skin, lung, gut, and brain.
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
            <ambientLight intensity={1.2} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
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
          ["3d", "3D landscape", Atom],
          ["treatments", "Treatment logic", Shield],
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
                  Type 2 immunity is the immune program used for allergens, parasites, tissue damage,
                  mucus production, wound repair, and allergic inflammation. This app shows that it is also
                  deeply connected to nerves and brain circuits.
                </p>
                <p>
                  Immune molecules such as IL-33, IL-4, IL-13, IL-31, IL-5, and TSLP can affect neuronal
                  firing, itch, airway reactions, food avoidance, cognition, microglial cleanup, and repair-like
                  immune states.
                </p>
              </Card>
              <Card title="Why this is useful" icon={Microscope}>
                <p>
                  The app helps students, patients, clinicians, immunologists, neuroscientists, and drug-discovery
                  teams see allergy and brain repair as systems-level communication problems rather than isolated
                  immune events.
                </p>
                <p>
                  It can be used for teaching, hypothesis generation, pathway prioritisation, treatment explanation,
                  and public science communication.
                </p>
              </Card>
            </div>

            <div className="grid three">
              <Metric label="Type 2 activation" value={model.type2} />
              <Metric label="Nerve excitability" value={model.nerveExcitability} />
              <Metric label="Repair potential" value={model.brainRepair} />
            </div>

            <Card title="Cytokine functional map" icon={Database}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={340}>
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
                  </motion.button>
                );
              })}
            </div>

            <div className="grid two">
              <Card title={selected.label} icon={selected.icon}>
                <p>{selected.summary}</p>
                <h4>Major immune players</h4>
                <div className="chips">
                  {selected.players.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <h4>Nerve axis</h4>
                <p>{selected.nerve}</p>
                <h4>Immune axis</h4>
                <p>{selected.immune}</p>
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
                <button className="wideBtn" onClick={() => setState(baselineState)}>
                  <RotateCcw size={16} /> Reset baseline
                </button>
              </Card>

              <Card title="System state radar" icon={Waves}>
                <div className="chartBox">
                  <ResponsiveContainer width="100%" height={360}>
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

            <Card title="Dynamic response over time" icon={Activity}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="time" label={{ value: "Relative time", position: "insideBottom", offset: -4 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <RLine type="monotone" dataKey="cytokine" name="Cytokine wave" strokeWidth={3} dot={false} />
                    <RLine type="monotone" dataKey="nerve" name="Nerve firing" strokeWidth={3} dot={false} />
                    <RLine type="monotone" dataKey="repair" name="Repair program" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Section>
        )}

        {activeTab === "3d" && (
          <Section key="3d">
            <Card title="3D neuroimmune landscape" icon={Atom}>
              <p>
                This graph shows how allergen exposure and tissue damage may jointly increase type 2 immune activation.
                Cytokine blockade lowers the surface, while repair boosting changes the interpretation from harmful allergy
                toward controlled repair.
              </p>
              <Plot
                data={[
                  {
                    z: Array.from({ length: 26 }, (_, y) =>
                      Array.from({ length: 26 }, (_, x) => {
                        const allergen = x * 4;
                        const damage = y * 4;
                        return clamp(
                          0.42 * allergen +
                            0.48 * damage +
                            0.18 * state.parasympatheticTone -
                            0.25 * state.cytokineBlockade +
                            Math.sin(x / 3) * 7 +
                            Math.cos(y / 4) * 7
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

            <Card title="Neuropeptide control dial" icon={Zap}>
              <div className="chartBox">
                <ResponsiveContainer width="100%" height={320}>
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
                  <li>Block IL-4/IL-13 signaling when type 2 inflammation is excessive.</li>
                  <li>Block JAK1-linked cytokine signaling when itch circuits are overactive.</li>
                  <li>Target mast cell and IgE pathways in severe allergic responses.</li>
                  <li>Study vagal and sensory nerve pathways as symptom amplifiers.</li>
                </ul>
              </Card>

              <Card title="When type 2 immunity may be helpful" icon={Shield}>
                <p>
                  In brain injury, ageing, and Alzheimer’s-like experimental models, selected type 2 signals may
                  support repair. IL-33 may help microglia and regulatory immune cells clear damage, while IL-4,
                  IL-5, and IL-13 may support anti-inflammatory or repair-like programs.
                </p>
                <ul>
                  <li>Boost repair-like cytokines locally rather than systemically.</li>
                  <li>Avoid generalized allergy activation.</li>
                  <li>Separate protective repair signals from pathological allergic signals.</li>
                  <li>Use biomarkers to identify the right tissue, timing, and dose.</li>
                </ul>
              </Card>
            </div>

            <Card title="Decision assistant" icon={HeartPulse}>
              <DecisionAssistant model={model} selected={selected} />
            </Card>
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
          </Section>
        )}
      </AnimatePresence>

      <footer>
        <p>
          Educational research app. Not medical advice. Designed for teaching, hypothesis generation,
          translational thinking, and public scientific communication.
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
      <p>{selected.summary}</p>
    </div>
  );
}

function Network3D({ selected }) {
  const nodes = [
    [-2.4, 1.2, 0],
    [0, 1.7, 0],
    [2.4, 1.2, 0],
    [-2.1, -1.2, 0],
    [0, -1.7, 0],
    [2.1, -1.2, 0]
  ];

  return (
    <group>
      {nodes.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.8}>
          <Sphere args={[0.25, 32, 32]} position={p}>
            <meshStandardMaterial color={i % 2 ? "#a78bfa" : selected.color} emissive={selected.color} emissiveIntensity={0.25} />
          </Sphere>
        </Float>
      ))}
      {nodes.slice(1).map((p, i) => (
        <Line key={i} points={[nodes[0], p]} color={selected.color} lineWidth={2} transparent opacity={0.55} />
      ))}
      <Text position={[0, 0, 0]} fontSize={0.28} color="#ffffff" anchorX="center" anchorY="middle">
        Neuroimmune network
      </Text>
    </group>
  );
}

function DecisionAssistant({ model, selected }) {
  let message = "";
  if (model.itchAsthmaRisk > 70 && model.brainRepair < 55) {
    message = "The model suggests a harmful allergy-dominant state. Prioritise calming cytokine-to-nerve signalling and mast-cell/IgE amplification.";
  } else if (model.brainRepair > 65 && model.itchAsthmaRisk < 65) {
    message = "The model suggests a repair-leaning state. This is the context where controlled type 2 signals may be biologically useful.";
  } else {
    message = "The model suggests a mixed state. The key challenge is separating helpful repair signals from harmful allergic amplification.";
  }

  return (
    <div className="decision">
      <h3>{selected.label}</h3>
      <p>{message}</p>
      <div className="chips">
        <span>Type 2 score: {Math.round(model.type2)}</span>
        <span>Nerve score: {Math.round(model.nerveExcitability)}</span>
        <span>Repair score: {Math.round(model.brainRepair)}</span>
      </div>
    </div>
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
