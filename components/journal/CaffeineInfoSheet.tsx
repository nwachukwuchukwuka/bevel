import { CAFFEINE_EXAMPLES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type CaffeineInfoSheetRef = BottomSheetModal;

export const CaffeineInfoSheet = forwardRef<CaffeineInfoSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['100%'], []);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);

    const renderHandle = useCallback(
        () => (
            <View className="absolute top-3 left-0 right-0 items-center z-10">
                <View className="w-10 h-1 rounded-full bg-white/40" />
            </View>
        ),
        []
    );
    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleComponent={renderHandle}
            backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
        >
            <View className="flex-1">
                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false} bounces={false}>

                    {/* Header Image Area Mock */}
                    <LinearGradient
                        colors={['#A16207', '#D97706']}
                        style={{
                            height: 256,
                            paddingHorizontal: 24,
                            justifyContent: 'flex-end',
                            paddingBottom: 32,
                        }}
                    >
                        <View className="absolute top-4 left-0 right-0 items-center"><Text className="font-bold text-white/50 text-[14px] mt-3">Coffee</Text></View>
                        <Text className="text-[28px] font-bold text-white mb-2 ">Coffee</Text>
                        <Text className="text-[14px] text-white/90 leading-5">A cup of coffee (8 fl oz) usually has around 80-100 mg of caffeine.</Text>
                    </LinearGradient>

                    <View className="px-5 pt-6">
                        {/* Segmented Control */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                            <View className="bg-white border border-gray-200 rounded-full px-4 py-2 mr-3 "><Text className="font-bold text-gray-900">Coffee</Text></View>
                            <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Tea</Text></View>
                            <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Soft drink</Text></View>
                            <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Energy</Text></View>
                        </ScrollView>

                        {/* List */}
                        <View className="bg-white border border-gray-100 rounded-[24px] p-5">
                            <Text className="text-[11px] font-bold text-gray-400 mb-4">Example</Text>
                            <View className="gap-y-4">
                                {CAFFEINE_EXAMPLES.map(ex => (
                                    <View key={ex.name} className="flex-row justify-between">
                                        <Text className="text-[14px] font-medium text-gray-700">{ex.name}</Text>
                                        <Text className="text-[14px] font-bold text-gray-900">{ex.amount}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Note */}
                        <View className="flex-row mt-6 gap-2 px-2">
                            <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
                            <Text className="flex-1 text-[12px] text-gray-500 leading-5">According to the FDA, 400 mg is the maximum daily suggested caffeine intake for healthy adults.</Text>
                        </View>
                    </View>
                </BottomSheetScrollView>

                {/* Fixed Bottom Button */}
                <View className="absolute bottom-0 left-0 right-0 px-5 bg-[#FDFDFD]" style={{ paddingBottom: insets.bottom || 20, paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                        <Text className="text-white font-semibold text-[16px]">Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});