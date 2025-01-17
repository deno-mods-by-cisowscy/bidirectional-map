/**
 * Klasa `BiMap` implementuje mapę, która przechowuje pary klucz-wartość oraz umożliwia odwrotne mapowanie.
 * 
 * @typeparam BiMapKey Typ klucza
 * @typeparam BiMapVal Typ wartości
 * @example
 * ```ts
 * // Przykładowe dane:
 * const biMap = new BiMap<'one' | 'two' | 'three', 1 | 2 | 3>([ ['one', 1], ['two', 2], ['three', 3] ]);
 *
 * // Typowanie dynamiczne na podstawie `getAllKeys()` i `getAllVals()`
 * type AllKeys = ReturnType<typeof biMap.getAllKeys>;  // Otrzymuje typ Set<'one' | 'two' | 'three'>
 * type AllVals = ReturnType<typeof biMap.getAllVals>;  // Otrzymuje typ Set<1 | 2 | 3>
 *
 * // Przypisanie zmiennych z dynamicznym typowaniem na podstawie danych z biMap
 * const testKey: AllKeys = biMap.getAllKeys();  // Typ: Set<'one' | 'two' | 'three'>
 * const testVal: AllVals = biMap.getAllVals();  // Typ: Set<1 | 2 | 3>
 *
 * // Testowanie dynamicznego przypisania
 * console.log(testKey);  // Set { 'one', 'two', 'three' }
 * console.log(testVal);  // Set { 1, 2, 3 }
 * ```
 */
export class BiMap<BiMapKey, BiMapVal> {
    private mapKeyToVal: Map<BiMapKey, BiMapVal>;
    private mapValToKey: Map<BiMapVal, BiMapKey>;

    /**
     * Tworzy nową instancję `BiMap` z opcjonalnymi początkowymi danymi.
     * 
     * @param initialData Początkowe dane jako para [klucz, wartość]
     */
    constructor(initialData: [BiMapKey, BiMapVal][] = []) {
        this.mapKeyToVal = new Map();
        this.mapValToKey = new Map();
        initialData.forEach(([key, val]) => {
            this.set(key, val);
        });
    }

    /**
     * Dodaje nową parę klucz-wartość do mapy.
     * 
     * @param key Klucz
     * @param val Wartość
     */
    set(key: BiMapKey, val: BiMapVal): void {
        this.mapKeyToVal.set(key, val);
        this.mapValToKey.set(val, key);
    }

    /**
     * Usuwa parę na podstawie klucza.
     * 
     * @param key Klucz, którego para ma zostać usunięta
     * @returns `true` jeśli para została usunięta, w przeciwnym razie `false`
     */
    delDuoByKey(key: BiMapKey): boolean {
        const val = this.mapKeyToVal.get(key);
        if (val !== undefined) {
            this.mapKeyToVal.delete(key);
            this.mapValToKey.delete(val);
            return true;
        }
        return false;
    }

    /**
     * Usuwa parę na podstawie wartości.
     * 
     * @param val Wartość, której para ma zostać usunięta
     * @returns `true` jeśli para została usunięta, w przeciwnym razie `false`
     */
    delDuoByVal(val: BiMapVal): boolean {
        const key = this.mapValToKey.get(val);
        if (key !== undefined) {
            this.mapKeyToVal.delete(key);
            this.mapValToKey.delete(val);
            return true;
        }
        return false;
    }

    /**
     * Pobiera klucz na podstawie wartości.
     * 
     * @param val Wartość
     * @returns Klucz skojarzony z wartością lub `undefined` jeśli wartość nie istnieje
     */
    getKeyByVal(val: BiMapVal): BiMapKey | undefined {
        return this.mapValToKey.get(val);
    }

    /**
     * Pobiera wartość na podstawie klucza.
     * 
     * @param key Klucz
     * @returns Wartość skojarzoną z kluczem lub `undefined` jeśli klucz nie istnieje
     */
    getValByKey(key: BiMapKey): BiMapVal | undefined {
        return this.mapKeyToVal.get(key);
    }

    /**
     * Zwraca wszystkie klucze jako zbiór (Set).
     * 
     * @returns Zbiór kluczy
     */
    getAllKeys(): Set<BiMapKey> {
        return new Set(this.mapKeyToVal.keys());
    }

    /**
     * Zwraca wszystkie wartości jako zbiór (Set).
     * 
     * @returns Zbiór wartości
     */
    getAllVals(): Set<BiMapVal> {
        return new Set(this.mapKeyToVal.values());
    }

    /**
     * Sprawdza, czy mapa zawiera dany klucz.
     * 
     * @param key Klucz do sprawdzenia
     * @returns `true` jeśli klucz istnieje, w przeciwnym razie `false`
     */
    hasKey(key: BiMapKey): boolean {
        return this.mapKeyToVal.has(key);
    }

    /**
     * Sprawdza, czy mapa zawiera daną wartość.
     * 
     * @param val Wartość do sprawdzenia
     * @returns `true` jeśli wartość istnieje, w przeciwnym razie `false`
     */
    hasVal(val: BiMapVal): boolean {
        return this.mapValToKey.has(val);
    }

    /**
     * Zwraca rozmiar mapy.
     * 
     * @returns Rozmiar mapy
     */
    size(): number {
        return this.mapKeyToVal.size;
    }

    /**
     * Czyści mapę.
     */
    clear(): void {
        this.mapKeyToVal.clear();
        this.mapValToKey.clear();
    }

    /**
     * Aliasy metod:
     */
    K = (key: BiMapKey): boolean => this.hasKey(key);
    V = (val: BiMapVal): boolean => this.hasVal(val);
    k = (key: BiMapKey): BiMapVal | undefined => this.getValByKey(key);
    v = (val: BiMapVal): BiMapKey | undefined => this.getKeyByVal(val);
}
