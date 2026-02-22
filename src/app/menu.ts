export interface MenuItem {
    id: string;
    name: string;
    nameEn?: string;
    price: number | string;
    description?: string;
    descriptionEn?: string;
    image?: string;
}

export interface MenuCategory {
    id: string;
    title: string;
    titleEn?: string;
    items: MenuItem[];
}

export interface Bundle {
    name: string;
    nameEn?: string;
    description: string;
    descriptionEn?: string;
    price: number;
}

export interface Studio {
    id: string;
    name: string;
    description: string;
    image: string;
    color: string;
}

export interface DeliveryPlatform {
    id: string;
    name: string;
    taglinePL: string;
    taglineEN: string;
    color: string;
    textColor: string;
    href: string; // TODO: replace '#' with real delivery platform URL
}

export const MENU: MenuCategory[] = [
    {
        id: "burgery",
        title: "BURGERY 100% wołowina",
        titleEn: "100% BEEF BURGERS",
        items: [
            {
                id: "b1", name: "Standard", price: 28,
                description: "wołowina, sałata, ogórek, cebula, sos",
                descriptionEn: "beef, lettuce, cucumber, onion, sauce"
            },
            {
                id: "b2", name: "Serowy", nameEn: "Cheesy", price: 30,
                description: "wołowina, ser, sałata, pomidor, ogórek, cebula, sos",
                descriptionEn: "beef, cheese, lettuce, tomato, cucumber, onion, sauce"
            },
            {
                id: "b3", name: "Kawał byka", nameEn: "Big Bull", price: 40,
                description: "2× wołowina, 2× ser, boczek, sałata, pomidor, ogórek, cebula, sos",
                descriptionEn: "2× beef, 2× cheese, bacon, lettuce, tomato, cucumber, onion, sauce",
                image: "/panel_classic.png"
            },
            {
                id: "b4", name: "GOAT BBQ", price: 32,
                description: "wołowina, ser kozi, cebula marynowana, sos BBQ",
                descriptionEn: "beef, goat cheese, pickled onion, BBQ sauce",
                image: "/panel_black.png"
            },
            {
                id: "b5", name: "Śniadaniowy", nameEn: "Breakfast", price: 34,
                description: "wołowina, jajko sadzone, boczek, cebula, sałata, sos",
                descriptionEn: "beef, fried egg, bacon, onion, lettuce, sauce"
            },
            {
                id: "b6", name: "Zkurczybyq", price: 32,
                description: "wołowina, ser, sałata, jalapeño, ogórek, cebula, sos",
                descriptionEn: "beef, cheese, lettuce, jalapeño, cucumber, onion, sauce",
                image: "/panel_neon.png"
            },
            {
                id: "b7", name: "Truffle Hunter", price: 42,
                description: "wołowina, ser truflowy, grzyby shiitake, rucola, aioli truflowe",
                descriptionEn: "beef, truffle cheese, shiitake mushrooms, arugula, truffle aioli",
                image: "/panel_black.png"
            },
            {
                id: "b8", name: "Smoky Inferno", price: 36,
                description: "wołowina, boczek wędzony, cheddar, jalapeño, sos chipotle",
                descriptionEn: "beef, smoked bacon, cheddar, jalapeño, chipotle sauce",
                image: "/panel_neon.png"
            },
            {
                id: "b9", name: "The Godfather", price: 49,
                description: "3× wołowina, 3× ser, boczek, jajko sadzone, prażona cebulka, sos secret",
                descriptionEn: "3× beef, 3× cheese, bacon, fried egg, crispy onion, secret sauce",
                image: "/panel_classic.png"
            },
        ]
    },
    {
        id: "kura-burgery",
        title: "KURA BURGERY",
        titleEn: "CHICKEN BURGERS",
        items: [
            {
                id: "k1", name: "Zwykły", nameEn: "Classic", price: 23,
                description: "kurczak, sałata, ogórek, pomidor, cebula, sos",
                descriptionEn: "chicken, lettuce, cucumber, tomato, onion, sauce"
            },
            {
                id: "k2", name: "Niezwykły", nameEn: "Loaded", price: 27,
                description: "kurczak, ser, boczek, sałata, pomidor, ogórek, cebula, sos",
                descriptionEn: "chicken, cheese, bacon, lettuce, tomato, cucumber, onion, sauce"
            },
            {
                id: "k3", name: "Nashville Hot", price: 30,
                description: "kurczak crispy, kapusta, ogórki kiszone, sos nashville",
                descriptionEn: "crispy chicken, coleslaw, pickles, nashville hot sauce",
                image: "/panel_kura.png"
            },
            {
                id: "k4", name: "Korean BBQ", price: 32,
                description: "kurczak, sos gochujang, kimchi, sałata, majonez sezamowy",
                descriptionEn: "chicken, gochujang sauce, kimchi, lettuce, sesame mayo",
                image: "/panel_kura.png"
            },
        ]
    },
    {
        id: "veggie",
        title: "VEGGIE",
        titleEn: "VEGGIE",
        items: [
            {
                id: "v1", name: "Plant Studio", price: 29,
                description: "patty roślinny, sałata, pomidor, ogórek, cebula, sos wegański",
                descriptionEn: "plant-based patty, lettuce, tomato, cucumber, onion, vegan sauce",
                image: "/panel_neon.png"
            },
            {
                id: "v2", name: "Portobello", price: 27,
                description: "grzyb portobello, ser kozi, rucola, pomidor, sos ziołowy",
                descriptionEn: "portobello mushroom, goat cheese, arugula, tomato, herb sauce"
            },
        ]
    },
    {
        id: "zapiekanki",
        title: "ZAPIEKANKI",
        titleEn: "OPEN SANDWICHES",
        items: [
            {
                id: "z1", name: "Zwykła", nameEn: "Classic", price: 13,
                description: "ser, pieczarki, sos do wyboru",
                descriptionEn: "cheese, mushrooms, sauce of choice"
            },
            {
                id: "z2", name: "Mięsna", nameEn: "Meaty", price: 16,
                description: "ser, pieczarki, szynka / salami / boczek, sos",
                descriptionEn: "cheese, mushrooms, ham / salami / bacon, sauce"
            },
            {
                id: "z3", name: "Warzywna", nameEn: "Veggie", price: 18,
                description: "ser, pieczarki, ogórek, pomidor, sos",
                descriptionEn: "cheese, mushrooms, cucumber, tomato, sauce"
            },
            {
                id: "z4", name: "Na wypasie", nameEn: "Loaded", price: 20,
                description: "ser, pieczarki, szynka, salami, boczek, prażona cebulka, sos",
                descriptionEn: "cheese, mushrooms, ham, salami, bacon, crispy onion, sauce"
            },
            {
                id: "z5", name: "Truflowa", nameEn: "Truffle", price: 22,
                description: "ser truflowy, pieczarki, prażona cebulka, rucola, sos ziołowy",
                descriptionEn: "truffle cheese, mushrooms, crispy onion, arugula, herb sauce"
            },
        ]
    },
    {
        id: "kurczaki",
        title: "KURCZAKI",
        titleEn: "CHICKEN SIDES",
        items: [
            {
                id: "c1", name: "Nuggetsy", nameEn: "Nuggets", price: "14 / 22",
                description: "6 / 12 szt.", descriptionEn: "6 / 12 pcs."
            },
            {
                id: "c2", name: "Stripsy", nameEn: "Strips", price: "15 / 23",
                description: "3 / 6 szt.", descriptionEn: "3 / 6 pcs."
            },
        ]
    },
    {
        id: "dodatki",
        title: "DODATKI",
        titleEn: "SIDES",
        items: [
            { id: "d1", name: "Frytki małe / duże", nameEn: "Fries small / large", price: "6 / 9" },
            { id: "d2", name: "Frytki z batata", nameEn: "Sweet Potato Fries", price: 15 },
            { id: "d3", name: "Krążki cebulowe", nameEn: "Onion Rings", price: 12 },
            { id: "d4", name: "Colesław", price: 6 },
            { id: "d5", name: "Sosy", nameEn: "Sauces", price: 2.50 },
        ]
    },
    {
        id: "na-zimno",
        title: "NA ZIMNO",
        titleEn: "COLD DRINKS",
        items: [
            {
                id: "nz1", name: "Napoje 0,5 l / 0,85 l", nameEn: "Soft Drinks 0.5 l / 0.85 l",
                price: "12 / 14", description: "Coca Cola, Fanta, Sprite", descriptionEn: "Coca Cola, Fanta, Sprite"
            },
            {
                id: "nz2", name: "Fuze Tea 0,5 l", price: 10,
                description: "cytryna, brzoskwinia, zielony", descriptionEn: "lemon, peach, green"
            },
            {
                id: "nz3", name: "Soki 0,3 l / 1 l", nameEn: "Juices 0.3 l / 1 l",
                price: "9 / 14", description: "pomarańczowy, jabłko", descriptionEn: "orange, apple"
            },
            {
                id: "nz4", name: "Woda 0,5 l", nameEn: "Water 0.5 l",
                price: 8, description: "gazowana / niegazowana", descriptionEn: "sparkling / still"
            },
            { id: "nz5", name: "Lemoniada 0,3 l", nameEn: "Lemonade 0.3 l", price: 7 },
        ]
    },
    {
        id: "na-cieplo",
        title: "NA CIEPŁO",
        titleEn: "HOT DRINKS",
        items: [
            { id: "nc1", name: "Herbata / Herbata Zimowa", nameEn: "Tea / Winter Tea", price: "7 / 12" },
            { id: "nc2", name: "Espresso", price: 8 },
            { id: "nc3", name: "Cappuccino", price: 12 },
            { id: "nc4", name: "Cafe latte", price: 12 },
            { id: "nc5", name: "Flat white", price: 13 },
            { id: "nc6", name: "Americano", price: 10 },
            { id: "nc7", name: "Doppio", price: 10 },
            { id: "nc8", name: "Matcha latte", price: 14 },
            { id: "nc9", name: "Chai latte", price: 13 },
        ]
    },
    {
        id: "desery",
        title: "DESERY",
        titleEn: "DESSERTS",
        items: [
            {
                id: "des1", name: "Brownie", price: 12,
                description: "domowe brownie z lodami waniliowymi",
                descriptionEn: "homemade brownie with vanilla ice cream"
            },
            {
                id: "des2", name: "Lody / 2 szt.", nameEn: "Ice Cream / 2 scoops", price: 8,
                description: "waniliowe, czekoladowe, truskawkowe",
                descriptionEn: "vanilla, chocolate, strawberry"
            },
            {
                id: "des3", name: "Cheesecake", price: 14,
                description: "sernik nowojorski z sosem jagodowym",
                descriptionEn: "New York cheesecake with blueberry sauce"
            },
            {
                id: "des4", name: "Waffle", price: 16,
                description: "gofr z owocami i bitą śmietaną",
                descriptionEn: "waffle with fresh fruit and whipped cream"
            },
        ]
    },
];

