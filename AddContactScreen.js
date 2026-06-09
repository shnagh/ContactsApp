import React, { useContext } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactsContext } from './ContactsContext';

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Must be a valid email"),
    phone: z.string().regex(/^\d+$/, "Digits only allowed"),
});

export default function AddContactScreen({ navigation }) {
    const { addContact } = useContext(ContactsContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', email: '', phone: '' }
    });

    const onSubmit = (data) => {
        addContact(data); // Push to Context backpack
        navigation.goBack(); // Go back to the list
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, padding: 20 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                    />
                )}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

            <View style={{ marginTop: 20 }}>
                <Button title="Save Contact" onPress={handleSubmit(onSubmit)} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 15 },
    error: { color: 'red', fontSize: 12, marginTop: 5 }
});