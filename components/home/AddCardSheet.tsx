import { CardioLoadSection } from '@/components/home/CardioLoadSection';
import { HealthMonitorSection } from '@/components/home/HealthMonitorSection';
import { NutritionSection } from '@/components/home/NutritionSection';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Mock available cards
const AVAILABLE_CARDS = [
    {
        id: 'health',
        title: 'Health Monitor',
        icon: 'heart-outline',
        description: 'Track your vital signs like HR, HRV, and respiratory rate.',
        preview: <HealthMonitorSection />
    },
    {
        id: 'cardio',
        title: 'Cardio Load',
        icon: 'stats-chart-outline',
        description: 'Analyze training intensity and optimize recovery while avoiding overtraining and undertraining.',
        preview: <CardioLoadSection />
    },
    {
        id: 'nutrition',
        title: 'Nutrition',
        icon: 'restaurant-outline',
        description: 'Monitor your caloric intake and macro balance.',
        preview: <NutritionSection />
    }
];

interface AddCardSheetProps {
    onAddCard: (cardId: string) => void;
    existingCardIds: string[];
}

export type AddCardSheetRef = BottomSheetModal;

export const AddCardSheet = forwardRef<BottomSheetModal, AddCardSheetProps>(({ onAddCard, existingCardIds }, ref) => {
    const snapPoints = useMemo(() => ['90%'], []);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedCard, setSelectedCard] = useState<typeof AVAILABLE_CARDS[0] | null>(null);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
        []
    );

    const handleSelectCard = (card: typeof AVAILABLE_CARDS[0]) => {
        setSelectedCard(card);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setSelectedCard(null);
    };

    const handleAdd = () => {
        if (selectedCard) {
            onAddCard(selectedCard.id);
            // reset state for next time
            setView('list');
            setSelectedCard(null);
            // @ts-ignore
            ref.current?.dismiss();
        }
    };

    const isAlreadyAdded = (id: string) => existingCardIds.includes(id);

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
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity
                        onPress={view === 'detail' ? handleBack : () => (ref as any).current?.dismiss()}
                        className="w-10 h-10 items-center justify-center -ml-2"
                    >
                        <Ionicons name={view === 'detail' ? "chevron-back" : "close"} size={24} color="#374151" />
                    </TouchableOpacity>

                    <Text className="text-base font-bold text-gray-900">
                        {view === 'detail' ? 'Add card' : 'Add card'}
                    </Text>

                    <View className="w-10" />
                </View>

                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    {view === 'list' ? (
                        <View className="gap-6 pb-12">
                            {AVAILABLE_CARDS.map((card) => (
                                <View key={card.id}>
                                    <TouchableOpacity
                                        onPress={() => handleSelectCard(card)}
                                        className="flex-row items-center justify-between mb-4"
                                    >
                                        <Text className="text-[17px] font-bold text-gray-900">{card.title}</Text>
                                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => handleSelectCard(card)}
                                        className="opacity-90"
                                    >
                                        <View pointerEvents="none">
                                            {card.preview}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View className="pb-12 items-center">
                            <Text className="text-2xl font-bold text-gray-900 mb-2">{selectedCard?.title}</Text>
                            <Text className="text-gray-500 text-center text-[14px] leading-5 mb-10 px-4">
                                {selectedCard?.description}
                            </Text>

                            <View className="w-full mb-12">
                                {selectedCard?.preview}
                            </View>

                            <TouchableOpacity
                                onPress={handleAdd}
                                disabled={isAlreadyAdded(selectedCard!.id)}
                                className={`w-full py-4 rounded-2xl items-center justify-center ${isAlreadyAdded(selectedCard!.id) ? 'bg-gray-100' : 'bg-gray-900'
                                    }`}
                            >
                                <Text className={`font-bold text-[15px] ${isAlreadyAdded(selectedCard!.id) ? 'text-gray-400' : 'text-white'
                                    }`}>
                                    {isAlreadyAdded(selectedCard!.id) ? 'Already added' : 'Add to home'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
});
