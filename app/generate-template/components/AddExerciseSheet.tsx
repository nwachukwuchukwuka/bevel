// import { LIBRARY } from '@/constants';
// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import React, { forwardRef, useCallback, useEffect, useState } from 'react';
// import { Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { CustomExercise } from './CustomExerciseSheet';
// import { Exercise } from './ReorderSheet';

// interface AddSheetProps {
//     onAdd: (exercise: Exercise) => void;
//     onOpenFilter: () => void;
//     filterLabels: string[];
//     onOpenCustom: () => void;
//     customExercises: CustomExercise[];

//     selectionMode?: 'add' | 'copy' | 'replace';
//     onSelectForCopy?: (exercise: Exercise) => void;
//     onReplace?: (exercise: Exercise) => void;
//     onPreviewExercise?: (exercise: CustomExercise) => void;
//     onInfoPress?: (exercise: Exercise) => void;
// }

// export const AddExerciseSheet = forwardRef<BottomSheetModal, AddSheetProps>(({
//     onAdd,
//     onOpenFilter,
//     filterLabels,
//     onOpenCustom,
//     customExercises,
//     selectionMode = 'add',
//     onSelectForCopy,
//     onReplace,
//     onPreviewExercise,
//     onInfoPress
// }, ref) => {
//     const [search, setSearch] = useState('');
//     const [selectedCopyId, setSelectedCopyId] = useState<string | null>(null);

//     // Reset selection when sheet opens
//     useEffect(() => { setSelectedCopyId(null); }, [selectionMode]);



//     const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);
//     const filterText = filterLabels.includes('All groups') ? 'All groups' : `${filterLabels.length} groups`;
//     const isFilterActive = !filterLabels.includes('All groups');

//     const handleItemPress = (ex: any, isCustom: boolean = false) => {
//         if (selectionMode === 'copy' || selectionMode === 'replace') {
//             setSelectedCopyId(ex.id);
//         } else {
//             if (isCustom && onPreviewExercise) {
//                 onPreviewExercise(ex);
//             }
//         }
//     };

//     return (
//         <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
//             <View className="flex-1 bg-white pt-2 rounded-t-3xl">

//                 {/* Dynamic Header based on selectionMode */}
//                 <View className="flex-row justify-between items-center px-5 mb-4 pt-2">
//                     <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
//                         <Text className="text-gray-500 font-medium text-base">Cancel</Text>
//                     </TouchableOpacity>
//                     <Text className="font-bold text-gray-900 text-base">Library</Text>

//                     {selectionMode === 'copy' || selectionMode === 'replace' ? (
//                         <TouchableOpacity
//                             disabled={!selectedCopyId}
//                             onPress={() => {
//                                 const selectedEx = [...LIBRARY.flatMap(s => s.items), ...customExercises].find(i => i.id === selectedCopyId);
//                                 if (selectedEx) {
//                                     if (selectionMode === 'copy' && onSelectForCopy) onSelectForCopy(selectedEx as any);
//                                     if (selectionMode === 'replace' && onReplace) onReplace(selectedEx as any);
//                                 }
//                                 (ref as any).current?.dismiss();
//                             }}
//                         >
//                             <Text className={`font-bold text-base ${selectedCopyId ? 'text-gray-900' : 'text-gray-300'}`}>
//                                 {selectionMode === 'replace' ? 'Replace' : 'Save'}
//                             </Text>
//                         </TouchableOpacity>
//                     ) : (
//                         <TouchableOpacity>
//                             <Text className="font-bold text-gray-300 text-base">Add</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <View className="px-5 mb-4">
//                     {/* Search */}
//                     <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-3">
//                         <Ionicons name="search" size={20} color="#9CA3AF" />
//                         <TextInput value={search} onChangeText={setSearch} placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-[15px]" />
//                     </View>

//                     {/* Filters */}
//                     <View className="flex-row gap-3">
//                         <TouchableOpacity
//                             onPress={onOpenFilter}
//                             className={`flex-row items-center rounded-full px-4 py-2  ${isFilterActive ? 'bg-[#1A1A1A]' : 'bg-white border border-gray-200'}`}
//                         >
//                             <Ionicons name="options-outline" size={16} color={isFilterActive ? "white" : "#4B5563"} />
//                             <Text className={`font-semibold ml-2 mr-1 ${isFilterActive ? 'text-white' : 'text-gray-700'}`}>{filterText}</Text>
//                             <Ionicons name="chevron-forward" size={14} color={isFilterActive ? "white" : "#9CA3AF"} />
//                         </TouchableOpacity>
//                         <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-full px-4 py-2 bg-white ">
//                             <Ionicons name="options-outline" size={16} color="#4B5563" />
//                             <Text className="font-semibold text-gray-700 ml-2 mr-1">All equipment</Text>
//                             <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

