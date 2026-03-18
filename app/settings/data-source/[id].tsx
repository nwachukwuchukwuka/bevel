import { HideDataSourcesSheet, HideDataSourcesSheetRef } from '@/components/settings/HideDataSourcesSheet';
import { MOCK_SOURCES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
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
                <ScaleDecorator>
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        activeOpacity={1}
                        style={[
                            styles.itemContainer,
                            isActive && styles.itemActive,
                        ]}
                    >
                        <View style={styles.itemLeft}>
                            <Text style={styles.indexText}>
                                {index !== undefined ? index + 1 : ''}
                            </Text>

                            <View>
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text style={styles.itemSub}>{item.sub}</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPressIn={drag}>
                            <Ionicons name="menu" size={24} color="#D1D5DB" />
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
            <SafeAreaView edges={['top']} style={styles.container}>

                {/* Toast */}
                {showToast && (
                    <View style={styles.toast}>
                        <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                        <Text style={styles.toastText}>
                            Synced at 10.54 PM on 14/09/25
                        </Text>
                    </View>
                )}

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        {isEditing ? 'Reorder data sources' : id}
                    </Text>
                </View>

                {isEditing ? (
                    <View style={styles.flex}>
                        <DraggableFlatList
                            data={visibleSources}
                            onDragEnd={handleDragEnd}
                            keyExtractor={(item) => item.id}
                            renderItem={renderSourceItem}
                            contentContainerStyle={styles.listContent}
                            ListFooterComponent={
                                <View style={styles.footer}>
                                    <TouchableOpacity
                                        onPress={handleSaveReorder}
                                        style={styles.saveBtn}
                                    >
                                        <Text style={styles.saveText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Title Row */}
                        <View style={styles.rowBetween}>
                            <Text style={styles.sectionTitle}>Data sources</Text>
                            <TouchableOpacity onPress={() => setIsEditing(true)}>
                                <Text style={styles.editText}>
                                    Edit <Ionicons name="chevron-forward" size={12} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* List */}
                        <View style={styles.card}>
                            {visibleSources.map((s, idx) => (
                                <View
                                    key={s.id}
                                    style={[
                                        styles.listItem,
                                        idx !== visibleSources.length - 1 &&
                                        styles.listItemBorder,
                                    ]}
                                >
                                    <Text style={styles.indexText}>{idx + 1}</Text>

                                    <View style={styles.iconBox}>
                                        <Ionicons name="heart" size={10} color="#EF4444" />
                                    </View>

                                    <View>
                                        <Text style={styles.itemTitle}>{s.name}</Text>
                                        <Text style={styles.itemSub}>{s.sub}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Hide Sources */}
                        <TouchableOpacity
                            onPress={() => hideSheetRef.current?.present()}
                            style={styles.hideCard}
                        >
                            <Text style={styles.sectionTitle}>Hide data sources</Text>

                            <View style={styles.row}>
                                <Text style={styles.hiddenText}>
                                    {hiddenCount} hidden
                                </Text>
                                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.footerNote}>
                            Bevel grabs data from all the sources above. If there's a
                            conflict, it will prioritize the sources in the listed order.
                        </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingTop: 16,
    },
    flex: { flex: 1 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        flex: 1,
        textAlign: 'center',
        marginRight: 24,
    },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    itemActive: {
        borderColor: '#BFDBFE',
        zIndex: 10,
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    indexText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D1D5DB',
        width: 20,
    },

    itemTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    itemSub: {
        fontSize: 12,
        color: '#6B7280',
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },

    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },

    editText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B7280',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: 24,
        overflow: 'hidden',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    listItemBorder: {
        borderBottomWidth: 1,
        borderColor: '#F9FAFB',
    },

    iconBox: {
        width: 20,
        height: 20,
        backgroundColor: '#FEF2F2',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    hideCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    hiddenText: {
        fontSize: 14,
        color: '#9CA3AF',
    },

    footerNote: {
        fontSize: 11,
        color: '#9CA3AF',
        marginLeft: 4,
        lineHeight: 16,
    },

    footer: {
        marginTop: 32,
        marginBottom: 40,
    },

    saveBtn: {
        backgroundColor: '#1C1C1E',
        height: 56,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    toast: {
        position: 'absolute',
        top: 56,
        left: 20,
        right: 20,
        zIndex: 50,
        backgroundColor: '#ECFDF5',
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#D1FAE5',
    },

    toastText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#16A34A',
    },
}); 