// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { Exercise } from './ReorderSheet';

// export type CustomExercise = { id: string; name: string; equipment: string; type: string; icon: string };

// interface CustomExerciseSheetProps {
//     onSave: (exercise: CustomExercise) => void;
//     initialData?: CustomExercise | null; // Used for Edit mode
//     copiedData?: Exercise | null; // Used for "Select optional" copy mode
//     onDelete?: (id: string) => void;
//     onOpenCopier?: () => void;
// }

// const EQUIPMENTS = [
//     'Band', 'Barbell', 'Bodyweight', 'Cable (Single)', 'Cable (Double)',
//     'Dumbbell (Single)', 'Dumbbell (Double)', 'EZ Bar', 'Kettlebell (Single)',
//     'Kettlebell (Double)', 'Landmine'
// ];

// interface EquipmentSheetProps {
//     selected: string;
//     onSelect: (eq: string) => void;
// }

// const EquipmentSelectSheet = forwardRef<BottomSheetModal, EquipmentSheetProps>(({ selected, onSelect }, ref) => {
//     const [tempSelected, setTempSelected] = useState(selected);

//     React.useEffect(() => { setTempSelected(selected); }, [selected]);

//     const handleSave = () => {
//         onSelect(tempSelected);
//         (ref as any).current?.dismiss();
//     };

//     const renderBackdrop = useCallback(
//         (props: any) => <BottomSheetBackdrop
//             {...props}
//             disappearsOnIndex={-1}
//             appearsOnIndex={0}
//             pressBehavior="close"
//             opacity={0.4} />, []
//     );

//     return (
//         <BottomSheetModal
//             ref={ref}
//             snapPoints={['100%']}
//             backdropComponent={renderBackdrop}
//             handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
//             stackBehavior="push"
//             enableDynamicSizing={false}
//         >
//             <View className="flex-1 bg-white">
//                 <Text className="text-center font-bold text-gray-900 text-[13px] py-4">Select equipment</Text>

//                 <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 10 }}>
//                     {EQUIPMENTS.map(eq => (
//                         <TouchableOpacity
//                             key={eq}
//                             onPress={() => setTempSelected(eq)}
//                             className={`flex-row justify-between items-center p-4 rounded-2xl border ${tempSelected === eq ? 'border-black bg-white' : 'border-gray-100 bg-white'}`}
//                         >
//                             <Text className="font-bold text-gray-900">{eq}</Text>
//                             {tempSelected === eq && <Ionicons name="checkmark" size={20} color="black" />}
//                         </TouchableOpacity>
//                     ))}
//                 </BottomSheetScrollView>

//                 <View className="absolute bottom-0 w-full bg-white px-5 pt-4 pb-8 border-t border-gray-100">
//                     <TouchableOpacity
//                         onPress={handleSave}
//                         disabled={!tempSelected}
//                         className={`py-4 rounded-full items-center ${tempSelected ? 'bg-[#1A1A1A]' : 'bg-gray-400'}`}
//                     >
//                         <Text className="text-white font-bold text-base">Save</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </BottomSheetModal>
//     );
// });

// // --- Main Sheet: Add/Edit Custom Exercise ---
// export const CustomExerciseSheet = forwardRef<BottomSheetModal, CustomExerciseSheetProps>(({
//     onSave, initialData, copiedData, onDelete, onOpenCopier
// }, ref) => {
//     const equipRef = useRef<BottomSheetModal>(null);

//     const [isEditingName, setIsEditingName] = useState(false);
//     const [name, setName] = useState('New exercise');
//     const [equipment, setEquipment] = useState('');
//     const [exerciseType, setExerciseType] = useState<'Rep-based' | 'Duration'>('Rep-based');
//     const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
//     const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);

//     const isEditMode = !!initialData;
//     const activeId = initialData?.id || 'custom_' + Date.now();
//     const isReadyToSave = name !== 'New exercise' && name.trim().length > 0 && equipment !== '';