export const BUNDLES: Bundle[] = [
    {
        name: "Mały zestaw", nameEn: "Small Combo",
        description: "małe frytki + lemoniada/herbata + colesław",
        descriptionEn: "small fries + lemonade/tea + coleslaw",
        price: 10
    },
    {
        name: "Duży zestaw", nameEn: "Large Combo",
        description: "duże frytki + lemoniada/herbata + colesław",
        descriptionEn: "large fries + lemonade/tea + coleslaw",
        price: 12
    },
    {
        name: "Śniadaniowy", nameEn: "Breakfast Set",
        description: "frytki małe + kawa + colesław",
        descriptionEn: "small fries + coffee + coleslaw",
        price: 15
    },
    {
        name: "VIP Set",
        description: "frytki z batata + napój + colesław + krążki cebulowe",
        descriptionEn: "sweet potato fries + drink + coleslaw + onion rings",
        price: 18
    },
];

// TODO: Replace '#' hrefs with real delivery platform profile URLs when available.
export const DELIVERY_LINKS: DeliveryPlatform[] = [
    {
        id: 'pyszne',
        name: 'Pyszne.pl',
        taglinePL: 'Zamów na Pyszne.pl — szybka dostawa do drzwi.',
        taglineEN: 'Order on Pyszne.pl — fast delivery to your door.',
        color: '#e8481c',
        textColor: '#ffffff',
        href: '#', // TODO: https://www.pyszne.pl/menu/...
    },
    {
        id: 'ubereats',
        name: 'Uber Eats',
        taglinePL: 'Zamów na Uber Eats — śledź dostawę na żywo.',
        taglineEN: 'Order on Uber Eats — track your delivery live.',
        color: '#06C167',
        textColor: '#ffffff',
        href: '#', // TODO: https://www.ubereats.com/store/...
    },
    {
        id: 'glovo',
        name: 'Glovo',
        taglinePL: 'Zamów na Glovo — ekspresowa dostawa w miasto.',
        taglineEN: 'Order on Glovo — express delivery across the city.',
        color: '#FFC244',
        textColor: '#000000', // dark text required — yellow background
        href: '#', // TODO: https://glovoapp.com/pl/...
    },
];

export const STUDIOS: Studio[] = [
    {
        id: "s1",
        name: "BLACK STUDIO",
        description: "Premium black bun with aged cheddar & crimson glaze.",
        image: "/panel_black.png",
        color: "var(--crimson)"
    },
    {
        id: "s2",
        name: "NEON STUDIO",
        description: "Vibrant explosion of greens & spicy jalapeños.",
        image: "/panel_neon.png",
        color: "#ff00ff"
    },
    {
        id: "s3",
        name: "CLASSIC STUDIO",
        description: "Double beef stack with caramelized perfection.",
        image: "/panel_classic.png",
        color: "var(--accent)"
    },
    {
        id: "s4",
        name: "KURA STUDIO",
        description: "Crispy chicken heritage with signature white sauce.",
        image: "/panel_kura.png",
        color: "#ffa500"
    }
];