//                     {/* Custom Section */}
//                     {true && (
//                         <View className="mb-4">
//                             <Text className="text-gray-300 font-bold text-xs uppercase mb-2">Custom</Text>

//                             {customExercises.map((ex) => (
//                                 <View key={ex.id} className="flex-row items-center justify-between py-3 border-b border-gray-50">
//                                     <TouchableOpacity onPress={() => handleItemPress(ex, true)} className="flex-row items-center gap-3 flex-1">
//                                         <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
//                                             <Text className="text-lg">{ex.icon}</Text>
//                                         </View>
//                                         <View>
//                                             <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
//                                             <Text className="text-gray-400 text-xs">{ex.equipment}</Text>
//                                         </View>
//                                     </TouchableOpacity>

//                                     {/* Add Button for Custom Exercise */}
//                                     <View className="flex-row items-center gap-3">
//                                         <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)}>
//                                             <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" />
//                                         </TouchableOpacity>

//                                         {selectionMode === 'copy' || selectionMode === 'replace' ? (
//                                             <TouchableOpacity onPress={() => setSelectedCopyId(ex.id)} className={`w-8 h-8 rounded-lg items-center justify-center ${selectedCopyId === ex.id ? 'bg-black' : 'bg-gray-100'}`}>
//                                                 <Ionicons name={selectedCopyId === ex.id ? (selectionMode === 'replace' ? "sync" : "link") : (selectionMode === 'replace' ? "sync-outline" : "link-outline")} size={18} color={selectedCopyId === ex.id ? "white" : "#6B7280"} />
//                                             </TouchableOpacity>
//                                         ) : (
//                                             <TouchableOpacity onPress={() => onAdd(ex as any)} className="w-8 h-8 rounded-lg items-center justify-center border bg-white border-gray-200 ">
//                                                 <Ionicons name="add" size={18} color="#6B7280" />
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 </View>
//                             ))}

//                             {selectionMode === 'add' && (
//                                 <TouchableOpacity onPress={onOpenCustom} className="flex-row items-center gap-3 py-2">
//                                     <View className="w-8 h-8 bg-gray-50 rounded-xl border border-gray-100 items-center justify-center">
//                                         <Ionicons name="add" size={18} color="#4B5563" />
//                                     </View>
//                                     <Text className="font-semibold text-gray-700 text-[15px]">Add custom exercise</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     )}

//                     {/* Library Mapping */}
//                     {LIBRARY.map(section => (
//                         <View key={section.letter} className="mb-4">
//                             <Text className="text-gray-300 font-bold text-xs uppercase mb-2">{section.letter}</Text>
//                             {section.items.map((ex, index) => (
//                                 <View key={ex.id} className={`flex-row items-center justify-between py-3 ${index !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
//                                     <TouchableOpacity onPress={() => handleItemPress(ex)} className="flex-row items-center gap-3 flex-1">
//                                         <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text className="text-lg">{ex.icon}</Text></View>
//                                         <View>
//                                             <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
//                                             <Text className="text-gray-400 text-xs">{ex.type}</Text>
//                                         </View>
//                                     </TouchableOpacity>

//                                     <View className="flex-row items-center gap-3">
//                                         {/* <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" /> */}
//                                         <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)}>
//                                             <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" />
//                                         </TouchableOpacity>

//                                         {selectionMode === 'copy' || selectionMode === 'replace' ? (
//                                             <TouchableOpacity onPress={() => setSelectedCopyId(ex.id)} className={`w-8 h-8 rounded-lg items-center justify-center ${selectedCopyId === ex.id ? 'bg-black' : 'bg-gray-100'}`}>
//                                                 <Ionicons name={selectedCopyId === ex.id ? (selectionMode === 'replace' ? "sync" : "link") : (selectionMode === 'replace' ? "sync-outline" : "link-outline")} size={18} color={selectedCopyId === ex.id ? "white" : "#6B7280"} />
//                                             </TouchableOpacity>
//                                         ) : (
//                                             <TouchableOpacity onPress={() => onAdd(ex as any)} className="w-8 h-8 rounded-lg items-center justify-center border bg-white border-gray-200 ">
//                                                 <Ionicons name="add" size={18} color="#6B7280" />
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 </View>
//                             ))}
//                         </View>
//                     ))}
//                 </BottomSheetScrollView>
//             </View>
//         </BottomSheetModal>
//     );
// });