//     // Re-hydrate state when initialData or copiedData changes
//     useEffect(() => {
//         if (initialData) {
//             setName(initialData.name);
//             setEquipment(initialData.equipment);
//             // Mock hydration for muscles based on design specs
//             setPrimaryMuscles(['Biceps']);
//             setSecondaryMuscles(['Forearm']);
//         } else if (copiedData) {
//             setName(copiedData.name);
//             setEquipment(copiedData.type);
//         } else {
//             // Reset state for a fresh new custom exercise
//             setName('New exercise');
//             setEquipment('');
//             setPrimaryMuscles([]);
//             setSecondaryMuscles([]);
//         }
//     }, [initialData, copiedData]);

//     const handleSave = () => {
//         onSave({ id: activeId, name, equipment, type: 'Custom', icon: '🏋️' });
//         (ref as any).current?.dismiss();
//     };

//     const handleDelete = () => {
//         Alert.alert(
//             "Delete this exercise?",
//             "All recorded data from this exercise will be saved.",
//             [
//                 { text: "Cancel", style: "cancel" },
//                 {
//                     text: "Confirm",
//                     style: "destructive",
//                     onPress: () => {
//                         if (onDelete && initialData) onDelete(initialData.id);
//                         (ref as any).current?.dismiss();
//                     }
//                 }
//             ]
//         );
//     };

//     const mockAddMuscle = (type: 'primary' | 'secondary') => {
//         if (type === 'primary') setPrimaryMuscles(['Shoulder']);
//         if (type === 'secondary') setSecondaryMuscles(['Triceps']);
//     };

//     return (
//         <>
//             <BottomSheetModal
//                 ref={ref}
//                 snapPoints={['100%']}
//                 backdropComponent={p => <BottomSheetBackdrop {...p} opacity={0.4} />}
//                 handleIndicatorStyle={{ display: 'none' }}
//                 enableDynamicSizing={false}
//             >
//                 <View className="flex-1 bg-white rounded-t-3xl pt-2">

//                     {/* Header */}
//                     <View className="flex-row justify-between items-center px-5 mb-6 pt-2">
//                         <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
//                             <Ionicons name="close" size={24} color="#111827" />
//                         </TouchableOpacity>
//                         <Text className="font-bold text-gray-500 text-[13px]">
//                             {isEditMode ? 'Edit custom exercise' : 'Add custom exercise'}
//                         </Text>
//                         <View className="w-6" />
//                     </View>

//                     <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

//                         {/* Name Editor */}
//                         <View className="flex-row items-center justify-between mb-8 border-b border-gray-100 pb-4">
//                             {isEditingName ? (
//                                 <TextInput
//                                     value={name}
//                                     onChangeText={setName}
//                                     autoFocus
//                                     onBlur={() => setIsEditingName(false)}
//                                     className="text-2xl font-bold text-gray-900 flex-1 p-0 m-0"
//                                 />
//                             ) : (
//                                 <Text className="text-2xl font-bold text-gray-900 flex-1">{name}</Text>
//                             )}
//                             <TouchableOpacity onPress={() => setIsEditingName(true)} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center ml-4">
//                                 <Ionicons name="pencil" size={14} color="#6B7280" />
//                             </TouchableOpacity>
//                         </View>

//                         {/* Fill Out Details Section */}
//                         <Text className="font-bold text-gray-900 text-[15px] mb-2">Fill Out Exercise Details</Text>
//                         <Text className="text-gray-400 text-[13px] leading-5 mb-4">
//                             Copy over an existing exercise or manually add the details for your custom exercise.
//                         </Text>

//                         {/* Copy Source Button or Copied Preview Block */}
//                         {copiedData ? (
//                             <View className="border border-gray-200 rounded-2xl px-4 py-3 flex-row justify-between items-center mb-8 shadow-sm bg-white">
//                                 <View className="flex-row items-center gap-3">
//                                     <View className="w-10 h-10 bg-gray-50 rounded items-center justify-center border border-gray-100">
//                                         <Text>{copiedData.icon}</Text>
//                                     </View>
//                                     <View>
//                                         <Text className="font-bold text-gray-900">{copiedData.name}</Text>
//                                         <Text className="text-gray-400 text-xs">{copiedData.type}</Text>
//                                     </View>
//                                 </View>
//                                 <View className="flex-row gap-2">
//                                     <TouchableOpacity onPress={onOpenCopier} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
//                                         <Ionicons name="swap-horizontal" size={14} color="#4B5563" />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity onPress={() => {/* logic to clear copy state in parent */ }} className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
//                                         <Ionicons name="close" size={14} color="#4B5563" />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         ) : (
//                             <TouchableOpacity
//                                 onPress={onOpenCopier}
//                                 className="border border-dashed border-gray-300 bg-gray-50/50 rounded-xl px-4 py-4 flex-row justify-between items-center mb-8"
//                             >
//                                 <Text className="text-gray-400 font-medium text-[15px]">Select optional</Text>
//                                 <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//                             </TouchableOpacity>
//                         )}

