import { FILTER_TYPES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TypeFilterSheetRef = BottomSheetModal;
interface Props { selectedType: string; onSelect: (id: string) => void; }

export const TypeFilterSheet = forwardRef<TypeFilterSheetRef, Props>(({ selectedType, onSelect }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['100%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);
    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} className="px-5 pt-2" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity onPress={dismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                    <Text className="text-[15px] font-bold text-gray-900">Filter by</Text>
                    <View className="w-8" />
                </View>
                <View className="flex-row items-center bg-white border border-gray-200 rounded-[12px] px-4 h-[44px] mb-6 shadow-sm shadow-black/5">
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 text-[15px] font-medium text-gray-900" />
                </View>
                <View className="gap-3">
                    {FILTER_TYPES.map((type, idx) => (
                        <View key={type.id}>
                            {idx === 0 || type.id.charAt(0) !== FILTER_TYPES[idx - 1].id.charAt(0) ? <Text className="text-[12px] font-bold text-gray-500 mb-2 mt-2 uppercase">{type.id.charAt(0)}</Text> : null}
                            <TouchableOpacity onPress={() => onSelect(type.id)} className={`flex-row items-center justify-between p-4 rounded-[16px] bg-white border shadow-sm shadow-black/5 ${selectedType === type.id ? 'border-blue-500' : 'border-gray-100'}`}>
                                <View className="flex-row items-center gap-3">
                                    {type.id !== 'all' && <Ionicons name={type.icon as any} size={20} color="#F59E0B" />}
                                    <Text className="font-bold text-[15px] text-gray-900">{type.label}</Text>
                                </View>
                                {selectedType === type.id && <Ionicons name="checkmark" size={20} color="#111827" />}
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </BottomSheetScrollView>
            <View className="absolute bottom-14 left-0 right-0 px-5 bg-[#F9FAFB]" style={{ paddingBottom: insets.bottom || 20, paddingTop: 10 }}>
                <TouchableOpacity onPress={dismiss} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center shadow-lg shadow-black/10">
                    <Text className="text-white font-semibold text-[16px]">Filter by "{FILTER_TYPES.find(t => t.id === selectedType)?.label}"</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});