# @deno-mods-by-cisowscy/bidirectional-map@0.1.0

> - [**step-by-step of this the BiMap script operation (in Polish)**](./main/bidirectional-map.ts._pl_.md)

##  HOW TO USE THIS

**( 1 )** go to your project (and next see point 3) or  if you do not have a project (see point 2), 
**( 2 )** initiate a new project (and next see point 3).

```powershell
PS A:\any\path\on\your-pc> mkdir my-project && cd my-project && deno init && mkdir mods 
PS A:\any\path\on\your-pc\my-project> Set-Content -Path ".\mods\.gitkeep" -Value $null -Encoding UTF8
PS A:\any\path\on\your-pc\my-project> git init -b=main  && git add . &&  git commit -m "init deno and init git"
```

**( 3 )** start add this module  (and next see point 4).

```powershell
PS A:\any\path\on\your-pc\my-project> git -c protocol.file.allow=always submodule add --name by-cisowscy-mod-bidirectional-map https://github.com/deno-mods-by-cisowscy/bidirectional-map.git mods/deno-mods-by-cisowscy/bidirectional-map 
PS A:\any\path\on\your-pc\my-project> git submodule update --init --recursive && git add . &&  git commit -m "(step 1 of 2) add git submodule of @deno-mods-by-cisowscy/bidirectional-map"
```
**( 4 )** update your config file `A:\any\path\on\your-pc\my-project\deno.json`  (and next see point 5).

eg. before change

>  ```json
>    {
>      "imports": {
>        "@std/assert": "jsr:@std/assert@1"
>      },
>      "tasks": {
>        "dev": "deno run --watch main.ts"
>      }
>    }
>
>  ```

eg. after change

>  ```json
>   {
>     "workspace": [
>       "./mods/deno-mods-by-cisowscy/bidirectional-map",
>     ],
>     "imports": {
>       "@std/assert": "jsr:@std/assert@1"
>     },
>     "tasks": {
>       "dev": "deno run --watch main.ts"
>     }
>  }
>
>  ```

**( 5 )** finish  add this module  (and next see point 6).

```powershell
PS A:\any\path\on\your-pc\my-project> git add . &&  git commit -m "(step 2 of 2) add git submodule of @deno-mods-by-cisowscy/bidirectional-map"
```

**( 6 )** add example usage to eg.  `A:\any\path\on\your-pc\my-project\main.ts`   (and next see point 7).

eg. before change

>```typescript
>  export function add(a: number, b: number): number {
>    return a + b;
>  }
>  
>  // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
>  if (import.meta.main) {
>    console.log("Add 2 + 3 =", add(2, 3));
>  }
>```

eg. after change

>```typescript
>  //import { BiMap } from './mods/deno-mods-by-cisowscy/bidirectional-map/main/bidirectional-map';
>  import { BiMap } from '@deno-mods-by-cisowscy/bidirectional-map';
>  
>  class MyClass {
>    static Field: BiMap<string, string> = new BiMap<string,string>([
>        ['Initialize', 'true'],
>        ['UpdateNull', 'false'],
>    ]);     
>  }
>  
>  console.log(MyClass.Field.v('true')); // The message: "Initialize"
>  console.log(MyClass.Field.v('false')); // The message: "UpdateNull"
>  console.log(MyClass.Field.k('Initialize')); // The message: true
>  console.log(MyClass.Field.k('UpdateNull')); // The message: false
>  
>  
>  export function add(a: number, b: number): number {
>    return a + b;
>  }
>  
>  // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
>  if (import.meta.main) {
>    console.log("Add 2 + 3 =", add(2, 3));
>  }
>``` 

**( 7 )** finish 

```powershell
PS A:\any\path\on\your-pc\my-project> git add . &&  git commit -m "add example usage of @deno-mods-by-cisowscy/bidirectional-map"
```

---
---
---


## Suplement ***(links to the official documentation [--> deno@2.1.5 <--](https://github.com/denoland/deno/tree/v2.1.5) )***

- [about **workspaces** and **monorepos** in deno](https://docs.deno.com/runtime/fundamentals/workspaces/)
- [about **deno.json**](https://docs.deno.com/runtime/fundamentals/configuration/)
- [about start a new deno project](https://docs.deno.com/runtime/reference/cli/init/)

