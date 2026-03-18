import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LibrarySheet } from './components/LibrarySheet';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onValueChange(!value)}
        className={`w-[50px] h-[30px] rounded-full justify-center px-1 ${value ? 'bg-[#22C55E]' : 'bg-gray-200'}`}
    >
        <View className={`w-6 h-6 bg-white rounded-full  transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </TouchableOpacity>
);

export default function AdvancedSettingsScreen() {
    const router = useRouter();
    const librarySheetRef = useRef<BottomSheetModal>(null);

    // State
    const [toggles, setToggles] = useState({ warmUp: true, failure: false, coolDown: true, dropset: false });
    const [excluded, setExcluded] = useState<any[]>([]);

    const initialToggles = { warmUp: true, failure: false, coolDown: true, dropset: false };

    // Derived state to enable the save button
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
        // Add new ones avoiding duplicates
        setExcluded(prev => {
            const combined = [...prev, ...newExercises];
            return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>

                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="w-10">
                        <Ionicons name="chevron-back" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="font-medium text-gray-700 text-[15px]">Advanced Settings</Text>
                    <View className="w-10" />
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

                    {/* Profile Section */}
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-3 mt-4">Profile</Text>
                    <View className="bg-white rounded-2xl  border border-gray-100 mb-6">
                        <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-gray-50">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name="leaf" size={20} color="#4B5563" />
                                <View>
                                    <Text className="font-bold text-gray-900">Beginner</Text>
                                    <Text className="text-gray-400 text-xs">Experience</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-gray-50">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name="barbell" size={20} color="#4B5563" />
                                <View>
                                    <Text className="font-bold text-gray-900">Get stronger</Text>
                                    <Text className="text-gray-400 text-xs">Training Goal</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row justify-between items-center p-4">
                            <Text className="font-bold text-gray-900">Equipment</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-gray-500 font-medium text-[13px]">7 hidden</Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Structure Section */}
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-3">Structure</Text>
                    <View className="bg-white rounded-2xl  border border-gray-100 mb-6">
                        <View className="flex-row justify-between items-center p-4 border-b border-gray-50">
                            <Text className="font-bold text-gray-900 text-[15px]">Warm Up</Text>
                            <CustomSwitch value={toggles.warmUp} onValueChange={(v) => setToggles({ ...toggles, warmUp: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-4 border-b border-gray-50">
                            <Text className="font-bold text-gray-900 text-[15px]">Failure</Text>
                            <CustomSwitch value={toggles.failure} onValueChange={(v) => setToggles({ ...toggles, failure: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-4 border-b border-gray-50">
                            <Text className="font-bold text-gray-900 text-[15px]">Cool Down</Text>
                            <CustomSwitch value={toggles.coolDown} onValueChange={(v) => setToggles({ ...toggles, coolDown: v })} />
                        </View>
                        <View className="flex-row justify-between items-center p-4">
                            <Text className="font-bold text-gray-900 text-[15px]">Dropset</Text>
                            <CustomSwitch value={toggles.dropset} onValueChange={(v) => setToggles({ ...toggles, dropset: v })} />
                        </View>
                    </View>

                    <View className="bg-white rounded-2xl  border border-gray-100 flex-row justify-between items-center p-4 mb-8">
                        <Text className="font-bold text-gray-900 text-[15px]">Supersets/Circuits</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="font-bold text-gray-900 text-[15px]">Some</Text>
                            <Ionicons name="chevron-up" size={12} color="#4B5563" style={{ marginBottom: -6 }} />
                            <Ionicons name="chevron-down" size={12} color="#4B5563" style={{ marginLeft: -16, marginTop: 6 }} />
                        </View>
                    </View>

                    {/* Excluded Exercises Section */}
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-400 font-bold text-xs uppercase">Excluded Exercises</Text>
                        <Text className="text-gray-400 font-medium text-xs">{excluded.length} exercises</Text>
                    </View>

                    <View className="gap-3">
                        {/* Render Selected Excluded Items */}
                        {excluded.map(ex => (
                            <View key={ex.id} className="bg-white border border-gray-200  rounded-2xl p-3 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                                        <Text className="text-lg">{ex.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-gray-900 text-[14px]">{ex.name}</Text>
                                        <Text className="text-gray-500 text-[11px]">{ex.type}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleRemoveExcluded(ex.id)}
                                    className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="close" size={14} color="#6B7280" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {/* Add Button */}
                        <TouchableOpacity
                            onPress={() => librarySheetRef.current?.present()}
                            className="border border-dashed border-gray-300 rounded-2xl p-4 flex-row items-center gap-3 bg-white"
                        >
                            <Ionicons name="add" size={20} color="#4B5563" />
                            <Text className="font-medium text-gray-600 text-[15px]">Add exercise</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                {/* Footer Save Button */}
                <View className="absolute bottom-0 left-0 right-0 bg-[#F9FAFB] px-5 pt-4 pb-8 border-t border-transparent">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        disabled={!hasChanges}
                        className={`py-4 rounded-full items-center ${hasChanges ? 'bg-[#1A1A1A] shadow-lg' : 'bg-gray-400'}`}
                    >
                        <Text className="text-white font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Mount the Bottom Sheet */}
                <LibrarySheet ref={librarySheetRef} onExclude={handleAddExcluded} />
            </SafeAreaView>
        </BottomSheetModalProvider>

    );
}