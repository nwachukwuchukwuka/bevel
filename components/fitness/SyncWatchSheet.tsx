import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SyncWatchSheetRef = BottomSheetModal;

type SyncState = 'disconnected' | 'connected' | 'synced';

export const SyncWatchSheet = forwardRef<SyncWatchSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['45%'], []);
    const [syncState, setSyncState] = useState<SyncState>('disconnected');

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);

    // Simulate connection delay when sheet opens
    useEffect(() => {
        if (syncState === 'disconnected') {
            const timer = setTimeout(() => setSyncState('connected'), 1500);
            return () => clearTimeout(timer);
        }
    }, [syncState]);

    // Reset state when dismissed
    const handleDismiss = () => {
        if (ref && 'current' in ref && (ref as any).current) {
            (ref as any).current.dismiss();
            setTimeout(() => setSyncState('disconnected'), 300);
        }
    };

    const handleSync = () => {
        if (syncState === 'connected') {
            setSyncState('synced');
        }
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            onDismiss={() => setSyncState('disconnected')}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
            enableDynamicSizing={false}
        >

            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 px-6 pt-6">

                <Text className="text-[14px] font-bold text-gray-900 mb-1">Last sync time</Text>
                {syncState === 'synced' ? (
                    <Text className="text-[14px] text-gray-900 mb-8">14/09/25 at 10.36 PM</Text>
                ) : (
                    <Text className="text-[14px] text-gray-900 mb-8">—</Text>
                )}

                <View className="flex-row items-center gap-2 mb-8">
                    {syncState === 'disconnected' ? (
                        <Ionicons name="close-circle" size={24} color="#D1D5DB" />
                    ) : (
                        <Ionicons name="checkmark-circle" size={24} color="#34D399" />
                    )}
                    <Text className={`text-[16px] font-bold ${syncState === 'disconnected' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {syncState === 'disconnected' ? 'Disconnected' : 'Connected'}
                    </Text>
                </View>

                <Text className="text-[14px] font-bold text-gray-900 mb-2">How to sync iOS and watch app</Text>
                <Text className="text-[13px] text-gray-500 leading-5 mb-8">
                    Please open the iOS and watch app and make sure both devices are awake to sync data.
                </Text>

                <TouchableOpacity
                    onPress={handleSync}
                    disabled={syncState === 'disconnected'}
                    className={`h-[56px] rounded-full items-center justify-center mt-auto ${syncState === 'disconnected' ? 'bg-gray-200' : 'bg-[#1C1C1E]'}`}
                >
                    <Text className={`font-semibold text-[16px] ${syncState === 'disconnected' ? 'text-gray-400' : 'text-white'}`}>
                        Tap to sync
                    </Text>
                </TouchableOpacity>

            </BottomSheetView>
        </BottomSheetModal>
    );
});