import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ContactsContext } from './ContactsContext';

export default function ContactsScreen({ navigation }) {
    const { contacts } = useContext(ContactsContext);

    const [searchText, setSearchText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedText(searchText);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText]);
    const filteredContacts = contacts.filter((c) => {
        const searchLower = debouncedText.toLowerCase();
        return (
            c.name.toLowerCase().includes(searchLower) ||
            c.email.toLowerCase().includes(searchLower)
        );
    });

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={handleRefresh}

                ListHeaderComponent={() => (
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search name or email..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                )}

                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
                )}

                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddContact')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: { borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: 'white' },
    contactItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: 'white' },
    fab: {
        position: 'absolute', right: 20, bottom: 20,
        backgroundColor: 'blue', width: 60, height: 60,
        borderRadius: 30, justifyContent: 'center', alignItems: 'center'
    },
    fabText: { color: 'white', fontSize: 30, marginTop: -5 }
});