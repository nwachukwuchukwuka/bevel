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
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
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
            className="flex-row items-center justify-between py-4 px-5"
        >
            <View className="flex-row items-center gap-3">
                {isSelected ? (
                    <Ionicons name="checkmark-circle" size={20} color="#4DB9F2" />
                ) : (
                    <View className="w-5 h-5 ml-1" />
                )}
                <Text className={`text-[15px] ${isSelected ? 'font-bold text-[#4DB9F2]' : 'text-[#94A3B8]'} ${!isSelected && 'ml-2'}`}>{label}</Text>
            </View>
            <Ionicons name={icon} size={20} color="#64748B" />
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
                handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
                backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            >
                <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
                        <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                            <Ionicons name="close" size={20} color="#F1F5F9" />
                        </TouchableOpacity>
                        <Text className="font-bold text-[18px] text-[#F1F5F9]">{nutrient.label} Settings</Text>
                        <View className="w-10" />
                    </View>

                    <View className="flex-1 px-6">
                        <View className="bg-[#151E33] rounded-[24px] border border-[#1E2D4A] overflow-hidden mb-6">
                            {/* Tracking Intent */}
                            <TouchableOpacity
                                onPress={() => setShowIntentPicker(!showIntentPicker)}
                                className="flex-row items-center justify-between px-5 py-5 border-b border-[#1E2D4A]"
                            >
                                <View>
                                    <Text className="text-[#F1F5F9] font-bold text-[15px] mb-1">Tracking Intent</Text>
                                    <Text className="text-[#64748B] text-[13px]">Target or limit a nutrient</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[#4DB9F2] font-bold text-[15px]">{intent}</Text>
                                    <Ionicons name="swap-vertical" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>

                            {showIntentPicker && (
                                <View className="bg-[#0F172A] border-y border-[#1E2D4A]">
                                    <IntentOption label="Target" value="Target" icon="medical-outline" isSelected={intent === 'Target'} />
                                    <View className="h-[1px] bg-[#1E2D4A] mx-5" />
                                    <IntentOption label="Limit" value="Limit" icon="remove-circle-outline" isSelected={intent === 'Limit'} />
                                    <View className="h-[1px] bg-[#1E2D4A] mx-5" />
                                    <IntentOption label="None" value="None" icon="ban-outline" isSelected={intent === 'None'} />
                                </View>
                            )}

                            {/* Daily Goal */}
                            <TouchableOpacity
                                onPress={() => openKeypad('target')}
                                className="flex-row items-center justify-between px-5 py-5 border-b border-[#1E2D4A]"
                            >
                                <View>
                                    <Text className="text-[#F1F5F9] font-bold text-[15px] mb-1">Daily {intent === 'Limit' ? 'Limit' : 'Target'}</Text>
                                    <Text className="text-[#64748B] text-[13px]">{intent === 'Limit' ? 'Aim to stay near or below' : 'Aim to meet or exceed'}</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[#4DB9F2] font-bold text-[15px]">{target}{nutrient.unit}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>

                            {/* Quick Add */}
                            <TouchableOpacity
                                onPress={() => openKeypad('quickAdd')}
                                className="flex-row items-center justify-between px-5 py-5"
                            >
                                <View>
                                    <Text className="text-[#F1F5F9] font-bold text-[15px] mb-1">Quick Add Amount</Text>
                                    <Text className="text-[#64748B] text-[13px]">Set default add amount</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[#4DB9F2] font-bold text-[15px]">{quickAdd}{nutrient.unit}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center text-[#64748B] text-[13px] mb-8">
                            Recommended <Text className="text-[#F1F5F9] font-bold">{recommendedValue}</Text> daily
                        </Text>

                        <TouchableOpacity
                            onPress={handleSave}
                            className="bg-[#4DB9F2] h-[56px] rounded-[16px] items-center justify-center"
                        >
                            <Text className="text-[#090D16] font-bold text-[16px]">Save</Text>
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
