import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NumericKeypadSheet, NumericKeypadSheetRef } from './NumericKeypadSheet';

export type NutrientSetupSheetRef = BottomSheetModal;

interface Props {
    nutrient: {
        label: string;
        target: string;
        unit: string;
        quickAdd: string;
        intent?: 'Target' | 'Limit' | 'None';
    };
    onSave: (data: { target: string; quickAdd: string; intent: 'Target' | 'Limit' | 'None' }) => void;
}

export const NutrientSetupSheet = forwardRef<NutrientSetupSheetRef, Props>(({ nutrient, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['70%'], []);
    const keypadRef = useRef<NumericKeypadSheetRef>(null);

    const [intent, setIntent] = useState<'Target' | 'Limit' | 'None'>(nutrient.intent || 'Target');
    const [target, setTarget] = useState(nutrient.target);
    const [quickAdd, setQuickAdd] = useState(nutrient.quickAdd);
    const [showIntentPicker, setShowIntentPicker] = useState(false);
    const [keypadMode, setKeypadMode] = useState<'target' | 'quickAdd'>('target');

    // Sync state when nutrient changes
    React.useEffect(() => {
        setIntent(nutrient.intent || 'Target');
        setTarget(nutrient.target);
        setQuickAdd(nutrient.quickAdd);
    }, [nutrient]);

    const recommendedValue = useMemo(() => {
        const label = nutrient.label.toLowerCase();
        if (label.includes('cholesterol')) return '300mg';
        if (label.includes('fiber')) return '28g';
        if (label.includes('added sugar')) return '25g';
        if (label.includes('chromium')) return '35µg';
        if (label.includes('copper')) return '0.9mg';
        if (label.includes('folate')) return '400µg';
        return '300mg'; // Default
    }, [nutrient.label]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const handleSave = () => {
        onSave({ target, quickAdd, intent });
        (ref as any).current?.dismiss();
    };

    const openKeypad = (mode: 'target' | 'quickAdd') => {
        setKeypadMode(mode);
        keypadRef.current?.present();
    };

    const handleKeypadSave = (val: string) => {
        if (keypadMode === 'target') setTarget(val);
        else setQuickAdd(val);
    };

    const IntentOption = ({ label, value, icon, isSelected }: { label: string; value: 'Target' | 'Limit' | 'None'; icon: any; isSelected: boolean }) => (
        <TouchableOpacity
            onPress={() => {
                setIntent(value);
                setShowIntentPicker(false);
            }}
            className="flex-row items-center justify-between py-3 px-4"
        >
            <View className="flex-row items-center gap-3">
                {isSelected && <Ionicons name="checkmark" size={20} color="#1A1A1A" />}
                <Text className={`text-[16px] ${isSelected ? 'font-bold text-gray-900' : 'text-gray-500'} ${!isSelected && 'ml-7'}`}>{label}</Text>
            </View>
            <Ionicons name={icon} size={20} color="#6B7280" />
        </TouchableOpacity>
    );

    return (
        <>
            <BottomSheetModal
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                stackBehavior="push"
                handleIndicatorStyle={{ display: 'none' }}
                backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 40 }}
            >
                <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
                        <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                            <Ionicons name="close" size={24} color="#D1D5DB" />
                        </TouchableOpacity>
                        <Text className="font-bold text-[15px] text-gray-900">{nutrient.label}</Text>
                        <View className="w-6" />
                    </View>

                    <View className="flex-1 px-5">
                        <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-6">
                            {/* Tracking Intent */}
                            <TouchableOpacity
                                onPress={() => setShowIntentPicker(!showIntentPicker)}
                                className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50"
                            >
                                <View>
                                    <Text className="text-gray-900 font-bold text-[15px]">Tracking Intent</Text>
                                    <Text className="text-gray-400 text-[12px]">Target or limit a nutrient</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-gray-400 font-bold text-[15px]">{intent}</Text>
                                    <Ionicons name="swap-vertical" size={16} color="#D1D5DB" />
                                </View>
                            </TouchableOpacity>

                            {showIntentPicker && (
                                <View className="bg-gray-50 m-2 rounded-2xl border border-gray-100 shadow-sm">
                                    <IntentOption label="Target" value="Target" icon="medical-outline" isSelected={intent === 'Target'} />
                                    <View className="h-[1px] bg-gray-100 mx-4" />
                                    <IntentOption label="Limit" value="Limit" icon="remove-circle-outline" isSelected={intent === 'Limit'} />
                                    <View className="h-[1px] bg-gray-100 mx-4" />
                                    <IntentOption label="None" value="None" icon="ban-outline" isSelected={intent === 'None'} />
                                </View>
                            )}

                            {/* Daily Goal */}
                            <TouchableOpacity
                                onPress={() => openKeypad('target')}
                                className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50"
                            >
                                <View>
                                    <Text className="text-gray-900 font-bold text-[15px]">Daily {intent === 'Limit' ? 'Limit' : 'Target'}</Text>
                                    <Text className="text-gray-400 text-[12px]">{intent === 'Limit' ? 'Aim to stay near or below' : 'Aim to meet or exceed'}</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-gray-900 font-bold text-[15px]">{target}{nutrient.unit}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                                </View>
                            </TouchableOpacity>

                            {/* Quick Add */}
                            <TouchableOpacity
                                onPress={() => openKeypad('quickAdd')}
                                className="flex-row items-center justify-between px-5 py-4"
                            >
                                <View>
                                    <Text className="text-gray-900 font-bold text-[15px]">Quick Add Amount</Text>
                                    <Text className="text-gray-400 text-[12px]">Set default add amount</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-gray-900 font-bold text-[15px]">{quickAdd}{nutrient.unit}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center text-gray-400 text-[13px] mb-8 font-bold">
                            Recommended <Text className="text-gray-700">{recommendedValue}</Text> daily
                        </Text>

                        <TouchableOpacity
                            onPress={handleSave}
                            className="bg-[#1A1A1A] h-[64px] rounded-[32px] items-center justify-center shadow-lg shadow-black/5"
                        >
                            <Text className="text-white font-bold text-[18px]">Save</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>

            <NumericKeypadSheet
                ref={keypadRef}
                title={keypadMode === 'target' ? `Daily ${intent}` : 'Quick Add Amount'}
                unit={nutrient.unit}
                initialValue={keypadMode === 'target' ? target : quickAdd}
                onSave={handleKeypadSave}
            />
        </>
    );
});
