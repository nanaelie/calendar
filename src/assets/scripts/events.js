const events = {
    "fr": [
  {"d": 1, "m": 1, "e": "Nouvel An"},
  {"d": 4, "m": 2, "e": "Journée mondiale contre le cancer"},
  {"d": 8, "m": 3, "e": "Journée internationale des droits des femmes"},
  {"d": 20, "m": 3, "e": "Journée internationale du bonheur"},
  {"d": 21, "m": 3, "e": "Journée internationale pour l'élimination de la discrimination raciale"},
  {"d": 22, "m": 3, "e": "Journée mondiale de l'eau"},
  {"d": 7, "m": 4, "e": "Journée mondiale de la santé"},
  {"d": 22, "m": 4, "e": "Journée de la Terre"},
  {"d": 1, "m": 5, "e": "Fête du Travail"},
  {"d": 3, "m": 5, "e": "Journée mondiale de la liberté de la presse"},
  {"d": 5, "m": 6, "e": "Journée mondiale de l'environnement"},
  {"d": 20, "m": 6, "e": "Journée mondiale des réfugiés"},
  {"d": 21, "m": 6, "e": "Journée internationale du yoga"},
  {"d": 30, "m": 7, "e": "Journée internationale de l'amitié"},
  {"d": 9, "m": 8, "e": "Journée internationale des peuples autochtones"},
  {"d": 12, "m": 8, "e": "Journée internationale de la jeunesse"},
  {"d": 8, "m": 9, "e": "Journée internationale de l'alphabétisation"},
  {"d": 15, "m": 9, "e": "Journée internationale de la démocratie"},
  {"d": 21, "m": 9, "e": "Journée internationale de la paix"},
  {"d": 1, "m": 10, "e": "Journée internationale des personnes âgées"},
  {"d": 5, "m": 10, "e": "Journée mondiale des enseignants"},
  {"d": 16, "m": 10, "e": "Journée mondiale de l'alimentation"},
  {"d": 24, "m": 10, "e": "Journée des Nations Unies"},
  {"d": 14, "m": 11, "e": "Journée mondiale du diabète"},
  {"d": 20, "m": 11, "e": "Journée mondiale de l'enfance"},
  {"d": 1, "m": 12, "e": "Journée mondiale de lutte contre le sida"},
  {"d": 10, "m": 12, "e": "Journée des droits de l'homme"}
],
    "en": [
  {"d": 1, "m": 1, "e": "New Year's Day"},
  {"d": 4, "m": 2, "e": "World Cancer Day"},
  {"d": 8, "m": 3, "e": "International Women's Day"},
  {"d": 20, "m": 3, "e": "International Day of Happiness"},
  {"d": 21, "m": 3, "e": "International Day for the Elimination of Racial Discrimination"},
  {"d": 22, "m": 3, "e": "World Water Day"},
  {"d": 7, "m": 4, "e": "World Health Day"},
  {"d": 22, "m": 4, "e": "Earth Day"},
  {"d": 1, "m": 5, "e": "Labor Day / International Workers' Day"},
  {"d": 3, "m": 5, "e": "World Press Freedom Day"},
  {"d": 5, "m": 6, "e": "World Environment Day"},
  {"d": 20, "m": 6, "e": "World Refugee Day"},
  {"d": 21, "m": 6, "e": "International Day of Yoga"},
  {"d": 30, "m": 7, "e": "International Day of Friendship"},
  {"d": 9, "m": 8, "e": "International Day of the World's Indigenous Peoples"},
  {"d": 12, "m": 8, "e": "International Youth Day"},
  {"d": 8, "m": 9, "e": "International Literacy Day"},
  {"d": 15, "m": 9, "e": "International Day of Democracy"},
  {"d": 21, "m": 9, "e": "International Day of Peace"},
  {"d": 1, "m": 10, "e": "International Day of Older Persons"},
  {"d": 5, "m": 10, "e": "World Teachers' Day"},
  {"d": 16, "m": 10, "e": "World Food Day"},
  {"d": 24, "m": 10, "e": "United Nations Day"},
  {"d": 14, "m": 11, "e": "World Diabetes Day"},
  {"d": 20, "m": 11, "e": "Universal Children's Day"},
  {"d": 1, "m": 12, "e": "World AIDS Day"},
  {"d": 10, "m": 12, "e": "Human Rights Day"}
]
};


