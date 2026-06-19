// import { ResourceDetailSheet, ResourceDetailSheetRef } from '@/components/strain/ResourceDetailSheet';
// import { STRAIN_ANALYSIS } from '@/constants';
// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function StrainScoreModal() {
//     const router = useRouter();

//     const [selectedTab, setSelectedTab] = useState('Strain Score');
//     const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

//     const resourceSheetRef = useRef<ResourceDetailSheetRef>(null);
//     const CHART_DATA = [25, 45, 60, 50, 40, 15, 20, 65, 70, 45, 80, 50, 65, 20, 10, 35, 40];


//     return (
//         <BottomSheetModalProvider>
//             <View className="flex-1 bg-[#F9FAFB]">
//                 {/* Modal Header */}
//                 <View className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100 bg-white">
//                     <View className="w-8" />
//                     <Text className="text-[16px] font-bold text-gray-900">Strain Score</Text>
//                     <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
//                         <Ionicons name="close" size={18} color="#111827" />
//                     </TouchableOpacity>
//                 </View>

//                 <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

//                     <View className="flex-row items-center gap-2 mb-2">
//                         <Ionicons name="analytics" size={18} color="#9CA3AF" />
//                         <Text className="text-[16px] font-bold text-gray-500">Strain Score</Text>
//                     </View>

//                     <View className="flex-row justify-between items-end mb-6">
//                         <View>
//                             <Text className="text-[48px] font-bold text-gray-900 tracking-tighter leading-none">
//                                 38<Text className="text-[24px]">%</Text>
//                             </Text>
//                             <Text className="text-[13px] font-medium text-gray-500 mt-2">14 Sep 2025</Text>
//                         </View>
//                         <View className="items-end">
//                             <Text className="text-[14px] font-bold text-emerald-500 mb-1">Normal range</Text>
//                             <View className="flex-row items-center gap-1">
//                                 <Ionicons name="menu" size={14} color="#9CA3AF" />
//                                 <Text className="text-[13px] font-bold text-gray-400">8 - 64%</Text>
//                             </View>
//                         </View>
//                     </View>

//                     <View className="flex-row gap-1.5 mb-8">
//                         {['Strain Score', 'Exercise Duration', 'Daytime HR'].map((tab) => (
//                             <TouchableOpacity
//                                 key={tab}
//                                 onPress={() => setSelectedTab(tab)}
//                                 className={`px-3 py-2 rounded-full ${selectedTab === tab ? 'bg-gray-900' : 'bg-gray-100'}`}
//                             >
//                                 <Text className={`text-[10px] font-bold ${selectedTab === tab ? 'text-white' : 'text-gray-500'}`}>
//                                     {tab}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>

//                     <View className="mb-10">
//                         <View className="h-56 relative justify-end pb-6 border-b-2 border-emerald-400">

//                             {/* Y-Axis Labels (Background) */}
//                             <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0 opacity-40">
//                                 <Text className="text-[10px] font-bold text-gray-400">92</Text>
//                                 <Text className="text-[10px] font-bold text-gray-400">62</Text>
//                                 <Text className="text-[10px] font-bold text-gray-400">31</Text>
//                                 <Text className="text-[10px] font-bold text-gray-400">0</Text>
//                             </View>

//                             {/* Background Fill Gradient */}
//                             <View className="absolute bottom-6 left-0 right-6 top-0 overflow-hidden z-0">
//                                 <LinearGradient
//                                     colors={['rgba(251, 146, 60, 0.2)', 'rgba(251, 146, 60, 0)']}
//                                     className="w-full h-full"
//                                 />
//                             </View>

//                             {/* Dotted Average Line */}
//                             <View className="absolute left-0 right-6 top-[55%] border-b border-dashed border-orange-400 z-10 opacity-70" />
//                             <View className="absolute left-[35%] top-[55%] -translate-y-3 bg-orange-500 px-2 py-0.5 rounded-full z-20">
//                                 <Text className="text-[10px] font-bold text-white">Avg. 35%</Text>
//                             </View>

