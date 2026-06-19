import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type SyncWatchSheetRef = BottomSheetModal;

type SyncState = 'disconnected' | 'connected' | 'synced';

export const SyncWatchSheet = forwardRef<SyncWatchSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['50%'], []);
    const [syncState, setSyncState] = useState<SyncState>('disconnected');

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
    ), []);

    useEffect(() => {
        if (syncState === 'disconnected') {
            const timer = setTimeout(() => setSyncState('connected'), 1500);
            return () => clearTimeout(timer);
        }
    }, [syncState]);

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
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom || 20 }} className="flex-1 pb-6">

                {/* Left-Aligned Header Block */}
                <View className="px-6 pt-4 pb-6 border-b border-[#1E293B] flex-row justify-between items-center bg-[#151E33]">
                    <View>
                        <Text className="text-xl font-bold text-slate-100">Sync manager</Text>
                        <Text className="text-xs text-slate-400 mt-1">Smartwatch connection manager</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleDismiss}
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* State & Last Sync Summary Block */}
                <View className="flex-row gap-4 px-6 mt-6">
                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center">
                            {syncState === 'disconnected' ? (
                                <Ionicons name="bluetooth-outline" size={18} color="#64748B" />
                            ) : (
                                <Ionicons name="checkmark-done-circle-outline" size={20} color="#10B981" />
                            )}
                        </View>
                        <View>
                            <Text className="text-[10px] text-slate-500 font-semibold">Status</Text>
                            <Text className={`text-base font-bold ${syncState === 'disconnected' ? 'text-slate-400' : 'text-emerald-400'}`}>
                                {syncState === 'disconnected' ? 'Offline' : 'Connected'}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#1E293B40] border border-[#1E293B] p-4 rounded-2xl flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center">
                            <Ionicons name="sync-outline" size={18} color="#4DB9F2" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[10px] text-slate-500 font-semibold">Last sync</Text>
                            <Text className="text-sm font-bold text-white" numberOfLines={1}>
                                {syncState === 'synced' ? 'Today, 10:36 PM' : 'No telemetry'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Outlined Instruction Warning Panel */}
                <View className="mx-6 mt-4 bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-row gap-4">
                    <Ionicons name="information-circle-outline" size={20} color="#4DB9F2" />
                    <View className="flex-1">
                        <Text className="text-sm font-semibold text-white mb-1">How to sync your watch</Text>
                        <Text className="text-xs text-slate-400 leading-5">
                            Please open both the watch and phone app, ensuring both devices are active to establish a data bridge.
                        </Text>
                    </View>
                </View>

                {/* Action Button (Modern High-Tech Block) */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        onPress={handleSync}
                        disabled={syncState === 'disconnected'}
                        activeOpacity={0.8}
                        className={`w-full h-14 rounded-2xl items-center justify-center flex-row gap-2 border ${syncState === 'disconnected'
                            ? 'bg-[#1E293B] border-[#1E293B]'
                            : 'bg-[#4DB9F2] border-[#4DB9F2]'
                            }`}
                    >
                        <Ionicons
                            name="refresh-outline"
                            size={20}
                            color={syncState === 'disconnected' ? '#64748B' : '#090D16'}
                        />
                        <Text className={`font-bold text-base ${syncState === 'disconnected' ? 'text-slate-500' : 'text-[#090D16]'
                            }`}>
                            sync
                        </Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});