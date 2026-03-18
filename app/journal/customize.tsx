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
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
                    <View className="w-8" />
                    <Text className="text-[16px] font-bold text-gray-900">Customize Journal</Text>
                    <TouchableOpacity
                        onPress={() => addCustomTagSheetRef.current?.present()}
                        className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
                    >
                        <Ionicons name="add" size={20} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                {/* Scrollable Tabs */}
                <View className="border-b border-gray-100">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 flex-row pt-3">
                        {tabs.map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`mr-6 pb-2 ${activeTab === tab ? 'border-b-2 border-gray-900' : ''}`}
                            >
                                <Text className={`text-[14px] font-bold ${activeTab === tab ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>

                    {/* Search */}
                    <View className="flex-row items-center bg-gray-50 rounded-[12px] px-4 h-[44px] mb-6 border border-gray-100">
                        <Ionicons name="search" size={18} color="#9CA3AF" />
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 ml-2 text-[15px] font-medium"
                        />
                    </View>

                    {/* Items */}
                    <View className="gap-6 pb-20">
                        {filteredItems.map(item => (
                            <View key={item.id} className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3 flex-1 pr-4">
                                    {item.emoji ? (
                                        <Text className="text-[20px]">{item.emoji}</Text>
                                    ) : (
                                        <Ionicons name={item.icon as any} size={20} color="#4B5563" />
                                    )}
                                    <View>
                                        <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                                        <Text className="text-[12px] text-gray-500">{item.desc}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity
                                        onPress={() => handleOpenSettings(item)}
                                        className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
                                    >
                                        <Ionicons name="settings-outline" size={16} color="#6B7280" />
                                    </TouchableOpacity>
                                    {/* Switch Mock */}
                                    <TouchableOpacity
                                        onPress={() => toggleItem(item.id)}
                                        className={`w-12 h-7 rounded-full justify-center px-1 transition-all ${item.active ? 'bg-green-500 items-end' : 'bg-gray-200 items-start'}`}
                                    >
                                        <View className="w-5 h-5 bg-white rounded-full" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
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
