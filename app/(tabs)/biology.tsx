import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MetricNodeProps = {
    category: string;
    label: string;
    value: string;
    unit: string;
    status: string;
    statusColor: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
    isLast?: boolean;
};

const MetricNode = ({ category, label, value, unit, status, statusColor, icon, onPress, isLast = false }: MetricNodeProps) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <View className="flex-row items-stretch min-h-[120px]">
            {/* Timeline Axis Column */}
            <View className="w-14 items-center">
                {!isLast && <View className="w-[1px] h-full bg-[#1E293B] absolute left-7" />}
                <View className="w-4 h-4 rounded-full bg-[#090D16] border border-[#4DB9F2] z-10 mt-6" />
            </View>

            {/* Metric Node Card */}
            <Container
                onPress={onPress}
                activeOpacity={0.8}
                className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 mb-4 ml-1 mr-5 flex-row justify-between items-center"
            >
                <View className="flex-1 pr-4 gap-1">
                    <Text className="text-xs text-slate-500 font-semibold">{category}</Text>
                    <Text className="text-base font-bold text-white">{label}</Text>

                    <View className="flex-row items-center gap-1.5 mt-2">
                        <View className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                        <Text className="text-xs font-semibold text-slate-400">{status}</Text>
                    </View>
                </View>

                <View className="items-end gap-1">
                    <View className="w-8 h-8 rounded-lg bg-[#1E293B] items-center justify-center border border-[#2C3748] mb-1">
                        <Ionicons name={icon} size={16} color="#4DB9F2" />
                    </View>
                    <Text className="text-2xl font-bold text-white">{value}</Text>
                    <Text className="text-xs text-slate-500 font-medium">{unit}</Text>
                </View>
            </Container>
        </View>
    );
};

export default function BiologyScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#090D16]">
            <SafeAreaView edges={['top']} className="flex-1">

                {/* Custom Tech Header */}
                <View className="px-6 pt-4 pb">
                    <Text className="text-2xl font-bold text-slate-100">Biological markers</Text>
                    <Text className="text-xs text-slate-400 mt-1">Physiological metrics index timeline</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>

                    <MetricNode
                        category="Autonomic nervous system"
                        label="Heart rate variability"
                        value="65.2"
                        unit="ms"
                        status="Stable"
                        statusColor="bg-emerald-500"
                        icon="pulse"
                    />

                    <MetricNode
                        category="Autonomic nervous system"
                        label="Resting heart rate"
                        value="57.9"
                        unit="bpm"
                        status="Fair"
                        statusColor="bg-amber-500"
                        icon="heart-outline"
                    />

                    <MetricNode
                        category="Cardiovascular fitness"
                        label="Vo2 max index"
                        value="29.9"
                        unit="score"
                        status="Fair"
                        statusColor="bg-amber-500"
                        icon="fitness-outline"
                        onPress={() => router.push('/biology/vo2-max')}
                    />

                    <MetricNode
                        category="Body composition"
                        label="Total body weight"
                        value="63.1"
                        unit="kg"
                        status="Increasing"
                        statusColor="bg-slate-500"
                        icon="scale-outline"
                        onPress={() => router.push('/biology/weight')}
                    />

                    <MetricNode
                        category="Body composition"
                        label="Lean body mass"
                        value="45.4"
                        unit="kg"
                        status="Increasing"
                        statusColor="bg-slate-500"
                        icon="body-outline"
                    />

                    <MetricNode
                        category="Body composition"
                        label="Body fat percentage"
                        value="26.9"
                        unit="%"
                        status="Optimal"
                        statusColor="bg-emerald-500"
                        icon="water-outline"
                        isLast={true}
                    />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}