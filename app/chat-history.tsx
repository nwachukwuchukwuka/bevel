import { PersonalizationSheet } from '@/components/PersonalizationSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatHistoryScreen() {
    const router = useRouter();
    const personalizationSheetRef = useRef<BottomSheetModal>(null);

    // State for history items
    const [history, setHistory] = useState([
        { id: '1', date: 'Today', title: 'Improving VO2 Max' },
        { id: '2', date: 'Today', title: 'Improving Cardio Status' },
    ]);

    // State to track which item's context menu is open
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        setActiveMenuId(null);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F4F5F9]" edges={['top']}>
                {/* Header */}
                <View className="flex-row justify-between items-center px-5 py-4 mb-2">
                    <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                        <Ionicons name="close" size={18} color="#4B5563" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">History</Text>
                    <TouchableOpacity onPress={() => personalizationSheetRef.current?.present()} className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                        <Ionicons name="settings-sharp" size={16} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
                    {/* Start New Chat Button */}
                    <TouchableOpacity className="bg-white rounded-2xl py-4 flex-row justify-center items-center gap-2 shadow-sm mb-4">
                        <Text className="font-bold text-gray-900">Start new chat</Text>
                        <Ionicons name="create-outline" size={18} color="black" />
                    </TouchableOpacity>

                    {/* History List */}
                    {history.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onLongPress={() => setActiveMenuId(item.id)}
                            delayLongPress={300}
                            className="bg-white rounded-2xl p-4 shadow-sm relative"
                        >
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className="text-gray-400 text-xs font-medium">{item.date}</Text>
                                <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                            </View>
                            <Text className="font-medium text-gray-900 text-[15px]">{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Context Menu Overlay (Triggered by Long Press) */}
                {activeMenuId && (
                    <View className="absolute inset-0 z-50 items-center justify-center">
                        {/* Blur Backdrop */}
                        <BlurView intensity={30} tint="light" className="absolute inset-0">
                            <Pressable className="flex-1" onPress={() => setActiveMenuId(null)} />
                        </BlurView>

                        {/* Fake item highlight (to show which item is active) */}
                        <View className="bg-white rounded-2xl p-4 shadow-sm w-[90%] mb-2 opacity-90">
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className="text-gray-400 text-xs font-medium">Today</Text>
                                <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                            </View>
                            <Text className="font-medium text-gray-900 text-[15px]">
                                {history.find(h => h.id === activeMenuId)?.title}
                            </Text>
                        </View>

                        {/* The actual popover menu */}
                        <View className="bg-white rounded-2xl w-[90%] shadow-xl">
                            <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-gray-100">
                                <Text className="font-semibold text-gray-900">Edit</Text>
                                <Ionicons name="pencil" size={18} color="#4B5563" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(activeMenuId)} className="flex-row justify-between items-center p-4">
                                <Text className="font-semibold text-red-500">Delete</Text>
                                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <PersonalizationSheet ref={personalizationSheetRef} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}