const przyciskMuzyki = document.getElementById("przycisk-muzyki");
const muzyka = document.getElementById("muzyka");

const login = document.getElementById("login");
const strona = document.getElementById("strona");
const input = document.querySelector("#login input");
const przycisk = document.querySelector("#login button");
const podpowiedzi = document.getElementById("podpowiedzi");

let proby = 0;

/* HASLO */

przycisk.addEventListener("click", function() {

    if (input.value === "06102008") {

        login.style.display = "none";
        strona.style.display = "block";

        muzyka.volume = 0.1;
        muzyka.currentTime = 0;

        muzyka.play().catch(function(blad) {
            console.log("Błąd muzyki:", blad);
        });

        przyciskMuzyki.style.display = "block";
        konfettiSerca();

    } else {

        proby++;

        const loginBox = document.querySelector(".login-box");

        loginBox.classList.remove("shake");

        setTimeout(function() {
            loginBox.classList.add("shake");
        }, 10);

        if (proby === 1) {
            podpowiedzi.textContent = "Podpowiedź: Twoje urodziny ❤️";
        }

        if (proby >= 2) {
            podpowiedzi.innerHTML =
                "Podpowiedź: Twoje urodziny ❤️<br>" +
                "Podpowiedź 2: Masz na kartce...";
        }
    }
});

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        przycisk.click();
    }

});

/* BLOKADA FILMÓW */

const dataOdblokowania = new Date("2026-10-11T00:00:00+02:00");
const sekcjaFilmow = document.getElementById("filmy");

function sprawdzBlokadeFilmow() {
    if (new Date() < dataOdblokowania) {
        sekcjaFilmow.classList.add("zablokowane");
    } else {
        sekcjaFilmow.classList.remove("zablokowane");
    }
}

sprawdzBlokadeFilmow();

setInterval(sprawdzBlokadeFilmow, 10000);

/* ZAKŁADKI */

const zakladki = document.querySelectorAll("nav a");
const sekcje = document.querySelectorAll("main section");

sekcje.forEach(function(sekcja) {
    sekcja.style.display = "none";
});

document.getElementById("list").style.display = "flex";
document.querySelector('nav a[href="#list"]').classList.add("active");

zakladki.forEach(function(zakladka) {

    zakladka.addEventListener("click", function(event) {

        event.preventDefault();

        sekcje.forEach(function(sekcja) {
            sekcja.style.display = "none";
        });

        zakladki.forEach(function(link) {
            link.classList.remove("active");
        });

        const wybranaSekcja =
            document.querySelector(zakladka.getAttribute("href"));

        wybranaSekcja.style.display = "flex";
        zakladka.classList.add("active");

    });

});

/* FILMY */

const film = document.getElementById("film");
const przyciskFilmu = document.getElementById("przycisk-filmu");

let behindTheScenes = false;

przyciskFilmu.addEventListener("click", function() {

    film.pause();

    if (behindTheScenes === false) {

        film.src = "filmy/behind.mp4";
        przyciskFilmu.textContent = "Wróć do filmu";

        behindTheScenes = true;

    } else {

        film.src = "filmy/prezent.mp4";
        przyciskFilmu.textContent = "Behind the scenes";

        behindTheScenes = false;
    }

    film.load();
});

/* LICZNIK CZASU */

const dataPoczatkowa = new Date(2025, 2, 3, 0, 0, 0);

