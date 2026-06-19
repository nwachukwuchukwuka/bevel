// import { VO2MaxInfoSheet, VO2MaxInfoSheetRef } from '@/components/biology/VO2MaxInfoSheet';
// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useRef } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function VO2MaxModal() {
//     const router = useRouter();
//     const infoSheetRef = useRef<VO2MaxInfoSheetRef>(null);

//     return (
//         <BottomSheetModalProvider>
//             <View className="flex-1 bg-white">
//                 {/* Modal Handle */}
//                 <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

//                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

//                     <View className="px-5 flex-row items-center justify-between mb-6">
//                         <View className="flex-row items-center gap-2">
//                             <Ionicons name="fitness" size={20} color="#6B7280" />
//                             <Text className="text-[16px] font-bold text-gray-600">VO₂ Max</Text>
//                         </View>
//                         <TouchableOpacity onPress={() => infoSheetRef.current?.present()} className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center bg-gray-50">
//                             <Ionicons name="information" size={16} color="#9CA3AF" />
//                         </TouchableOpacity>
//                     </View>

//                     <View className="px-5 flex-row justify-between items-end mb-8">
//                         <View>
//                             <Text className="text-[36px] font-bold text-gray-900 tracking-tight">29.9</Text>
//                             <Text className="text-[14px] font-medium text-gray-500">10 Aug 2025</Text>
//                         </View>
//                         <Text className="text-[16px] font-bold text-yellow-500">Fair</Text>
//                     </View>

//                     {/* Chart Area */}
//                     <View className="px-5 mb-8 relative h-72">
//                         {/* Y-Axis Line Chart Labels */}
//                         <View className="absolute right-5 top-0 bottom-24 justify-between items-end z-0">
//                             <Text className="text-[10px] font-bold text-gray-400">30,2</Text>
//                             <Text className="text-[10px] font-bold text-yellow-500">30,1</Text>
//                             <Text className="text-[10px] font-bold text-yellow-500">25,3</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">25,2</Text>
//                         </View>

//                         {/* Line Chart Background Gradient */}
//                         <View className="absolute top-10 left-5 right-14 h-32 overflow-hidden">
//                             <LinearGradient colors={['rgba(250, 204, 21, 0.2)', 'rgba(250, 204, 21, 0)']} style={{ width: '100%', height: '100%' }} />
//                         </View>

//                         {/* Line Chart Mock */}
//                         <View className="absolute top-10 left-5 right-14 h-32 flex-row items-end pb-8">
//                             <View className="flex-1 h-full border-t-[3px] border-yellow-500 transform -rotate-6 translate-y-4" />
//                             <View className="w-3 h-3 bg-white border-[3px] border-yellow-500 rounded-full shadow-sm absolute right-0 top-0" />
//                             <Text className="absolute left-2 top-2 text-[10px] font-bold text-yellow-500">Fair</Text>
//                         </View>

//                         {/* Y-Axis Bar Chart Labels */}
//                         <View className="absolute right-5 bottom-8 h-20 justify-between items-end z-0">
//                             <Text className="text-[10px] font-bold text-gray-400">83,6</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">55,7</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">27,9</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">0</Text>
//                         </View>

//                         {/* Bar Chart Mock (Strain) */}
//                         <View className="absolute bottom-8 left-5 right-14 h-20 flex-row items-end justify-between gap-[2px]">
//                             {Array.from({ length: 20 }).map((_, i) => {
//                                 const height = Math.max(10, Math.random() * 100);
//                                 const isHigh = height > 70;
//                                 return (
//                                     <View key={i} className={`flex-1 rounded-t-sm ${isHigh ? 'bg-orange-500' : 'bg-yellow-400'}`} style={{ height: `${height}%` }} />
//                                 );
//                             })}
//                         </View>

//                         {/* X-Axis */}
//                         <View className="absolute bottom-0 left-5 right-14 flex-row justify-between">
//                             <Text className="text-[10px] font-bold text-gray-400">11 Jul</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">18 Jul</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">26 Jul</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">2 Aug</Text>
//                             <Text className="text-[10px] font-bold text-gray-400">10 Aug</Text>
//                         </View>
//                     </View>

//                     <View className="px-5 flex-row items-center gap-1.5 mb-6">
//                         <Ionicons name="bar-chart" size={14} color="#F59E0B" />
//                         <Text className="text-[12px] font-bold text-gray-500">Strain</Text>
//                     </View>

//                     {/* Timeframe Selector */}
//                     <View className="px-5 flex-row items-center justify-between mb-10">
//                         <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-back" size={16} color="#9CA3AF" /></TouchableOpacity>
//                         <View className="flex-row items-center gap-1">
//                             <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm"><Text className="text-[12px] font-bold text-gray-900">1M</Text></TouchableOpacity>
//                             <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">3M</Text></TouchableOpacity>
//                             <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">6M</Text></TouchableOpacity>
//                             <TouchableOpacity className="w-10 h-8 items-center justify-center rounded-full"><Text className="text-[12px] font-bold text-gray-400">1Y</Text></TouchableOpacity>
//                         </View>
//                         <View className="flex-row gap-2">
//                             <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="calendar-outline" size={14} color="#9CA3AF" /></TouchableOpacity>
//                             <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center"><Ionicons name="chevron-forward" size={16} color="#9CA3AF" /></TouchableOpacity>
//                         </View>
//                     </View>

