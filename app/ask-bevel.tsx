import { FeedbackSheet } from '@/components/FeedbackSheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
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
    const [showAttachMenu, setShowAttachMenu] = useState(false);

    // --- Actions ---
    const handleSend = () => {
        if (!inputText.trim() && attachments.length === 0) return;

        const newMsg: Message = { id: Date.now().toString(), role: 'user', text: inputText, images: attachments };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        setAttachments([]);

        // Simulate AI response
        const aiThinkingId = (Date.now() + 1).toString();
        setTimeout(() => {
            setMessages(prev => [...prev, { id: aiThinkingId, role: 'ai', text: 'Thought for 16 seconds.', isThinking: true }]);

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
        // Optional: Show a small toast here
    };

    const mockAddPhoto = () => {
        // Mocking image picking
        setAttachments(prev => [...prev, 'https://picsum.photos/200']);
        setShowAttachMenu(false);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaProvider>
                <View className="flex-1 bg-black/40">
                    <BlurView intensity={70} tint="dark" className="absolute inset-0" />

                    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                        {/* Header */}
                        <View className="flex-row justify-between items-center px-5 py-4">
                            <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
                                <Ionicons name="close" size={18} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/chat-history')} className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
                                <Ionicons name="folder-outline" size={16} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Chat Area */}
                        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 20, gap: 16 }}>
                            {messages.length === 0 ? (
                                // Empty State Prompts
                                <View className="flex-1 justify-end gap-3 pb-4">
                                    {['Break down my Sleep Score today and tell me the biggest limiter.', 'How do I start a strength workout on the watch and live sync to my phone?', 'How do I improve my VO2 Max?'].map((prompt, i) => (
                                        <TouchableOpacity key={i} onPress={() => setInputText(prompt)} className="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex-row justify-between items-center shadow-sm">
                                            <Text className="text-gray-900 font-medium pr-4 leading-5 flex-1">{prompt}</Text>
                                            <Ionicons name="arrow-up-circle" size={24} color="#9CA3AF" />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                // Messages
                                messages.map((msg) => (
                                    <View key={msg.id} className={`max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>

                                        {/* User Attached Images */}
                                        {msg.images && msg.images.length > 0 && (
                                            <View className="flex-row gap-2 mb-2 justify-end">
                                                {msg.images.map((img, i) => (
                                                    <Image key={i} source={{ uri: img }} className="w-24 h-24 rounded-2xl border border-white/20" />
                                                ))}
                                            </View>
                                        )}

                                        {/* Bubble */}
                                        <View className={`rounded-3xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-[#8BB8F8] rounded-tr-sm' : 'bg-white rounded-tl-sm'}`}>
                                            {msg.isThinking ? (
                                                <View className="flex-row items-center gap-1 opacity-50">
                                                    <View className="w-2 h-2 bg-gray-500 rounded-full" />
                                                    <View className="w-2 h-2 bg-gray-500 rounded-full" />
                                                    <View className="w-2 h-2 bg-gray-500 rounded-full" />
                                                </View>
                                            ) : (
                                                <Text className={`font-medium leading-6 ${msg.role === 'user' ? 'text-white' : 'text-gray-900'}`}>{msg.text}</Text>
                                            )}
                                        </View>

                                        {/* AI Action Row */}
                                        {msg.role === 'ai' && !msg.isThinking && (
                                            <View className="flex-row gap-4 mt-2 ml-2">
                                                <TouchableOpacity onPress={() => handleCopy(msg.text)}>
                                                    <Ionicons name="copy-outline" size={16} color="#D1D5DB" />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Ionicons name="thumbs-up-outline" size={16} color="#D1D5DB" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => feedbackSheetRef.current?.present()}>
                                                    <Ionicons name="thumbs-down-outline" size={16} color="#D1D5DB" />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                ))
                            )}
                        </ScrollView>

                        {/* Input Area */}
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="px-5 pb-2 pt-2 relative">

                            {/* Attachments Popover Menu */}
                            {showAttachMenu && (
                                <View className="absolute bottom-20 left-5 bg-white rounded-2xl p-2 shadow-lg z-50 w-48">
                                    <TouchableOpacity onPress={mockAddPhoto} className="flex-row justify-between items-center p-3 border-b border-gray-100">
                                        <Text className="font-medium text-gray-900">Camera</Text>
                                        <Ionicons name="camera" size={18} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={mockAddPhoto} className="flex-row justify-between items-center p-3">
                                        <Text className="font-medium text-gray-900">Photo Library</Text>
                                        <Ionicons name="image" size={18} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Staged Attachments Preview */}
                            {attachments.length > 0 && (
                                <View className="bg-white/90 rounded-t-[24px] p-4 flex-row gap-2 mb-[-20px] pb-6">
                                    {attachments.map((img, i) => (
                                        <View key={i} className="relative">
                                            <Image source={{ uri: img }} className="w-16 h-16 rounded-xl" />
                                            <TouchableOpacity
                                                onPress={() => setAttachments(prev => prev.filter((_, index) => index !== i))}
                                                className="absolute -top-1 -left-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center border border-white"
                                            >
                                                <View className="w-2 h-[2px] bg-white rounded-full" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <View className="flex-row items-center gap-3">
                                <TouchableOpacity
                                    onPress={() => setShowAttachMenu(!showAttachMenu)}
                                    className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md items-center justify-center"
                                >
                                    <Ionicons name="add" size={24} color="#4B5563" />
                                </TouchableOpacity>

                                <View className={`flex-1 flex-row items-center bg-white/90 backdrop-blur-md pl-4 pr-2 shadow-sm ${attachments.length > 0 ? 'rounded-b-[24px]' : 'rounded-full h-12'}`}>
                                    <TextInput
                                        placeholder="Ask Bevel anything"
                                        placeholderTextColor="#9CA3AF"
                                        value={inputText}
                                        onChangeText={setInputText}
                                        className="flex-1 font-medium text-gray-900 h-12"
                                    />
                                    {(inputText || attachments.length > 0) && (
                                        <TouchableOpacity onPress={handleSend} className="w-8 h-8 bg-[#1A1A1A] rounded-full items-center justify-center">
                                            <Ionicons name="arrow-up" size={18} color="white" />
                                        </TouchableOpacity>
                                    )}
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