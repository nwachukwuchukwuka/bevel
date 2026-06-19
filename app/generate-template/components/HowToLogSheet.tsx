// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { forwardRef, useCallback } from 'react';
// import { Text, View } from 'react-native';

// export const HowToLogSheet = forwardRef<BottomSheetModal>((props, ref) => {
//     const renderBackdrop = useCallback(
//         (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />,
//         []
//     );

//     return (
//         <BottomSheetModal
//             ref={ref}
//             snapPoints={['55%']}
//             backdropComponent={renderBackdrop}
//             handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
//             backgroundStyle={{ borderRadius: 32, backgroundColor: '#FFFFFF' }}
//             enableDynamicSizing={false}
//         >
//             <BottomSheetView className="flex-1 px-6 pt-4 items-center">
//                 <Text className="text-xl font-bold text-gray-900 mb-3">Logging Machine Exercises</Text>
//                 <Text className="text-gray-500 text-center text-sm leading-5 mb-8">
//                     Log the weight loaded on the machine. If the loaded weight is total 90 lb, log 90.
//                 </Text>

//                 {/* Mock Weight Picker Visual */}
//                 <View className="w-64 h-64 bg-[#2C2C2E] rounded-3xl overflow-hidden relative items-center justify-center shadow-lg">

//                     {/* Background Gradients to simulate the rounded picker depth */}
//                     <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} className="absolute top-0 w-full h-1/3 z-10" />
//                     <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className="absolute bottom-0 w-full h-1/3 z-10" />

//                     {/* Horizontal separator lines */}
//                     <View className="absolute top-[35%] w-full h-[1px] bg-gray-600" />
//                     <View className="absolute top-[65%] w-full h-[1px] bg-gray-600" />

//                     {/* Number List Mock */}
//                     <View className="gap-4 items-center">
//                         <Text className="text-gray-500 font-bold text-lg">70</Text>
//                         <Text className="text-gray-400 font-bold text-xl">80</Text>

//                         {/* Selected Item */}
//                         <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center border border-white/30 my-2 shadow-xl shadow-black">
//                             <Text className="text-white font-bold text-4xl">90</Text>
//                         </View>

//                         <Text className="text-gray-400 font-bold text-xl">100</Text>
//                         <Text className="text-gray-500 font-bold text-lg">110</Text>
//                     </View>

//                     {/* Fake Pin visual */}
//                     <View className="absolute left-6 top-1/2 -mt-2 w-8 h-4 bg-black rounded-full border border-gray-600" />
//                 </View>

//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });


import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';

export const HowToLogSheet = forwardRef((props, ref) => {
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />, []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['55%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#2D3748', width: 48, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-6 pt-4">
                <Text className="text-2xl font-bold text-white mb-2">Logging Machine Exercises</Text>
                <Text className="text-slate-400 text-sm font-medium leading-5 mb-8">
                    Log the weight loaded on the machine. If the loaded weight is total 90 lb, log 90.
                </Text>

                {/* Technical / Medical Monitor Data Visual */}
                <View className="w-full h-64 bg-[#151E33] border border-[#1E293B] rounded-3xl overflow-hidden relative items-center justify-center">

                    {/* Segmented hard lines instead of gradients */}
                    <View className="absolute top-[35%] w-full h-[1px] bg-[#2D3748]" />
                    <View className="absolute top-[65%] w-full h-[1px] bg-[#2D3748]" />

                    {/* Dotted grid lines vertically */}
                    <View className="absolute left-[25%] h-full w-[1px] border-l border-dashed border-[#1E293B]" />
                    <View className="absolute right-[25%] h-full w-[1px] border-l border-dashed border-[#1E293B]" />

                    {/* Number List Mock */}
                    <View className="gap-5 items-center">
                        <Text className="text-slate-600 font-medium text-lg">70</Text>
                        <Text className="text-slate-500 font-semibold text-xl">80</Text>

                        {/* Selected Item */}
                        <View className="w-24 h-24 bg-[#1E293B] rounded-2xl border border-[#4DB9F2] items-center justify-center my-1">
                            <Text className="text-[#4DB9F2] font-bold text-5xl">90</Text>
                        </View>

                        <Text className="text-slate-500 font-semibold text-xl">100</Text>
                        <Text className="text-slate-600 font-medium text-lg">110</Text>
                    </View>

                    {/* Fake Pin visual */}
                    <View className="absolute left-6 top-1/2 -mt-3 w-8 h-6 bg-[#4DB9F2]/20 rounded-lg border border-[#4DB9F2] items-center justify-center">
                        <View className="w-2 h-2 bg-[#4DB9F2] rounded-sm" />
                    </View>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});