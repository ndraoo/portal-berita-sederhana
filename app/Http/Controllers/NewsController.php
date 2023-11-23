<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Inertia\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\NewsCollection;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(9));
  
        return Inertia::render('Homepage', [
        'titles' => "INDRA NEWS",
        'deskripsis' => "Selamat Datang Di Ndra Universe News Portal",
        'news' => $news,   
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->deskripsi = $request->deskripsi;
        $news->kategori = $request->kategori;
        $news->penulis = auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message', 'berita berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = $news::where('penulis', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
                'myNews' => $myNews,
                ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        News::where('id', $request->id)->update([
            'title'     => $request->title,
            'deskripsi' => $request->deskripsi,
            'kategori'  => $request->kategori,
        ]);
        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news, Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'berita berhasil dihapus');
    }
}
