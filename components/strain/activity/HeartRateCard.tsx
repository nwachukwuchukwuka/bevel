import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const ZONES = [
    { z: 0, duration: '0:00:10', pct: 0, color: '#94A3B8' },
    { z: 1, duration: '0:00:48', pct: 2, color: '#3B82F6' },
    { z: 2, duration: '0:30:32', pct: 68, color: '#F59E0B' },
    { z: 3, duration: '0:13:41', pct: 30, color: '#F97316' },
    { z: 4, duration: '0:00:00', pct: 0, color: '#EF4444' },
    { z: 5, duration: '0:00:00', pct: 0, color: '#A855F7' },
];

export const HeartRateCard = () => {
    return (
        <View className="mb-8">
            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">

                {/* Header Block */}
                <View className="flex-row items-center justify-between mb-8 border-b border-[#1E293B] pb-4">
                    <Text className="text-lg font-bold text-slate-100">Heart Rate</Text>
                    <View className="bg-[#090D16] border border-[#1E293B] px-3 py-1.5 rounded-lg flex-row items-center gap-2">
                        <View className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                        <Text className="text-xs font-bold text-slate-300">Zone 2</Text>
                    </View>
                </View>

                {/* Telemetry Display */}
                <View className="mb-6 flex-row items-end gap-2">
                    <Text className="text-5xl font-bold text-white">128</Text>
                    <View>
                        <Text className="text-base font-bold text-slate-500 mb-1">bpm</Text>
                        <Text className="text-[10px] font-semibold text-slate-400">Average HR</Text>
                    </View>
                </View>

                {/* Technical Chart Matrix */}
                <View className="h-40 w-full mb-8 relative">

                    <View className="absolute inset-0 justify-between py-2 border-l border-b border-[#1E293B]">
                        <View className="w-full h-[1px] bg-[#1E293B] border-dashed border-t border-[#2D3748]" />
                        <View className="w-full h-[1px] bg-[#1E293B] border-dashed border-t border-[#2D3748]" />
                        <View className="w-full h-[1px] bg-[#1E293B] border-dashed border-t border-[#2D3748]" />
                    </View>

                    <Text className="absolute right-0 top-0 text-[10px] text-slate-500 font-bold bg-[#151E33] pl-1">145</Text>
                    <Text className="absolute right-0 bottom-6 text-[10px] text-slate-500 font-bold bg-[#151E33] pl-1">92</Text>

                    <View className="h-32 w-full flex-row items-end gap-[1px] pt-4 pr-6 pl-1">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <View
                                key={i}
                                className="flex-1 bg-[#F59E0B] rounded-t-[1px]"
                                style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                            />
                        ))}
                    </View>

                    <View className="flex-row justify-between w-full mt-2 pl-1 pr-6">
                        <Text className="text-[10px] font-semibold text-slate-400">8.22 AM</Text>
                        <Text className="text-[10px] font-semibold text-slate-400">8.45 AM</Text>
                        <Text className="text-[10px] font-semibold text-slate-400">9.08 AM</Text>
                    </View>
                </View>

                {/* Scale Spectrum */}
                <View className="mb-10 bg-[#090D16] border border-[#1E293B] p-4 rounded-2xl">
                    <View className="flex-row justify-between mb-2">
                        {['Z0', 'Z1', 'Z2', 'Z3', 'Z4', 'Z5'].map((z, i) => (
                            <Text key={z} className={`text-[10px] font-bold ${i === 2 ? 'text-[#F59E0B]' :
                                    i === 1 ? 'text-[#3B82F6]' :
                                        i === 3 ? 'text-[#F97316]' :
                                            i === 4 ? 'text-[#EF4444]' :
                                                i === 5 ? 'text-[#A855F7]' : 'text-slate-500'
                                }`}>{z}</Text>
                        ))}
                    </View>
                    <LinearGradient
                        colors={['#1E293B', '#3B82F6', '#F59E0B', '#F97316', '#EF4444', '#A855F7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="h-1.5 rounded-full w-full relative mb-2"
                    >
                        <View className="absolute left-[40%] -top-1.5 w-4 h-4 rounded-full border-2 border-white bg-[#090D16]" />
                    </LinearGradient>
                    <View className="flex-row justify-between">
                        {['0', '95', '115', '133', '152', '171+'].map((val, idx) => (
                            <Text key={idx} className="text-[9px] font-bold text-slate-500">{val}</Text>
                        ))}
                    </View>
                </View>

                {/* Server-Rack Data List */}
                <View className="flex-col gap-3">
                    <View className="flex-row justify-between mb-2 px-2">
                        <Text className="text-[10px] font-semibold text-slate-500 w-[15%]">Zone</Text>
                        <Text className="text-[10px] font-semibold text-slate-500 w-[25%]">Duration</Text>
                        <Text className="text-[10px] font-semibold text-slate-500 w-[10%] text-right">%</Text>
                    </View>

                    {ZONES.map((zone) => (
                        <View key={zone.z} className="flex-row items-center justify-between bg-[#1E293B40] border border-[#1E293B] rounded-xl px-4 py-3">
                            <Text className="text-sm font-bold text-white w-[15%]">{zone.z}</Text>
                            <Text className="text-sm font-semibold text-slate-300 w-[25%]">{zone.duration}</Text>

                            <View className="flex-1 px-4 justify-center">
                                <View
                                    className="h-1.5 rounded-full"
                                    style={{
                                        width: `${Math.max(zone.pct, 2)}%`,
                                        backgroundColor: zone.color,
                                        opacity: zone.pct === 0 ? 0.2 : 1
                                    }}
                                />
                            </View>

                            <Text className={`text-xs font-bold w-[10%] text-right ${zone.pct > 0 ? 'text-white' : 'text-slate-500'}`}>
                                {zone.pct}%
                            </Text>
                        </View>
                    ))}
                </View>

            </View>
        </View>
    );
};