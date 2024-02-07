import { program } from "commander";
import * as contactService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contactsList = await contactService.listContacts();
            return console.log(contactsList);
        case "getById":
            const contactById = await contactService.get(id);
            return console.log(contactById);
        case "add":
            const addedContact = await contactService.addContact({
                name,
                email,
                phone,
            });
            return console.log(addedContact);
        case "update":
            const updatedContact = await contactService.updateContact({
                id,
                name,
                email,
                phone,
            });
            return console.log(updatedContact);
        case "remove":
            const removedContact = await contactService.removeContact(id);
            return console.log(removedContact);
        default:
            console.log("Unknown command");
    }
};

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
