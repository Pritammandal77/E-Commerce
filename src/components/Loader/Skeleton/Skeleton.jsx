import React from 'react';

function Skeleton() {
    return (
        <>
            <div className='h-auto w-[90vw] md:w-[90vw] md:ml-0 lg:ml-0 lg:w-[90vw] bg-neural-200 flex justify-center items-center'>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  text-white lg:w-[90vw]  animate-pulse rounded-xl p-4 gap-20 w-[90vw]" >

                    <div className=''>
                        <div className="bg-neutral-500/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-neutral-500/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-neutral-500/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-neutral-500/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <div className="bg-neutral-500/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-500/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Skeleton;