//                         {/* Equipment */}
//                         <Text className="font-bold text-gray-900 text-[15px] mb-3">Equipment</Text>
//                         <TouchableOpacity
//                             onPress={() => equipRef.current?.present()}
//                             className="border border-gray-200 rounded-xl px-4 py-4 flex-row justify-between items-center mb-8 bg-white shadow-sm"
//                         >
//                             <Text className={`font-semibold text-[15px] ${equipment ? 'text-gray-900' : 'text-gray-400'}`}>
//                                 {equipment || 'Select'}
//                             </Text>
//                             <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
//                         </TouchableOpacity>

//                         {/* Exercise Type */}
//                         <View className="flex-row items-center justify-between mb-8">
//                             <Text className="font-bold text-gray-900 text-[15px]">Exercise Type</Text>
//                             <View className="flex-row bg-gray-100 rounded-full p-1">
//                                 <TouchableOpacity
//                                     onPress={() => setExerciseType('Rep-based')}
//                                     className={`px-4 py-1.5 rounded-full ${exerciseType === 'Rep-based' ? 'bg-white  ' : ''}`}
//                                 >
//                                     <Text className={` text-[11px] ${exerciseType === 'Rep-based' ? 'text-gray-900' : 'text-gray-400'}`}>Rep-based</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => setExerciseType('Duration')}
//                                     className={`px-4 py-1.5 rounded-full ${exerciseType === 'Duration' ? 'bg-white ' : ''}`}
//                                 >
//                                     <Text className={` text-[11px] ${exerciseType === 'Duration' ? 'text-gray-900' : 'text-gray-400'}`}>Duration</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         {/* Primary Muscles */}
//                         <View className="flex-row items-center justify-between mb-3">
//                             <Text className="font-bold text-gray-900 text-[15px]">Primary Muscles</Text>
//                             <TouchableOpacity onPress={() => mockAddMuscle('primary')} className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
//                                 <Ionicons name="add" size={16} color="#6B7280" />
//                             </TouchableOpacity>
//                         </View>
//                         {primaryMuscles.length > 0 && (
//                             <View className="flex-row flex-wrap gap-2 mb-6">
//                                 {primaryMuscles.map(m => (
//                                     <TouchableOpacity key={m} onPress={() => setPrimaryMuscles([])} className="flex-row items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 gap-2">
//                                         <Text className="font-semibold text-gray-700 text-[13px]">{m}</Text>
//                                         <Ionicons name="close" size={14} color="#9CA3AF" />
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                         )}
//                         {primaryMuscles.length === 0 && <View className="mb-8" />}

//                         {/* Secondary Muscles */}
//                         <View className="flex-row items-center justify-between mb-3">
//                             <Text className="font-bold text-gray-900 text-[15px]">Secondary Muscles (optional)</Text>
//                             <TouchableOpacity onPress={() => mockAddMuscle('secondary')} className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
//                                 <Ionicons name="add" size={16} color="#6B7280" />
//                             </TouchableOpacity>
//                         </View>
//                         {secondaryMuscles.length > 0 && (
//                             <View className="flex-row flex-wrap gap-2 mb-6">
//                                 {secondaryMuscles.map(m => (
//                                     <TouchableOpacity key={m} onPress={() => setSecondaryMuscles([])} className="flex-row items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 gap-2">
//                                         <Text className="font-semibold text-gray-700 text-[13px]">{m}</Text>
//                                         <Ionicons name="close" size={14} color="#9CA3AF" />
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                         )}



//                     </ScrollView>

