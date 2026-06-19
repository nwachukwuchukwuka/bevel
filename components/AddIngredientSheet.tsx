// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useState } from 'react';
// import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// const DUMMY_FOODS = [
//     { id: '1', name: 'American Cheese', cals: 77, amount: '1 slice', icon: '🧀' },
//     { id: '2', name: 'Cottage Cheese', cals: 221, amount: '1 cup', icon: '🥣' },
//     { id: '3', name: 'String Cheese', cals: 45, amount: '1 piece', icon: '🧀' },
// ];

// export const AddIngredientSheet = forwardRef<BottomSheetModal>((props, ref) => {
//     const [selectedIds, setSelectedIds] = useState<string[]>([]);
//     const [tab, setTab] = useState<'Search' | 'My Foods'>('Search');

//     const toggleSelect = (id: string) => {
//         setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
//     };

//     const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

//     return (
//         <BottomSheetModal ref={ref} snapPoints={['90%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}>
//             <BottomSheetView className="flex-1 px-5 pt-2">

//                 {/* Header */}
//                 <View className="flex-row justify-between items-center mb-6">
//                     <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
//                         <Text className="text-gray-500 font-medium text-base">Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity disabled={selectedIds.length === 0}>
//                         <Text className={`font-bold text-base ${selectedIds.length > 0 ? 'text-gray-900' : 'text-gray-300'}`}>Add</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Custom Tabs */}
//                 <View className="flex-row mb-6 border-b border-gray-100">
//                     <TouchableOpacity onPress={() => setTab('Search')} className={`flex-1 pb-3 items-center ${tab === 'Search' ? 'border-b-2 border-gray-900' : ''}`}>
//                         <Text className={`font-bold ${tab === 'Search' ? 'text-gray-900' : 'text-gray-400'}`}>Search</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => setTab('My Foods')} className={`flex-1 pb-3 items-center ${tab === 'My Foods' ? 'border-b-2 border-gray-900' : ''}`}>
//                         <Text className={`font-bold ${tab === 'My Foods' ? 'text-gray-900' : 'text-gray-400'}`}>My Foods</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Search Bar */}
//                 <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-6">
//                     <Ionicons name="search" size={20} color="#9CA3AF" />
//                     <TextInput placeholder="Cheese" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-base" />
//                 </View>

//                 {/* Selected Pills */}
//                 {selectedIds.length > 0 && (
//                     <View className="flex-row flex-wrap gap-2 mb-6">
//                         {selectedIds.map(id => {
//                             const item = DUMMY_FOODS.find(f => f.id === id);
//                             return (
//                                 <TouchableOpacity key={id} onPress={() => toggleSelect(id)} className="flex-row items-center bg-gray-100 rounded-full px-3 py-1.5 gap-1">
//                                     <Text>{item?.icon}</Text>
//                                     <Text className="font-semibold text-gray-800 text-xs">{item?.name}</Text>
//                                     <Ionicons name="close" size={14} color="#6B7280" />
//                                 </TouchableOpacity>
//                             )
//                         })}
//                     </View>
//                 )}

//                 <Text className="text-gray-400 font-bold text-xs mb-4 uppercase">Common</Text>

//                 {/* List */}
//                 <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
//                     {DUMMY_FOODS.map(food => {
//                         const isSelected = selectedIds.includes(food.id);
//                         return (
//                             <View key={food.id} className="flex-row items-center justify-between border-b border-gray-50 pb-4">
//                                 <View className="flex-row items-center gap-3">
//                                     <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text>{food.icon}</Text></View>
//                                     <View>
//                                         <View className="flex-row items-center gap-1">
//                                             <Text className="font-bold text-gray-900 text-[15px]">{food.name}</Text>
//                                             <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
//                                         </View>
//                                         <Text className="text-gray-500 text-xs">{food.cals} kcal • {food.amount}</Text>
//                                     </View>
//                                 </View>

//                                 <TouchableOpacity
//                                     onPress={() => toggleSelect(food.id)}
//                                     className={`w-8 h-8 rounded-full items-center justify-center border ${isSelected ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'}`}
//                                 >
//                                     <Ionicons name={isSelected ? "checkmark" : "add"} size={16} color={isSelected ? "white" : "#6B7280"} />
//                                 </TouchableOpacity>
//                             </View>
//                         );
//                     })}
//                 </BottomSheetScrollView>
//             </BottomSheetView>
//         </BottomSheetModal>
//     );
// });


