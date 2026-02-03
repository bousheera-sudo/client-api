<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = \App\Models\Article::all();
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'categorie' => 'required|string|max:255',
            'couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'prix' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('couverture')) {
            $uploadedFileUrl = $request->file('couverture')->storeOnCloudinary('articles')->getSecurePath();
            $imagePath = $uploadedFileUrl;
        }

        $article = \App\Models\Article::create([
            'titre' => $request->input('titre'),
            'categorie' => $request->input('categorie'),
            'couverture' => $imagePath,
            'prix' => $request->input('prix'),
            'description' => $request->input('description'),
        ]);

        return response()->json([
            'message' => 'Article ajouté avec succès!',
            'article' => $article
        ], 201);
    }

    public function show($id)
    {
        $article = \App\Models\Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }
        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $article = \App\Models\Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'categorie' => 'sometimes|required|string|max:255',
            'couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'prix' => 'sometimes|required|numeric',
            'description' => 'nullable|string',
        ]);

        $data = $request->only(['titre', 'categorie', 'prix', 'description']);

        if ($request->hasFile('couverture')) {
            $uploadedFileUrl = $request->file('couverture')->storeOnCloudinary('articles')->getSecurePath();
            $data['couverture'] = $uploadedFileUrl;
        }

        $article->update($data);

        return response()->json([
            'message' => 'Article mis à jour avec succès!',
            'article' => $article
        ]);
    }

    public function destroy($id)
    {
        $article = \App\Models\Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        $article->delete();
        return response()->json(['message' => 'Article supprimé avec succès!']);
    }

    public function filtrer(Request $request)
    {
        $query = $request->input('p');
        $articles = \App\Models\Article::where('titre', 'like', "%$query%")->get();
        return response()->json($articles);
    }
}
