import { JOURNAL_AUTO } from '@/constants';
import { useJournal } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATES = [
    { day: 'Sun', date: '7', status: 'checked' },
    { day: 'Mon', date: '8', status: 'checked' },
    { day: 'Tue', date: '9', status: 'checked' },
    { day: 'Wed', date: '10', status: 'checked' },
    { day: 'Thu', date: '11', status: 'checked' },
    { day: 'Fri', date: '12', status: 'active' },
    { day: 'Sat', date: '13', status: 'empty' },
];

export default function JournalScreen() {
    const router = useRouter();
    const { items } = useJournal();

    // States for toggles: 0 = No, 1 = Skip/Dash, 2 = Yes
    const [toggleStates, setToggleStates] = useState<Record<string, number>>({
        '糖': 2, // sugar (not in list yet)
        '7': 1, // Reading in bed
        '1': 1, // Alcohol (just for demonstration if we had a toggle)
    });

    const ToggleControl = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => (
        <View className="flex-row bg-gray-50 rounded-xl p-1 border border-gray-100">
            <TouchableOpacity
                onPress={() => onChange(0)}
                className={`w-10 h-8 items-center justify-center rounded-lg ${value === 0 ? 'bg-red-400 ' : ''}`}
            >
                <Ionicons name="close" size={18} color={value === 0 ? 'white' : '#D1D5DB'} />
            </TouchableOpacity>
            <View className="w-[1px] h-full bg-gray-200" />
            <TouchableOpacity
                onPress={() => onChange(1)}
                className={`w-10 h-8 items-center justify-center rounded-lg ${value === 1 ? 'bg-gray-200 ' : ''}`}
            >
                <View className={`w-3 h-0.5 ${value === 1 ? 'bg-gray-500' : 'bg-gray-300'}`} />
            </TouchableOpacity>
            <View className="w-[1px] h-full bg-gray-200" />
            <TouchableOpacity
                onPress={() => onChange(2)}
                className={`w-10 h-8 items-center justify-center rounded-lg ${value === 2 ? 'bg-blue-400 ' : ''}`}
            >
                <Ionicons name="checkmark" size={18} color={value === 2 ? 'white' : '#D1D5DB'} />
            </TouchableOpacity>
        </View>
    );

    const PinnedItems = items.filter(i => i.active && i.isPinned);
    const DaytimeItems = items.filter(i => i.active && (!i.logTime || i.logTime === 'Daytime'));
    const NighttimeItems = items.filter(i => i.active && i.logTime === 'Nighttime');

    const JournalRow = ({ item }: { item: any }) => {
        const isInteractive = ['Alcohol', 'Caffeine', 'Daily mood', 'Hydration'].includes(item.label);

        if (isInteractive) {
            const route = `/journal/${item.label.toLowerCase().replace('daily ', '')}`;
            let rightContent;

            if (item.label === 'Alcohol') {
                rightContent = <View className="flex-row items-center gap-2"><Text className="text-[14px] font-bold text-red-500">0,0 drink</Text><View className="w-6 h-6 bg-red-500 rounded-md items-center justify-center"><Ionicons name="close" size={14} color="white" /></View><Ionicons name="chevron-forward" size={18} color="#D1D5DB" /></View>;
            } else if (item.label === 'Caffeine') {
                rightContent = <View className="flex-row items-center gap-2"><Text className="text-[14px] font-bold text-teal-500">90,0 mg</Text><View className="w-6 h-6 bg-teal-400 rounded-md items-center justify-center"><Ionicons name="checkmark" size={14} color="white" /></View><Ionicons name="chevron-forward" size={18} color="#D1D5DB" /></View>;
            } else if (item.label === 'Daily mood') {
                rightContent = <View className="flex-row items-center gap-2"><Text className="text-[14px] text-gray-500 font-medium">Very unpleasant</Text><Ionicons name="chevron-forward" size={18} color="#D1D5DB" /></View>;
            } else if (item.label === 'Hydration') {
                rightContent = <View className="flex-row items-center gap-2"><Text className="text-[14px] font-bold text-teal-500">1.900,0 ml</Text><View className="w-6 h-6 rounded-full border-2 border-teal-100 border-t-teal-400 -rotate-45" /><Ionicons name="chevron-forward" size={18} color="#D1D5DB" /></View>;
            }

            return (
                <TouchableOpacity onPress={() => router.push(route as any)} className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 mb-3">
                    <View className="flex-row items-center gap-3">
                        <Text className="text-[18px]">{item.emoji || '❓'}</Text>
                        <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                    </View>
                    {rightContent}
                </TouchableOpacity>
            );
        }

        return (
            <View className="flex-row items-center justify-between bg-white rounded-[20px] p-3 border border-gray-100 mb-3">
                <View className="flex-row items-center gap-3">
                    <Text className="text-[18px]">{item.emoji || '❓'}</Text>
                    <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                </View>
                <ToggleControl
                    value={toggleStates[item.id] ?? 1}
                    onChange={(val) => setToggleStates({ ...toggleStates, [item.id]: val })}
                />
            </View>
        );
    };

    return (
        <MenuProvider>
            <View className="flex-1 bg-[#F9FAFB]">
                <SafeAreaView edges={['top']} className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-5 pt-2 mb-6">
                        <View>
                            <Text className="text-[24px] font-bold text-gray-900">Journal</Text>
                            <Text className="text-[13px] font-bold text-gray-400">Sep 2025</Text>
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity onPress={() => router.push('/journal/insights')} className="flex-row items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5">
                                <Ionicons name="sparkles" size={14} color="#6B7280" />
                                <Text className="text-[13px] font-bold text-gray-700">Insights</Text>
                            </TouchableOpacity>

                            <Menu>
                                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerTouchable: { activeOpacity: 0.8 } }}>
                                    <View className="w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center">
                                        <Ionicons name="ellipsis-horizontal" size={16} color="#6B7280" />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 220, marginTop: 35, paddingVertical: 4 } }}>
                                    <MenuOption onSelect={() => router.push('/journal/customize')}>
                                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                            <Text className="text-[13px] font-medium text-gray-900">Customize journal</Text>
                                            <Ionicons name="settings" size={18} color="#111827" />
                                        </View>
                                    </MenuOption>
                                    {/* <MenuOption>
                                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                            <Text className="text-[13px] font-medium text-gray-900">Set default entries</Text>
                                            <Ionicons name="add" size={20} color="#111827" />
                                        </View>
                                    </MenuOption>
                                    <MenuOption>
                                        <View className="flex-row items-center justify-between px-4 py-3">
                                            <Text className="text-[13px] font-medium text-gray-900">Pinned tags</Text>
                                            <Ionicons name="pin" size={18} color="#111827" />
                                        </View>
                                    </MenuOption> */}
                                    <MenuOption onSelect={() => router.push('/journal/default-entries')}>
                                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                            <Text className="text-[15px] font-medium text-gray-900">Set default entries</Text>
                                            <Ionicons name="add" size={20} color="#111827" />
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => router.push('/journal/pinned-tags')}>
                                        <View className="flex-row items-center justify-between px-4 py-3">
                                            <Text className="text-[15px] font-medium text-gray-900">Pinned tags</Text>
                                            <Ionicons name="pin" size={18} color="#111827" />
                                        </View>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>

                    {/* Calendar Strip */}
                    <View className="flex-row justify-between px-5 mb-6 border-b border-gray-100 pb-4">
                        {DATES.map((item, idx) => (
                            <View key={idx} className="items-center gap-2">
                                <Text className={`text-[11px] font-bold ${item.status === 'active' ? 'text-teal-500' : 'text-gray-400'}`}>{item.day}</Text>
                                <Text className={`text-[15px] font-bold ${item.status === 'active' ? 'text-teal-500' : 'text-gray-900'}`}>{item.date}</Text>
                                <View className={`w-5 h-5 rounded-full items-center justify-center border ${item.status === 'checked' ? 'bg-yellow-400 border-yellow-400' : item.status === 'active' ? 'bg-teal-400 border-teal-400' : 'border-gray-200'}`}>
                                    {item.status !== 'empty' && <Ionicons name="checkmark" size={12} color="white" />}
                                </View>
                            </View>
                        ))}
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>

                        <View className="mb-6">
                            <Text className="text-[16px] font-bold text-gray-900 mb-1">Today's Entries</Text>
                            <Text className="text-[13px] text-gray-500 leading-5">Your entries today will contribute to the 90-day rolling data for tomorrow's insights.</Text>
                        </View>

                        {/* Pinned Section */}
                        {PinnedItems.length > 0 && (
                            <>
                                <Text className="text-[13px] font-bold text-gray-500 mb-3">Pinned</Text>
                                <View className="mb-5">
                                    {PinnedItems.map(item => <JournalRow key={item.id} item={item} />)}
                                </View>
                            </>
                        )}

                        {/* Daytime Section */}
                        <Text className="text-[13px] font-bold text-gray-500 mb-3">Daytime</Text>
                        <View className="mb-5">
                            {DaytimeItems.map(item => <JournalRow key={item.id} item={item} />)}
                        </View>

                        {/* Nighttime Section */}
                        {NighttimeItems.length > 0 && (
                            <>
                                <View className="flex-row items-center justify-between mb-3">
                                    <Text className="text-[13px] font-bold text-gray-500">Nighttime</Text>
                                    <Text className="text-[11px] font-medium text-gray-400">12 Sep - 13 Sep</Text>
                                </View>
                                <View className="mb-5">
                                    {NighttimeItems.map(item => <JournalRow key={item.id} item={item} />)}
                                </View>
                            </>
                        )}

                        {/* Automatic Section */}
                        <Text className="text-[13px] font-bold text-gray-500 mb-3">Automatic</Text>
                        <View className="gap-3 mb-8">
                            {JOURNAL_AUTO.map((item) => (
                                <View key={item.id} className="flex-row items-center justify-between bg-white rounded-[20px] p-4 border border-gray-100">
                                    <View className="flex-row items-center gap-3">
                                        <Ionicons name={item.icon as any} size={20} color={item.color} />
                                        <Text className="text-[14px] font-bold text-gray-900">{item.title}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-3">
                                        {item.value ? <Text className="text-[12px] font-medium text-gray-400">{item.value}</Text> : null}
                                        {item.isSkipped ? (
                                            <View className="w-6 h-6 rounded-full border-2 border-gray-200 items-center justify-center"><View className="w-2.5 h-0.5 bg-gray-300" /></View>
                                        ) : item.isComplete ? (
                                            <View className="flex-row items-center gap-1">
                                                <Ionicons name="sparkles" size={14} color={item.isNegative ? '#EF4444' : '#10B981'} />
                                                <View className={`w-6 h-6 rounded-md items-center justify-center ${item.isNegative ? 'bg-red-500' : 'bg-teal-400'}`}>
                                                    <Ionicons name={item.isNegative ? "close" : "checkmark"} size={14} color="white" />
                                                </View>
                                            </View>
                                        ) : (
                                            <View className="w-6 h-6 rounded-full border-4 border-gray-100 border-t-teal-400 -rotate-45" />
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        </MenuProvider>
    );
}