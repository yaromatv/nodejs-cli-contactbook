import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
// console.log(contactsPath);

const rewriteContacts = (contacts) =>
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
};

export const getContactById = async (id) => {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === id);
    return foundContact || null;
};

export const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    rewriteContacts(contacts);
    return newContact;
};

export const updateContact = async ({ id, name, email, phone }) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, name, email, phone };
    rewriteContacts(contacts);
    return contacts[index];
};

export const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    rewriteContacts(contacts);
    return removedContact;
};
