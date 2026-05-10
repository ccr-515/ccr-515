import { useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AreaChart, ArrowLeft, ArrowRight, Droplets, Info, RotateCcw, Sparkles } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { calculateWaterResults, createDefaultUsage, midpoint, type UsageValues } from './data/calculations';
import { uncertaintyDrivers, waterFactors, type ActivityId } from './data/waterFactors';
import { formatRange, RangeText } from './components/RangeText';
import { StepShell } from './components/StepShell';

type Step = 'intro' | 'questions' | 'results';

const chartColors = ['#22d3ee', '#818cf8', '#38bdf8', '#2dd4bf', '#a78bfa', '#60a5fa', '#67e8f9', '#c084fc', '#7dd3fc', '#99f6e4'];

function App() {
  const [step, setStep] = useState<Step>('intro');
  const [usage, setUsage] = useState<UsageValues>(() => createDefaultUsage());
  const results = useMemo(() => calculateWaterResults(usage), [usage]);

  const updateUsage = (id: ActivityId, value: string) => {
    const parsed = Number(value);
    setUsage((current) => ({ ...current, [id]: Number.isFinite(parsed) && parsed > 0 ? parsed : 0 }));
  };

  const reset = () => {
    setUsage(createDefaultUsage());
    setStep('intro');
  };

  return (
    <main className="relative min-h-screen text-slate-100">
      <AmbientBackground />
      <Header step={step} />
      <AnimatePresence mode="wait">
        {step === 'intro' && <IntroScreen key="intro" onStart={() => setStep('questions')} />}
        {step === 'questions' && (
          <QuestionsScreen
            key="questions"
            usage={usage}
            onChange={updateUsage}
            onBack={() => setStep('intro')}
            onResults={() => setStep('results')}
          />
        )}
        {step === 'results' && <ResultsScreen key="results" results={results} onBack={() => setStep('questions')} onReset={reset} />}
      </AnimatePresence>
    </main>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
    </div>
  );
}

