import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Modals & Types
import { AddExerciseSheet } from './components/AddExerciseSheet';
import { CustomExercise, CustomExerciseSheet } from './components/CustomExerciseSheet';
import { ExercisePreviewSheet } from './components/ExercisePreviewSheet';
import { FilterGroupsSheet } from './components/FilterGroupsSheet';
import { Exercise, ReorderSheet, SetType } from './components/ReorderSheet';
import { SetEditSheet } from './components/SetEditSheet';
import { SupersetSelectionSheet } from './components/SupersetSelectionSheet';

export default function ResultScreen() {
    const router = useRouter();

    // Modals Refs
    const reorderRef = useRef<BottomSheetModal>(null);
    const addRef = useRef<BottomSheetModal>(null);
    const filterRef = useRef<BottomSheetModal>(null);
    const customRef = useRef<BottomSheetModal>(null);
    const previewRef = useRef<BottomSheetModal>(null);
    const supersetRef = useRef<BottomSheetModal>(null);

    // Master State
    const [exercises, setExercises] = useState<Exercise[]>([
        { id: '1', name: 'Arm Circles', type: 'Bodyweight', sets: 2, icon: '🧍', setTypes: ['warmup', 'warmup'] },
        { id: '2', name: 'Squat', type: 'Bodyweight', sets: 2, icon: '🏋️', setTypes: ['warmup', 'warmup'] },
        { id: '3', name: 'Deadlift', type: 'Barbell', sets: 3, icon: '🏋️', setTypes: ['warmup', 'warmup', 'warmup'] },
    ]);
    const [filters, setFilters] = useState<string[]>(['All groups']);
    const [customLibrary, setCustomLibrary] = useState<CustomExercise[]>([]);

    // Mode & Tracking State
    const [addSheetMode, setAddSheetMode] = useState<'add' | 'copy' | 'replace'>('add');
    const [replacingExerciseId, setReplacingExerciseId] = useState<string | null>(null);
    const [lastReplacedName, setLastReplacedName] = useState<string | null>(null);

    const [copiedExerciseData, setCopiedExerciseData] = useState<Exercise | null>(null);
    const [editingCustomData, setEditingCustomData] = useState<CustomExercise | null>(null);
    const [previewingExercise, setPreviewingExercise] = useState<CustomExercise | null>(null);

    // Superset Tracking
    const [supersetMode, setSupersetMode] = useState<'create' | 'edit'>('create');
    const [currentSupersetIds, setCurrentSupersetIds] = useState<string[]>([]);
    const [lastSupersetCreated, setLastSupersetCreated] = useState(false);

    // Set Editing Tracker
    const setEditRef = useRef<BottomSheetModal>(null);
    const [editingSetData, setEditingSetData] = useState<{
        exerciseId: string;
        setIndex: number;
        mode: 'weight' | 'reps' | 'duration';
        initialValue: string;
    } | null>(null);

    // --- Handlers ---
    const handleAddExercise = (newEx: Exercise) => {
        setExercises(prev => [...prev, newEx]);
    };

    const handleDeleteExercise = (id: string) => {
        setExercises(prev => prev.filter(ex => ex.id !== id));
    };

    const handleReplaceExercise = (newEx: Exercise) => {
        if (!replacingExerciseId) return;
        setExercises(prev => prev.map(ex =>
            ex.id === replacingExerciseId ? { ...newEx, id: ex.id, sets: ex.sets } : ex
        ));
        setLastReplacedName(newEx.name);
        setReplacingExerciseId(null);
        setAddSheetMode('add');

        // Auto-dismiss toast after 3 seconds
        setTimeout(() => setLastReplacedName(null), 3000);
    };

    const handleOpenReplace = (id: string) => {
        setReplacingExerciseId(id);
        setAddSheetMode('replace');
        addRef.current?.present();
    };

    const handleCreateSuperset = (selectedIds: string[]) => {
        const newSupersetId = Math.random().toString(36).substring(7);
        setExercises(prev => prev.map(ex =>
            selectedIds.includes(ex.id) ? { ...ex, supersetId: newSupersetId } : ex
        ));
        setLastSupersetCreated(true);
        setTimeout(() => setLastSupersetCreated(false), 3000);
    };

    const handleUnlinkSuperset = (supersetId?: string) => {
        if (!supersetId) return;
        setExercises(prev => prev.map(ex =>
            ex.supersetId === supersetId ? { ...ex, supersetId: undefined } : ex
        ));
    };

    const handleUpdateSuperset = (selectedIds: string[]) => {
        // Find existing superset ID from current selection
        const existingId = exercises.find(ex => currentSupersetIds.includes(ex.id))?.supersetId;
        if (!existingId) return;

        setExercises(prev => prev.map(ex => {
            // Remove from old superset if it was there but not in new list
            if (ex.supersetId === existingId && !selectedIds.includes(ex.id)) {
                return { ...ex, supersetId: undefined };
            }
            // Add to superset
            if (selectedIds.includes(ex.id)) {
                return { ...ex, supersetId: existingId };
            }
            return ex;
        }));
    };

    const handleSetTypeChange = (exerciseId: string, setIndex: number, newType: SetType) => {
        setExercises(prev => prev.map(ex => {
            if (ex.id !== exerciseId) return ex;
            const newTypes = [...(ex.setTypes || Array(ex.sets).fill('warmup'))];
            newTypes[setIndex] = newType;
            return { ...ex, setTypes: newTypes };
        }));
    };

    const handleOpenSetEdit = (exerciseId: string, setIndex: number, mode: 'weight' | 'reps' | 'duration', initialValue: string) => {
        setEditingSetData({ exerciseId, setIndex, mode, initialValue });
        setEditRef.current?.present();
    };

    const handleSaveSetData = (value: string, applyToNext: boolean) => {
        if (!editingSetData) return;
        const { exerciseId, setIndex, mode } = editingSetData;

        setExercises(prev => prev.map(ex => {
            if (ex.id !== exerciseId) return ex;

            const updateArray = (arr: (string | null)[] | undefined, val: string, idx: number) => {
                const newArr = [...(arr || Array(ex.sets).fill(null))];
                if (applyToNext) {
                    for (let i = idx; i < newArr.length; i++) newArr[i] = val;
                } else {
                    newArr[idx] = val;
                }
                return newArr;
            };

            if (mode === 'weight') {
                return { ...ex, weights: updateArray(ex.weights, value, setIndex) };
            } else {
                return { ...ex, reps: updateArray(ex.reps, value, setIndex) };
            }
        }));
    };

    const handleAddSet = (exerciseId: string) => {
        setExercises(prev => prev.map(ex => {
            if (ex.id !== exerciseId) return ex;
            return {
                ...ex,
                sets: ex.sets + 1,
                setTypes: [...(ex.setTypes || Array(ex.sets).fill('normal')), 'normal'],
                weights: [...(ex.weights || Array(ex.sets).fill(null)), null],
                reps: [...(ex.reps || Array(ex.sets).fill(null)), null],
            };
        }));
    };

    const handleRemoveSet = (exerciseId: string, setIndex: number) => {
        setExercises(prev => prev.map(ex => {
            if (ex.id !== exerciseId || ex.sets <= 1) return ex;
            return {
                ...ex,
                sets: ex.sets - 1,
                setTypes: (ex.setTypes || []).filter((_, i) => i !== setIndex),
                weights: (ex.weights || []).filter((_, i) => i !== setIndex),
                reps: (ex.reps || []).filter((_, i) => i !== setIndex),
            };
        }));
    };

    const handleSaveCustom = (savedEx: CustomExercise) => {
        setCustomLibrary(prev => {
            const exists = prev.find(e => e.id === savedEx.id);
            if (exists) return prev.map(e => e.id === savedEx.id ? savedEx : e);
            return [...prev, savedEx];
        });
        // Also auto-add to the current workout list
        // handleAddExercise(savedEx as Exercise);
        handleAddExercise({
            ...savedEx,
            type: savedEx.equipment,
            sets: 3,
            setTypes: ['normal', 'normal', 'normal']
        } as Exercise);
    };

    const handleDeleteCustom = (id: string) => {
        setCustomLibrary(prev => prev.filter(e => e.id !== id));
    };

    // UI Triggers
    const handleOpenCopier = () => {
        setAddSheetMode('copy');
        addRef.current?.present();
    };

    const handleSelectForCopy = (exercise: Exercise) => {
        setCopiedExerciseData(exercise);
        setAddSheetMode('add'); // reset mode for next time
    };

    const handlePreviewExercise = (exercise: CustomExercise) => {
        setPreviewingExercise(exercise);
        previewRef.current?.present();
    };

    const handleEditCustom = () => {
        setEditingCustomData(previewingExercise);
        setCopiedExerciseData(null); // Clear copy data so we don't mix them
        customRef.current?.present();
    };

    const handleOpenNewCustom = () => {
        setEditingCustomData(null);
        setCopiedExerciseData(null);
        customRef.current?.present();
    };

    const handleOpenSuperset = (ex?: Exercise) => {
        if (ex?.supersetId) {
            setSupersetMode('edit');
            const members = exercises.filter(i => i.supersetId === ex.supersetId).map(i => i.id);
            setCurrentSupersetIds(members);
        } else {
            setSupersetMode('create');
            setCurrentSupersetIds(ex ? [ex.id] : []);
        }
        supersetRef.current?.present();
    };

    const handleInfoPress = (ex: any) => {
        // Wait slightly for animation to clear, then push the Expo Router Modal
        setTimeout(() => {
            router.push({
                pathname: '/generate-template/components/exercise-details',
                params: {
                    id: ex.id,
                    name: ex.name,
                    type: ex.equipment || ex.type
                }
            });
        }, 150);
    };

    return (
        <BottomSheetModalProvider>
            <MenuProvider>
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>

                    {/* Toast / Notification for replacement success */}
                    {lastReplacedName && (
                        <View className="absolute top-12 left-5 right-5 z-50 bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-lg border border-gray-100">
                            <Text className="text-gray-900 font-bold">Replaced with "{lastReplacedName}"</Text>
                            <TouchableOpacity onPress={() => setLastReplacedName(null)}>
                                <Ionicons name="sync" size={18} color="#111827" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Toast for superset creation */}
                    {lastSupersetCreated && (
                        <View className="absolute top-12 left-5 right-5 z-50 bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-lg border border-gray-100">
                            <Text className="text-gray-900 font-bold">New superset created</Text>
                            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
                                <Ionicons name="link" size={18} color="#3B82F6" />
                            </View>
                        </View>
                    )}

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-5 py-4">
                        <TouchableOpacity onPress={() => router.dismissAll()} className="w-10"><Ionicons name="close" size={24} color="#111827" /></TouchableOpacity>
                        <Text className="font-semibold text-gray-500 text-[13px]">Create workout</Text>
                        <View className="w-10" />
                    </View>

                    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
                        {/* Title Area */}
                        <View className="flex-row justify-between items-start mb-8">
                            <View>
                                <Text className="text-3xl font-bold text-gray-900 mb-1">Full Body Workout</Text>
                                <Text className="text-gray-500 font-medium">{exercises.length} exercises, 25 sets</Text>
                            </View>
                            <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                                <Ionicons name="pencil" size={14} color="#4B5563" />
                            </TouchableOpacity>
                        </View>

                        {/* List Header with Reorder and Add Buttons */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-bold text-gray-900 text-lg">Exercises</Text>
                            <View className="flex-row gap-3">
                                <TouchableOpacity onPress={() => reorderRef.current?.present()} className="p-1">
                                    <Ionicons name="list" size={22} color="#4B5563" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => addRef.current?.present()} className="p-1">
                                    <Ionicons name="add" size={24} color="#4B5563" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Master List Rendering */}


                        {exercises.map(ex => (
                            <View key={ex.id} className={`border rounded-[24px] p-4 mb-4 shadow-sm bg-white ${ex.supersetId ? 'border-blue-400' : 'border-gray-200'}`}>

                                {/* Card Header */}
                                <View className="flex-row items-center justify-between mb-5">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-11 h-11 bg-gray-50 rounded-xl items-center justify-center border border-gray-100 relative">
                                            <Text className="text-xl">{ex.icon}</Text>
                                            {ex.supersetId && (
                                                <View className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-blue-500 rounded-full items-center justify-center border-2 border-white">
                                                    <Ionicons name="link" size={10} color="white" />
                                                </View>
                                            )}
                                        </View>
                                        <View>
                                            <View className="flex-row items-center gap-1.5">
                                                <Text className="font-bold text-gray-900 text-base">{ex.name}</Text>
                                                {ex.supersetId && <Ionicons name="link" size={14} color="#3B82F6" />}
                                            </View>
                                            <Text className="text-gray-400 text-xs">{ex.type}</Text>
                                        </View>
                                    </View>
                                    <Menu>
                                        <MenuTrigger
                                            customStyles={{
                                                triggerWrapper: { padding: 4 },
                                                TriggerTouchableComponent: TouchableOpacity,
                                            }}
                                        >
                                            <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
                                                <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                                            </View>
                                        </MenuTrigger>
                                        <MenuOptions customStyles={{ optionsContainer: { borderRadius: 12, width: 220, paddingVertical: 4 } }}>
                                            <MenuOption onSelect={() => handleOpenReplace(ex.id)}>
                                                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                    <Text className="text-[15px] font-medium text-gray-900">Replace exercise</Text>
                                                    <Ionicons name="sync" size={18} color="#111827" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => handleOpenSuperset(ex)}>
                                                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                    <Text className="text-[15px] font-medium text-gray-900">
                                                        {ex.supersetId ? 'Edit superset/circuit' : 'Create superset/circuit'}
                                                    </Text>
                                                    <Ionicons name="link" size={18} color="#111827" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => handleInfoPress(ex)}>
                                                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                    <Text className="text-[15px] font-medium text-gray-900">About exercise</Text>
                                                    <Ionicons name="information-circle-outline" size={18} color="#111827" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => handleDeleteExercise(ex.id)}>
                                                <View className="flex-row items-center justify-between px-4 py-3">
                                                    <Text className="text-[15px] font-medium text-red-500">Delete exercise</Text>
                                                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                                </View>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>
                                </View>

                                {/* Sets Mapping */}
                                <View className="gap-3 mb-5">
                                    {Array.from({ length: ex.sets || 1 }).map((_, index) => {
                                        const setType = (ex.setTypes && ex.setTypes[index]) || 'warmup';
                                        return (
                                            <View key={index} className="flex-row items-center gap-3">

                                                {/* Set Type Menu */}
                                                <Menu>
                                                    <MenuTrigger
                                                        customStyles={{
                                                            TriggerTouchableComponent: TouchableOpacity,
                                                        }}
                                                    >
                                                        <View className="w-8 h-8 rounded-full border-[1.5px] border-orange-400 items-center justify-center bg-white shadow-sm">
                                                            {setType === 'normal' ? (
                                                                <Text className="text-[14px] font-bold text-gray-900">1</Text>
                                                            ) : setType === 'warmup' ? (
                                                                <Ionicons name="flame" size={14} color="#F59E0B" />
                                                            ) : setType === 'cooldown' ? (
                                                                <Ionicons name="snow" size={14} color="#60A5FA" />
                                                            ) : setType === 'failure' ? (
                                                                <Ionicons name="warning" size={14} color="#F87171" />
                                                            ) : (
                                                                <Ionicons name="trending-down" size={14} color="#8B5CF6" />
                                                            )}
                                                        </View>
                                                    </MenuTrigger>
                                                    <MenuOptions customStyles={{ optionsContainer: { borderRadius: 12, width: 200, paddingVertical: 4 } }}>
                                                        <MenuOption onSelect={() => handleSetTypeChange(ex.id, index, 'normal')}>
                                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                                <View className="flex-row items-center gap-2">
                                                                    {setType === 'normal' && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                                    <Text className={`${setType === 'normal' ? 'font-bold' : 'font-medium'} text-[15px] text-gray-900`}>Normal</Text>
                                                                </View>
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption onSelect={() => handleSetTypeChange(ex.id, index, 'warmup')}>
                                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                                <View className="flex-row items-center gap-2">
                                                                    {setType === 'warmup' && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                                    <Text className={`${setType === 'warmup' ? 'font-bold' : 'font-medium'} text-[15px] text-gray-900`}>Warm Up</Text>
                                                                </View>
                                                                <Ionicons name="flame" size={18} color="#F59E0B" />
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption onSelect={() => handleSetTypeChange(ex.id, index, 'cooldown')}>
                                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                                <View className="flex-row items-center gap-2">
                                                                    {setType === 'cooldown' && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                                    <Text className={`${setType === 'cooldown' ? 'font-bold' : 'font-medium'} text-[15px] text-gray-900`}>Cool Down</Text>
                                                                </View>
                                                                <Ionicons name="snow" size={18} color="#60A5FA" />
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption onSelect={() => handleSetTypeChange(ex.id, index, 'failure')}>
                                                            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50">
                                                                <View className="flex-row items-center gap-2">
                                                                    {setType === 'failure' && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                                    <Text className={`${setType === 'failure' ? 'font-bold' : 'font-medium'} text-[15px] text-gray-900`}>Failure</Text>
                                                                </View>
                                                                <Ionicons name="warning" size={18} color="#F87171" />
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption onSelect={() => handleSetTypeChange(ex.id, index, 'dropset')}>
                                                            <View className="flex-row items-center justify-between px-4 py-3">
                                                                <View className="flex-row items-center gap-2">
                                                                    {setType === 'dropset' && <Ionicons name="checkmark" size={18} color="#111827" />}
                                                                    <Text className={`${setType === 'dropset' ? 'font-bold' : 'font-medium'} text-[15px] text-gray-900`}>Dropset</Text>
                                                                </View>
                                                                <Ionicons name="trending-down" size={18} color="#8B5CF6" />
                                                            </View>
                                                        </MenuOption>
                                                    </MenuOptions>
                                                </Menu>

                                                {/* Weight Input Box */}
                                                <TouchableOpacity
                                                    onPress={() => handleOpenSetEdit(ex.id, index, 'weight', (ex.weights && ex.weights[index]) || '')}
                                                    className="flex-1 h-12 border border-gray-200 rounded-xl flex-row items-center px-4 bg-white"
                                                >
                                                    <Text className={`flex-1 text-base ${ex.weights && ex.weights[index] ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                                                        {ex.weights && ex.weights[index] ? ex.weights[index] : '—'}
                                                    </Text>
                                                    <Text className="text-gray-400 text-xs font-semibold">kg</Text>
                                                </TouchableOpacity>

                                                {/* Reps/Time Input Box */}
                                                <TouchableOpacity
                                                    onPress={() => handleOpenSetEdit(ex.id, index, ex.name.includes('Circles') ? 'duration' : 'reps', (ex.reps && ex.reps[index]) || '')}
                                                    className="flex-1 h-12 border border-gray-200 rounded-xl flex-row items-center px-4 bg-white"
                                                >
                                                    <Text className="font-bold text-gray-900 flex-1 text-base">
                                                        {(ex.reps && ex.reps[index]) || (ex.name.includes('Circles') ? '0:30' : '10')}
                                                    </Text>
                                                    {!ex.name.includes('Circles') && !((ex.reps && ex.reps[index])?.includes(':')) && (
                                                        <Text className="text-gray-400 text-xs font-semibold">reps</Text>
                                                    )}
                                                </TouchableOpacity>

                                                {/* Remove Icon */}
                                                <TouchableOpacity onPress={() => handleRemoveSet(ex.id, index)}>
                                                    <Ionicons name="remove-circle-outline" size={24} color="#F87171" />
                                                </TouchableOpacity>

                                            </View>
                                        );
                                    })}
                                </View>

                                {/* Bottom Action Row (Superset / Add set) */}
                                <View className="flex-row border-t border-gray-100 pt-4 pb-1">
                                    <TouchableOpacity
                                        onPress={() => ex.supersetId ? handleUnlinkSuperset(ex.supersetId) : handleOpenSuperset(ex)}
                                        className="flex-1 flex-row items-center justify-center gap-2 border-r border-gray-100"
                                    >
                                        <Ionicons name={ex.supersetId ? "link-outline" : "link"} size={16} color={ex.supersetId ? "#EF4444" : "#9CA3AF"} />
                                        <Text className={`font-semibold text-[13px] ${ex.supersetId ? 'text-red-500' : 'text-gray-500'}`}>
                                            {ex.supersetId ? 'Unlink' : 'Superset'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleAddSet(ex.id)}
                                        className="flex-1 flex-row items-center justify-center gap-2"
                                    >
                                        <Ionicons name="add" size={16} color="#9CA3AF" />
                                        <Text className="font-semibold text-gray-500 text-[13px]">Add set</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                    </ScrollView>

                    {/* Footer */}
                    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-white px-5 pt-4 pb-8">
                        <TouchableOpacity
                            onPress={() => router.replace({ pathname: '/(tabs)', params: { showPreview: 'true' } })}

                            className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg mb-3"
                        >
                            <Text className="text-white font-bold text-base">Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push('/generate-template/report-issue')}
                        >
                            <Text className="text-center text-gray-400 text-xs">Does this template look correct? If not, <Text className="underline">report an issue</Text></Text>
                        </TouchableOpacity>
                    </View>

                    {/* Orchestrate Modals */}
                    <ReorderSheet ref={reorderRef} exercises={exercises} onSave={setExercises} />

                    <AddExerciseSheet
                        ref={addRef}
                        onAdd={handleAddExercise}
                        onOpenFilter={() => filterRef.current?.present()}
                        filterLabels={filters}
                        customExercises={customLibrary}
                        selectionMode={addSheetMode}
                        onOpenCustom={handleOpenNewCustom}
                        onSelectForCopy={handleSelectForCopy}
                        onReplace={handleReplaceExercise}
                        onPreviewExercise={handlePreviewExercise}
                        onInfoPress={handleInfoPress}
                    />

                    <CustomExerciseSheet
                        ref={customRef}
                        onSave={handleSaveCustom}
                        initialData={editingCustomData}
                        copiedData={copiedExerciseData}
                        onDelete={handleDeleteCustom}
                        onOpenCopier={handleOpenCopier}
                    />

                    <ExercisePreviewSheet
                        ref={previewRef}
                        exercise={previewingExercise}
                        onEdit={handleEditCustom}
                    />

                    <FilterGroupsSheet ref={filterRef} onApply={setFilters} />

                    <SupersetSelectionSheet
                        ref={supersetRef}
                        exercises={exercises}
                        mode={supersetMode}
                        initialSelectedIds={currentSupersetIds}
                        onSave={supersetMode === 'create' ? handleCreateSuperset : handleUpdateSuperset}
                        onUnlink={() => handleUnlinkSuperset(exercises.find(ex => currentSupersetIds.includes(ex.id))?.supersetId)}
                    />

                    <SetEditSheet
                        ref={setEditRef}
                        mode={editingSetData?.mode || 'weight'}
                        initialValue={editingSetData?.initialValue || ''}
                        onSave={handleSaveSetData}
                    />
                </SafeAreaView>
            </MenuProvider>
        </BottomSheetModalProvider >
    );
}