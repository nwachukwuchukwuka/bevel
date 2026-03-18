import { MacroDetailSheet, MacroDetailSheetRef } from '@/components/nutrition/MacroDetailSheet';
import { NutrientDetailSheet, NutrientDetailSheetRef } from '@/components/nutrition/NutrientDetailSheet';
import { NutritionGoalSummarySheet, NutritionGoalSummarySheetRef } from '@/components/nutrition/NutritionGoalSummarySheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionalGoalsScreen() {
    const router = useRouter();

    // Mock states to show empty vs filled UI based on user flow
    const [hasMacroGoals, setHasMacroGoals] = useState(false);
    const [hasTargetGoals, setHasTargetGoals] = useState(false);

    // Refs for Bottom Sheets
    const macroDetailSheetRef = useRef<MacroDetailSheetRef>(null);
    const nutrientDetailSheetRef = useRef<NutrientDetailSheetRef>(null);
    const summarySheetRef = useRef<NutritionGoalSummarySheetRef>(null);

    const [selectedMacro, setSelectedMacro] = useState<any>(null);
    const [selectedNutrient, setSelectedNutrient] = useState<any>(null);

    const handleMacroPress = (label: string, value: string, target: string, color: string, pct: number) => {
        setSelectedMacro({ label, value, target, color, pct });
        macroDetailSheetRef.current?.present();
    };

    const handleNutrientPress = (label: string, value: string, target: string, color: string, unit: string) => {
        setSelectedNutrient({ label, value, target, color, unit });
        nutrientDetailSheetRef.current?.present();
    };

    const handleOpenSummary = () => {
        summarySheetRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="list" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="font-semibold text-gray-700 text-[15px]">Nutritional Goals</Text>
                    <TouchableOpacity
                        onPress={() => summarySheetRef.current?.present()}
                        className="w-8 h-8 bg-white rounded-lg items-center justify-center"
                        style={styles.shadow}
                    >
                        <Ionicons name="settings-sharp" size={16} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    {/* Hero Chart Area */}
                    <View className="px-5 mb-8">
                        <Text className="text-4xl font-bold text-gray-900 mb-1">
                            {hasMacroGoals ? '1.057 kcal' : '0 kcal'}
                        </Text>
                        <Text className="text-gray-500 font-medium text-sm mb-4">14 Sep 2025</Text>

                        {/* Macro Tabs */}
                        <View className="flex-row gap-2 mb-8">
                            {['Calories', 'Fat', 'Carbs', 'Protein'].map((tab, i) => (
                                <View key={tab} className={`px-4 py-1.5 rounded-full ${i === 0 ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}>
                                    <Text className={`font-semibold text-[13px] ${i === 0 ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Mock Bar Chart */}
                        <View className="h-40 border-b border-gray-200 flex-row items-end justify-between px-2 pb-0 mb-4 relative">
                            {/* Target Line */}
                            <View className="absolute top-1/2 w-full border-t border-dashed border-indigo-400 z-0" />
                            <Text className="absolute top-[42%] right-0 text-[10px] text-indigo-400 font-bold">1.892 kcal</Text>

                            {/* Bars */}
                            {[20, 60, 10, 40, 0].map((h, i) => (
                                <View key={i} className="w-8 bg-indigo-300 rounded-t-sm z-10" style={{ height: `${hasMacroGoals ? h : 5}%`, opacity: h === 0 ? 0 : 1 }} />
                            ))}
                        </View>

                        {/* Date Scroller */}
                        <View className="flex-row items-center justify-between bg-white rounded-full px-4 py-3" style={styles.shadow}>
                            <Ionicons name="chevron-back" size={18} color="#9CA3AF" />
                            <Text className="font-bold text-gray-700 text-sm">15 Aug - 14 Sep 2025</Text>
                            <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                        </View>
                    </View>

                    {/* Cards Container */}
                    <View className="px-5 gap-6">

                        {/* 1. Macronutrient Goals Card */}
                        <View>
                            <Text className="font-bold text-gray-900 text-base mb-3">Macronutrient Goals</Text>
                            <View className="bg-white rounded-[24px] p-6 items-center" style={styles.shadow}>
                                {hasMacroGoals ? (
                                    <View className="flex-row w-full justify-between items-center py-2">
                                        <MacroArc
                                            value="4g" label="Fat" color="#60A5FA" pct={20}
                                            onPress={() => handleMacroPress('Fat', '4g', '63,1', '#60A5FA', 20)}
                                        />
                                        <MacroArc
                                            value="70g" label="Carbs" color="#FBBF24" pct={60}
                                            onPress={() => handleMacroPress('Carbs', '70g', '189,2', '#FBBF24', 60)}
                                        />
                                        <MacroArc
                                            value="97g" label="Protein" color="#F472B6" pct={80}
                                            onPress={() => handleMacroPress('Protein', '97g', '141,9', '#F472B6', 80)}
                                        />
                                    </View>
                                ) : (
                                    <>
                                        <View className="w-16 h-16 rounded-full border-[6px] border-indigo-100 items-center justify-center mb-4 relative">
                                            <View className="absolute inset-0 border-[6px] border-orange-400 rounded-full border-b-transparent border-l-transparent -rotate-45" />
                                            <View className="absolute inset-0 border-[6px] border-pink-400 rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-45" />
                                        </View>
                                        <Text className="font-bold text-gray-900 text-[15px] mb-1">Track your calories & macros</Text>
                                        <Text className="text-gray-500 text-center text-[13px] leading-5 mb-6 px-4">Set daily goals for your calories, carbs, protein, and fat.</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setHasMacroGoals(true); // Simulate saving
                                                router.push('/nutrition/goals/macro-setup');
                                            }}
                                            className="w-full py-3.5 rounded-xl border border-gray-200 items-center"
                                        >
                                            <Text className="font-bold text-gray-700">+ Set goals</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>

                        <View>
                            <View className="flex-row justify-between items-end mb-3">
                                <View>
                                    <Text className="font-bold text-gray-900 text-base">Target Nutrients</Text>
                                    <Text className="text-gray-500 text-xs font-semibold">Aim to meet or exceed</Text>
                                </View>
                                {hasTargetGoals && (
                                    <TouchableOpacity onPress={() => router.push('/nutrition/goals/nutrient-setup')}>
                                        <Ionicons name="settings-sharp" size={18} color="#4B5563" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View className="bg-white rounded-[24px] p-6 items-center" style={styles.shadow}>
                                {hasTargetGoals ? (
                                    <View className="flex-row flex-wrap justify-between w-full gap-y-4">
                                        <NutrientProgressCard
                                            title="Added Sugars" val="20g left" pct="0%" color="#F97316" progress={10}
                                            onPress={() => handleNutrientPress('Added Sugars', '20g', '25', '#F97316', 'g')}
                                        />
                                        <NutrientProgressCard
                                            title="Cholesterol" val="300mg left" pct="0%" color="#F59E0B" progress={0}
                                            onPress={() => handleNutrientPress('Cholesterol', '50mg', '300', '#F59E0B', 'mg')}
                                        />
                                        <NutrientProgressCard
                                            title="Fiber" val="28g left" pct="0%" color="#22C55E" progress={0}
                                            onPress={() => handleNutrientPress('Fiber', '0g', '28', '#22C55E', 'g')}
                                        />
                                    </View>
                                ) : (
                                    <>
                                        {/* Mock background lines */}
                                        <View className="w-full flex-row justify-between opacity-20 mb-4 absolute top-6 px-6">
                                            <View className="w-[45%] h-12 border border-gray-300 rounded-xl" />
                                            <View className="w-[45%] h-12 border border-gray-300 rounded-xl" />
                                        </View>
                                        <Text className="font-bold text-gray-700 mb-4 mt-6 z-10">No Target Goals</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setHasTargetGoals(true);
                                                router.push('/nutrition/goals/nutrient-setup');
                                            }}
                                            className="bg-[#1A1A1A] px-6 py-3 rounded-full z-10"
                                            style={styles.shadow}
                                        >
                                            <Text className="text-white font-bold">+ Add goals</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>

                        {/* 3. Limit Nutrients Card */}
                        <View>
                            <View className="flex-row justify-between items-end mb-3">
                                <View>
                                    <Text className="font-bold text-gray-900 text-base">Limit Nutrients</Text>
                                    <Text className="text-gray-500 text-xs font-semibold">Aim to stay near or below</Text>
                                </View>
                                {hasTargetGoals && (
                                    <TouchableOpacity onPress={() => router.push('/nutrition/goals/nutrient-setup')}>
                                        <Ionicons name="settings-sharp" size={18} color="#4B5563" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View className="bg-white rounded-[24px] p-6 items-center" style={styles.shadow}>
                                {hasTargetGoals ? (
                                    <View className="flex-row flex-wrap justify-between w-full gap-y-4">
                                        <NutrientProgressCard
                                            title="Chromium" val="35µg left" pct="0%" color="#84CC16" progress={0}
                                            onPress={() => handleNutrientPress('Chromium', '0µg', '35', '#84CC16', 'µg')}
                                        />
                                        <NutrientProgressCard
                                            title="Copper" val="0,9mg left" pct="0%" color="#84CC16" progress={0}
                                            onPress={() => handleNutrientPress('Copper', '0mg', '0.9', '#84CC16', 'mg')}
                                        />
                                        <NutrientProgressCard
                                            title="Folate" val="400µg left" pct="0%" color="#84CC16" progress={0}
                                            onPress={() => handleNutrientPress('Folate', '0µg', '400', '#84CC16', 'µg')}
                                        />
                                    </View>
                                ) : (
                                    <>
                                        <Text className="font-bold text-gray-700 mb-4 mt-2">No Limit Goals</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setHasTargetGoals(true);
                                                router.push('/nutrition/goals/nutrient-setup');
                                            }}
                                            className="bg-[#1A1A1A] px-6 py-3 rounded-full"
                                            style={styles.shadow}
                                        >
                                            <Text className="text-white font-bold">+ Add goals</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>

                    </View>
                </ScrollView>

                {/* Detail Sheets */}
                <MacroDetailSheet
                    ref={macroDetailSheetRef}
                    macro={selectedMacro}
                    onOpenSettings={handleOpenSummary}
                />
                <NutrientDetailSheet
                    ref={nutrientDetailSheetRef}
                    nutrient={selectedNutrient}
                    onOpenSettings={handleOpenSummary}
                />
                <NutritionGoalSummarySheet
                    ref={summarySheetRef}
                    onEditGoal={() => router.push('/nutrition/goals/macro-setup')}
                />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

// --- Sub Components ---

const MacroArc = ({ value, label, color, pct, onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="items-center">
        <View className="w-[84px] h-[50px] overflow-hidden relative items-center mb-1">
            {/* Background Arch */}
            <View className="w-[84px] h-[84px] rounded-full border-[8px] border-gray-100 absolute top-0" />
            {/* Active Arch */}
            <View
                className="w-[84px] h-[84px] rounded-full border-[8px] absolute top-0"
                style={{
                    borderColor: color,
                    borderBottomColor: 'transparent',
                    borderRightColor: pct < 50 ? 'transparent' : color,
                    transform: [{ rotate: '-45deg' }]
                }}
            />
            {/* Text Content inside arch */}
            <View className="mt-4 items-center">
                <Text className="font-bold text-gray-900 text-[15px]">{value}</Text>
                <Text className="text-gray-400 text-[10px]">left</Text>
            </View>
        </View>
        <Text style={{ color }} className="font-bold text-xs">{label}</Text>
    </TouchableOpacity>
);

const NutrientProgressCard = ({ title, val, pct, color, progress, onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="w-[48%] border border-gray-100 rounded-xl p-3 bg-gray-50/30">
        <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-gray-800 text-[13px]">{title}</Text>
            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
        </View>
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-2">
            <View className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: color }} />
        </View>
        <View className="flex-row justify-between items-center">
            <Text className="text-gray-500 text-[10px] font-medium">{val}</Text>
            <Text className="text-gray-400 text-[10px]">{pct}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    }
});
