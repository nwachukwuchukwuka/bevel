import { FeedbackSheet } from '@/components/FeedbackSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Message = { id: string; role: 'user' | 'ai'; text: string; images?: string[]; isThinking?: boolean };

export default function AskBevelScreen() {
    const router = useRouter();
    const feedbackSheetRef = useRef<BottomSheetModal>(null);

    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [attachments, setAttachments] = useState<string[]>([]);

    const handleSend = () => {
        if (!inputText.trim() && attachments.length === 0) return;

        const newMsg: Message = { id: Date.now().toString(), role: 'user', text: inputText, images: attachments };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        setAttachments([]);

        const aiThinkingId = (Date.now() + 1).toString();
        setTimeout(() => {
            setMessages(prev => [...prev, { id: aiThinkingId, role: 'ai', text: 'Processing request...', isThinking: true }]);

            setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === aiThinkingId ? {
                    ...m,
                    isThinking: false,
                    text: 'To improve your VO2 Max, the key is consistent cardio training that challenges your cardiovascular system...\n\n• High-Intensity Interval Training (HIIT): Short bursts of maximum effort...'
                } : m));
            }, 1500);
        }, 500);
    };

    const handleCopy = async (text: string) => {
        await Clipboard.setStringAsync(text);
    };

    const mockAddPhoto = () => {
        setAttachments(prev => [...prev, 'https://picsum.photos/200']);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaProvider>
                <View className="flex-1 bg-[#090D16]">

                    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                        <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B] flex-row justify-between items-center">
                            <View>
                                <Text className="text-xl font-bold text-slate-100">Bevel intelligence</Text>
                                <Text className="text-xs text-[#4DB9F2] font-semibold mt-1">Ready to assist</Text>
                            </View>
                            <View className="flex-row items-center gap-3">
                                <TouchableOpacity
                                    onPress={() => router.push('/chat-history')}
                                    activeOpacity={0.7}
                                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                                >
                                    <Ionicons name="time-outline" size={18} color="#94A3B8" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    activeOpacity={0.7}
                                    className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                                >
                                    <Ionicons name="close" size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                            {messages.length === 0 ? (
                                <View className="px-5 pt-8 pb-4">
                                    <View className="w-16 h-16 bg-[#151E33] rounded-2xl border border-[#2D3748] items-center justify-center mb-6">
                                        <Ionicons name="sparkles" size={24} color="#4DB9F2" />
                                    </View>
                                    <Text className="text-3xl font-bold text-slate-100 mb-8">What do you want to explore today?</Text>

                                    <Text className="text-xs font-semibold text-slate-500 mb-3 pl-1">Suggested prompts</Text>
                                    <View className="flex-col gap-3">
                                        {[
                                            { icon: 'moon-outline', text: 'Break down my Sleep Score today and tell me the biggest limiter.' },
                                            { icon: 'watch-outline', text: 'How do I start a strength workout on the watch and live sync to my phone?' },
                                            { icon: 'pulse-outline', text: 'How do I improve my VO2 Max?' }
                                        ].map((prompt, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => setInputText(prompt.text)}
                                                activeOpacity={0.8}
                                                className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-4"
                                            >
                                                <View className="w-10 h-10 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                                    <Ionicons name={prompt.icon as any} size={18} color="#4DB9F2" />
                                                </View>
                                                <Text className="text-slate-300 font-medium leading-5 flex-1">{prompt.text}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ) : (
                                <View className="px-5 pt-6 gap-6">
                                    {messages.map((msg) => (
                                        <View key={msg.id} className="w-full flex-col">

                                            {msg.images && msg.images.length > 0 && (
                                                <View className="flex-row gap-2 mb-3 justify-end">
                                                    {msg.images.map((img, i) => (
                                                        <Image key={i} source={{ uri: img }} className="w-20 h-28 rounded-xl border border-[#2D3748]" />
                                                    ))}
                                                </View>
                                            )}

                                            <View className={`max-w-[85%] rounded-2xl p-5 border ${msg.role === 'user'
                                                ? 'self-end bg-[#1E293B] border-[#2D3748] rounded-tr-sm'
                                                : 'self-start bg-[#151E33] border-[#1E293B] rounded-tl-sm'
                                                }`}>
                                                {msg.isThinking ? (
                                                    <View className="flex-row items-center gap-2 opacity-50">
                                                        <Ionicons name="sync" size={16} color="#4DB9F2" />
                                                        <Text className="text-slate-400 font-medium text-sm">{msg.text}</Text>
                                                    </View>
                                                ) : (
                                                    <Text className={`text-base leading-7 ${msg.role === 'user' ? 'text-slate-100' : 'text-slate-300'}`}>
                                                        {msg.text}
                                                    </Text>
                                                )}
                                            </View>

                                            {msg.role === 'ai' && !msg.isThinking && (
                                                <View className="flex-row gap-3 mt-3 ml-2">
                                                    <TouchableOpacity
                                                        onPress={() => handleCopy(msg.text)}
                                                        className="flex-row items-center gap-1.5 bg-[#1E293B40] px-3 py-1.5 rounded-lg border border-[#1E293B]"
                                                    >
                                                        <Ionicons name="copy-outline" size={14} color="#94A3B8" />
                                                        <Text className="text-xs text-slate-400">Copy</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => feedbackSheetRef.current?.present()}
                                                        className="flex-row items-center gap-1.5 bg-[#1E293B40] px-3 py-1.5 rounded-lg border border-[#1E293B]"
                                                    >
                                                        <Ionicons name="alert-circle-outline" size={14} color="#94A3B8" />
                                                        <Text className="text-xs text-slate-400">Feedback</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </ScrollView>

                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="px-5 pb-4 pt-2">

                            {attachments.length > 0 && (
                                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-3 flex-row gap-3 mb-4">
                                    {attachments.map((img, i) => (
                                        <View key={i} className="relative w-16 h-20 rounded-xl border border-[#2D3748] overflow-hidden">
                                            <Image source={{ uri: img }} className="w-full h-full" />
                                            <TouchableOpacity
                                                onPress={() => setAttachments(prev => prev.filter((_, index) => index !== i))}
                                                className="absolute top-1 right-1 bg-[#090D16]/80 p-1 rounded-md border border-[#EF4444]"
                                            >
                                                <Ionicons name="trash-outline" size={12} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <View className="flex-col gap-3">
                                <View className="flex-row items-center justify-between pl-1">
                                    <Text className="text-xs font-semibold text-slate-500">Awaiting input</Text>
                                    <View className="flex-row items-center gap-2">
                                        <TouchableOpacity onPress={mockAddPhoto} activeOpacity={0.7} className="w-8 h-8 rounded-lg bg-[#151E33] border border-[#1E293B] items-center justify-center">
                                            <Ionicons name="camera-outline" size={16} color="#94A3B8" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={mockAddPhoto} activeOpacity={0.7} className="w-8 h-8 rounded-lg bg-[#151E33] border border-[#1E293B] items-center justify-center">
                                            <Ionicons name="image-outline" size={16} color="#94A3B8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-2 flex-row items-end">
                                    <TextInput
                                        placeholder="Ask a question..."
                                        placeholderTextColor="#64748B"
                                        value={inputText}
                                        onChangeText={setInputText}
                                        multiline
                                        className="flex-1 min-h-[44px] max-h-[120px] text-base text-slate-100 px-3 pt-3 pb-3"
                                        selectionColor="#4DB9F2"
                                    />
                                    <TouchableOpacity
                                        onPress={handleSend}
                                        activeOpacity={0.8}
                                        disabled={!inputText.trim() && attachments.length === 0}
                                        className={`w-11 h-11 rounded-xl items-center justify-center border ${(inputText.trim() || attachments.length > 0)
                                            ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                            : 'bg-[#1E293B] border-[#2D3748]'
                                            }`}
                                    >
                                        <Ionicons
                                            name="arrow-up"
                                            size={20}
                                            color={(inputText.trim() || attachments.length > 0) ? '#090D16' : '#64748B'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </KeyboardAvoidingView>
                    </SafeAreaView>

                    <FeedbackSheet ref={feedbackSheetRef} />
                </View>
            </SafeAreaProvider>
        </BottomSheetModalProvider>
    );
}