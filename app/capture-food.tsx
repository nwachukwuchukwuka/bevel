import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function CaptureFoodScreen() {
    const router = useRouter();
    const [zoom, setZoom] = useState<'0.5x' | '1x'>('1x');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className='flex-1 items-center justify-center bg-black'>
                <Text className="text-white mb-4 text-center">We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} className="bg-white px-6 py-3 rounded-full">
                    <Text className="text-black font-bold">Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-black'>
                <StatusBar style="light" />

                {/* 1. Top Header Bar */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="close" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-10 h-10 rounded-full bg-[#1A1A1A] items-center justify-center">
                        <Ionicons name="flash-outline" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* 2. Main Viewfinder Area (Camera View) */}
                <View className="flex-1 bg-[#111111] rounded-[40px] mx-2 mt-2 mb-6 overflow-hidden relative">
                    <CameraView style={{ flex: 1 }} facing="back" zoom={zoom === '0.5x' ? 0.0 : 0.0}>
                        <View className="flex-1 items-center justify-end pb-12">
                            {/* Overlay Text */}
                            <View className="items-center gap-2 mb-8">
                                <Text className="text-white text-xl font-bold">Take a photo</Text>
                                <Text className="text-gray-300 font-medium text-sm">Capture an image of a food or a receipt.</Text>
                            </View>

                            {/* Zoom Controls */}
                            <View className="flex-row items-center bg-[#2A2A2A] rounded-full p-1 gap-1">
                                <TouchableOpacity
                                    onPress={() => setZoom('0.5x')}
                                    className={`w-12 h-8 rounded-full items-center justify-center ${zoom === '0.5x' ? 'bg-white' : 'bg-transparent'}`}
                                >
                                    <Text className={`font-bold text-sm ${zoom === '0.5x' ? 'text-black' : 'text-white'}`}>.5x</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setZoom('1x')}
                                    className={`w-12 h-8 rounded-full items-center justify-center ${zoom === '1x' ? 'bg-white' : 'bg-transparent'}`}
                                >
                                    <Text className={`font-bold text-sm ${zoom === '1x' ? 'text-black' : 'text-white'}`}>1x</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CameraView>
                </View>

                {/* 3. Bottom Controls Area */}
                <View className="flex-row items-center justify-between px-10 pb-12 pt-2">
                    {/* Import Button */}
                    <TouchableOpacity className="items-center gap-3">
                        <View className="w-[52px] h-[52px] rounded-full bg-[#1A1A1A] items-center justify-center">
                            <Ionicons name="image-outline" size={22} color="#FFFFFF" />
                            <View className="absolute bottom-[14px] right-[12px] bg-white rounded-full w-2.5 h-2.5 items-center justify-center">
                                <Text className="text-black text-[8px] font-bold leading-none">+</Text>
                            </View>
                        </View>
                        <Text className="text-white text-xs font-semibold">Import</Text>
                    </TouchableOpacity>

                    {/* Shutter Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            // Handle capture logic here
                            console.log("Photo Captured!");
                        }}
                        className="w-[84px] h-[84px] rounded-full border-[4px] border-white items-center justify-center p-1"
                    >
                        <View className="flex-1 w-full bg-white rounded-full" />
                    </TouchableOpacity>

                    {/* Describe (AI) Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/describe-food')} // Useful shortcut based on context
                        className="items-center gap-3"
                    >
                        <View className="w-[52px] h-[52px] rounded-full bg-[#1A1A1A] items-center justify-center">
                            <Text className="text-white text-lg font-serif tracking-widest ml-1">AI</Text>
                        </View>
                        <Text className="text-white text-xs font-semibold">Describe</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}