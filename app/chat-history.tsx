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

    const [history, setHistory] = useState([
        { id: '1', date: 'Today', title: 'Improving VO2 Max' },
        { id: '2', date: 'Today', title: 'Improving Cardio Status' },
    ]);

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        setActiveMenuId(null);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
                {/* Header (Left Aligned Structural) */}
                <View className="flex-row justify-between items-start px-5 py-6">
                    <View className="flex-1">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">History</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Manage your past conversations</Text>
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => personalizationSheetRef.current?.present()}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="settings" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 12 }}>
                    {/* Start New Chat Button */}
                    <TouchableOpacity className="bg-[#1E293B] border border-[#4DB9F2]/30 rounded-[16px] py-4 px-5 flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 bg-[#4DB9F2]/10 border border-[#4DB9F2]/20 rounded-lg items-center justify-center">
                                <Ionicons name="add" size={18} color="#4DB9F2" />
                            </View>
                            <Text className="font-bold text-slate-100 text-[16px]">Start new chat</Text>
                        </View>
                        <Ionicons name="chatbubbles" size={20} color="#4DB9F2" />
                    </TouchableOpacity>

                    {/* History List */}
                    {history.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onLongPress={() => setActiveMenuId(item.id)}
                            delayLongPress={300}
                            className="bg-[#151E33] border border-[#1E293B] rounded-[16px] p-5"
                        >
                            <View className="flex-row justify-between items-center mb-3">
                                <View className="bg-[#1E293B] border border-[#2D3748] px-2.5 py-1 rounded-md">
                                    <Text className="text-slate-400 text-[11px] font-bold">{item.date}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#64748B" />
                            </View>
                            <Text className="font-bold text-slate-200 text-[16px]">{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Context Menu Overlay */}
                {activeMenuId && (
                    <View className="absolute inset-0 z-50 items-center justify-center px-5">
                        <BlurView intensity={40} tint="dark" className="absolute inset-0">
                            <Pressable className="flex-1" onPress={() => setActiveMenuId(null)} />
                        </BlurView>

                        {/* Active Item Highlight */}
                        <View className="bg-[#151E33] border border-[#4DB9F2] rounded-[16px] p-5 w-full mb-3">
                            <View className="flex-row justify-between items-center mb-3">
                                <View className="bg-[#1E293B] border border-[#4DB9F2]/30 px-2.5 py-1 rounded-md">
                                    <Text className="text-[#4DB9F2] text-[11px] font-bold">Today</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                            </View>
                            <Text className="font-bold text-slate-100 text-[16px]">
                                {history.find(h => h.id === activeMenuId)?.title}
                            </Text>
                        </View>

                        {/* Popover Actions */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[16px] w-full overflow-hidden">
                            <TouchableOpacity className="flex-row justify-between items-center p-5 border-b border-[#1E293B]">
                                <Text className="font-bold text-slate-200 text-[15px]">Edit</Text>
                                <View className="w-8 h-8 bg-[#1E293B] border border-[#2D3748] rounded-lg items-center justify-center">
                                    <Ionicons name="pencil" size={14} color="#94A3B8" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(activeMenuId)} className="flex-row justify-between items-center p-5">
                                <Text className="font-bold text-rose-500 text-[15px]">Delete</Text>
                                <View className="w-8 h-8 bg-rose-950/20 border border-rose-500/20 rounded-lg items-center justify-center">
                                    <Ionicons name="trash" size={14} color="#EF4444" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <PersonalizationSheet ref={personalizationSheetRef} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}