import { HideDataSourcesSheet, HideDataSourcesSheetRef } from '@/components/settings/HideDataSourcesSheet';
import { MOCK_SOURCES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';

type DataSource = {
    id: string;
    name: string;
    sub: string;
    icon: string;
    isHidden: boolean;
};

export default function DataSourceDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const hideSheetRef = useRef<HideDataSourcesSheetRef>(null);

    const [sources, setSources] = useState<DataSource[]>(MOCK_SOURCES);
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const hiddenCount = sources.filter((s) => s.isHidden).length;
    const visibleSources = sources.filter((s) => !s.isHidden);

    const handleSaveReorder = () => {
        setIsEditing(false);
        triggerToast();
    };

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const renderSourceItem = useCallback(
        ({ item, drag, isActive, getIndex }: RenderItemParams<DataSource>) => {
            const index = getIndex();

            return (
                <ScaleDecorator activeScale={0.98}>
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        activeOpacity={1}
                        className={`mx-5 mb-3 p-4 rounded-[20px] border flex-row items-center justify-between ${isActive
                            ? 'bg-[#1E293B] border-[#4DB9F2]'
                            : 'bg-[#151E33] border-[#1E293B]'
                            }`}
                    >
                        <View className="flex-row items-center gap-4 flex-1">
                            <View className={`w-10 h-10 rounded-[12px] border items-center justify-center ${isActive
                                ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]/30'
                                : 'bg-[#090D16] border-[#2D3748]'
                                }`}>
                                <Text className={`font-bold text-[14px] ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                    {index !== undefined ? index + 1 : ''}
                                </Text>
                            </View>

                            <View className="flex-1 pr-4">
                                <Text className="font-bold text-slate-100 text-[15px] mb-0.5">{item.name}</Text>
                                <Text className="font-medium text-slate-500 text-[12px]">{item.sub}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPressIn={drag}
                            className="w-12 h-12 items-center justify-center rounded-[12px] bg-[#090D16] border border-[#2D3748]"
                        >
                            <Ionicons name="reorder-two" size={20} color="#64748B" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScaleDecorator>
            );
        },
        []
    );

    const handleDragEnd = ({ data }: { data: DataSource[] }) => {
        const hiddenSources = sources.filter((s) => s.isHidden);
        setSources([...data, ...hiddenSources]);
    };

    return (
        <BottomSheetModalProvider>
            <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">

                {/* System Toast Notification */}
                {showToast && (
                    <View className="absolute top-16 left-5 right-5 z-50 bg-emerald-950/40 border border-emerald-500/30 rounded-[16px] px-4 py-3.5 flex-row items-center gap-3">
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        <Text className="text-[14px] font-bold text-emerald-400 flex-1">
                            Synced at 10.54 PM on 14/09/25
                        </Text>
                    </View>
                )}

                {/* Left-Aligned Structural Header */}
                <View className="flex-row items-start justify-between px-5 pt-4 pb-6">
                    <View className="flex-1 pr-4">
                        <Text className="text-2xl font-bold text-slate-100 mb-1">
                            {isEditing ? 'Reorder data sources' : id}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center mt-1"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {isEditing ? (
                    <View className="flex-1">
                        <DraggableFlatList
                            data={visibleSources}
                            onDragEnd={handleDragEnd}
                            keyExtractor={(item) => item.id}
                            renderItem={renderSourceItem}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        />

                        {/* Persistent Bottom Save Action */}
                        <View className="px-5 pt-4 pb-8 bg-[#090D16]">
                            <TouchableOpacity
                                onPress={handleSaveReorder}
                                className="bg-[#4DB9F2] h-[56px] rounded-[16px] border border-[#4DB9F2] items-center justify-center"
                            >
                                <Text className="font-bold text-[16px] text-[#090D16]">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 60 }}
                    >
                        {/* Title Row */}
                        <View className="flex-row items-center justify-between px-5 mb-4 mt-2">
                            <Text className="font-bold text-[16px] text-slate-100">Data sources</Text>
                            <TouchableOpacity
                                onPress={() => setIsEditing(true)}
                                className="bg-[#151E33] border border-[#1E293B] px-3 py-1 rounded-[10px] flex-row items-center gap-1.5"
                            >
                                <Text className="font-bold text-[13px] text-[#4DB9F2]">Edit</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Separated List Cards */}
                        <View className="px-5 mb-8 gap-3">
                            {visibleSources.map((s, idx) => (
                                <View
                                    key={s.id}
                                    className="bg-[#151E33] border border-[#1E293B] p-4 rounded-[20px] flex-row items-center gap-4"
                                >
                                    <View className="w-10 h-10 bg-[#090D16] border border-[#2D3748] rounded-[12px] items-center justify-center">
                                        <Text className="font-bold text-[14px] text-slate-400">{idx + 1}</Text>
                                    </View>

                                    <View className="w-10 h-10 bg-rose-950/20 border border-rose-500/20 rounded-[12px] items-center justify-center">
                                        <Ionicons name="heart" size={18} color="#EF4444" />
                                    </View>

                                    <View className="flex-1 pr-2">
                                        <Text className="font-bold text-[15px] text-slate-100 mb-0.5">{s.name}</Text>
                                        <Text className="font-medium text-[12px] text-slate-500">{s.sub}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Hide Sources Action Card */}
                        <TouchableOpacity
                            onPress={() => hideSheetRef.current?.present()}
                            className="mx-5 bg-[#1E293B] border border-[#2D3748] p-5 rounded-[20px] flex-row items-center justify-between mb-6"
                        >
                            <Text className="font-bold text-[15px] text-slate-100">Hide data sources</Text>
                            <View className="flex-row items-center gap-3">
                                <View className="bg-[#090D16] border border-[#1E293B] px-2.5 py-1 rounded-[8px]">
                                    <Text className="font-bold text-[12px] text-slate-400">
                                        {hiddenCount} hidden
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#64748B" />
                            </View>
                        </TouchableOpacity>

                        {/* Information Block */}
                        <View className="mx-5 bg-[#151E33] border border-[#1E293B] rounded-[16px] p-4 flex-row gap-3">
                            <View className="mt-0.5">
                                <Ionicons name="information-circle" size={18} color="#4DB9F2" />
                            </View>
                            <Text className="flex-1 font-medium text-[13px] text-slate-400 leading-5 pr-2">
                                Bevel grabs data from all the sources above. If there's a
                                conflict, it will prioritize the sources in the listed order.
                            </Text>
                        </View>
                    </ScrollView>
                )}

                <HideDataSourcesSheet
                    ref={hideSheetRef}
                    sources={sources}
                    onSave={(updated) => {
                        setSources(updated);
                        triggerToast();
                    }}
                />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}