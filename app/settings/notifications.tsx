import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
    const router = useRouter();
    const [master, setMaster] = useState(false);
    const [toggles, setToggles] = useState({ summary: true, activity: true, bedtime: true, strain: true, eod: true });

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-2 mb-4 border-b border-gray-100 pb-4">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Notifications</Text>
                <View className="w-6" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                {/* Master Toggle */}
                <View className="bg-white rounded-[20px] p-5 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between mb-8">
                    <View className="flex-1 pr-4">
                        <Text className="text-[16px] font-bold text-gray-900 mb-1">Allow notifications</Text>
                        <Text className="text-[13px] text-gray-500">Enable push notifications.</Text>
                    </View>
                    <Switch value={master} onValueChange={setMaster} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                </View>

                {/* Sub-toggles wrapper, disabled if master is false */}
                <View style={{ opacity: master ? 1 : 0.5 }} pointerEvents={master ? 'auto' : 'none'}>
                    <Text className="text-[14px] font-bold text-gray-900 mb-4 ml-1">General</Text>
                    <View className="gap-3 mb-8">
                        {[
                            { k: 'summary', t: 'Daily Summary', d: 'Receive a summary of your Sleep and Recovery every morning.' },
                            { k: 'activity', t: 'Activity completed', d: 'Receive a notification when an exercise is logged to Apple Health.' },
                            { k: 'bedtime', t: 'Target bedtime reminder', d: 'Set a reminder to start winding down.' },
                            { k: 'strain', t: 'Target strain reached', d: 'Get a notification when your target strain has been reached for the day.' }
                        ].map((item) => (
                            <View key={item.k} className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between">
                                <View className="flex-1 pr-4">
                                    <Text className="text-[15px] font-bold text-gray-900 mb-1">{item.t}</Text>
                                    <Text className="text-[12px] text-gray-500 leading-4">{item.d}</Text>
                                </View>
                                <Switch value={(toggles as any)[item.k]} onValueChange={(v) => setToggles({ ...toggles, [item.k]: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                            </View>
                        ))}
                    </View>

                    <Text className="text-[14px] font-bold text-gray-900 mb-4 ml-1">Journal</Text>
                    <View className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center justify-between">
                        <View className="flex-1 pr-4">
                            <Text className="text-[15px] font-bold text-gray-900 mb-1">End of day</Text>
                            <Text className="text-[12px] text-gray-500 leading-4">Receive a reminder to update today's journal.</Text>
                        </View>
                        <Switch value={toggles.eod} onValueChange={(v) => setToggles({ ...toggles, eod: v })} trackColor={{ true: '#34D399', false: '#E5E7EB' }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}