//                     {/* Fixed Save Button */}

//                     <View className="absolute bottom-0 w-full bg-white px-5 pt-4 pb-8 border-t border-white">
//                         {/* Delete Button (Only in Edit Mode) */}
//                         {isEditMode && (
//                             <TouchableOpacity onPress={handleDelete} className="bg-red-50 py-4 rounded-full items-center mb-4 mt-4">
//                                 <Text className="text-red-500 font-bold text-base">Delete exercise</Text>
//                             </TouchableOpacity>
//                         )}
//                         <TouchableOpacity
//                             onPress={handleSave}
//                             disabled={!isReadyToSave}
//                             className={`py-4 rounded-full items-center shadow-lg ${isReadyToSave ? 'bg-[#1A1A1A]' : 'bg-gray-400'}`}
//                         >
//                             <Text className="text-white font-bold text-base">{isEditMode ? 'Save changes' : 'Save'}</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </BottomSheetModal>

//             <EquipmentSelectSheet ref={equipRef} selected={equipment} onSelect={setEquipment} />
//         </>
//     );
// });



import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type CustomExercise = { id: string; name: string; equipment: string; type: string; icon: string };

interface CustomExerciseSheetProps {
    onSave: (exercise: CustomExercise) => void;
    initialData?: CustomExercise | null;
    copiedData?: any | null;
    onDelete?: (id: string) => void;
    onOpenCopier?: () => void;
}

const EQUIPMENTS = [
    'Band', 'Barbell', 'Bodyweight', 'Cable (Single)', 'Cable (Double)', 'Dumbbell (Single)',
    'Dumbbell (Double)', 'EZ Bar', 'Kettlebell (Single)', 'Kettlebell (Double)', 'Landmine'
];

interface EquipmentSheetProps {
    selected: string;
    onSelect: (eq: string) => void;
}

