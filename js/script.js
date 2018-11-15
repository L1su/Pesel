/* --- --- POBIERANIE --- --- */
//Ikona
let ikona = document.getElementsByClassName("form__label--icon")[0];
//Pole informacyjne
let stan = document.getElementsByClassName("aside_stan")[0];
//Pole tekstowe
let inputPesel = document.getElementsByClassName("form__text")[0];

/* --- --- Funckaj SPRAWDZANIA --- --- */
function sprawdz() {
    //wartości wpisane w pole
    let pesel = inputPesel.value;
    //Sprawdzanie czy wszystko zostało wpisane
    let KontrolaPola = isNaN(parseFloat(pesel[0] && pesel[1] && pesel[2] && pesel[3] && pesel[4] && pesel[5] && pesel[6] && pesel[7] && pesel[8] && pesel[9] && pesel[10])); //
    if (KontrolaPola == true) {
        blad("PESEL zawiera niedozwolone znaki lub jest zbyt krótki!");
    }
    // --- Algorytm PESELU
    let algorytm = (1 * pesel[0]) + (3 * pesel[1]) + (7 * pesel[2]) + (9 * pesel[3]) + (1 * pesel[4]) + (3 * pesel[5]) + (7 * pesel[6]) + (9 * pesel[7]) + (1 * pesel[8]) + (3 * pesel[9]);
    let modulo = algorytm % 10;
    //Liczba Kontrolna (ostatnia)
    let kontrolna = 10 - modulo;
    //Wzynaczanie płci
    let plec = pesel[9] % 2;

    // --- Algorytm pełnej daty
    let miesiac = pesel[2] + pesel[3];
    var mss1;
    var rok;
    if (miesiac >= 81 && miesiac <= 92) {
        //1800-1899
        rok = "18";
        miesiace(pesel[2], pesel[3]);
    } else if (miesiac >= 01 && miesiac <= 12) {
        //1900-1999
        rok = "19";
        miesiace(pesel[2], pesel[3]);
    } else if (miesiac >= 21 && miesiac <= 32) {
        //2000-2099
        rok = "20";
        miesiace(pesel[2], pesel[3]);
    } else if (miesiac >= 41 && miesiac <= 52) {
        //2100-2199
        rok = "21";
        miesiace(pesel[2], pesel[3]);
    } else {
        //2200-2299
        rok = "22";
        miesiace(pesel[2], pesel[3]);
    }

    //miesiace zalezne od roku
    function miesiace(msc1, msc2) {
        if (msc1 == 8 || msc1 == 0 || msc1 == 2 || msc1 == 4 || msc1 == 6) {
            mss1 = 0;
            //document.write("0");
            miesiac = mss1 + msc2;
        } else {
            mss1 = 1;
            //document.write("1");
            miesiac = mss1 + msc2;
        }
    }

    //         -----DZIEn-------    .MIESIAC.    ------PELNY ROK------
    let data = pesel[4] + pesel[5] + "." + miesiac + "." + rok + pesel[0] + pesel[1];
    let ObecnyData = new Date();
    let ObecnyRok = ObecnyData.getFullYear();
    let Lata = ObecnyRok - (rok + pesel[0] + pesel[1]);



    // --- Algorytm POPRAWNOŚCI
    //poprawny
    if (pesel[10] == kontrolna && pesel[0] !== " " && pesel[1] !== " ") {
        ikona.classList.remove("icon-user");
        ikona.classList.add("icon-ok");
        ikona.classList.remove("icon-cancel");
        stan.classList.add("aside_stan--poprawny");
        stan.classList.remove("aside_stan--NiePoprawny");
        //plec
        var plecHTML;
        if (plec == 0) {
            plecHTML = "<i class='icon-female'></i>Płeć: Kobieta";
        } else {
            plecHTML = "<i class='icon-male'></i>Płeć: Mężczyzna";
        }

        //WYNIK - TREŚĆ
        stan.innerHTML = "<h3 class='aside_tytul--poprawny'>Szczegóły:</h3><span class='aside_stan--urodzenie'><i class='icon-birthday'></i>Data urodzenia: " + data + " </span><span class='aside_stan--lata'><i class='icon-calendar-empty'></i>Wiek ok.: " + Lata + "</span><span class='aside_stan--plec'>" + plecHTML + "</span>";
    }
    //niepoprawny
    else {
        if (pesel[10] != null) {
            blad("PESEL niepoprawny!");
        }
    }

    function blad(napis) {
        ikona.classList.remove("icon-user");
        ikona.classList.add("icon-cancel");
        ikona.classList.remove("icon-ok");
        stan.classList.remove("aside_stan--poprawny");
        stan.classList.add("aside_stan--NiePoprawny");
        //tresc
        stan.innerHTML = napis;
    }
}


/* --- --- PRZYCISK RESET --- --- */
function resett() {
    ikona.classList.add("icon-user");
    ikona.classList.remove("icon-cancel");
    ikona.classList.remove("icon-ok");
    stan.classList.remove("aside_stan--poprawny");
    stan.classList.remove("aside_stan--NiePoprawny");
}

/* --- --- UKRYWANIE/POKAZYWANIE --- --- */
function ukrywanie() {
    let ukryj = inputPesel.getAttribute("type");
    if (ukryj == "text") {
        inputPesel.setAttribute("type", "password");
        document.getElementsByClassName("form__button--ukryj")[0].classList.add("form__button--pokaz");
        document.getElementsByClassName("form__button--pokaz")[0].innerHTML = "Pokaż";
    } else {
        inputPesel.setAttribute("type", "text");
        document.getElementsByClassName("form__button--ukryj")[0].classList.remove("form__button--pokaz");
        document.getElementsByClassName("form__button--ukryj")[0].innerHTML = "Ukryj";

    }
}

/* --- --- ENTER  --- --- */
function NoEnter() {
    return !(window.event && window.event.keyCode == 13); 
}
