export interface MenuItem {
    id: string;
    name: string;
    price: number | string;
    description?: string;
}

export interface MenuCategory {
    title: string;
    items: MenuItem[];
}

export const MENU: MenuCategory[] = [
    {
        title: "BURGERY 100% wołowina",
        items: [
            { id: "b1", name: "Standard", price: 28, description: "wołowina, sałata, ogórek, cebula, sos" },
            { id: "b2", name: "Serowy", price: 30, description: "wołowina, ser, sałata, pomidor, ogórek, cebula, sos" },
            { id: "b3", name: "Kawał byka", price: 40, description: "2× wołowina, 2× ser, boczek, sałata, pomidor, ogórek, cebula, sos" },
            { id: "b4", name: "GOAT BBQ", price: 32, description: "wołowina, ser kozi, cebula marynowana, sos" },
            { id: "b5", name: "Śniadaniowy", price: 34, description: "wołowina, jajko sadzone, boczek, cebula, sałata, sos" },
            { id: "b6", name: "Zkurczybyq", price: 32, description: "wołowina, ser, sałata, jalapeño, ogórek, cebula, sos" },
        ]
    },
    {
        title: "KURA BURGERY",
        items: [
            { id: "k1", name: "Zwykły", price: 23, description: "kurczak, sałata, ogórek, pomidor, cebula, sos" },
            { id: "k2", name: "Niezwykły", price: 27, description: "kurczak, ser, boczek, sałata, pomidor, ogórek, cebula, sos" },
        ]
    },
    {
        title: "ZAPIEKANKI",
        items: [
            { id: "z1", name: "Zwykła", price: 13, description: "ser, pieczarki, sos do wyboru" },
            { id: "z2", name: "Mięsna", price: 16, description: "ser, pieczarki, szynka / salami / boczek, sos" },
            { id: "z3", name: "Warzywna", price: 18, description: "ser, pieczarki, ogórek, pomidor, sos" },
            { id: "z4", name: "Na wypasie", price: 20, description: "ser, pieczarki, szynka, salami, boczek, prażona cebulka, sos" },
        ]
    },
    {
        title: "KURCZAKI",
        items: [
            { id: "c1", name: "Nuggetsy", price: "14 / 22", description: "6 / 12 szt." },
            { id: "c2", name: "Stripsy", price: "15 / 23", description: "3 / 6 szt." },
        ]
    },
    {
        title: "DODATKI",
        items: [
            { id: "d1", name: "Frytki małe / duże", price: "6 / 9" },
            { id: "d2", name: "Frytki z batata", price: 15 },
            { id: "d3", name: "Krążki cebulowe", price: 12 },
            { id: "d4", name: "Colesław", price: 6 },
            { id: "d5", name: "Sosy", price: 2.50 },
        ]
    },
    {
        title: "NA ZIMNO",
        items: [
            { id: "nz1", name: "Napoje 0,5 l / 0,85 l", price: "12 / 14", description: "Coca Cola, Fanta, Sprite" },
            { id: "nz2", name: "Fuze Tea 0,5 l", price: 10, description: "cytryna, brzoskwinia, zielony" },
            { id: "nz3", name: "Soki 0,3 l / 1 l", price: "9 / 14", description: "pomarańczowy, jabłko" },
            { id: "nz4", name: "Woda 0,5 l", price: 8, description: "gazowana / niegazowana" },
            { id: "nz5", name: "Lemoniada 0,3 l", price: 7 },
        ]
    },
    {
        title: "NA CIEPŁO",
        items: [
            { id: "nc1", name: "Herbata / Herbata Zimowa", price: "7 / 12" },
            { id: "nc2", name: "Espresso", price: 8 },
            { id: "nc3", name: "Cappuccino", price: 12 },
            { id: "nc4", name: "Cafe latte", price: 12 },
            { id: "nc5", name: "Flat white", price: 13 },
            { id: "nc6", name: "Americano", price: 10 },
            { id: "nc7", name: "Doppio", price: 10 },
        ]
    }
];

export const BUNDLES = [
    { name: "Mały zestaw", description: "małe frytki + lemoniada/herbata + colesław", price: 10 },
    { name: "Duży zestaw", description: "duże frytki + lemoniada/herbata + colesław", price: 12 },
];

export const STUDIOS = [
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
        description: "Vibrant explosion of greens & spicy jalapenos.",
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
