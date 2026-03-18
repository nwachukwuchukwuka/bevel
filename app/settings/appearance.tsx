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
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-white z-10 relative">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Appearance</Text>
                <View className="w-6" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pt-6 px-5" contentContainerStyle={{ paddingBottom: 60 }}>

                {/* --- APP THEME --- */}
                <Text className="text-[15px] font-bold text-gray-900 mb-4">iOS app theme</Text>
                <View className="flex-row gap-3 mb-10">
                    {['System', 'Light', 'Dark'].map((theme) => {
                        const isSelected = appTheme === theme;
                        return (
                            <TouchableOpacity key={theme} onPress={() => setAppTheme(theme)} className="flex-1 items-center">
                                <View className={`w-full aspect-[4/5] rounded-[20px] p-1 border-2 mb-2 overflow-hidden ${isSelected ? 'border-gray-900' : 'border-transparent bg-white '}`}>
                                    {/* App Theme UI Mock */}
                                    <View className="flex-1 rounded-[16px] overflow-hidden flex-row border border-gray-100">
                                        <View className={`flex-1 ${theme === 'Dark' ? 'bg-[#1C1C1E]' : 'bg-gray-50'}`} />
                                        {(theme === 'System') && <View className="flex-1 bg-[#1C1C1E]" />}

                                        {/* Mock UI Elements inside the preview */}
                                        <View className="absolute inset-0 p-2 items-center">
                                            <View className={`w-12 h-1 rounded-full mb-3 ${theme === 'Dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                                            <View className="flex-row gap-1">
                                                <View className={`w-6 h-6 rounded-full border-2 ${theme === 'Dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                                                <View className={`w-6 h-6 rounded-full border-2 ${theme === 'Dark' ? 'border-gray-700' : 'border-yellow-400'}`} />
                                                <View className={`w-6 h-6 rounded-full border-2 ${theme === 'Dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    {isSelected ? <Ionicons name="sunny" size={12} color="#111827" /> : <View className="w-3 h-3 rounded-full bg-gray-200" />}
                                    <Text className={`text-[12px] font-bold ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>{theme}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- BACKGROUND THEME --- */}
                <Text className="text-[15px] font-bold text-gray-900 mb-4">iOS background theme</Text>
                <View className="flex-row gap-3 mb-10">
                    {['Illustrative', 'Minimalistic'].map((theme) => {
                        const isSelected = bgTheme === theme;
                        return (
                            <TouchableOpacity key={theme} onPress={() => setBgTheme(theme)} className="flex-1">
                                <View className={`w-full aspect-[4/5] rounded-[24px] p-1 border-2 mb-2 overflow-hidden ${isSelected ? 'border-gray-900' : 'border-transparent bg-white '}`}>
                                    {/* Bg Theme UI Mock */}
                                    <View className={`flex-1 rounded-[18px] overflow-hidden border border-gray-100 p-3 ${theme === 'Minimalistic' ? 'bg-white' : ''}`}>
                                        {theme === 'Illustrative' && (
                                            <LinearGradient colors={['#FDE047', '#FFEDD5']} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                                        )}
                                        <View className="items-center mt-2 mb-4">
                                            <View className="w-12 h-12 rounded-full border-4 border-white  bg-white/50 items-center justify-center">
                                                <View className="w-10 h-10 border-4 border-yellow-400 rounded-full border-l-transparent -rotate-45" />
                                            </View>
                                        </View>
                                        <View className="flex-row gap-2 mb-2">
                                            <View className="flex-1 h-8 rounded-lg bg-white/60" />
                                            <View className="flex-1 h-8 rounded-lg bg-white/60" />
                                        </View>
                                        <View className="w-full h-8 rounded-lg bg-white/60" />
                                    </View>
                                </View>
                                <Text className={`text-center text-[12px] font-bold ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>{theme}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- APP ICON THEME --- */}
                <Text className="text-[15px] font-bold text-gray-900 mb-2">App icon theme</Text>
                <View className="bg-white rounded-[24px] p-5  border border-gray-100 mb-8">
                    <Text className="text-[12px] font-bold text-gray-500 mb-4">Original icons</Text>
                    <View className="flex-row justify-between mb-8 px-4">
                        {['Auto', 'Light', 'Dark'].map((theme) => (
                            <TouchableOpacity key={theme} onPress={() => setIconTheme(theme)} className="items-center gap-2">
                                <View className="w-16 h-16 rounded-[14px] bg-black items-center justify-center ">
                                    <Text className="text-white font-bold text-[32px] italic">B</Text>
                                </View>
                                <Text className={`text-[12px] font-bold ${iconTheme === theme ? 'text-gray-900' : 'text-gray-500'}`}>{theme}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="text-[12px] font-bold text-gray-500 mb-4 border-t border-gray-50 pt-4">Flat icons</Text>
                    <View className="flex-row justify-between px-4">
                        {['Auto', 'Light', 'Dark'].map((theme) => (
                            <View key={theme} className="items-center gap-2">
                                <View className={`w-16 h-16 rounded-[14px] items-center justify-center border ${theme === 'Light' ? 'border-gray-200 bg-white' : 'border-transparent bg-black'}`}>
                                    <Text className={`font-bold text-[32px] italic ${theme === 'Light' ? 'text-black' : 'text-white'}`}>B</Text>
                                </View>
                                <Text className="text-[12px] font-bold text-gray-500">{theme}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- SPECIAL ICONS --- */}
                <View className="bg-white rounded-[24px] p-5  border border-gray-100 mb-8">
                    <Text className="text-[12px] font-bold text-gray-500 mb-4">Special icons</Text>
                    <View className="flex-row flex-wrap justify-between gap-y-6">
                        {SPECIAL_ICONS.map((icon, idx) => (
                            <View key={icon} className="w-[30%] items-center gap-2">
                                {/* Gradient Mocks to simulate the rich icons */}
                                {/* <LinearGradient
                                    colors={idx % 2 === 0 ? ['#38BDF8', '#818CF8'] : ['#F472B6', '#FB923C']}
                                    className="w-16 h-16 rounded-[14px] items-center justify-center "
                                > */}
                                <LinearGradient
                                    colors={idx % 2 === 0 ? ['#38BDF8', '#818CF8'] : ['#F472B6', '#FB923C']}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 14,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        shadowColor: '#000',
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        shadowOffset: { width: 0, height: 2 },
                                        elevation: 2,
                                    }}
                                >
                                    <Text className="text-white font-bold text-[32px] italic">B</Text>
                                </LinearGradient>
                                <Text className="text-[11px] font-bold text-gray-800 text-center">{icon}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}