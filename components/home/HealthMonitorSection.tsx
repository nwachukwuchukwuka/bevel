import { HEALTH_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const HealthMonitorSection = () => {
    return (
        <View>

            <View className="flex-row flex-wrap justify-between gap-y-3">
                {HEALTH_METRICS.map((metric) => {
                    const isNormal = metric.statusType === 'normal';
                    const isLowBlue = metric.statusType === 'low-blue';
                    const isLowOrange = metric.statusType === 'low-orange';

                    // Determine colors based on status
                    const statusColor = isNormal ? '#22C55E' : isLowBlue ? '#3B82F6' : '#F97316';
                    const statusIcon = isNormal ? 'checkmark-circle' : 'arrow-down-circle';

                    return (
                        <View key={metric.id} className="w-[48%] bg-white rounded-3xl p-4 shadow-sm shadow-black/5 border border-gray-50 flex-row justify-between">

                            {/* Left Content */}
                            <View className="flex-1 gap-2">
                                <View className="flex-row items-center gap-1.5">
                                    <Ionicons name={metric.icon as any} size={14} color="#D1D5DB" />
                                    <Text className="text-[13px] font-bold text-gray-500">{metric.title}</Text>
                                </View>

                                <View className="flex-row items-baseline gap-1 mt-1">
                                    <Text className="text-[22px] font-bold text-gray-900 tracking-tight">{metric.value}</Text>
                                    <Text className="text-[11px] font-semibold text-gray-400">{metric.unit}</Text>
                                </View>

                                <View className="flex-row items-center gap-1 mt-1">
                                    <Ionicons name={statusIcon} size={14} color={statusColor} />
                                    <Text style={{ color: statusColor }} className="text-[12px] font-bold">
                                        {metric.status}
                                    </Text>
                                </View>
                            </View>

                            {/* Right Vertical Gauge */}
                            <View className="w-2.5 h-[72px] bg-gray-100 rounded-full justify-end items-center relative">
                                <View
                                    className="w-full rounded-full absolute bottom-0"
                                    style={{ height: `${metric.gaugeVal}%`, backgroundColor: statusColor, opacity: 0.6 }}
                                />
                                <View
                                    className="w-4 h-4 bg-white border border-gray-200 rounded-full absolute shadow-sm"
                                    style={{ bottom: `${metric.gaugeVal}%`, transform: [{ translateY: 8 }] }}
                                />
                            </View>

                        </View>
                    );
                })}
            </View>
        </View>
    );
};