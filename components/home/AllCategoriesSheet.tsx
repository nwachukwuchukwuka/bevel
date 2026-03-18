import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MAIN_CATEGORIES = [
    { id: 'strain', label: 'Strain', icon: 'flame', color: '#F97316', bgColor: 'bg-orange-50' },
    { id: 'recovery', label: 'Recovery', icon: 'leaf', color: '#22C55E', bgColor: 'bg-green-50' },
    { id: 'sleep', label: 'Sleep', icon: 'moon', color: '#3B82F6', bgColor: 'bg-blue-50' },
    { id: 'stress', label: 'Stress', icon: 'speedometer', color: '#06B6D4', bgColor: 'bg-cyan-50' },
    { id: 'energy', label: 'Energy', icon: 'flash', color: '#EAB308', bgColor: 'bg-yellow-50' },
    { id: 'nutrition', label: 'Nutrition', icon: 'restaurant', color: '#8B5CF6', bgColor: 'bg-purple-50' },
];

export const AllCategoriesSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const snapPoints = useMemo(() => ['90%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
        []
    );

    const TrendCard = ({ title, value, unit, status, icon }: any) => (
        <View className="bg-white rounded-3xl p-4 mb-3 shadow-sm border border-gray-50">
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-row items-center gap-2">
                    <Ionicons name={icon} size={14} color="#9CA3AF" />
                    <Text className="text-gray-400 font-bold text-[13px]">{title}</Text>
                </View>
                <Ionicons name="arrow-forward" size={14} color="#D1D5DB" />
            </View>
            
            <View className="flex-row items-end justify-between">
                <View>
                    <View className="flex-row items-baseline gap-1 mb-1">
                        <Text className="text-2xl font-bold text-gray-900">{value}</Text>
                        <Text className="text-gray-400 font-bold text-sm">{unit}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="arrow-up-circle" size={14} color="#3B82F6" />
                        <Text className="text-blue-500 font-bold text-[12px]">{status}</Text>
                    </View>
                </View>

                {/* Mock Sparkline Graph */}
                <View className="w-32 h-10 flex-row items-end gap-[2px]">
                    {[0.4, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6, 0.85, 0.5, 0.7, 0.9, 0.6, 1.0].map((h, i) => (
                        <View 
                            key={i} 
                            style={{ height: `${h * 100}%` }}
                            className={`flex-1 rounded-t-full ${i === 12 ? 'bg-orange-400' : 'bg-orange-100'}`}
                        />
                    ))}
                    {/* Orange dot on last bar */}
                    <View className="absolute right-0 top-0 w-2 h-2 rounded-full border-2 border-white bg-orange-400 -mt-1 -mr-1 shadow-sm" />
                </View>
            </View>
        </View>
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 px-5 pt-2">
                <Text className="text-2xl font-bold text-gray-900 mb-4">All Categories</Text>
                
                <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-6">
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <BottomSheetTextInput 
                        placeholder="Search by category"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-2 text-[15px] text-gray-900"
                    />
                </View>

                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <View className="mb-8">
                        <Text className="text-gray-400 font-bold text-[13px] mb-3 ml-1 uppercase tracking-wider">Main</Text>
                        <View className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden">
                            {MAIN_CATEGORIES.map((cat, idx) => (
                                <TouchableOpacity 
                                    key={cat.id}
                                    className={`flex-row items-center justify-between p-4 ${idx !== MAIN_CATEGORIES.length - 1 ? 'border-b border-gray-50' : ''}`}
                                >
                                    <View className="flex-row items-center gap-3">
                                        <View className={`w-8 h-8 rounded-lg items-center justify-center ${cat.bgColor}`}>
                                            <Ionicons name={cat.icon as any} size={18} color={cat.color} />
                                        </View>
                                        <Text className="text-[16px] font-bold text-gray-900">{cat.label}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-gray-400 font-bold text-[13px] mb-3 ml-1 uppercase tracking-wider">Strain</Text>
                        <TrendCard 
                            title="Strain Score"
                            value="71"
                            unit="%"
                            status="Above normal"
                            icon="sunny-outline"
                        />
                        <TrendCard 
                            title="Exercise Duration"
                            value="1h 24m"
                            unit=""
                            status="Above normal"
                            icon="time-outline"
                        />
                    </View>
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
});
