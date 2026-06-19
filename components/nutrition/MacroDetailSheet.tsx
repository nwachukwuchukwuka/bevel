import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddContributorSheet, AddContributorSheetRef } from './AddContributorSheet';

export type MacroDetailSheetRef = BottomSheetModal;

interface Props {
    macro: {
        label: string;
        value: string;
        target: string;
        color: string;
        pct: number;
    } | null;
    onOpenSettings: () => void;
}

export const MacroDetailSheet = forwardRef<MacroDetailSheetRef, Props>(({ macro, onOpenSettings }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['92%'], []);
    const addSheetRef = useRef<AddContributorSheetRef>(null);
    const [contributions, setContributions] = useState<any[]>([]);
    const [showSyncedToast, setShowSyncedToast] = useState(false);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const handleAddCustom = () => {
        addSheetRef.current?.present();
    };

    const handleAddContribution = (amount: number, time: string) => {
        setContributions([{ amount, time }, ...contributions]);
        setShowSyncedToast(true);
        setTimeout(() => setShowSyncedToast(false), 3000);
    };

    if (!macro) return null;

    const currentAmount = contributions.reduce((sum, c) => sum + c.amount, 0);
    const displayValue = parseInt(macro.value) + currentAmount;
    const currentPct = Math.min(100, Math.round((displayValue / parseFloat(macro.target.replace(',', '.'))) * 100));

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
            stackBehavior="push"
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Sync Toast */}
                {showSyncedToast && (
                    <View className="absolute top-4 left-0 right-0 z-50 items-center px-6">
                        <View className="bg-[#15233A] flex-row items-center gap-3 px-4 py-3 rounded-[16px] border border-[#4DB9F2]/30 w-full shadow-md shadow-[#4DB9F2]/10">
                            <View className="w-8 h-8 rounded-[10px] bg-[#0F172A] border border-[#4DB9F2] items-center justify-center">
                                <Ionicons name="checkmark" size={16} color="#4DB9F2" />
                            </View>
                            <Text className="text-[#F1F5F9] font-bold text-[14px]">Synced at 11.11 AM on 14/09/25</Text>
                        </View>
                    </View>
                )}

                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                        <Ionicons name="close" size={20} color="#F1F5F9" />
                    </TouchableOpacity>
                    <Text className="font-bold text-[18px] text-[#F1F5F9]">{macro.label}</Text>
                    <TouchableOpacity
                        onPress={onOpenSettings}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={18} color="#F1F5F9" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">
                    {/* Gauge Area Replacements */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-6 mb-8">
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-[14px] font-bold text-[#64748B]">{displayValue}/{macro.target}g</Text>
                            <Text className="text-[14px] font-bold text-[#64748B]">{currentPct}%</Text>
                        </View>

                        <View className="flex-row items-baseline gap-1.5 mb-6">
                            <Text className="text-[40px] font-bold text-[#F1F5F9]">
                                {(parseFloat(macro.target.replace(',', '.')) - displayValue).toFixed(1).replace('.', ',')}g
                            </Text>
                            <Text className="text-[#94A3B8] font-bold text-[15px]">left</Text>
                        </View>

                        <View className="w-full h-4 bg-[#0F172A] rounded-full overflow-hidden border border-[#1E2D4A] mb-3">
                            <View
                                className="h-full rounded-full"
                                style={{ width: `${currentPct}%`, backgroundColor: macro.color }}
                            />
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-[12px] font-bold text-[#64748B]">0</Text>
                            <Text className="text-[12px] font-bold text-[#64748B]">{macro.target}</Text>
                        </View>
                    </View>

                    {/* Today's Entries */}
                    <View className="mb-8">
                        <Text className="text-[18px] font-bold text-[#F1F5F9] mb-2">Today's Entries</Text>
                        <Text className="text-[14px] text-[#64748B] font-medium leading-5 mb-6">
                            Entries that contributed to your <Text className="font-bold text-[#94A3B8]">{macro.label}</Text> goal. Detected by nutrition and manual log.
                        </Text>

                        {/* Contribution List */}
                        <View className="gap-4">
                            {contributions.map((item, index) => (
                                <View key={index} className="flex-row items-center justify-between bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-4">
                                    <View className="flex-row items-center gap-4">
                                        <View className="w-12 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[14px] items-center justify-center">
                                            <Text className="text-[24px]">🫙</Text>
                                        </View>
                                        <View>
                                            <Text className="text-[15px] font-bold text-[#F1F5F9]">{macro.label}</Text>
                                            <Text className="text-[13px] font-medium text-[#64748B]">{item.time}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-3">
                                        <Text className="text-[15px] font-bold text-[#4DB9F2]">+{item.amount}g</Text>
                                        <View className="w-8 h-8 rounded-[10px] bg-[#0F172A] items-center justify-center border border-[#1E2D4A]">
                                            <Ionicons name="arrow-forward" size={14} color="#64748B" />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="px-6 pt-4 pb-4">
                    <TouchableOpacity
                        onPress={handleAddCustom}
                        className="bg-[#4DB9F2] h-[56px] rounded-[16px] flex-row items-center justify-center gap-2"
                    >
                        <Ionicons name="add" size={20} color="#090D16" />
                        <Text className="text-[#090D16] font-bold text-[16px]">Add custom</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>

            <AddContributorSheet
                ref={addSheetRef}
                title={macro.label}
                unit="g"
                onAdd={handleAddContribution}
                onEditGoal={onOpenSettings}
            />
        </BottomSheetModal>
    );
});
