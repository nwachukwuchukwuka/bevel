// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useRef, useState } from 'react';
// import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const IconSelectorSheet = forwardRef<BottomSheetModal, { onSelect: (icon: string) => void }>((props, ref) => {
//     const categories = ['All', 'Baked Goods', 'Condiments', 'Cultural', 'Dairy'];
//     const emojis = ['🍅', '🌶️', '🥗', '🍲', '🥫', '🍯', '🧄', '🧈', '🥞', '🧀'];

//     return (
//         <BottomSheetModal ref={ref} snapPoints={['70%']} backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />} enableDynamicSizing={false} stackBehavior='push'>
//             <BottomSheetView className="flex-1 pt-2">
//                 {/* Search */}
//                 <View className="mx-5 mb-4 bg-gray-50 rounded-xl flex-row items-center px-4 py-2">
//                     <Ionicons name="search" size={18} color="#9CA3AF" />
//                     <TextInput placeholder="Search for icon" className="flex-1 ml-2 font-medium" />
//                 </View>
//                 {/* Categories */}
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-100 px-5 mb-4" contentContainerStyle={{ gap: 20 }}>
//                     {categories.map(c => <Text key={c} className={`font-bold pb-2 ${c === 'Condiments' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>{c}</Text>)}
//                 </ScrollView>
//                 {/* Grid */}
//                 <BottomSheetScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 16 }}>
//                     {emojis.map((e, i) => (
//                         <TouchableOpacity key={i} onPress={() => { props.onSelect(e); (ref as any).current?.dismiss(); }} className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
//                             <Text className="text-xl">{e}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </BottomSheetScrollView>
//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });

// const AddNutrientSheet = forwardRef<BottomSheetModal, { onDone: (selected: string[]) => void }>((props, ref) => {
//     const [selected, setSelected] = useState<string[]>([]);
//     const minerals = ['Chloride', 'Chromium', 'Copper', 'Iodine', 'Magnesium'];

//     const toggle = (m: string) => setSelected(p => p.includes(m) ? p.filter(i => i !== m) : [...p, m]);

//     return (
//         <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />} stackBehavior='push' enableDynamicSizing={false}>
//             <BottomSheetView className="flex-1 px-5 pt-2">
//                 <View className="flex-row justify-between items-center mb-6">
//                     <View className="w-10" />
//                     <Text className="font-bold text-gray-900 text-base">Nutrients</Text>
//                     <TouchableOpacity onPress={() => { props.onDone(selected); (ref as any).current?.dismiss(); }}>
//                         <Text className="font-bold text-gray-900 text-base">Done</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <Text className="font-bold text-gray-400 text-xs uppercase mb-4">Minerals</Text>

//                 <BottomSheetScrollView contentContainerStyle={{ gap: 20, paddingBottom: 40 }}>
//                     {minerals.map(m => {
//                         const isSel = selected.includes(m);
//                         return (
//                             <TouchableOpacity key={m} onPress={() => toggle(m)} className="flex-row justify-between items-center border-b border-gray-50 pb-4">
//                                 <Text className="font-bold text-gray-900">{m}</Text>
//                                 <View className={`w-6 h-6 rounded-full items-center justify-center border ${isSel ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'}`}>
//                                     <Ionicons name={isSel ? "checkmark" : "add"} size={14} color={isSel ? "white" : "#9CA3AF"} />
//                                 </View>
//                             </TouchableOpacity>
//                         )
//                     })}
//                 </BottomSheetScrollView>
//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });

// export const EditFoodSheet = forwardRef<BottomSheetModal>((props, ref) => {
//     const iconSheetRef = useRef<BottomSheetModal>(null);
//     const nutrientSheetRef = useRef<BottomSheetModal>(null);

//     const [icon, setIcon] = useState('🌶️');
//     const [nutrients, setNutrients] = useState<{ name: string, value: string, unit: string }[]>([
//         { name: 'Energy', value: '251', unit: 'kCal' },
//         { name: 'Fat', value: '3,3', unit: 'g' },
//         { name: 'Carbs', value: '64', unit: 'g' }
//     ]);

//     const handleAddNutrients = (selected: string[]) => {
//         const newFields = selected.map(n => ({ name: n, value: '', unit: 'mg' }));
//         setNutrients(prev => [...prev, ...newFields]);
//     };

//     const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

