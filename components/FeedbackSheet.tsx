import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const TAGS = [
    'Don\'t like the style',
    'Not factually correct',
    'Being lazy',
    'Didn\'t answer my question',
    'Unsafe or problematic',
    'Biased',
    'Personality issues'
];

export const FeedbackSheet = forwardRef<BottomSheetModal>((props, ref) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');

    const toggleTag = (tag: string) =>
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const hasInput = selectedTags.length > 0 || feedback.length > 0;

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['75%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-4 pb-8">
                {/* Left-Aligned Structural Header */}
                <View className="flex-row items-start justify-between mb-8">
                    <View className="flex-1 pr-4">
                        <Text className="text-[24px] font-bold text-slate-100 mb-1">Feedback</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Provide additional feedback</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Hard Boxed Tag Grid */}
                <View className="flex-row flex-wrap gap-3 mb-6">
                    {TAGS.map(tag => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <TouchableOpacity
                                key={tag}
                                onPress={() => toggleTag(tag)}
                                className={`px-4 py-2.5 rounded-[12px] border ${isSelected
                                    ? 'bg-rose-950/20 border-rose-500/40'
                                    : 'bg-[#151E33] border-[#1E293B]'
                                    }`}
                            >
                                <Text className={`font-semibold text-[13px] ${isSelected ? 'text-rose-400' : 'text-slate-400'
                                    }`}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* Structured Text Area */}
                <View className="bg-[#151E33] border border-[#1E293B] rounded-[16px] mb-8 overflow-hidden">
                    <TextInput
                        placeholder="Feel free to provide as much detail as you'd like (optional)."
                        placeholderTextColor="#64748B"
                        multiline
                        value={feedback}
                        onChangeText={setFeedback}
                        className="p-5 font-medium text-slate-100 text-[15px] h-32 leading-6"
                        textAlignVertical="top"
                    />
                </View>

                {/* Action Footer */}
                <View className="mt-auto">
                    <TouchableOpacity
                        disabled={!hasInput}
                        onPress={() => (ref as any).current?.dismiss()}
                        className={`py-4 rounded-[16px] items-center border ${hasInput
                            ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                            : 'bg-[#151E33] border-[#1E293B]'
                            }`}
                    >
                        <Text className={`font-bold text-[16px] ${hasInput ? 'text-[#090D16]' : 'text-slate-500'
                            }`}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});