import { LIBRARY } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomExercise } from './CustomExerciseSheet';
import { Exercise } from './ReorderSheet';

interface AddSheetProps {
    onAdd: (exercise: Exercise) => void;
    onOpenFilter: () => void;
    filterLabels: string[];
    onOpenCustom: () => void;
    customExercises: CustomExercise[];

    selectionMode?: 'add' | 'copy' | 'replace';
    onSelectForCopy?: (exercise: Exercise) => void;
    onReplace?: (exercise: Exercise) => void;
    onPreviewExercise?: (exercise: CustomExercise) => void;
    onInfoPress?: (exercise: Exercise) => void;
}

export const AddExerciseSheet = forwardRef<BottomSheetModal, AddSheetProps>(({
    onAdd,
    onOpenFilter,
    filterLabels,
    onOpenCustom,
    customExercises,
    selectionMode = 'add',
    onSelectForCopy,
    onReplace,
    onPreviewExercise,
    onInfoPress
}, ref) => {
    const [search, setSearch] = useState('');
    const [selectedCopyId, setSelectedCopyId] = useState<string | null>(null);

    useEffect(() => { setSelectedCopyId(null); }, [selectionMode]);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const isFilterActive = !filterLabels.includes('All groups');
    const filterText = isFilterActive ? `${filterLabels.length} groups` : 'All groups';

    const handleItemPress = (ex: any, isCustom: boolean = false) => {
        if (selectionMode === 'copy' || selectionMode === 'replace') {
            setSelectedCopyId(ex.id);
        } else {
            if (isCustom && onPreviewExercise) {
                onPreviewExercise(ex);
            }
        }
    };

    const handleSaveReplace = () => {
        const selectedEx = [...LIBRARY.flatMap(s => s.items), ...customExercises].find(i => i.id === selectedCopyId);
        if (selectedEx) {
            if (selectionMode === 'copy' && onSelectForCopy) onSelectForCopy(selectedEx as any);
            if (selectionMode === 'replace' && onReplace) onReplace(selectedEx as any);
        }
        (ref as any).current?.dismiss();
    };

    const renderActionButton = (ex: any, isSelected: boolean) => {
        if (selectionMode === 'copy' || selectionMode === 'replace') {
            const iconName = selectionMode === 'replace' ? (isSelected ? 'sync' : 'sync-outline') : (isSelected ? 'link' : 'link-outline');
            return (
                <TouchableOpacity
                    onPress={() => setSelectedCopyId(ex.id)}
                    className={`w-9 h-9 rounded-[10px] items-center justify-center border ${isSelected
                            ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                            : 'bg-[#1E293B] border-[#2D3748]'
                        }`}
                >
                    <Ionicons name={iconName} size={16} color={isSelected ? "#090D16" : "#64748B"} />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onAdd(ex as any)}
                className="w-9 h-9 rounded-[10px] items-center justify-center bg-[#1E293B] border border-[#2D3748]"
            >
                <Ionicons name="add" size={18} color="#4DB9F2" />
            </TouchableOpacity>
        );
    };

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['95%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 pb-8">

                {/* Left-Aligned Structural Header */}
                <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Library</Text>
                        <Text className="text-[13px] font-medium text-slate-400">
                            {selectionMode === 'replace' ? 'Select an exercise to swap'
                                : selectionMode === 'copy' ? 'Select an exercise to link'
                                    : 'Browse and add exercises'}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-3 mt-1">
                        {(selectionMode === 'copy' || selectionMode === 'replace') && (
                            <TouchableOpacity
                                disabled={!selectedCopyId}
                                onPress={handleSaveReplace}
                                className={`px-4 h-10 rounded-[12px] border items-center justify-center ${selectedCopyId
                                        ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                        : 'bg-[#151E33] border-[#1E293B]'
                                    }`}
                            >
                                <Text className={`font-bold text-[14px] ${selectedCopyId ? 'text-[#090D16]' : 'text-slate-500'}`}>
                                    {selectionMode === 'replace' ? 'Replace' : 'Save'}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => (ref as any).current?.dismiss()}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hard-Boxed Search & Filters */}
                <View className="px-5 mb-6">
                    <View className="flex-row items-center bg-[#151E33] border border-[#1E293B] rounded-[16px] px-4 py-3.5 mb-4">
                        <Ionicons name="search" size={20} color="#64748B" />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search library..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 font-medium text-slate-100 text-[16px]"
                        />
                    </View>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={onOpenFilter}
                            className={`flex-1 flex-row items-center justify-between border rounded-[12px] py-3 px-4 ${isFilterActive
                                    ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]/40'
                                    : 'bg-[#151E33] border-[#1E293B]'
                                }`}
                        >
                            <Text className={`font-semibold text-[13px] ${isFilterActive ? 'text-[#4DB9F2]' : 'text-slate-300'}`}>
                                {filterText}
                            </Text>
                            <Ionicons name="chevron-down" size={14} color={isFilterActive ? "#4DB9F2" : "#64748B"} />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-row items-center justify-between border border-[#1E293B] rounded-[12px] py-3 px-4 bg-[#151E33]">
                            <Text className="font-semibold text-slate-300 text-[13px]">All equipment</Text>
                            <Ionicons name="chevron-down" size={14} color="#64748B" />
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

                    {/* Custom Section */}
                    <View className="mb-8">
                        <Text className="text-slate-500 font-bold text-[12px] mb-3 ml-1">Custom</Text>

                        {customExercises.length > 0 && (
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] overflow-hidden mb-4">
                                {customExercises.map((ex, index) => {
                                    const isSelected = selectedCopyId === ex.id;
                                    const isLast = index === customExercises.length - 1;

                                    return (
                                        <View key={ex.id} className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}>
                                            <TouchableOpacity onPress={() => handleItemPress(ex, true)} className="flex-row items-center gap-4 flex-1">
                                                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                                    <Text className="text-[20px]">{ex.icon}</Text>
                                                </View>
                                                <View className="flex-1 pr-2">
                                                    <Text className="font-bold text-slate-100 text-[16px] mb-1">{ex.name}</Text>
                                                    <Text className="text-slate-500 text-[13px] font-medium">{ex.equipment}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <View className="flex-row items-center gap-3">
                                                <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)} className="w-9 h-9 items-center justify-center">
                                                    <Ionicons name="information-circle" size={20} color="#64748B" />
                                                </TouchableOpacity>
                                                {renderActionButton(ex, isSelected)}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        )}

                        {selectionMode === 'add' && (
                            <TouchableOpacity
                                onPress={onOpenCustom}
                                className="border border-dashed border-[#4DB9F2]/40 bg-[#4DB9F2]/5 rounded-[20px] p-4 flex-row items-center justify-center gap-3"
                            >
                                <Ionicons name="add" size={18} color="#4DB9F2" />
                                <Text className="font-bold text-[#4DB9F2] text-[15px]">Create custom exercise</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Library Sections */}
                    {LIBRARY.map(section => (
                        <View key={section.letter} className="mb-6">
                            <Text className="text-slate-500 font-bold text-[12px] mb-3 ml-1">{section.letter}</Text>
                            <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] overflow-hidden">
                                {section.items.map((ex, index) => {
                                    const isSelected = selectedCopyId === ex.id;
                                    const isLast = index === section.items.length - 1;

                                    return (
                                        <View key={ex.id} className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-[#1E293B]' : ''}`}>
                                            <TouchableOpacity onPress={() => handleItemPress(ex)} className="flex-row items-center gap-4 flex-1">
                                                <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                                    <Text className="text-[20px]">{ex.icon}</Text>
                                                </View>
                                                <View className="flex-1 pr-2">
                                                    <Text className="font-bold text-slate-100 text-[16px] mb-1" numberOfLines={1}>{ex.name}</Text>
                                                    <Text className="text-slate-500 text-[13px] font-medium">{ex.type}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <View className="flex-row items-center gap-3">
                                                <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)} className="w-9 h-9 items-center justify-center">
                                                    <Ionicons name="information-circle" size={20} color="#64748B" />
                                                </TouchableOpacity>
                                                {renderActionButton(ex, isSelected)}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});