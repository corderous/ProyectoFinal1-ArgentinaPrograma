/*===================== SHOW MENU ==============================*/

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    //Validar que la variable existe
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            //agregamos el monstrarMenu class al div con la etiqueta de nav_menu class
            nav.classList.toggle('show-menu')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/*===================== REMOVE MENU MOBILE ==============================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // cuando hacemos click en cada nav__link, removemos el show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*===================== SCROLL SECTIONS ACTIVE LINK ==============================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a [href*=' + sectionId + ']').classList.remove('active-link')
        }

    })
}
window.addEventListener('scroll', scrollActive)

/*===================== SHOW SCROLL TOP ==============================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    //Cuando el scroll es mas alto que 200 viewport de altura, agregar la clase show-scroll
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollTop)



/*===================== DARK LIGHT THEME ==============================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

//Topic seleccionado previamente (si el usuario eligio)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//obtenemos el tema actual que la interface tiene por validacion la clase dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

//validamos si el usuario previamente selecciono un topic
if (selectedTheme) {
    //si la validacion es completada, preguntamos cual fue el issue para conocer si activamos o desativamos el dark-theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

//activar o desactivar el tema manualmente con el boton
themeButton.addEventListener('click', () => {
    //agregar o remover el dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
        //Guardamos el tema y el icono actual que el usuario selecciono
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



/*===================== REDUCIR EL TAMAÑO E IMPRIMIR EN UNA HOJA A4 ==============================*/
function scaleCV() {
    document.body.classList.add('scale-cv')
}




/*===================== REMOVER EL TAMAÑO REDUCIDO CUANDO EL CV ES DESCARGADO ==============================*/
function removeScale() {
    document.body.classList.remove('scale-cv')
}



/*===================== GENERAR PDF ==============================*/
//area para generar pdf
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

//opciones html2pdf
let opt = {
    margin: 0,
    filename: 'CV Nahuel Corvlan.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
}


//Funcion para llamar las opciones areaCv y Html2pdf
function generateResume() {
    html2pdf(areaCv, opt)
}



//Cuando damos click, este ejecuta 3 funciones
resumeButton.addEventListener('click', () => {
    // 1. La clase .scale-cv es agregada a el body, donde reduce el tamaño de los elementos
    scaleCV()

    //2. El PDF es generado
    generateResume()

    //3. La clase .scale-cv es removida del body luego de 5 segundos para regresar al tamaño normal
    setTimeout(removeScale, 5000)
})