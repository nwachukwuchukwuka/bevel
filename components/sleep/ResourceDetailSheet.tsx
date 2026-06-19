import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ResourceDetailSheetRef = BottomSheetModal;

export const ResourceDetailSheet = forwardRef<ResourceDetailSheetRef, { title: string }>(({ title }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['100%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 flex-col pt-2">
                <View className="px-5 pb-6 border-b border-[#1E293B] flex-row justify-between items-center bg-[#090D16]">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Guide Sheet</Text>
                        <Text className="text-xs text-slate-400 mt-1">Resource documentation</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>

                    <View className="px-5 pt-8 mb-8">
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 flex-row items-center gap-4">
                            <View className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                <Ionicons name="book-outline" size={28} color="#4DB9F2" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-bold text-white mb-1">{title}</Text>
                                <Text className="text-xs font-semibold text-[#4DB9F2]">Educational brief</Text>
                            </View>
                        </View>
                    </View>

                    <View className="px-5 mb-8">
                        <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">Overview</Text>
                        <View className="bg-[#1E293B40] border border-[#1E293B] p-5 rounded-2xl">
                            <Text className="text-sm font-medium text-slate-300 leading-6">
                                Understand the quality and duration of your rest to optimize health and daily performance.
                            </Text>
                        </View>
                    </View>

                    <View className="px-5 mb-8">
                        <Text className="text-sm font-semibold text-slate-500 mb-4 ml-1">What is {title}?</Text>
                        <View className="flex-col gap-4">
                            <View className="bg-[#151E33] border border-[#1E293B] p-5 rounded-2xl flex-row gap-4">
                                <Ionicons name="information-circle-outline" size={20} color="#4DB9F2" />
                                <Text className="flex-1 text-sm text-slate-400 leading-6">
                                    Bevel's <Text className="font-bold text-slate-200">{title}</Text> is a comprehensive metric that evaluates various aspects of your sleep, helping you identify trends and areas for improvement.
                                </Text>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E293B] p-5 rounded-2xl flex-row gap-4">
                                <Ionicons name="sync-outline" size={20} color="#4DB9F2" />
                                <Text className="flex-1 text-sm text-slate-400 leading-6">
                                    Consistency and quality are key. By tracking these metrics over time, you can better understand how lifestyle factors like diet, activity, and stress impact your recovery.
                                </Text>
                            </View>
                        </View>
                    </View>

                </BottomSheetScrollView>

                <View className="px-5 pt-4 pb-8 bg-[#090D16] border-t border-[#1E293B]" style={{ paddingBottom: insets.bottom || 24 }}>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Close documentation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});