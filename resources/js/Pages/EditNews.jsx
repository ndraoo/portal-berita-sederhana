import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Navbar from '@/Components/Navbar';



export default function EditNews(props) {
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kategori, setKategori] = useState('');

  const handleSubmit = () => {
    const data = {
      id: props.myNews.id, title, deskripsi, kategori
    }
    Inertia.post('/news/update', data)
    setTitle('')
    setDeskripsi('')
    setKategori('')
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title={props.title} />
      <Navbar user={props.auth.user} />
      <div className="flex justify-center items-center">
      <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-2">
        <div className='p-4 text-2xl'>EDIT BERITA</div>
        <div className="card-body">
          <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title} />
          <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(deskripsi) => setDeskripsi(deskripsi.target.value)} defaultValue={props.myNews.deskripsi} />
          <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(kategori) => setKategori(kategori.target.value)} defaultValue={props.myNews.kategori} />
          <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>UPDATE</button>
        </div>
      </div>
    </div>
    </div>
  )
}