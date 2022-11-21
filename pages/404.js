import Image from 'next/image';
import Link from 'next/link';
import {  useRouter } from 'next/router';
import Button_comp from '../components/Ui/Button_comp';
import image from '../public/404.png';

export default function PageNotFound() {
  const router=useRouter()
  const goHome=()=>{
    router.replace('/')
  }
  return (
    <div className="h-screen flex align-middle">
      <div className="max-w-xs sm:max-w-sm m-auto grid gap-8">
        <Image
          className="m-20 text-accent "
          src={image}
          alt="404 page not found"
        />
        <Button_comp onClick={()=>goHome()}>Go Home</Button_comp>
      </div>
    </div>
  );
}
