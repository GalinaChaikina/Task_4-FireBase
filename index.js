import { PersonalData } from './personalData.js';
import { isValid } from './validation.js';
const form = document.querySelector('.formContainer');
const butSave = document.querySelector('.save');
const list = document.querySelector('.list');
const items = [];

//коллекция элементов forms
const mainForm = document.forms.mainConteiner;
console.log(mainForm.elements);

// каждый элемент input
const nameForm = mainForm.nameInput;
const ageForm = mainForm.ageInput;

window.addEventListener('load', PersonalData.renderList);
form.addEventListener('submit', submitFormHandler);

nameForm.addEventListener('input', () => {
    butSave.disabled = !isValid(nameForm.value);
});

ageForm.addEventListener('input', () => {
	butSave.disabled = !isValid(ageForm.value);
});

function submitFormHandler(event) {
	event.preventDefault();

	if (isValid(nameForm.value)) {
		const personalData = {
			textName: nameForm.value,
			textAge: ageForm.value,
		};
		butSave.disabled = true;

		PersonalData.create(personalData).then(() => {
			nameForm.value = '';
			ageForm.value = '';
			butSave.disabled = false;
		});
		console.log('PersonalData', personalData);
	}
}