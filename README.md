## Laravel Api Config 

Autor : Valentin Pujiula Torres

Desarrollo Aplicaciones Web

--- 

### 1. CREAR LARAVEL PROJECT

Para crear nuestro proyecto emplearemos :

`composer create-project laravel/laravel="8.*" ProjectName`

Una vez creado deberemos revisar que , en caso de haber clonado el repo , mantenemos el framework mediante *Composer Update*

Ademas Crearemos la ruta a la plantilla en `web.php`

>/resources/views/ViewName

Ademas de un  fichero `Api.js`

>public/js/ApiSriptName.js


Una vez creado el modelo , controlador y migracion :

>Agregar $table y $fillable al modelo 
>Agregar campos a la migracion antes de  hacer :

    php artisan migrate:refresh     o      php artisan migrate

### 2. LOGICA DE FRAMEWORK

Para comenzar , crearemos el modelo junto a su migracion de tal manera :

`php artisan make:model ItemName -mc`

Una vez creado el modelo y correspondiente migracion deberemos agregar los campos necesarios en nuestra **Tabla**  de la base de datos , este lo encontraremos en :
>database/migrations/

A continuacion agregamos el uso del controlador en `api.php` tal que :

>use NameController

Creamos la Route pretinente:

`Route::post('product/add' , [ProductController::class,'store'])`

a continuacion crearemos la funcion publica **Store** en nuestro controlador :

- store

       public function store(Request $request){

        $request->validate([
            'name'=>'required|max:191',
            'description'=>'required',
            'price'=>'required',
            'qty'=>'required',
        ]);

        $product = new Products();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->save();

        return response()->json(['message'=>'Element Added Succesfully'], 200);

        }

Despues seguiremos con 

- index()
        
        public function index(){

        $products = Products::all();
        return response()->json(['products'=>$products], 200);
        }

- show()

    
        public function show($id){

        $products = Products::find($id);
        if($products){

            return response()->json(['products'=>$products], 200);

        }else{
            return response()->json(['products'=>'No record finded'], 404);
        }
        
        }
    
- edit()


- delete()





Finalizado este punto debermos agregar a api.php::

Al acabar podemos comprobar su funcionalidad mediante postman :


    >encontraremos todos los recursos descendiendo /api 

` EJ: vpujiula.randion.es/NombreProyecto/public/api/endpoint`

Para visualizar el contenido en ficheros blade haremos lo siguiente :

>Crear script en : public/js/script.js

Una vez allo debermos asegurarnos que las rutas a los endpoints son correctas  e implementar Create/delete


### GIT

Para ddesplegar cualquier proyecto en github deberemos seguir esta guia 

`git init .`

`git add .`

`git commit -m "message"`

`git remote add RepoName RepoURL`

`git  push -u RepoName RepoBranch`


## Despliegue 

Cosas a tener en cuenta de cara al despliegue :



Ruta de fetch mas larga , deberemos agregar :

>http://vpujiula.randion.es/ProjectName/public/api/endpoint

>La base de datos se configurara de la siguiente manera :

    DB_CONNECTION=pgsql
    DB_HOST=randion.es
    DB_PORT=5432
    DB_DATABASE=vpujiula_db
    DB_USERNAME=vpujiula_usr
    DB_PASSWORD=abc123.

Ademas deberemos :

>chmod -R 777 ./public 

>chmod -R 777 ./storage

