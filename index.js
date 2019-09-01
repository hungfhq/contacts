
/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require('fs');
var readlineSync = require('readline-sync');

var choice;
var contacts = JSON.parse(readFile());
var contactsJSON;
var index;
var name;
var phone;
var contact = {};



function readFile() {
  var text;
  if (fs.existsSync('./data.json')) {
    text = fs.readFileSync('./data.json', { encoding: 'utf8' });
  }
  if (text === '') {
    text = '[]';
  }
  return text;
}

function writeFile() {
  contactsJSON = JSON.stringify(contacts);
  fs.writeFileSync('./data.json', contactsJSON);
}

function show() {
  console.table(contacts);
}

function create() {
  name = readlineSync.question('Name: ');
  phone = readlineSync.question('Phone: ');
  contact = {
    name: name,
    phone: phone
  }

  contacts.push(contact);
  writeFile();
  console.log('a contact created!');
}

function deleteContact() {
  show();
  index = readlineSync.questionInt(`Choose contact by index
  > `);
  if (isIndexValidated(index)) {
    var answer = readlineSync.question(`Are you sure ? (y)
  > `);
    if (answer === 'y') {
      contacts.splice(index, 1);
      writeFile();
      console.log('contact has been deleted');
    } else {
      return false;
    }
  } else {
    console.log('index is not existed!');
    return false;
  }

}

function isIndexValidated(index) {
  existed = false;
  for (var i = 0; i < contacts.length; i++) {
    if (index === i) existed = true;
  }
  return existed;
}

function editContact() {
  show();
  index = readlineSync.questionInt(`Choose contact by index
  > `);
  if (isIndexValidated(index)) {
    console.log(contacts[index]);
    name = readlineSync.question('new name: ');
    phone = readlineSync.question('new phone: ');

    if (name === '') name = contacts[index].name;
    if (phone === '') phone = contacts[index].phone;
    contact = {
      name: name,
      phone: phone
    }
    contacts.splice(index, 1, contact);
    writeFile();
    console.log('contact has been updated');

  } else {
    console.log('index is not existed!');
    return false;
  }
}

function findContact() {
  var keyword = readlineSync.question('keyword: ');
  keyword = keyword.trim().toLowerCase();

  var resultContacts = contacts.filter(function (x) {
    return x.name.toLowerCase().includes(keyword) || (x.phone.includes(keyword));
  });
  console.table(resultContacts);
}

function menu() {
  choice = readlineSync.question(`
  ----------Menu----------
  1. Show contacts
  2. Create a new contact
  3. Delete a contact
  4. Edit a contact
  5. Find a contact
  0. Save and exit
  > `);

}

function main() {
  while (choice !== '0') {
    menu();
    switch (choice) {
      case '1':
        show();
        break;

      case '2':
        create();
        break;

      case '3':
        deleteContact();
        break;

      case '4':
        editContact();
        break;

      case '5':
        findContact();
        break;

      case '0':
        break;

      default:
        console.log('wrong choice');
        break;
    }
  }
}

main();


