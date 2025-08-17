const events = {
    "fr": {
        "1": [{"d": 1, "e": "Bonne année !"}],
        "2": [{"d": 4, "e": "Journée mondiale contre le cancer"}],
        "3": [{"d": 8, "e": "Bonne journée internationale des droits des femmes"},{"d": 20, "e": "Journée internationale du bonheur"},{"d": 21, "e": "Journée internationale pour l'élimination de la discrimination raciale"},{"d": 22, "e": "Journée mondiale de l'eau"}],
        "4": [{"d": 7, "e": "Journée mondiale de la santé"},{"d": 22, "e": "Journée de la Terre"}],
        "5": [{"d": 1, "e": "Bonne fête du Travail"},{"d": 3, "e": "Journée mondiale de la liberté de la presse"}],
        "6": [{"d": 5, "e": "Journée mondiale de l'environnement"},{"d": 20, "e": "Journée mondiale des réfugiés"},{"d": 21, "e": "Journée internationale du yoga"}],
        "7": [{"d": 30, "e": "Journée internationale de l'amitié"}],
        "8": [{"d": 9, "e": "Journée internationale des peuples autochtones"},{"d": 12, "e": "Journée internationale de la jeunesse"}],
        "9": [{"d": 8, "e": "Journée internationale de l'alphabétisation"},{"d": 15, "e": "Journée internationale de la démocratie"},{"d": 21, "e": "Journée internationale de la paix"}],
        "10": [{"d": 1, "e": "Journée internationale des personnes âgées"},{"d": 5, "e": "Journée mondiale des enseignants"},{"d": 16, "e": "Journée mondiale de l'alimentation"},{"d": 24, "e": "Journée des Nations Unies"}],
        "11": [{"d": 14, "e": "Journée mondiale du diabète"},{"d": 20, "e": "Journée mondiale de l'enfance"}],
        "12": [{"d": 1, "e": "Journée mondiale de lutte contre le sida"},{"d": 10, "e": "Journée des droits de l'homme"}]
    },
    "en": {
        "1": [{"d": 1, "e": "Happy New Year"}],
        "2": [{"d": 4, "e": "World Cancer Day"}],
        "3": [{"d": 8, "e": "Happy International Women's Day"},{"d": 20, "e": "International Day of Happiness"},{"d": 21, "e": "International Day for the Elimination of Racial Discrimination"},{"d": 22, "e": "World Water Day"}],
        "4": [{"d": 7, "e": "World Health Day"},{"d": 22, "e": "Earth Day"}],
        "5": [{"d": 1, "e": "Happy Labor Day"},{"d": 3, "e": "World Press Freedom Day"}],
        "6": [{"d": 5, "e": "World Environment Day"},{"d": 20, "e": "World Refugee Day"},{"d": 21, "e": "International Day of Yoga"}],
        "7": [{"d": 30, "e": "International Day of Friendship"}],
        "8": [{"d": 9, "e": "International Day of the World's Indigenous Peoples"},{"d": 12, "e": "International Youth Day"}],
        "9": [{"d": 8, "e": "International Literacy Day"},{"d": 15, "e": "International Day of Democracy"},{"d": 21, "e": "International Day of Peace"}],
        "10": [{"d": 1, "e": "International Day of Older Persons"},{"d": 5, "e": "World Teachers' Day"},{"d": 16, "e": "World Food Day"},{"d": 24, "e": "United Nations Day"}],
        "11": [{"d": 14, "e": "World Diabetes Day"},{"d": 20, "e": "Universal Children's Day"}],
        "12": [{"d": 1, "e": "World AIDS Day"},{"d": 10, "e": "Human Rights Day"}]
    }
};

const messages = [
    "Passe une excellente journée !",
    "Bonne chance pour aujourd'hui !",
    "Que cette journée soit productive !",
    "Profite bien de ta journée !",
    "N'oublie pas de sourire aujourd'hui !",
    "Fais de ton mieux et reste positif !",
    "Chaque jour est une nouvelle opportunité !",
    "Garde le sourire et avance !",
    "Que cette journée t’apporte de belles surprises !",
    "Reste motivé et concentré !",
    "Une belle journée t’attend, profite-en !",
    "Fais quelque chose de gentil pour toi aujourd’hui !",
    "Les petites victoires font les grands succès !",
    "Commence la journée avec énergie et optimisme !",
    "Souviens-toi : tu es capable de grandes choses !"
];

const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

$('header > div.actions:first-child > button:first-child').onclick = () => {
	window.api.closeApp();
};
$('header > div.actions:first-child > button:last-child').onclick = () => {
	window.api.minimizeApp();
};

function sendNotification(e, t, b) {
    window.api.showNotification(e, t, b);
}

const calendrier = $(".calendrier");
const jours = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

function joursSemaine() {
    for (let i = 0; i < jours.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "jour");
        div.textContent = jours[i];
        calendrier.appendChild(div);
    }
}
joursSemaine();

let event = 1;
let mois = 1;
let moisStorage = 0;

