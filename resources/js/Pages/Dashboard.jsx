import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [kategori, setKategori] = useState('');
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, deskripsi, kategori
        }
        Inertia.post('/news', data)
        setIsNotif(true)
        setTitle('')
        setDeskripsi('')
        setKategori('')
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        return;
    }, [])

    return (
        
        
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />
     

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && <div className="alert alert-info shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{props.flash.message}</span>
                            </div>
                        </div>
                        }
                        <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} value={title} />
                        <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(deskripsi) => setDeskripsi(deskripsi.target.value)} value={deskripsi} />
                        <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(kategori) => setKategori(kategori.target.value)} value={kategori} />
                        <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>SUBMIT</button>
                        </div>
                
                <div className="p-4">
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card w-full  bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.deskripsi}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.kategori}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('edit.news')} method="get" data={{ id: news.id }} as="button">
                                                edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('delete.news')} method="post" data={{ id: news.id }} as="button">
                                                delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div class="alert shadow-lg m-2">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>Anda belum memiliki berita</span>
                    </div>
                  </div>}
                  </div>
                 </div>
        
                </div>

                 

        </AuthenticatedLayout>
    );
}
