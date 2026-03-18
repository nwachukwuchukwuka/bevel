// constants/index.ts

export const COLORS = {
    primary: '#000000',
    secondary: '#FFFFFF',
    accentOrange: '#F37825',
    bgGradientStart: '#CFD6DE',
    bgGradientEnd: '#E6EBF0',
    textSecondary: '#8E8E93',
};

export const ONBOARDING_DATA = [
    {
        id: 'welcome',
        title: 'Your new era of\npersonal health',
        subtitle: '',
        type: 'intro',
    },
    {
        id: 'fitness',
        title: 'Fitness',
        subtitle: 'Build, track, and maintain your\nstrength and endurance',
        type: 'widget',
    },
];

// constants/onboarding.ts

export const HEALTH_ASPECTS = [
    { id: 'sleep', title: 'Better sleep', subtitle: 'Feeling rested every night and maintaining good sleep habits.', icon: 'moon' },
    { id: 'wellbeing', title: 'Improved wellbeing', subtitle: 'Eating better, stressing less, and forming habits that help you thrive.', icon: 'happy' },
    { id: 'fitness', title: 'Lasting fitness', subtitle: 'Building strength and endurance to be at your best.', icon: 'fitness' },
];

export const BARRIERS = [
    { id: 'eating', title: 'Unhealthy eating habits' },
    { id: 'stress', title: 'Difficulty managing stress' },
    { id: 'lifestyle', title: 'Poor lifestyle choices' },
    { id: 'all', title: 'All the above' },
];

export const SLEEP_GOALS = [
    { id: 'schedule', title: 'Build a consistent sleep schedule' },
    { id: 'quality', title: 'Improve sleep quality' },
    { id: 'faster', title: 'Fall asleep faster' },
    { id: 'all', title: 'All the above' },
];

export type OnboardingData = {
    email: string;
    name: string;
    mainGoal: string | null;
    barriers: string[];
    secondaryGoals: string[];
    sleepGoals: string[];
};


export const DASHBOARD_COLORS = {
    bg: "#F2F3F7", // Light gray background
    white: "#FFFFFF",
    activeGreen: "#00C48C",
    textPrimary: "#1A1A1A",
    textSecondary: "#A3A3A3",
    accentOrange: "#FFA500",
    accentRed: "#FF453A",
};

export const RING_DATA = [
    { label: "Strain", value: "0%", color: DASHBOARD_COLORS.accentOrange, filled: true },
    { label: "Recovery", value: "-%", color: DASHBOARD_COLORS.textSecondary, filled: false },
    { label: "Sleep", value: "-%", color: DASHBOARD_COLORS.textSecondary, filled: false },
];

export const CURRENT_DATE = "Today, September 15";


export interface WorkoutTemplate {
    id: string;
    title: string;
    exercisesCount: number;
    setsCount: number;
}

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
    {
        id: '1',
        title: 'Full Body Workout',
        exercisesCount: 10,
        setsCount: 25,
    },
    // Add more templates here in the future
];


export interface WorkoutSet {
    id: string;
    type: 'warmup' | 'standard';
    weight: number;
    reps: number;
}

export interface ExerciseDefinition {
    id: string;
    name: string;
    category: string;
    sets: WorkoutSet[];
}

export const DUMMY_EXERCISES: ExerciseDefinition[] = [
    {
        id: 'e1',
        name: 'Ab Crunch Machine',
        category: 'Machine',
        sets: [
            { id: 's1', type: 'warmup', weight: 20, reps: 12 },
            { id: 's2', type: 'standard', weight: 20, reps: 12 },
        ],
    },
    {
        id: 'e2',
        name: 'Ab Roller',
        category: 'Other',
        sets: [
            { id: 's3', type: 'standard', weight: 20, reps: 12 },
        ],
    },
    {
        id: 'e3',
        name: 'Ab Rollout',
        category: 'TRX',
        sets: [],
    },
];


export interface ActivityType {
    id: string;
    name: string;
    category: string;
    icon: string;
}