function aktualizujLicznik() {

    const teraz = new Date();

    let lata = teraz.getFullYear() - dataPoczatkowa.getFullYear();
    let miesiace = teraz.getMonth() - dataPoczatkowa.getMonth();
    let dni = teraz.getDate() - dataPoczatkowa.getDate();

    if (dni < 0) {
        miesiace--;

        const poprzedniMiesiac =
            new Date(teraz.getFullYear(), teraz.getMonth(), 0);

        dni += poprzedniMiesiac.getDate();
    }

    if (miesiace < 0) {
        lata--;
        miesiace += 12;
    }

    const roznica = teraz - dataPoczatkowa;

    const sekundy = Math.floor(roznica / 1000);
    const minuty = Math.floor(sekundy / 60);
    const godziny = Math.floor(minuty / 60);
    const dniRazem = Math.floor(godziny / 24);
    const tygodnie = Math.floor(dniRazem / 7);
    const miesiaceRazem = lata * 12 + miesiace;

    document.getElementById("glownyLicznik").textContent =
        `${lata} lat, ${miesiace} miesięcy i ${dni} dni`;

    document.getElementById("miesiace").textContent = miesiaceRazem;
    document.getElementById("tygodnie").textContent = tygodnie;
    document.getElementById("dni").textContent = dniRazem;
    document.getElementById("godziny").textContent = godziny;
    document.getElementById("minuty").textContent = minuty;
    document.getElementById("sekundy").textContent = sekundy;
}

aktualizujLicznik();

setInterval(aktualizujLicznik, 1000);

/* STEROWANIE MUZYKA */

przyciskMuzyki.addEventListener("click", function() {

    if (muzyka.paused) {

        muzyka.play();
        przyciskMuzyki.textContent = "🔊";

    } else {

        muzyka.pause();
        przyciskMuzyki.textContent = "🔇";
    }

});

film.addEventListener("play", function() {

    muzyka.pause();
    przyciskMuzyki.textContent = "🔇";

});

film.addEventListener("ended", function() {

    muzyka.play();
    przyciskMuzyki.textContent = "🔊";

});

/* KONFETTI SERDUSZEK */
function konfettiSerca() {
    const serca = ["❤️", "🩷", "💕"];
    for (let i = 0; i < 35; i++) {
        setTimeout(function() {
            const serce = document.createElement("div");
            serce.classList.add("serduszko");
            serce.textContent =
                serca[Math.floor(Math.random() * serca.length)];
            serce.style.left = Math.random() * 100 + "vw";
            serce.style.fontSize = 15 + Math.random() * 20 + "px";
            serce.style.animationDuration =
                2.5 + Math.random() * 2 + "s";
            document.body.appendChild(serce);
            setTimeout(function() {
                serce.remove();
            }, 5000);
        }, i * 70);
    }
}
/* WSPOMNIENIA */