//                             {/* Data Points (Vertical lines with dots to simulate the jagged line chart visually) */}
//                             <View className="flex-row items-end justify-between pr-8 z-20 h-full">
//                                 {CHART_DATA.map((val, idx) => {
//                                     const isLast = idx === CHART_DATA.length - 1;
//                                     return (
//                                         <View key={idx} className="items-center w-[4px]" style={{ height: `${val}%` }}>
//                                             {/* Connecting Line Mock */}
//                                             <View className="w-0.5 flex-1 bg-orange-400" />
//                                             {/* Dot */}
//                                             <View className={`w-2.5 h-2.5 rounded-full border-[1.5px] bg-white absolute top-0 ${isLast ? 'border-orange-500 w-3 h-3 bg-orange-100' : 'border-orange-500'}`} />
//                                         </View>
//                                     )
//                                 })}
//                             </View>
//                         </View>

//                         {/* X-Axis Labels */}
//                         <View className="flex-row justify-between pr-8 mt-2 mb-6">
//                             <Text className="text-[10px] font-bold text-gray-400">15 Aug</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">22 Aug</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">30 Aug</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">6 Sep</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">14 Sep</Text>
//                         </View>

//                         {/* Timeframe Selector */}
//                         <View className="flex-row items-center justify-between">
//                             <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
//                                 <Ionicons name="chevron-back" size={16} color="#9CA3AF" />
//                             </TouchableOpacity>

//                             <View className="flex-row items-center gap-1">
//                                 {['1M', '3M', '6M', '1Y'].map(time => (
//                                     <TouchableOpacity
//                                         key={time}
//                                         onPress={() => setSelectedTimeframe(time)}
//                                         className={`w-10 h-8 items-center justify-center rounded-full ${selectedTimeframe === time ? 'bg-white border border-gray-200 shadow-sm' : ''}`}
//                                     >
//                                         <Text className={`text-[12px] font-bold ${selectedTimeframe === time ? 'text-gray-900' : 'text-gray-400'}`}>{time}</Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>

//                             <View className="flex-row gap-2">
//                                 <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
//                                     <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
//                                     <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Strain Breakdown Mock */}
//                     <Text className="text-[16px] font-bold text-gray-900 mb-4">Strain Breakdown</Text>
//                     <View className="flex-row h-3 rounded-full overflow-hidden mb-4">
//                         <View className="bg-yellow-400 h-full" style={{ width: '40%' }} />
//                         <View className="bg-orange-500 h-full border-l border-white" style={{ width: '45%' }} />
//                         <View className="bg-red-500 h-full border-l border-white" style={{ width: '15%' }} />
//                     </View>
//                     <View className="gap-2 mb-8">
//                         <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-yellow-400" /><Text className="text-[12px] font-bold text-gray-900">Low <Text className="font-medium text-gray-400">&lt;34.0%</Text></Text></View>
//                         <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-orange-500" /><Text className="text-[12px] font-bold text-gray-900">Normal <Text className="font-medium text-gray-400">34.0% - 67.0%</Text></Text></View>
//                         <View className="flex-row items-center gap-2"><View className="w-2 h-2 rounded-full bg-red-500" /><Text className="text-[12px] font-bold text-gray-900">High <Text className="font-medium text-gray-400">&gt;67.0%</Text></Text></View>
//                     </View>

//                     {/* Trends Analysis */}
//                     <Text className="text-[16px] font-bold text-gray-900 mb-1">Trends Analysis</Text>
//                     <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 14 Sep 2025</Text>

