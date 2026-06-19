import { JOURNAL_AUTO } from '@/constants';
import { useJournal } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATES = [
    { day: 'S', date: '7', status: 'checked' },
    { day: 'M', date: '8', status: 'checked' },
    { day: 'T', date: '9', status: 'checked' },
    { day: 'W', date: '10', status: 'checked' },
    { day: 'T', date: '11', status: 'checked' },
    { day: 'F', date: '12', status: 'active' },
    { day: 'S', date: '13', status: 'empty' },
];

const TOGGLE_COLORS = {
    0: { bg: '#3B0F0F', icon: '#F87171', iconName: 'close' },
    1: { bg: '#111827', icon: '#374151', iconName: 'remove' },
    2: { bg: '#022C22', icon: '#34D399', iconName: 'checkmark' },
};

export default function JournalScreen() {
    const router = useRouter();
    const { items } = useJournal();

    const [toggleStates, setToggleStates] = useState<Record<string, number>>({
        '糖': 2,
        '7': 1,
        '1': 1,
    });

    const PinnedItems = items.filter(i => i.active && i.isPinned);
    const DaytimeItems = items.filter(i => i.active && (!i.logTime || i.logTime === 'Daytime'));
    const NighttimeItems = items.filter(i => i.active && i.logTime === 'Nighttime');

    const toggleNext = (id: string) => {
        setToggleStates(prev => ({ ...prev, [id]: ((prev[id] ?? 1) + 1) % 3 }));
    };

    // Compact chip toggle — tap cycles through states
    const ChipToggle = ({ id }: { id: string }) => {
        const val = toggleStates[id] ?? 1;
        const cfg = TOGGLE_COLORS[val as keyof typeof TOGGLE_COLORS];
        return (
            <TouchableOpacity
                onPress={() => toggleNext(id)}
                style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: cfg.bg, alignItems: 'center', justifyContent: 'center' }}
            >
                <Ionicons name={cfg.iconName as any} size={14} color={cfg.icon} />
            </TouchableOpacity>
        );
    };

    // Horizontal spec badge for interactive items
    const SpecBadge = ({ label, color }: { label: string; color: string }) => (
        <View style={{ backgroundColor: '#0D1526', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color, }}>{label}</Text>
        </View>
    );

    // Card used in the 2-column grid
    const ItemCard = ({ item }: { item: any }) => {
        const isInteractive = ['Alcohol', 'Caffeine', 'Daily mood', 'Hydration'].includes(item.label);

        let badge: React.ReactNode = null;
        let route = '';
        if (item.label === 'Alcohol') {
            badge = <SpecBadge label="0.0 drinks" color="#F87171" />;
            route = '/journal/alcohol';
        } else if (item.label === 'Caffeine') {
            badge = <SpecBadge label="90 mg" color="#34D399" />;
            route = '/journal/caffeine';
        } else if (item.label === 'Daily mood') {
            badge = <SpecBadge label="Unpleasant" color="#A78BFA" />;
            route = '/journal/mood';
        } else if (item.label === 'Hydration') {
            badge = <SpecBadge label="1,900 ml" color="#60A5FA" />;
            route = '/journal/hydration';
        }

        const content = (
            <View style={{
                backgroundColor: '#0E1623',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: '#1C2A3F',
                padding: 12,
                flex: 1,
                minHeight: 90,
                justifyContent: 'space-between',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 22 }}>{item.emoji || '❓'}</Text>
                    {isInteractive
                        ? <Ionicons name="chevron-forward" size={13} color="#2D3F55" />
                        : <ChipToggle id={item.id} />
                    }
                </View>
                <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#94A3B8', lineHeight: 16 }} numberOfLines={1}>
                        {item.label}
                    </Text>
                    {badge && <View style={{ marginTop: 5 }}>{badge}</View>}
                </View>
            </View>
        );

        if (isInteractive) {
            return (
                <TouchableOpacity onPress={() => router.push(route as any)} style={{ flex: 1 }}>
                    {content}
                </TouchableOpacity>
            );
        }
        return <View style={{ flex: 1 }}>{content}</View>;
    };

    // 2-column grid renderer
    const CardGrid = ({ items: gridItems }: { items: any[] }) => {
        const rows: any[][] = [];
        for (let i = 0; i < gridItems.length; i += 2) {
            rows.push(gridItems.slice(i, i + 2));
        }
        return (
            <View style={{ gap: 8, marginBottom: 24 }}>
                {rows.map((row, ri) => (
                    <View key={ri} style={{ flexDirection: 'row', gap: 8 }}>
                        {row.map((item) => <ItemCard key={item.id} item={item} />)}
                        {row.length === 1 && <View style={{ flex: 1 }} />}
                    </View>
                ))}
            </View>
        );
    };

    // Slim section header with a colored left pip
    const SectionHead = ({ label, pip, sub }: { label: string; pip: string; sub?: string }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: pip }} />
            <Text style={{ fontSize: 10, fontWeight: '700', color: '#475569' }}>{label}</Text>
            {sub && <Text style={{ marginLeft: 'auto', fontSize: 10, color: '#334155' }}>{sub}</Text>}
        </View>
    );

    return (
        <MenuProvider>
            <View style={{ flex: 1, backgroundColor: '#07101C' }}>
                <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                    {/* ── Top bar ── */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 14 }}>
                        {/* Left: month label stacked above large day number */}
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 10, fontWeight: '600', color: '#4F46E5', }}>September 2025</Text>
                            <Text style={{ fontSize: 28, fontWeight: '600', color: '#E2E8F0', lineHeight: 42, marginTop: 2 }}>Friday 12</Text>
                        </View>

                        {/* Right: actions */}
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => router.push('/journal/insights')}
                                style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#13192E', borderWidth: 1, borderColor: '#1E293B', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Ionicons name="sparkles" size={15} color="#818CF8" />
                            </TouchableOpacity>

                            <Menu>
                                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerTouchable: { activeOpacity: 0.7 } }}>
                                    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#13192E', borderWidth: 1, borderColor: '#1E293B', alignItems: 'center', justifyContent: 'center' }}>
                                        <Ionicons name="ellipsis-horizontal" size={15} color="#64748B" />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions customStyles={{ optionsContainer: { borderRadius: 14, width: 210, marginTop: 42, paddingVertical: 4, backgroundColor: '#13192E', borderWidth: 1, borderColor: '#1E293B' } }}>
                                    <MenuOption onSelect={() => router.push('/journal/customize')}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1E293B' }}>
                                            <Text style={{ fontSize: 13, color: '#CBD5E1' }}>Customize journal</Text>
                                            <Ionicons name="settings" size={16} color="#475569" />
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => router.push('/journal/default-entries')}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1E293B' }}>
                                            <Text style={{ fontSize: 13, color: '#CBD5E1' }}>Default entries</Text>
                                            <Ionicons name="add" size={18} color="#475569" />
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => router.push('/journal/pinned-tags')}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
                                            <Text style={{ fontSize: 13, color: '#CBD5E1' }}>Pinned tags</Text>
                                            <Ionicons name="pin" size={16} color="#475569" />
                                        </View>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>

                    {/* ── Horizontal week bar — just dots + date numbers, no boxes ── */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 18, marginBottom: 20, alignItems: 'flex-end', gap: 0 }}>
                        {DATES.map((item, idx) => {
                            const isActive = item.status === 'active';
                            const isChecked = item.status === 'checked';
                            return (
                                <View key={idx} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                                    {/* Completion bar */}
                                    <View style={{
                                        width: 3,
                                        height: isChecked ? 20 : isActive ? 28 : 8,
                                        borderRadius: 2,
                                        backgroundColor: isActive ? '#4F46E5' : isChecked ? '#0F9B6A' : '#1A2540',
                                    }} />
                                    <Text style={{ fontSize: 11, fontWeight: isActive ? '700' : '400', color: isActive ? '#C7D2FE' : isChecked ? '#334155' : '#1E293B' }}>
                                        {item.date}
                                    </Text>
                                    <Text style={{ fontSize: 9, color: isActive ? '#6366F1' : '#1E2D44', fontWeight: '600' }}>{item.day}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 110 }}>

                        {/* Progress summary strip */}
                        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
                            {[
                                { label: 'Logged', value: '5', color: '#34D399' },
                                { label: 'Skipped', value: '2', color: '#64748B' },
                                { label: 'Pending', value: '3', color: '#4F46E5' },
                            ].map(s => (
                                <View key={s.label} style={{ flex: 1, backgroundColor: '#0E1623', borderRadius: 12, borderWidth: 1, borderColor: '#1C2A3F', paddingVertical: 10, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '800', color: s.color }}>{s.value}</Text>
                                    <Text style={{ fontSize: 10, color: '#475569', marginTop: 2, fontWeight: '500' }}>{s.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* ── Pinned ── */}
                        {PinnedItems.length > 0 && (
                            <>
                                <SectionHead label="Pinned" pip="#F59E0B" />
                                <CardGrid items={PinnedItems} />
                            </>
                        )}

                        {/* ── Daytime ── */}
                        <SectionHead label="Daytime" pip="#38BDF8" />
                        <CardGrid items={DaytimeItems} />

                        {/* ── Nighttime ── */}
                        {NighttimeItems.length > 0 && (
                            <>
                                <SectionHead label="Nighttime" pip="#818CF8" sub="12 → 13 Sep" />
                                <CardGrid items={NighttimeItems} />
                            </>
                        )}

                        {/* ── Automatic ── */}
                        <SectionHead label="Automatic" pip="#475569" />
                        <View style={{ gap: 6, marginBottom: 24 }}>
                            {JOURNAL_AUTO.map((item) => (
                                <View key={item.id} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#0E1623',
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: '#1C2A3F',
                                    paddingHorizontal: 14,
                                    paddingVertical: 11,
                                }}>
                                    {/* Icon */}
                                    <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#07101C', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                        <Ionicons name={item.icon as any} size={13} color={item.color} />
                                    </View>

                                    {/* Label */}
                                    <Text style={{ flex: 1, fontSize: 13, color: '#64748B', fontWeight: '500' }}>{item.title}</Text>

                                    {/* Value + status */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        {item.value ? <Text style={{ fontSize: 11, color: '#334155', fontWeight: '600' }}>{item.value}</Text> : null}
                                        {item.isSkipped ? (
                                            <View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: 8, height: 2, backgroundColor: '#374151', borderRadius: 1 }} />
                                            </View>
                                        ) : item.isComplete ? (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <Ionicons name="sparkles" size={10} color={item.isNegative ? '#F87171' : '#34D399'} />
                                                <View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: item.isNegative ? '#3B0F0F' : '#022C22', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name={item.isNegative ? 'close' : 'checkmark'} size={12} color={item.isNegative ? '#F87171' : '#34D399'} />
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#1E293B', borderTopColor: '#3B82F6', transform: [{ rotate: '-45deg' }] }} />
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        </MenuProvider>
    );
}