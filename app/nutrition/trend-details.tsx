import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrendDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Tab State
    const [activeTab, setActiveTab] = useState<'score' | 'macro' | 'energy'>('score');
    const [timeframe, setTimeframe] = useState('1M');
    const [tableMode, setTableMode] = useState<'Avg' | 'Total'>('Avg');

    useEffect(() => {
        if (params.type) setActiveTab(params.type as any);
    }, [params.type]);

    return (
        <SafeAreaView className="flex-1 bg-white " edges={['top']}>

            {/* Modal Drag Handle */}
            <View className="w-full items-center pt-3 pb-4">
                <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
            </View>

            {/* Dynamic Header Title */}
            <View className="px-5 mb-4 flex-row items-center gap-2">
                <Ionicons name={activeTab === 'score' ? "restaurant" : activeTab === 'macro' ? "pie-chart" : "add-circle-outline"} size={20} color="#9CA3AF" />
                <Text className="text-gray-500 font-bold text-base">
                    {activeTab === 'score' ? 'Nutrition Score' : activeTab === 'macro' ? 'Macro Balance' : 'Net Energy'}
                </Text>
            </View>

            {/* Dynamic Header Value */}
            <View className="px-5 mb-6 flex-row justify-between items-start mt-3">
                <View>
                    <View className="flex-row items-end gap-1">
                        <Text className="text-[30px] font-bold text-gray-900 leading-10">
                            {activeTab === 'score' ? '83' : activeTab === 'macro' ? '160g' : '-1.364'}
                        </Text>
                        {activeTab === 'energy' && <Text className="text-[22px] font-bold text-gray-900 mb-1">kCal</Text>}
                    </View>
                    <Text className="text-gray-400 font-medium mt-1 text-sm">14 Sep 2025</Text>
                </View>

                <View className="items-end mt-2">
                    {activeTab === 'score' && (
                        <>
                            <Text className="text-blue-500 font-bold text-[15px] mb-1">Above normal</Text>
                            <View className="flex-row items-center gap-1"><Ionicons name="options-outline" size={14} color="#9CA3AF" /><Text className="text-gray-500 font-bold text-xs">41 - 73</Text></View>
                        </>
                    )}
                    {activeTab === 'macro' && (
                        <View className="border border-gray-200 px-3 py-1.5 rounded-xl bg-white flex-row items-center gap-1" style={styles.shadow}>
                            <Text className="font-bold text-gray-700 text-[13px]">Grams</Text>
                            <Ionicons name="chevron-down" size={14} color="#6B7280" />
                        </View>
                    )}
                    {activeTab === 'energy' && (
                        <Text className="text-orange-500 font-bold text-[16px]">Deficit</Text>
                    )}
                </View>
            </View>

            {/* Shared Tabs */}
            <View className="flex-row bg-gray-100 rounded-full p-1 mb-8 mx-5">
                <TouchableOpacity onPress={() => setActiveTab('score')} className={`flex-1 py-2 items-center rounded-full ${activeTab === 'score' ? 'bg-[#1A1A1A]' : ''}`} style={activeTab === 'score' ? styles.shadow : {}}>
                    <Text className={`text-[11px] font-bold ${activeTab === 'score' ? 'text-white' : 'text-gray-500'}`}>Nutrition Score</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('macro')} className={`flex-1 py-2 items-center rounded-full ${activeTab === 'macro' ? 'bg-[#1A1A1A]' : ''}`} style={activeTab === 'macro' ? styles.shadow : {}}>
                    <Text className={`text-[11px] font-bold ${activeTab === 'macro' ? 'text-white' : 'text-gray-500'}`}>Macro Balance</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('energy')} className={`flex-1 py-2 items-center rounded-full ${activeTab === 'energy' ? 'bg-[#1A1A1A]' : ''}`} style={activeTab === 'energy' ? styles.shadow : {}}>
                    <Text className={`text-[11px] font-bold ${activeTab === 'energy' ? 'text-white' : 'text-gray-500'}`}>Net Energy</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>

                {/* --- SHARED CHART COMPONENT --- */}
                <View className="mb-8 relative">
                    {/* Y-Axis Grid Lines */}
                    <View className="h-48 justify-between absolute inset-0 left-5 right-5 z-0 pb-6">
                        <View className="border-t border-gray-100 flex-row justify-end"><Text className="text-[10px] text-gray-300 -mt-1.5 bg-white pl-2">{activeTab === 'score' ? '92' : activeTab === 'macro' ? '326' : '1.92K'}</Text></View>
                        <View className="border-t border-gray-100 flex-row justify-end"><Text className="text-[10px] text-gray-300 -mt-1.5 bg-white pl-2">{activeTab === 'score' ? '72' : activeTab === 'macro' ? '217' : '1.28K'}</Text></View>
                        <View className="border-t border-gray-100 flex-row justify-end"><Text className="text-[10px] text-gray-300 -mt-1.5 bg-white pl-2">{activeTab === 'score' ? '51' : activeTab === 'macro' ? '109' : '639'}</Text></View>
                        <View className="border-t border-gray-100 flex-row justify-end"><Text className="text-[10px] text-gray-300 -mt-1.5 bg-white pl-2">0</Text></View>
                    </View>

                    {/* Chart Visuals */}
                    <View className="h-48 pt-4 pb-6 flex-row items-end justify-around px-2 z-10">
                        {activeTab === 'score' && (
                            <View className="w-full h-full relative items-end">
                                <View className="absolute top-[50%] w-full border-t border-dashed border-indigo-400 z-10" />
                                <View className="absolute top-[46%] left-[30%] bg-indigo-400 px-3 py-1 rounded-full z-20"><Text className="text-white text-[10px] font-bold">Avg. 57</Text></View>
                                {/* Line Chart Mock */}
                                <View className="absolute bottom-[20%] right-[70%] w-2 h-2 rounded-full border-2 border-indigo-400 bg-white" />
                                <View className="absolute bottom-[40%] right-[60%] w-2 h-2 rounded-full border-2 border-indigo-400 bg-white" />
                                <View className="absolute bottom-[10%] right-[55%] w-2 h-2 rounded-full border-2 border-indigo-400 bg-white" />
                                <View className="absolute top-[10%] right-[50%] w-2 h-2 rounded-full border-2 border-indigo-400 bg-white" />
                                {/* Glowing Active Point */}
                                <View className="absolute top-[25%] right-0 w-4 h-4 rounded-full bg-indigo-100 items-center justify-center">
                                    <View className="w-2 h-2 bg-indigo-500 rounded-full" />
                                </View>
                            </View>
                        )}

                        {activeTab === 'macro' && (
                            // Stacked Bars (Pink/Yellow/Blue)
                            [0, 0, 0, 30, 80, 50, 90, 40].map((h, i) => (
                                <View key={i} className="w-2.5 justify-end h-full">
                                    {h > 0 && (
                                        <>
                                            <View className="bg-pink-400 rounded-t-sm" style={{ height: `${h}%` }} />
                                            <View className="bg-yellow-400" style={{ height: `${h * 0.7}%` }} />
                                            <View className="bg-blue-400 rounded-b-sm" style={{ height: `${h * 0.4}%` }} />
                                        </>
                                    )}
                                </View>
                            ))
                        )}

                        {activeTab === 'energy' && (
                            // Grouped Bars (Orange/Blue)
                            [30, 60, 40, 70, 50, 60, 80, 40].map((h, i) => (
                                <View key={i} className="flex-row items-end gap-1 h-full">
                                    <View className="w-1.5 bg-blue-400 rounded-full" style={{ height: `${h * 0.6}%` }} />
                                    <View className="w-1.5 bg-orange-500 rounded-full" style={{ height: `${h}%` }} />
                                </View>
                            ))
                        )}
                    </View>

                    {/* Chart Bottom Axis */}
                    {activeTab === 'score' && <View className="border-t-[3px] border-teal-200 mt-0" />}
                    {activeTab === 'macro' && <View className="border-t-[3px] border-teal-200 mt-0" />}
                    {activeTab === 'energy' && <View className="border-t-[3px] border-teal-200 mt-0" />}

                    <View className="flex-row justify-between px-2 mt-2 mb-2">
                        <Text className="text-[10px] text-gray-400">15 Aug</Text>
                        <Text className="text-[10px] text-gray-400">22 Aug</Text>
                        <Text className="text-[10px] text-gray-400">30 Aug</Text>
                        <Text className="text-[10px] text-gray-400">6 Sep</Text>
                        <Text className="text-[10px] text-gray-400">14 Sep</Text>
                    </View>

                    {/* Chart Legend (Net Energy Only) */}
                    {activeTab === 'energy' && (
                        <View className="flex-row gap-4 mb-2">
                            <View className="flex-row items-center gap-1"><View className="w-2 h-2 rounded-full bg-blue-400" /><Text className="text-xs text-gray-500">Eaten</Text></View>
                            <View className="flex-row items-center gap-1"><View className="w-2 h-2 rounded-full bg-orange-500" /><Text className="text-xs text-gray-500">Burned</Text></View>
                        </View>
                    )}

                    {/* Timeframe Picker */}
                    <View className="flex-row items-center justify-between mt-4">
                        <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100"><Ionicons name="chevron-back" size={16} color="#9CA3AF" /></TouchableOpacity>
                        <View className="flex-row bg-gray-100 rounded-full p-1">
                            {['7D', '1M', '3M', '6M', '1Y'].map(tf => (
                                <TouchableOpacity key={tf} onPress={() => setTimeframe(tf)} className={`px-4 py-1.5 rounded-full ${timeframe === tf ? 'bg-white' : ''}`} style={timeframe === tf ? styles.shadow : {}}>
                                    <Text className={`font-bold text-[13px] ${timeframe === tf ? 'text-gray-900' : 'text-gray-400'}`}>{tf}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100"><Ionicons name="calendar-outline" size={14} color="#9CA3AF" /></TouchableOpacity>
                            <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100"><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* --- SPECIFIC DATA SECTIONS --- */}
                {/* <View className="mt-4 px-5"> */}

                {/* SCENARIO 1: NUTRITION SCORE */}
                {activeTab === 'score' && (
                    <>
                        <Text className="font-bold text-gray-900 text-[17px] mb-4">Nutrition Breakdown</Text>
                        <View className="mb-8">
                            <View className="flex-row h-3.5 rounded-full overflow-hidden gap-1 mb-4">
                                <View className="bg-blue-300 flex-[2]" />
                                <View className="bg-indigo-400 flex-[1]" />
                            </View>
                            <View className="gap-2.5">
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-pink-400" /><Text className="font-bold text-gray-900 text-sm">Low <Text className="font-normal text-gray-500">{'<'}34.0%</Text></Text></View>
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-blue-300" /><Text className="font-bold text-gray-900 text-sm">Fair <Text className="font-normal text-gray-500">34.0% - 67.0%</Text></Text></View>
                                <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-indigo-400" /><Text className="font-bold text-gray-900 text-sm">Optimal <Text className="font-normal text-gray-500">{'>'}67.0%</Text></Text></View>
                            </View>
                        </View>

                        <Text className="font-bold text-gray-900 text-[17px] mb-1">Trends Analysis</Text>
                        <Text className="text-gray-500 text-[13px] mb-4">Last data point on 14 Sep 2025</Text>

                        <View className="bg-white rounded-3xl p-5 border border-gray-100 mb-4" style={styles.shadow}>
                            <View className="flex-row border-b border-gray-100 pb-2 mb-2">
                                <Text className="flex-1 font-bold text-gray-300 text-xs uppercase">Period</Text>
                                <Text className="flex-1 font-bold text-gray-300 text-xs uppercase">Change</Text>
                                <Text className="flex-1 font-bold text-gray-300 text-xs uppercase text-right">Trend</Text>
                            </View>
                            {[
                                { p: '3-day', c: '+14', cColor: 'text-blue-500', icon: 'arrow-up-circle' },
                                { p: '7-day', c: '+21', cColor: 'text-blue-500', icon: 'arrow-up-circle' },
                                { p: '14-day', c: '—', cColor: 'text-gray-400', icon: '' },
                                { p: '30-day', c: '—', cColor: 'text-gray-400', icon: '' },
                                { p: '90-day', c: '—', cColor: 'text-gray-400', icon: '' }
                            ].map((row, i) => (
                                <View key={i} className="flex-row items-center py-3 border-b border-gray-50">
                                    <Text className="flex-1 font-bold text-gray-600 text-[14px]">{row.p}</Text>
                                    <View className="flex-1 flex-row items-center gap-1">
                                        {row.icon ? <Ionicons name={row.icon as any} size={16} color="#3B82F6" /> : null}
                                        <Text className={`font-bold text-[14px] ${row.cColor}`}>{row.c}</Text>
                                    </View>
                                    <View className="flex-1 items-end justify-center h-6 relative">
                                        {row.c !== '—' ? (
                                            <View className="w-12 h-6 border-b-2 border-blue-400 transform -rotate-[15deg]" />
                                        ) : (
                                            <View className="w-12 h-[2px] bg-gray-300" />
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                        <Text className="text-center text-gray-400 text-xs mb-8">Based on 7-day rolling averages for the select period.</Text>

                        <InfoBlock title="Nutrition Score" desc="The Nutrition Score evaluates the quality of your food choices daily. A score closer to 100 means better quality and a healthier effect on your overall well-being." />
                    </>
                )}

                {/* SCENARIO 2: MACRO BALANCE */}
                {activeTab === 'macro' && (
                    <>
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="font-bold text-gray-900 text-[17px]">Macro Balance History</Text>
                            <View className="flex-row bg-gray-100 rounded-lg p-0.5">
                                <TouchableOpacity onPress={() => setTableMode('Avg')} className={`px-3 py-1.5 rounded-md ${tableMode === 'Avg' ? 'bg-white' : ''}`} style={tableMode === 'Avg' ? styles.shadow : {}}><Text className={`text-[12px] font-bold ${tableMode === 'Avg' ? 'text-gray-900' : 'text-gray-500'}`}>Avg</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setTableMode('Total')} className={`px-3 py-1.5 rounded-md ${tableMode === 'Total' ? 'bg-white' : ''}`} style={tableMode === 'Total' ? styles.shadow : {}}><Text className={`text-[12px] font-bold ${tableMode === 'Total' ? 'text-gray-900' : 'text-gray-500'}`}>Total</Text></TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-gray-500 text-[13px] mb-6 flex-row items-center">Jul – Sep 2025 <Ionicons name="chevron-forward" size={12} /></Text>

                        {/* Grouped Table by Months */}
                        {[
                            { month: 'Sep 2025', rows: [{ w: '7 Sep', f: '34.6', c: '66.3', p: '35.3' }] },
                            {
                                month: 'Aug 2025', rows: [
                                    { w: '31 Aug', f: '4.2', c: '6.8', p: '3.4' },
                                    { w: '24 Aug', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '17 Aug', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '10 Aug', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '3 Aug', f: '0.0', c: '0.0', p: '0.0' },
                                ]
                            },
                            {
                                month: 'Jul 2025', rows: [
                                    { w: '27 Jul', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '20 Jul', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '13 Jul', f: '0.0', c: '0.0', p: '0.0' },
                                    { w: '6 Jul', f: '0.0', c: '0.0', p: '0.0' },
                                ]
                            }
                        ].map((group, gIdx) => (
                            <View key={gIdx} className="mb-6">
                                <Text className="font-bold text-gray-900 text-base mb-3">{group.month}</Text>
                                <View className="bg-white rounded-3xl p-5 border border-gray-100" style={styles.shadow}>
                                    <View className="flex-row border-b border-gray-100 pb-2 mb-2">
                                        <Text className="flex-[1.2] font-bold text-gray-300 text-xs uppercase">Week</Text>
                                        <Text className="flex-1 font-bold text-blue-400 text-xs uppercase">Fat</Text>
                                        <Text className="flex-1 font-bold text-yellow-500 text-xs uppercase">Carbs</Text>
                                        <Text className="flex-1 font-bold text-pink-400 text-xs uppercase">Protein</Text>
                                    </View>
                                    {group.rows.map((row, rIdx) => (
                                        <View key={rIdx} className={`flex-row items-center py-3 ${rIdx !== group.rows.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                            <Text className="flex-[1.2] font-bold text-gray-500 text-[14px]">{row.w}</Text>
                                            <Text className="flex-1 font-bold text-gray-900 text-[14px]">{row.f}</Text>
                                            <Text className="flex-1 font-bold text-gray-900 text-[14px]">{row.c}</Text>
                                            <Text className="flex-1 font-bold text-gray-900 text-[14px]">{row.p}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}

                        <InfoBlock
                            title="Macro Balance"
                            desc="Macro Balance measures the proportion of macronutrients—proteins, fats, and carbohydrates—in your diet.\n\nTracking your macro balance ensures you're getting the right mix of nutrients to support your health and fitness goals, such as building muscle, losing weight, or maintaining wellness. A well-balanced intake helps sustain energy, optimize performance, and promote overall health."
                        />
                    </>
                )}

                {/* SCENARIO 3: NET ENERGY */}
                {activeTab === 'energy' && (
                    <>
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="font-bold text-gray-900 text-[17px]">Trends Analysis</Text>
                            <View className="flex-row bg-gray-100 rounded-lg p-0.5">
                                <TouchableOpacity onPress={() => setTableMode('Avg')} className={`px-3 py-1.5 rounded-md ${tableMode === 'Avg' ? 'bg-white' : ''}`} style={tableMode === 'Avg' ? styles.shadow : {}}><Text className={`text-[12px] font-bold ${tableMode === 'Avg' ? 'text-gray-900' : 'text-gray-500'}`}>Avg</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setTableMode('Total')} className={`px-3 py-1.5 rounded-md ${tableMode === 'Total' ? 'bg-white' : ''}`} style={tableMode === 'Total' ? styles.shadow : {}}><Text className={`text-[12px] font-bold ${tableMode === 'Total' ? 'text-gray-900' : 'text-gray-500'}`}>Total</Text></TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-gray-500 text-[13px] mb-6">Last data point on 14 Sep 2025</Text>

                        <View className="bg-white rounded-3xl p-5 border border-gray-100 mb-8" style={styles.shadow}>
                            <View className="flex-row border-b border-gray-100 pb-2 mb-2">
                                <Text className="flex-[1.2] font-bold text-gray-300 text-xs uppercase">Period</Text>
                                <Text className="flex-1 font-bold text-gray-300 text-xs uppercase">Net energy</Text>
                                <Text className="flex-[1.2] font-bold text-gray-300 text-xs uppercase">Balance</Text>
                            </View>
                            {[
                                { p: '3-day', e: '-1.364 kcal', b: 'Deficit' },
                                { p: '7-day', e: '-781 kcal', b: 'Deficit' },
                                { p: '14-day', e: '-1.165 kcal', b: 'Deficit' },
                                { p: '30-day', e: '-1.117 kcal', b: 'Deficit' },
                                { p: '90-day', e: '-1.203 kcal', b: 'Deficit' }
                            ].map((row, i) => (
                                <View key={i} className="flex-row items-center py-3 border-b border-gray-50">
                                    <Text className="flex-[1.2] font-bold text-gray-500 text-[14px]">{row.p}</Text>
                                    <Text className="flex-1 font-bold text-gray-900 text-[14px]">{row.e}</Text>
                                    <View className="flex-[1.2] flex-row items-center gap-1.5">
                                        <Ionicons name="arrow-down-circle" size={16} color="#EF4444" />
                                        <Text className="font-bold text-gray-900 text-[14px]">{row.b}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <InfoBlock
                            title="Net Energy"
                            desc="Net Energy is the balance between the energy you burn and the energy you consume, showing whether you're in a calorie surplus, deficit, or equilibrium.\n\nMonitoring net energy helps you align your intake and activity with your goals, whether it's weight management, muscle building, or maintaining overall health."
                        />
                    </>
                )}

            </ScrollView>

            {/* Floating Action Buttons based on Tab */}
            <View className="absolute bottom-8 w-full items-center justify-center z-50 pointer-events-box-none">
                <View className="absolute inset-0 bg-white/60 blur-2xl -z-10" />

                {activeTab === 'score' && (
                    <TouchableOpacity className="bg-white rounded-full px-5 py-3.5 flex-row items-center gap-2 border border-gray-100" style={styles.shadow}>
                        <Ionicons name="analytics" size={18} color="#EF4444" />
                        <Text className="font-bold text-gray-900 text-[15px]">Nutrition on the Rise</Text>
                        <Ionicons name="chevron-up" size={16} color="#6B7280" />
                    </TouchableOpacity>
                )}

                {activeTab === 'macro' && (
                    <TouchableOpacity className="bg-white rounded-full px-5 py-3.5 flex-row items-center gap-2 border border-gray-100" style={styles.shadow}>
                        <Ionicons name="analytics" size={18} color="#EF4444" />
                        <Text className="font-bold text-gray-900 text-[15px]">Macro Trends Check-in</Text>
                        <Ionicons name="chevron-up" size={16} color="#6B7280" />
                    </TouchableOpacity>
                )}
                {/* Screenshot for Net Energy doesn't show a floating button, so we omit it here */}
            </View>

        </SafeAreaView>
        // </SafeAreaView >
    );
}

// Sub Component for Info Sections
const InfoBlock = ({ title, desc }: any) => (
    <View className="mb-8">
        <View className="flex-row items-center gap-1.5 mb-3">
            <Ionicons name="information-circle-outline" size={18} color="#9CA3AF" />
            <Text className="text-gray-500 font-semibold text-[15px]">{title}</Text>
        </View>
        <Text className="text-gray-500 leading-5 text-[14px]">{desc}</Text>
    </View>
);

// We define shadow in StyleSheet as requested
const styles = StyleSheet.create({
    shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 4 }
});