//                     <View className="bg-white rounded-[20px] p-2 border border-gray-100 shadow-sm mb-2">
//                         <View className="flex-row justify-between px-4 py-3 border-b border-gray-50">
//                             <Text className="text-[11px] font-bold text-gray-400 w-1/3">Period</Text>
//                             <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-center">Change</Text>
//                             <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-right">Trend</Text>
//                         </View>
//                         {STRAIN_ANALYSIS.map((item, idx) => (
//                             <View key={idx} className={`flex-row items-center justify-between px-4 py-4 ${idx !== STRAIN_ANALYSIS.length - 1 ? 'border-b border-gray-50' : ''}`}>
//                                 <Text className="text-[13px] font-bold text-gray-600 w-1/3">{item.period}</Text>
//                                 <View className="w-1/3 items-center flex-row justify-center gap-1">
//                                     <Ionicons name={item.trend === 'down' ? 'arrow-down-circle' : 'arrow-up-circle'} size={14} color={item.trend === 'down' ? '#EF4444' : '#3B82F6'} />
//                                     <Text className={`text-[13px] font-bold ${item.trend === 'down' ? 'text-red-500' : 'text-blue-500'}`}>{item.change}</Text>
//                                 </View>
//                                 <View className="w-1/3 items-end justify-center">
//                                     {/* Tiny Sparkline Mock */}
//                                     <Ionicons name="pulse" size={24} color={item.trend === 'down' ? '#EF4444' : '#3B82F6'} />
//                                 </View>
//                             </View>
//                         ))}
//                     </View>
//                     <Text className="text-center text-[10px] text-gray-400 mb-8">Based on 7-day rolling averages for the select period.</Text>

//                     {/* Resources */}
//                     <Text className="text-[16px] font-bold text-gray-900 mb-4">Resources</Text>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible">
//                         {/* The Clickable Resource Card */}
//                         <TouchableOpacity
//                             onPress={() => resourceSheetRef.current?.present()}
//                             activeOpacity={0.8}
//                             className="w-[240px] mr-4"
//                         >
//                             <View className="h-[120px] bg-orange-200 rounded-[20px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative">
//                                 <View className="absolute inset-0 bg-orange-400 opacity-20" />
//                                 <Text className="text-white font-bold text-[18px] mt-auto">Strain Score</Text>
//                                 <View className="w-12 h-12 bg-white rounded-full items-center justify-center border-4 border-white shadow-sm">
//                                     <Text className="text-[12px] font-bold text-orange-500">54%</Text>
//                                 </View>
//                             </View>
//                             <Text className="text-[14px] font-bold text-gray-900 mb-1">What is Strain Score?</Text>
//                             <Text className="text-[12px] font-medium text-gray-500 leading-4">Understand the intensity of your workouts and optimize...</Text>
//                         </TouchableOpacity>

//                         {/* Dummy Second Card */}
//                         <View className="w-[240px]">
//                             <View className="h-[120px] bg-gray-800 rounded-[20px] mb-3 p-4 flex-row justify-between items-start overflow-hidden relative">
//                                 <Text className="text-white font-bold text-[18px] mt-auto">Exercise Duration</Text>
//                             </View>
//                             <Text className="text-[14px] font-bold text-gray-900 mb-1">The Basics: Exercise</Text>
//                             <Text className="text-[12px] font-medium text-gray-500 leading-4">The amount of time you exercise per day plays a crucial...</Text>
//                         </View>
//                     </ScrollView>

//                 </ScrollView>

//                 <View className="absolute bottom-10 self-center">
//                     <Pressable
//                         className="bg-white px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100"
//                     >
//                         <Text className="text-[16px] mr-2">💪</Text>
//                         <Text className="font-bold text-[15px] text-gray-900 mr-2">Strain Score Update</Text>
//                         <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
//                     </Pressable>
//                 </View>

//                 <ResourceDetailSheet ref={resourceSheetRef} />
//             </View>
//         </BottomSheetModalProvider>

//     );
// }


