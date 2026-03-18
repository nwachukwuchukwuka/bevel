import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { DeviceEventEmitter, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SETTINGS_GENERAL = [
    { id: 'account', label: 'Account', icon: 'person', color: '#38BDF8', route: '/settings/account' },
    { id: 'appearance', label: 'Appearance', icon: 'contrast', color: '#818CF8', route: '/settings/appearance' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', color: '#F87171', route: '/settings/notifications' },
    { id: 'customization', label: 'Customization', icon: 'settings', color: '#FBBF24', route: '/settings/customization' },
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
        <View className="bg-white rounded-[20px] shadow-sm shadow-black/5 overflow-hidden border border-gray-100">
            {items.map((item, idx) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => item.route ? router.push(item.route) : null}
                    className={`flex-row items-center justify-between p-4 ${idx !== items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                    <View className="flex-row items-center gap-3">
                        <View className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                            <Ionicons name={item.icon as any} size={18} color={item.color} />
                        </View>
                        <Text className="text-[15px] font-bold text-gray-900">{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="flex-row items-center px-5 pt-6 pb-4">
                <Text className="text-[28px] font-bold text-gray-900 flex-1">Settings</Text>
                <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center">
                    <Ionicons name="close" size={20} color="#4B5563" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

                {/* Bevel Pro Card */}
                <TouchableOpacity
                    onPress={() => router.push('/settings/pro')}
                    className="bg-white rounded-[20px] p-4 flex-row items-center justify-between shadow-sm shadow-black/5 border border-gray-100 mb-8"
                >
                    <View className="flex-row items-center gap-3">
                        <View className="w-8 h-8 bg-gray-900 rounded-lg items-center justify-center">
                            <Ionicons name="flash" size={18} color="white" />
                        </View>
                        <Text className="text-[16px] font-bold text-gray-900">Bevel Pro</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                </TouchableOpacity>

                {/* General Settings */}
                <Text className="text-[13px] font-bold text-gray-500 mb-2 ml-2">General</Text>
                <View className="mb-8">{renderList(SETTINGS_GENERAL)}</View>

                {/* Data Settings */}
                <Text className="text-[13px] font-bold text-gray-500 mb-2 ml-2">Data</Text>
                <View className="mb-8">{renderList(SETTINGS_DATA)}</View>

                {/* iCloud Sync */}
                <View className="bg-white rounded-[20px] p-4 flex-row items-center justify-between shadow-sm shadow-black/5 border border-gray-100 mb-8">
                    <View className="flex-row items-center gap-3">
                        <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                            <Ionicons name="cloud-done" size={18} color="#3B82F6" />
                        </View>
                        <Text className="text-[16px] font-bold text-gray-900">iCloud Sync</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                </View>

                {/* Resources */}
                <Text className="text-[13px] font-bold text-gray-500 mb-2 ml-2">Resources</Text>
                <View className="mb-8">{renderList(SETTINGS_RESOURCES)}</View>

                {/* Legal */}
                <Text className="text-[13px] font-bold text-gray-500 mb-2 ml-2">Legal</Text>
                <View className="bg-white rounded-[20px] shadow-sm shadow-black/5 overflow-hidden border border-gray-100 mb-8">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="document-text-outline" size={20} color="#9CA3AF" />
                            <Text className="text-[15px] font-bold text-gray-900">Terms of Service</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="shield-checkmark-outline" size={20} color="#9CA3AF" />
                            <Text className="text-[15px] font-bold text-gray-900">Privacy Policy</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View className="gap-3 mb-10">
                    <TouchableOpacity
                        onPress={() => {
                            DeviceEventEmitter.emit('RELOAD_DATA');
                            router.back();
                        }}
                        className="bg-white h-[56px] rounded-2xl items-center justify-center shadow-sm border border-gray-100"
                    >
                        <Text className="font-bold text-[15px] text-gray-900">Clear cache & reload all data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white h-[56px] rounded-2xl items-center justify-center shadow-sm border border-gray-100"><Text className="font-bold text-[15px] text-gray-900">Send logs to developer</Text></TouchableOpacity>
                    <TouchableOpacity className="bg-white h-[56px] rounded-2xl items-center justify-center shadow-sm border border-gray-100"><Text className="font-bold text-[15px] text-gray-900">Restore data from backend</Text></TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="items-center mb-8">
                    <View className="flex-row gap-6 mb-6">
                        <Ionicons name="logo-instagram" size={24} color="#111827" />
                        <Text className="text-[20px] font-bold">𝕏</Text>
                        <Ionicons name="logo-reddit" size={24} color="#111827" />
                        <Ionicons name="logo-youtube" size={24} color="#111827" />
                        <Ionicons name="logo-facebook" size={24} color="#111827" />
                    </View>
                    <Text className="text-[24px] font-bold text-gray-900 tracking-tight">Bevel</Text>
                    <Text className="text-[13px] font-medium text-gray-500 mt-1">2.2.2 (2239)</Text>
                </View>

            </ScrollView>
        </View>
    );
}