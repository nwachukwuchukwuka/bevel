import { MacroDetailSheet, MacroDetailSheetRef } from '@/components/nutrition/MacroDetailSheet';
import { NutrientDetailSheet, NutrientDetailSheetRef } from '@/components/nutrition/NutrientDetailSheet';
import { NutritionGoalSummarySheet, NutritionGoalSummarySheetRef } from '@/components/nutrition/NutritionGoalSummarySheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionalGoalsScreen() {
    const router = useRouter();

    const [hasMacroGoals, setHasMacroGoals] = useState(false);
    const [hasTargetGoals, setHasTargetGoals] = useState(false);

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
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                <View className="px-5 pb-6 border-b border-[#1E293B] flex-row justify-between items-center bg-[#151E33] pt-4">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-xl font-bold text-slate-100">Nutritional Goals</Text>
                            <Text className="text-xs text-slate-400 mt-1">Daily targets </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => summarySheetRef.current?.present()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="options-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    <View className="bg-[#151E33] border-b border-[#1E293B] p-6 mb-8">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-sm font-semibold text-slate-400">Total Caloric Intake</Text>
                            <View className="bg-[#090D16] border border-[#1E293B] px-3 py-1.5 rounded-lg flex-row items-center gap-1.5">
                                <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                                <Text className="text-xs font-bold text-slate-300">14 Sep 2025</Text>
                            </View>
                        </View>

                        <View className="flex-row items-baseline gap-2 mb-8">
                            <Text className="text-5xl font-bold text-[#4DB9F2]">
                                {hasMacroGoals ? '1.057' : '0'}
                            </Text>
                            <Text className="text-lg font-bold text-slate-500">kcal</Text>
                        </View>

                        <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B] mb-8">
                            {['Calories', 'Fat', 'Carbs', 'Protein'].map((tab, i) => (
                                <View key={tab} className={`flex-1 items-center py-2 rounded-lg border ${i === 0 ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}>
                                    <Text className={`text-xs font-bold ${i === 0 ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>{tab}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="h-32 border-b border-[#1E293B] flex-row items-end justify-between px-2 pb-0 relative">
                            <View className="absolute top-1/2 w-full border-t border-dashed border-[#4DB9F2] opacity-50 z-0" />
                            <Text className="absolute top-[42%] right-0 text-[10px] text-[#4DB9F2] font-bold">1.892 kcal target</Text>

                            {[20, 60, 10, 40, 0].map((h, i) => (
                                <View
                                    key={i}
                                    className="w-8 rounded-t-sm z-10"
                                    style={{
                                        height: `${hasMacroGoals ? h : 5}%`,
                                        opacity: h === 0 ? 0.2 : 1,
                                        backgroundColor: '#4DB9F2'
                                    }}
                                />
                            ))}
                        </View>
                    </View>

                    <View className="px-5 gap-6">

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                            <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                                <Text className="font-bold text-slate-100 text-lg">Macronutrient Goals</Text>
                                <Ionicons name="pie-chart-outline" size={20} color="#4DB9F2" />
                            </View>

                            {hasMacroGoals ? (
                                <View className="flex-col gap-4">
                                    <MacroBar
                                        value="4g" label="Fat" color="#4DB9F2" pct={20} target="63.1g"
                                        onPress={() => handleMacroPress('Fat', '4g', '63,1', '#4DB9F2', 20)}
                                    />
                                    <MacroBar
                                        value="70g" label="Carbs" color="#F59E0B" pct={60} target="189.2g"
                                        onPress={() => handleMacroPress('Carbs', '70g', '189,2', '#F59E0B', 60)}
                                    />
                                    <MacroBar
                                        value="97g" label="Protein" color="#EF4444" pct={80} target="141.9g"
                                        onPress={() => handleMacroPress('Protein', '97g', '141,9', '#EF4444', 80)}
                                    />
                                </View>
                            ) : (
                                <View className="items-center py-4">
                                    <View className="w-16 h-16 rounded-2xl bg-[#1E293B] items-center justify-center border border-[#2D3748] mb-4">
                                        <Ionicons name="add-circle-outline" size={28} color="#94A3B8" />
                                    </View>
                                    <Text className="font-bold text-white text-base mb-1">Track your calories & macros</Text>
                                    <Text className="text-slate-500 text-center text-sm leading-5 mb-6">Set daily goals for your calories, carbs, protein, and fat.</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHasMacroGoals(true);
                                            router.push('/nutrition/goals/macro-setup');
                                        }}
                                        activeOpacity={0.8}
                                        className="bg-[#4DB9F2] w-full py-3.5 rounded-2xl items-center border border-[#4DB9F2]"
                                    >
                                        <Text className="font-bold text-[#090D16]">Establish parameters</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                            <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                                <View>
                                    <Text className="font-bold text-slate-100 text-lg">Target Nutrients</Text>
                                    <Text className="text-emerald-500 text-xs font-semibold mt-1">Aim to meet or exceed</Text>
                                </View>
                                {hasTargetGoals && (
                                    <TouchableOpacity onPress={() => router.push('/nutrition/goals/nutrient-setup')} className="bg-[#1E293B] p-2 rounded-lg border border-[#2D3748]">
                                        <Ionicons name="settings-sharp" size={16} color="#94A3B8" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {hasTargetGoals ? (
                                <View className="flex-col gap-3">
                                    <NutrientProgressRow
                                        title="Added Sugars" val="20g left" pct="0%" color="#F59E0B" progress={10}
                                        onPress={() => handleNutrientPress('Added Sugars', '20g', '25', '#F59E0B', 'g')}
                                    />
                                    <NutrientProgressRow
                                        title="Cholesterol" val="300mg left" pct="0%" color="#4DB9F2" progress={0}
                                        onPress={() => handleNutrientPress('Cholesterol', '50mg', '300', '#4DB9F2', 'mg')}
                                    />
                                    <NutrientProgressRow
                                        title="Fiber" val="28g left" pct="0%" color="#10B981" progress={0}
                                        onPress={() => handleNutrientPress('Fiber', '0g', '28', '#10B981', 'g')}
                                    />
                                </View>
                            ) : (
                                <View className="items-center py-2">
                                    <Text className="font-bold text-slate-400 mb-6 text-sm">No configured targets</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHasTargetGoals(true);
                                            router.push('/nutrition/goals/nutrient-setup');
                                        }}
                                        activeOpacity={0.8}
                                        className="bg-[#1E293B] w-full py-3.5 rounded-2xl items-center border border-[#2D3748]"
                                    >
                                        <Text className="text-white font-bold">Configure targets</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                            <View className="flex-row justify-between items-center mb-6 border-b border-[#1E293B] pb-4">
                                <View>
                                    <Text className="font-bold text-slate-100 text-lg">Limit Nutrients</Text>
                                    <Text className="text-rose-500 text-xs font-semibold mt-1">Aim to stay near or below</Text>
                                </View>
                                {hasTargetGoals && (
                                    <TouchableOpacity onPress={() => router.push('/nutrition/goals/nutrient-setup')} className="bg-[#1E293B] p-2 rounded-lg border border-[#2D3748]">
                                        <Ionicons name="settings-sharp" size={16} color="#94A3B8" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {hasTargetGoals ? (
                                <View className="flex-col gap-3">
                                    <NutrientProgressRow
                                        title="Chromium" val="35µg left" pct="0%" color="#10B981" progress={0}
                                        onPress={() => handleNutrientPress('Chromium', '0µg', '35', '#10B981', 'µg')}
                                    />
                                    <NutrientProgressRow
                                        title="Copper" val="0.9mg left" pct="0%" color="#10B981" progress={0}
                                        onPress={() => handleNutrientPress('Copper', '0mg', '0.9', '#10B981', 'mg')}
                                    />
                                    <NutrientProgressRow
                                        title="Folate" val="400µg left" pct="0%" color="#10B981" progress={0}
                                        onPress={() => handleNutrientPress('Folate', '0µg', '400', '#10B981', 'µg')}
                                    />
                                </View>
                            ) : (
                                <View className="items-center py-2">
                                    <Text className="font-bold text-slate-400 mb-6 text-sm">No configured limits</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHasTargetGoals(true);
                                            router.push('/nutrition/goals/nutrient-setup');
                                        }}
                                        activeOpacity={0.8}
                                        className="bg-[#1E293B] w-full py-3.5 rounded-2xl items-center border border-[#2D3748]"
                                    >
                                        <Text className="text-white font-bold">Configure limits</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                    </View>
                </ScrollView>

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

const MacroBar = ({ value, label, color, pct, target, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-xl">
        <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <Text className="font-bold text-white text-sm">{label}</Text>
            </View>
            <View className="flex-row items-baseline gap-1">
                <Text className="font-bold text-white text-lg">{value}</Text>
                <Text className="text-slate-500 text-[10px] font-medium">/ {target}</Text>
            </View>
        </View>
        <View className="h-1.5 bg-[#1E293B] rounded-full w-full overflow-hidden">
            <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        </View>
    </TouchableOpacity>
);

const NutrientProgressRow = ({ title, val, pct, color, progress, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="bg-[#1E293B40] border border-[#1E293B] rounded-xl p-4 flex-row items-center gap-4">
        <View className="flex-1">
            <Text className="font-bold text-white text-sm mb-2">{title}</Text>
            <View className="h-1.5 bg-[#1E293B] rounded-full w-full">
                <View className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: color }} />
            </View>
        </View>
        <View className="items-end justify-center w-24">
            <Text className="text-slate-300 text-xs font-bold mb-1">{val}</Text>
            <Text className="text-slate-500 text-[10px] font-semibold">{pct} consumed</Text>
        </View>
    </TouchableOpacity>
);