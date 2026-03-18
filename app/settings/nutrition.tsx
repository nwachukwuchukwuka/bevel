import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionScreen() {
    const router = useRouter();
    const [toggles, setToggles] = useState({ enabled: true, trackGoals: true, glucose: false, appleHealth: true, macros: true, micros: true });

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB] pt-4">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Nutrition</Text>
                <View className="w-8" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Visibility</Text>

                {/* Feature Graphic Mock */}
                <View className="bg-gray-100 rounded-[24px] items-center justify-center p-6 mb-4 h-48 overflow-hidden">
                    <View className="w-full bg-white rounded-xl shadow-md p-4 opacity-50 absolute top-4">
                        <View className="w-12 h-12 border-4 border-blue-100 rounded-full border-t-blue-500 absolute top-4 left-4" />
                        <View className="ml-16 gap-1 mt-4 flex-row">
                            <View className="w-3 h-3 bg-yellow-400 rounded-sm" /><View className="w-3 h-3 bg-yellow-400 rounded-sm" /><View className="w-3 h-3 bg-pink-400 rounded-sm" />
                        </View>
                    </View>
                    <View className="w-full bg-white rounded-full shadow-lg h-12 absolute bottom-4 flex-row items-center justify-around px-4">
                        <Ionicons name="home" size={16} color="#111827" />
                        <Ionicons name="book" size={16} color="#D1D5DB" />
                        <View className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center -mt-4 bg-white shadow-sm"><Ionicons name="add" size={20} color="#111827" /></View>
                        <Ionicons name="walk" size={16} color="#D1D5DB" />
                        <Ionicons name="heart" size={16} color="#D1D5DB" />
                    </View>
                </View>

                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-2">
                    <TouchableOpacity onPress={() => setToggles({ ...toggles, enabled: true })} className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Enabled</Text>
                        {toggles.enabled && <Ionicons name="checkmark" size={20} color="#111827" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggles({ ...toggles, enabled: false })} className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-bold text-gray-400">Disabled</Text>
                        {!toggles.enabled && <Ionicons name="checkmark" size={20} color="#111827" />}
                    </TouchableOpacity>
                </View>
                <Text className="text-[11px] text-gray-500 leading-4 mb-8 ml-1">Hiding the Nutrition feature will disable all related features and UI.</Text>

                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Goals</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 flex-row justify-between items-center p-5 mb-8">
                    <View className="flex-1 pr-4">
                        <Text className="text-[15px] font-bold text-gray-900 mb-1">Track goals</Text>
                        <Text className="text-[12px] text-gray-500 leading-4">Set and monitor your calorie, macro, and nutrient targets.</Text>
                    </View>
                    <Switch value={toggles.trackGoals} onValueChange={(v) => setToggles({ ...toggles, trackGoals: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                </View>

                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Glucose</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 flex-row justify-between items-center p-5 mb-2">
                    <View className="flex-1 pr-4">
                        <Text className="text-[15px] font-bold text-gray-900 mb-1">Track glucose</Text>
                        <Text className="text-[12px] text-gray-500 leading-4">Incorporate glucose tracking into your overall nutrition score.</Text>
                    </View>
                    <Switch value={toggles.glucose} onValueChange={(v) => setToggles({ ...toggles, glucose: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                </View>
                <Text className="text-[11px] text-gray-500 leading-4 mb-8 ml-1">Your Nutrition Score will be affected by whether glucose tracking is enabled.</Text>

                <Text className="text-[14px] font-bold text-gray-900 mb-2 ml-1">Apple Health</Text>
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-6">
                    <View className="p-5 border-b border-gray-50 flex-row justify-between items-center">
                        <View className="flex-1 pr-4">
                            <Text className="text-[15px] font-bold text-gray-900 mb-1">Write to Apple Health</Text>
                            <Text className="text-[12px] text-gray-500 leading-4">Sync data from food logs created in Bevel with Apple Health.</Text>
                        </View>
                        <Switch value={toggles.appleHealth} onValueChange={(v) => setToggles({ ...toggles, appleHealth: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                    </View>
                    <View className="p-5 border-b border-gray-50 flex-row justify-between items-center">
                        <View className="flex-1 pr-4">
                            <Text className="text-[15px] font-bold text-gray-900 mb-1">Macronutrients</Text>
                            <Text className="text-[12px] text-gray-400">Carbs, protein, fat, and calories</Text>
                        </View>
                        <Switch value={toggles.macros} onValueChange={(v) => setToggles({ ...toggles, macros: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} disabled={!toggles.appleHealth} />
                    </View>
                    <View className="p-5 flex-row justify-between items-center">
                        <View className="flex-1 pr-4">
                            <Text className="text-[15px] font-bold text-gray-900 mb-1">Micronutrients</Text>
                            <Text className="text-[12px] text-gray-400">Vitamins, minerals, and other</Text>
                        </View>
                        <Switch value={toggles.micros} onValueChange={(v) => setToggles({ ...toggles, micros: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} disabled={!toggles.appleHealth} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}