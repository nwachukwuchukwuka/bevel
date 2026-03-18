import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { SetExpirationSheet } from '../components/SetExpirationSheet';

export default function ManageMemoryScreen() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('All');
    const [filterTags, setFilterTags] = useState<string[]>([]);

    // Bottom sheets refs
    const filterSheetRef = useRef<BottomSheetModal>(null);
    const expirationSheetRef = useRef<BottomSheetModal>(null);

    const [activeExpirationItemId, setActiveExpirationItemId] = useState<string | null>(null);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const INITIAL_MEMORIES = [
        { id: '1', tag: 'Reproductive Health', text: 'You are pregnant.', type: 'Core Memory', expires: 'Sep 16, 2025' },
        { id: '2', tag: 'Goals', text: 'You want to establish good workout habits for pregnancy.', type: 'Core Memory' },
        { id: '3', tag: 'Goals', text: 'You are interested in resources about sleeping habits to improve them.', type: 'Core Memory' },
    ];

    const [memories, setMemories] = useState(INITIAL_MEMORIES);

    const ALL_TAGS = ['Goals', 'Reproductive Health'];

    const displayedMemories = filterTags.length > 0
        ? memories.filter(m => filterTags.includes(m.tag))
        : memories;

    const toggleFilter = (tag: string) => {
        setFilterTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleDeleteMemory = (id: string) => {
        setMemories(prev => prev.filter(m => m.id !== id));
    };

    const activeExpirationItem = memories.find(m => m.id === activeExpirationItemId);

    return (
        <MenuProvider>
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#F4F5F9]" edges={['top']}>
                {/* Header */}
                <View className="flex-row justify-between items-center px-5 py-4 z-10">
                    <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 rounded-full bg-white items-center justify-center ">
                        <Ionicons name="close" size={18} color="#4B5563" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">Manage memory</Text>
                    <TouchableOpacity onPress={() => filterSheetRef.current?.present()} className="w-8 h-8 rounded-full bg-white items-center justify-center ">
                        <Ionicons name="filter" size={16} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View className="px-5 mb-4 mt-2 z-10 flex-row gap-2">
                    {['All', 'Core Memory', 'Short-Term Memory'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-black' : 'bg-gray-200/60'}`}
                        >
                            <Text className={`text-xs font-bold leading-4 ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 12 }}>
                    {displayedMemories.map(item => (
                        <View key={item.id} className="bg-white rounded-2xl p-5  relative z-0">
                            {/* Tags & More button */}
                            <View className="flex-row justify-between items-center mb-3">
                                <View className={`${item.tag === 'Goals' ? 'bg-blue-50' : 'bg-purple-50'} px-2 py-1 rounded-md`}>
                                    <Text className={`text-[11px] font-bold ${item.tag === 'Goals' ? 'text-blue-500' : 'text-purple-500'}`}>
                                        {item.tag}
                                    </Text>
                                </View>
                                {/* React Native Popup Menu for this card */}
                                <Menu>
                                    <MenuTrigger>
                                        <View className="p-1">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{ optionsContainer: { borderRadius: 12, padding: 4, width: 200, marginTop: 24 } }}>
                                        <MenuOption onSelect={() => {
                                            setActiveExpirationItemId(item.id);
                                            expirationSheetRef.current?.present();
                                        }}>
                                            <View className="flex-row justify-between items-center p-3 border-b border-gray-100">
                                                <Text className="font-medium text-gray-900 text-sm">Change expiration</Text>
                                                <Ionicons name="time-outline" size={16} color="#4B5563" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handleDeleteMemory(item.id)}>
                                            <View className="flex-row justify-between items-center p-3">
                                                <Text className="font-medium text-red-500 text-sm">Delete</Text>
                                                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                                            </View>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>

                            {/* Content */}
                            <Text className="font-bold text-gray-900 text-sm mb-4 leading-5">{item.text}</Text>

                            {/* Footer */}
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-1.5">
                                    <Ionicons name="flower-outline" size={14} color="#3B82F6" />
                                    <Text className="font-bold text-blue-500 text-[11px]">{item.type}</Text>
                                </View>

                                {item.expires && (
                                    <View className="flex-row items-center gap-1.5">
                                        <Ionicons name="time-outline" size={14} color="#F59E0B" />
                                        <Text className="font-bold text-amber-500 text-[11px]">Expires: {item.expires}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Filter Bottom Sheet */}
                <BottomSheetModal
                    ref={filterSheetRef}
                    snapPoints={['50%']}
                    backdropComponent={renderBackdrop}
                    handleIndicatorStyle={{ display: 'none' }}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView className="flex-1 px-5 pt-2">
                        {/* Header */}
                        <View className="flex-row items-center justify-center mb-6 relative">
                            <TouchableOpacity onPress={() => filterSheetRef.current?.dismiss()} className="absolute left-0">
                                <Ionicons name="close" size={24} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text className="font-bold text-gray-900 text-base">Filter by</Text>
                        </View>

                        {/* Filter Options */}
                        <View className="gap-3">
                            {/* All Tags */}
                            <TouchableOpacity
                                onPress={() => setFilterTags([])}
                                className={`border ${filterTags.length === 0 ? 'border-gray-900 bg-white ' : 'border-gray-100 bg-white'} rounded-2xl p-4 flex-row justify-between items-center`}
                            >
                                <Text className={`font-bold ${filterTags.length === 0 ? 'text-gray-900' : 'text-gray-900'}`}>All tags</Text>
                                {filterTags.length === 0 && <Ionicons name="checkmark" size={20} color="black" />}
                            </TouchableOpacity>

                            {/* Individual Tags */}
                            {ALL_TAGS.map(tag => {
                                const isSelected = filterTags.includes(tag);
                                return (
                                    <TouchableOpacity
                                        key={tag}
                                        onPress={() => toggleFilter(tag)}
                                        className={`border ${isSelected ? 'border-gray-900 bg-white ' : 'border-gray-100 bg-white'} rounded-2xl p-4 flex-row justify-between items-center`}
                                    >
                                        <View className="flex-row items-center gap-3">
                                            <View className={`w-2 h-2 rounded-full ${tag === 'Goals' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                                            <Text className="font-bold text-gray-900">{tag}</Text>
                                        </View>
                                        {isSelected && <Ionicons name="checkmark" size={20} color="black" />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Apply Button */}
                        <TouchableOpacity
                            onPress={() => filterSheetRef.current?.dismiss()}
                            className="bg-[#1A1A1A] py-4 rounded-full items-center mt-auto mb-10"
                        >
                            <Text className="text-white font-bold text-base">
                                Filter by "{filterTags.length === 0 ? 'All tags' : filterTags.join(', ')}"
                            </Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheetModal>

                {/* Set Expiration Sheet */}
                <SetExpirationSheet 
                    ref={expirationSheetRef}
                    activeItem={activeExpirationItem}
                    onSave={(id, newDate) => {
                        setMemories(prev => prev.map(m => m.id === id ? { ...m, expires: newDate } : m));
                    }}
                />
            </SafeAreaView>
        </BottomSheetModalProvider>
        </MenuProvider>
    );
}
