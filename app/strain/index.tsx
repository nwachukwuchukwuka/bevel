import { TargetStrainSheet, TargetStrainSheetRef } from '@/components/strain/TargetStrainSheet';
import { HR_ZONES, STRAIN_TRENDS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ZONE_COLORS: Record<number, string> = {
    0: '#64748B',
    1: '#38BDF8',
    2: '#FACC15',
    3: '#FB923C',
    4: '#F87171',
    5: '#C084FC',
};

export default function StrainScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const infoSheetRef = useRef<TargetStrainSheetRef>(null);

    return (
        <View style={{ flex: 1, backgroundColor: '#090D16' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 48 }}
            >
                {/* Header */}
                <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            style={{
                                width: 36, height: 36,
                                backgroundColor: '#151E33',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#1E2D4A',
                            }}
                        >
                            <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                        </TouchableOpacity>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, fontWeight: '600', color: '#F1F5F9' }}>Strain</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
                                <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B' }}>Today, 14 September</Text>
                                <Ionicons name="chevron-down" size={11} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => infoSheetRef.current?.present()}
                            style={{
                                width: 36, height: 36,
                                backgroundColor: '#151E33',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#1E2D4A',
                            }}
                        >
                            <Ionicons name="information-circle-outline" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20, gap: 16 }}>

                    {/* Strain Score Hero Card */}
                    <View style={{
                        backgroundColor: '#151E33',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#1E2D4A',
                        padding: 20,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, gap: 6 }}>
                                <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B' }}>Today's Strain</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
                                    <Text style={{ fontSize: 52, fontWeight: '700', color: '#FB923C', lineHeight: 56 }}>38</Text>
                                    <Text style={{ fontSize: 22, fontWeight: '600', color: '#FB923C', marginBottom: 6 }}>%</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FB923C' }} />
                                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#94A3B8' }}>Within normal range</Text>
                                </View>
                            </View>

                            {/* Segmented arc visual */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <View style={{
                                    width: 90, height: 90,
                                    borderRadius: 45,
                                    borderWidth: 8,
                                    borderColor: '#1E2D4A',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <View style={{
                                        position: 'absolute',
                                        width: 90, height: 90,
                                        borderRadius: 45,
                                        borderWidth: 8,
                                        borderColor: '#FB923C',
                                        borderRightColor: 'transparent',
                                        borderBottomColor: 'transparent',
                                        transform: [{ rotate: '-135deg' }],
                                    }} />
                                    <Ionicons name="flame" size={26} color="#FB923C" />
                                </View>
                            </View>
                        </View>

                        {/* Progress bar */}
                        <View style={{ marginTop: 20, gap: 6 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 11, fontWeight: '500', color: '#475569' }}>0%</Text>
                                <Text style={{ fontSize: 11, fontWeight: '500', color: '#475569' }}>100%</Text>
                            </View>
                            <View style={{ height: 6, backgroundColor: '#1E2D4A', borderRadius: 6, overflow: 'hidden' }}>
                                <View style={{ height: 6, width: '38%', backgroundColor: '#FB923C', borderRadius: 6 }} />
                            </View>
                        </View>
                    </View>

                    {/* Quick Stats Row */}
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#151E33',
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: '#1E2D4A',
                            padding: 16,
                            gap: 8,
                        }}>
                            <View style={{
                                width: 32, height: 32,
                                backgroundColor: '#0F172A',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#1E2D4A',
                            }}>
                                <Ionicons name="time-outline" size={16} color="#38BDF8" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 11, fontWeight: '500', color: '#64748B', marginBottom: 2 }}>Duration</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', color: '#F1F5F9' }}>53m</Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: '#151E33',
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: '#1E2D4A',
                            padding: 16,
                            gap: 8,
                        }}>
                            <View style={{
                                width: 32, height: 32,
                                backgroundColor: '#0F172A',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#1E2D4A',
                            }}>
                                <Ionicons name="flame-outline" size={16} color="#F87171" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 11, fontWeight: '500', color: '#64748B', marginBottom: 2 }}>Total Energy</Text>
                                <Text style={{ fontSize: 22, fontWeight: '700', color: '#F1F5F9' }}>882 <Text style={{ fontSize: 13, color: '#64748B', fontWeight: '500' }}>kCal</Text></Text>
                            </View>
                        </View>
                    </View>

                    {/* Insight Banner */}
                    <View style={{
                        backgroundColor: '#1A1708',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#2D2810',
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 12,
                    }}>
                        <View style={{
                            width: 34, height: 34,
                            backgroundColor: '#2A2208',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#3D3310',
                        }}>
                            <Ionicons name="bulb-outline" size={17} color="#FACC15" />
                        </View>
                        <View style={{ flex: 1, gap: 3 }}>
                            <Text style={{ fontSize: 13, fontWeight: '600', color: '#FACC15' }}>Efficient Morning Workout</Text>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#A89060', lineHeight: 18 }}>
                                That 45-minute Indoor Walk was a great way to start your Sunday, bringing your Strain to 38% and keeping you within your normal range.
                            </Text>
                        </View>
                    </View>

                    {/* Timeline */}
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#94A3B8' }}>Timeline</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/strain/activity/1')}
                            style={{
                                backgroundColor: '#151E33',
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: '#1E2D4A',
                                padding: 14,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <View style={{
                                    width: 44, height: 44,
                                    backgroundColor: '#1A1408',
                                    borderRadius: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#2A2208',
                                    position: 'relative',
                                }}>
                                    <Ionicons name="walk" size={22} color="#FB923C" />
                                    <View style={{
                                        position: 'absolute',
                                        bottom: -4, right: -4,
                                        backgroundColor: '#FB923C',
                                        borderRadius: 8,
                                        paddingHorizontal: 4,
                                        paddingVertical: 1,
                                        borderWidth: 1.5,
                                        borderColor: '#151E33',
                                    }}>
                                        <Text style={{ fontSize: 9, fontWeight: '700', color: '#FFF' }}>31</Text>
                                    </View>
                                </View>
                                <View style={{ gap: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#F1F5F9' }}>Indoor Walk</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#64748B' }}>14/09/25 at 8:22 AM</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={17} color="#334155" />
                        </TouchableOpacity>
                    </View>

                    {/* Heart Rate Zones */}
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#94A3B8' }}>Heart Rate Zones</Text>
                        <View style={{
                            backgroundColor: '#151E33',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#1E2D4A',
                            overflow: 'hidden',
                        }}>
                            {HR_ZONES.map((zone, idx) => (
                                <View
                                    key={zone.zone}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderBottomWidth: idx !== HR_ZONES.length - 1 ? 1 : 0,
                                        borderBottomColor: '#1E2D4A',
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                                        <View style={{
                                            width: 28, height: 28,
                                            borderRadius: 8,
                                            backgroundColor: `${ZONE_COLORS[zone.zone]}18`,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={{ fontSize: 11, fontWeight: '700', color: ZONE_COLORS[zone.zone] }}>Z{zone.zone}</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B' }}>{zone.range}</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 13,
                                        fontWeight: '600',
                                        color: zone.zone === 0 ? '#334155' : '#CBD5E1',
                                        fontVariant: ['tabular-nums'],
                                    }}>
                                        {zone.duration}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Trends */}
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#94A3B8' }}>Trends</Text>
                        <View style={{ gap: 10 }}>
                            {STRAIN_TRENDS.map((trend, idx) => (
                                <TouchableOpacity
                                    key={trend.id}
                                    onPress={() => idx === 0 ? router.push('/strain/score-details') : null}
                                    style={{
                                        backgroundColor: '#151E33',
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        borderColor: '#1E2D4A',
                                        padding: 16,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View style={{ gap: 4 }}>
                                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B' }}>{trend.title}</Text>
                                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#F1F5F9' }}>
                                            {trend.value}
                                            {trend.unit ? <Text style={{ fontSize: 14, fontWeight: '400', color: '#475569' }}> {trend.unit}</Text> : null}
                                        </Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <Ionicons
                                                name={trend.isPositive ? 'arrow-up' : 'arrow-down'}
                                                size={11}
                                                color={trend.isPositive ? '#34D399' : '#F87171'}
                                            />
                                            <Text style={{ fontSize: 11, fontWeight: '500', color: trend.isPositive ? '#34D399' : '#F87171' }}>
                                                {trend.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        width: 60, height: 36,
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                    }}>
                                        <Ionicons name="pulse-outline" size={36} color="#FB923C" style={{ opacity: 0.35 }} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                </View>
            </ScrollView>

            <TargetStrainSheet ref={infoSheetRef} />
        </View>
    );
}