export const ACTIVITY_TYPES: ActivityType[] = [
    { id: '1', name: 'Strength Training', category: 'Recents', icon: 'barbell' },
    { id: '2', name: 'Outdoor Walk', category: 'Recents', icon: 'walk' },
    { id: '3', name: 'Indoor Walk', category: 'Recents', icon: 'walk' },
    { id: '4', name: 'Cooldown', category: 'Recents', icon: 'body' },
    { id: '5', name: 'Mixed Cardio', category: 'Recents', icon: 'fitness' },
    { id: '6', name: 'Archery', category: 'A', icon: 'disc' },
    { id: '7', name: 'American Football', category: 'A', icon: 'american-football' },
];


export const HEALTH_METRICS = [
    { id: '1', title: 'RR', value: '15.6', unit: 'rpm', status: 'Normal', statusType: 'normal', icon: 'pulse-outline', gaugeVal: 40 },
    { id: '2', title: 'RHR', value: '53.9', unit: 'bpm', status: 'Lower', statusType: 'low-blue', icon: 'heart-outline', gaugeVal: 70 },
    { id: '3', title: 'HRV', value: '74.4', unit: 'ms', status: 'Normal', statusType: 'normal', icon: 'stats-chart-outline', gaugeVal: 50 },
    { id: '4', title: 'SpO2', value: '95.6', unit: '%', status: 'Normal', statusType: 'normal', icon: 'water-outline', gaugeVal: 30 },
    { id: '5', title: 'Temp', value: '34.8', unit: '°C', status: 'Normal', statusType: 'normal', icon: 'thermometer-outline', gaugeVal: 60 },
    { id: '6', title: 'Sleep', value: '4h 42m', unit: '', status: 'Lower', statusType: 'low-orange', icon: 'bed-outline', gaugeVal: 80 },
];

export const TIMELINE_EVENTS = [
    { id: '1', title: 'Carbonara', time: '11/09/25 at 8.16 PM', emoji: '🍝', score: 39, scoreType: 'blue' },
    { id: '2', title: 'Nap', time: '11/09/25 at 4.40 PM', emoji: '🌙' },
    { id: '3', title: 'Yogurt', time: '11/09/25 at 4.28 PM', emoji: '🍦', score: 61, scoreType: 'blue' },
    { id: '4', title: 'Avocado Toast with Fried Egg', time: '11/09/25 at 1.46 PM', emoji: '🥑', score: 88, scoreType: 'purple' },
    { id: '5', title: 'Chicken Satay', time: '11/09/25 at 12.15 PM', emoji: '🍗', score: 54, scoreType: 'blue' },
    { id: '6', title: 'Primary sleep', time: '10/09/25 at 11.33 PM', emoji: '💤', score: 52, scoreType: 'blue' },
];


export interface ActivityStatus {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    bgColor: string;
    iconColor: string;
}

export const ACTIVITY_STATUSES: ActivityStatus[] = [
    { id: 'active', title: 'Active', subtitle: 'Staying engaged and healthy', icon: 'walk', bgColor: 'bg-emerald-400', iconColor: 'white' },
    { id: 'sick', title: 'Sick', subtitle: 'Resting from illness', icon: 'bed', bgColor: 'bg-yellow-400', iconColor: 'white' },
    { id: 'injured', title: 'Injured', subtitle: 'Recovering from an injury', icon: 'bandage', bgColor: 'bg-red-400', iconColor: 'white' },
    { id: 'break', title: 'On A Break', subtitle: 'Taking time off from training', icon: 'umbrella', bgColor: 'bg-blue-400', iconColor: 'white' },
];

export const STATUS_DURATIONS = ['Until changed', 'Until tomorrow', '7 days', '14 days', 'Custom'];

export const LIBRARY = [
    {
        letter: 'A', items: [
            { id: '100', name: 'Arm Circles', type: 'Bodyweight', sets: 0, icon: '🧍' },
            { id: '101', name: 'Arnold Press', type: 'Dumbbell (Double)', sets: 0, icon: '🏋️' }
        ]
    },
    { letter: 'C', items: [{ id: '10', name: 'Crossing Balance Lunge', type: 'TRX', sets: 0, icon: '🤸' }] },
    { letter: 'L', items: [{ id: '12', name: 'Lunge', type: 'Bodyweight', sets: 0, icon: '🦵' }] }
];

