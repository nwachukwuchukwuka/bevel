import { MOOD_CAUSES, MOOD_DESCRIPTORS_NEGATIVE, MOOD_DESCRIPTORS_POSITIVE } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function MoodScreen() {
    const [entries, setEntries] = useState<{ id: string, mood: string, time: string }[]>([]);

    // Wizard State
    const [step, setStep] = useState<'list' | 'intensity' | 'descriptors' | 'causes'>('list');
    const [intensity, setIntensity] = useState(4); // 1-5
    const [tab, setTab] = useState<'Positive' | 'Negative'>('Positive');
    const [selectedDescriptors, setSelectedDescriptors] = useState<string[]>([]);
    const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

    const handleFinishLog = () => {
        const moodName = intensity >= 4 ? 'Pleasant' : intensity <= 2 ? 'Unpleasant' : 'Neutral';
        setEntries([...entries, { id: Date.now().toString(), mood: moodName, time: '11.12 AM' }]);
        setStep('list');
    };

    // --- SUB-VIEWS FOR THE WIZARD ---

    if (step === 'intensity') return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => setStep('list')}><Ionicons name="chevron-back" size={24} color="#9CA3AF" /></TouchableOpacity>
                <Text className="text-[15px] font-bold text-gray-900">Log daily mood</Text>
                <View className="w-8" />
            </View>
            <View className="flex-1 items-center px-5 pt-10">
                <Text className="text-[22px] font-bold text-gray-900 mb-10">How do you feel?</Text>

                {/* Face Visualizer Mock */}
                <View className="w-64 h-64 rounded-full items-center justify-center mb-10 relative overflow-hidden">
                    <LinearGradient
                        colors={intensity >= 4 ? ['#ECFCCB', '#DCFCE7'] : intensity <= 2 ? ['#FEE2E2', '#FECACA'] : ['#F3F4F6', '#E5E7EB']}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                    <View className={`w-40 h-40 rounded-full border-[10px] items-center justify-center ${intensity >= 4 ? 'border-green-100 bg-green-50' : intensity <= 2 ? 'border-red-100 bg-red-50' : 'border-gray-200 bg-gray-100'}`}>
                        {intensity >= 4 ? <Text className="text-[64px] text-green-500 font-bold">^ ^</Text> : intensity <= 2 ? <Text className="text-[64px] text-red-500 font-bold">~ ~</Text> : <Text className="text-[64px] text-gray-500 font-bold">O O</Text>}
                    </View>
                </View>

                <Text className="text-[24px] font-bold text-gray-900 mb-8">{intensity >= 4 ? 'Pleasant' : intensity <= 2 ? 'Unpleasant' : 'Neutral'}</Text>

                {/* Slider Mock */}
                <View className="w-full mb-10">
                    <View className="h-2 bg-gray-200 rounded-full w-full mb-2 flex-row items-center justify-between">
                        {[1, 2, 3, 4, 5].map(val => (
                            <TouchableOpacity key={val} onPress={() => setIntensity(val)} className={`w-5 h-5 rounded-full border-4 border-white ${intensity === val ? 'bg-green-500 scale-125' : 'bg-gray-400'}`} />
                        ))}
                    </View>
                    <View className="flex-row justify-between w-full px-1">
                        <Text className="text-[11px] text-gray-500">Very unpleasant</Text>
                        <Text className="text-[11px] text-gray-500">Very pleasant</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => setStep('descriptors')} className="w-full bg-gray-200 h-[56px] rounded-full items-center justify-center mb-4">
                    <Text className="text-gray-900 font-semibold text-[16px]">Add details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFinishLog} className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Add to journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (step === 'descriptors') return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => setStep('intensity')}><Ionicons name="chevron-back" size={24} color="#9CA3AF" /></TouchableOpacity>
                <Text className="text-[15px] font-bold text-gray-900">Log daily mood</Text>
                <View className="w-8" />
            </View>
            <View className="flex-1 items-center px-5 pt-8">
                <Text className="text-[20px] font-bold text-gray-900 mb-6">What describes this feeling?</Text>

                {/* Tabs */}
                <View className="flex-row bg-gray-200 p-1 rounded-xl mb-8 w-full">
                    <TouchableOpacity onPress={() => setTab('Positive')} className={`flex-1 py-2 items-center rounded-lg ${tab === 'Positive' ? 'bg-white ' : ''}`}><Text className={`text-[13px] font-bold ${tab === 'Positive' ? 'text-gray-900' : 'text-gray-500'}`}>Positive</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('Negative')} className={`flex-1 py-2 items-center rounded-lg ${tab === 'Negative' ? 'bg-white ' : ''}`}><Text className={`text-[13px] font-bold ${tab === 'Negative' ? 'text-gray-900' : 'text-gray-500'}`}>Negative</Text></TouchableOpacity>
                </View>

                {/* Chips */}
                <View className="flex-row flex-wrap justify-center gap-3">
                    {(tab === 'Positive' ? MOOD_DESCRIPTORS_POSITIVE : MOOD_DESCRIPTORS_NEGATIVE).map(desc => {
                        const isSelected = selectedDescriptors.includes(desc);
                        return (
                            <TouchableOpacity
                                key={desc}
                                onPress={() => isSelected ? setSelectedDescriptors(selectedDescriptors.filter(d => d !== desc)) : setSelectedDescriptors([...selectedDescriptors, desc])}
                                className={`px-4 py-2.5 rounded-full border ${isSelected ? 'border-gray-900 bg-white ' : 'border-gray-200 bg-white'}`}
                            >
                                <Text className={`text-[13px] ${isSelected ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{desc}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View className="px-5 pb-8 pt-4 bg-[#F9FAFB] gap-3">
                <TouchableOpacity onPress={() => setStep('causes')} className="w-full bg-gray-200 h-[56px] rounded-full items-center justify-center">
                    <Text className="text-gray-900 font-semibold text-[16px]">Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFinishLog} className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Add to journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (step === 'causes') return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => setStep('descriptors')}><Ionicons name="chevron-back" size={24} color="#9CA3AF" /></TouchableOpacity>
                <Text className="text-[15px] font-bold text-gray-900">Log daily mood</Text>
                <View className="w-8" />
            </View>
            <ScrollView className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>
                <Text className="text-[20px] font-bold text-gray-900 mb-8 text-center">What is causing this feeling?</Text>

                <View className="flex-row flex-wrap justify-between gap-y-6">
                    {MOOD_CAUSES.map(cause => {
                        const isSelected = selectedCauses.includes(cause.label);
                        return (
                            <TouchableOpacity
                                key={cause.id}
                                onPress={() => isSelected ? setSelectedCauses(selectedCauses.filter(c => c !== cause.label)) : setSelectedCauses([...selectedCauses, cause.label])}
                                className="w-[30%] items-center"
                            >
                                <View className={`w-16 h-16 rounded-[20px] items-center justify-center mb-2  ${isSelected ? 'bg-gray-900 border border-gray-900' : 'bg-white border border-gray-100'}`}>
                                    <Ionicons name={cause.icon as any} size={24} color={isSelected ? 'white' : '#4B5563'} />
                                </View>
                                <Text className="text-[12px] font-bold text-gray-600 text-center">{cause.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            <View className="px-5 pb-8 pt-4 bg-[#F9FAFB]">
                <TouchableOpacity onPress={handleFinishLog} className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                    <Text className="text-white font-semibold text-[16px]">Add to journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // --- MAIN LIST VIEW ---
    return (
        <View className="flex-1 bg-[#F3F4F6]">
            <View className="flex-row items-center justify-between px-5 py-4">
                <View className="w-10" />
                <Text className="text-[16px] font-bold text-gray-900">Daily mood</Text>
                <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center ">
                    <Ionicons name="settings-outline" size={20} color="#4B5563" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-5 pt-4">
                <View className="mb-6">
                    <Text className="text-[16px] font-bold text-gray-900 mb-1">Today's Entries</Text>
                    <Text className="text-[13px] text-gray-500 leading-5">The latest entry will be categorized in <Text className="font-bold text-gray-700">Insights</Text> as either <Text className="font-bold text-gray-700">Pleasant Moods</Text> or <Text className="font-bold text-gray-700">Unpleasant Moods</Text>.</Text>
                </View>

                {entries.length === 0 ? (
                    <View className="flex-1 items-center justify-center pb-20">
                        <Text className="text-[15px] font-bold text-gray-500 mb-1">No logs yet</Text>
                        <Text className="text-[13px] text-gray-400">Once you add a log, it will show up here.</Text>
                    </View>
                ) : (
                    <View className="gap-3">
                        {entries.map(entry => (
                            <View key={entry.id} className="bg-white rounded-[20px] p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center"><Text className="text-green-500 font-bold text-[18px]">^ ^</Text></View>
                                    <View><Text className="text-[14px] font-bold text-gray-900">Daily mood</Text><Text className="text-[11px] text-gray-400">{entry.time}</Text></View>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-[13px] font-bold text-gray-900">{entry.mood}</Text>
                                    <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View className="px-5 pb-8 pt-4 bg-[#F3F4F6]">
                <TouchableOpacity onPress={() => setStep('intensity')} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center flex-row gap-2">
                    <Text className="text-white font-semibold text-[15px]">Add log</Text>
                    <Ionicons name="add" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}