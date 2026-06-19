import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const PersonalizationSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const router = useRouter();
    const [view, setView] = useState<'main' | 'tone'>('main');
    const [selectedTone, setSelectedTone] = useState<'Gentle' | 'Neutral' | 'Direct'>('Neutral');

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} />,
        []
    );

    const handleDismiss = () => {
        (ref as any).current?.dismiss();
        setTimeout(() => setView('main'), 300);
    };

    const TONE_CONTENT = {
        Gentle: {
            desc: "My tone will be kind and supportive, offering encouragement every step of the way.",
            previews: [
                "Hey, I see you're not feeling too great 😥",
                "Be kind to yourself today, and we'll pick things back up slowly. Don't worry about it!",
                "I'll be here when you're ready 💛"
            ]
        },
        Neutral: {
            desc: "My tone will blend encouragement and directness, adapting to what fits the moment best.",
            previews: [
                "Feeling sick? Let's listen to your body 🤒",
                "Rest if you need to, or we can try something light. It's a nice day out too!",
                "Your call 👍"
            ]
        },
        Direct: {
            desc: "My tone will be concise and straightforward, focused purely on the facts.",
            previews: [
                "Noted that you feel sick.",
                "I recommend resting today. We will resume training tomorrow.",
                "Understood."
            ]
        }
    };

    const toneStops = ['Gentle', 'Neutral', 'Direct'] as const;

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['90%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1">
                {view === 'main' ? (
                    <View className="flex-1 px-5 pt-4">
                        <View className="flex-row items-center justify-between mb-8">
                            <View>
                                <Text className="text-[24px] font-bold text-slate-100 mb-1">Personalization</Text>
                                <Text className="text-[13px] font-medium text-slate-400">Configure AI assistant traits</Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleDismiss}
                                className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                            >
                                <Ionicons name="close" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-slate-500 font-bold text-[12px] mb-3 ml-1">Tone & Detail</Text>
                        <View className="bg-[#151E33] rounded-[20px] border border-[#1E293B] mb-8 overflow-hidden">
                            <TouchableOpacity
                                onPress={() => setView('tone')}
                                className="flex-row justify-between items-center p-4 border-b border-[#1E293B]"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 rounded-[14px] bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="chatbubbles" size={20} color="#4DB9F2" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-slate-100 text-[16px] mb-1">{selectedTone}</Text>
                                        <Text className="text-slate-500 text-[13px] font-medium">Tone</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#64748B" />
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row justify-between items-center p-4">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 rounded-[14px] bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="document-text" size={20} color="#4DB9F2" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-slate-100 text-[16px] mb-1">Moderate</Text>
                                        <Text className="text-slate-500 text-[13px] font-medium">Detail</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-slate-500 font-bold text-[12px] mb-3 ml-1">Memory</Text>
                        <View className="bg-[#151E33] rounded-[20px] border border-[#1E293B] overflow-hidden">
                            <TouchableOpacity
                                onPress={() => {
                                    handleDismiss();
                                    router.push('/manage-memory');
                                }}
                                className="flex-row justify-between items-center p-4"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 rounded-[14px] bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="server" size={20} color="#4DB9F2" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-slate-100 text-[16px] mb-1">Manage memory</Text>
                                        <Text className="text-slate-500 text-[13px] font-medium">Review saved contexts</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#64748B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                ) : (
                    <View className="flex-1 px-5 pt-4 pb-8">
                        <View className="flex-row items-center justify-between mb-8">
                            <View>
                                <Text className="text-[24px] font-bold text-slate-100 mb-1">Response Tone</Text>
                                <Text className="text-[13px] font-medium text-slate-400">Set preferred voice of responses</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setView('main')}
                                className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                            >
                                <Ionicons name="arrow-back" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-1 gap-4 mt-2">
                            {TONE_CONTENT[selectedTone].previews.map((text, idx) => (
                                <View
                                    key={idx}
                                    className="bg-[#151E33] border border-[#1E293B] px-5 py-4 rounded-[20px] rounded-tl-sm max-w-[85%] self-start"
                                >
                                    <Text className="text-slate-200 text-[14px] font-medium leading-6">{text}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="mt-6 bg-[#151E33] border border-[#1E293B] rounded-[24px] p-6">
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="font-bold text-slate-100 text-[18px]">{selectedTone}</Text>
                                <View className="bg-blue-950/30 border border-blue-500/20 px-2 py-1 rounded-md">
                                    <Text className="text-blue-400 font-bold text-[10px]">Active Profile</Text>
                                </View>
                            </View>

                            <Text className="text-slate-400 text-[13px] font-medium leading-5 mb-8">
                                {TONE_CONTENT[selectedTone].desc}
                            </Text>

                            <View className="mb-8">
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={2}
                                    step={1}
                                    value={toneStops.indexOf(selectedTone)}
                                    onValueChange={(val) => setSelectedTone(toneStops[val])}
                                    minimumTrackTintColor="#4DB9F2"
                                    maximumTrackTintColor="#1E293B"
                                    thumbTintColor="#4DB9F2"
                                />
                                <View className="flex-row justify-between mt-2 px-1">
                                    <Text className="text-slate-500 text-[12px] font-bold">Gentle</Text>
                                    <Text className="text-slate-500 text-[12px] font-bold">Direct</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleDismiss}
                                className="bg-[#4DB9F2] py-4 rounded-[16px] items-center border border-[#4DB9F2]"
                            >
                                <Text className="text-[#090D16] font-bold text-[16px]">Save Configuration</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});