import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Dimensions,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FitnessWidgets } from '../../components/FitnessWidgets';
import Pagination from '../../components/Pagination';
import { COLORS, ONBOARDING_DATA } from '../../constants';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const scrollX = useSharedValue(0);
    const router = useRouter();

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const renderItem = ({ item }: { item: typeof ONBOARDING_DATA[0] }) => {
        return (
            <View style={{ width }} className="px-6 pt-10">
                <View className="flex-1">
                    {/* SLIDE 1: Intro Logo */}
                    {item.type === 'intro' && (
                        <View className="flex-1 justify-center items-center -mt-20">
                            <View className="w-48 h-48 relative justify-center items-center">
                                <View className="absolute w-32 h-32 border-[12px] border-white/20 rounded-full top-0 right-4 transform rotate-12" />
                                <View className="absolute w-32 h-32 border-[12px] border-white/30 rounded-full bottom-0 left-4 transform -rotate-12" />
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.05)']}
                                    style={{ width: 140, height: 140, borderRadius: 40, transform: [{ skewX: '-10deg' }] }}
                                    className="items-center justify-center border border-white/20"
                                />
                            </View>
                        </View>
                    )}

                    {/* SLIDE 2: Fitness Widgets */}
                    {item.type === 'widget' && (
                        <View className="mt-10">
                            <FitnessWidgets />
                        </View>
                    )}

                    {/* Typography */}
                    <View className={item.type === 'intro' ? 'mb-20' : 'mt-8'}>
                        <Animated.Text
                            entering={FadeInDown.duration(600).delay(200)}
                            className={`text-4xl ${item.type === 'intro' ? 'text-center' : ''} font-semibold text-neutral-800 tracking-tight leading-tight`}
                        >
                            {item.title}
                        </Animated.Text>

                        {item.subtitle ? (
                            <Animated.Text
                                entering={FadeInDown.duration(600).delay(300)}
                                className="text-neutral-500 text-lg mt-3 leading-6"
                            >
                                {item.subtitle}
                            </Animated.Text>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-neutral-200">
            <StatusBar style="dark" />

            <LinearGradient
                colors={[COLORS.bgGradientStart, COLORS.bgGradientEnd]}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            />

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                <Animated.FlatList
                    data={ONBOARDING_DATA}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    keyExtractor={(item) => item.id}
                    bounces={false}
                />

                <View className="px-6 pb-4">
                    <Pagination data={ONBOARDING_DATA} scrollX={scrollX} screenWidth={width} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full bg-black h-14 rounded-full flex-row justify-center items-center gap-2 shadow-lg"
                    >
                        <Ionicons name="logo-apple" size={20} color="white" />
                        <Text className="text-white font-semibold text-lg">Continue with Apple</Text>
                    </TouchableOpacity>

                    <Pressable onPress={() => router.push('/onboarding/email')} className="mt-5 mb-2 items-center">
                        <Text className="text-neutral-700 font-medium text-sm">Use email instead</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}