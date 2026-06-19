import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { DeviceEventEmitter, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SETTINGS_GENERAL = [
    { id: 'account', label: 'Account', icon: 'person', color: '#38BDF8', route: '/settings/account' },
    { id: 'appearance', label: 'Appearance', icon: 'contrast', color: '#818CF8', route: '/settings/appearance' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', color: '#F87171', route: '/settings/notifications' },
    // { id: 'customization', label: 'Customization', icon: 'settings', color: '#FBBF24', route: '/settings/customization' },
    { id: 'shortcuts', label: 'Shortcuts', icon: 'layers', color: '#FBBF24', route: '/settings/shortcuts' },
    { id: 'language', label: 'Language', icon: 'globe', color: '#34D399', route: null },
];

const SETTINGS_DATA = [
    // { id: 'data', label: 'Data Sources', icon: 'phone-portrait', color: '#F472B6', route: null },
    // { id: 'cgm', label: 'Manage CGM', icon: 'disc', color: '#60A5FA', route: null },
    { id: 'data', label: 'Data Sources', icon: 'phone-portrait', color: '#F472B6', route: '/settings/data-sources' },
    { id: 'cgm', label: 'Manage CGM', icon: 'disc', color: '#60A5FA', route: '/settings/manage-cgm' },
];

const SETTINGS_RESOURCES = [
    { id: 'new', label: 'What\'s new', icon: 'sparkles', color: '#818CF8' },
    { id: 'getting_started', label: 'Getting started with Bevel', icon: 'flag', color: '#84CC16' },
    { id: 'faq', label: 'Frequently asked questions', icon: 'help-circle', color: '#FBBF24' },
    { id: 'feature', label: 'Request a feature', icon: 'bulb', color: '#34D399' },
    { id: 'bug', label: 'Report a bug', icon: 'warning', color: '#EF4444' },
    { id: 'rate', label: 'Rate Bevel in the App Store', icon: 'star', color: '#7DD3FC' },
];

export default function SettingsScreen() {
    const router = useRouter();

    const renderList = (items: any[]) => (
        <View className="flex-row flex-wrap justify-between gap-y-1">
            {items.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => item.route ? router.push(item.route) : null}
                    className="w-[48%] bg-[#151E33] border border-slate-800/80 rounded-2xl p-4 mb-3 flex-col justify-between h-24"
                >
                    <View className="w-8 h-8 rounded-xl items-center justify-center bg-slate-800" style={{ borderColor: `${item.color}30`, borderWidth: 1 }}>
                        <Ionicons name={item.icon as any} size={16} color={item.color} />
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-[13px] font-bold text-slate-100 flex-1 mr-1" numberOfLines={1}>
                            {item.label}
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-[#090D16]">
            {/* Header */}
            <View className="flex-row items-center px-5 pt-6 pb-4 bg-[#090D16]">
                <Text className="text-[28px] font-bold text-slate-100 flex-1">Settings</Text>
                <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 bg-slate-800 border border-slate-700/60 rounded-xl items-center justify-center">
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                {/* Bevel Pro Card */}
                <TouchableOpacity
                    onPress={() => router.push('/settings/pro')}
                    className="bg-indigo-950/20 border border-indigo-900/40 rounded-2xl p-4 flex-row items-center justify-between mb-8"
                >
                    <View className="flex-row items-center gap-3.5">
                        <View className="w-9 h-9 bg-indigo-600 rounded-xl items-center justify-center">
                            <Ionicons name="flash" size={20} color="white" />
                        </View>
                        <View>
                            <Text className="text-[16px] font-bold text-slate-100">Bevel Pro</Text>
                            <Text className="text-[11px] font-medium text-slate-400 mt-0.5">Unlock advanced features</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </TouchableOpacity>

                {/* General Settings */}
                <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-2">General</Text>
                <View className="mb-6">{renderList(SETTINGS_GENERAL)}</View>

                {/* Data Settings */}
                <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-2">Data</Text>
                <View className="mb-6">{renderList(SETTINGS_DATA)}</View>

                {/* iCloud Sync */}
                <View className="bg-blue-950/20 border border-blue-900/40 rounded-2xl p-4 flex-row items-center justify-between mb-8">
                    <View className="flex-row items-center gap-3.5">
                        <View className="w-9 h-9 bg-blue-600 rounded-xl items-center justify-center">
                            <Ionicons name="cloud-done" size={20} color="white" />
                        </View>
                        <View>
                            <Text className="text-[16px] font-bold text-slate-100">iCloud Sync</Text>
                            <Text className="text-[11px] font-medium text-slate-400 mt-0.5">Secure cloud backup enabled</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </View>

                {/* Resources */}
                <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-2">Resources</Text>
                <View className="mb-6">{renderList(SETTINGS_RESOURCES)}</View>

                {/* Legal */}
                <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-2">Legal</Text>
                <View className="flex-row flex-wrap justify-between gap-y-1 mb-8">
                    <TouchableOpacity className="w-[48%] bg-[#151E33] border border-slate-800/80 rounded-2xl p-4 flex-col justify-between h-24">
                        <View className="w-8 h-8 rounded-xl items-center justify-center bg-slate-800 border border-slate-700/20">
                            <Ionicons name="document-text-outline" size={18} color="#94A3B8" />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[13px] font-bold text-slate-100 flex-1 mr-1" numberOfLines={1}>Terms of Service</Text>
                            <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[48%] bg-[#151E33] border border-slate-800/80 rounded-2xl p-4 flex-col justify-between h-24">
                        <View className="w-8 h-8 rounded-xl items-center justify-center bg-slate-800 border border-slate-700/20">
                            <Ionicons name="shield-checkmark-outline" size={18} color="#94A3B8" />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[13px] font-bold text-slate-100 flex-1 mr-1" numberOfLines={1}>Privacy Policy</Text>
                            <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View className="gap-3 mb-10">
                    <TouchableOpacity
                        onPress={() => {
                            DeviceEventEmitter.emit('RELOAD_DATA');
                            router.back();
                        }}
                        className="bg-[#151E33]/60 border border-slate-800 h-14 rounded-2xl items-center justify-center"
                    >
                        <Text className="font-bold text-[15px] text-slate-200">Clear cache & reload all data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#151E33]/60 border border-slate-800 h-14 rounded-2xl items-center justify-center">
                        <Text className="font-bold text-[15px] text-slate-200">Send logs to developer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#151E33]/60 border border-slate-800 h-14 rounded-2xl items-center justify-center">
                        <Text className="font-bold text-[15px] text-slate-200">Restore data from backend</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="items-center mb-8">
                    <View className="flex-row gap-6 mb-6">
                        <Ionicons name="logo-instagram" size={24} color="#94A3B8" />
                        <Text className="text-[20px] font-bold text-slate-400">𝕏</Text>
                        <Ionicons name="logo-reddit" size={24} color="#94A3B8" />
                        <Ionicons name="logo-youtube" size={24} color="#94A3B8" />
                        <Ionicons name="logo-facebook" size={24} color="#94A3B8" />
                    </View>
                    <Text className="text-[24px] font-bold text-slate-100">Bevel</Text>
                    <Text className="text-[13px] font-medium text-slate-500 mt-1">2.2.2 (2239)</Text>
                </View>

            </ScrollView>
        </View>
    );
}