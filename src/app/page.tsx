export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Menu from '@/components/Menu'
import folder from '../../public/folder.svg'
import titleIcon from '../../public/title-icon.svg'
import downArrow from '../../public/down-arrow.svg'
import FormWrapper from '@/components/FormWrapper'
import MenuWrapper from '@/components/MenuWrapper'
import { getMenus } from '@/actions'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <section className='flex flex-col lg:flex-row outter-padding gap-8 h-[100vh]'>
        <Menu />
        <div className='text-xs outter-padding flex flex-col gap-8 w-full overflow-y-auto'>
          <div className='flex gap-2 items-center'>
            <Image
              src={folder}
              alt='folder'
            />
            <span className='text-gray-4'>/</span>
            <p>Menus</p>
          </div>
          <h1 className='hidden lg:flex gap-4 items-center text-3xl font-bold'>
            <Image
              src={titleIcon}
              alt='title-icon'
            />
            <p>Menus</p>
          </h1>
          <div>
            <p className='text-gray-1'>Menu</p>
            <div className='w-fit mt-3 lg:mt-2 items-center flex gap-20 justify-between rounded-corner inner-padding py-2 px-6 sm:px-8 bg-gray-3'>
              <p>system management</p>
              <Image
                src={downArrow}
                alt='down-icon'
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row gap-10 text-sm'>
            <div className='flex flex-col gap-6 lg:gap-4 w-full'>
              <Suspense fallback={<p>Loading...</p>}>
                <MenuTree />
              </Suspense>
            </div>
            <FormWrapper />
          </div>
        </div>
      </section>
    </>
  )
}

async function MenuTree() {
  const rootNode = await getMenus()
  return <MenuWrapper node={rootNode} />
}
