// import { CAFFEINE_EXAMPLES } from '@/constants';
// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { forwardRef, useCallback, useMemo } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export type CaffeineInfoSheetRef = BottomSheetModal;

// export const CaffeineInfoSheet = forwardRef<CaffeineInfoSheetRef>((props, ref) => {
//     const insets = useSafeAreaInsets();
//     const snapPoints = useMemo(() => ['100%'], []);

//     const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);

//     const renderHandle = useCallback(
//         () => (
//             <View className="absolute top-3 left-0 right-0 items-center z-10">
//                 <View className="w-10 h-1 rounded-full bg-white/40" />
//             </View>
//         ),
//         []
//     );
//     return (
//         <BottomSheetModal
//             ref={ref}
//             index={0}
//             snapPoints={snapPoints}
//             backdropComponent={renderBackdrop}
//             handleComponent={renderHandle}
//             backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
//         >
//             <View className="flex-1">
//                 <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false} bounces={false}>

//                     {/* Header Image Area Mock */}
//                     <LinearGradient
//                         colors={['#A16207', '#D97706']}
//                         style={{
//                             height: 256,
//                             paddingHorizontal: 24,
//                             justifyContent: 'flex-end',
//                             paddingBottom: 32,
//                         }}
//                     >
//                         <View className="absolute top-4 left-0 right-0 items-center"><Text className="font-bold text-white/50 text-[14px] mt-3">Coffee</Text></View>
//                         <Text className="text-[28px] font-bold text-white mb-2 ">Coffee</Text>
//                         <Text className="text-[14px] text-white/90 leading-5">A cup of coffee (8 fl oz) usually has around 80-100 mg of caffeine.</Text>
//                     </LinearGradient>

//                     <View className="px-5 pt-6">
//                         {/* Segmented Control */}
//                         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
//                             <View className="bg-white border border-gray-200 rounded-full px-4 py-2 mr-3 "><Text className="font-bold text-gray-900">Coffee</Text></View>
//                             <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Tea</Text></View>
//                             <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Soft drink</Text></View>
//                             <View className="bg-gray-100 border border-gray-100 rounded-full px-4 py-2 mr-3"><Text className="font-bold text-gray-400">Energy</Text></View>
//                         </ScrollView>

//                         {/* List */}
//                         <View className="bg-white border border-gray-100 rounded-[24px] p-5">
//                             <Text className="text-[11px] font-bold text-gray-400 mb-4">Example</Text>
//                             <View className="gap-y-4">
//                                 {CAFFEINE_EXAMPLES.map(ex => (
//                                     <View key={ex.name} className="flex-row justify-between">
//                                         <Text className="text-[14px] font-medium text-gray-700">{ex.name}</Text>
//                                         <Text className="text-[14px] font-bold text-gray-900">{ex.amount}</Text>
//                                     </View>
//                                 ))}
//                             </View>
//                         </View>

//                         {/* Note */}
//                         <View className="flex-row mt-6 gap-2 px-2">
//                             <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
//                             <Text className="flex-1 text-[12px] text-gray-500 leading-5">According to the FDA, 400 mg is the maximum daily suggested caffeine intake for healthy adults.</Text>
//                         </View>
//                     </View>
//                 </BottomSheetScrollView>

//                 {/* Fixed Bottom Button */}
//                 <View className="absolute bottom-0 left-0 right-0 px-5 bg-[#FDFDFD]" style={{ paddingBottom: insets.bottom || 20, paddingTop: 10 }}>
//                     <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
//                         <Text className="text-white font-semibold text-[16px]">Done</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </BottomSheetModal>
//     );
// });


import { CAFFEINE_EXAMPLES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type CaffeineInfoSheetRef = BottomSheetModal;

export const CaffeineInfoSheet = forwardRef<CaffeineInfoSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['100%'], []);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleComponent={() => null}
            backgroundStyle={{ backgroundColor: '#090D16' }}
        >
            <View className="flex-1 flex-col">

                <View style={{ paddingTop: insets.top + 16 }} className="px-5 pb-6 bg-[#151E33] border-b border-[#1E293B]">
                    <View className="flex-row items-center justify-between mb-8">
                        <View className="flex-row items-center gap-2">
                            <View className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 items-center justify-center">
                                <Ionicons name="cafe" size={14} color="#F59E0B" />
                            </View>
                            <Text className="text-amber-500 font-bold text-xs uppercase tracking-widest">Stimulant Index</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => (ref as any).current?.dismiss()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <Text className="text-4xl font-bold text-white mb-2">Coffee base</Text>
                    <Text className="text-sm text-slate-400 leading-6">
                        A cup of coffee (8 fl oz) usually has around 80-100 mg of caffeine.
                    </Text>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false} bounces={false}>

                    <View className="px-5 pt-6 border-b border-[#1E293B] pb-6 bg-[#090D16]">
                        <View className="flex-row gap-2 bg-[#151E33] p-1 rounded-xl border border-[#1E293B]">
                            {['Coffee', 'Tea', 'Soft drink', 'Energy'].map((type) => {
                                const isActive = type === 'Coffee';
                                return (
                                    <TouchableOpacity
                                        key={type}
                                        activeOpacity={0.7}
                                        className={`flex-1 items-center justify-center py-2.5 rounded-lg border ${isActive ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                                            }`}
                                    >
                                        <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="px-5 pt-8">
                        <Text className="text-lg font-bold text-white mb-4">Reference samples</Text>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8">
                            <View className="flex-row border-b border-[#1E293B] pb-3 mb-3">
                                <Text className="flex-[2] font-semibold text-slate-500 text-xs">Example</Text>
                                <Text className="flex-1 font-semibold text-slate-500 text-xs text-right">Dosage</Text>
                            </View>

                            <View className="flex-col">
                                {CAFFEINE_EXAMPLES.map((ex, idx) => (
                                    <View
                                        key={ex.name}
                                        className={`flex-row items-center py-4 ${idx !== CAFFEINE_EXAMPLES.length - 1 ? 'border-b border-[#1E293B40]' : ''
                                            }`}
                                    >
                                        <Text className="flex-[2] text-sm font-semibold text-slate-300 pr-4">{ex.name}</Text>
                                        <Text className="flex-1 text-base font-bold text-[#F59E0B] text-right">{ex.amount}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="bg-amber-950/20 border border-amber-500/20 p-5 rounded-2xl flex-row gap-4 items-start">
                            <Ionicons name="information-circle" size={20} color="#F59E0B" />
                            <Text className="flex-1 text-xs text-amber-500/80 leading-5">
                                According to the FDA, 400 mg is the maximum daily suggested caffeine intake for healthy adults.
                            </Text>
                        </View>
                    </View>
                </BottomSheetScrollView>

                <View className="absolute bottom-0 left-0 right-0 px-5 pt-4 bg-[#090D16] border-t border-[#1E293B]" style={{ paddingBottom: insets.bottom || 24 }}>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Acknowledge</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </BottomSheetModal>
    );
});