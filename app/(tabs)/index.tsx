import { ActivityStatusSheet, ActivityStatusSheetRef } from '@/components/activity-status/ActivityStatusSheet';
import { AddCardSheet } from '@/components/home/AddCardSheet';
import { AllCategoriesSheet } from '@/components/home/AllCategoriesSheet';
import { CalendarSheet, CalendarSheetRef } from '@/components/home/CalendarSheet';
import { CardioLoadSection } from '@/components/home/CardioLoadSection';
import { DailyOverviewCard } from '@/components/home/DailyOverviewCard';
import { HealthMonitorSection } from '@/components/home/HealthMonitorSection';
import { NutritionSection } from '@/components/home/NutritionSection';
import { StressSection } from '@/components/home/StressSection';
import { TimelineSection } from '@/components/home/TimelineSection';
import { WorkoutPreviewSheet } from '@/components/home/WorkoutPreviewSheet';
import { ACTIVITY_STATUSES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StatusSectionProps {
    currentStatus: any;
    currentDuration: string;
    onPressStatus: () => void;
}

const StatusSection = ({ currentStatus, currentDuration, onPressStatus }: StatusSectionProps) => (
    <View className="px-5 mb-6">
        <View className="flex-row items-center justify-between bg-[#151E33] border border-slate-800/80 rounded-2xl p-4">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPressStatus}
                className="flex-row items-center flex-1 mr-4"
            >
                <View className={`${currentStatus.bgColor} rounded-xl h-10 w-10 items-center justify-center mr-3`}>
                    <Ionicons name={currentStatus.icon} size={20} color={currentStatus.iconColor} />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-slate-400">Current Status</Text>
                    <View className="flex-row items-center mt-0.5">
                        <Text className="text-sm font-bold text-slate-100 mr-1.5">{currentStatus.title}</Text>
                        <Ionicons name="chevron-down" size={14} color="#94A3B8" />
                    </View>
                    <Text className="text-[10px] text-slate-400 mt-0.5">{currentDuration}</Text>
                </View>
            </TouchableOpacity>

            <View className="flex-row items-center border-l border-slate-800 pl-4">
                <View className="bg-slate-800/80 rounded-xl h-10 w-10 items-center justify-center mr-3">
                    <Ionicons name="cloud" size={18} color="#94A3B8" />
                </View>
                <View>
                    <Text className="text-xs font-semibold text-slate-400">Weather</Text>
                    <Text className="text-sm font-bold text-slate-100 mt-0.5">30°C</Text>
                    <Text className="text-[10px] text-slate-400 mt-0.5">East Jakarta</Text>
                </View>
            </View>
        </View>
    </View>
);

type HomeSectionItem = {
    id: string;
    title: string;
    component: React.ReactNode;
};

