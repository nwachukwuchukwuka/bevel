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
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
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
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 32 }}
            enableDynamicSizing={false}
            stackBehavior="push"
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Sync Toast */}
                {showSyncedToast && (
                    <View className="absolute top-0 left-0 right-0 z-50 items-center px-5">
                        <View className="bg-green-50 flex-row items-center gap-2 px-4 py-2 rounded-full border border-green-100">
                            <View className="w-5 h-5 rounded-full bg-green-500 items-center justify-center">
                                <Ionicons name="checkmark" size={12} color="white" />
                            </View>
                            <Text className="text-green-700 font-bold text-[13px]">Synced at 11.11 AM on 14/09/25</Text>
                        </View>
                    </View>
                )}

                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="close" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                    <Text className="font-bold text-[15px] text-gray-900">{macro.label}</Text>
                    <TouchableOpacity
                        onPress={onOpenSettings}
                        className="w-8 h-8 rounded-lg bg-gray-50 items-center justify-center border border-gray-100"
                    >
                        <Ionicons name="settings-sharp" size={16} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-5">
                    {/* Gauge Area */}
                    <View className="bg-white rounded-[24px] p-6 mb-8 border border-gray-50 shadow-sm shadow-black/5 items-center">
                        <View className="w-full flex-row justify-between mb-2">
                            <Text className="text-[11px] font-bold text-gray-400">{displayValue}/{macro.target}g</Text>
                            <Text className="text-[11px] font-bold text-gray-400">{currentPct}%</Text>
                        </View>

                        <View className="w-[200px] h-[120px] overflow-hidden relative items-center justify-end">
                            {/* Background Arch */}
                            <View className="w-[200px] h-[200px] rounded-full border-[16px] border-gray-50 absolute -bottom-[80px]" />
                            {/* Fill Arch */}
                            <View
                                className="w-[200px] h-[200px] rounded-full border-[16px] absolute -bottom-[80px]"
                                style={{
                                    borderColor: macro.color,
                                    borderBottomColor: 'transparent',
                                    borderLeftColor: 'transparent',
                                    borderRightColor: currentPct > 50 ? macro.color : 'transparent',
                                    transform: [{ rotate: `${-45 + (currentPct * 1.8)}deg` }],
                                    opacity: 0.1
                                }}
                            />

                            {/* Marker */}
                            <View
                                className="absolute left-[92px] bottom-[104px] w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow-sm"
                                style={{
                                    transform: [
                                        { translateX: Math.cos((currentPct * 1.8 - 180) * (Math.PI / 180)) * 84 },
                                        { translateY: Math.sin((currentPct * 1.8 - 180) * (Math.PI / 180)) * 84 }
                                    ]
                                }}
                            />

                            <View className="items-center pb-2">
                                <Text className="text-[15px] font-bold text-gray-900">{(parseFloat(macro.target.replace(',', '.')) - displayValue).toFixed(1).replace('.', ',')}g</Text>
                                <Text className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">left</Text>
                            </View>

                            <Text className="absolute bottom-0 left-0 text-[10px] font-bold text-gray-400">0</Text>
                            <Text className="absolute bottom-0 right-0 text-[10px] font-bold text-gray-400">{macro.target}</Text>
                        </View>
                    </View>

                    {/* Today's Entries */}
                    <View className="mb-8">
                        <Text className="text-[15px] font-bold text-gray-900 mb-1">Today's Entries</Text>
                        <Text className="text-[13px] text-gray-400 leading-5 mb-6">
                            Entries that contributed to your <Text className="font-bold text-gray-700">{macro.label}</Text> goal. Detected by nutrition and manual log.
                        </Text>

                        {/* Contribution List */}
                        {contributions.map((item, index) => (
                            <View key={index} className="flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 mb-3">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                                        <Text className="text-xl">🫙</Text>
                                    </View>
                                    <View>
                                        <Text className="text-[14px] font-bold text-gray-900">{macro.label}</Text>
                                        <Text className="text-[11px] text-gray-400">{item.time}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[14px] font-bold text-gray-900">+{item.amount}g</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#D1D5DB" />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="px-5 pt-4 pb-4">
                    <TouchableOpacity
                        onPress={handleAddCustom}
                        className="bg-[#1A1A1A] h-[56px] rounded-xl flex-row items-center justify-center gap-2"
                    >
                        <Ionicons name="add" size={20} color="white" />
                        <Text className="text-white font-bold text-[16px]">Add custom</Text>
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
