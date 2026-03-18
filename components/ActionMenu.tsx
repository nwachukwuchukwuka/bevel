import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const MENU_ITEMS = [
    { icon: "text", label: "Describe food", type: "standard" },
    { icon: "image", label: "Import food", type: "standard" },
    { icon: "camera", label: "Capture food", type: "standard" },
    { icon: "scan", label: "Scan food", type: "standard" },
    { icon: "orb", label: "Ask Bevel", type: "special" },
    { icon: "search", label: "Search food", type: "standard" },
    { icon: "sparkles", label: "Generate\ntemplates", type: "standard" },
    { icon: "barbell", label: "View templates", type: "standard" },
    { icon: "walk", label: "Log activity", type: "standard" },
];

interface ActionMenuProps {
    onClose: () => void;
    onOpenTemplates: () => void;
}

export const ActionMenu = ({ onClose, onOpenTemplates }: ActionMenuProps) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const cardWidth = width - 32;
    const itemWidth = (cardWidth - 48) / 3;

    const bottomOffset = Platform.OS === 'ios' ? 95 : 70;

    const handlePress = (item: any) => {
        onClose();
        setTimeout(() => {
            if (item.label === "Describe food") {
                router.push('/describe-food');
            } else if (item.label === "Import food") {
                router.push('/import-food');
            } else if (item.label === "Capture food") {
                router.push('/capture-food');
            } else if (item.label === "Scan food") {
                router.push('/scan-barcode');
            } else if (item.label === "Ask Bevel") {
                router.push('/ask-bevel');
            }
            else if (item.label === "Search food") {
                router.push('/search-food');
            }
            else if (item.label === "Generate\ntemplates") {
                router.push('/generate-template/1-experience');
            }
            else if (item.label === "View templates") {
                onOpenTemplates();
            }
            else if (item.label === "Log activity") {
                router.push('/log-activity');
            }
        }, 100);
    };


    return (
        <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
            }}
        >
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}
                onPress={onClose}
            />

            <Animated.View
                entering={FadeIn.duration(250)}
                exiting={FadeOut.duration(200)}
                style={{
                    position: 'absolute',
                    bottom: bottomOffset + insets.bottom,
                    left: 16,
                    right: 16,
                }}
            >
                {/* I wrap the card in a generic Pressable without action to stop the onClose propagation */}
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <View className="bg-white rounded-[32px] p-6 shadow-2xl shadow-black/20">

                        <View className="flex-row flex-wrap justify-between gap-y-6">
                            {MENU_ITEMS.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    onPress={() => handlePress(item)}
                                    className="items-center"
                                    style={{ width: itemWidth }}
                                >
                                    {/* Icon Circle */}
                                    <View className="mb-2">
                                        {item.type === 'special' ? (
                                            <LinearGradient
                                                colors={['#E0E7FF', '#F3E8FF', '#FFFFFF']}
                                                className="h-16 w-16 rounded-full items-center justify-center border border-white shadow-sm"
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                            >
                                                <View className="bg-white/40 h-14 w-14 rounded-full items-center justify-center">
                                                    <LinearGradient
                                                        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.2)']}
                                                        className="absolute top-0 left-0 w-full h-1/2 rounded-t-full"
                                                    />
                                                </View>
                                            </LinearGradient>
                                        ) : (
                                            <View className="h-16 w-16 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
                                                <Ionicons
                                                    name={getIconName(item.icon)}
                                                    size={26}
                                                    color="#111827"
                                                />
                                                {item.icon === 'image' && (
                                                    <View className="absolute bottom-4 right-4 bg-black rounded-full w-3.5 h-3.5 items-center justify-center border border-white">
                                                        <Text className="text-white text-[9px] font-bold">+</Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </View>

                                    {/* Label */}
                                    <Text className="text-[11px] font-semibold text-gray-600 text-center leading-4">
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );
};

// Helper for Icons
const getIconName = (name: string): any => {
    switch (name) {
        case 'text': return 'text-outline';
        case 'image': return 'image-outline';
        case 'camera': return 'camera';
        case 'scan': return 'scan-outline';
        case 'search': return 'search';
        case 'sparkles': return 'sparkles';
        case 'barbell': return 'barbell';
        case 'walk': return 'walk';
        default: return 'help-circle';
    }
}