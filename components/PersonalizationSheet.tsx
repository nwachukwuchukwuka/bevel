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
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />,
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
            snapPoints={['100%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1">
                {view === 'main' ? (
                    // --- MAIN PERSONALIZATION VIEW ---
                    <View className="flex-1 px-5 pt-2">
                        {/* Header */}
                        <View className="flex-row items-center justify-center mb-8 relative">
                            <TouchableOpacity onPress={handleDismiss} className="absolute left-0">
                                <Ionicons name="close" size={24} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text className="font-bold text-gray-900 text-base">Personalization</Text>
                        </View>

                        {/* Tone & Detail */}
                        <Text className="text-gray-500 font-medium text-[13px] mb-3 ml-1">Tone & Detail</Text>

                        <View className="bg-white rounded-[20px]  shadow-black/5 border border-gray-100 mb-6 flex-col overflow-hidden">
                            {/* Tone Item */}
                            <TouchableOpacity
                                onPress={() => setView('tone')}
                                className="flex-row justify-between items-center p-4 border-b border-gray-100/80"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                        <Ionicons name="chatbubble-ellipses" size={16} color="#4B5563" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-gray-900 text-base mb-0.5">{selectedTone}</Text>
                                        <Text className="text-gray-400 text-xs font-medium">Tone</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                            </TouchableOpacity>

                            {/* Detail Item */}
                            <TouchableOpacity className="flex-row justify-between items-center p-4">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                        <Ionicons name="document-text" size={16} color="#4B5563" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-gray-900 text-base mb-0.5">Moderate</Text>
                                        <Text className="text-gray-400 text-xs font-medium">Detail</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        {/* Memory */}
                        <Text className="text-gray-500 font-medium text-[13px] mb-3 ml-1">Memory</Text>

                        <View className="bg-white rounded-[20px]  shadow-black/5 border border-gray-100 overflow-hidden">
                            <TouchableOpacity
                                onPress={() => {
                                    handleDismiss();
                                    router.push('/manage-memory');
                                }}
                                className="flex-row justify-between items-center p-4"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                        <Ionicons name="settings" size={16} color="#4B5563" />
                                    </View>
                                    <Text className="font-bold text-gray-900 text-base">Manage memory</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                ) : (

                    // --- TONE SETTINGS VIEW ---
                    <View className="flex-1 px-5 pt-2 pb-8">
                        {/* Header */}
                        <View className="flex-row items-center justify-center mb-6 relative">
                            <TouchableOpacity onPress={() => setView('main')} className="absolute left-0">
                                <Ionicons name="close" size={24} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text className="font-medium text-gray-600 text-sm">Tone</Text>
                        </View>

                        <Text className="font-bold text-gray-900 text-[18px] text-center mb-8 px-4 leading-7">
                            Set preferred tone and{'\n'}voice of responses
                        </Text>

                        {/* Chat Previews */}
                        <View className="flex-1 items-start gap-4">
                            {TONE_CONTENT[selectedTone].previews.map((text, idx) => (
                                <View key={idx} className="bg-[#F8F9FA] px-4 py-3 rounded-3xl rounded-tl-sm max-w-[85%]">
                                    <Text className="text-gray-900 text-[14px] font-medium leading-5 z-10">{text}</Text>

                                    {/* Multi-color glow effects behind the bubble */}
                                    <View className="absolute -inset-[3px] border border-[#FDE68A] rounded-3xl rounded-tl-sm opacity-30 z-0" />
                                    <View className="absolute -inset-[6px] border border-[#93C5FD] rounded-3xl rounded-tl-sm opacity-20 -z-10" />
                                </View>
                            ))}
                        </View>

                        {/* Tone Selector & Description */}
                        <View className="mt-8">
                            <Text className="text-center font-bold text-gray-900 text-[18px] mb-2">{selectedTone}</Text>
                            <Text className="text-center text-gray-400 text-[12px] font-medium leading-5 mb-8 px-4">
                                {TONE_CONTENT[selectedTone].desc}
                            </Text>

                            {/* Slider */}
                            <View className="mb-4 relative justify-center px-4">
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={2}
                                    step={1}
                                    value={toneStops.indexOf(selectedTone)}
                                    onValueChange={(val) => setSelectedTone(toneStops[val])}
                                    minimumTrackTintColor="#1A1A1A"
                                    maximumTrackTintColor="#E5E7EB"
                                    thumbTintColor="#1A1A1A"
                                />
                                {/* Labels below slider */}
                                <View className="flex-row justify-between w-full mt-2 px-1 pointer-events-none">
                                    <Text className="text-gray-400 text-xs font-medium text-left  text-center">Gentle</Text>
                                    <Text className="text-gray-400 text-xs font-medium text-right text-center">Direct</Text>
                                </View>
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity
                                onPress={handleDismiss}
                                className="bg-[#1A1A1A] py-4 rounded-full items-center mt-4"
                            >
                                <Text className="text-white font-bold text-base">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});
