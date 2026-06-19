import { FILTER_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type MetricFilterSheetRef = BottomSheetModal;
interface Props { selectedMetric: string; onSelect: (id: string) => void; }

export const MetricFilterSheet = forwardRef<MetricFilterSheetRef, Props>(({ selectedMetric, onSelect }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['55%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 pt-3">

                {/* Custom Header */}
                <View className="px-6 pb-4 border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Biometric index</Text>
                        <Text className="text-xs text-slate-400 mt-1">Swipe cards to choose metric</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Horizontal Swiping Deck (Carousel Layout Shift) */}
                <View className="h-48 my-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
                    >
                        {FILTER_METRICS.map(metric => {
                            const isActive = selectedMetric === metric.id;
                            return (
                                <TouchableOpacity
                                    key={metric.id}
                                    onPress={() => onSelect(metric.id)}
                                    activeOpacity={0.8}
                                    className={`w-64 p-5 rounded-2xl border flex-col justify-between ${isActive
                                        ? 'bg-[#1E293B] border-[#4DB9F2]'
                                        : 'bg-[#1E293B40] border-[#1E293B]'
                                        }`}
                                >
                                    <View className="flex-row justify-between items-center">
                                        <View className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center">
                                            <Ionicons
                                                name={metric.icon as any}
                                                size={18}
                                                color={isActive ? '#4DB9F2' : '#94A3B8'}
                                            />
                                        </View>
                                        {isActive && <Ionicons name="checkmark-circle" size={20} color="#4DB9F2" />}
                                    </View>

                                    <View className="mt-4">
                                        {/* <Text className="text-[10px] text-slate-500 font-semibold mb-1">Telemetry index</Text> */}
                                        <Text className="text-lg font-bold text-white">
                                            {metric.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View className="px-5 mt-auto">
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">
                            Select metric
                        </Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});