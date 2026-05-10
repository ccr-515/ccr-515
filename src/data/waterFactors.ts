export type ActivityId =
  | 'aiPrompts'
  | 'videoStreamingHours'
  | 'musicStreamingHours'
  | 'socialMediaHours'
  | 'videoCallHours'
  | 'cloudUploads'
  | 'emailsWithAttachments'
  | 'onlineGamingHours'
  | 'searchQueries'
  | 'cloudConnectedDevices';

export type ActivityCategory = 'ai' | 'nonAi';

export type EstimateRange = {
  low: number;
  high: number;
};

export type WaterFactor = {
  id: ActivityId;
  label: string;
  shortLabel: string;
  question: string;
  unit: string;
  inputSuffix: string;
  category: ActivityCategory;
  dailyPlaceholder: string;
  rangeLitersPerUnit: EstimateRange;
  note: string;
};

// Calculation assumptions live here intentionally, not in UI components.
// Values are editable scenario estimates in liters of water per unit of activity.
// They represent a broad data-center-related range rather than a measured fact for any provider.
export const waterFactors: WaterFactor[] = [
  {
    id: 'aiPrompts',
    label: 'AI prompts',
    shortLabel: 'AI prompts',
    question: 'How many AI prompts do you send in a typical day?',
    unit: 'prompt',
    inputSuffix: 'prompts / day',
    category: 'ai',
    dailyPlaceholder: '25',
    rangeLitersPerUnit: { low: 0.02, high: 0.5 },
    note: 'Includes inference-related compute and cooling variability for text-based AI interactions.',
  },
  {
    id: 'videoStreamingHours',
    label: 'Video streaming',
    shortLabel: 'Video',
    question: 'How many hours do you stream video daily?',
    unit: 'hour',
    inputSuffix: 'hours / day',
    category: 'nonAi',
    dailyPlaceholder: '2',
    rangeLitersPerUnit: { low: 0.05, high: 0.35 },
    note: 'Represents delivery, storage, and platform compute for common streaming patterns.',
  },
  {
    id: 'musicStreamingHours',
    label: 'Music streaming',
    shortLabel: 'Music',
    question: 'How many hours do you stream music or podcasts daily?',
    unit: 'hour',
    inputSuffix: 'hours / day',
    category: 'nonAi',
    dailyPlaceholder: '1.5',
    rangeLitersPerUnit: { low: 0.005, high: 0.05 },
    note: 'Lower-bandwidth audio services generally use less data-center capacity than video.',
  },
  {
    id: 'socialMediaHours',
    label: 'Social media',
    shortLabel: 'Social',
    question: 'How many hours do you spend on social media daily?',
    unit: 'hour',
    inputSuffix: 'hours / day',
    category: 'nonAi',
    dailyPlaceholder: '1',
    rangeLitersPerUnit: { low: 0.03, high: 0.25 },
    note: 'Blends feed ranking, media delivery, image/video processing, and storage.',
  },
  {
    id: 'videoCallHours',
    label: 'Video calls',
    shortLabel: 'Calls',
    question: 'How many hours are you on video calls daily?',
    unit: 'hour',
    inputSuffix: 'hours / day',
    category: 'nonAi',
    dailyPlaceholder: '0.5',
    rangeLitersPerUnit: { low: 0.04, high: 0.3 },
    note: 'Covers data-center routing, conferencing services, and recording/transcription overhead where applicable.',
  },
  {
    id: 'cloudUploads',
    label: 'Cloud uploads',
    shortLabel: 'Uploads',
    question: 'How many files, photos, or documents do you upload to the cloud daily?',
    unit: 'upload',
    inputSuffix: 'uploads / day',
    category: 'nonAi',
    dailyPlaceholder: '8',
    rangeLitersPerUnit: { low: 0.003, high: 0.08 },
    note: 'Assumes mixed file sizes and durable cloud storage replication.',
  },
  {
    id: 'emailsWithAttachments',
    label: 'Emails with attachments',
    shortLabel: 'Email',
    question: 'How many emails with attachments do you send daily?',
    unit: 'email',
    inputSuffix: 'emails / day',
    category: 'nonAi',
    dailyPlaceholder: '3',
    rangeLitersPerUnit: { low: 0.001, high: 0.03 },
    note: 'Includes mail processing, spam/security scanning, attachment storage, and sync.',
  },
  {
    id: 'onlineGamingHours',
    label: 'Online gaming',
    shortLabel: 'Gaming',
    question: 'How many hours do you play online games daily?',
    unit: 'hour',
    inputSuffix: 'hours / day',
    category: 'nonAi',
    dailyPlaceholder: '0.75',
    rangeLitersPerUnit: { low: 0.03, high: 0.25 },
    note: 'Represents matchmaking, multiplayer servers, platform services, and cloud saves.',
  },
  {
    id: 'searchQueries',
    label: 'Search queries',
    shortLabel: 'Search',
    question: 'How many web searches do you make daily?',
    unit: 'query',
    inputSuffix: 'queries / day',
    category: 'nonAi',
    dailyPlaceholder: '30',
    rangeLitersPerUnit: { low: 0.0005, high: 0.01 },
    note: 'Traditional search is modeled separately from generative AI prompts.',
  },
  {
    id: 'cloudConnectedDevices',
    label: 'Cloud-connected devices',
    shortLabel: 'Devices',
    question: 'How many cloud-connected devices are active in your home or workspace?',
    unit: 'device',
    inputSuffix: 'devices / day',
    category: 'nonAi',
    dailyPlaceholder: '4',
    rangeLitersPerUnit: { low: 0.01, high: 0.12 },
    note: 'Approximates background sync, telemetry, security checks, and device cloud services.',
  },
];

export const uncertaintyDrivers = [
  'regional water stress and climate',
  'cooling design and data center water-use effectiveness',
  'electricity source and power plant cooling requirements',
  'provider efficiency, workload scheduling, and hardware generation',
  'content resolution, file sizes, caching, and network path',
];
