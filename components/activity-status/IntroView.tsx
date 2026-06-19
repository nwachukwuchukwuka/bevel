import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onContinue: () => void;
    onClose: () => void;
}

const StatusIcon = ({ name, color, bgClass }: { name: any, color: string, bgClass: string }) => (
    <View className={`w-14 h-14 rounded-xl items-center justify-center border border-[#1E293B] ${bgClass}`}>
        <Ionicons name={name} size={24} color={color} />
    </View>
);

export const IntroView = ({ onContinue, onClose }: Props) => {
    return (
        <View className="flex-1 bg-[#090D16] px-6 pt-6 pb-8 justify-between">

            <View>
                <View className="flex-row justify-between items-start mb-10">
                    <View className="w-12 h-12 bg-[#151E33] border border-[#1E293B] rounded-2xl items-center justify-center">
                        <Ionicons name="pulse" size={24} color="#4DB9F2" />
                    </View>
                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <Text className="text-3xl font-bold text-slate-100 mb-4">
                    Activity Status
                </Text>

                <Text className="text-base font-medium text-slate-400 leading-7 mb-10 pr-4">
                    Set your Activity status to Active, Sick, Injured, or On a Break. Bevel will adjust recommendations to match how you feel.
                </Text>

                <View className="flex-row items-center justify-between bg-[#151E33] p-5 rounded-3xl border border-[#1E293B]">
                    <StatusIcon name="walk" color="#10B981" bgClass="bg-emerald-950/30" />
                    <View className="w-[1px] h-8 bg-[#1E293B]" />
                    <StatusIcon name="bandage" color="#EF4444" bgClass="bg-rose-950/30" />
                    <View className="w-[1px] h-8 bg-[#1E293B]" />
                    <StatusIcon name="bed" color="#F59E0B" bgClass="bg-amber-950/30" />
                    <View className="w-[1px] h-8 bg-[#1E293B]" />
                    <StatusIcon name="umbrella" color="#4DB9F2" bgClass="bg-sky-950/30" />
                </View>
            </View>

            <TouchableOpacity
                onPress={onContinue}
                activeOpacity={0.8}
                className="w-full bg-[#4DB9F2] mt-5  h-14 rounded-2xl items-center justify-center border border-[#4DB9F2]"
            >
                <Text className="text-[#090D16] font-bold text-base">Continue</Text>
            </TouchableOpacity>

        </View>
    );
};