const $ = e => document.querySelector(e);
const $$ = (e, n = document) => n?.querySelectorAll(e) || [];
const setVar = (k, v, n = document.querySelector('body')) => n?.style?.setProperty('--' + k, v);
const setAttr = (n, k, v) => n?.setAttribute(k, v);
const getAttr = (n, a) => n?.getAttribute(a);
const rmAttr = (n, k, v) => n?.removeAttribute(k, v);
const _new = (e) => document.createElement(e);
const addC = (n, c) => n?.appendChild(c);
const setText = (n, t) => n.textContent = t;

const _new_ = function(a) {
    if (!a.tagName) return null;
    const node = _new(a.tagName);
    if (a.style) {
        let styles = "";
        for (let i in a.style) {
            const regex = /([A-Z]+)/g;
            const k_contains_upper = regex.test(i);
            let k = i;
            let v = a.style[k];
            if (k_contains_upper) {
                const uppers = [];
                const matches = k.matchAll(/([A-Z]+)/g);
                for (let r of matches.toArray()) {
                    k = k.replace(r[0], `-${r[0].toLowerCase()}`);
                }
            }
            
            styles += `${k}: ${v};`;
        }
        setAttr(node, 'style', styles);
    }
    if (a.className) {
        setAttr(node, 'class', a.className);
    }
    if (a.id) {
        setAttr(node, 'id', a.id);
    }
	if (a.text) node.textContent = a.text;
    if (Array.isArray(a.childrens)) {
		for (const child of a.childrens) {
			node.appendChild(child);
		}
	}
    
    return node;
}

const renderTestItems = [];

const n = new Date();
const year = n.getFullYear();
const day = n.getDate();
const month = n.getMonth();

events.fr.forEach((ev) => {
    const k = _new_({
        tagName: 'div',
        style: {
            backgroundColor: '#18181855',
            borderRadius: '8px',
            boxShadow: '0 0 100px 2px rgba(0, 0, 0, .2)',
            flex: 1,
        },
        childrens: [
            _new_({
                tagName: 'div',
                text: `${ev.d}/${ev.m}/${year}`,
                style: {
                    paddingBlock: '.6rem',
                    textAlign: 'center',
                    marginBottom: '4px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    backgroundColor: '#18181822',
                }
            }), 
            _new_({
                tagName: 'div',
                text: `${ev.e}`,
                style: {
                    padding: '1rem',
                }
            })
        ]
    });
    renderTestItems.push(k);
})

masonry({
	col: 4,
	spaceX: 5,
	spaceY: 5,
	renderItems: renderTestItems,
	container: '.main-view',
	debug: true,
});

document.addEventListener('DOMContentLoaded', () => {
    calendar(1);
    let theme = localStorage.getItem('theme') | 'dark';
    
    if ($('body').classList.contains('dark') && theme === 'dark') {
      $('body').classList.remove('dark');
      $('body').classList.add('light');
      $('.moon').style.display = 'none';
      $('.sun').style.display = 'block';
      theme = 'light';
    } else {
      $('body').classList.remove('light');
      $('body').classList.add('dark');
      $('.moon').style.display = 'block';
      $('.sun').style.display = 'none';
      theme = 'dark';
    }
});

$('#date-input').onkeydown = (e) => {
    alert(this.value);
}

$('.header div.actions:last-child button.button').onclick = () => {
    $('.menu').classList.toggle('show-menu');
} 

$('#theme-toggle').addEventListener('click', (e) => {
    let theme = null;
    
    if ($('body').classList.contains('dark')) {
      $('body').classList.remove('dark');
      $('body').classList.add('light');
      $('.moon').style.display = 'none';
      $('.sun').style.display = 'block';
      theme = 'light';
    } else {
      $('body').classList.remove('light');
      $('body').classList.add('dark');
      $('.moon').style.display = 'block';
      $('.sun').style.display = 'none';
      theme = 'dark';
    }
    
    localStorage.setItem('theme', theme);
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
  