export default function HomeScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const statusSheetRef = useRef<ActivityStatusSheetRef>(null);
    const workoutPreviewRef = useRef<BottomSheetModal>(null);
    const addCardSheetRef = useRef<BottomSheetModal>(null);
    const allCategoriesSheetRef = useRef<BottomSheetModal>(null);
    const calendarSheetRef = useRef<CalendarSheetRef>(null);

    const [currentStatus, setCurrentStatus] = useState(ACTIVITY_STATUSES[0]);
    const [currentDuration, setCurrentDuration] = useState('Until changed');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [showSyncBanner, setShowSyncBanner] = useState(false);

    const [sections, setSections] = useState<HomeSectionItem[]>([
        { id: 'overview', title: 'aunty olly', component: <DailyOverviewCard onRingPress={(label) => handleRingPress(label)} /> },
        { id: 'stress', title: 'Stress & Energy', component: <StressSection onPress={() => router.push('/stress')} /> },
        { id: 'nutrition', title: 'Nutrition', component: <NutritionSection /> },
        { id: 'health', title: 'Health Monitor', component: <HealthMonitorSection /> },
        { id: 'timeline', title: 'Timeline', component: <TimelineSection /> },
    ]);

    // Mock exercises for preview
    const [mockExercises] = useState([
        { id: '1', name: 'Arm Circles', type: 'Bodyweight', sets: 2, icon: '🧍' },
        { id: '2', name: 'Squat', type: 'Bodyweight', sets: 2, icon: '🏋️' },
        { id: '3', name: 'Back Squat', type: 'Barbell', sets: 3, icon: '🏋️' },
        { id: '4', name: 'Romanian Deadlift', type: 'Barbell', sets: 3, icon: '🏋️' },
    ]);

    useEffect(() => {
        if (params.showPreview === 'true') {
            setTimeout(() => {
                workoutPreviewRef.current?.present();
            }, 500);
        }
    }, [params.showPreview]);

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('RELOAD_DATA', () => {
            setShowSyncBanner(true);
            // Optional: Hide after 5 seconds
            setTimeout(() => setShowSyncBanner(false), 5000);
        });
        return () => subscription.remove();
    }, []);

    const handleOpenStatus = () => {
        statusSheetRef.current?.present();
    };

    const handleRingPress = (label: string) => {
        if (label === 'Strain') router.push('/strain');
        else if (label === 'Recovery') router.push('/recovery');
        else if (label === 'Sleep') router.push('/sleep');
    };

    const handleAddCard = (cardId: string) => {
        let newSection: HomeSectionItem | null = null;

        switch (cardId) {
            case 'cardio':
                newSection = { id: 'cardio', title: 'Cardio Load', component: <CardioLoadSection /> };
                break;
            case 'health':
                newSection = { id: 'health', title: 'Health Monitor', component: <HealthMonitorSection /> };
                break;
            case 'nutrition':
                newSection = { id: 'nutrition', title: 'Nutrition', component: <NutritionSection /> };
                break;
            case 'stress':
                newSection = { id: 'stress', title: 'Stress & Energy', component: <StressSection onPress={() => router.push('/stress')} /> };
                break;
            default:
                break;
        }

        if (newSection && !sections.find(s => s.id === newSection?.id)) {
            setSections([...sections, newSection]);
        }
    };

    const handleRemoveCard = (id: string) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const handleResetToDefault = () => {
        setSections([
            { id: 'overview', title: 'Daily Overview', component: <DailyOverviewCard onRingPress={(label) => handleRingPress(label)} /> },
            { id: 'stress', title: 'Stress & Energy', component: <StressSection onPress={() => router.push('/stress')} /> },
            { id: 'nutrition', title: 'Nutrition', component: <NutritionSection /> },
            { id: 'health', title: 'Health Monitor', component: <HealthMonitorSection /> },
            { id: 'timeline', title: 'Timeline', component: <TimelineSection /> },
        ]);
        setIsEditing(false);
    };

    const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<HomeSectionItem>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={isEditing ? drag : undefined}
                    disabled={isActive}
                    style={{ marginBottom: 24, paddingHorizontal: 20 }}
                >
                    <View className="flex-row items-center mb-4 pl-1">
                        {isEditing && (
                            <TouchableOpacity
                                onPress={() => handleRemoveCard(item.id)}
                                className="mr-3 p-1 rounded-lg bg-red-950/40 border border-red-900/40"
                            >
                                <Ionicons name="close-outline" size={18} color="#EF4444" />
                            </TouchableOpacity>
                        )}
                        <View className="w-1 h-4 bg-blue-500 rounded-full mr-2.5" />
                        <Text className="text-[17px] font-bold text-slate-100 flex-1">{item.title}</Text>
                        {isEditing && (
                            <Ionicons name="reorder-two-outline" size={22} color="#94A3B8" />
                        )}
                    </View>
                    {item.component}
                </TouchableOpacity>
            </ScaleDecorator>
        );
    }, [isEditing]);

    const Header = () => (
        <View className="px-5 pt-3 pb-5">
            {showSyncBanner && (
                <View className="bg-emerald-950/30 border border-emerald-800/30 rounded-xl py-2.5 px-4 mb-4 flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle-outline" size={16} color="#34D399" />
                    <Text className="text-emerald-400 font-semibold text-[13px]">Synced at 1.55 PM on 17/09/25</Text>
                </View>
            )}
            {isEditing ? (
                <View className="flex-row items-center justify-between bg-slate-900/80 border border-slate-800/60 rounded-xl p-2.5">
                    <TouchableOpacity
                        onPress={() => setIsEditing(false)}
                        className="px-4 py-2 bg-slate-800 border border-slate-700/60 rounded-lg"
                    >
                        <Text className="font-semibold text-slate-300 text-[13px]">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-semibold text-slate-400 text-[13px]">Customise Home</Text>
                    <TouchableOpacity
                        onPress={() => setIsEditing(false)}
                        className="px-4 py-2 bg-blue-600 rounded-lg"
                    >
                        <Text className="font-semibold text-white text-[13px]">Save Changes</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => calendarSheetRef.current?.present()}
                        className="flex-row items-center gap-2 bg-[#151E33] border border-slate-800/80 rounded-xl px-4 py-2"
                    >
                        <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
                        <Text className="text-sm font-semibold text-slate-100">
                            {selectedDate.toDateString() === new Date().toDateString()
                                ? 'Today, ' + selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
                                : selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                            }
                        </Text>
                        <Ionicons name="chevron-down-outline" size={14} color="#94A3B8" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/settings')}
                        className="bg-[#151E33] border border-slate-800/80 h-9 w-9 rounded-xl items-center justify-center"
                    >
                        <Ionicons name="settings-outline" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const Footer = () => (
        <View className="px-5 pb-32 pt-6">
            {isEditing ? (
                <View className="items-center">
                    <TouchableOpacity
                        onPress={() => addCardSheetRef.current?.present()}
                        className="w-full h-16 bg-[#151E33]/40 rounded-2xl border border-dashed border-slate-800 items-center justify-center mb-4"
                    >
                        <View className="bg-slate-800/80 w-8 h-8 rounded-lg items-center justify-center mb-1">
                            <Ionicons name="add" size={20} color="#94A3B8" />
                        </View>
                        <Text className="font-semibold text-slate-400 text-xs">Add section card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleResetToDefault}>
                        <Text className="font-semibold text-slate-400 text-sm mt-4">Reset dashboard</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="gap-3">
                    <TouchableOpacity
                        onPress={() => setIsEditing(true)}
                        className="bg-[#151E33] h-14 rounded-2xl items-center justify-center border border-slate-800/80"
                    >
                        <Text className="font-semibold text-slate-100 text-[15px]">Edit Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => allCategoriesSheetRef.current?.present()}
                        className="bg-[#151E33] h-14 rounded-2xl items-center justify-center border border-slate-800/80"
                    >
                        <Text className="font-semibold text-slate-100 text-[15px]">View All Categories</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-[#090D16]">
            <SafeAreaView edges={['top']} className="flex-1">
                <Header />
                {!isEditing && (
                    <StatusSection
                        currentStatus={currentStatus}
                        currentDuration={currentDuration}
                        onPressStatus={handleOpenStatus}
                    />
                )}
                <DraggableFlatList
                    data={sections}
                    onDragEnd={({ data }) => setSections(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListFooterComponent={<Footer />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10 }}
                />
            </SafeAreaView>

            <ActivityStatusSheet
                ref={statusSheetRef}
                initialStatus={currentStatus}
                initialDuration={currentDuration}
                onUpdate={(newStatus, newDuration) => {
                    setCurrentStatus(newStatus);
                    setCurrentDuration(newDuration);
                }}
            />

            <WorkoutPreviewSheet
                ref={workoutPreviewRef}
                exercises={mockExercises}
            />

            <AddCardSheet
                ref={addCardSheetRef}
                onAddCard={handleAddCard}
                existingCardIds={sections.map(s => s.id)}
            />

            <AllCategoriesSheet
                ref={allCategoriesSheetRef}
            />

            <CalendarSheet
                ref={calendarSheetRef}
                selectedDate={selectedDate}
                onDateSelect={(date) => {
                    setSelectedDate(date);
                    calendarSheetRef.current?.dismiss();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});