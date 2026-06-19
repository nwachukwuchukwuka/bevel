import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type HideDataSourcesSheetRef = BottomSheetModal;
interface Props { sources: any[]; onSave: (updated: any[]) => void; }

export const HideDataSourcesSheet = forwardRef<HideDataSourcesSheetRef, Props>(({ sources, onSave }, ref) => {
    const insets = useSafeAreaInsets();

    // Increased snap point slightly to accommodate the new spacious layout
    const snapPoints = useMemo(() => ['85%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.7} />,
        []
    );

    const [localSources, setLocalSources] = useState(sources);

    const toggleHide = (id: string) => {
        setLocalSources(localSources.map(s => s.id === id ? { ...s, isHidden: !s.isHidden } : s));
    };

    const handleSave = () => {
        onSave(localSources);
        (ref as any).current?.dismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
        >
            <BottomSheetView className="flex-1 pb-8">

                {/* Left-Aligned Structural Header */}
                <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Hide data sources</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Toggle visibility for metric calculations</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center mt-1"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Hard-Boxed List Container */}
                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] overflow-hidden">
                        {localSources.map((s, index) => {
                            const isLast = index === localSources.length - 1;

                            return (
                                <TouchableOpacity
                                    key={s.id}
                                    onPress={() => toggleHide(s.id)}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center justify-between p-5 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}
                                >
                                    <View className="flex-row items-center gap-4 flex-1">
                                        {/* Status Indicator Dot */}
                                        <View className={`w-2.5 h-2.5 rounded-sm border ${s.isHidden
                                            ? 'bg-slate-800 border-slate-700'
                                            : 'bg-[#4DB9F2] border-[#4DB9F2]'
                                            }`} />

                                        <View className="flex-1 pr-2">
                                            <Text className={`font-bold text-[16px] mb-1 ${s.isHidden ? 'text-slate-500' : 'text-slate-100'
                                                }`}>
                                                {s.name}
                                            </Text>
                                            <Text className={`font-medium text-[13px] ${s.isHidden ? 'text-slate-600' : 'text-slate-400'
                                                }`}>
                                                {s.sub}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Action Toggle Button */}
                                    <View
                                        className={`w-12 h-12 rounded-[14px] items-center justify-center border ${s.isHidden
                                            ? 'bg-[#090D16] border-[#2D3748]'
                                            : 'bg-[#4DB9F2]/10 border-[#4DB9F2]/30'
                                            }`}
                                    >
                                        <Ionicons
                                            name={s.isHidden ? "eye-off" : "eye"}
                                            size={20}
                                            color={s.isHidden ? "#64748B" : "#4DB9F2"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </BottomSheetScrollView>

                {/* Persistent Footer Action */}
                <View className="px-5 pt-4 bg-[#090D16]">
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#4DB9F2] h-[56px] rounded-[16px] border border-[#4DB9F2] items-center justify-center"
                    >
                        <Text className="text-[#090D16] font-bold text-[16px]">Save</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});