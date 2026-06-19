import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SetExpirationSheet } from '../components/SetExpirationSheet';

export default function ManageMemoryScreen() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('All');
    const [filterTags, setFilterTags] = useState<string[]>([]);

    const filterSheetRef = useRef<BottomSheetModal>(null);
    const expirationSheetRef = useRef<BottomSheetModal>(null);

    const [activeExpirationItemId, setActiveExpirationItemId] = useState<string | null>(null);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
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
                <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
                    {/* Header Structure */}
                    <View className="flex-row justify-between items-start px-5 py-6 z-10">
                        <View className="flex-1">
                            <Text className="text-[24px] font-bold text-slate-100 mb-1">Memory</Text>
                            <Text className="text-[13px] font-medium text-slate-400">Review contextual data fragments</Text>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => filterSheetRef.current?.present()}
                                className={`w-10 h-10 rounded-[12px] border items-center justify-center ${filterTags.length > 0 ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'}`}
                            >
                                <Ionicons name="filter" size={18} color={filterTags.length > 0 ? '#4DB9F2' : '#94A3B8'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="w-10 h-10 rounded-[12px] bg-[#151E33] border border-[#1E293B] items-center justify-center"
                            >
                                <Ionicons name="close" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Hard-edged Tabs */}
                    <View className="px-5 mb-6 z-10">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                            {['All', 'Core Memory', 'Short-Term Memory'].map(tab => {
                                const isActive = activeTab === tab;
                                return (
                                    <TouchableOpacity
                                        key={tab}
                                        onPress={() => setActiveTab(tab)}
                                        className={`px-4 py-2.5 rounded-[12px] border ${isActive ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'}`}
                                    >
                                        <Text className={`text-[13px] font-semibold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                            {tab}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60, gap: 12 }}>
                        {displayedMemories.map(item => (
                            <View key={item.id} className="bg-[#151E33] border border-[#1E293B] rounded-[20px] p-5 relative z-0">
                                {/* Top Metadata */}
                                <View className="flex-row justify-between items-start mb-4">
                                    <View className={`border px-2.5 py-1 rounded-md ${item.tag === 'Goals'
                                        ? 'bg-blue-950/30 border-blue-500/30'
                                        : 'bg-purple-950/30 border-purple-500/30'
                                        }`}>
                                        <Text className={`text-[11px] font-bold ${item.tag === 'Goals' ? 'text-blue-400' : 'text-purple-400'}`}>
                                            {item.tag}
                                        </Text>
                                    </View>

                                    <Menu>
                                        <MenuTrigger>
                                            <View className="w-8 h-8 items-center justify-center bg-[#1E293B] border border-[#2D3748] rounded-[10px]">
                                                <Ionicons name="ellipsis-horizontal" size={16} color="#94A3B8" />
                                            </View>
                                        </MenuTrigger>
                                        <MenuOptions customStyles={{ optionsContainer: { backgroundColor: '#151E33', borderColor: '#1E293B', borderWidth: 1, borderRadius: 16, marginTop: 40, width: 200 } }}>
                                            <MenuOption onSelect={() => {
                                                setActiveExpirationItemId(item.id);
                                                expirationSheetRef.current?.present();
                                            }}>
                                                <View className="flex-row justify-between items-center p-4 border-b border-[#1E293B]">
                                                    <Text className="font-semibold text-slate-200 text-[14px]">Change expiration</Text>
                                                    <Ionicons name="time" size={16} color="#94A3B8" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => handleDeleteMemory(item.id)}>
                                                <View className="flex-row justify-between items-center p-4">
                                                    <Text className="font-semibold text-rose-500 text-[14px]">Delete</Text>
                                                    <Ionicons name="trash" size={16} color="#EF4444" />
                                                </View>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>
                                </View>

                                {/* Main Text */}
                                <Text className="font-medium text-slate-100 text-[15px] mb-6 leading-6">
                                    {item.text}
                                </Text>

                                {/* Footer Indicators */}
                                <View className="flex-row items-center justify-between border-t border-[#1E293B] pt-4">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="hardware-chip" size={14} color="#4DB9F2" />
                                        <Text className="font-bold text-[#4DB9F2] text-[11px]">{item.type}</Text>
                                    </View>

                                    {item.expires && (
                                        <View className="flex-row items-center gap-2">
                                            <Ionicons name="timer" size={14} color="#F59E0B" />
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
                        snapPoints={['55%']}
                        backdropComponent={renderBackdrop}
                        backgroundStyle={{ backgroundColor: '#090D16' }}
                        handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
                        enableDynamicSizing={false}
                    >
                        <BottomSheetView className="flex-1 px-5 pt-4 pb-8">
                            <View className="flex-row items-center justify-between mb-8">
                                <View>
                                    <Text className="text-[24px] font-bold text-slate-100 mb-1">Filter Tags</Text>
                                    <Text className="text-[13px] font-medium text-slate-400">Select categories to view</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => filterSheetRef.current?.dismiss()}
                                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                                >
                                    <Ionicons name="close" size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>

                            <View className="gap-3">
                                <TouchableOpacity
                                    onPress={() => setFilterTags([])}
                                    className={`border rounded-[16px] p-5 flex-row justify-between items-center ${filterTags.length === 0 ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'
                                        }`}
                                >
                                    <Text className={`font-bold text-[16px] ${filterTags.length === 0 ? 'text-slate-100' : 'text-slate-300'}`}>All tags</Text>
                                    {filterTags.length === 0 && <Ionicons name="checkmark" size={20} color="#4DB9F2" />}
                                </TouchableOpacity>

                                {ALL_TAGS.map(tag => {
                                    const isSelected = filterTags.includes(tag);
                                    return (
                                        <TouchableOpacity
                                            key={tag}
                                            onPress={() => toggleFilter(tag)}
                                            className={`border rounded-[16px] p-5 flex-row justify-between items-center ${isSelected ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'
                                                }`}
                                        >
                                            <View className="flex-row items-center gap-3">
                                                <View className={`w-3 h-3 rounded-[4px] border ${tag === 'Goals' ? 'bg-blue-500 border-blue-400' : 'bg-purple-500 border-purple-400'
                                                    }`} />
                                                <Text className={`font-bold text-[16px] ${isSelected ? 'text-slate-100' : 'text-slate-300'}`}>{tag}</Text>
                                            </View>
                                            {isSelected && <Ionicons name="checkmark" size={20} color="#4DB9F2" />}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <TouchableOpacity
                                onPress={() => filterSheetRef.current?.dismiss()}
                                className="bg-[#4DB9F2] py-4 rounded-[16px] items-center mt-auto border border-[#4DB9F2]"
                            >
                                <Text className="text-[#090D16] font-bold text-[16px]">
                                    Apply Filter ({filterTags.length === 0 ? 'All' : filterTags.length})
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