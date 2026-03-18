import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type NutritionGoalSummarySheetRef = BottomSheetModal;

interface Props {
    onEditGoal: () => void;
}

export const NutritionGoalSummarySheet = forwardRef<NutritionGoalSummarySheetRef, Props>(({ onEditGoal }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['70%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 32 }}
            stackBehavior='push'
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-2 pb-8">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="close" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                    <Text className="font-bold text-[15px] text-gray-900">Your Nutrition Goal</Text>
                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-white items-center justify-center border border-gray-100 shadow-sm shadow-black/5">
                        <Ionicons name="information" size={16} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-8 items-center">
                    {/* Main Chart */}
                    <View className="w-48 h-48 rounded-full border-[10px] border-gray-50 relative items-center justify-center mb-10">
                        {/* Fake Arc segments */}
                        <View className="absolute inset-0 rounded-full border-[10px] border-blue-400 border-b-transparent border-l-transparent -rotate-45" />
                        <View className="absolute inset-0 rounded-full border-[10px] border-yellow-400 border-t-transparent border-r-transparent border-l-transparent rotate-45" />
                        <View className="absolute inset-0 rounded-full border-[10px] border-pink-400 border-t-transparent border-r-transparent border-b-transparent -rotate-135" />

                        <View className="items-center">
                            <Text className="text-[28px] font-bold text-gray-900">1.892</Text>
                            <Text className="text-[13px] font-bold text-gray-400">kcal</Text>
                        </View>
                    </View>

                    {/* Stats List */}
                    <View className="w-full gap-4 mb-10">
                        <StatRow label="Fat" value="63,1g" pct="30%" color="#60A5FA" icon="sparkles" />
                        <StatRow label="Carbs" value="189,2g" pct="40%" color="#FBBF24" icon="flash" />
                        <StatRow label="Protein" value="141,9g" pct="30%" color="#F472B6" icon="flame" />
                    </View>

                    <Text className="text-center text-[13px] text-gray-400 leading-5 mb-8">
                        Your daily maintenance (TDEE) is <Text className="font-bold text-gray-700">1.892 kcal</Text>. Your goal is at maintenance.
                    </Text>

                    {/* Action Buttons */}
                    <View className="w-full flex-row gap-4 mb-4">
                        <TouchableOpacity className="flex-1 bg-gray-100 h-[56px] rounded-full items-center justify-center">
                            <Text className="text-gray-900 font-bold text-[16px]">New goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onEditGoal();
                            }}
                            className="flex-1 bg-[#1A1A1A] h-[56px] rounded-full items-center justify-center"
                        >
                            <Text className="text-white font-bold text-[16px]">Edit Goal</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text className="text-red-500 font-bold text-[13px]">Clear goal</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const StatRow = ({ label, value, pct, color, icon }: any) => (
    <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
            <Ionicons name={icon} size={14} color={color} />
            <Text className="text-[14px] font-bold" style={{ color }}>{label}</Text>
            <Text className="text-[14px] font-bold text-gray-400 ml-1">{value} • {pct}</Text>
        </View>
    </View>
);