//                     {/* Dummy Content to allow scrolling */}
//                     <View className="px-5">
//                         <Text className="text-[16px] font-bold text-gray-900 mb-1">Trends Analysis</Text>
//                         <Text className="text-[12px] font-medium text-gray-500 mb-4">Last data point on 10 Aug 2025</Text>
//                     </View>

//                 </ScrollView>

//                 {/* Floating Button */}
//                 <View className="absolute bottom-10 self-center">
//                     <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
//                         <Text className="text-[16px] mr-2">📈</Text>
//                         <Text className="font-bold text-[14px] text-gray-900 mr-2">VO2 Max on the Rise!</Text>
//                         <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
//                     </TouchableOpacity>
//                 </View>

//                 <VO2MaxInfoSheet ref={infoSheetRef} />
//             </View>
//         </BottomSheetModalProvider>
//     );
// }


import { VO2MaxInfoSheet, VO2MaxInfoSheetRef } from '@/components/biology/VO2MaxInfoSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function VO2MaxModal() {
    const infoSheetRef = useRef<VO2MaxInfoSheetRef>(null);

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                {/* Custom Modal Handle */}
                <View className="items-center py-3">
                    <View className="w-10 h-1 bg-[#1E293B] rounded-full" />
                </View>

                {/* Custom Header */}
                <View className="px-5 pb-5 flex-row items-center justify-between border-b border-[#1E293B]">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                            <Ionicons name="fitness-outline" size={18} color="#4DB9F2" />
                        </View>
                        <Text className="text-xl font-bold text-slate-100">Vo2 max analysis</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => infoSheetRef.current?.present()}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="information-circle-outline" size={20} color="#F59E0B" />
                    </TouchableOpacity>
                </View>

                {/* Timeframe Selector (Positioned at the top for radical structural shift) */}
                <View className="px-5 py-4 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                    <View className="flex-row gap-2 bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                        {['1M', '3M', '6M', '1Y'].map((item) => {
                            const isActive = item === '1M';
                            return (
                                <TouchableOpacity
                                    key={item}
                                    className={`px-3 py-1.5 rounded-lg border ${isActive ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                        }`}
                                >
                                    <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

                    {/* Integrated Summary Card */}
                    <View className="mx-5 mt-6 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                        <View className="flex-row items-center gap-4">
                            <View className="bg-orange-950/20 w-12 h-12 rounded-xl items-center justify-center border border-orange-500/20">
                                <Ionicons name="pulse" size={24} color="#F59E0B" />
                            </View>
                            <View>
                                <Text className="text-3xl font-bold text-slate-100">29.9</Text>
                                <Text className="text-xs text-slate-400 mt-0.5">Recorded on 10 Aug 2025</Text>
                            </View>
                        </View>
                        <View className="bg-orange-950/40 px-3 py-1.5 rounded-xl border border-orange-500/20">
                            <Text className="text-xs font-bold text-[#F59E0B]">Fair condition</Text>
                        </View>
                    </View>

                    {/* Highly Structured Technical Chart Panel */}
                    <View className="mx-5 mt-4 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-sm font-semibold text-slate-400">Biological markers</Text>
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2.5 h-2.5 rounded-full bg-[#4DB9F2]" />
                                <Text className="text-xs text-slate-400">Vo2 max history</Text>
                            </View>
                        </View>

                        <View className="h-44 relative justify-end mt-4">
                            {/* Flat scale lines */}
                            <View className="absolute inset-0 justify-between">
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">Optimal (30,2)</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">Fair (25,3)</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">Low (25,2)</Text></View>
                            </View>

                            {/* Solid bar chart readout */}
                            <View className="absolute bottom-0 left-0 right-0 h-32 flex-row items-end justify-between gap-[3px]">
                                {Array.from({ length: 18 }).map((_, i) => {
                                    const height = Math.max(15, Math.random() * 90);
                                    const isTarget = i === 14; // Highlight current point
                                    return (
                                        <View key={i} className="flex-1 flex-col items-center">
                                            <View
                                                className={`w-full rounded-t-sm ${isTarget ? 'bg-[#F59E0B]' : 'bg-[#4DB9F2] opacity-40'}`}
                                                style={{ height: `${height}%` }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-4 pt-3 border-t border-[#1E293B]">
                            <Text className="text-[10px] font-bold text-slate-500">11 Jul</Text>
                            <Text className="text-[10px] font-bold text-slate-500">26 Jul</Text>
                            <Text className="text-[10px] font-bold text-slate-500">10 Aug</Text>
                        </View>
                    </View>

                    {/* Integrated Success Tag Indicator */}
                    <View className="mx-5 mt-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-lg bg-emerald-500/10 items-center justify-center">
                                <Ionicons name="trending-up" size={16} color="#10B981" />
                            </View>
                            <Text className="text-sm font-semibold text-white">VO2 Max on the rise!</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#10B981" />
                    </View>

                    {/* Flat Trends Analysis Area */}
                    <View className="mx-5 mt-4 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mb-10">
                        <Text className="text-base font-bold text-slate-100 mb-1">Trends analysis</Text>
                        <Text className="text-xs text-slate-400 mb-4">Last data point on 10 Aug 2025</Text>
                        <Text className="text-xs text-slate-400 leading-5">Your cardiac metrics are steadily improving due to targeted physical pacing blocks and structured recovery logs.</Text>
                    </View>

                </ScrollView>

                <VO2MaxInfoSheet ref={infoSheetRef} />
            </View>
        </BottomSheetModalProvider>
    );
}