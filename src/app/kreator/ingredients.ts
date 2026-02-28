export interface Ingredient {
    id: string
    name: string
    nameEn: string
    emoji: string
    price: number
    kcal: number
    color: string // CSS color for the stack layer
    category: IngredientCategory
    description?: string
}

export type IngredientCategory =
    | 'bun'
    | 'patty'
    | 'cheese'
    | 'veggie'
    | 'sauce'
    | 'extra'

export const INGREDIENT_CATEGORIES: { id: IngredientCategory; label: string; labelEn: string; icon: string }[] = [
    { id: 'bun', label: 'Bułka', labelEn: 'Bun', icon: '🍞' },
    { id: 'patty', label: 'Mięso', labelEn: 'Patty', icon: '🥩' },
    { id: 'cheese', label: 'Ser', labelEn: 'Cheese', icon: '🧀' },
    { id: 'veggie', label: 'Warzywa', labelEn: 'Veggies', icon: '🥬' },
    { id: 'sauce', label: 'Sosy', labelEn: 'Sauces', icon: '🫙' },
    { id: 'extra', label: 'Dodatki', labelEn: 'Extras', icon: '✨' },
]

export const INGREDIENTS: Ingredient[] = [
    // Buns
    { id: 'bun-classic', name: 'Klasyczna', nameEn: 'Classic Bun', emoji: '🍔', price: 0, kcal: 210, color: '#D4A76A', category: 'bun', description: 'Miękka, złocista bułka sezamowa' },
    { id: 'bun-black', name: 'Czarna', nameEn: 'Black Bun', emoji: '⬛', price: 2, kcal: 220, color: '#1a1a1a', category: 'bun', description: 'Bułka z węglem aktywnym' },
    { id: 'bun-brioche', name: 'Brioche', nameEn: 'Brioche Bun', emoji: '🥐', price: 3, kcal: 280, color: '#E8C07A', category: 'bun', description: 'Maślana bułka brioche' },
    { id: 'bun-pretzel', name: 'Pretzel', nameEn: 'Pretzel Bun', emoji: '🥨', price: 3, kcal: 240, color: '#8B5E2A', category: 'bun', description: 'Ciemna bułka w stylu precla' },

    // Patties
    { id: 'patty-beef', name: 'Wołowina 180g', nameEn: 'Beef 180g', emoji: '🥩', price: 18, kcal: 380, color: '#7B3F20', category: 'patty', description: '180g świeżej wołowiny, medium' },
    { id: 'patty-beef-dbl', name: '2× Wołowina', nameEn: '2× Beef', emoji: '🥩', price: 34, kcal: 720, color: '#6B2F10', category: 'patty', description: '2× 180g wołowiny' },
    { id: 'patty-chicken', name: 'Kurczak crispy', nameEn: 'Crispy Chicken', emoji: '🍗', price: 15, kcal: 320, color: '#D4A44C', category: 'patty', description: 'Chrupiący kotlet z piersi' },
    { id: 'patty-plant', name: 'Roślinny', nameEn: 'Plant-based', emoji: '🌱', price: 16, kcal: 280, color: '#4CAF50', category: 'patty', description: 'Wegański kotlet sojowy' },
    { id: 'patty-smash', name: 'Smash 2× 90g', nameEn: '2× Smash 90g', emoji: '💥', price: 20, kcal: 400, color: '#8B2010', category: 'patty', description: '2 cieniutkie smash burgery' },

    // Cheeses
    { id: 'cheese-cheddar', name: 'Cheddar', nameEn: 'Cheddar', emoji: '🧀', price: 3, kcal: 90, color: '#F5A623', category: 'cheese', description: 'Klasyczny żółty cheddar' },
    { id: 'cheese-swiss', name: 'Szwajcarski', nameEn: 'Swiss', emoji: '🧀', price: 3, kcal: 85, color: '#F0D060', category: 'cheese', description: 'Delikatny ser szwajcarski' },
    { id: 'cheese-blue', name: 'Blue Cheese', nameEn: 'Blue Cheese', emoji: '🟦', price: 5, kcal: 100, color: '#9A9ACA', category: 'cheese', description: 'Intensywny ser pleśniowy' },
    { id: 'cheese-goat', name: 'Kozi', nameEn: 'Goat', emoji: '🐐', price: 5, kcal: 95, color: '#F0ECD8', category: 'cheese', description: 'Kremowy ser kozi' },
    { id: 'cheese-truffle', name: 'Truflowy', nameEn: 'Truffle', emoji: '🍄', price: 8, kcal: 110, color: '#8B7355', category: 'cheese', description: 'Ser z białą truflą' },

    // Veggies
    { id: 'veg-lettuce', name: 'Sałata', nameEn: 'Lettuce', emoji: '🥬', price: 0, kcal: 5, color: '#5DBB63', category: 'veggie' },
    { id: 'veg-tomato', name: 'Pomidor', nameEn: 'Tomato', emoji: '🍅', price: 0, kcal: 10, color: '#E53935', category: 'veggie' },
    { id: 'veg-onion', name: 'Cebula', nameEn: 'Onion', emoji: '🧅', price: 0, kcal: 12, color: '#E0C040', category: 'veggie' },
    { id: 'veg-onion-red', name: 'Czerwona cebula', nameEn: 'Red Onion', emoji: '🟣', price: 1, kcal: 12, color: '#9C2780', category: 'veggie' },
    { id: 'veg-pickle', name: 'Ogórek kiszony', nameEn: 'Pickles', emoji: '🥒', price: 0, kcal: 5, color: '#7DBF5A', category: 'veggie' },
    { id: 'veg-jalapeno', name: 'Jalapeño', nameEn: 'Jalapeño', emoji: '🌶️', price: 1, kcal: 8, color: '#3D9B3D', category: 'veggie' },
    { id: 'veg-avocado', name: 'Awokado', nameEn: 'Avocado', emoji: '🥑', price: 4, kcal: 60, color: '#5B7332', category: 'veggie' },
    { id: 'veg-mushroom', name: 'Grzyby', nameEn: 'Mushrooms', emoji: '🍄', price: 3, kcal: 15, color: '#9B8070', category: 'veggie' },
    { id: 'veg-coleslaw', name: 'Coleslaw', nameEn: 'Coleslaw', emoji: '🥗', price: 2, kcal: 40, color: '#E8E0B0', category: 'veggie' },

    // Sauces
    { id: 'sauce-classic', name: 'Sos klasyczny', nameEn: 'Classic Sauce', emoji: '🫙', price: 0, kcal: 50, color: '#F5F0D0', category: 'sauce' },
    { id: 'sauce-bbq', name: 'BBQ', nameEn: 'BBQ', emoji: '🔥', price: 1, kcal: 45, color: '#8B2000', category: 'sauce' },
    { id: 'sauce-sriracha', name: 'Sriracha', nameEn: 'Sriracha', emoji: '🌶️', price: 1, kcal: 15, color: '#CC2200', category: 'sauce' },
    { id: 'sauce-truffle', name: 'Truflowy aioli', nameEn: 'Truffle Aioli', emoji: '🍄', price: 3, kcal: 80, color: '#C8B090', category: 'sauce' },
    { id: 'sauce-chipotle', name: 'Chipotle', nameEn: 'Chipotle', emoji: '🌮', price: 1, kcal: 55, color: '#B04010', category: 'sauce' },
    { id: 'sauce-gochujang', name: 'Gochujang', nameEn: 'Gochujang', emoji: '🇰🇷', price: 2, kcal: 30, color: '#CC3020', category: 'sauce' },
    { id: 'sauce-mayo', name: 'Majonez', nameEn: 'Mayo', emoji: '🥚', price: 0, kcal: 90, color: '#FFFFF0', category: 'sauce' },

    // Extras
    { id: 'extra-bacon', name: 'Boczek wędzony', nameEn: 'Smoked Bacon', emoji: '🥓', price: 5, kcal: 120, color: '#C45020', category: 'extra', description: '3 paski wędzonego boczku' },
    { id: 'extra-egg', name: 'Jajko sadzone', nameEn: 'Fried Egg', emoji: '🍳', price: 3, kcal: 90, color: '#F5D060', category: 'extra', description: 'Świeże jajko sadzone' },
    { id: 'extra-caronion', name: 'Praż. cebulka', nameEn: 'Crispy Onion', emoji: '🧅', price: 2, kcal: 55, color: '#D4A020', category: 'extra', description: 'Chrupiąca prażona szalotka' },
    { id: 'extra-truffle-oil', name: 'Olej truflowy', nameEn: 'Truffle Oil', emoji: '🫒', price: 4, kcal: 40, color: '#606030', category: 'extra', description: 'Kilka kropel oleju truflowego' },
    { id: 'extra-kimchi', name: 'Kimchi', nameEn: 'Kimchi', emoji: '🥬', price: 3, kcal: 20, color: '#CC3030', category: 'extra', description: 'Tradycyjne koreańskie kimchi' },
]

// Assistant suggestions / combos
export const ASSISTANT_TIPS: string[] = [
    'Smash burgery wymagają dwóch cieniutkich kotletów — dają niesamowitą skórkę!',
    'Ser truflowy + aioli truflowe = eksplozja smaku.',
    'Jalapeño + gochujang = ogień. Tylko dla odważnych 🌶️',
    'Czarna bułka wygląda epicko z żółtym cheddar i czerwoną cebulą.',
    'Awokado łagodzi pikantność — idealne przy sriracha.',
    'Boczek + jajko sadzone = klasyczny śniadaniowy burgeczek.',
    'Blue cheese + cebula prażona + BBQ = The Godfather vibe.',
    'Kotlet roślinny? Wybierz brioche i sos chipotle — zaskakujące combo!',
]