const EquipmentSelectSheet = forwardRef<BottomSheetModal, EquipmentSheetProps>(({ selected, onSelect }, ref) => {
    const [tempSelected, setTempSelected] = useState(selected);

    React.useEffect(() => { setTempSelected(selected); }, [selected]);

    const handleSave = () => {
        onSelect(tempSelected);
        (ref as any).current?.dismiss();
    };

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" opacity={0.6} />, []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['100%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#2D3748', width: 48, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            stackBehavior="push"
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-[#090D16]">
                <View className="px-5 pt-4 pb-6">
                    <Text className="text-white font-bold text-2xl">Select equipment</Text>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 12 }}>
                    {EQUIPMENTS.map(eq => (
                        <TouchableOpacity
                            key={eq}
                            onPress={() => setTempSelected(eq)}
                            className={`flex-row justify-between items-center p-4 rounded-2xl border ${tempSelected === eq ? 'border-[#4DB9F2] bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'}`}
                        >
                            <Text className={`font-semibold text-base ${tempSelected === eq ? 'text-[#4DB9F2]' : 'text-slate-300'}`}>{eq}</Text>
                            {tempSelected === eq && (
                                <View className="w-6 h-6 rounded-lg items-center justify-center bg-[#4DB9F2] border border-[#4DB9F2]">
                                    <Ionicons name="checkmark" size={16} color="#090D16" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView>

                <View className="absolute bottom-0 w-full bg-[#090D16] px-5 pt-4 pb-8 border-t border-[#1E293B]">
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={!tempSelected}
                        className={`py-4 rounded-xl items-center border ${tempSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'}`}
                    >
                        <Text className={`font-bold text-base ${tempSelected ? 'text-[#090D16]' : 'text-slate-500'}`}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});

export const CustomExerciseSheet = forwardRef<BottomSheetModal, CustomExerciseSheetProps>(({ onSave, initialData, copiedData, onDelete, onOpenCopier }, ref) => {
    const equipRef = useRef(null);

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState('New exercise');
    const [equipment, setEquipment] = useState('');
    const [exerciseType, setExerciseType] = useState<'Rep-based' | 'Duration'>('Rep-based');
    const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
    const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);

    const isEditMode = !!initialData;
    const activeId = initialData?.id || 'custom_' + Date.now();
    const isReadyToSave = name !== 'New exercise' && name.trim().length > 0 && equipment !== '';

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEquipment(initialData.equipment);
            setPrimaryMuscles(['Biceps']);
            setSecondaryMuscles(['Forearm']);
        } else if (copiedData) {
            setName(copiedData.name);
            setEquipment(copiedData.type);
        } else {
            setName('New exercise');
            setEquipment('');
            setPrimaryMuscles([]);
            setSecondaryMuscles([]);
        }
    }, [initialData, copiedData]);

    const handleSave = () => {
        onSave({ id: activeId, name, equipment, type: 'Custom', icon: '🏋️' });
        (ref as any).current?.dismiss();
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete this exercise?",
            "All recorded data from this exercise will be saved.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    style: "destructive",
                    onPress: () => {
                        if (onDelete && initialData) onDelete(initialData.id);
                        (ref as any).current?.dismiss();
                    }
                }
            ]
        );
    };

    const mockAddMuscle = (type: 'primary' | 'secondary') => {
        if (type === 'primary') setPrimaryMuscles(['Shoulder']);
        if (type === 'secondary') setSecondaryMuscles(['Triceps']);
    };

    return (
        <>
            <BottomSheetModal
                ref={ref}
                snapPoints={['100%']}
                backdropComponent={p => <BottomSheetBackdrop {...p} opacity={0.6} />}
                handleIndicatorStyle={{ display: 'none' }}
                backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
                enableDynamicSizing={false}
            >
                <View className="flex-1 bg-[#090D16] pt-4">

                    {/* Header */}
                    <View className="flex-row items-start justify-between px-5 mb-6">
                        <View className="flex-1 mr-4">
                            <Text className="font-bold text-white text-2xl">
                                {isEditMode ? 'Edit custom exercise' : 'Add custom exercise'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 border border-[#2D3748] bg-[#151E33] rounded-xl items-center justify-center">
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}>

                        {/* Name Editor Container */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row justify-between items-center mb-8">
                            {isEditingName ? (
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    autoFocus
                                    onBlur={() => setIsEditingName(false)}
                                    className="text-white font-bold text-xl flex-1 p-0 m-0"
                                    placeholderTextColor="#475569"
                                />
                            ) : (
                                <Text className="text-white font-bold text-xl flex-1">{name}</Text>
                            )}
                            <TouchableOpacity onPress={() => setIsEditingName(true)} className="w-10 h-10 border border-[#2D3748] bg-[#1E293B] rounded-xl items-center justify-center ml-4">
                                <Ionicons name="pencil" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>

                        {/* Fill Out Details Section */}
                        <View className="mb-6">
                            <Text className="font-bold text-white text-lg mb-1">Fill Out Exercise Details</Text>
                            <Text className="text-slate-400 text-sm font-medium leading-5">
                                Copy over an existing exercise or manually add the details for your custom exercise.
                            </Text>
                        </View>

                        {/* Copy Source Block */}
                        {copiedData ? (
                            <View className="bg-[#151E33] border border-[#4DB9F2]/30 rounded-2xl p-4 flex-row justify-between items-center mb-8">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl border border-[#2D3748] items-center justify-center">
                                        <Text className="text-xl">{copiedData.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-white text-base">{copiedData.name}</Text>
                                        <Text className="text-slate-400 text-sm font-medium">{copiedData.type}</Text>
                                    </View>
                                </View>
                                <View className="flex-row gap-2">
                                    <TouchableOpacity onPress={onOpenCopier} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Ionicons name="swap-horizontal" size={16} color="#94A3B8" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {/* logic to clear copy state in parent */ }} className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center">
                                        <Ionicons name="close" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={onOpenCopier}
                                className="bg-[#151E33]/50 border border-dashed border-[#2D3748] rounded-2xl p-5 flex-row justify-between items-center mb-8"
                            >
                                <Text className="text-slate-300 font-medium text-base">Select optional</Text>
                                <View className="w-8 h-8 rounded-lg bg-[#1E293B] items-center justify-center border border-[#2D3748]">
                                    <Ionicons name="chevron-forward" size={16} color="#4DB9F2" />
                                </View>
                            </TouchableOpacity>
                        )}

                        {/* Equipment Section */}
                        <Text className="font-semibold text-slate-100 text-sm mb-3">Equipment</Text>
                        <TouchableOpacity
                            onPress={() => equipRef.current?.present()}
                            className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row justify-between items-center mb-8"
                        >
                            <Text className={`font-medium text-base ${equipment ? 'text-white' : 'text-slate-500'}`}>
                                {equipment || 'Select'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#4DB9F2" />
                        </TouchableOpacity>

                        {/* Exercise Type Section */}
                        <Text className="font-semibold text-slate-100 text-sm mb-3">Exercise Type</Text>
                        <View className="flex-row gap-3 mb-8">
                            <TouchableOpacity
                                onPress={() => setExerciseType('Rep-based')}
                                className={`flex-1 py-3 rounded-xl border items-center ${exerciseType === 'Rep-based' ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'}`}
                            >
                                <Text className={`font-semibold text-sm ${exerciseType === 'Rep-based' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Rep-based</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setExerciseType('Duration')}
                                className={`flex-1 py-3 rounded-xl border items-center ${exerciseType === 'Duration' ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]' : 'bg-[#151E33] border-[#1E293B]'}`}
                            >
                                <Text className={`font-semibold text-sm ${exerciseType === 'Duration' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Duration</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Primary Muscles */}
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="font-semibold text-slate-100 text-sm">Primary Muscles</Text>
                            <TouchableOpacity onPress={() => mockAddMuscle('primary')} className="w-8 h-8 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center">
                                <Ionicons name="add" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                        {primaryMuscles.length > 0 && (
                            <View className="flex-row flex-wrap gap-3 mb-6">
                                {primaryMuscles.map(m => (
                                    <TouchableOpacity key={m} onPress={() => setPrimaryMuscles([])} className="flex-row items-center bg-[#1E293B] border border-[#2D3748] rounded-xl px-4 py-2 gap-2">
                                        <Text className="font-medium text-slate-200 text-sm">{m}</Text>
                                        <View className="w-5 h-5 rounded-md bg-[#090D16] border border-[#EF4444]/30 items-center justify-center">
                                            <Ionicons name="close" size={12} color="#EF4444" />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        {primaryMuscles.length === 0 && <View className="mb-8 h-px bg-transparent" />}

                        {/* Secondary Muscles */}
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="font-semibold text-slate-100 text-sm">Secondary Muscles (optional)</Text>
                            <TouchableOpacity onPress={() => mockAddMuscle('secondary')} className="w-8 h-8 bg-[#151E33] border border-[#2D3748] rounded-xl items-center justify-center">
                                <Ionicons name="add" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>
                        {secondaryMuscles.length > 0 && (
                            <View className="flex-row flex-wrap gap-3 mb-6">
                                {secondaryMuscles.map(m => (
                                    <TouchableOpacity key={m} onPress={() => setSecondaryMuscles([])} className="flex-row items-center bg-[#1E293B] border border-[#2D3748] rounded-xl px-4 py-2 gap-2">
                                        <Text className="font-medium text-slate-200 text-sm">{m}</Text>
                                        <View className="w-5 h-5 rounded-md bg-[#090D16] border border-[#EF4444]/30 items-center justify-center">
                                            <Ionicons name="close" size={12} color="#EF4444" />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </ScrollView>

                    {/* Fixed Actions Area */}
                    <View className="absolute bottom-0 w-full bg-[#090D16] px-5 pt-4 pb-8 border-t border-[#1E293B]">
                        {isEditMode && (
                            <TouchableOpacity onPress={handleDelete} className="bg-[#EF4444]/10 border border-[#EF4444]/30 py-4 rounded-xl items-center mb-3">
                                <Text className="text-[#EF4444] font-bold text-base">Delete exercise</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={!isReadyToSave}
                            className={`py-4 rounded-xl items-center border ${isReadyToSave ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'}`}
                        >
                            <Text className={`font-bold text-base ${isReadyToSave ? 'text-[#090D16]' : 'text-slate-500'}`}>
                                {isEditMode ? 'Save changes' : 'Save'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>

            <EquipmentSelectSheet ref={equipRef} selected={equipment} onSelect={setEquipment} />
        </>
    );
});