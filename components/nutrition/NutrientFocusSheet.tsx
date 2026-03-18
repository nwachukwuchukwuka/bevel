import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type NutrientData = {
    id: string;
    name: string;
    current: number;
    target: number;
    unit: string;
    color: string;
    type: 'macro' | 'limit';
};

interface NutrientFocusSheetProps {
    data: NutrientData | null;
}

export const NutrientFocusSheet = forwardRef<BottomSheetModal, NutrientFocusSheetProps>(({ data }, ref) => {
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

    if (!data) return null;

    const percentage = Math.min(data.current / data.target, 1);

    // Calculate rotation for semi-circle: starts at -225deg (empty), goes up to -45deg (100% full)
    const rotation = -225 + (180 * percentage);

    return (
        <BottomSheetModal ref={ref} snapPoints={['85%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }}>
            <View className="flex-1 bg-[#F9FAFB] pt-2 rounded-t-3xl">

                {/* Header */}
                <View className="flex-row justify-between items-center px-5 mb-4">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="close" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">{data.name}</Text>
                    <TouchableOpacity className="w-8 h-8 rounded-full border border-gray-200 bg-white items-center justify-center shadow-sm">
                        <Ionicons name="settings-sharp" size={14} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    {/* Top Graphic Section */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6" style={styles.shadow}>

                        {data.type === 'macro' ? (
                            <>
                                <View className="flex-row justify-between mb-2">
                                    <Text className="font-bold text-gray-400 text-xs">{data.current}/{data.target}{data.unit}</Text>
                                    <Text className="font-bold text-gray-500 text-xs">{Math.round(percentage * 100)}%</Text>
                                </View>

                                {/* CSS Semi-Circle Implementation */}
                                <View className="items-center mt-4 mb-2">
                                    <View className="w-[240px] h-[120px] overflow-hidden relative items-center">
                                        {/* Track */}
                                        <View className="w-[240px] h-[240px] rounded-full border-[16px] border-gray-100 absolute top-0" />

                                        {/* Progress Arc */}
                                        <View
                                            className="w-[240px] h-[240px] rounded-full border-[16px] absolute top-0"
                                            style={{
                                                borderColor: data.color,
                                                borderBottomColor: 'transparent',
                                                borderRightColor: 'transparent',
                                                transform: [{ rotate: `${rotation}deg` }]
                                            }}
                                        />

                                        {/* Thumb/Knob on the edge of progress */}
                                        <View
                                            className="absolute w-[240px] h-[240px] items-center"
                                            style={{ transform: [{ rotate: `${-90 + (180 * percentage)}deg` }] }}
                                        >
                                            <View className="w-6 h-6 rounded-full bg-white border-4 mt-2" style={{ borderColor: data.color, shadowColor: data.color, shadowOpacity: 0.5, shadowRadius: 6 }} />
                                        </View>

                                        {/* Inner Text */}
                                        <View className="absolute bottom-2 items-center">
                                            <Text className="text-4xl font-bold text-gray-900">{data.target - data.current > 0 ? (data.target - data.current).toFixed(1) : 0}{data.unit}</Text>
                                            <Text className="text-gray-400 font-bold text-sm">left</Text>
                                        </View>
                                    </View>

                                    {/* Bottom Labels for Semi Circle */}
                                    <View className="w-[240px] flex-row justify-between mt-2">
                                        <Text className="text-gray-300 text-xs font-bold">0</Text>
                                        <Text className="text-gray-300 text-xs font-bold">{data.target}</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                {/* Linear Progress Implementation for Limits (e.g. Cholesterol) */}
                                <View className="flex-row justify-between mb-4">
                                    <Text className="font-bold text-gray-500 text-sm">{data.current}/{data.target}{data.unit}</Text>
                                    <Text className="font-bold text-gray-500 text-sm">{Math.round(percentage * 100)}%</Text>
                                </View>

                                <View className="h-4 bg-gray-100 rounded-full w-full mb-4 relative justify-center">
                                    <View className="h-full rounded-full" style={{ width: `${percentage * 100}%`, backgroundColor: data.color }} />
                                    <View className="absolute w-6 h-6 bg-white border-4 rounded-full shadow-sm" style={{ left: `${Math.max(0, (percentage * 100) - 5)}%`, borderColor: data.color }} />
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="text-gray-400 text-xs font-bold">0</Text>
                                    <Text className="text-gray-900 text-[15px] font-bold">{Math.max(data.target - data.current, 0).toFixed(1)}{data.unit} left</Text>
                                    <Text className="text-gray-400 text-xs font-bold">{data.target}</Text>
                                </View>
                            </>
                        )}
                    </View>

                    {/* Today's Entries Section */}
                    <Text className="font-bold text-gray-900 text-base mb-1">Today's Entries</Text>
                    <Text className="text-gray-500 text-[13px] leading-5 mb-4">
                        Entries that contributed to your <Text className="font-bold">{data.name}</Text> goal. Detected by nutrition and manual log.
                    </Text>

                    <View className="gap-3 mb-8">
                        {/* Mock Entry 1 */}
                        <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center justify-between" style={styles.shadow}>
                            <View className="flex-row items-center gap-4">
                                <View className="relative">
                                    <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text className="text-2xl">🥑</Text></View>
                                    <View className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md border bg-purple-50 border-purple-200 text-purple-700"><Text className="text-[10px] font-bold text-purple-700">88</Text></View>
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-900 text-[15px] mb-0.5 max-w-[150px]">Avocado Toast with Fried Egg</Text>
                                    <Text className="text-gray-400 text-xs font-medium">12.48 PM</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <Text className="font-bold text-gray-900 text-sm">+{data.name === 'Calories' ? '577' : data.name === 'Fat' ? '26,8' : '186,7'}{data.unit}</Text>
                                <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>

                        {/* Mock Entry 2 */}
                        <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center justify-between" style={styles.shadow}>
                            <View className="flex-row items-center gap-4">
                                <View className="relative">
                                    <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text className="text-2xl">☕️</Text></View>
                                    <View className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md border bg-blue-50 border-blue-200"><Text className="text-[10px] font-bold text-blue-700">61</Text></View>
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-900 text-[15px] mb-0.5">Coffee Latte</Text>
                                    <Text className="text-gray-400 text-xs font-medium">12.48 PM</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <Text className="font-bold text-gray-900 text-sm">+{data.name === 'Calories' ? '122' : data.name === 'Fat' ? '6,5' : '20'}{data.unit}</Text>
                                <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </BottomSheetScrollView>

                {/* Footer Action */}
                <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-white px-5 pt-4 pb-8">
                    {data.type === 'limit' ? (
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg flex-1 flex-row justify-center gap-2">
                                <Ionicons name="add" size={18} color="white" />
                                <Text className="text-white font-bold text-[15px]">Add 50mg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-100 py-4 rounded-full items-center flex-1 flex-row justify-center gap-2">
                                <Ionicons name="add" size={18} color="#4B5563" />
                                <Text className="text-gray-700 font-bold text-[15px]">Add custom</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg flex-row justify-center gap-2">
                            <Ionicons name="add" size={18} color="white" />
                            <Text className="text-white font-bold text-base">Add custom</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({ shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 } });