import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddCustomTagSheetRef = BottomSheetModal;

interface Props {
    onSave: (label: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean, icon: string) => void;
}

export const AddCustomTagSheet = forwardRef<AddCustomTagSheetRef, Props>(({ onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['65%'], []);
    const [label, setLabel] = useState('');
    const [logTime, setLogTime] = useState<'Daytime' | 'Nighttime'>('Daytime');
    const [isPinned, setIsPinned] = useState(false);
    const [icon, setIcon] = useState('😴');

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    const handleSave = () => {
        if (label.trim()) {
            onSave(label, logTime, isPinned, icon);
            setLabel('');
            setLogTime('Daytime');
            setIsPinned(false);
            dismiss();
        }
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-3">

                <View className="px-1 pb-6 mb-4 border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Add custom tag</Text>
                        <Text className="text-sm text-slate-400 mt-1">Define new tracking metric</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Split Modular Grid Layout */}
                <View className="flex-row gap-4 flex-1">

                    {/* Left Column (Visuals & Pin) */}
                    <View className="w-1/3 flex-col gap-4">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="bg-[#090D16] rounded-2xl flex-1 items-center justify-center border border-[#1E293B]"
                        >
                            <Text className="text-4xl mb-2">{icon}</Text>
                            <View className="bg-[#1E293B] px-2 py-1 rounded-md border border-[#2D3748]">
                                <Text className="text-[10px] font-semibold text-slate-400">Edit icon</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsPinned(!isPinned)}
                            activeOpacity={0.8}
                            className={`h-24 rounded-2xl items-center justify-center border ${isPinned
                                ? 'bg-[#1E293B] border-[#4DB9F2]'
                                : 'bg-[#1E293B40] border-[#1E293B]'
                                }`}
                        >
                            <Ionicons
                                name={isPinned ? "pin" : "pin-outline"}
                                size={24}
                                color={isPinned ? '#4DB9F2' : '#94A3B8'}
                                className="mb-2"
                            />
                            <Text className={`text-xs font-semibold ${isPinned ? 'text-white' : 'text-slate-400'}`}>
                                {isPinned ? 'Pinned' : 'Unpinned'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right Column (Data & Time) */}
                    <View className="flex-1 flex-col gap-4">

                        <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4">
                            <Text className="text-xs font-semibold text-slate-500 mb-2">Metric identifier</Text>
                            <View className="bg-[#090D16] border border-[#1E293B] rounded-xl px-3 h-12 justify-center">
                                <TextInput
                                    value={label}
                                    onChangeText={setLabel}
                                    placeholder="(e.g. Sleep medication)"
                                    placeholderTextColor="#64748B"
                                    className="text-base font-bold text-white w-full"
                                    selectionColor="#4DB9F2"
                                />
                            </View>
                        </View>

                        <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-1">
                            <Text className="text-xs font-semibold text-slate-500 mb-3">Time domain</Text>

                            <View className="flex-col gap-2">
                                <TouchableOpacity
                                    onPress={() => setLogTime('Daytime')}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center gap-3 p-3 rounded-xl border ${logTime === 'Daytime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                        }`}
                                >
                                    <View className={`w-3 h-3 rounded-full ${logTime === 'Daytime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                    <Text className={`text-sm font-semibold ${logTime === 'Daytime' ? 'text-white' : 'text-slate-500'}`}>
                                        Daytime
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setLogTime('Nighttime')}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center gap-3 p-3 rounded-xl border ${logTime === 'Nighttime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                        }`}
                                >
                                    <View className={`w-3 h-3 rounded-full ${logTime === 'Nighttime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                    <Text className={`text-sm font-semibold ${logTime === 'Nighttime' ? 'text-white' : 'text-slate-500'}`}>
                                        Nighttime
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

                {/* Primary Action Footer */}
                <View className="mt-4 pt-4 border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={!label.trim()}
                        activeOpacity={0.8}
                        className={`h-14 rounded-2xl items-center justify-center border flex-row gap-2 ${label.trim()
                            ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                            : 'bg-[#1E293B] border-[#2D3748]'
                            }`}
                    >
                        <Text className={`font-bold text-base ${label.trim() ? 'text-[#090D16]' : 'text-slate-500'}`}>
                            Save custom tag
                        </Text>
                        {label.trim() && <Ionicons name="checkmark-done" size={20} color="#090D16" />}
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});