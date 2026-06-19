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
            enableDynamicSizing={false}
        >
            <View className="flex-1 flex-col">

                {/* Header */}
                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Activity types</Text>
                        <Text className="text-xs text-slate-400 mt-1">Select physiological category</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Split Navigation Workspace */}
                <View className="flex-1 flex-row bg-[#090D16]">

                    {/* Left Sidebar Index */}
                    <View className="w-16 bg-[#151E33] border-r border-[#1E293B] flex-col items-center py-6 gap-4">
                        {['a', 's', 'm', 'w'].map(letter => (
                            <View
                                key={letter}
                                className="w-9 h-9 rounded-xl bg-[#090D16] border border-[#1E293B] items-center justify-center"
                            >
                                <Text className="text-xs font-bold text-[#4DB9F2]">
                                    {letter}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Right Scrollable Workspace */}
                    <BottomSheetScrollView
                        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: insets.bottom + 100 }}
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="flex-row items-center bg-[#151E33] rounded-xl px-4 h-11 mb-6 border border-[#1E293B]">
                            <Ionicons name="search-outline" size={16} color="#94A3B8" />
                            <TextInput
                                placeholder="Search metrics..."
                                placeholderTextColor="#64748B"
                                className="flex-1 ml-3 text-sm text-slate-200 font-medium"
                            />
                        </View>

                        <View className="gap-3">
                            {FILTER_TYPES.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    onPress={() => onSelect(type.id)}
                                    activeOpacity={0.8}
                                    className={`flex-row items-center justify-between p-4 rounded-xl border ${selectedType === type.id
                                        ? 'bg-[#1E293B] border-[#4DB9F2]'
                                        : 'bg-[#1E293B40] border-[#1E293B]'
                                        }`}
                                >
                                    <View className="flex-row items-center gap-3 flex-1 pr-2">
                                        {type.id !== 'all' && <Ionicons name={type.icon as any} size={16} color="#F59E0B" />}
                                        <Text className={`text-sm font-semibold ${selectedType === type.id ? 'text-white' : 'text-slate-400'}`}>
                                            {type.label}
                                        </Text>
                                    </View>
                                    {selectedType === type.id && <Ionicons name="checkmark-circle" size={18} color="#4DB9F2" />}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </BottomSheetScrollView>
                </View>

                {/* Flat Sticky Save Action Block */}
                <View
                    className="absolute bottom-0 left-0 right-0 px-5 bg-[#151E33] border-t border-[#1E293B] pb-6 pt-4 z-10"
                    style={{ paddingBottom: insets.bottom || 24 }}
                >
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">
                            Apply type filter
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </BottomSheetModal>
    );
});