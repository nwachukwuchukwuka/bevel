import { HEALTH_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const HealthMonitorSection = () => {
    return (
        <View className="bg-[#151E33] rounded-[24px] p-5 border border-slate-800/80 gap-4">
            {HEALTH_METRICS.map((metric, idx) => {
                const isNormal = metric.statusType === 'normal';
                const isLowBlue = metric.statusType === 'low-blue';

                // Determine colors based on status
                const badgeBgColor = isNormal ? 'bg-emerald-950/30 border-emerald-900/30' : isLowBlue ? 'bg-blue-950/30 border-blue-900/30' : 'bg-orange-950/30 border-orange-900/30';
                const textColor = isNormal ? 'text-emerald-400' : isLowBlue ? 'text-blue-400' : 'text-orange-400';

                return (
                    <View key={metric.id} className="flex-row items-center justify-between">
                        {/* Left: Icon & Label */}
                        <View className="flex-row items-center flex-1 mr-4">
                            <View className="w-8 h-8 bg-slate-800/60 rounded-xl items-center justify-center border border-slate-700/20">
                                <Ionicons name={metric.icon as any} size={14} color="#94A3B8" />
                            </View>
                            <Text className="text-sm font-semibold text-slate-300 ml-3">{metric.title}</Text>
                        </View>

                        {/* Center: Value & Unit */}
                        <View className="flex-row items-baseline mr-4">
                            <Text className="text-base font-bold text-slate-100">{metric.value}</Text>
                            {metric.unit ? (
                                <Text className="text-[10px] font-semibold text-slate-500 ml-1">{metric.unit}</Text>
                            ) : null}
                        </View>

                        {/* Right: Status Badge */}
                        <View className={`px-2.5 py-1 rounded-full border ${badgeBgColor}`}>
                            <Text className={`text-[10px] font-bold ${textColor}`}>
                                {metric.status}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};