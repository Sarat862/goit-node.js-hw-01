const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactStringId = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactStringId);
  return result || null;
}

async function removeContact(contactId) {
  const contactStringId = String(contactId);
  const contacts = await listContacts();
  const result = contacts.filter(contact => contact.id !== contactStringId);
  await updateContacts(result);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return contacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}