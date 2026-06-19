import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AppearanceScreen() {
    const router = useRouter();
    const [appTheme, setAppTheme] = useState('Light');
    const [bgTheme, setBgTheme] = useState('Illustrative');
    const [iconTheme, setIconTheme] = useState('Dark');

    const SPECIAL_ICONS = ['Early Bird', 'Prism', 'Synth', 'Meadow', 'Crimson', 'Radiant', 'Bubble'];

    return (
        <View className="flex-1 bg-[#090D16]">

            {/* Left-Aligned Structural Header */}
            <View className="flex-row items-start justify-between px-5 pt-6 pb-6">
                <View className="flex-1 pr-4">
                    <Text className="text-[28px] font-bold text-slate-100 mb-1">Appearance</Text>
                    <Text className="text-[13px] font-medium text-slate-400">Customize your interface</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center mt-1"
                >
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 80 }}>

                {/* --- APP THEME --- */}
                <Text className="text-[13px] font-bold text-slate-500 mb-3 ml-1">iOS app theme</Text>
                <View className="flex-row gap-4 mb-8">
                    {['System', 'Light', 'Dark'].map((theme) => {
                        const isSelected = appTheme === theme;
                        return (
                            <TouchableOpacity
                                key={theme}
                                onPress={() => setAppTheme(theme)}
                                activeOpacity={1}
                                className="flex-1"
                            >
                                <View className={`w-full aspect-[4/3] rounded-[16px] mb-3 overflow-hidden border flex-row ${isSelected ? 'border-[#4DB9F2]' : 'border-[#1E293B]'
                                    }`}>
                                    {theme === 'System' ? (
                                        <>
                                            <View className="flex-1 bg-slate-200" />
                                            <View className="flex-1 bg-[#090D16]" />
                                        </>
                                    ) : (
                                        <View className={`flex-1 ${theme === 'Dark' ? 'bg-[#090D16]' : 'bg-slate-200'}`} />
                                    )}

                                    {/* Wireframe UI Mock */}
                                    <View className="absolute inset-0 p-3 items-center justify-center gap-1.5">
                                        <View className="w-10 h-1.5 rounded-full bg-slate-500/40 mb-1" />
                                        <View className="flex-row gap-1.5">
                                            <View className="w-5 h-5 rounded-sm bg-slate-500/40" />
                                            <View className={`w-5 h-5 rounded-sm ${theme === 'Dark' ? 'bg-[#4DB9F2]/60' : 'bg-emerald-500/60'}`} />
                                            <View className="w-5 h-5 rounded-sm bg-slate-500/40" />
                                        </View>
                                    </View>
                                </View>
                                <View className="flex-row items-center justify-center gap-1.5">
                                    <View className={`w-3 h-3 rounded-[4px] border items-center justify-center ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'
                                        }`}>
                                        {isSelected && <Ionicons name="checkmark" size={8} color="#090D16" />}
                                    </View>
                                    <Text className={`text-[13px] font-bold ${isSelected ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {theme}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- BACKGROUND THEME --- */}
                <Text className="text-[13px] font-bold text-slate-500 mb-3 ml-1">iOS background theme</Text>
                <View className="flex-row gap-4 mb-10">
                    {['Illustrative', 'Minimalistic'].map((theme) => {
                        const isSelected = bgTheme === theme;
                        return (
                            <TouchableOpacity
                                key={theme}
                                onPress={() => setBgTheme(theme)}
                                activeOpacity={1}
                                className="flex-1"
                            >
                                <View className={`w-full aspect-[16/9] rounded-[16px] mb-3 overflow-hidden border ${isSelected ? 'border-[#4DB9F2]' : 'border-[#1E293B]'
                                    }`}>
                                    {theme === 'Illustrative' ? (
                                        <LinearGradient colors={['#1E1B4B', '#0F172A']} style={{ flex: 1 }} />
                                    ) : (
                                        <View className="flex-1 bg-[#090D16]" />
                                    )}
                                    <View className="absolute inset-0 items-center justify-center gap-2">
                                        <View className={`w-8 h-8 rounded-full border flex-row items-center justify-center ${theme === 'Illustrative' ? 'border-[#4DB9F2]/40 bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'
                                            }`}>
                                            <View className={`w-3 h-3 border-2 rounded-full border-t-transparent ${theme === 'Illustrative' ? 'border-[#4DB9F2]' : 'border-slate-500'
                                                }`} />
                                        </View>
                                        <View className="w-12 h-1.5 rounded-full bg-slate-500/30" />
                                    </View>
                                </View>
                                <View className="flex-row items-center justify-center gap-1.5">
                                    <View className={`w-3 h-3 rounded-[4px] border items-center justify-center ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'
                                        }`}>
                                        {isSelected && <Ionicons name="checkmark" size={8} color="#090D16" />}
                                    </View>
                                    <Text className={`text-[13px] font-bold ${isSelected ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {theme}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- APP ICON THEME --- */}
                <Text className="text-[13px] font-bold text-slate-500 mb-3 ml-1">App icon theme</Text>
                <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5 mb-8">

                    <Text className="text-[12px] font-bold text-slate-500 mb-4">Original icons</Text>
                    <View className="flex-row justify-between mb-8">
                        {['Auto', 'Light', 'Dark'].map((theme) => {
                            const isSelected = iconTheme === theme;
                            return (
                                <TouchableOpacity
                                    key={theme}
                                    onPress={() => setIconTheme(theme)}
                                    className="items-center flex-1"
                                >
                                    <View className={`w-[60px] h-[60px] rounded-[16px] items-center justify-center mb-3 border ${isSelected ? 'border-[#4DB9F2]' : 'border-[#2D3748]'
                                        } ${theme === 'Light' ? 'bg-slate-200' : 'bg-[#090D16]'}`}>
                                        <Text className={`font-bold text-[28px] italic ${theme === 'Light' ? 'text-[#090D16]' : 'text-slate-100'}`}>B</Text>
                                    </View>
                                    <Text className={`text-[13px] font-bold ${isSelected ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>{theme}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Text className="text-[12px] font-bold text-slate-500 mb-4 border-t border-[#1E293B] pt-6">Flat icons</Text>
                    <View className="flex-row justify-between">
                        {['Auto', 'Light', 'Dark'].map((theme) => (
                            <View key={theme} className="items-center flex-1">
                                <View className={`w-[60px] h-[60px] rounded-[16px] items-center justify-center mb-3 border ${theme === 'Light' ? 'border-slate-300 bg-slate-200' : 'border-[#2D3748] bg-[#090D16]'
                                    }`}>
                                    <Text className={`font-bold text-[28px] italic ${theme === 'Light' ? 'text-[#090D16]' : 'text-slate-100'}`}>B</Text>
                                </View>
                                <Text className="text-[13px] font-bold text-slate-400">{theme}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- SPECIAL ICONS --- */}
                <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5 mb-8">
                    <Text className="text-[12px] font-bold text-slate-500 mb-5">Special icons</Text>
                    <View className="flex-row flex-wrap justify-between gap-y-6">
                        {SPECIAL_ICONS.map((icon, idx) => (
                            <View key={icon} className="w-[30%] items-center">
                                <LinearGradient
                                    colors={idx % 2 === 0 ? ['#0EA5E9', '#4F46E5'] : ['#E11D48', '#EA580C']}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 10
                                    }}
                                >
                                    <Text className="text-white font-bold text-[28px] italic">B</Text>
                                </LinearGradient>
                                <Text className="text-[12px] font-bold text-slate-300 text-center">{icon}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}