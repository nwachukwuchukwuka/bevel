// import { Ionicons } from '@expo/vector-icons';
// import { Slot, usePathname, useRouter } from 'expo-router';
// import React from 'react';
// import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function OnboardingFlowLayout() {
//     const router = useRouter();
//     const pathname = usePathname();

//     const getProgress = () => {
//         if (pathname.endsWith('/welcome')) return 0;
//         if (pathname.endsWith('/name')) return 0.1;
//         if (pathname.includes('welcome-interstitial')) return 0.2;
//         if (pathname.includes('health-focus')) return 0.3;
//         if (pathname.includes('barriers')) return 0.4;
//         if (pathname.includes('secondary-focus')) return 0.5;
//         if (pathname.includes('sleep-goals')) return 0.7;

//         if (pathname.includes('secondary-fitness-focus')) return 0.75;
//         if (pathname.includes('fitness-goals')) return 0.8;
//         if (pathname.includes('biometrics-intro')) return 0.85;
//         if (pathname.includes('health-access')) return 0.9;
//         if (pathname.includes('birthday')) return 0.95;
//         if (pathname.includes('units')) return 1.0;

//         return 0;
//     };


//     const progress = getProgress();

//     return (
//         <View className="flex-1 bg-[#FAFAFA]">
//             <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

//                 {/* --- FIXED HEADER START --- */}
//                 <View className="flex-row items-center justify-between px-4 h-12 z-10 bg-[#FAFAFA]">
//                     {/* Back Button */}
//                     <TouchableOpacity onPress={() => router.back()} className="p-2">
//                         <Ionicons name="chevron-back" size={24} color="#171717" />
//                     </TouchableOpacity>

//                     {/* Progress Bar */}
//                     <View className="flex-1 mx-4 h-1 bg-neutral-200 rounded-full overflow-hidden">
//                         <View
//                             className="h-full bg-neutral-900 rounded-full"
//                             style={{ width: `${progress * 100}%` }}
//                         />
//                     </View>

//                     {/* Invisible spacer to balance layout */}
//                     <View className="w-10" />
//                 </View>
//                 {/* --- FIXED HEADER END --- */}

//                 {/* Content Slot - This is where the screens are rendered */}
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                     className="flex-1"
//                 >
//                     <View className="flex-1 px-6 pb-5">
//                         <Slot />
//                     </View>
//                 </KeyboardAvoidingView>

//             </SafeAreaView>
//         </View>
//     );
// }

import { Ionicons } from '@expo/vector-icons';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingFlowLayout() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#090D16]">
            <StatusBar style="light" />

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                {/* Integrated Borderless Header */}
                <View className="px-5 pt-4 pb-2 bg-[#090D16] flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                        {/* <View>
                            <Text className="text-xl font-bold text-slate-100">Setup initialization</Text>
                            <Text className="text-xs text-slate-400 mt-1">Configuration protocol</Text>
                        </View> */}
                    </View>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <View className="flex-1 px-5 pt-6 pb-8">
                        <Slot />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    );
}