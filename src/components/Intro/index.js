import React from 'react'



const Intro = () => {
    return (
        <div className='pt-10 px-10 container lg:px-[10rem]'>
            <div className='bg-gray-100 flex justify-between  rounded-2xl my-10'  >
                <div className='m-3 border-r border-gray-300'>
                    <h1 className='block'> Saving Benefits</h1>
                    <div>
                        When you save with our savings accounts you get intrest on your money monthly..
                    </div>
                </div>
                <div className='m-3 border-r border-gray-300'>
                    <h1 className='block'>Fully Encrypted
                    </h1>
                    <div>
                        Our platform is properly encrypted and all transactions are interception free.
                    </div>
                </div>
                <div className=' m-3 border-r border-gray-300'>
                    <h1 className='block'>Modern Payment Options
                    </h1>
                    <div>
                        Pay using modern payment options provided by our bank.
                    </div>
                </div>
                <div className=' m-3'>
                    <h1 className='block'>Safe and Secure
                    </h1>
                    <div>
                        Every account in our bank is secured to world class standards.
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Intro