import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ScanBarcodeScreen() {
    const router = useRouter();
    const manualSheetRef = useRef<BottomSheetModal>(null);
    const [barcode, setBarcode] = useState('');
    const [permission, requestPermission] = useCameraPermissions();

    const handlePress = (key: string) => setBarcode(prev => prev + key);
    const handleBackspace = () => setBarcode(prev => prev.slice(0, -1));

    if (!permission) {
        return <View className='flex-1 bg-black' />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className='flex-1 bg-black items-center justify-center'>
                <Text className="text-white mb-4 text-center">We need your permission to use the camera</Text>
                <TouchableOpacity onPress={requestPermission} className="bg-white px-6 py-3 rounded-full">
                    <Text className="text-black font-bold">Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-black'>
                <CameraView
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "upc_a", "code128", "code39"],
                    }}
                    onBarcodeScanned={({ data }) => {
                        console.log("Scanned:", data);
                    }}
                />

                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-[#1A1A1A] items-center justify-center">
                        <Ionicons name="flash" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Main Viewfinder */}
                <View className="flex-1 items-center justify-center px-8 mb-20 pointer-events-none">
                    <Text className="text-white text-xl font-bold mb-2 shadow-sm shadow-black/50">Scan barcode</Text>
                    <Text className="text-gray-100 text-center font-medium text-sm mb-12 shadow-sm shadow-black/50">
                        Focus on the barcode to auto-scan or enter it manually to identify items.
                    </Text>

                    {/* Viewfinder Frame */}
                    <View className="w-full h-48 border-2 border-transparent relative">
                        {/* Corners */}
                        <View className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl" />
                        <View className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl" />
                        <View className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl" />
                        <View className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-2xl" />
                    </View>
                </View>

                {/* Bottom Controls */}
                <View className="flex-row justify-center gap-4 pb-8">
                    <TouchableOpacity className="bg-[#1A1A1A] flex-row items-center justify-center px-6 py-4 rounded-full gap-2">
                        <Ionicons name="copy-outline" size={18} color="white" />
                        <Text className="text-white font-bold">Multi-scan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => manualSheetRef.current?.present()}
                        className="bg-[#1A1A1A] flex-row items-center justify-center px-6 py-4 rounded-full gap-2"
                    >
                        <Ionicons name="keypad" size={18} color="white" />
                        <Text className="text-white font-bold">Manual</Text>
                    </TouchableOpacity>
                </View>

                {/* Manual Entry Bottom Sheet */}
                <BottomSheetModal
                    ref={manualSheetRef}
                    snapPoints={['55%']}
                    backdropComponent={props => <BottomSheetBackdrop {...props} opacity={0.6} />}
                    handleIndicatorStyle={{ display: 'none' }}
                    backgroundStyle={{ borderRadius: 24, backgroundColor: '#F2F3F7' }}
                >
                    <BottomSheetView className="flex-1 p-5 pt-3">
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity onPress={() => manualSheetRef.current?.dismiss()}>
                                <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                            </TouchableOpacity>
                            <Text className="font-bold text-gray-900 text-base">Enter barcode</Text>
                            <TouchableOpacity disabled={barcode.length === 0}>
                                <Text className={`font-bold text-base ${barcode.length > 0 ? 'text-gray-900' : 'text-gray-300'}`}>Add</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="border border-gray-300 rounded-xl px-4 py-3 bg-white mb-6">
                            <Text className={`${barcode ? 'text-gray-900' : 'text-gray-300'} text-lg font-medium`}>
                                {barcode || '00000000000000'}
                            </Text>
                        </View>

                        {/* Custom Numpad */}
                        <View className="flex-row flex-wrap justify-between gap-y-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <TouchableOpacity key={num} onPress={() => handlePress(num.toString())} className="w-[31%] h-14 bg-white rounded-xl items-center justify-center shadow-sm">
                                    <Text className="text-2xl font-medium text-gray-900">{num}</Text>
                                </TouchableOpacity>
                            ))}
                            <View className="w-[31%] h-14" /> {/* Empty spot */}
                            <TouchableOpacity onPress={() => handlePress('0')} className="w-[31%] h-14 bg-white rounded-xl items-center justify-center shadow-sm">
                                <Text className="text-2xl font-medium text-gray-900">0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBackspace} className="w-[31%] h-14 bg-white rounded-xl items-center justify-center shadow-sm">
                                <Ionicons name="backspace-outline" size={24} color="#1F2937" />
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

// const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#000000' } });