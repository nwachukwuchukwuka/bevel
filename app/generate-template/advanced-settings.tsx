import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LibrarySheet } from './components/LibrarySheet';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => (
    <TouchableOpacity
        activeOpacity={1}
        onPress={() => onValueChange(!value)}
        className={`w-12 h-[26px] rounded-full border justify-center px-0.5 ${value ? 'bg-[#4DB9F2]/20 border-[#4DB9F2]' : 'bg-[#090D16] border-[#2D3748]'
            }`}
    >
        <View
            className={`w-[18px] h-[18px] rounded-full transition-transform ${value ? 'translate-x-6 bg-[#4DB9F2]' : 'translate-x-0 bg-[#64748B]'
                }`}
        />
    </TouchableOpacity>
);

export default function AdvancedSettingsScreen() {
    const router = useRouter();
    const librarySheetRef = useRef<BottomSheetModal>(null);

    const [toggles, setToggles] = useState({ warmUp: true, failure: false, coolDown: true, dropset: false });
    const [excluded, setExcluded] = useState<any[]>([]);

    const initialToggles = { warmUp: true, failure: false, coolDown: true, dropset: false };

    const hasChanges =
        toggles.warmUp !== initialToggles.warmUp ||
        toggles.failure !== initialToggles.failure ||
        toggles.coolDown !== initialToggles.coolDown ||
        toggles.dropset !== initialToggles.dropset ||
        excluded.length > 0;

    const handleRemoveExcluded = (id: string) => {
        setExcluded(prev => prev.filter(ex => ex.id !== id));
    };

    const handleAddExcluded = (newExercises: any[]) => {
        setExcluded(prev => {
            const combined = [...prev, ...newExercises];
            return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                {/* Left-Aligned Structural Header */}
                <View className="flex-row items-start justify-between px-5 pt-6 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Advanced Settings</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Configure your workout parameters</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center mt-1"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

                    {/* Profile Section */}
                    <Text className="text-slate-500 font-bold text-[13px] px-5 mb-3">Profile Configuration</Text>
                    <View className="mx-5 bg-[#151E33] border border-[#1E293B] rounded-[24px] mb-8 overflow-hidden">
                        <TouchableOpacity className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                    <Ionicons name="leaf" size={20} color="#10B981" />
                                </View>
                                <View>
                                    <Text className="font-bold text-slate-100 text-[16px] mb-1">Beginner</Text>
                                    <Text className="text-slate-500 text-[13px] font-medium">Experience level</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#64748B" />
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                    <Ionicons name="barbell" size={20} color="#4DB9F2" />
                                </View>
                                <View>
                                    <Text className="font-bold text-slate-100 text-[16px] mb-1">Get stronger</Text>
                                    <Text className="text-slate-500 text-[13px] font-medium">Primary goal</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#64748B" />
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row justify-between items-center p-5">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                    <Ionicons name="construct" size={20} color="#F59E0B" />
                                </View>
                                <View>
                                    <Text className="font-bold text-slate-100 text-[16px] mb-1">Equipment</Text>
                                    <Text className="text-slate-500 text-[13px] font-medium">7 items hidden</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    {/* Structure Section */}
                    <Text className="text-slate-500 font-bold text-[13px] px-5 mb-3">Session Structure</Text>
                    <View className="mx-5 bg-[#151E33] border border-[#1E293B] rounded-[24px] mb-4 overflow-hidden">
                        <View className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                            <Text className="font-bold text-slate-100 text-[16px]">Warm Up Routine</Text>
                            <CustomSwitch value={toggles.warmUp} onValueChange={(v) => setToggles({ ...toggles, warmUp: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                            <Text className="font-bold text-slate-100 text-[16px]">Train to Failure</Text>
                            <CustomSwitch value={toggles.failure} onValueChange={(v) => setToggles({ ...toggles, failure: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                            <Text className="font-bold text-slate-100 text-[16px]">Cool Down Routine</Text>
                            <CustomSwitch value={toggles.coolDown} onValueChange={(v) => setToggles({ ...toggles, coolDown: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-5">
                            <Text className="font-bold text-slate-100 text-[16px]">Enable Dropsets</Text>
                            <CustomSwitch value={toggles.dropset} onValueChange={(v) => setToggles({ ...toggles, dropset: v })} />
                        </View>
                    </View>

                    {/* Supersets Block */}
                    <TouchableOpacity className="mx-5 bg-[#151E33] border border-[#1E293B] rounded-[20px] flex-row justify-between items-center p-5 mb-8">
                        <Text className="font-bold text-slate-100 text-[16px]">Supersets & Circuits</Text>
                        <View className="flex-row items-center gap-3">
                            <Text className="font-bold text-[#4DB9F2] text-[15px]">Some</Text>
                            <View className="bg-[#1E293B] border border-[#2D3748] rounded-[10px] p-1.5">
                                <Ionicons name="swap-vertical" size={14} color="#94A3B8" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Excluded Exercises Section */}
                    <View className="flex-row justify-between items-center px-5 mb-4">
                        <Text className="text-slate-500 font-bold text-[13px]">Excluded Exercises</Text>
                        <View className="bg-[#1E293B] border border-[#2D3748] px-2.5 py-1 rounded-md">
                            <Text className="text-slate-400 font-bold text-[11px]">{excluded.length} filtered</Text>
                        </View>
                    </View>

                    <View className="px-5 gap-3">
                        {excluded.map(ex => (
                            <View key={ex.id} className="bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                        <Text className="text-[20px]">{ex.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-slate-100 text-[15px] mb-1">{ex.name}</Text>
                                        <Text className="text-slate-500 text-[12px] font-medium">{ex.type}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleRemoveExcluded(ex.id)}
                                    className="w-8 h-8 bg-rose-950/20 border border-rose-500/20 rounded-[10px] items-center justify-center"
                                >
                                    <Ionicons name="trash" size={14} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            onPress={() => librarySheetRef.current?.present()}
                            className="border border-dashed border-[#4DB9F2]/40 bg-[#4DB9F2]/5 rounded-[20px] p-5 flex-row items-center justify-center gap-2 mt-1"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="font-bold text-[#4DB9F2] text-[15px]">Add exercise</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                {/* Hard Boxed Footer */}
                <View className="absolute bottom-0 w-full bg-[#090D16] px-5 pt-4 pb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        disabled={!hasChanges}
                        className={`py-4 rounded-[16px] items-center border ${hasChanges
                            ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                            : 'bg-[#151E33] border-[#1E293B]'
                            }`}
                    >
                        <Text className={`font-bold text-[16px] ${hasChanges ? 'text-[#090D16]' : 'text-slate-500'}`}>
                            Save configuration
                        </Text>
                    </TouchableOpacity>
                </View>

                <LibrarySheet ref={librarySheetRef} onExclude={handleAddExcluded} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}