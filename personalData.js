export class PersonalData {
    static create(personalData) {
        return fetch('https://my-project-datefirebase-default-rtdb.europe-west1.firebasedatabase.app/personaData.json', {
            method: 'POST',
            body: JSON.stringify(personalData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            personalData.id = response.name
            return personalData
        })
        .then(addToLocalStorage)
        .then(PersonalData.renderList)
    }

    static renderList() {
        const personalDatas = getDataFromLocalStorage()
        const html = personalDatas.length 
        ? personalDatas.map(toCard).join('')
        : `<div class="list-dop">Данные не введены</div>`

        const list = document.querySelector('.list');
        list.innerHTML = html;
    } 
}

function addToLocalStorage(personalData) {
    const all = getDataFromLocalStorage();
    all.push(personalData);
    localStorage.setItem('personalDatas', JSON.stringify(all))
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('personalDatas') || '[]')
}

function toCard(personalData) {
    return `
    <div>
        ${personalData.textName} ${personalData.textAge}
    </div>
    `
}