const wspomnienia = {

    gwiazda: {
    tytul: "Gwiazda roku 2026 ⭐",
    data: "Całe życie",

    opis:
        "Obejrzyj teraz specjalnie stworzony album dla solenizantki, zawierający moje ulubione zdjęcia z nią w roli głównej.",

    zdjecia: [
        "zdjecia/elizka1.jpg",
        "zdjecia/elizka2.jpg",
        "zdjecia/elizka3.jpg",
        "zdjecia/elizka4.jpg",
        "zdjecia/elizka5.jpg",
        "zdjecia/elizka6.jpg",
        "zdjecia/elizka7.jpg",
        "zdjecia/elizka8.jpg",
        "zdjecia/elizka9.jpg",
        "zdjecia/elizka10.jpg",
        "zdjecia/elizka11.jpg",
        "zdjecia/elizka12.jpg",
        "zdjecia/elizka13.jpg",
        "zdjecia/elizka14.jpg",
        "zdjecia/elizka15.jpg",
        "zdjecia/elizka16.jpg",
    ]
},

    poczatek: {
        tytul: "Początek",
        data: "03.03.2025",

        opis:
            "Wtedy to się wszystko zaczęło. Kocham wracać myślami do dni, kiedy jeszcze nie byliśmy razem, ponieważ pamiętam, jak dużo rozmyślałem o naszej relacji i o tym jak fajnie by było pójść z tym dalej po półmetku, zwłaszcza kiedy już miałem pewność, że wpadłem ci w oko haha. Do dziś zaskakuje mnie nasze pierwsze spotkanie sam na sam, to jak na początku gadka nam się średnio kleiła, bo nie wiedzieliśmy o czym rozmawiać, a chwile potem siedzieliśmy razem na huśtawkach i prowadziliśmy głęboką rozmowę o naszych przeżyciach, tragediach itd. Niby miałaś być tylko moją parą na półmetek, ale jednak los miał wobec nas inne plany. Nasze początki zaczynały się pięknie i słodko, potem zaczęliśmy mieć pierwsze problemy, większe i mniejsze, które po czasie doprowadziły do zerwania, ale jednak postanowiliśmy do siebie wrócić i wzmocnić naszą więź jeszcze bardziej niż wcześniej, utrzymując ten piękny związek aż do teraz. Fakt, że nie znaliśmy się przed Halloween 2024, ale jednak cały czas byliśmy blisko siebie często ryje mi banie i jestem przeszczęśliwy, że po półmetku spotkaliśmy się jeszcze raz, żeby ''porozmawiać''...",

        zdjecia: [
            "zdjecia/poczatki1.jpg",
            "zdjecia/poczatki2.jpg",
            "zdjecia/poczatki3.jpg",
            "zdjecia/poczatki4.jpg",
            "zdjecia/poczatki5.jpg",
            "zdjecia/poczatki6.jpg",
            "zdjecia/poczatki7.jpg",
        ]
    },


    koncerty: {
        tytul: "Nasze koncerty 🎵",
        data: "31.10.2025, 16.05.2026",

        opis:
            "Bardzo dobrze będe wspominać nasze wspólne koncerty. Przed Matą w Halloween 2025 we Wrocławiu nie byłem jakimś mega napaleńcem na takie eventy, ale podobało mi się to oczywiście, żeby nie było haha, no i pomimo, że nawet nie jestem aż takim fanatykiem maty, to oczywiste, że na początku nie byłem do niego nastawiony. No i w planach miałem na początku wyjść przebrany za Spidermana i nieźle zachlać morde z kolegami na dworze, ale wtedy przychodzi Elizka i mi proponuje zakup biletu i pojechanie z nią, więc to też oczywiste, że w takim razie pojade XD. Ostatecznie ten koncert był niesamowitym doświadczeniem, Mata taki dobry performance odwalił, że musieliśmy pojechać potem w maju na PGE haha. No i ta wyprawa to już w ogóle do końca życia będzie dziwnym wspomnieniem (ale w pozytywnym znaczeniu oczywiście). Że my wytrzymaliśmy tyle godzin w pociągu, męczyli się w kolejce pod stadionem dobrą godzinę, wyskakali się 2 godziny na koncercie i potem jeszcze praktycznie całą noc spędzili na ulicach Warszawy. Pomimo tych wymienionych trudności, jakoś żadna mnie jeszcze ani razu nie zniechęciła do przeżycia takiej historii, ponieważ wiedziałem, że cały czas będziemy razem i oboje doświadczymy tego samego. Nie myślałem nigdy, że mój pierwszy raz w stolicy będzie aż taki zajebisty po prostu. No i jeszcze naszą spontaniczna wyprawa do Lubina pod żabke XD. Jestem pod zajebistym zaskoczeniem, że Okiemu udało się wykręcić taką bibe pod sklepem, niesamowity event. Z tobą znacznie ciekawsze się robią te koncerty, dlatego z niecierpliwością wyczekuje na końcówkę roku, gdzie zaczniemy znowu oglądać razem Harrego Pottera, pojedziemy na jarmark (jeżeli plany wypalą to nawet się uda w Warszawie) no i przeżyjemy dwa kolejne koncerty we Wrocku.", 

        zdjecia: [
            "zdjecia/koncerty1.jpg",
            "zdjecia/koncerty2.jpg",
            "zdjecia/koncerty3.jpg",
            "zdjecia/koncerty4.jpg",
            "zdjecia/koncerty5.jpg",
            "zdjecia/koncerty6.jpg",
            "zdjecia/koncerty7.jpg",
        ]
    },


    usa: {
        tytul: "USA 🗽",
        data: "Lato 2026",

        opis:
            "Jakbym mógł streścić w jednym zdaniu te 3 tygodnie od końca czerwca do lipca: Najlepsze pierwsze wspólne wakacje z Tobą. Rozumiem i też się z tym zgadzam, że te 3 tygodnie to była ostra przesada, ale patrząc na to, jaką wyprawę przeżyliśmy, uważam, że to była idealna odskocznia od naszego normalnego życia w Polszy. Nawiązałem lepszą relacje z Twoją rodziną, odwiedziłem spory kawał Stanów i to w dodatku z Tobą, no i spróbowałem mnóstwo nowych rzeczy. Najbliższy mojemu sercu zostanie moment, przed wylotem Twoich rodziców, jak zaopiekowaliśmy się naszą ś.p. ptaszyną Kryśką, ponieważ czułem się wtedy, jakbyśmy zostali tymczasowymi rodzicami i po tym naprawdę byłem ciekawy jak w przyszłości nam się będzie powodzić z dzieckiem. Ale poza tym, nigdy nie zapomnę naszych rejsów na Calineczce II, jazd Jeepem, wypraw rowerowych po amerykańskich ulichach czy nawet wspólnych zakupach. Chciałbym, żeby nasze przyszłe wspólne wakacje zawsze miały taki urok, jak akurat te w 2026 (tylko oczywiście nie na tak długo, jak nie ma potrzeby haha).",

        zdjecia: [
            "zdjecia/usa1.jpg",
            "zdjecia/usa2.jpg",
            "zdjecia/usa3.jpg",
            "zdjecia/usa4.jpg",
            "zdjecia/usa5.jpg",
            "zdjecia/usa6.jpg",
            "zdjecia/usa7.jpg",
        ]
    },

        podroze: {
        tytul: "Nasze podróże 🚶",
        data: "2025-2026",

        opis:
            "Potrzebuje, żeby nasze podróże we dwójke też miały własną część galerii. Czy to na rowerach czy pieszo, każdy spacer lub przejażdżka nigdy mi się z Tobą nie znudzą. Najbardziej pamiętliwe będzie dla mnie chodzenie w góry, np. fakt, że poszliśmy na Wielką Sowe dwa razy tą samą męczącą ścieżką przez wyciąg w Rościszowie, a i tak stworzyliśmy różne dla obu okazji wspomnienia i szczerze, mógłbym równie dobrze wejść tędy jeszcze z 5 razy i dalej sie dobrze bawić. Potrzebuje więcej takich wypraw i to w dodatku na inne szczyty, dlatego kończ szybko prawko i lecimy na Śnieżke ;). Tak samo mogę powiedzieć o naszych przejażdzkach rowerami w różnorakie miejsca, czy to z miasta do miasta, do sklepu, czy słynną Górę Parkową w Bielawie, do której zawsze wracamy co jakiś czas. Musimy zrobić kiedyś misje na Koci Grzbiet i dopracować nasz grawer na belce. No i nie mogę zapomnieć jeszcze o naszych wycieczkach do Wrocławia, czy Świdnicy. Nasze kinowe czy galeriowe randki też wszystkie były super chwilami. Naprawdę wszędzie gdzie z Tobą nie pójde, to i tak wiem, że nawet jak między nami wyjdzie jakiś kwas, to potem i tak bardzo dobrze spędzamy wspólnie czas w przeróżnych miejscach.   ",

        zdjecia: [
            "zdjecia/podroze1.jpg",
            "zdjecia/podroze2.jpg",
            "zdjecia/podroze3.jpg",
            "zdjecia/podroze4.jpg",
            "zdjecia/podroze5.jpg",
            "zdjecia/podroze6.jpg",

        ]
    },


    eleganciki: {
        tytul: "Eleganciki 👨‍💼",
        data: "2025-2026",

        opis:
            "Uwielbiam okazje, kiedy możemy się razem ładnie odpucować i zaprezentować na różnych imprezach czy wydarzeniach. Ja w koszuli czy garniturze + Ty w swoich cudownych sukienkach to naprawdę najlepsze duo jakie może być. Zwłaszcza ten nasz matching kolorów moich dodatków z twoimi sukienkami, pięknie dopina to, co pokazujemy wspólnie w takich chwilach. Ty na takie okazje jeszcze jesteś zawsze ładnie pomalowana i zadbana, co zawsze mnie rozprasza i skupia na sobie moją pełną uwagę. Uwielbiam potem po prostu przeglądać nasze zdjęcia i się cieszyć ze wspomnień jak tańczymy, pomimo moich sztywnych albo czasem troche chaotycznych ruchów, wiedząc, że przy Tobie wypadam blado, to i tak potrafię ciebie jakoś tym rozbawić, albo uszczęśliwić, albo jak się całujemy pod ścianką, robimy nasze sesje fotobudkowe, czy nawet jak cię trzymam na rękach. Serio, uwielbiam z Tobą chodzić na imprezy.",

        zdjecia: [
            "zdjecia/eleganciki1.jpg",
            "zdjecia/eleganciki2.jpg",
            "zdjecia/eleganciki3.jpg",
            "zdjecia/eleganciki4.jpg",
            "zdjecia/eleganciki5.jpg",
            "zdjecia/eleganciki6.jpg",
            "zdjecia/eleganciki7.jpg",
            "zdjecia/eleganciki8.jpg",
        ]
    },


    pajace: {
        tytul: "Dwa pajace 😝",
        data: "na zawsze 😘",

        opis:
            "Jesteś jedyną osobą, przy której pokazuje całą moją głupią stronę, ponieważ wiem i czuje, że przy Tobie mogę właśnie taki być, w 100% sobą. Uwielbiam również oglądać jak Ciebie łapie taka głupawka i dobrze się bawisz, bo fakt, ze czujesz się przy mnie na tyle komfortowo, że możesz na luzie wypuścić z środka swojego wewnętrznego dzieciaka utwierdza mnie w przekonaniu, że wykonuje dobrą robotę jako chłopak.",

        zdjecia: [
            "zdjecia/pajace1.jpg",
            "zdjecia/pajace2.jpg",
            "zdjecia/pajace3.jpg",
            "zdjecia/pajace4.jpg",
            "zdjecia/pajace6.jpg",
            "zdjecia/pajace7.jpg",
            "zdjecia/pajace8.jpg",
            "zdjecia/pajace9.jpg",
            "zdjecia/pajace10.jpg",
            "zdjecia/pajace11.jpg",
            "zdjecia/pajace12.jpg",
            "zdjecia/pajace13.jpg",
            "zdjecia/pajace14.jpg",
            "zdjecia/pajace15.jpg",
        ]
    }

};

