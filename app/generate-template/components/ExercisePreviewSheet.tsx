// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { CustomExercise } from './CustomExerciseSheet';

// interface ExercisePreviewProps {
//     exercise: CustomExercise | null;
//     onEdit: () => void;
// }

// export const ExercisePreviewSheet = forwardRef<BottomSheetModal, ExercisePreviewProps>(({ exercise, onEdit }, ref) => {
//     const renderBackdrop = useCallback(
//         (props: any) => (
//             <BottomSheetBackdrop
//                 {...props}
//                 opacity={0.4}
//                 disappearsOnIndex={-1}
//                 appearsOnIndex={0}
//                 // pressBehavior="none" keeps the sheet below (AddExerciseSheet) open
//                 pressBehavior="close"
//             />
//         ),
//         []
//     );

//     return (
//         <BottomSheetModal
//             ref={ref}
//             snapPoints={['55%']}
//             backdropComponent={renderBackdrop}
//             handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
//             enableDynamicSizing={false}
//             stackBehavior="push"
//         >
//             <BottomSheetView className="flex-1 px-5 pt-2">
//                 {exercise ? (
//                     <>
//                         {/* Header: Title & Edit Button */}
//                         <View className="flex-row justify-between items-start mb-6 border-b border-gray-100 pb-6">
//                             <View>
//                                 <Text className="text-xl font-bold text-gray-900 mb-1">{exercise.name}</Text>
//                                 <Text className="text-gray-500 font-medium">{exercise.equipment}</Text>
//                             </View>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     (ref as any).current?.dismiss();
//                                     onEdit();
//                                 }}
//                                 className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
//                             >
//                                 <Ionicons name="pencil" size={14} color="#4B5563" />
//                             </TouchableOpacity>
//                         </View>

//                         {/* Details */}
//                         <View className="flex-1 gap-6">
//                             <View>
//                                 <Text className="text-gray-400 font-bold text-xs mb-2">Equipment</Text>
//                                 <View className="flex-row items-center gap-2">
//                                     <View className="bg-orange-100 rounded p-1">
//                                         <Ionicons name="barbell" size={14} color="#EA580C" />
//                                     </View>
//                                     <Text className="font-bold text-gray-900 text-base">{exercise.equipment}</Text>
//                                 </View>
//                             </View>

//                             <View>
//                                 <Text className="text-gray-400 font-bold text-xs mb-2">Primary muscles</Text>
//                                 <View className="bg-[#1A1A1A] self-start px-3 py-1.5 rounded-lg">
//                                     <Text className="text-white font-bold text-sm">Biceps</Text>
//                                 </View>
//                             </View>

//                             <View>
//                                 <Text className="text-gray-400 font-bold text-xs mb-2">Secondary muscles</Text>
//                                 <View className="border border-gray-200 self-start px-3 py-1.5 rounded-lg">
//                                     <Text className="text-gray-800 font-bold text-sm">Forearm</Text>
//                                 </View>
//                             </View>
//                         </View>

//                         {/* Footer Action */}
//                         <View className="pb-10 pt-4">
//                             <TouchableOpacity className="border border-gray-200 py-4 rounded-xl flex-row justify-center items-center gap-2 bg-white shadow-sm">
//                                 <Ionicons name="bulb-outline" size={18} color="#4B5563" />
//                                 <Text className="font-bold text-gray-700">How to log</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </>
//                 ) : (
//                     // Empty placeholder while no exercise is selected
//                     <View className="flex-1 items-center justify-center">
//                         <Text className="text-gray-300">No exercise selected</Text>
//                     </View>
//                 )}
//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });



import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomExercise } from './CustomExerciseSheet';

interface ExercisePreviewProps {
    exercise: CustomExercise | null;
    onEdit: () => void;
}

export const ExercisePreviewSheet = forwardRef<BottomSheetModal, ExercisePreviewProps>(({ exercise, onEdit }, ref) => {
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.6}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['55%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#2D3748', width: 48, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
            stackBehavior="push"
        >
            <BottomSheetView className="flex-1 px-5 pt-4">
                {exercise ? (
                    <>
                        {/* Header: Title & Edit Button */}
                        <View className="flex-row justify-between items-start mb-6">
                            <View className="flex-1 mr-4">
                                <Text className="text-2xl font-bold text-white mb-2">{exercise.name}</Text>
                                <Text className="text-slate-400 font-medium text-base">{exercise.equipment}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    (ref as any).current?.dismiss();
                                    onEdit();
                                }}
                                className="w-10 h-10 border border-[#2D3748] bg-[#151E33] rounded-xl items-center justify-center"
                            >
                                <Ionicons name="pencil" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>

                        {/* Details */}
                        <View className="flex-1 gap-4">

                            {/* Equipment Card */}
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row items-center justify-between">
                                <Text className="text-slate-400 font-medium text-sm">Equipment</Text>
                                <View className="flex-row items-center gap-3">
                                    <View className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 items-center justify-center">
                                        <Ionicons name="barbell" size={16} color="#F59E0B" />
                                    </View>
                                    <Text className="font-semibold text-white text-base">{exercise.equipment}</Text>
                                </View>
                            </View>

                            {/* Muscles Card */}
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 gap-6">
                                <View>
                                    <Text className="text-slate-400 font-medium text-sm mb-3">Primary muscles</Text>
                                    <View className="self-start px-4 py-2 rounded-xl bg-[#4DB9F2]/10 border border-[#4DB9F2]/30">
                                        <Text className="text-[#4DB9F2] font-semibold text-sm">Biceps</Text>
                                    </View>
                                </View>

                                <View className="w-full h-[1px] bg-[#1E293B]" />

                                <View>
                                    <Text className="text-slate-400 font-medium text-sm mb-3">Secondary muscles</Text>
                                    <View className="self-start px-4 py-2 rounded-xl bg-[#1E293B] border border-[#2D3748]">
                                        <Text className="text-slate-300 font-medium text-sm">Forearm</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Footer Action */}
                        <View className="pb-8 pt-4">
                            <TouchableOpacity className="bg-[#151E33] border border-[#1E293B] py-4 rounded-xl flex-row justify-center items-center gap-3">
                                <View className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#2D3748] items-center justify-center">
                                    <Ionicons name="bulb-outline" size={16} color="#4DB9F2" />
                                </View>
                                <Text className="font-semibold text-white text-base">How to log</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    // Empty placeholder while no exercise is selected
                    <View className="flex-1 items-center justify-center pb-20">
                        <Ionicons name="alert-circle-outline" size={48} color="#1E293B" className="mb-4" />
                        <Text className="text-slate-500 font-medium text-base">No exercise selected</Text>
                    </View>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});