import Image from 'next/image'
import logo from '../../public/logo.svg'
import toggler from '../../public/toggler.svg'
import submenu from '../../public/submenu.svg'
import folder from '../../public/folder.svg'
import Link from 'next/link'

export default function Menu() {
  return (
    <>
      <div className='hidden text-sm bg-blue-1 outter-padding lg:flex flex-col gap-20 rounded-corner w-[20%]'>
        <div className='flex justify-between items-center mt-4'>
          <div>
            <Link href='/'>
              <Image
                src={logo}
                alt='logo'
              />
            </Link>
          </div>
          <div>
            <Image
              src={toggler}
              alt='menu-icon'
            />
          </div>
        </div>
        <div className='inner-padding bg-blue-2 rounded-corner flex font-bold flex-col gap-4'>
          <div className='flex gap-5 items-center text-white inner-padding rounded-corner'>
            <Image
              src={folder}
              alt='folder'
            />
            <p>System</p>
          </div>
          <div className='flex gap-5 items-center text-blue-1 inner-padding rounded-corner bg-green'>
            <Image
              src={submenu}
              alt='submenu'
            />
            <p>Menus</p>
          </div>
        </div>
      </div>

      <div className='block lg:hidden'></div>
    </>
  )
}
