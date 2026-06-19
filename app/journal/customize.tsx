import { AddCustomTagSheet, AddCustomTagSheetRef } from '@/components/journal/AddCustomTagSheet';
import { TagSettingsSheet, TagSettingsSheetRef } from '@/components/journal/TagSettingsSheet';
import { useJournal } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CustomizeJournalScreen() {
    const { items, setItems, updateItem } = useJournal();
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('Lifestyle');
    const tagSettingsSheetRef = useRef<TagSettingsSheetRef>(null);
    const addCustomTagSheetRef = useRef<AddCustomTagSheetRef>(null);

    const tabs = ['All', 'Automatic', 'Health Status', 'Lifestyle', 'Medical'];

    const toggleItem = (id: string) => {
        updateItem(id, { active: !items.find(i => i.id === id)?.active });
    };

    const handleOpenSettings = (item: any) => {
        setSelectedItem(item);
        tagSettingsSheetRef.current?.present();
    };

    const handleSaveSettings = (id: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean) => {
        updateItem(id, { logTime, isPinned });
    };

    const handleAddCustomTag = (label: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean, icon: string) => {
        const newTag = {
            id: Date.now().toString(),
            label,
            desc: 'Custom tag',
            icon: 'happy',
            emoji: icon,
            active: true,
            logTime,
            isPinned,
            isCustom: true,
            category: 'Lifestyle'
        };
        setItems([...items, newTag]);
    };

    const filteredItems = items.filter(item => {
        if (activeTab === 'All') return true;
        return item.category === activeTab;
    });

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B]">
                    <View className="flex-row items-center justify-between mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-slate-100">Journal metrics</Text>
                            <Text className="text-xs text-slate-400 mt-1">Configure your daily tracking log</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => addCustomTagSheetRef.current?.present()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="add" size={22} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center bg-[#090D16] rounded-xl px-4 h-12 border border-[#1E293B]">
                        <Ionicons name="search-outline" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Search metrics..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 text-base text-slate-200 font-medium"
                        />
                    </View>
                </View>

                <View className="bg-[#090D16] py-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
                    >
                        {tabs.map(tab => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-xl border ${isActive
                                        ? 'bg-[#1E293B] border-[#4DB9F2]'
                                        : 'bg-[#151E33] border-[#1E293B]'
                                        }`}
                                >
                                    <Text className={`text-sm font-semibold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                        {filteredItems.map((item, idx) => {
                            const isLast = idx === filteredItems.length - 1;
                            return (
                                <View
                                    key={item.id}
                                    className={`flex-row items-center justify-between p-5 ${!isLast ? 'border-b border-[#1E293B]' : ''
                                        }`}
                                >
                                    <View className="flex-row items-center gap-4 flex-1 pr-4">
                                        <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                            {item.emoji ? (
                                                <Text className="text-xl">{item.emoji}</Text>
                                            ) : (
                                                <Ionicons name={item.icon as any} size={18} color="#4DB9F2" />
                                            )}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-base font-bold text-slate-100">{item.label}</Text>
                                            <Text className="text-xs text-slate-400 mt-0.5">{item.desc}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center gap-4">
                                        <TouchableOpacity
                                            onPress={() => handleOpenSettings(item)}
                                            activeOpacity={0.7}
                                            className="w-9 h-9 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]"
                                        >
                                            <Ionicons name="settings-outline" size={16} color="#94A3B8" />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => toggleItem(item.id)}
                                            activeOpacity={0.8}
                                            className={`w-12 h-7 rounded-full justify-center px-1 ${item.active ? 'bg-[#10B981]' : 'bg-[#1E293B] border border-[#2D3748]'
                                                }`}
                                        >
                                            <View className={`w-5 h-5 rounded-full ${item.active ? 'bg-[#090D16] self-end' : 'bg-[#94A3B8]'}`} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>

                <TagSettingsSheet
                    ref={tagSettingsSheetRef}
                    item={selectedItem}
                    onSave={handleSaveSettings}
                />
                <AddCustomTagSheet
                    ref={addCustomTagSheetRef}
                    onSave={handleAddCustomTag}
                />
            </View>
        </BottomSheetModalProvider>
    );
}