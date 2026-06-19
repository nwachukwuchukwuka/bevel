import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddContributorSheet, AddContributorSheetRef } from './AddContributorSheet';
import { NutrientSetupSheet, NutrientSetupSheetRef } from './NutrientSetupSheet';

export type NutrientDetailSheetRef = BottomSheetModal;

interface Props {
    nutrient: {
        label: string;
        icon: string;
        value: string;
        target: string;
        color: string;
        unit: string;
    } | null;
    onOpenSettings: () => void;
}

export const NutrientDetailSheet = forwardRef<NutrientDetailSheetRef, Props>(({ nutrient, onOpenSettings }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['92%'], []);
    const addSheetRef = useRef<AddContributorSheetRef>(null);
    const setupSheetRef = useRef<NutrientSetupSheetRef>(null);
    const [entries, setEntries] = useState<any[]>([]);
    const [showSyncedToast, setShowSyncedToast] = useState(false);

    // Local state for editable settings
    const [goalTarget, setGoalTarget] = useState(nutrient?.target || '300');
    const [quickAddAmount, setQuickAddAmount] = useState(nutrient?.value || '50');
    const [trackingIntent, setTrackingIntent] = useState<'Target' | 'Limit' | 'None'>('Target');

    // Sync state when nutrient changes
    React.useEffect(() => {
        if (nutrient) {
            setGoalTarget(nutrient.target);
            setQuickAddAmount(nutrient.value);
            if (['Cholesterol', 'Added Sugars', 'Limit Nutrients'].some(n => nutrient.label.includes(n))) {
                setTrackingIntent('Limit');
            } else {
                setTrackingIntent('Target');
            }
        }
    }, [nutrient]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const handleAddQuick = () => {
        if (!nutrient) return;
        const amount = parseInt(quickAddAmount) || 50;
        handleAddEntry(amount, '12.31 PM');
    };

    const handleAddCustom = () => {
        addSheetRef.current?.present();
    };

    const handleAddEntry = (amount: number, time: string) => {
        setEntries([{ amount, time }, ...entries]);
        setShowSyncedToast(true);
        setTimeout(() => setShowSyncedToast(false), 3000);
    };

    const handleOpenSetup = () => {
        setupSheetRef.current?.present();
    };

    const handleSaveSetup = (data: { target: string; quickAdd: string; intent: 'Target' | 'Limit' | 'None' }) => {
        setGoalTarget(data.target);
        setQuickAddAmount(data.quickAdd);
        setTrackingIntent(data.intent);
    };

    if (!nutrient) return null;

    const currentAmount = entries.reduce((sum, e) => sum + e.amount, 0);
    const targetVal = parseFloat(goalTarget.replace(',', '.')) || 300;
    const progress = Math.min(100, Math.round((currentAmount / targetVal) * 100));

    const isLimit = trackingIntent === 'Limit';
    const leftAmount = Math.abs(targetVal - currentAmount).toFixed(1).replace('.', ',');
    const leftText = currentAmount > targetVal
        ? `${leftAmount}${nutrient.unit} over`
        : `${leftAmount}${nutrient.unit} left`;

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
            stackBehavior='push'
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Sync Toast */}
                {showSyncedToast && (
                    <View className="absolute top-4 left-0 right-0 z-50 items-center px-6">
                        <View className="bg-[#15233A] flex-row items-center gap-3 px-4 py-3 rounded-[16px] border border-[#4DB9F2]/30 w-full shadow-md shadow-[#4DB9F2]/10">
                            <View className="w-8 h-8 rounded-[10px] bg-[#0F172A] border border-[#4DB9F2] items-center justify-center">
                                <Ionicons name="checkmark" size={16} color="#4DB9F2" />
                            </View>
                            <Text className="text-[#F1F5F9] text-[14px]">Synced at 11.11 AM on 14/09/25</Text>
                        </View>
                    </View>
                )}

                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                        <Ionicons name="close" size={20} color="#F1F5F9" />
                    </TouchableOpacity>
                    <Text className="text-[18px] text-[#F1F5F9] font-bold">{nutrient.label}</Text>
                    <TouchableOpacity
                        onPress={handleOpenSetup}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={18} color="#F1F5F9" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">
                    {/* Progress Area */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-6 mb-8">
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-[14px] text-[#64748B] font-medium">{currentAmount}/{goalTarget}{nutrient.unit}</Text>
                            <Text className="text-[14px] text-[#64748B] font-medium">{progress}%</Text>
                        </View>

                        <View className="flex-row items-baseline gap-1.5 mb-6">
                            <Text className="text-[40px] text-[#F1F5F9] font-bold">
                                {leftAmount}
                            </Text>
                            <Text className="text-[#94A3B8] text-[15px]">{nutrient.unit} {currentAmount > targetVal ? 'over' : 'left'}</Text>
                        </View>

                        <View className="w-full h-4 bg-[#0F172A] rounded-full overflow-hidden border border-[#1E2D4A] mb-3">
                            <View
                                className="h-full rounded-full"
                                style={{ width: `${progress}%`, backgroundColor: isLimit ? (currentAmount > targetVal ? '#F87171' : '#34D399') : nutrient.color }}
                            />
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-[12px] text-[#64748B]">0</Text>
                            <Text className="text-[12px] text-[#64748B]">{goalTarget}</Text>
                        </View>
                    </View>

                    {/* Today's Entries */}
                    <View className="mb-8">
                        <Text className="text-[18px] text-[#F1F5F9] mb-2 font-bold">Today's Entries</Text>
                        <Text className="text-[14px] text-[#64748B] leading-5 mb-6">
                            Entries that contributed to your <Text className="text-[#94A3B8]">{nutrient.label}</Text> goal. Detected by nutrition and manual log.
                        </Text>

                        {/* Contribution List */}
                        <View className="gap-4">
                            {entries.map((item, index) => (
                                <View key={index} className="flex-row items-center justify-between bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-4">
                                    <View className="flex-row items-center gap-4">
                                        <View className="w-12 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[14px] items-center justify-center">
                                            <Text className="text-[24px]">🫙</Text>
                                        </View>
                                        <View>
                                            <Text className="text-[15px] text-[#F1F5F9]">{nutrient.label}</Text>
                                            <Text className="text-[13px] text-[#64748B]">{item.time}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-3">
                                        <Text className="text-[15px] text-[#4DB9F2]">+{item.amount}{nutrient.unit}</Text>
                                        <View className="w-8 h-8 rounded-[10px] bg-[#0F172A] items-center justify-center border border-[#1E2D4A]">
                                            <Ionicons name="arrow-forward" size={14} color="#64748B" />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Buttons */}
                <View className="px-6 pt-4 pb-6 flex-row gap-4">
                    <TouchableOpacity
                        onPress={handleAddQuick}
                        className="flex-1 bg-[#4DB9F2] h-[56px] rounded-[16px] flex-row items-center justify-center gap-2"
                    >
                        <Ionicons name="add" size={20} color="#090D16" />
                        <Text className="text-[#090D16] text-[15px] font-medium">Add {quickAddAmount}{nutrient.unit}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleAddCustom}
                        className="flex-1 bg-[#151E33] border border-[#1E2D4A] h-[56px] rounded-[16px] flex-row items-center justify-center gap-2"
                    >
                        <Ionicons name="create-outline" size={20} color="#F1F5F9" />
                        <Text className="text-[#F1F5F9] text-[15px] font-medium">Add custom</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>

            <AddContributorSheet
                ref={addSheetRef}
                title={nutrient.label}
                unit={nutrient.unit}
                onAdd={handleAddEntry}
                onEditGoal={handleOpenSetup}
            />

            <NutrientSetupSheet
                ref={setupSheetRef}
                nutrient={{
                    label: nutrient.label,
                    target: goalTarget,
                    unit: nutrient.unit,
                    quickAdd: quickAddAmount,
                    intent: trackingIntent
                }}
                onSave={handleSaveSetup}
            />
        </BottomSheetModal>
    );
});
