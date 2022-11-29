
const argv = require("yargs").argv;
const contactsFunctions = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsFunctions.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsFunctions.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contactsFunctions.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeContactById = await contactsFunctions.removeContact(id);
      console.table(removeContactById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);