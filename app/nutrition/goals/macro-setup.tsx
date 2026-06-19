import { NumericKeypadSheet, NumericKeypadSheetRef } from '@/components/nutrition/NumericKeypadSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MacroSetupScreen() {
    const router = useRouter();
    const infoSheetRef = useRef<BottomSheetModal>(null);
    const kcalKeypadRef = useRef<NumericKeypadSheetRef>(null);

    const [kcalGoal, setKcalGoal] = useState('1.892');

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                        <Ionicons name="arrow-back" size={20} color="#F1F5F9" />
                    </TouchableOpacity>
                    <Text className="font-semibold text-[#F1F5F9] text-[16px]">Nutrition Goal</Text>
                    <TouchableOpacity onPress={() => infoSheetRef.current?.present()} className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                        <Ionicons name="information" size={20} color="#F1F5F9" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    <View className="mb-8 mt-2">
                        <Text className="text-[28px] font-bold text-[#F1F5F9] mb-3">Custom goal</Text>
                        <TouchableOpacity className="flex-row items-center bg-[#151E33] self-start px-4 py-2.5 rounded-full border border-[#1E2D4A] gap-2">
                            <Text className="text-[#94A3B8] font-medium text-[14px]">TDEE:</Text>
                            <Text className="font-bold text-[#F1F5F9] text-[14px]">1.892 kcal</Text>
                            <Ionicons name="pencil" size={12} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-6 mb-8 items-center">
                        <Text className="font-medium text-[#94A3B8] mb-4 text-[15px]">Calorie Goal</Text>
                        <TouchableOpacity onPress={() => kcalKeypadRef.current?.present()} className="flex-row items-end gap-2 border-b-2 border-[#4DB9F2] pb-2 px-4">
                            <Text className="text-[48px] font-bold text-[#F1F5F9] leading-none">{kcalGoal}</Text>
                            <Text className="text-[#4DB9F2] font-bold text-[18px] mb-2">kcal</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between items-center mb-5">
                        <Text className="font-bold text-[#F1F5F9] text-[18px]">Macronutrient Goal</Text>
                        <View className="flex-row bg-[#151E33] border border-[#1E2D4A] rounded-full p-1 gap-1">
                            <View className="px-3 py-1.5"><Text className="text-[#64748B] font-bold text-[13px]">g</Text></View>
                            <View className="bg-[#4DB9F2] rounded-full px-3 py-1.5"><Text className="text-[#090D16] font-bold text-[13px]">%</Text></View>
                        </View>
                    </View>

                    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] overflow-hidden mb-8">
                        <MacroInputRow label="Fat" value="63g" pct="30" color="#60A5FA" />
                        <View className="h-[1px] bg-[#1E2D4A] w-full" />
                        <MacroInputRow label="Carbs" value="189g" pct="40" color="#FBBF24" />
                        <View className="h-[1px] bg-[#1E2D4A] w-full" />
                        <MacroInputRow label="Protein" value="142g" pct="30" color="#F472B6" />
                    </View>

                    <TouchableOpacity className="flex-row items-center justify-center bg-[#15233A] border border-[#4DB9F2]/30 py-4 rounded-[16px] mb-6 gap-2">
                        <Ionicons name="sync" size={18} color="#4DB9F2" />
                        <Text className=" text-[#4DB9F2] text-[15px]">Balance macros to meet calorie goal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} className="bg-[#4DB9F2] py-4 rounded-[16px] items-center mb-4">
                        <Text className="text-[#090D16]  text-[16px]">Save goal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-3">
                        <Text className="text-[#F87171]  text-[15px]">Reset</Text>
                    </TouchableOpacity>

                </ScrollView>

                <BottomSheetModal
                    ref={infoSheetRef}
                    snapPoints={['80%']}
                    backdropComponent={p => <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...p} opacity={0.6} />}
                    handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40 }}
                    backgroundStyle={{ backgroundColor: '#090D16' }}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView className="flex-1 px-6 pt-4">
                        <View className="flex-row items-center justify-between mb-8">
                            <Text className="text-[22px] font-bold text-[#F1F5F9]">About Macronutrients</Text>
                            <TouchableOpacity onPress={() => infoSheetRef.current?.dismiss()} className="w-8 h-8 bg-[#151E33] border border-[#1E2D4A] rounded-[10px] items-center justify-center">
                                <Ionicons name="close" size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-4">
                            <InfoRow color="#60A5FA" title="Fat" kcal="9" icon="water" desc="Essential for long-term energy, hormone production, cell structure, and absorption of fat-soluble vitamins." />
                            <InfoRow color="#FBBF24" title="Carbs" kcal="4" icon="leaf" desc="Broken down into glucose and used as the body's main source of energy, especially for the brain and muscles." />
                            <InfoRow color="#F472B6" title="Protein" kcal="4" icon="nutrition" desc="Provides amino acids needed to build and repair tissues, and support enzymes, hormones, and immune function." />
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>

                <NumericKeypadSheet
                    ref={kcalKeypadRef}
                    title="Enter amount"
                    unit="kcal"
                    initialValue={kcalGoal}
                    onSave={setKcalGoal}
                />

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

const MacroInputRow = ({ label, value, pct, color }: any) => (
    <View className="flex-row items-center p-5">
        <View className="w-10 h-10 rounded-[12px] items-center justify-center mr-4" style={{ backgroundColor: `${color}15` }}>
            <Ionicons name="analytics" size={20} color={color} />
        </View>
        <View className="flex-1">
            <Text style={{ color }} className=" text-[16px] mb-1">{label}</Text>
            <Text className="text-[#64748B] font-medium text-[13px]">{value}</Text>
        </View>
        <View className="flex-row items-center gap-3">
            <Ionicons name="lock-open-outline" size={20} color="#64748B" />
            <View className="w-[80px] bg-[#0F172A] border border-[#1E2D4A] rounded-[14px] px-3 py-3 flex-row justify-between items-center">
                <TextInput value={pct} editable={false} className="text-[#F1F5F9] text-[16px] p-0" />
                <Text className="text-[#64748B] text-[14px]">%</Text>
            </View>
        </View>
    </View>
);

const InfoRow = ({ color, title, kcal, icon, desc }: any) => (
    <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] p-5">
        <View className="flex-row items-center justify-between mb-3 border-b border-[#1E2D4A] pb-3">
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-[12px] items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Ionicons name={icon} size={20} color={color} />
                </View>
                <Text style={{ color }} className="font-bold text-[18px]">{title}</Text>
            </View>
            <View className="bg-[#0F172A] border border-[#1E2D4A] px-3 py-1.5 rounded-[10px]">
                <Text className="text-[#F1F5F9] font-bold text-[13px]">{kcal} kcal/g</Text>
            </View>
        </View>
        <Text className="text-[#94A3B8] leading-6 text-[14px] font-medium">{desc}</Text>
    </View>
);