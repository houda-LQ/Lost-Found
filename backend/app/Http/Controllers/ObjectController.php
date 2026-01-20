<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use App\Models\ObjectItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ObjectController extends Controller
{
    public function index(Request $request){
        $query =ObjectItem::with("user")->latest();

        if($request->filled("type")){
            $query ->where("type",$request->type);

        }

        if($request->filled("location")){
            $query->where("location","like","%" . $request->location ."%");
        }
        return response()->json($query->get());
    }



    public function store(Request $request){
        $request->validate();
        $path=$request->file("image")->store("objects","public");

        $object=ObjectItem::create([
            "title"=>$request->title,
            "description"=>$request->description,
            "type"=>$request->type,
            "location"=>$request->location,
            "date"=>$request->date,
            "image"=>$path,
            "status" => "not_recovered",
            "user_id"=>auth()->id(),
    
        ]);
        return response()->json([
        "message"=>"onjet crée avec succés",
        "objet"=>$object
        ],201);
    }


public function myObjects(){
    $objects=ObjectItem::where("user_id",auth()->id())->latest()->get();

    return response()->json($objects);
}


public function update(UpdateRequest $request, $id){

$object=ObjectItem::findOrFail($id);
$user=auth()->user();

if($user->role === "user" && $object->user_id !== $user->id){
    return response()->json(["message"=>"Accés refusé"],403);
}
$request->validate();
if($request->hasfile("image")){
    Storage::disk("public")->delete($object->image);
    $path=$request->file("image")->store("objects","public");
    $object->image = $path;
}
$object->update($request->except(["image", "status"]));
return response()->json([
    "message"=>"modification avec succés",
    "objet"=>$object 
]);
}

public function destroy($id){
    $object=ObjectItem::findOrFail($id);
    $user=auth()->user();

    if($user->role === "user" && $object->user_id !== $user->id){
        return response()->json(["message"=>"Accés refusé"],403);
    }

    Storage::disk("public")->delete($object->image);
    $object->delete();

    return response()->json(["message"=>"Objet supprimé avec succès"]);


}


public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:not_recovered,recovered'
    ]);

    $object = ObjectItem::findOrFail($id);
    $object->status = $request->status;
    $object->save();

    return response()->json([
        'message' => 'Statut mis à jour avec succès',
        'object' => $object
    ]);
}




   
}

