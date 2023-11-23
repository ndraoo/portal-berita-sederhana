import { Link } from '@inertiajs/react';

const Paginator = ({ meta }) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;
   
  // CetLinkk nilLinki metLink ke konsol
   
    return (
        <div className="btn-group mb-5">
            {prev && <Link href={prev} className="btn btn-outline">«</Link>}
            <Link className="btn btn-outline">{current}</Link>
             {next && <Link href={next} className="btn btn-outline">»</Link>}
        </div>
    )
}

export default Paginator