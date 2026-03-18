import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type HideDataSourcesSheetRef = BottomSheetModal;
interface Props { sources: any[]; onSave: (updated: any[]) => void; }

export const HideDataSourcesSheet = forwardRef<HideDataSourcesSheetRef, Props>(({ sources, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['75%'], []); // Explicit size, dynamic false
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);

    // Local state for editing within the sheet
    const [localSources, setLocalSources] = useState(sources);

    const toggleHide = (id: string) => {
        setLocalSources(localSources.map(s => s.id === id ? { ...s, isHidden: !s.isHidden } : s));
    };

    const handleSave = () => {
        onSave(localSources);
        (ref as any).current?.dismiss();
    };

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enableDynamicSizing={false} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }} backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}>
            <BottomSheetView className="flex-1 px-5 pt-4" style={{ paddingBottom: insets.bottom || 20 }}>
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-6">Hide data sources</Text>

                <View className="gap-3 mb-auto">
                    {localSources.map(s => (
                        <View key={s.id} className={`flex-row items-center justify-between p-4 rounded-[16px] border ${s.isHidden ? 'border-gray-50 bg-gray-50/50' : 'border-gray-200 bg-white'}`}>
                            <View>
                                <Text className={`text-[15px] font-bold mb-1 ${s.isHidden ? 'text-gray-300' : 'text-gray-900'}`}>{s.name}</Text>
                                <Text className={`text-[12px] ${s.isHidden ? 'text-gray-200' : 'text-gray-500'}`}>{s.sub}</Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleHide(s.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <Ionicons name={s.isHidden ? "eye-off" : "eye"} size={20} color={s.isHidden ? "#D1D5DB" : "#111827"} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity onPress={handleSave} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center mb-6 mt-4">
                    <Text className="text-white font-semibold text-[16px]">Save</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});