function Header({ step }: { step: Step }) {
  const steps: Step[] = ['intro', 'questions', 'results'];
  const activeIndex = steps.indexOf(step);
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 shadow-[0_0_35px_rgba(34,211,238,0.18)]">
          <Droplets className="h-5 w-5 text-cyan-200" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-white">DWM</p>
          <p className="text-xs text-slate-400">Digital Water Mirror</p>
        </div>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        {steps.map((item, index) => (
          <div key={item} className={`h-1.5 w-12 rounded-full ${index <= activeIndex ? 'bg-cyan-200' : 'bg-white/10'}`} />
        ))}
      </div>
    </header>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <StepShell
      eyebrow="Systems reflection / static estimator"
      title="See the hidden water range behind your digital day."
      subtitle="Digital Water Mirror converts everyday online habits into an estimated data-center-related water footprint range — a calm, transparent model for exploring uncertainty rather than pretending precision."
    >
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-200/20">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">A premium, static portfolio tool for CCR515 systems thinking.</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Answer ten lightweight questions. The mirror estimates a low–high range, separates AI from non-AI use, and names the dominant activity in plain English.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-cyan-200 px-6 py-3 font-semibold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Begin reflection <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-4">
          {[
            ['Range-first', 'Outputs are estimates with low and high bounds, not exact facts.'],
            ['Local-only', 'No backend, no tracking, no external data submission.'],
            ['Uncertainty-aware', 'Provider design, power source, cooling system, and region can change the footprint.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">{title}</p>
              <p className="mt-2 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </StepShell>
  );
}

function QuestionsScreen({
  usage,
  onChange,
  onBack,
  onResults,
}: {
  usage: UsageValues;
  onChange: (id: ActivityId, value: string) => void;
  onBack: () => void;
  onResults: () => void;
}) {
  return (
    <StepShell
      eyebrow="Step 02 / daily habits"
      title="Tune the inputs. Keep the uncertainty visible."
      subtitle="Use a typical day. Zero is perfectly valid — the model is meant to adapt to your actual pattern, not nudge you toward a moral score."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {waterFactors.map((factor, index) => (
          <motion.label
            key={factor.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.025 }}
            className="group rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition focus-within:border-cyan-200/60 hover:border-white/20"
          >
            <span className="flex items-start justify-between gap-4">
              <span>
                <span className="block font-semibold text-white">{factor.question}</span>
                <span className="mt-1 block text-xs text-slate-400">Model factor: {formatRange(factor.rangeLitersPerUnit)} per {factor.unit}</span>
              </span>
              <span className={`rounded-full px-3 py-1 text-xs ${factor.category === 'ai' ? 'bg-cyan-300/15 text-cyan-100' : 'bg-indigo-300/15 text-indigo-100'}`}>
                {factor.category === 'ai' ? 'AI' : 'Digital'}
              </span>
            </span>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
              <input
                aria-label={factor.question}
                min="0"
                step="0.1"
                type="number"
                placeholder={factor.dailyPlaceholder}
                value={usage[factor.id] || ''}
                onChange={(event) => onChange(factor.id, event.target.value)}
                className="w-full bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-slate-600"
              />
              <span className="whitespace-nowrap text-sm text-slate-400">{factor.inputSuffix}</span>
            </div>
          </motion.label>
        ))}
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button onClick={onBack} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-200 transition hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button onClick={onResults} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-200 px-6 py-3 font-semibold text-slate-950 transition hover:bg-white">
          Generate mirror <AreaChart className="h-4 w-4" />
        </button>
      </div>
    </StepShell>
  );
}

function ResultsScreen({ results, onBack, onReset }: { results: ReturnType<typeof calculateWaterResults>; onBack: () => void; onReset: () => void }) {
  const activeActivities = results.activities.filter((activity) => activity.midpoint > 0);
  const chartActivities = activeActivities.length ? activeActivities : results.activities;
  const barData = chartActivities.map((activity) => ({ name: activity.shortLabel, low: activity.daily.low, high: activity.daily.high }));
  const donutData = chartActivities.map((activity) => ({ name: activity.shortLabel, value: Math.max(activity.midpoint, 0.001), category: activity.category }));
  const aiMid = midpoint(results.aiDaily);
  const nonAiMid = midpoint(results.nonAiDaily);
  const aiShare = aiMid + nonAiMid > 0 ? Math.round((aiMid / (aiMid + nonAiMid)) * 100) : 0;

  return (
    <StepShell
      eyebrow="Step 03 / reflected range"
      title="Your digital water mirror"
      subtitle="These ranges estimate water connected to data center services behind your daily habits. They are directional and intentionally transparent."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <MetricCard title="Estimated daily water use" range={results.dailyTotal} accent="cyan" />
        <MetricCard title="Estimated monthly water use" range={results.monthlyTotal} accent="indigo" />
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <p className="text-sm text-slate-400">Largest contributor</p>
          <p className="mt-3 text-3xl font-semibold text-white">{results.largestContributor.label}</p>
          <p className="mt-2 text-sm text-slate-300">
            Estimated at <RangeText range={results.largestContributor.daily} /> per day for your entered usage.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <ChartPanel title="Daily range by activity" subtitle="Low and high estimates in liters per day.">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16 }} />
              <Legend />
              <Bar dataKey="low" name="Low estimate" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              <Bar dataKey="high" name="High estimate" fill="#818cf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Activity mix" subtitle="Donut uses midpoint only to visualize share.">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={78} outerRadius={118} paddingAngle={3}>
                {donutData.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">AI vs non-AI data center use</h2>
          <div className="mt-5 space-y-4">
            <ComparisonRow label="AI prompts" range={results.aiDaily} share={aiShare} color="bg-cyan-300" />
            <ComparisonRow label="Non-AI digital activity" range={results.nonAiDaily} share={100 - aiShare} color="bg-indigo-300" />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            In this scenario, AI represents about {aiShare}% of the midpoint estimate. The displayed ranges remain the primary result.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.055] p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Plain English interpretation</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Your modeled day falls between <RangeText range={results.dailyTotal} /> of data-center-related water use. Over a 30-day month, that becomes roughly <RangeText range={results.monthlyTotal} />. The strongest signal in your current inputs is <span className="text-cyan-100">{results.largestContributor.label}</span>, so changes there would move the estimate most.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Info className="mt-1 h-5 w-5 flex-none text-cyan-200" />
          <div>
            <h2 className="text-xl font-semibold text-white">Source notes and uncertainty disclaimer</h2>
            <p className="mt-3 leading-7 text-slate-300">
              This app uses editable local estimate ranges as a portfolio model, not live provider telemetry. Data center water use varies by region, cooling design, electricity source, and provider. Results can shift with:
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
              {uncertaintyDrivers.map((driver) => (
                <li key={driver} className="rounded-2xl bg-slate-950/45 px-4 py-3">{driver}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button onClick={onBack} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-200 transition hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Adjust inputs
        </button>
        <button onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100">
          Reset mirror <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </StepShell>
  );
}

function MetricCard({ title, range, accent }: { title: string; range: { low: number; high: number }; accent: 'cyan' | 'indigo' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`mt-3 text-4xl font-semibold tracking-tight ${accent === 'cyan' ? 'text-cyan-100' : 'text-indigo-100'}`}>
        <RangeText range={range} />
      </p>
      <p className="mt-3 text-sm text-slate-400">Displayed as a low–high estimate range.</p>
    </div>
  );
}

function ChartPanel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function ComparisonRow({ label, range, share, color }: { label: string; range: { low: number; high: number }; share: number; color: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-200">{label}</span>
        <span className="text-slate-400">{formatRange(range)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} animate={{ width: `${share}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${color}`} />
      </div>
    </div>
  );
}

export default App;