function calendar(mois) {
    calendrier.setAttribute('data-id', mois);
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + mois;
    var lastMonth = month - 1;
    moisStorage = month;
    
    var days = new Date(year, month, 0).getDate();
    var jour = new Date(year, month - 1, 0).getDay() + 1;
    var lastMonthDays = new Date(year, lastMonth, 0).getDate();
    var jourActu = now.getDate();
    
    let mois_str = moi(month);
    mois_str = mois_str[0].toUpperCase() + mois_str.substr(1, mois_str.length - 1);
    
    $('.date span').textContent = mois_str + " " + year;

    for (let i = 1; i <= days + jour - 1; i++) {
        const div = document.createElement("div");
        
        if (i >= jour) {
            div.setAttribute("class", "jouri");
            div.textContent = i - jour + 1;
            const ndate = new Date(year, month - 1, i - jour + 1);
            if ((i - jour + 1) == jourActu) {
                div.classList.add("now");
            }
            const ev = getEventMessage(ndate);
            if (ev) {
                const sub = document.createElement('sub');
                sub.classList.add('event');
                div.appendChild(sub);
                div.classList.add('event-node');
                div.setAttribute('title', ev);
            }
            /*if ((i - jour + 1) == 22) {
                const sub = document.createElement('sub');
                sub.classList.add('event');
                div.appendChild(sub);
                div.classList.add('event-node');
            }*/
        }
        calendrier.appendChild(div);
    }
}

setInterval(() => {
    var now = new Date();
    const dateDuJour = $(".date h3");
    var j = now.getDay();
    var ji = now.getDate();
    var m = now.getMonth() + 1;
    var a = now.getFullYear();

    ji < 10 ? ji = '0' + ji : ji;

    dateDuJour.textContent = jou(j) + " " + ji + " " + moi(m) + " " + a;
}, 1000);

function jou(j) {
    switch (j) {
        case 1: j = "Lundi";break;
        case 2: j = "Mardi"; break;
        case 3: j = "Mercredi"; break;
        case 4: j = "Jeudi"; break;
        case 5: j = "Vendredi"; break;
        case 6: j = "Samedi"; break;
        case 0: j = "Dimanche"; break;
    }
  return j;
}

function moi(m) {
    switch (m) {
        case 1: m = "janvier"; break; 
        case 2: m = "février"; break;
        case 3: m = "mars"; break;
        case 4: m = "avril"; break;
        case 5: m = "mai"; break;
        case 6: m = "juin"; break;
        case 7: m = "juillet"; break;
        case 8: m = "août"; break;
        case 9: m = "septembre"; break;
        case 10: m = "octobre"; break;
        case 11: m = "novembre"; break;
        case 12: m = "décembre"; break;
    }
    return m;
}

function applyTheme(theme) {
    const body = $('body');
    if (theme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        $('.moon').style.display = 'none';
        $('.sun').style.display = 'block';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        $('.moon').style.display = 'block';
        $('.sun').style.display = 'none';
    }
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    calendar(2);
    
    let saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);
    
    $('#notif-switch').checked = true;
    
    const today = new Date();
    const year  = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // les mois sont 0-indexés
    const day   = String(today.getDate()).padStart(2, '0');

    const formatted = `${year}-${month}-${day}`;
    $('#date-input').value = formatted;
});

$('#date-input').onchange = (e) => {
    return;
}

function getRandomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}

let notificationSent = false;

setInterval(() => {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    if (hours === 7 && minutes === 0 && seconds === 0) {
        if (!notificationSent) {
            sendNotification('great', 'Bonjour', getRandomMessage());
            notificationSent = true;
        }
    } else {
        notificationSent = false;
    }

    $('.hours-numeric').textContent = hours < 10 ? `0${hours}` : hours;
    $('.minutes-numeric').textContent = minutes < 10 ? `0${minutes}` : minutes;
    $('.seconds-numeric').textContent = seconds < 10 ? `0${seconds}` : seconds;

    let rotate_hours = mapValue(hours, 0, 12, 0, 360);
    let rotate_minutes = mapValue(minutes, 0, 60, 0, 360);
    let rotate_seconds = mapValue(seconds, 0, 60, 0, 360);
    
    $('.hours').style.transform = `rotate(${rotate_hours}deg)`;
    $('.minutes').style.transform = `rotate(${rotate_minutes}deg)`;
    $('.seconds').style.transform = `rotate(${rotate_seconds}deg)`;
}, 0);

function mapValue(value, min_1, max_1, min_2, max_2) {
    return (value * max_2) / max_1;
}

$('.header div.actions:last-child button.button').onclick = () => {
    $('.menu').classList.toggle('show-menu');
} 

$('#theme-toggle').addEventListener('click', (e) => {
    let current = $('body').classList.contains('dark') ? 'dark' : 'light';
    let next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
});

$('#date-input').addEventListener('change', (e) => {
    const d = this.value;
    console.log("go to date:", d);
});

$('#notif-switch').addEventListener('change', (e) => {
    if (this.checked) {
      console.log("notifications ON");
    } else {
      console.log("notifications OFF");
    }
  });
  
$('.left').onclick = function() {
    return;
    let id = Number($('.calendrier').dataset.id);
    if (id !== null) {
        calendar(id--);
    }
}

$('.right').onclick = function() {
    return;
    let id = Number($('.calendrier').dataset.id);
    if (id !== null) {
        calendar(id++);
    }
}

function getEventMessage(date) {
  let day, month;
  
  if (date instanceof Date) {
    day = date.getDate();
    month = date.getMonth() + 1;
  } else if (date.d && date.m) {
    day = date.d;
    month = date.m;
  } else {
    throw new Error("Date invalide, utilisez un objet Date ou {d,m}");
  }

  if (events.fr[month]) {
    const ev = events.fr[month].find(e => e.d === day);
    if (ev) return ev.e;
  }
  return null;
}

