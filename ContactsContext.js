import React, { createContext, useState } from 'react';

export const ContactsContext = createContext();

const MOCK_CONTACTS = [];
for (let i = 1; i <= 100; i++) {
    MOCK_CONTACTS.push({
        id: string(i),
        name: `user ${i}`,
        email: `user${i}@test.com`,
        phone: `555000${i}`
    });
}
export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState(MOCK_CONTACTS);

    const addContact = (newContact) => {

        const contactWithId = { ...newContact, id: Date.now().toString() };
        setContacts([contactWithId, ...contacts]);
    };
    return (
        <ContactsContext.Provider value={{ contacts, addContact }}>
            {children}
        </ContactsContext.Provider>
    );
};