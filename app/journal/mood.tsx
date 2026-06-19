import { MOOD_CAUSES, MOOD_DESCRIPTORS_NEGATIVE, MOOD_DESCRIPTORS_POSITIVE } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function MoodScreen() {
    const [entries, setEntries] = useState<{ id: string, mood: string, time: string }[]>([]);

    const [step, setStep] = useState<'list' | 'intensity' | 'descriptors' | 'causes'>('list');
    const [intensity, setIntensity] = useState(4);
    const [tab, setTab] = useState<'Positive' | 'Negative'>('Positive');
    const [selectedDescriptors, setSelectedDescriptors] = useState<string[]>([]);
    const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

    const handleFinishLog = () => {
        const moodName = intensity >= 4 ? 'Pleasant' : intensity <= 2 ? 'Unpleasant' : 'Neutral';
        setEntries([...entries, { id: Date.now().toString(), mood: moodName, time: '11.12 AM' }]);
        setStep('list');
    };

    if (step === 'intensity') return (
        <View className="flex-1 bg-[#090D16]">
            <View className="px-5 pt-6 pb-6 flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => setStep('list')}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                </TouchableOpacity>
                <View>
                    <Text className="text-xl font-bold text-slate-100">Log daily mood</Text>
                    <Text className="text-xs text-slate-400">Step 1 of 3: How do you feel?</Text>
                </View>
            </View>

            <View className="flex-1 px-5 mt-4">

                <View className={`rounded-3xl p-8 items-center border ${intensity >= 4
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : intensity <= 2
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-[#1E293B40] border-[#1E293B]'
                    }`}>
                    <Text className={`text-[80px] font-bold ${intensity >= 4 ? 'text-emerald-400' : intensity <= 2 ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                        {intensity >= 4 ? '^ ^' : intensity <= 2 ? '~ ~' : 'O O'}
                    </Text>
                    <Text className="text-3xl font-bold text-white mt-6 mb-2">
                        {intensity >= 4 ? 'Pleasant' : intensity <= 2 ? 'Unpleasant' : 'Neutral'}
                    </Text>
                </View>

                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-6 mt-6">
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-xs font-semibold text-rose-400">Very unpleasant</Text>
                        <Text className="text-xs font-semibold text-emerald-400">Very pleasant</Text>
                    </View>
                    <View className="h-2 bg-[#090D16] rounded-full flex-row items-center justify-between px-1">
                        {[1, 2, 3, 4, 5].map(val => (
                            <TouchableOpacity
                                key={val}
                                onPress={() => setIntensity(val)}
                                activeOpacity={0.8}
                                className={`w-6 h-6 rounded-full border-4 border-[#151E33] ${intensity === val
                                    ? 'bg-[#4DB9F2]'
                                    : 'bg-[#1E293B]'
                                    }`}
                            />
                        ))}
                    </View>
                </View>

            </View>

            <View className="px-5 pb-10 pt-4 bg-[#090D16] border-t border-[#1E293B] flex-row gap-3">
                <TouchableOpacity
                    onPress={handleFinishLog}
                    activeOpacity={0.7}
                    className="flex-1 bg-[#1E293B] h-14 rounded-2xl items-center justify-center border border-[#2D3748]"
                >
                    <Text className="text-white font-bold text-sm">Add to journal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setStep('descriptors')}
                    activeOpacity={0.8}
                    className="flex-1 bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-sm">Add details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (step === 'descriptors') return (
        <View className="flex-1 bg-[#090D16]">
            <View className="px-5 pt-6 pb-6 flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => setStep('intensity')}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                </TouchableOpacity>
                <View>
                    <Text className="text-xl font-bold text-slate-100">Log daily mood</Text>
                    <Text className="text-xs text-slate-400">Step 2 of 3: What describes this feeling?</Text>
                </View>
            </View>

            <View className="flex-1 px-5 mt-4">
                <View className="flex-row bg-[#151E33] border border-[#1E293B] p-1.5 rounded-xl mb-6">
                    <TouchableOpacity
                        onPress={() => setTab('Positive')}
                        activeOpacity={0.7}
                        className={`flex-1 py-2.5 items-center rounded-lg border ${tab === 'Positive' ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${tab === 'Positive' ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>Positive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab('Negative')}
                        activeOpacity={0.7}
                        className={`flex-1 py-2.5 items-center rounded-lg border ${tab === 'Negative' ? 'bg-[#1E293B] border-[#2D3748]' : 'border-transparent'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${tab === 'Negative' ? 'text-[#4DB9F2]' : 'text-slate-500'}`}>Negative</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap gap-3">
                    {(tab === 'Positive' ? MOOD_DESCRIPTORS_POSITIVE : MOOD_DESCRIPTORS_NEGATIVE).map(desc => {
                        const isSelected = selectedDescriptors.includes(desc);
                        return (
                            <TouchableOpacity
                                key={desc}
                                onPress={() => isSelected ? setSelectedDescriptors(selectedDescriptors.filter(d => d !== desc)) : setSelectedDescriptors([...selectedDescriptors, desc])}
                                activeOpacity={0.7}
                                className={`px-4 py-3 rounded-xl border ${isSelected
                                    ? 'border-[#4DB9F2] bg-[#1E293B]'
                                    : 'border-[#1E293B] bg-[#151E33]'
                                    }`}
                            >
                                <Text className={`text-sm font-semibold ${isSelected ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                    {desc}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View className="px-5 pb-10 pt-4 bg-[#090D16] border-t border-[#1E293B] flex-col gap-3">
                <TouchableOpacity
                    onPress={() => setStep('causes')}
                    activeOpacity={0.8}
                    className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-sm">Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleFinishLog}
                    activeOpacity={0.7}
                    className="w-full bg-[#1E293B] h-14 rounded-2xl items-center justify-center border border-[#2D3748]"
                >
                    <Text className="text-white font-bold text-sm">Skip and add to journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (step === 'causes') return (
        <View className="flex-1 bg-[#090D16]">
            <View className="px-5 pt-6 pb-6 flex-row items-center gap-4 border-b border-[#1E293B]">
                <TouchableOpacity
                    onPress={() => setStep('descriptors')}
                    activeOpacity={0.7}
                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                </TouchableOpacity>
                <View>
                    <Text className="text-xl font-bold text-slate-100">Log daily mood</Text>
                    <Text className="text-xs text-slate-400">Step 3 of 3: What is causing this feeling?</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                <View className="flex-row flex-wrap justify-between gap-y-4 pb-8">
                    {MOOD_CAUSES.map(cause => {
                        const isSelected = selectedCauses.includes(cause.label);
                        return (
                            <TouchableOpacity
                                key={cause.id}
                                onPress={() => isSelected ? setSelectedCauses(selectedCauses.filter(c => c !== cause.label)) : setSelectedCauses([...selectedCauses, cause.label])}
                                activeOpacity={0.7}
                                className={`w-[48%] flex-row items-center gap-3 p-4 rounded-2xl border ${isSelected
                                    ? 'bg-[#1E293B] border-[#4DB9F2]'
                                    : 'bg-[#151E33] border-[#1E293B]'
                                    }`}
                            >
                                <Ionicons name={cause.icon as any} size={20} color={isSelected ? '#4DB9F2' : '#94A3B8'} />
                                <Text className={`text-sm font-semibold flex-1 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                                    {cause.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View className="px-5 pb-10 pt-4 bg-[#090D16] border-t border-[#1E293B]">
                <TouchableOpacity
                    onPress={handleFinishLog}
                    activeOpacity={0.8}
                    className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
                >
                    <Text className="text-[#090D16] font-bold text-base">Add to journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-[#090D16]">

            <View className="px-5 pt-6 pb-6 border-b border-[#1E293B] bg-[#151E33]">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-slate-100">Daily mood</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
                <Text className="text-sm text-slate-400 leading-5 pr-4">
                    The latest entry will be categorized in Insights as either Pleasant Moods or Unpleasant Moods.
                </Text>
            </View>

            <View className="flex-1 px-5 pt-6">
                <Text className="text-sm font-semibold text-slate-500 mb-4">Today's Entries</Text>

                {entries.length === 0 ? (
                    <View className="border border-dashed border-[#1E293B] bg-[#151E33]/30 rounded-3xl p-8 items-center justify-center">
                        <Text className="text-slate-300 font-bold text-lg mb-2">No logs yet</Text>
                        <Text className="text-slate-500 text-center leading-6 text-sm">
                            Once you add a log, it will show up here.
                        </Text>
                    </View>
                ) : (
                    <View className="gap-3">
                        {entries.map(entry => (
                            <View
                                key={entry.id}
                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-emerald-950/20 rounded-xl border border-emerald-500/20 items-center justify-center">
                                        <Text className="text-emerald-500 font-bold text-xl">^ ^</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-base text-white">Daily mood</Text>
                                        <Text className="text-xs text-slate-400 mt-0.5">{entry.time}</Text>
                                    </View>
                                </View>
                                <View className="bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748] flex-row items-center gap-2">
                                    <Text className="text-[#4DB9F2] font-bold text-xs">{entry.mood}</Text>
                                    <Ionicons name="arrow-forward" size={12} color="#94A3B8" />
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View className="px-5 pb-10 pt-4 bg-[#090D16] border-t border-[#1E293B]">
                <TouchableOpacity
                    onPress={() => setStep('intensity')}
                    activeOpacity={0.8}
                    className="w-full bg-[#4DB9F2] h-14 rounded-2xl items-center justify-center border border-[#4DB9F2] flex-row gap-2"
                >
                    <Ionicons name="add" size={20} color="#090D16" />
                    <Text className="text-[#090D16] font-bold text-base">Add log</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}