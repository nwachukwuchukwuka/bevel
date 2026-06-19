// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export type TagSettingsSheetRef = BottomSheetModal;

// interface Props {
//     item: {
//         id: string;
//         label: string;
//         isPinned?: boolean;
//         logTime?: 'Daytime' | 'Nighttime';
//     } | null;
//     onSave: (id: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean) => void;
// }

// export const TagSettingsSheet = forwardRef<TagSettingsSheetRef, Props>(({ item, onSave }, ref) => {
//     const insets = useSafeAreaInsets();
//     const snapPoints = useMemo(() => ['60%'], []);
//     const [logTime, setLogTime] = useState<'Daytime' | 'Nighttime'>('Daytime');
//     const [isPinned, setIsPinned] = useState(false);

//     useEffect(() => {
//         if (item) {
//             setLogTime(item.logTime || 'Daytime');
//             setIsPinned(item.isPinned || false);
//         }
//     }, [item]);

//     const renderBackdrop = useCallback((props: any) => (
//         <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
//     ), []);

//     const dismiss = () => (ref as any).current?.dismiss();

//     if (!item) return null;

//     return (
//         <BottomSheetModal
//             ref={ref}
//             index={0}
//             snapPoints={snapPoints}
//             backdropComponent={renderBackdrop}
//             handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
//             backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
//             enableDynamicSizing={false}
//         >
//             <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">
//                 <Text className="text-center font-bold text-[15px] text-gray-900 mb-8">{item.label}</Text>

//                 <Text className="text-[14px] font-bold text-gray-900 mb-1">Log time</Text>
//                 <Text className="text-[12px] font-medium text-gray-400 mb-4 leading-5">This organizes your journal and morning reminders but won't impact how insights are calculated.</Text>

//                 {/* Segmented Control */}
//                 <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
//                     <TouchableOpacity
//                         onPress={() => setLogTime('Daytime')}
//                         className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Daytime' ? 'bg-white ' : ''}`}
//                     >
//                         <Text className={`text-[13px] font-bold ${logTime === 'Daytime' ? 'text-gray-900' : 'text-gray-500'}`}>Daytime</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={() => setLogTime('Nighttime')}
//                         className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Nighttime' ? 'bg-white ' : ''}`}
//                     >
//                         <Text className={`text-[13px] font-bold ${logTime === 'Nighttime' ? 'text-gray-900' : 'text-gray-500'}`}>Nighttime</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View className="flex-1 justify-end gap-3">
//                     <TouchableOpacity
//                         onPress={() => setIsPinned(!isPinned)}
//                         className="bg-gray-50 h-[56px] rounded-full items-center justify-center flex-row gap-2"
//                     >
//                         <Text className="text-gray-900 font-semibold text-[16px]">{isPinned ? 'Unpin' : 'Pin'}</Text>
//                         <Ionicons name={isPinned ? "pin" : "pin-outline"} size={16} color="#111827" />
//                         {isPinned && <Ionicons name="close" size={14} color="#111827" style={{ marginLeft: -4 }} />}
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={() => {
//                             onSave(item.id, logTime, isPinned);
//                             dismiss();
//                         }}
//                         className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center"
//                     >
//                         <Text className="text-white font-semibold text-[16px]">Save</Text>
//                     </TouchableOpacity>
//                 </View>
//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });


import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TagSettingsSheetRef = BottomSheetModal;

interface Props {
    item: {
        id: string;
        label: string;
        isPinned?: boolean;
        logTime?: 'Daytime' | 'Nighttime';
    } | null;
    onSave: (id: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean) => void;
}

export const TagSettingsSheet = forwardRef<TagSettingsSheetRef, Props>(({ item, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['55%'], []);

    const [logTime, setLogTime] = useState<'Daytime' | 'Nighttime'>('Daytime');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (item) {
            setLogTime(item.logTime || 'Daytime');
            setIsPinned(item.isPinned || false);
        }
    }, [item]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    if (!item) return null;

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-3">

                <View className="px-2 pb-6 border-b border-[#1E293B] flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">{item.label}</Text>
                        <Text className="text-sm text-slate-400 mt-1">Metric configuration</Text>
                    </View>
                    <TouchableOpacity
                        onPress={dismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-4 mb-4 flex-1">

                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-col justify-between">
                        <View>
                            <Text className="text-xs font-semibold text-slate-500 mb-2">Log time</Text>
                            <Text className="text-[10px] text-slate-400 mb-4 leading-4">
                                This organizes your journal and morning reminders but won't impact how insights are calculated.
                            </Text>
                        </View>

                        <View className="flex-col gap-2">
                            <TouchableOpacity
                                onPress={() => setLogTime('Daytime')}
                                activeOpacity={0.7}
                                className={`flex-row items-center gap-2 p-3 rounded-xl border ${logTime === 'Daytime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                    }`}
                            >
                                <View className={`w-2.5 h-2.5 rounded-full ${logTime === 'Daytime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                <Text className={`text-xs font-semibold ${logTime === 'Daytime' ? 'text-white' : 'text-slate-500'}`}>
                                    Daytime
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setLogTime('Nighttime')}
                                activeOpacity={0.7}
                                className={`flex-row items-center gap-2 p-3 rounded-xl border ${logTime === 'Nighttime'
                                        ? 'bg-[#1E293B] border-[#2D3748]'
                                        : 'bg-[#090D16] border-[#1E293B]'
                                    }`}
                            >
                                <View className={`w-2.5 h-2.5 rounded-full ${logTime === 'Nighttime' ? 'bg-[#4DB9F2]' : 'bg-[#2D3748]'}`} />
                                <Text className={`text-xs font-semibold ${logTime === 'Nighttime' ? 'text-white' : 'text-slate-500'}`}>
                                    Nighttime
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="w-[35%] flex-col justify-end">
                        <TouchableOpacity
                            onPress={() => setIsPinned(!isPinned)}
                            activeOpacity={0.7}
                            className={`border rounded-2xl p-4 flex-col items-center justify-center gap-3 h-28 ${isPinned
                                    ? 'bg-[#1E293B] border-[#4DB9F2]'
                                    : 'bg-[#1E293B40] border-[#1E293B]'
                                }`}
                        >
                            <View className={`w-10 h-10 rounded-xl items-center justify-center border ${isPinned
                                    ? 'bg-[#090D16] border-[#2D3748]'
                                    : 'bg-[#1E293B] border-[#2D3748]'
                                }`}>
                                <Ionicons
                                    name={isPinned ? "pin" : "pin-outline"}
                                    size={18}
                                    color={isPinned ? '#4DB9F2' : '#94A3B8'}
                                />
                            </View>
                            <Text className={`text-sm font-semibold ${isPinned ? 'text-white' : 'text-slate-500'}`}>
                                {isPinned ? 'Unpin' : 'Pin'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View className="mt-2 border-t border-[#1E293B] pt-4">
                    <TouchableOpacity
                        onPress={() => {
                            onSave(item.id, logTime, isPinned);
                            dismiss();
                        }}
                        activeOpacity={0.8}
                        className="bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save configuration</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});