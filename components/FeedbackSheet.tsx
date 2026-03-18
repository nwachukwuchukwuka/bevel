import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const TAGS = ['Don\'t like the style', 'Not factually correct', 'Being lazy', 'Didn\'t answer my question', 'Unsafe or problematic', 'Biased', 'Personality issues'];

export const FeedbackSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');

    const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    return (
        <BottomSheetModal ref={ref} snapPoints={['65%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
            <BottomSheetView className="flex-1 px-5 pt-3">
                <View className="mb-4">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <Text className="text-xl font-bold text-gray-900 text-center mb-6">Provide additional feedback</Text>

                <View className="flex-row flex-wrap justify-center gap-2 mb-6">
                    {TAGS.map(tag => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <TouchableOpacity
                                key={tag}
                                onPress={() => toggleTag(tag)}
                                className={`px-4 py-2 rounded-full ${isSelected ? 'bg-[#1A1A1A]' : 'bg-gray-100'}`}
                            >
                                <Text className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-500'}`}>{tag}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <TextInput
                    placeholder="Feel free to provide as much detail as you'd like (optional)."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    value={feedback}
                    onChangeText={setFeedback}
                    className="bg-gray-100 rounded-xl p-4 font-medium text-gray-900 h-24 mb-6"
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    onPress={() => (ref as any).current?.dismiss()}
                    className={`py-4 rounded-full items-center ${selectedTags.length > 0 || feedback ? 'bg-[#1A1A1A]' : 'bg-gray-400'}`}
                >
                    <Text className="text-white font-bold text-base">Submit</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});