export const HR_ZONES = [
    { zone: 0, duration: '00:00:00', range: '0 - 94 bpm', color: 'bg-gray-300' },
    { zone: 1, duration: '00:08:30', range: '95 - 114 bpm', color: 'bg-blue-500' },
    { zone: 2, duration: '00:16:43', range: '115 - 132 bpm', color: 'bg-yellow-400' },
    { zone: 3, duration: '00:19:38', range: '133 - 151 bpm', color: 'bg-orange-500' },
    { zone: 4, duration: '00:20:43', range: '152 - 170 bpm', color: 'bg-red-500' },
    { zone: 5, duration: '00:13:21', range: '171 - 189 bpm', color: 'bg-purple-500' },
];

export const STRAIN_TRENDS = [
    { id: '1', title: 'Strain Score', value: '72', unit: '%', status: 'Above normal', isPositive: true },
    { id: '2', title: 'Exercise Duration', value: '1h 19m', unit: '', status: 'Above normal', isPositive: true },
    { id: '3', title: 'Daytime HR', value: '105', unit: 'bpm', status: 'Normal range', isPositive: true },
    { id: '4', title: 'Total Energy', value: '1,946', unit: 'kCal', status: 'Normal range', isPositive: true },
];

export const STRAIN_ANALYSIS = [
    { period: '3-day', change: '-9%', trend: 'down' },
    { period: '7-day', change: '-23%', trend: 'down' },
    { period: '14-day', change: '-19%', trend: 'down' },
    { period: '30-day', change: '-14%', trend: 'up' },
    { period: '90-day', change: '-5%', trend: 'up' },
];



// --- RECOVERY DATA ---
export const RECOVERY_METRICS = [
    { id: '1', title: 'Recovery Score', value: '61', unit: '%', status: 'Normal range', statusType: 'normal' },
    { id: '2', title: 'Resting HRV', value: '64.2', unit: 'ms', status: 'Normal range', statusType: 'normal' },
    { id: '3', title: 'Resting HR', value: '58.9', unit: 'bpm', status: 'Normal range', statusType: 'normal' },
    { id: '4', title: 'Respiratory Rate', value: '15.7', unit: 'rpm', status: 'Normal range', statusType: 'normal' },
    { id: '5', title: 'Oxygen Saturation', value: '95.4', unit: '%', status: 'Below normal', statusType: 'warning' },
    { id: '6', title: 'Wrist Temperature', value: '35.2', unit: '°C', status: 'Normal range', statusType: 'normal' },
];

// --- SLEEP DATA ---
export const SLEEP_TRENDS = [
    { id: '1', title: 'Sleep Score', value: '67', unit: '%', status: 'Normal range', icon: 'moon' },
    { id: '2', title: 'Time Asleep', value: '6h 26m', unit: '', status: 'Normal range', icon: 'time' },
    { id: '3', title: 'REM sleep', value: '1h 28m', unit: '', status: 'Normal range', icon: 'moon' },
    { id: '4', title: 'Deep Sleep', value: '50m', unit: '', status: 'Normal range', icon: 'moon' },
    { id: '5', title: 'Heart Rate Dip', value: '38', unit: '%', status: 'Normal range', icon: 'heart' },
    { id: '6', title: 'Sleep Bank', value: '-3h 9m', unit: '', status: 'Debt', statusType: 'warning', icon: 'business' },
    { id: '7', title: 'Sleep Time', value: '1.01 AM', unit: '', status: 'Later than normal', statusType: 'warning', icon: 'time' },
    { id: '8', title: 'Wake Time', value: '7.34 AM', unit: '', status: 'Normal', icon: 'time' },
    { id: '9', title: 'Time To Fall Asleep', value: '7m', unit: '', status: 'Normal range', icon: 'time' },
];

export const SLEEP_STAGES = [
    { name: 'Awake', duration: '0:06:30', pct: '2%' },
    { name: 'REM', duration: '1:28:00', pct: '22%' },
    { name: 'Core', duration: '4:07:30', pct: '63%' },
    { name: 'Deep', duration: '0:50:30', pct: '13%' },
];
export const SLEEP_ANALYSIS = [
    { period: '3-day', change: '-9%', trend: 'down' },
    { period: '7-day', change: '-22%', trend: 'down' },
    { period: '14-day', change: '-21%', trend: 'down' },
    { period: '30-day', change: '-18%', trend: 'down' },
    { period: '90-day', change: '-7%', trend: 'down' },
];

