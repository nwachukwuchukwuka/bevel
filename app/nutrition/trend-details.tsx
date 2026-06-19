import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InfoBlock = ({ title, desc }: any) => (
    <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mb-8">
        <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="information-circle" size={18} color="#4DB9F2" />
            <Text className="text-slate-100 font-bold text-base">{title}</Text>
        </View>
        <Text className="text-slate-400 leading-6 text-sm">{desc}</Text>
    </View>
);

export default function TrendDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [activeTab, setActiveTab] = useState<'score' | 'macro' | 'energy'>('score');
    const [timeframe, setTimeframe] = useState('1M');
    const [tableMode, setTableMode] = useState<'Avg' | 'Total'>('Avg');

    useEffect(() => {
        if (params.type) setActiveTab(params.type as any);
    }, [params.type]);

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

            <View className="items-center py-3">
                <View className="w-12 h-1 bg-[#1E293B] rounded-full" />
            </View>

            <View className="px-5 pb-6 border-b border-[#1E293B] flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-bold text-slate-100">
                        {activeTab === 'score' ? 'Nutrition Score' : activeTab === 'macro' ? 'Macro Balance' : 'Net Energy'}
                    </Text>
                    <Text className="text-sm text-slate-400 mt-1">14 Sep 2025</Text>
                </View>
                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-2xl items-center justify-center">
                    <Ionicons name={activeTab === 'score' ? "restaurant" : activeTab === 'macro' ? "pie-chart" : "flame"} size={22} color="#4DB9F2" />
                </View>
            </View>

            <View className="px-5 py-4 bg-[#151E33] border-b border-[#1E293B]">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-baseline gap-2">
                        <Text className="text-4xl font-bold text-white">
                            {activeTab === 'score' ? '83' : activeTab === 'macro' ? '160' : '-1.364'}
                        </Text>
                        <Text className="text-base font-bold text-[#4DB9F2]">
                            {activeTab === 'score' ? 'index' : activeTab === 'macro' ? 'g' : 'kCal'}
                        </Text>
                    </View>

                    {activeTab === 'score' && (
                        <View className="bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            <Text className="text-emerald-500 font-bold text-sm">Above normal</Text>
                        </View>
                    )}
                    {activeTab === 'macro' && (
                        <View className="bg-[#1E293B] px-3 py-1.5 rounded-xl border border-[#2D3748] flex-row items-center gap-1.5">
                            <Text className="text-slate-300 font-bold text-sm">Grams</Text>
                            <Ionicons name="swap-vertical" size={14} color="#4DB9F2" />
                        </View>
                    )}
                    {activeTab === 'energy' && (
                        <View className="bg-rose-950/30 px-3 py-1.5 rounded-xl border border-rose-500/20">
                            <Text className="text-rose-500 font-bold text-sm">Deficit</Text>
                        </View>
                    )}
                </View>
            </View>

            <View className="px-5 py-4 border-b border-[#1E293B]">
                <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                    <TouchableOpacity
                        onPress={() => setActiveTab('score')}
                        activeOpacity={0.7}
                        className={`flex-1 py-2.5 items-center rounded-lg border ${activeTab === 'score' ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}
                    >
                        <Text className={`text-sm font-semibold ${activeTab === 'score' ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>Score</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('macro')}
                        activeOpacity={0.7}
                        className={`flex-1 py-2.5 items-center rounded-lg border ${activeTab === 'macro' ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}
                    >
                        <Text className={`text-sm font-semibold ${activeTab === 'macro' ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>Balance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('energy')}
                        activeOpacity={0.7}
                        className={`flex-1 py-2.5 items-center rounded-lg border ${activeTab === 'energy' ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}
                    >
                        <Text className={`text-sm font-semibold ${activeTab === 'energy' ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>Energy</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }} showsVerticalScrollIndicator={false}>

                <View className="px-5 mb-8">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-5">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-sm font-semibold text-slate-400">Metric visualizer</Text>

                            <View className="flex-row gap-2 bg-[#090D16] p-1 rounded-lg border border-[#1E293B]">
                                {['7D', '1M', '3M', '6M', '1Y'].map(tf => (
                                    <TouchableOpacity
                                        key={tf}
                                        onPress={() => setTimeframe(tf)}
                                        className={`px-2.5 py-1 rounded-md border ${timeframe === tf ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'}`}
                                    >
                                        <Text className={`font-bold text-xs ${timeframe === tf ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>{tf}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="h-48 relative justify-end mb-4">
                            <View className="absolute inset-0 justify-between">
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-3">{activeTab === 'score' ? '92' : activeTab === 'macro' ? '326' : '1.92K'}</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-3">{activeTab === 'score' ? '72' : activeTab === 'macro' ? '217' : '1.28K'}</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-3">{activeTab === 'score' ? '51' : activeTab === 'macro' ? '109' : '639'}</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-3">0</Text></View>
                            </View>

                            <View className="absolute bottom-0 left-0 right-0 h-[80%] flex-row items-end justify-around pb-[1px]">
                                {activeTab === 'score' && (
                                    <View className="w-full h-full relative items-end">
                                        <View className="w-full h-[1px] bg-slate-600 border border-dashed absolute top-[30%]" />
                                        <View className="w-full flex-row items-end justify-between px-4 h-full">
                                            {[30, 45, 60, 80, 55].map((h, i) => (
                                                <View key={i} className={`w-3 rounded-full ${i === 3 ? 'bg-[#4DB9F2]' : 'bg-[#1E293B]'}`} style={{ height: `${h}%` }} />
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {activeTab === 'macro' && (
                                    [0, 0, 0, 30, 80, 50, 90, 40].map((h, i) => (
                                        <View key={i} className="w-3 justify-end h-full">
                                            {h > 0 && (
                                                <>
                                                    <View className="bg-rose-500 rounded-t-sm" style={{ height: `${h * 0.3}%` }} />
                                                    <View className="bg-amber-500" style={{ height: `${h * 0.4}%` }} />
                                                    <View className="bg-[#4DB9F2] rounded-b-sm" style={{ height: `${h * 0.3}%` }} />
                                                </>
                                            )}
                                        </View>
                                    ))
                                )}

                                {activeTab === 'energy' && (
                                    [30, 60, 40, 70, 50, 60, 80, 40].map((h, i) => (
                                        <View key={i} className="flex-row items-end gap-[2px] h-full">
                                            <View className="w-1.5 bg-[#4DB9F2] rounded-full" style={{ height: `${h * 0.6}%` }} />
                                            <View className="w-1.5 bg-rose-500 rounded-full" style={{ height: `${h}%` }} />
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>

                        <View className="flex-row justify-between pt-3 border-t border-[#1E293B]">
                            <Text className="text-[10px] text-slate-500 font-bold">15 Aug</Text>
                            <Text className="text-[10px] text-slate-500 font-bold">30 Aug</Text>
                            <Text className="text-[10px] text-slate-500 font-bold">14 Sep</Text>
                        </View>
                    </View>
                </View>

                {activeTab === 'score' && (
                    <View className="px-5">
                        <View className="mb-8">
                            <Text className="font-bold text-white text-lg mb-4">Distribution limits</Text>
                            <View className="bg-[#151E33] rounded-2xl p-5 border border-[#1E293B]">
                                <View className="flex-row h-2 rounded-full overflow-hidden mb-6">
                                    <View className="bg-rose-500 flex-[1]" />
                                    <View className="bg-amber-500 flex-[1]" />
                                    <View className="bg-emerald-500 flex-[1]" />
                                </View>
                                <View className="gap-4">
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-rose-500" /><Text className="font-bold text-slate-200">Low</Text></View><Text className="text-slate-500 font-medium">{'<'} 34.0%</Text></View>
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-amber-500" /><Text className="font-bold text-slate-200">Fair</Text></View><Text className="text-slate-500 font-medium">34.0% - 67.0%</Text></View>
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><Text className="font-bold text-slate-200">Optimal</Text></View><Text className="text-slate-500 font-medium">{'>'} 67.0%</Text></View>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="font-bold text-white text-lg mb-4">Trends breakdown</Text>
                            <View className="bg-[#151E33] rounded-2xl p-5 border border-[#1E293B]">
                                <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Period</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Change</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs text-right">Trend</Text>
                                </View>
                                {[
                                    { p: '3-day', c: '+14', cColor: 'text-[#4DB9F2]', icon: 'trending-up-outline' },
                                    { p: '7-day', c: '+21', cColor: 'text-[#4DB9F2]', icon: 'trending-up-outline' },
                                    { p: '14-day', c: '—', cColor: 'text-slate-600', icon: '' },
                                    { p: '30-day', c: '—', cColor: 'text-slate-600', icon: '' },
                                    { p: '90-day', c: '—', cColor: 'text-slate-600', icon: '' }
                                ].map((row, i) => (
                                    <View key={i} className="flex-row items-center py-3 border-b border-[#1E293B40]">
                                        <Text className="flex-1 font-bold text-white text-sm">{row.p}</Text>
                                        <View className="flex-1 flex-row items-center gap-2">
                                            {row.icon ? <Ionicons name={row.icon as any} size={16} color="#4DB9F2" /> : null}
                                            <Text className={`font-bold text-sm ${row.cColor}`}>{row.c}</Text>
                                        </View>
                                        <View className="flex-1 items-end justify-center">
                                            <View className={`w-8 h-1 rounded-full ${row.icon ? 'bg-[#4DB9F2]' : 'bg-slate-700'}`} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <InfoBlock title="Nutrition Score" desc="The Nutrition Score evaluates the quality of your food choices daily. A score closer to 100 means better quality and a healthier effect on your overall well-being." />
                    </View>
                )}

                {activeTab === 'macro' && (
                    <View className="px-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-bold text-white text-lg">Balance records</Text>
                            <View className="flex-row bg-[#1E293B] rounded-lg p-1 border border-[#2D3748]">
                                <TouchableOpacity onPress={() => setTableMode('Avg')} className={`px-3 py-1 rounded-md border ${tableMode === 'Avg' ? 'bg-[#151E33] border-[#2C3748]' : 'border-transparent'}`}><Text className={`text-xs font-bold ${tableMode === 'Avg' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Avg</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setTableMode('Total')} className={`px-3 py-1 rounded-md border ${tableMode === 'Total' ? 'bg-[#151E33] border-[#2C3748]' : 'border-transparent'}`}><Text className={`text-xs font-bold ${tableMode === 'Total' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Total</Text></TouchableOpacity>
                            </View>
                        </View>

                        {[
                            { month: 'Sep 2025', rows: [{ w: '7 Sep', f: '34.6', c: '66.3', p: '35.3' }] },
                            { month: 'Aug 2025', rows: [{ w: '31 Aug', f: '4.2', c: '6.8', p: '3.4' }, { w: '24 Aug', f: '0.0', c: '0.0', p: '0.0' }] }
                        ].map((group, gIdx) => (
                            <View key={gIdx} className="mb-8">
                                <Text className="font-semibold text-slate-400 text-sm mb-3 ml-1">{group.month}</Text>
                                <View className="bg-[#151E33] rounded-2xl p-5 border border-[#1E293B]">
                                    <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                        <Text className="flex-[1.2] font-semibold text-slate-500 text-xs">Week</Text>
                                        <Text className="flex-1 font-semibold text-rose-400 text-xs">Fat</Text>
                                        <Text className="flex-1 font-semibold text-amber-400 text-xs">Carbs</Text>
                                        <Text className="flex-1 font-semibold text-[#4DB9F2] text-xs">Protein</Text>
                                    </View>
                                    {group.rows.map((row, rIdx) => (
                                        <View key={rIdx} className="flex-row items-center py-3 border-b border-[#1E293B40]">
                                            <Text className="flex-[1.2] font-bold text-white text-sm">{row.w}</Text>
                                            <Text className="flex-1 font-medium text-slate-300 text-sm">{row.f}</Text>
                                            <Text className="flex-1 font-medium text-slate-300 text-sm">{row.c}</Text>
                                            <Text className="flex-1 font-medium text-slate-300 text-sm">{row.p}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}

                        <InfoBlock title="Macro Balance" desc="Tracking your macro balance ensures you're getting the right mix of nutrients to support your health and fitness goals. A well-balanced intake helps sustain energy, optimize performance, and promote overall health." />
                    </View>
                )}

                {activeTab === 'energy' && (
                    <View className="px-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-bold text-white text-lg">Energy flow</Text>
                            <View className="flex-row bg-[#1E293B] rounded-lg p-1 border border-[#2D3748]">
                                <TouchableOpacity onPress={() => setTableMode('Avg')} className={`px-3 py-1 rounded-md border ${tableMode === 'Avg' ? 'bg-[#151E33] border-[#2C3748]' : 'border-transparent'}`}><Text className={`text-xs font-bold ${tableMode === 'Avg' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Avg</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setTableMode('Total')} className={`px-3 py-1 rounded-md border ${tableMode === 'Total' ? 'bg-[#151E33] border-[#2C3748]' : 'border-transparent'}`}><Text className={`text-xs font-bold ${tableMode === 'Total' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Total</Text></TouchableOpacity>
                            </View>
                        </View>

                        <View className="bg-[#151E33] rounded-2xl p-5 border border-[#1E293B] mb-8">
                            <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                <Text className="flex-[1.2] font-semibold text-slate-500 text-xs">Period</Text>
                                <Text className="flex-1 font-semibold text-slate-500 text-xs">Net energy</Text>
                                <Text className="flex-[1.2] font-semibold text-slate-500 text-xs">Balance</Text>
                            </View>
                            {[
                                { p: '3-day', e: '-1.364 kcal', b: 'Deficit' },
                                { p: '7-day', e: '-781 kcal', b: 'Deficit' },
                                { p: '14-day', e: '-1.165 kcal', b: 'Deficit' },
                                { p: '30-day', e: '-1.117 kcal', b: 'Deficit' }
                            ].map((row, i) => (
                                <View key={i} className="flex-row items-center py-3 border-b border-[#1E293B40]">
                                    <Text className="flex-[1.2] font-bold text-white text-sm">{row.p}</Text>
                                    <Text className="flex-1 font-medium text-slate-300 text-sm">{row.e}</Text>
                                    <View className="flex-[1.2] flex-row items-center gap-2">
                                        <View className="w-5 h-5 rounded-md bg-rose-500/20 items-center justify-center border border-rose-500/30">
                                            <Ionicons name="arrow-down" size={12} color="#EF4444" />
                                        </View>
                                        <Text className="font-bold text-rose-500 text-sm">{row.b}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <InfoBlock title="Net Energy" desc="Net Energy is the balance between the energy you burn and the energy you consume. Monitoring net energy helps you align your intake and activity with your goals." />
                    </View>
                )}
            </ScrollView>

            <View className="absolute bottom-6 w-full items-center justify-center z-50 pointer-events-none">
                {activeTab === 'score' && (
                    <View className="bg-emerald-950/90 rounded-2xl px-5 py-4 flex-row items-center gap-3 border border-emerald-500/30 pointer-events-auto">
                        <Ionicons name="analytics" size={20} color="#10B981" />
                        <Text className="font-bold text-emerald-500 text-base">Nutrition on the rise</Text>
                    </View>
                )}
                {activeTab === 'macro' && (
                    <View className="bg-[#1E293B]/90 rounded-2xl px-5 py-4 flex-row items-center gap-3 border border-[#4DB9F2]/30 pointer-events-auto">
                        <Ionicons name="analytics" size={20} color="#4DB9F2" />
                        <Text className="font-bold text-[#4DB9F2] text-base">Macro trends check-in</Text>
                    </View>
                )}
            </View>

        </SafeAreaView>
    );
}