# Bidirectional Map

## A. Przykład

Przykładowe dane
```typescript
const biMap = new BiMap<
  'one' | 'two' | 'three',
  1 | 2 | 3
>([
  ['one', 1],
  ['two', 2],
  ['three', 3]
]);
```

Typowanie dynamiczne na podstawie `getAllKeys()` i `getAllVals()`
```typescript
type AllKeys = ReturnType<typeof biMap.getAllKeys>;  // Otrzymuje typ Set<'one' | 'two' | 'three'>
type AllVals = ReturnType<typeof biMap.getAllVals>;  // Otrzymuje typ Set<1 | 2 | 3>
```

Przypisanie zmiennych z dynamicznym typowaniem na podstawie danych z biMap
```typescript
const testKey: AllKeys = biMap.getAllKeys();  // Typ: Set<'one' | 'two' | 'three'>
const testVal: AllVals = biMap.getAllVals();  // Typ: Set<1 | 2 | 3>
```

Testowanie dynamicznego przypisania
```typescript
console.log(testKey);  // Set { 'one', 'two', 'three' }
console.log(testVal);  // Set { 1, 2, 3 }
```
---
## B. Omówienie klasy ` BiMap<BiMapKey, BiMapVal> `

Klasa `BiMap` implementuje mapę, która przechowuje pary klucz-wartość oraz umożliwia odwrotne mapowanie.

> - `@typeparam BiMapKey` - Typ klucza
> - `@typeparam BiMapVal` - Typ wartości

```typescript
export class BiMap<BiMapKey, BiMapVal> {
    private mapKeyToVal: Map<BiMapKey, BiMapVal>;
    private mapValToKey: Map<BiMapVal, BiMapKey>;
}
```
### B-1) konsruktor klasy 

Tworzy nową instancję `BiMap` z opcjonalnymi początkowymi danymi.

> -  `@param initialData` - Początkowe dane jako para [klucz, wartość]

```typescript
constructor(initialData: [BiMapKey, BiMapVal][] = []) {
    this.mapKeyToVal = new Map();
    this.mapValToKey = new Map();
    initialData.forEach(([key, val]) => {
        this.set(key, val);
    });
}
```

### B-2) metody w klasie

#### B-2-A) wstawianie pozycji

Dodaje nową parę klucz-wartość do mapy.

> - `@param key` - Klucz
> - `@param val` - Wartość

```typescript
set(key: BiMapKey, val: BiMapVal): void {
    this.mapKeyToVal.set(key, val);
    this.mapValToKey.set(val, key);
}
```

#### B-2-B) zmazywanie pozycji

##### B-2-B-1) Usuwa parę na podstawie klucza.

> - `@param key` - Klucz, którego para ma zostać usunięta
> - `@returns` - `true` jeśli para została usunięta, w przeciwnym razie `false`

```typescript
delDuoByKey(key: BiMapKey): boolean {
    const val = this.mapKeyToVal.get(key);
    if (val !== undefined) {
        this.mapKeyToVal.delete(key);
        this.mapValToKey.delete(val);
        return true;
    }
    return false;
}
```

##### B-2-B-2) Usuwa parę na podstawie wartości.

> - `@param val` - Wartość, której para ma zostać usunięta
> - `@returns` - `true` jeśli para została usunięta, w przeciwnym razie `false`

```typescript
delDuoByVal(val: BiMapVal): boolean {
    const key = this.mapValToKey.get(val);
    if (key !== undefined) {
        this.mapKeyToVal.delete(key);
        this.mapValToKey.delete(val);
        return true;
    }
    return false;
}
```

##### B-2-B-3) Czyści BiMapę

```typescript
clear(): void {
    this.mapKeyToVal.clear();
    this.mapValToKey.clear();
}
```

#### B-2-C) pobieranie pozycji

##### B-2-C-1) Pobiera klucz na podstawie wartości.

> - `@param val` - Wartość
> - `@returns`- Klucz skojarzony z wartością lub `undefined` jeśli wartość nie istnieje

```typescript
getKeyByVal(val: BiMapVal): BiMapKey | undefined {
    return this.mapValToKey.get(val);
}
```

##### B-2-C-2) Zwraca wszystkie klucze jako zbiór (`Set`).

> - `@returns` - Zbiór kluczy

```typescript
getAllKeys(): Set<BiMapKey> {
    return new Set(this.mapKeyToVal.keys());
}
```

##### B-2-C-3) Pobiera wartość na podstawie klucza.

> - `@param key` - Klucz
> - `@returns` - Wartość skojarzoną z kluczem lub `undefined` jeśli klucz nie istnieje

```typescript
getValByKey(key: BiMapKey): BiMapVal | undefined {
    return this.mapKeyToVal.get(key);
}
```


##### B-2-C-4) Zwraca wszystkie wartości jako zbiór  (`Set`).

> - `@returns` - Zbiór wartości

```typescript
getAllVals(): Set<BiMapVal> {
        return new Set(this.mapKeyToVal.values());
    }
```

#### B-2-D) testowanie pozycji

##### B-2-D-1) Sprawdza, czy mapa zawiera dany klucz.

> - `@param key` - Klucz do sprawdzenia
> - `@returns` - `true` jeśli klucz istnieje, w przeciwnym razie `false`

```typescript
hasKey(key: BiMapKey): boolean {
    return this.mapKeyToVal.has(key);
}
```

##### B-2-D-2) Sprawdza, czy mapa zawiera daną wartość.

> - `@param val` - Wartość do sprawdzenia
> - `@returns` - `true` jeśli wartość istnieje, w przeciwnym razie `false`

```typescript
hasVal(val: BiMapVal): boolean {
    return this.mapValToKey.has(val);
}
```

#### B-2-E) zmierzenie BiMapy

> - `@returns`- Rozmiar mapy

```typescript
size(): number {
    return this.mapKeyToVal.size;
}
```

### B-3) aliasy metod

```typescript
K = (key: BiMapKey): boolean => this.hasKey(key);
V = (val: BiMapVal): boolean => this.hasVal(val);
k = (key: BiMapKey): BiMapVal | undefined => this.getValByKey(key);
v = (val: BiMapVal): BiMapKey | undefined => this.getKeyByVal(val);
```
 
---   
---