export const TIME_ASLEEP_ANALYSIS = [
    { period: '3-day', change: '-6m', trend: 'down' },
    { period: '7-day', change: '-58m', trend: 'down' },
    { period: '14-day', change: '-54m', trend: 'down' },
    { period: '30-day', change: '-45m', trend: 'down' },
    { period: '90-day', change: '-13m', trend: 'down' },
];


export const STRESS_BREAKDOWN = [
    { id: 'high', label: 'High', color: '#EF4444', pct: 5, time: '0:54:00', bg: 'bg-red-100', bar: 'bg-red-500' },
    { id: 'med', label: 'Med', color: '#FACC15', pct: 36, time: '6:42:00', bg: 'bg-yellow-100', bar: 'bg-yellow-400' },
    { id: 'low', label: 'Low', color: '#34D399', pct: 59, time: '11:00:00', bg: 'bg-emerald-100', bar: 'bg-emerald-400' },
];

export const STRESS_TRENDS = [
    { id: '1', title: 'Stress Score', value: '27', status: 'Normal range' },
    { id: '2', title: 'Non-Activity Stress', value: '35', status: 'Normal range' },
    { id: '3', title: 'Sleep Stress', value: '15', status: 'Normal range' },
];


export const CAFFEINE_EXAMPLES = [
    { name: 'Affogato', amount: '64 mg' },
    { name: 'Americano', amount: '75 mg' },
    { name: 'Black coffee', amount: '95 mg' },
    { name: 'Cafe au lait', amount: '130 mg' },
    { name: 'Caffe latte', amount: '64 mg' },
    { name: 'Cappuccino', amount: '75 mg' },
    { name: 'Cold brew', amount: '100 mg' },
    { name: 'Decaf coffee', amount: '3 mg' },
    { name: 'Espresso', amount: '64 mg' },
    { name: 'Frappe', amount: '65 mg' },
    { name: 'Flat white', amount: '130 mg' },
    { name: 'Macchiato', amount: '75 mg' },
    { name: 'Mocha', amount: '90 mg' },
];

export const JOURNAL_AUTO = [
    { id: '1', title: '10.000+ steps', value: '2.820 steps', icon: 'walk', color: '#9CA3AF', isComplete: false },
    { id: '2', title: '20+ mins of cardio', value: '0 mins', icon: 'bicycle', color: '#F59E0B', isComplete: false },
    { id: '3', title: '20+ mins of daylight', value: '', icon: 'sunny', color: '#FBBF24', isComplete: false, isSkipped: true },
    { id: '4', title: '20+ mins of strength', value: '0 mins', icon: 'barbell', color: '#4B5563', isComplete: false },
    { id: '5', title: '30+ mins of zone 2', value: '0 mins', icon: 'flame', color: '#EA580C', isComplete: false },
    { id: '6', title: '50+ dB sleeping noise', value: '', icon: 'volume-high', color: '#374151', isComplete: false, isSkipped: true },
    { id: '7', title: '50+ stress score', value: '', icon: 'pulse', color: '#EF4444', isComplete: true, isNegative: true },
    { id: '8', title: '67+ nutrition score', value: '', icon: 'nutrition', color: '#DC2626', isComplete: true },
];

export const MOOD_DESCRIPTORS_POSITIVE = ['Amazed', 'Amused', 'Brave', 'Calm', 'Confident', 'Content', 'Excited', 'Grateful', 'Happy', 'Hopeful', 'Joyful', 'Passionate', 'Peaceful', 'Proud', 'Relieved', 'Satisfied', 'Surprised'];
export const MOOD_DESCRIPTORS_NEGATIVE = ['Angry', 'Anxious', 'Bored', 'Disappointed', 'Frustrated', 'Sad', 'Stressed', 'Tired'];

export const MOOD_CAUSES = [
    { id: '1', label: 'Community', icon: 'people' },
    { id: '2', label: 'Current Events', icon: 'newspaper' },
    { id: '3', label: 'Dating', icon: 'heart-half' },
    { id: '4', label: 'Education', icon: 'school' },
    { id: '5', label: 'Family', icon: 'home' },
    { id: '6', label: 'Fitness', icon: 'walk' },
    { id: '7', label: 'Friends', icon: 'people-circle' },
    { id: '8', label: 'Health', icon: 'fitness' },
    { id: '9', label: 'Hobbies', icon: 'construct' },
    { id: '10', label: 'Identity', icon: 'body' },
    { id: '11', label: 'Money', icon: 'cash' },
    { id: '12', label: 'Partner', icon: 'heart' },
];

