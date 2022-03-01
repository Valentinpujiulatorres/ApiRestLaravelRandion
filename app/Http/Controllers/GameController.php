<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(){
        

        $games = Game::all();
        return response()->json(['games'=>$games], 200);
    }

    public function show($id){

        $games = Game::find($id);
        if($games){

            return response()->json(['games'=>$games], 200);

        }else{
            return response()->json(['games'=>'No record finded'], 404);
        }
        
    }

    public function store(Request $request){

        $request->validate([
            'name'=>'required',
            'description'=>'required',
            'price'=>'required',
            'available'=>'required',
        ]);

        $game = new Game();
        $game->name = $request->name;
        $game->description = $request->description;
        $game->price = $request->price;
        $game->available = $request->available;
       
        $game->save();

        return response()->json(['message'=>'Element Added Succesfully'], 200);

    }
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $game = Game::find($id);

        if($game){

           $game->delete();
           return response()->json(['Item Deleted Successfully'],200);

        }else{
            return response()->json(['Cant find that ***'], 404);
        }
    }
}