// File 1: AddIngredientSheet.tsx
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_FOODS = [
    { id: '1', name: 'American Cheese', cals: 77, amount: '1 slice', icon: '🧀' },
    { id: '2', name: 'Cottage Cheese', cals: 221, amount: '1 cup', icon: '🥣' },
    { id: '3', name: 'String Cheese', cals: 45, amount: '1 piece', icon: '🧀' },
];

export const AddIngredientSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [tab, setTab] = useState<'Search' | 'My Foods'>('Search');

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['95%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 pb-4">

                {/* Structured Left-Aligned Header */}
                <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Add ingredient</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Select items for your meal</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => (ref as any).current?.dismiss()}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hard-Boxed Tabs */}
                <View className="px-5 mb-5">
                    <View className="flex-row bg-[#151E33] border border-[#1E293B] rounded-[16px] p-1">
                        <TouchableOpacity
                            onPress={() => setTab('Search')}
                            className={`flex-1 py-2.5 items-center rounded-[12px] ${tab === 'Search' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                        >
                            <Text className={`font-bold text-[14px] ${tab === 'Search' ? 'text-slate-100' : 'text-slate-500'}`}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTab('My Foods')}
                            className={`flex-1 py-2.5 items-center rounded-[12px] ${tab === 'My Foods' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                        >
                            <Text className={`font-bold text-[14px] ${tab === 'My Foods' ? 'text-slate-100' : 'text-slate-500'}`}>My Foods</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View className="px-5 mb-6">
                    <View className="flex-row items-center bg-[#151E33] border border-[#1E293B] rounded-[16px] px-4 py-3.5">
                        <Ionicons name="search" size={20} color="#64748B" />
                        <TextInput
                            placeholder="Cheese"
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 font-medium text-slate-100 text-[16px]"
                        />
                    </View>
                </View>

                {/* Selected Pills */}
                {selectedIds.length > 0 && (
                    <View className="px-5 mb-6 flex-row flex-wrap gap-2">
                        {selectedIds.map(id => {
                            const item = DUMMY_FOODS.find(f => f.id === id);
                            return (
                                <TouchableOpacity
                                    key={id}
                                    onPress={() => toggleSelect(id)}
                                    className="flex-row items-center bg-[#4DB9F2]/10 border border-[#4DB9F2]/30 rounded-[12px] px-3 py-2 gap-2"
                                >
                                    <Text className="text-[14px]">{item?.icon}</Text>
                                    <Text className="font-bold text-[#4DB9F2] text-[13px]">{item?.name}</Text>
                                    <Ionicons name="close" size={14} color="#4DB9F2" />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )}

                {/* List Content */}
                <Text className="text-slate-500 font-bold text-[13px] px-5 mb-3">Common Items</Text>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] overflow-hidden">
                        {DUMMY_FOODS.map((food, index) => {
                            const isSelected = selectedIds.includes(food.id);
                            const isLast = index === DUMMY_FOODS.length - 1;

                            return (
                                <View key={food.id} className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}>
                                    <View className="flex-row items-center gap-4 flex-1">
                                        <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                            <Text className="text-[20px]">{food.icon}</Text>
                                        </View>
                                        <View className="flex-1 pr-2">
                                            <Text className="font-bold text-slate-100 text-[16px] mb-1">{food.name}</Text>
                                            <Text className="text-slate-500 font-medium text-[13px]">{food.cals} kcal • {food.amount}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => toggleSelect(food.id)}
                                        className={`w-9 h-9 rounded-[10px] items-center justify-center border ${isSelected
                                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                                : 'bg-[#1E293B] border-[#2D3748]'
                                            }`}
                                    >
                                        <Ionicons
                                            name={isSelected ? "checkmark" : "add"}
                                            size={18}
                                            color={isSelected ? "#090D16" : "#4DB9F2"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </BottomSheetScrollView>

                {/* Footer Add Button */}
                <View className="px-5 pt-4 border-t border-[#1E293B] bg-[#090D16]">
                    <TouchableOpacity
                        disabled={selectedIds.length === 0}
                        className={`py-4 rounded-[16px] items-center border ${selectedIds.length > 0
                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                : 'bg-[#151E33] border-[#1E293B]'
                            }`}
                    >
                        <Text className={`font-bold text-[16px] ${selectedIds.length > 0 ? 'text-[#090D16]' : 'text-slate-500'
                            }`}>
                            Add selected items
                        </Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});