export const INSIGHTS_LOCKED_TAGS = [
    { id: '1', label: 'Hydration', icon: 'water', noCount: 1, yesCount: 6 },
    { id: '2', label: 'Caffeine', icon: 'cafe', noCount: 0, yesCount: 7 },
    { id: '3', label: 'Alcohol', icon: 'wine', noCount: 6, yesCount: 0 },
    { id: '4', label: 'Device in bed', icon: 'phone-portrait', noCount: 0, yesCount: 6 },
    { id: '5', label: 'Reading in bed', icon: 'book', noCount: 0, yesCount: 6 },
];

export const CUSTOMIZE_LIFESTYLE = [
    { id: '1', label: 'Alcohol', desc: 'Had any alcohol?', icon: 'wine', emoji: '🍷', active: true, category: 'Lifestyle' },
    { id: '2', label: 'Caffeine', desc: 'Have any caffeine?', icon: 'cafe', emoji: '☕', active: true, category: 'Lifestyle' },
    { id: '3', label: 'CBD', desc: 'Used CBD in any form?', icon: 'leaf', emoji: '🌿', active: false, category: 'Lifestyle' },
    { id: '4', label: 'Device in bed', desc: 'Used a device in bed?', icon: 'phone-portrait', emoji: '📱', active: true, logTime: 'Nighttime', category: 'Lifestyle' },
    { id: '5', label: 'Marijuana', desc: 'Used marijuana?', icon: 'leaf', emoji: '🍃', active: false, category: 'Lifestyle' },
    { id: '6', label: 'Masturbation', desc: 'Engaged in masturbation?', icon: 'hand-left', emoji: '✋', active: false, category: 'Lifestyle' },
    { id: '7', label: 'Reading in bed', desc: 'Read a book in bed?', icon: 'book', emoji: '📖', active: true, isPinned: true, category: 'Lifestyle' },
    { id: '8', label: 'Sexual activity', desc: 'Engaged in sexual activity?', icon: 'heart', emoji: '❣️', active: true, category: 'Lifestyle' },
    { id: '9', label: 'Tobacco', desc: 'Used tobacco in any form?', icon: 'flame', emoji: '🔥', active: false, category: 'Lifestyle' },
    { id: 'sugar', label: 'Added sugar', desc: 'Consumed added sugar?', icon: 'nutrition', emoji: '🍬', active: true, category: 'Lifestyle' },
    { id: 'keto', label: 'Keto diet', desc: 'Followed keto diet?', icon: 'nutrition', emoji: '🥑', active: true, category: 'Lifestyle' },
    { id: 'late_meal', label: 'Late meal', desc: 'Had a late meal?', icon: 'restaurant', emoji: '🍽️', active: true, logTime: 'Nighttime', category: 'Lifestyle' },
    { id: 'mood', label: 'Daily mood', desc: 'How do you feel today?', icon: 'happy', emoji: '😀', active: true, category: 'Health Status' },
    { id: 'hydration', label: 'Hydration', desc: 'Track your water intake', icon: 'water', emoji: '💧', active: true, category: 'Lifestyle' },
];


export const STRENGTH_PROGRESSION = [
    { id: '1', name: 'Arm Circles', type: 'Bodyweight', sessions: 6 },
    { id: '2', name: 'Back Squat', type: 'Barbell', sessions: 6 },
    { id: '3', name: 'Bench Press', type: 'Dumbbell (Double)', sessions: 6 },
];

export const WORKOUT_TEMPLATES_FITNESS = [
    { id: '1', title: 'Leg Day Strength Bu...', exercises: 7, sets: 19, load: [4, 4, 7, 5] },
    { id: '2', title: 'Arm Strength Builder', exercises: 7, sets: 20, load: [2, 1, 0, 9] },
    { id: '3', title: 'Full Body Workout c...', exercises: 10, sets: 25, load: [2, 2, 8, 3] },
];

