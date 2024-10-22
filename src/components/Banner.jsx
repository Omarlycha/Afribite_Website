import bannerImage from '../assets/image.png'
const Banner = ({text}) => {
  return (
    <div className='w-full bg-white rounded-md'>
        <div className="grid grid-cols-3 md:grid-cols-2">
            <div className='flex flex-col m-auto gap-1 lg:gap-5 p-4 col-span-2 sm:col-span-1'>
                <h1 className='text-[#E2725B] text-xl md:text-2xl lg:text-4xl text-center'>
                    Afribite
                </h1>
                <p className='text-sm md:text-base lg:text-lg text-center'>{text}</p>

            </div>
            <div className={`lg:h-56 bg-cover h-full overflow-hidden items-center justify-center bg-backgroud `}><img src={bannerImage} alt="page banner" className="hidden sm:block h-fit w-full lg:w-full" /></div>
          </div>
    </div>
  )
}

export default Banner