//     return (
//         <>
//             <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }} stackBehavior='push' enableDynamicSizing={false}>
//                 <View className="flex-1">
//                     {/* Header */}
//                     <View className="flex-row items-center justify-between px-5 py-4">
//                         <TouchableOpacity className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
//                             <Ionicons name="trash-outline" size={18} color="#F87171" />
//                         </TouchableOpacity>
//                         <Text className="font-bold text-gray-900 text-base">Edit food</Text>
//                         <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-200">
//                             <Ionicons name="scan-outline" size={18} color="#4B5563" />
//                         </TouchableOpacity>
//                     </View>

//                     <BottomSheetScrollView
//                         style={{ flex: 1 }}
//                         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
//                         keyboardShouldPersistTaps="handled"
//                     >

//                         {/* Icon & Name Editor */}
//                         <View className="items-center mb-8">
//                             <TouchableOpacity onPress={() => iconSheetRef.current?.present()} className="relative mb-4">
//                                 <View className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 items-center justify-center">
//                                     <Text className="text-4xl">{icon}</Text>
//                                 </View>
//                                 <View className="absolute bottom-0 right-0 bg-gray-200 w-6 h-6 rounded-full items-center justify-center border border-white">
//                                     <Ionicons name="pencil" size={12} color="#4B5563" />
//                                 </View>
//                             </TouchableOpacity>
//                             <Text className="text-xl font-bold text-gray-900">Ground Black Pepper</Text>
//                             <Text className="text-gray-400 text-sm mt-1">Edit Name</Text>
//                         </View>

//                         {/* Serving Inputs */}
//                         <View className="flex-row gap-4 mb-6">
//                             <View className="flex-1">
//                                 <Text className="text-xs font-bold text-gray-500 mb-2">Serving Size</Text>
//                                 <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
//                                     <Text className="font-semibold text-gray-900 text-[15px]">100 g</Text>
//                                     <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//                                 </View>
//                             </View>
//                             <View className="flex-1">
//                                 <Text className="text-xs font-bold text-gray-500 mb-2">Serving Amount</Text>
//                                 <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between items-center bg-white shadow-sm">
//                                     <Text className="font-semibold text-gray-900 text-[15px]">100 g</Text>
//                                     <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//                                 </View>
//                             </View>
//                         </View>

//                         {/* Brand Input */}
//                         <Text className="text-xs font-bold text-gray-500 mb-2">Brand</Text>
//                         <TextInput
//                             placeholder="Name (optional)"
//                             placeholderTextColor="#D1D5DB"
//                             className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white font-medium text-[15px] shadow-sm mb-10"
//                         />

//                         <View className="h-[2px] bg-black w-full mb-6" />

//                         {/* Nutrients List */}
//                         <View className="gap-4 mb-6">
//                             {nutrients.map((n, i) => (
//                                 <View key={i} className="flex-row justify-between items-center">
//                                     <Text className="font-bold text-gray-800">{n.name}</Text>
//                                     <View className="border border-gray-200 rounded-xl px-4 py-2.5 flex-row justify-between items-center bg-white w-28">
//                                         <TextInput
//                                             value={n.value}
//                                             placeholder="0"
//                                             keyboardType="numeric"
//                                             className="font-semibold text-gray-900 flex-1 text-right mr-2"
//                                         />
//                                         <Text className="text-gray-400 font-medium text-xs">{n.unit}</Text>
//                                     </View>
//                                 </View>
//                             ))}
//                         </View>

//                         {/* Add Additional */}
//                         <TouchableOpacity onPress={() => nutrientSheetRef.current?.present()} className="border border-dashed border-gray-300 rounded-xl p-4 flex-row justify-between items-center bg-gray-50 mb-10">
//                             <Text className="text-gray-400 font-medium">Add additional</Text>
//                             <Ionicons name="add" size={18} color="#4B5563" />
//                         </TouchableOpacity>

//                     </BottomSheetScrollView>

//                     {/* Fixed Footer */}
//                     <View className="p-5 pb-10 border-t border-gray-100 bg-white">
//                         <TouchableOpacity className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg active:bg-black">
//                             <Text className="text-white font-bold text-base">Save</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </BottomSheetModal>


//             <IconSelectorSheet ref={iconSheetRef} onSelect={setIcon} />
//             <AddNutrientSheet ref={nutrientSheetRef} onDone={handleAddNutrients} />
//         </>
//     );
// });

