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
    const snapPoints = useMemo(() => ['85%'], []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            stackBehavior='push'
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>

                {/* Header Row (No bottom border, restructured) */}
                <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
                    <View>
                        <Text className="text-[22px] font-bold text-[#F1F5F9]">Nutrition Goal</Text>
                        <Text className="text-[14px] text-[#64748B] mt-1">Caloric & macro targets</Text>
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="information" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={dismiss}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1 px-6">

                    {/* Central Metric Block (Completely replaced the pie chart layout) */}
                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-8 mb-6 items-center">
                        <View className="w-14 h-14 bg-[#0F172A] border border-[#1E2D4A] rounded-[16px] items-center justify-center mb-4">
                            <Ionicons name="flame" size={28} color="#4DB9F2" />
                        </View>
                        <Text className="text-[14px] text-[#64748B] mb-2 font-medium">Daily Target</Text>
                        <Text className="text-[56px] font-bold text-[#F1F5F9] leading-none tracking-tight">1.892</Text>
                        <Text className="text-[18px] text-[#4DB9F2] font-bold mt-2">kcal</Text>
                    </View>

                    {/* Vertical Stats List (Replaced horizontal matrix) */}
                    <View className="flex-col gap-3 mb-6">
                        <StatRow label="Fat" value="63,1g" pct="30%" color="#4DB9F2" />
                        <StatRow label="Carbs" value="189,2g" pct="40%" color="#F59E0B" />
                        <StatRow label="Protein" value="141,9g" pct="30%" color="#EF4444" />
                    </View>

                    {/* Context Panel */}
                    <View className="bg-[#0F172A] border border-[#1E2D4A] p-5 rounded-[20px] mb-8 flex-row items-center gap-4">
                        <View className="w-10 h-10 bg-[#151E33] rounded-[12px] items-center justify-center border border-[#1E2D4A]">
                            <Ionicons name="analytics" size={20} color="#4DB9F2" />
                        </View>
                        <Text className="flex-1 text-[13px] text-[#64748B] leading-5">
                            Your daily maintenance (TDEE) is <Text className="font-bold text-[#F1F5F9]">1.892 kcal</Text>. Your goal is at maintenance.
                        </Text>
                    </View>

                    {/* Vertical Actions */}
                    <View className="mt-auto mb-4 flex-col gap-3">
                        <TouchableOpacity
                            onPress={onEditGoal}
                            activeOpacity={0.8}
                            className="w-full bg-[#4DB9F2] h-[56px] rounded-[16px] items-center justify-center"
                        >
                            <Text className="text-[#090D16] font-bold text-[16px]">Edit Goal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-full bg-[#151E33] h-[56px] rounded-[16px] items-center justify-center border border-[#1E2D4A]"
                        >
                            <Text className="text-[#F1F5F9] font-bold text-[16px]">New goal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} className="py-3 items-center">
                            <Text className="text-[#EF4444] font-bold text-[15px]">Clear goal</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const StatRow = ({ label, value, pct, color }: any) => (
    <View className="flex-row items-center justify-between bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-4">
        <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 rounded-[14px] items-center justify-center bg-[#0F172A] border border-[#1E2D4A]">
                <View className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            </View>
            <View>
                <Text className="text-[#F1F5F9] font-bold text-[15px]">{label}</Text>
                <Text className="text-[#64748B] text-[13px] mt-0.5">{pct} of total</Text>
            </View>
        </View>
        <Text className="text-[#F1F5F9] font-bold text-[16px]">{value}</Text>
    </View>
);