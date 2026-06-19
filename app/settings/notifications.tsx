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
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            {/* Header: custom clean layout, border-b border-slate-800/80 */}
            <View className="flex-row items-center justify-between px-5 py-4 ">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-slate-800/80 rounded-xl items-center justify-center"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="text-[17px] font-bold text-slate-100">Notification settings</Text>
                <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60 }}>

                {/* Master Switch - Modern Glassmorphic outline card */}
                <View className="bg-[#151E33] rounded-2xl p-5 border border-slate-800 flex-row items-center justify-between mb-8">
                    <View className="flex-1 pr-6">
                        <View className="flex-row items-center gap-2 mb-1">
                            <View className="w-5 h-5 rounded-md bg-indigo-500/20 items-center justify-center">
                                <Ionicons name="notifications" size={12} color="#818CF8" />
                            </View>
                            <Text className="text-[15px] font-bold text-slate-100">Push notifications</Text>
                        </View>
                        <Text className="text-[12px] text-slate-400">Receive alerts, reminders, and daily summaries directly on your device.</Text>
                    </View>
                    <Switch
                        value={master}
                        onValueChange={setMaster}
                        trackColor={{ true: '#818CF8', false: '#334155' }}
                        thumbColor={master ? '#FFFFFF' : '#94A3B8'}
                    />
                </View>

                {/* Sub-toggles Section */}
                <View style={{ opacity: master ? 1 : 0.4 }} pointerEvents={master ? 'auto' : 'none'}>
                    <View className="flex-row items-center gap-2 mb-4 ml-1">
                        <Text className="text-[13px] font-bold text-slate-400">General alerts</Text>
                        <View className="flex-1 h-[1px] bg-slate-800/80" />
                    </View>

                    <View className="gap-3 mb-8">
                        {[
                            { k: 'summary', t: 'Daily Summary', d: 'Receive a summary of your Sleep and Recovery every morning.', icon: 'calendar-outline', color: '#38BDF8' },
                            { k: 'activity', t: 'Activity completed', d: 'Receive a notification when an exercise is logged to Apple Health.', icon: 'fitness-outline', color: '#34D399' },
                            { k: 'bedtime', t: 'Target bedtime reminder', d: 'Set a reminder to start winding down.', icon: 'moon-outline', color: '#A78BFA' },
                            { k: 'strain', t: 'Target strain reached', d: 'Get a notification when your target strain has been reached for the day.', icon: 'flash-outline', color: '#FBBF24' }
                        ].map((item) => (
                            <View key={item.k} className="bg-[#151E33] rounded-2xl p-4 border border-slate-800/60 flex-row items-center justify-between">
                                <View className="flex-1 pr-6 flex-row gap-3">
                                    <View className="w-8 h-8 rounded-lg items-center justify-center bg-slate-800/60 border border-slate-700/30 self-start mt-0.5">
                                        <Ionicons name={item.icon as any} size={15} color={item.color} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-[14px] font-semibold text-slate-200 mb-1">{item.t}</Text>
                                        <Text className="text-[11px] text-slate-400 leading-4">{item.d}</Text>
                                    </View>
                                </View>
                                <Switch
                                    value={(toggles as any)[item.k]}
                                    onValueChange={(v) => setToggles({ ...toggles, [item.k]: v })}
                                    trackColor={{ true: '#818CF8', false: '#334155' }}
                                    thumbColor={(toggles as any)[item.k] ? '#FFFFFF' : '#94A3B8'}
                                />
                            </View>
                        ))}
                    </View>

                    <View className="flex-row items-center gap-2 mb-4 ml-1">
                        <Text className="text-[13px] font-bold text-slate-400">Journal reminders</Text>
                        <View className="flex-1 h-[1px] bg-slate-800/80" />
                    </View>

                    <View className="bg-[#151E33] rounded-2xl p-4 border border-slate-800/60 flex-row items-center justify-between">
                        <View className="flex-1 pr-6 flex-row gap-3">
                            <View className="w-8 h-8 rounded-lg items-center justify-center bg-slate-800/60 border border-slate-700/30 self-start mt-0.5">
                                <Ionicons name="book-outline" size={15} color="#F87171" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[14px] font-semibold text-slate-200 mb-1">End of day reminder</Text>
                                <Text className="text-[11px] text-slate-400 leading-4">Receive a reminder to update today's journal before sleeping.</Text>
                            </View>
                        </View>
                        <Switch
                            value={toggles.eod}
                            onValueChange={(v) => setToggles({ ...toggles, eod: v })}
                            trackColor={{ true: '#818CF8', false: '#334155' }}
                            thumbColor={toggles.eod ? '#FFFFFF' : '#94A3B8'}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}