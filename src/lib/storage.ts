export interface FastConfig {
  startDate: string;
  targetDays: number;
}

export interface VitalsEntry {
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  weight?: number;
  energy?: number;
  mood?: number;
  notes?: string;
  timestamp: string;
}

export interface ChecklistState {
  [itemId: string]: boolean;
}

interface StorageData {
  pin: string;
  fastConfig: FastConfig;
  checklists: Record<string, ChecklistState>;
  vitals: Record<string, VitalsEntry>;
}

function getItem<K extends keyof StorageData>(key: K): StorageData[K] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setItem<K extends keyof StorageData>(key: K, value: StorageData[K]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getPin(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("pin");
}

export function setPin(pin: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pin", pin);
}

export function getFastConfig(): FastConfig | null {
  return getItem("fastConfig");
}

export function setFastConfig(config: FastConfig) {
  setItem("fastConfig", config);
}

export function getChecklists(): Record<string, ChecklistState> {
  return getItem("checklists") || {};
}

export function setChecklistItem(day: number, itemId: string, checked: boolean) {
  const all = getChecklists();
  const key = `day${day}`;
  if (!all[key]) all[key] = {};
  all[key][itemId] = checked;
  setItem("checklists", all);
}

export function getVitals(): Record<string, VitalsEntry> {
  return getItem("vitals") || {};
}

export function setVitalsEntry(key: string, entry: VitalsEntry) {
  const all = getVitals();
  all[key] = entry;
  setItem("vitals", all);
}

export function deleteVitalsEntry(key: string) {
  const all = getVitals();
  delete all[key];
  setItem("vitals", all);
}

export function getWaterOz(day: number): number {
  const all = getChecklists();
  const key = `day${day}`;
  return (all[key]?.waterOz as unknown as number) || 0;
}

export function setWaterOz(day: number, oz: number) {
  const all = getChecklists();
  const key = `day${day}`;
  if (!all[key]) all[key] = {};
  (all[key] as Record<string, unknown>).waterOz = oz;
  setItem("checklists", all);
}

export function clearAllData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("pin");
  localStorage.removeItem("fastConfig");
  localStorage.removeItem("checklists");
  localStorage.removeItem("vitals");
}

export function getFastProgress(config: FastConfig): {
  currentDay: number;
  currentHour: number;
  totalHours: number;
  elapsedHours: number;
  percentComplete: number;
  hoursRemaining: number;
  isComplete: boolean;
} {
  const start = new Date(config.startDate).getTime();
  const now = Date.now();
  const elapsed = Math.max(0, now - start);
  const elapsedHours = elapsed / (1000 * 60 * 60);
  const totalHours = config.targetDays * 24;
  const currentDay = Math.min(Math.floor(elapsedHours / 24) + 1, config.targetDays);
  const percentComplete = Math.min((elapsedHours / totalHours) * 100, 100);
  const hoursRemaining = Math.max(0, totalHours - elapsedHours);

  return {
    currentDay,
    currentHour: Math.floor(elapsedHours),
    totalHours,
    elapsedHours,
    percentComplete,
    hoursRemaining,
    isComplete: elapsedHours >= totalHours,
  };
}
