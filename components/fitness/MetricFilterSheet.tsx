import { FILTER_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type MetricFilterSheetRef = BottomSheetModal;
interface Props { selectedMetric: string; onSelect: (id: string) => void; }

export const MetricFilterSheet = forwardRef<MetricFilterSheetRef, Props>(({ selectedMetric, onSelect }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}>
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-5 pt-2">
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity onPress={dismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                    <Text className="text-[15px] font-bold text-gray-900">Filter by</Text>
                    <View className="w-8" />
                </View>
                <View className="gap-3 mb-6">
                    {FILTER_METRICS.map(metric => (
                        <TouchableOpacity key={metric.id} onPress={() => onSelect(metric.id)} className={`flex-row items-center justify-between p-4 rounded-[16px] bg-white border shadow-sm shadow-black/5 ${selectedMetric === metric.id ? 'border-blue-500' : 'border-gray-100'}`}>
                            <View className="flex-row items-center gap-3">
                                <Ionicons name={metric.icon as any} size={20} color="#4B5563" />
                                <Text className="font-bold text-[15px] text-gray-900">{metric.label}</Text>
                            </View>
                            {selectedMetric === metric.id && <Ionicons name="checkmark" size={20} color="#111827" />}
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={dismiss} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mt-auto">
                    <Text className="text-white font-semibold text-[16px]">Filter by "{FILTER_METRICS.find(m => m.id === selectedMetric)?.label}"</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});