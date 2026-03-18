import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LogDetailsScreen() {
    const router = useRouter();
    const infoSheetRef = useRef<BottomSheetModal>(null);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>

                {/* Header Container with fixed top area */}
                <View className="bg-white pb-2 rounded-b-3xl z-10" style={styles.shadow}>
                    <View className="w-full items-center pt-3 pb-2"><View className="w-10 h-1.5 bg-gray-300 rounded-full" /></View>
                    <View className="flex-row items-center justify-between px-5 py-2">
                        <View className="flex-row items-center gap-3">
                            <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                                <Text className="text-2xl">🥑</Text>
                            </View>
                            <View>
                                <Text className="font-bold text-gray-900 text-[17px] mb-0.5 max-w-[200px]">Avocado Toast with Fried Egg</Text>
                                <Text className="text-gray-500 font-semibold text-xs">Common</Text>
                                <Text className="text-gray-400 text-[11px] mt-0.5">14 September 2025 at 2.34 PM</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                            <Ionicons name="ellipsis-horizontal" size={16} color="#4B5563" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>

                    {/* Score Card */}
                    <View className="bg-white rounded-3xl p-5 flex-row justify-between items-center mb-4 border border-gray-50" style={styles.shadow}>
                        <Text className="font-bold text-gray-900 text-base">Nutrition Score</Text>
                        <View className="flex-row items-center gap-3">
                            <Text className="font-bold text-gray-900 text-lg">63/100</Text>
                            {/* Dotted Circle Mock */}
                            <View className="w-8 h-8 rounded-full border-2 border-dashed border-purple-300 relative">
                                <View className="absolute inset-0 border-2 border-purple-500 rounded-full border-r-transparent border-b-transparent -rotate-45" />
                            </View>
                        </View>
                    </View>

                    {/* Macros Grid */}
                    <View className="flex-row flex-wrap justify-between gap-y-3 mb-4">
                        <GridItem icon="flame" value="279 kcal" label="Calories" />
                        <GridItem icon="water" value="17,8g" label="Fat" />
                        <GridItem icon="leaf" value="20,4g" label="Carbs" />
                        <GridItem icon="nutrition" value="10,1g" label="Protein" />
                    </View>

                    {/* Serving Info */}
                    <View className="bg-white rounded-2xl p-4 flex-row items-center gap-4 mb-4 border border-gray-50" style={styles.shadow}>
                        <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"><Ionicons name="pie-chart" size={20} color="#D1D5DB" /></View>
                        <View>
                            <Text className="font-bold text-gray-900 text-[15px]">1 serving</Text>
                            <Text className="text-gray-400 text-xs">Serving Size (1 serving)</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between mb-8 border border-gray-50" style={styles.shadow}>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="information-circle-outline" size={18} color="#9CA3AF" />
                            <Text className="font-bold text-gray-700 text-[15px]">Nutrition Facts</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Food Quality Contributors */}
                    <Text className="font-bold text-gray-900 text-lg mb-3">Food Quality</Text>
                    <View className="bg-white rounded-3xl p-5 mb-8 border border-gray-50" style={styles.shadow}>
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="font-bold text-gray-800 text-[15px]">Food Quality Contributors</Text>
                            <TouchableOpacity onPress={() => infoSheetRef.current?.present()}>
                                <Ionicons name="information-circle-outline" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-6">
                            {/* Bar 1 */}
                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <View className="flex-row items-center gap-2"><Ionicons name="pie-chart" size={14} color="#9CA3AF" /><Text className="font-bold text-gray-900 text-sm">Macro Balance</Text></View>
                                    <Text className="font-bold text-purple-500 text-sm">84/100</Text>
                                </View>
                                <View className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                                    <LinearGradient colors={['#D8B4FE', '#818CF8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-full w-[84%]" />
                                </View>
                            </View>

                            {/* Bar 2 */}
                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <View className="flex-row items-center gap-2"><Ionicons name="medical" size={14} color="#9CA3AF" /><Text className="font-bold text-gray-900 text-sm">Sodium</Text></View>
                                    <Text className="font-bold text-pink-500 text-sm">1/100</Text>
                                </View>
                                <View className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                                    <LinearGradient colors={['#F472B6', '#F472B6']} className="h-full w-[10%]" />
                                </View>
                            </View>

                            {/* Bar 3 */}
                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <View className="flex-row items-center gap-2"><Ionicons name="cube" size={14} color="#9CA3AF" /><Text className="font-bold text-gray-900 text-sm">Added Sugars</Text></View>
                                    <Text className="font-bold text-gray-400 text-sm">—</Text>
                                </View>
                                <View className="h-1.5 bg-gray-100 rounded-full w-full" />
                            </View>
                        </View>
                    </View>

                    {/* Ingredients */}
                    <Text className="font-bold text-gray-900 text-lg mb-3">Ingredients</Text>
                    <View className="gap-3 mb-8">
                        {[{ icon: '🍳', name: 'Egg Fried', amt: '1 egg' }, { icon: '🥑', name: 'Avocado Toast', amt: '1 toast' }].map((ing, i) => (
                            <View key={i} className="bg-white rounded-2xl p-3 border border-gray-50 flex-row items-center gap-3" style={styles.shadow}>
                                <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center"><Text>{ing.icon}</Text></View>
                                <View>
                                    <View className="flex-row items-center gap-1"><Text className="font-bold text-gray-900">{ing.name}</Text><Ionicons name="checkmark-circle" size={12} color="#3B82F6" /></View>
                                    <Text className="text-gray-400 text-xs">{ing.amt}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="h-[1px] bg-gray-200 w-full mb-4" />
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-400 font-medium text-xs">Food data source</Text>
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="cube" size={14} color="#111827" />
                            <Text className="font-bold text-gray-900 text-xs">Bevel Database</Text>
                        </View>
                    </View>

                </ScrollView>

                {/* Floating "Quick & Easy Fuel" Button */}
                <View className="absolute bottom-6 w-full items-center justify-center z-50">
                    <View className="absolute inset-0 bg-white/50 blur-3xl -z-10" />
                    <TouchableOpacity className="bg-white rounded-full px-6 py-3.5 flex-row items-center gap-2 shadow-xl shadow-orange-200 border border-gray-50">
                        <View className="bg-yellow-100 rounded-full p-1"><Text className="text-[10px]">🍳</Text></View>
                        <Text className="font-bold text-gray-900">Quick & Easy Fuel</Text>
                        <Ionicons name="chevron-up" size={16} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* Info Bottom Sheet */}
                <BottomSheetModal
                    ref={infoSheetRef}
                    snapPoints={['100%']}
                    backdropComponent={p => <BottomSheetBackdrop {...p} opacity={0.4} />}
                    handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
                    backgroundStyle={{ backgroundColor: '#F9FAFB' }}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView className="flex-1 pt-2">
                        <View className="items-center px-6 pb-6">
                            {/* Graphic Mock */}
                            <View className="h-32 justify-end mb-4">
                                <Ionicons name="ribbon" size={100} color="#E0E7FF" style={{ shadowColor: '#818CF8', shadowOpacity: 0.3, shadowRadius: 10 }} />
                            </View>

                            <Text className="text-left w-full text-gray-500 font-medium text-xs mb-2">Nutrition</Text>
                            <Text className="text-xl font-bold text-gray-900 w-full mb-2">Food Quality Contributors</Text>
                            <Text className="text-gray-500 text-[13px] leading-5 w-full mb-6">
                                Key factors that contribute to your Food Quality score to help you make healthier choices.
                            </Text>

                            <ScrollView className="w-full gap-4">
                                <InfoCard icon="pie-chart" color="#818CF8" title="Macro Balance." desc="The ratio of macronutrients—carbohydrates, proteins, and fats—in your diet." />
                                <InfoCard icon="medical" color="#34D399" title="Sodium." desc="The amount of sodium in your food. Excessive sodium intake can lead to high blood pressure and other health problems." />
                                <InfoCard icon="cube" color="#F87171" title="Added Sugars." desc="The amount of added sugars in your food. High intake can contribute to obesity and other health problems." />
                            </ScrollView>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

// Sub Components
const GridItem = ({ icon, value, label }: any) => (
    <View className="w-[48%] bg-white rounded-2xl p-4 border border-gray-50 flex-row items-center gap-3" style={styles.shadow}>
        <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"><Ionicons name={icon} size={20} color="#D1D5DB" /></View>
        <View>
            <Text className="font-bold text-gray-900 text-[15px]">{value}</Text>
            <Text className="text-gray-400 text-xs">{label}</Text>
        </View>
    </View>
);

const InfoCard = ({ icon, color, title, desc }: any) => (
    <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-3" style={styles.shadow}>
        <Ionicons name={icon} size={18} color={color} className="mb-2" />
        <Text className="text-gray-600 text-[13.5px] leading-5">
            <Text className="font-bold text-gray-900">{title} </Text>
            {desc}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    }
});