const polaroidy = document.querySelectorAll(
    ".polaroid, .gwiazda-roku"
);

const oknoWspomnienia =
    document.getElementById("okno-wspomnienia");

const zamknijWspomnienie =
    document.getElementById("zamknij-wspomnienie");

const wspomnienieTytul =
    document.getElementById("wspomnienie-tytul");

const wspomnienieData =
    document.getElementById("wspomnienie-data");

const wspomnienieOpis =
    document.getElementById("wspomnienie-opis");

const wspomnienieZdjecia =
    document.getElementById("wspomnienie-zdjecia");


polaroidy.forEach(function(polaroid) {

    polaroid.addEventListener("click", function() {

        const nazwa =
            polaroid.dataset.wspomnienie;

        const wspomnienie =
            wspomnienia[nazwa];

        if (!wspomnienie) {
            return;
        }


        wspomnienieTytul.textContent =
            wspomnienie.tytul;

        wspomnienieData.textContent =
            wspomnienie.data;

        wspomnienieOpis.textContent =
            wspomnienie.opis;


        wspomnienieZdjecia.innerHTML = "";


        wspomnienie.zdjecia.forEach(function(sciezka) {

            const img =
                document.createElement("img");

            img.src = sciezka;

            wspomnienieZdjecia.appendChild(img);

        });


        oknoWspomnienia.style.display = "flex";

    });

});
zamknijWspomnienie.addEventListener("click", function() {

    oknoWspomnienia.style.display = "none";

});


oknoWspomnienia.addEventListener("click", function(event) {

    if (event.target === oknoWspomnienia) {

        oknoWspomnienia.style.display = "none";

    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        oknoWspomnienia.style.display = "none";

    }

});