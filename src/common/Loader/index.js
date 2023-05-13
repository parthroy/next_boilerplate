import Image from 'next/image';

import './Loader.css';

function Loader() {
  return (
    <div className='loader_container text-center'>
      <Image src='' alt='Loading' />
    </div>
  );
}

export default Loader;