export const ACTIVITY_HISTORY = [
    { id: '1', title: 'Strength Training', time: '14/09/25 at 7.46 PM', score: 55, icon: 'barbell', color: '#F59E0B' },
    { id: '2', title: 'Strength Training', time: '14/09/25 at 7.40 PM', score: 0, icon: 'barbell', color: '#F59E0B' },
    { id: '3', title: 'Indoor Walk', time: '14/09/25 at 3.38 PM', score: 0, icon: 'walk', color: '#F59E0B' },
    { id: '4', title: 'Indoor Walk', time: '14/09/25 at 8.22 AM', score: 31, icon: 'walk', color: '#F59E0B' },
    { id: '5', title: 'Cooldown', time: '14/09/25 at 8.05 AM', score: 4, icon: 'body', color: '#F59E0B' },
    { id: '6', title: 'Indoor Walk', time: '13/09/25 at 9.45 AM', score: 23, icon: 'walk', color: '#F59E0B' },
];

export const FILTER_METRICS = [
    { id: 'duration', label: 'Active Duration', icon: 'time-outline' },
    { id: 'distance', label: 'Distance', icon: 'location-outline' },
    { id: 'elevation', label: 'Elevation', icon: 'triangle-outline' },
];

export const FILTER_TYPES = [
    { id: 'all', label: 'All activities', icon: 'list' },
    { id: 'cooldown', label: 'Cooldown', icon: 'body' },
    { id: 'indoor_walk', label: 'Indoor Walk', icon: 'walk' },
    { id: 'mixed_cardio', label: 'Mixed Cardio', icon: 'accessibility' },
    { id: 'outdoor_walk', label: 'Outdoor Walk', icon: 'walk' },
];


export const VO2_MAX_RANGES = [
    { id: '1', label: 'Superior', range: '>41.3', color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: '2', label: 'Excellent', range: '36.1 - 41.3', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: '3', label: 'Good', range: '30.2 - 36.0', color: 'text-green-500', bg: 'bg-green-50' },
    { id: '4', label: 'Fair', range: '25.3 - 30.1', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: '5', label: 'Poor', range: '<25.3', color: 'text-red-500', bg: 'bg-red-50' },
];

export const WEIGHT_TRENDS_ANALYSIS = [
    { period: '3-day', change: '-0.7 kg', trend: 'down', icon: 'arrow-down' },
    { period: '7-day', change: '-1.0 kg', trend: 'down', icon: 'arrow-down' },
    { period: '14-day', change: '-1.0 kg', trend: 'down', icon: 'arrow-down' },
    { period: '30-day', change: '-1.0 kg', trend: 'down', icon: 'arrow-down' },
    { period: '90-day', change: '—', trend: 'flat', icon: 'remove-circle' },
];


const SETTINGS_GENERAL = [
    { id: 'account', label: 'Account', icon: 'person', color: '#38BDF8', route: '/settings/account' },
    { id: 'appearance', label: 'Appearance', icon: 'contrast', color: '#818CF8', route: '/settings/appearance' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', color: '#F87171', route: '/settings/notifications' }, // <-- UPDATED
    { id: 'customization', label: 'Customization', icon: 'settings', color: '#FBBF24', route: '/settings/customization' }, // <-- UPDATED
    { id: 'shortcuts', label: 'Shortcuts', icon: 'layers', color: '#FBBF24', route: null },
    { id: 'language', label: 'Language', icon: 'globe', color: '#34D399', route: null },
];

export const DATA_METRICS = [
    { id: 'active_energy', label: 'Active Energy', sources: 3 },
    { id: 'heart_rate', label: 'Heart Rate', sources: 1 },
    { id: 'hrv', label: 'Heart Rate Variability', sources: 1 },
    { id: 'nutrition', label: 'Nutrition', sources: 1 },
    { id: 'resting_energy', label: 'Resting Energy', sources: 3 },
    { id: 'rhr', label: 'Resting Heart Rate', sources: 1 },
    { id: 'sleep', label: 'Sleep', sources: 3 },
    { id: 'steps', label: 'Steps', sources: 2 },
    { id: 'workout', label: 'Workout', sources: 2 },
    { id: 'vo2_max', label: 'VO₂ Max', sources: 1 },
];

export const MOCK_SOURCES = [
    { id: '1', name: "Apple Watch", sub: "Apple Watch SE (40mm) • 14/09/25", icon: 'watch', isHidden: false },
    { id: '2', name: "Bevel", sub: "iPhone 15 • 14/09/25", icon: 'phone-portrait', isHidden: false },
    { id: '3', name: "iPhone", sub: "iPhone 15 • 08/03/25", icon: 'phone-portrait', isHidden: true },
];