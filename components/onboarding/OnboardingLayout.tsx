// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface OnboardingLayoutProps {
//     children: React.ReactNode;
//     title?: string;
//     subtitle?: string;
//     showBack?: boolean;
//     progress?: number; // 0 to 1
//     darkTheme?: boolean; // For the sleep education screen
// }

// export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
//     children,
//     title,
//     subtitle,
//     showBack = true,
//     progress,
//     darkTheme = false,
// }) => {
//     const router = useRouter();
//     const textColor = darkTheme ? 'text-white' : 'text-neutral-900';
//     const subTextColor = darkTheme ? 'text-neutral-400' : 'text-neutral-500';
//     const iconColor = darkTheme ? 'white' : 'black';

//     return (
//         <View className={`flex-1 ${darkTheme ? 'bg-[#1C1C1E]' : 'bg-[#FAFAFA]'}`}>
//             <StatusBar style={darkTheme ? 'light' : 'dark'} />
//             <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

//                 {/* Header */}
//                 <View className="flex-row items-center justify-between px-4 h-12">
//                     {showBack ? (
//                         <TouchableOpacity onPress={() => router.back()} className="p-2">
//                             <Ionicons name="chevron-back" size={24} color={iconColor} />
//                         </TouchableOpacity>
//                     ) : <View className="w-10" />}

//                     {/* Progress Bar */}
//                     {progress !== undefined && (
//                         <View className="flex-1 mx-4 h-1 bg-neutral-200 rounded-full overflow-hidden">
//                             <View
//                                 className={`h-full ${darkTheme ? 'bg-blue-500' : 'bg-neutral-900'}`}
//                                 style={{ width: `${progress * 100}%` }}
//                             />
//                         </View>
//                     )}

//                     {/* Spacer to balance Back button */}
//                     <View className="w-10" />
//                 </View>

//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                     className="flex-1"
//                 >
//                     <ScrollView
//                         contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 20 }}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         {/* Title Section */}
//                         {(title || subtitle) && (
//                             <View className="mt-6 mb-8 items-center">
//                                 {title && (
//                                     <Text className={`text-2xl font-bold text-center mb-3 ${textColor}`}>
//                                         {title}
//                                     </Text>
//                                 )}
//                                 {subtitle && (
//                                     <Text className={`text-base text-center leading-6 ${subTextColor}`}>
//                                         {subtitle}
//                                     </Text>
//                                 )}
//                             </View>
//                         )}

//                         {children}
//                     </ScrollView>
//                 </KeyboardAvoidingView>
//             </SafeAreaView>
//         </View>
//     );
// };


import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    progress?: number;
    darkTheme?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    title,
    subtitle,
    showBack = true,
    progress,
    darkTheme = false,
}) => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#090D16]">
            <StatusBar style="light" />
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                <View className="px-5 pt-4  flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                        {showBack ? (
                            <TouchableOpacity
                                onPress={() => router.back()}
                                activeOpacity={0.7}
                                className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                            >
                                <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                            </TouchableOpacity>
                        ) : (
                            <View className="w-10 h-10" />
                        )}
                        {/* <View>
                            <Text className="text-xl font-bold text-slate-100">Setup initialization</Text>
                            <Text className="text-xs text-slate-400 mt-1">Configuration protocol</Text>
                        </View> */}
                    </View>
                </View>

                {progress !== undefined && (
                    <View className="w-full bg-[#151E33] border-b border-[#1E293B]">
                        <View className="h-1 w-full bg-[#090D16]">
                            <View
                                className="h-full bg-[#4DB9F2]"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </View>
                        <View className="px-5 py-2 flex-row justify-between items-center">
                            <Text className="text-[10px] font-bold text-[#4DB9F2]">Progress</Text>
                            <Text className="text-[10px] font-bold text-slate-500">{Math.round(progress * 100)}%</Text>
                        </View>
                    </View>
                )}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 32, paddingBottom: 32 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {(title || subtitle) && (
                            <View className="mb-8 pl-4">
                                {title && (
                                    <Text className="text-3xl font-bold text-white mb-2 ">
                                        {title}
                                    </Text>
                                )}
                                {subtitle && (
                                    <Text className="text-sm font-medium text-slate-400 leading-6">
                                        {subtitle}
                                    </Text>
                                )}
                            </View>
                        )}

                        <View className="flex-1">
                            {children}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};