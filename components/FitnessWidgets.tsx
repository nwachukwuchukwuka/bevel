import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

// Mock graphic for the bar chart behind the heart rate
const Bar = ({ height, color }: { height: string; color: string }) => (
    <View className={`w-3 rounded-full ${height} ${color}`} />
);

export const FitnessWidgets = () => {
    return (
        <View className="w-full gap-4 mt-8">
            {/* --- Heart Rate Card --- */}
            <View className="bg-white/40 border border-white/50 rounded-3xl p-4 shadow-sm backdrop-blur-md">
                {/* Graph Background Mockup */}
                <View className="absolute inset-0 flex-row justify-between items-center px-6 opacity-30">
                    {/* Generating random bars to mimic the background graph */}
                    {['h-8', 'h-12', 'h-16', 'h-10', 'h-20', 'h-14', 'h-8', 'h-12'].map((h, i) => (
                        <View key={i} className={`w-3 rounded-full bg-orange-400 ${h}`} />
                    ))}
                </View>

                {/* Floating Heart Rate Pill */}
                <View className="items-center mb-6 mt-2">

                    <LinearGradient
                        colors={['#F69133', '#F37825']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 24,
                            paddingVertical: 8,
                            borderRadius: 999,
                            gap: 8,
                            shadowColor: '#000',
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Ionicons name="heart" size={18} color="white" />
                        <Text className="text-white font-bold text-lg">123 BPM</Text>
                    </LinearGradient>
                </View>

                {/* Timer Display */}
                <View className="flex-row justify-center items-center gap-1">
                    <TimerDigit digit="0" />
                    <TimerDigit digit="0" />
                    <Text className="text-2xl font-bold text-neutral-400 mx-1">:</Text>
                    <TimerDigit digit="0" textClass="text-black" />
                    <TimerDigit digit="8" textClass="text-black" />
                    <Text className="text-2xl font-bold text-neutral-400 mx-1">:</Text>
                    <TimerDigit digit="5" textClass="text-black" />
                    <View className="relative">
                        <TimerDigit digit="3" textClass="text-neutral-400" />
                        <View className="absolute inset-0 bg-white/50" />
                    </View>
                </View>
            </View>

            {/* --- Bottom Row Grid --- */}
            <View className="flex-row gap-4">

                {/* Deadlift Widget */}
                <View className="flex-1 bg-white/60 border border-white/50 rounded-3xl p-4 justify-between">
                    <View className="flex-row gap-3">
                        <View className="bg-white rounded-xl p-2 items-center justify-center h-12 w-12 shadow-sm">
                            <Ionicons name="body" size={20} color="black" />
                        </View>
                        <View>
                            <Text className="font-bold text-neutral-800 text-base">Deadlift</Text>
                            <Text className="text-xs text-neutral-500">Barbell</Text>
                            <Text className="text-xs text-neutral-500">186 lb x 5</Text>
                        </View>
                    </View>

                    <View className="gap-2 mt-4">
                        <View className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden flex-row">
                            <View className="w-1/3 bg-neutral-600 h-full" />
                            <View className="w-1/3 border-l border-white bg-neutral-200 h-full" />
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-medium text-neutral-600 font-mono">00:19</Text>
                            <View className="flex-row gap-2">
                                <Ionicons name="stop" size={16} color="#404040" />
                                <Ionicons name="play-forward" size={16} color="#404040" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Map / Cardio Widget */}
                <View className="flex-1 bg-white/60 border border-white/50 rounded-3xl p-2 relative overflow-hidden h-36">
                    {/* Mock Map Lines */}
                    <View className="absolute inset-0 opacity-40">
                        <SvgLinePath />
                    </View>

                    <View className="absolute bottom-2 left-2 right-2">
                        <LinearGradient
                            colors={['#FF9A5A', '#FF7D36']}
                            style={{
                                borderRadius: 16,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 2,
                            }}
                        >
                            <Text className="text-[10px] text-white font-medium">Cardio load</Text>
                            <Text className="text-white font-bold text-lg">2.63</Text>
                        </LinearGradient>
                    </View>

                    {/* Map Dot Indicator */}
                    <View className="absolute top-4 right-4 bg-white/80 p-1 rounded-full border border-orange-400">
                        <View className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const TimerDigit = ({ digit, textClass = "text-neutral-300" }: { digit: string, textClass?: string }) => (
    <View className="bg-white/70 px-2 py-1 rounded-md">
        <Text className={`text-2xl font-bold font-mono ${textClass}`}>{digit}</Text>
    </View>
);

// Simple SVG path mock for the map background using Views because I can't use raw SVG string comfortably here
const SvgLinePath = () => (
    <View className="w-full h-full relative">
        <View className="absolute top-8 left-0 w-full h-0.5 bg-neutral-300 transform rotate-12" />
        <View className="absolute top-12 left-2 w-16 h-16 border-t-2 border-r-2 border-neutral-300 rounded-tr-full" />
        <Ionicons name="bicycle" size={24} color="#F37825" style={{ position: 'absolute', top: 50, left: 30 }} />
    </View>
);