import { ResourceDetailSheet, ResourceDetailSheetRef } from '@/components/strain/ResourceDetailSheet';
import { STRAIN_ANALYSIS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function StrainScoreModal() {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState('Strain Score');
    const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

    const resourceSheetRef = useRef<ResourceDetailSheetRef>(null);
    const CHART_DATA = [25, 45, 60, 50, 40, 15, 20, 65, 70, 45, 80, 50, 65, 20, 10, 35, 40];

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                <View className="px-5 pt-12 pb-6 border-b border-[#1E293B] flex-row items-center justify-between bg-[#151E33]">
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Strain telemetry</Text>
                        <Text className="text-xs text-slate-400 mt-1">Activity impact analysis</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="px-5 py-4 border-b border-[#1E293B] bg-[#090D16]">
                    <View className="flex-row bg-[#151E33] p-1 rounded-xl border border-[#1E293B]">
                        {['Strain Score', 'Exercise Duration', 'Daytime HR'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                activeOpacity={0.7}
                                className={`flex-1 py-2.5 items-center rounded-lg border ${selectedTab === tab ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                    }`}
                            >
                                <Text className={`text-[10px] font-bold ${selectedTab === tab ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    <View className="p-5">

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8">
                            <View className="flex-row items-center justify-between mb-8">
                                <Text className="text-sm font-semibold text-slate-400">Current baseline</Text>
                                <View className="bg-[#090D16] px-3 py-1.5 rounded-lg border border-[#1E293B] flex-row items-center gap-1.5">
                                    <Ionicons name="calendar-outline" size={12} color="#4DB9F2" />
                                    <Text className="text-[10px] font-bold text-slate-300">14 Sep 2025</Text>
                                </View>
                            </View>

                            <View className="flex-row items-baseline gap-2 mb-8">
                                <Text className="text-5xl font-bold text-[#F59E0B]">38</Text>
                                <Text className="text-lg font-bold text-slate-500">%</Text>
                            </View>

                            <View className="bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-row items-center justify-between mb-8">
                                <Text className="text-xs font-semibold text-slate-500">Normal range</Text>
                                <Text className="text-sm font-bold text-[#10B981]">8 - 64%</Text>
                            </View>

                            <View className="h-44 relative justify-end mb-4 border-b border-[#2D3748] pb-1">
                                <View className="absolute inset-0 justify-between py-2">
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">92 limit</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">62 upper</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">31 lower</Text></View>
                                    <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">0</Text></View>
                                </View>

                                <View className="absolute left-0 right-0 top-[55%] border-t border-dashed border-[#F59E0B] opacity-50 z-0" />
                                <View className="absolute left-[35%] top-[55%] -translate-y-2 bg-[#090D16] border border-[#2D3748] px-2 py-0.5 rounded flex-row items-center gap-1 z-20">
                                    <Text className="text-[10px] font-bold text-[#F59E0B]">Avg. 35%</Text>
                                </View>

                                <View className="absolute bottom-0 left-0 right-0 h-full flex-row items-end justify-between px-2 pt-2">
                                    {CHART_DATA.map((val, idx) => {
                                        const isLast = idx === CHART_DATA.length - 1;
                                        return (
                                            <View key={idx} className="items-center w-1" style={{ height: `${val}%` }}>
                                                <View className="flex-1 w-[2px] bg-[#F59E0B] opacity-60" />
                                                <View className={`absolute top-0 w-2.5 h-2.5 rounded-full border-2 ${isLast ? 'bg-[#090D16] border-[#F59E0B]' : 'bg-[#F59E0B] border-[#F59E0B]'
                                                    }`} />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>

                            <View className="flex-row justify-between mb-8">
                                <Text className="text-[10px] font-bold text-slate-500">15 Aug</Text>
                                <Text className="text-[10px] font-bold text-slate-500">30 Aug</Text>
                                <Text className="text-[10px] font-bold text-slate-500">14 Sep</Text>
                            </View>

                            <View className="flex-row bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                                {['1M', '3M', '6M', '1Y'].map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setSelectedTimeframe(time)}
                                        className={`flex-1 items-center justify-center py-2.5 rounded-lg border ${selectedTimeframe === time ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                            }`}
                                    >
                                        <Text className={`text-xs font-bold ${selectedTimeframe === time ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Score distribution limits</Text>
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                                <View className="flex-row h-2 rounded-full overflow-hidden mb-6">
                                    <View className="bg-amber-500 flex-[4]" />
                                    <View className="bg-orange-500 flex-[4.5]" />
                                    <View className="bg-rose-500 flex-[1.5]" />
                                </View>
                                <View className="gap-4">
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-amber-500" /><Text className="font-bold text-slate-200">Low</Text></View><Text className="text-slate-500 font-medium">{'<'} 34.0%</Text></View>
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-orange-500" /><Text className="font-bold text-slate-200">Normal</Text></View><Text className="text-slate-500 font-medium">34.0% - 67.0%</Text></View>
                                    <View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="w-2.5 h-2.5 rounded-full bg-rose-500" /><Text className="font-bold text-slate-200">High</Text></View><Text className="text-slate-500 font-medium">{'>'} 67.0%</Text></View>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Trends breakdown</Text>
                            <View className="bg-[#151E33] rounded-3xl p-6 border border-[#1E293B]">
                                <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Period</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs">Change</Text>
                                    <Text className="flex-1 font-semibold text-slate-500 text-xs text-right">Trend</Text>
                                </View>
                                {STRAIN_ANALYSIS.map((item, idx) => (
                                    <View key={idx} className={`flex-row items-center py-4 ${idx !== STRAIN_ANALYSIS.length - 1 ? 'border-b border-[#1E293B40]' : ''}`}>
                                        <Text className="flex-1 font-bold text-white text-sm">{item.period}</Text>
                                        <View className="flex-1 flex-row items-center gap-2">
                                            <Ionicons name={item.trend === 'down' ? 'arrow-down' : 'arrow-up'} size={14} color={item.trend === 'down' ? '#EF4444' : '#4DB9F2'} />
                                            <Text className={`font-bold text-sm ${item.trend === 'down' ? 'text-rose-500' : 'text-[#4DB9F2]'}`}>{item.change}</Text>
                                        </View>
                                        <View className="flex-1 items-end justify-center">
                                            <View className={`w-8 h-1 rounded-full ${item.trend === 'down' ? 'bg-rose-500' : 'bg-[#4DB9F2]'}`} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-lg font-bold text-white mb-4">Educational resources</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                                <TouchableOpacity
                                    onPress={() => resourceSheetRef.current?.present()}
                                    activeOpacity={0.8}
                                    className="w-64 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mr-4"
                                >
                                    <View className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center mb-4">
                                        <Ionicons name="fitness-outline" size={16} color="#F59E0B" />
                                    </View>
                                    <Text className="font-bold text-slate-100 text-base mb-1">What is Strain Score?</Text>
                                    <Text className="text-xs text-slate-400 leading-5">Understand the intensity of your workouts and optimize recovery periods...</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    className="w-64 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5"
                                >
                                    <View className="w-10 h-10 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center mb-4">
                                        <Ionicons name="barbell-outline" size={16} color="#4DB9F2" />
                                    </View>
                                    <Text className="font-bold text-slate-100 text-base mb-1">Exercise Duration</Text>
                                    <Text className="text-xs text-slate-400 leading-5">The amount of time you exercise per day plays a crucial role in overall strain accumulation...</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>

                <View className="absolute bottom-6 w-full items-center justify-center z-50 pointer-events-none">
                    <View className="bg-emerald-950/90 rounded-2xl px-5 py-4 flex-row items-center gap-3 border border-emerald-500/30 pointer-events-auto">
                        <Ionicons name="analytics" size={20} color="#10B981" />
                        <Text className="font-bold text-emerald-500 text-base">Strain Score Update</Text>
                    </View>
                </View>

                <ResourceDetailSheet ref={resourceSheetRef} />
            </View>
        </BottomSheetModalProvider>
    );
}