// File 2: EditFoodSheets.tsx
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const IconSelectorSheet = forwardRef<BottomSheetModal, { onSelect: (icon: string) => void }>((props, ref) => {
    const categories = ['All', 'Baked Goods', 'Condiments', 'Cultural', 'Dairy'];
    const emojis = ['🍅', '🌶️', '🥗', '🍲', '🥫', '🍯', '🧄', '🧈', '🥞', '🧀'];

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['75%']}
            backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />}
            enableDynamicSizing={false}
            stackBehavior='push'
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
        >
            <BottomSheetView className="flex-1 pt-4">

                <View className="px-5 mb-6 flex-row items-center justify-between">
                    <Text className="text-[24px] font-bold text-slate-100">Select Icon</Text>
                </View>

                {/* Search */}
                <View className="px-5 mb-5">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[16px] flex-row items-center px-4 py-3.5">
                        <Ionicons name="search" size={20} color="#64748B" />
                        <TextInput
                            placeholder="Search for icon"
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 font-medium text-slate-100 text-[16px]"
                        />
                    </View>
                </View>

                {/* Categories */}
                <View className="px-5 mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {categories.map(c => {
                            const isCondiments = c === 'Condiments';
                            return (
                                <View key={c} className={`px-4 py-2.5 rounded-[12px] border ${isCondiments ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]/40' : 'bg-[#151E33] border-[#1E293B]'
                                    }`}>
                                    <Text className={`font-bold text-[13px] ${isCondiments ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {c}
                                    </Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>

                {/* Grid */}
                <BottomSheetScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, paddingBottom: 40 }}>
                    {emojis.map((e, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => { props.onSelect(e); (ref as any).current?.dismiss(); }}
                            className="w-[18%] aspect-square bg-[#151E33] rounded-[16px] items-center justify-center border border-[#1E293B]"
                        >
                            <Text className="text-[28px]">{e}</Text>
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const AddNutrientSheet = forwardRef<BottomSheetModal, { onDone: (selected: string[]) => void }>((props, ref) => {
    const [selected, setSelected] = useState<string[]>([]);
    const minerals = ['Chloride', 'Chromium', 'Copper', 'Iodine', 'Magnesium'];

    const toggle = (m: string) => setSelected(p => p.includes(m) ? p.filter(i => i !== m) : [...p, m]);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['90%']}
            backdropComponent={(p) => <BottomSheetBackdrop {...p} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />}
            stackBehavior='push'
            enableDynamicSizing={false}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
        >
            <BottomSheetView className="flex-1 pb-4">

                <View className="flex-row justify-between items-start px-5 pt-4 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Nutrients</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Select elements to track</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { props.onDone(selected); (ref as any).current?.dismiss(); }}
                        className="h-10 px-4 bg-[#4DB9F2] border border-[#4DB9F2] rounded-[12px] items-center justify-center"
                    >
                        <Text className="font-bold text-[#090D16] text-[14px]">Done</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-slate-500 font-bold text-[13px] px-5 mb-3">Minerals</Text>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] overflow-hidden">
                        {minerals.map((m, index) => {
                            const isSel = selected.includes(m);
                            const isLast = index === minerals.length - 1;

                            return (
                                <TouchableOpacity
                                    key={m}
                                    onPress={() => toggle(m)}
                                    activeOpacity={0.7}
                                    className={`flex-row justify-between items-center p-5 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}
                                >
                                    <Text className="font-bold text-slate-100 text-[16px]">{m}</Text>
                                    <View className={`w-6 h-6 rounded-[8px] items-center justify-center border ${isSel ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#090D16] border-[#2D3748]'
                                        }`}>
                                        <Ionicons
                                            name={isSel ? "checkmark" : "add"}
                                            size={14}
                                            color={isSel ? "#090D16" : "#64748B"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export const EditFoodSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const iconSheetRef = useRef<BottomSheetModal>(null);
    const nutrientSheetRef = useRef<BottomSheetModal>(null);

    const [icon, setIcon] = useState('🌶️');
    const [nutrients, setNutrients] = useState<{ name: string, value: string, unit: string }[]>([
        { name: 'Energy', value: '251', unit: 'kCal' },
        { name: 'Fat', value: '3,3', unit: 'g' },
        { name: 'Carbs', value: '64', unit: 'g' }
    ]);

    const handleAddNutrients = (selected: string[]) => {
        const newFields = selected.map(n => ({ name: n, value: '', unit: 'mg' }));
        setNutrients(prev => [...prev, ...newFields]);
    };

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    return (
        <>
            <BottomSheetModal
                ref={ref}
                snapPoints={['95%']}
                backdropComponent={renderBackdrop}
                stackBehavior='push'
                enableDynamicSizing={false}
                backgroundStyle={{ backgroundColor: '#090D16' }}
                handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            >
                <View className="flex-1 pb-4">

                    {/* Left-Aligned Structural Header */}
                    <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                        <View className="flex-1 pr-4">
                            <Text className="text-[24px] font-bold text-slate-100 mb-1">Edit food</Text>
                            <Text className="text-[13px] font-medium text-slate-400">Modify nutritional details</Text>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center">
                                <Ionicons name="scan" size={18} color="#94A3B8" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 h-10 bg-rose-950/20 border border-rose-500/30 rounded-[12px] items-center justify-center">
                                <Ionicons name="trash" size={18} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <BottomSheetScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* Combined Icon & Name Editor Block */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-5 mb-6 flex-row items-center gap-5">
                            <TouchableOpacity
                                onPress={() => iconSheetRef.current?.present()}
                                className="w-[72px] h-[72px] bg-[#1E293B] border border-[#2D3748] rounded-[20px] items-center justify-center relative"
                            >
                                <Text className="text-[32px]">{icon}</Text>
                                <View className="absolute -bottom-2 -right-2 bg-[#090D16] border border-[#2D3748] w-7 h-7 rounded-[8px] items-center justify-center">
                                    <Ionicons name="pencil" size={12} color="#94A3B8" />
                                </View>
                            </TouchableOpacity>
                            <View className="flex-1">
                                <Text className="text-[20px] font-bold text-slate-100 mb-1">Ground Black Pepper</Text>
                                <View className="flex-row items-center gap-1.5">
                                    <Text className="text-slate-400 font-medium text-[13px]">Edit Name</Text>
                                    <Ionicons name="pencil" size={12} color="#64748B" />
                                </View>
                            </View>
                        </View>

                        {/* Servings Row */}
                        <View className="flex-row gap-3 mb-4">
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4">
                                <Text className="text-[12px] font-semibold text-slate-500 mb-3">Serving Size</Text>
                                <View className="flex-row justify-between items-center bg-[#090D16] border border-[#2D3748] rounded-[12px] px-4 py-3">
                                    <Text className="font-bold text-slate-100 text-[15px]">100 g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#64748B" />
                                </View>
                            </View>
                            <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4">
                                <Text className="text-[12px] font-semibold text-slate-500 mb-3">Serving Amount</Text>
                                <View className="flex-row justify-between items-center bg-[#090D16] border border-[#2D3748] rounded-[12px] px-4 py-3">
                                    <Text className="font-bold text-slate-100 text-[15px]">100 g</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#64748B" />
                                </View>
                            </View>
                        </View>

                        {/* Brand Input */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[20px] p-4 mb-8">
                            <Text className="text-[12px] font-semibold text-slate-500 mb-3">Brand</Text>
                            <TextInput
                                placeholder="Name (optional)"
                                placeholderTextColor="#64748B"
                                className="bg-[#090D16] border border-[#2D3748] rounded-[12px] px-4 py-3 font-medium text-[15px] text-slate-100"
                            />
                        </View>

                        <Text className="text-slate-500 font-bold text-[13px] mb-3 ml-1">Nutritional Values</Text>

                        {/* Nutrients List */}
                        <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] p-4 mb-4 gap-3">
                            {nutrients.map((n, i) => (
                                <View key={i} className="flex-row justify-between items-center">
                                    <Text className="font-bold text-slate-200 text-[15px] pl-1">{n.name}</Text>
                                    <View className="bg-[#090D16] border border-[#2D3748] rounded-[12px] px-4 py-2.5 flex-row items-center w-32">
                                        <TextInput
                                            value={n.value}
                                            placeholder="0"
                                            placeholderTextColor="#64748B"
                                            keyboardType="numeric"
                                            className="font-bold text-slate-100 text-[15px] flex-1 text-right mr-2"
                                        />
                                        <Text className="text-slate-500 font-bold text-[12px]">{n.unit}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Add Additional */}
                        <TouchableOpacity
                            onPress={() => nutrientSheetRef.current?.present()}
                            className="border border-dashed border-[#4DB9F2]/40 bg-[#4DB9F2]/5 rounded-[20px] p-5 flex-row justify-center items-center gap-2 mb-4"
                        >
                            <Ionicons name="add" size={18} color="#4DB9F2" />
                            <Text className="text-[#4DB9F2] font-bold text-[15px]">Add additional fields</Text>
                        </TouchableOpacity>

                    </BottomSheetScrollView>

                    {/* Fixed Footer */}
                    <View className="px-5 pt-4 border-t border-[#1E293B] bg-[#090D16]">
                        <TouchableOpacity className="bg-[#4DB9F2] py-4 rounded-[16px] items-center border border-[#4DB9F2]">
                            <Text className="text-[#090D16] font-bold text-[16px]">Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>

            <IconSelectorSheet ref={iconSheetRef} onSelect={setIcon} />
            <AddNutrientSheet ref={nutrientSheetRef} onDone={handleAddNutrients} />
        </>
    );
});