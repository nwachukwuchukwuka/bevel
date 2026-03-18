import { ActivityStatusSheet, ActivityStatusSheetRef } from '@/components/activity-status/ActivityStatusSheet';
import { CalendarSheet, CalendarSheetRef } from '@/components/home/CalendarSheet';
import { AddCardSheet } from '@/components/home/AddCardSheet';
import { AllCategoriesSheet } from '@/components/home/AllCategoriesSheet';
import { CardioLoadSection } from '@/components/home/CardioLoadSection';
import { DailyOverviewCard } from '@/components/home/DailyOverviewCard';
import { HealthMonitorSection } from '@/components/home/HealthMonitorSection';
import { NutritionSection } from '@/components/home/NutritionSection';
import { StressSection } from '@/components/home/StressSection';
import { TimelineSection } from '@/components/home/TimelineSection';
import { WorkoutPreviewSheet } from '@/components/home/WorkoutPreviewSheet';
import { ACTIVITY_STATUSES, CURRENT_DATE } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StatusSectionProps {
    currentStatus: any;
    currentDuration: string;
    onPressStatus: () => void;
}

const StatusSection = ({ currentStatus, currentDuration, onPressStatus }: StatusSectionProps) => (
    <View className="flex-row gap-3 mb-6 px-5">
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressStatus}
            className="flex-row items-center bg-white rounded-full p-1 pr-4 shadow-sm border border-gray-50"
        >
            <View className={`${currentStatus.bgColor} rounded-full h-8 w-8 items-center justify-center mr-2`}>
                <Ionicons name={currentStatus.icon} size={16} color={currentStatus.iconColor} />
            </View>
            <View>
                <Text className="text-xs font-bold text-gray-800">{currentStatus.title}</Text>
                <Text className="text-[10px] text-gray-500">{currentDuration}</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#A3A3A3" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <View className="flex-row items-center bg-white rounded-full p-2 px-4 shadow-sm flex-1 justify-between border border-gray-50">
            <View className="bg-gray-100 rounded-full p-1 mr-2">
                <Ionicons name="cloud" size={14} color="#A3A3A3" />
            </View>
            <View>
                <Text className="text-xs font-bold text-gray-800">30°C</Text>
                <Text className="text-[10px] text-gray-500">East Jakarta</Text>
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
        { id: 'overview', title: 'Daily Overview', component: <DailyOverviewCard onRingPress={(label) => handleRingPress(label)} /> },
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
                    <View className="flex-row items-center mb-3">
                        {isEditing && (
                            <TouchableOpacity
                                onPress={() => handleRemoveCard(item.id)}
                                className="mr-2"
                            >
                                <Ionicons name="remove-circle" size={22} color="#EF4444" />
                            </TouchableOpacity>
                        )}
                        <Text className="text-lg font-bold text-gray-900 flex-1">{item.title}</Text>
                        {isEditing && (
                            <Ionicons name="menu" size={20} color="#D1D5DB" />
                        )}
                    </View>
                    {item.component}
                </TouchableOpacity>
            </ScaleDecorator>
        );
    }, [isEditing]);

    const Header = () => (
        <View className="px-5 pt-2 pb-4">
            {showSyncBanner && (
                <View className="bg-[#D1FAE5] rounded-full py-2.5 px-4 mb-4 flex-row items-center gap-2">
                    <View className="bg-[#10B981] rounded-full p-0.5">
                        <Ionicons name="checkmark" size={12} color="white" />
                    </View>
                    <Text className="text-[#065F46] font-bold text-[13px]">Synced at 1.55 PM on 17/09/25</Text>
                </View>
            )}
            {isEditing ? (
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => setIsEditing(false)} className="px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm shadow-black/5">
                        <Text className="font-bold text-gray-900 text-[13px]">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsEditing(false)} className="px-5 py-2 bg-gray-900 rounded-lg shadow-sm">
                        <Text className="font-bold text-white text-[13px]">Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity 
                        onPress={() => calendarSheetRef.current?.present()}
                        className="flex-row items-center gap-2"
                    >
                        <Text className="text-xl font-bold text-gray-900">
                            {selectedDate.toDateString() === new Date().toDateString() 
                                ? 'Today, ' + selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
                                : selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                            }
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/settings')}
                        className="bg-blue-100 h-9 w-9 rounded-full items-center justify-center font-bold"
                    >
                        <Text className="text-blue-500 font-bold text-[14px]">S</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const Footer = () => (
        <View className="px-5 pb-32 pt-4">
            {isEditing ? (
                <View className="items-center">
                    <TouchableOpacity
                        onPress={() => addCardSheetRef.current?.present()}
                        className="w-full h-16 bg-white rounded-2xl border border-dashed border-gray-200 items-center justify-center mb-3"
                    >
                        <View className="bg-gray-50 w-8 h-8 rounded-lg items-center justify-center mb-1">
                            <Ionicons name="add" size={20} color="#9CA3AF" />
                        </View>
                        <Text className="font-bold text-gray-400 text-xs">Add card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleResetToDefault}>
                        <Text className="font-bold text-gray-400 text-sm mt-4">Reset to default</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="gap-3">
                    <TouchableOpacity
                        onPress={() => setIsEditing(true)}
                        className="bg-white h-14 rounded-2xl items-center justify-center border border-gray-100 shadow-sm shadow-black/5"
                    >
                        <Text className="font-bold text-gray-900 text-[15px]">Edit Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => allCategoriesSheetRef.current?.present()}
                        className="bg-white h-14 rounded-2xl items-center justify-center border border-gray-100 shadow-sm shadow-black/5"
                    >
                        <Text className="font-bold text-gray-900 text-[15px]">View All Categories</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-[#F9FAFB]">
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

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3
    }
});