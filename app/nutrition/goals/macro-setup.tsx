import { NumericKeypadSheet, NumericKeypadSheetRef } from '@/components/nutrition/NumericKeypadSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MacroSetupScreen() {
    const router = useRouter();
    const infoSheetRef = useRef<BottomSheetModal>(null);
    const kcalKeypadRef = useRef<NumericKeypadSheetRef>(null);

    const [kcalGoal, setKcalGoal] = useState('1.892');

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4 mb-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="font-semibold text-gray-700 text-[15px]">Nutrition Goal</Text>
                    <TouchableOpacity onPress={() => infoSheetRef.current?.present()} className="w-8 h-8 bg-white rounded-full items-center justify-center border border-gray-200">
                        <Ionicons name="information" size={16} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
                    {/* Title Section */}
                    <View className="flex-row justify-between items-center mb-8">
                        <View>
                            <Text className="text-2xl font-bold text-gray-900 mb-1">Custom goal</Text>
                            <Text className="text-gray-500 font-medium text-sm">
                                TDEE: <Text className="font-bold text-gray-700">1.892 kcal</Text> <Ionicons name="pencil" size={12} />
                            </Text>
                        </View>
                        {/* Mock Colored Ring */}
                        <View className="w-10 h-10 rounded-full border-4 border-yellow-400 relative">
                            <View className="absolute inset-0 border-4 border-blue-400 rounded-full border-b-transparent border-l-transparent -rotate-45" />
                            <View className="absolute inset-0 border-4 border-pink-400 rounded-full border-t-transparent border-r-transparent border-l-transparent rotate-45" />
                        </View>
                    </View>

                    {/* Calorie Goal Input */}
                    <Text className="font-bold text-gray-900 mb-3 text-base">Calorie Goal</Text>
                    <TouchableOpacity
                        onPress={() => kcalKeypadRef.current?.present()}
                        className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex-row items-center justify-between mb-8"
                        style={styles.shadow}
                    >
                        <Text className="text-lg font-bold text-gray-900">{kcalGoal}</Text>
                        <Text className="text-gray-400 font-medium">kcal</Text>
                    </TouchableOpacity>

                    {/* Macronutrient Goal List */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="font-bold text-gray-900 text-base">Macronutrient Goal</Text>
                        <View className="flex-row bg-gray-100 rounded-lg p-0.5">
                            <View className="px-3 py-1"><Text className="text-gray-500 font-bold text-xs">g</Text></View>
                            <View className="bg-white rounded px-3 py-1 shadow-sm"><Text className="text-gray-900 font-bold text-xs">%</Text></View>
                        </View>
                    </View>

                    <View className="gap-4 mb-8">
                        <MacroInputRow label="Fat" value="63g" pct="30" color="#60A5FA" />
                        <MacroInputRow label="Carbs" value="189g" pct="40" color="#FBBF24" />
                        <MacroInputRow label="Protein" value="142g" pct="30" color="#F472B6" />
                    </View>

                    <TouchableOpacity className="flex-row items-center justify-center gap-2 mb-6">
                        <Ionicons name="sync" size={16} color="#4B5563" />
                        <Text className="font-bold text-gray-700">Balance macros to meet calorie goal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg mb-4">
                        <Text className="text-white font-bold text-base">Save goal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-2">
                        <Text className="text-gray-300 font-bold">Reset</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* About Macronutrients Sheet */}
                <BottomSheetModal
                    ref={infoSheetRef}
                    snapPoints={['75%']}
                    backdropComponent={p => <BottomSheetBackdrop disappearsOnIndex={-1}
                        appearsOnIndex={0} {...p} opacity={0.4} />}
                    handleIndicatorStyle={{ display: 'none' }}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView className="flex-1 px-6 pt-2">
                        <View className="mb-4">
                            <TouchableOpacity onPress={() => infoSheetRef.current?.dismiss()}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-xl font-bold text-gray-900 text-center mb-8">About Macronutrients</Text>

                        <View className="gap-6">
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


// Sub Components
const MacroInputRow = ({ label, value, pct, color }: any) => (
    <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 w-1/3">
            <Text style={{ color }} className="font-bold text-[15px]">{label}</Text>
            <Text className="text-gray-300 font-medium text-xs">{value}</Text>
        </View>
        <Ionicons name="lock-open-outline" size={18} color="#9CA3AF" />
        <View className="w-24 border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white" style={styles.shadow}>
            <TextInput value={pct} editable={false} className="font-bold text-gray-900 text-base flex-1" />
            <Text className="text-gray-400 font-medium text-xs">%</Text>
        </View>
    </View>
);

const InfoRow = ({ color, title, kcal, icon, desc }: any) => (
    <View className="flex-row gap-4">
        <View className="flex-1">
            <Text style={{ color }} className="font-bold text-base mb-0.5">{title}</Text>
            <Text className="text-gray-700 font-bold text-[13px] mb-2">{kcal} kcal per gram</Text>
            <Text className="text-gray-500 leading-5 text-[13px]">{desc}</Text>
        </View>
        <View className="w-10 h-10 rounded-xl items-center justify-center bg-gray-50" style={styles.shadow}>
            <Ionicons name={icon} size={20} color={color} />
        </View>
    </View>
);

const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 } });