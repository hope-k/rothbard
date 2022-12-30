import React, { useEffect, useState } from 'react'
import { BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs'
import { SearchIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux'
import { GiChecklist } from 'react-icons/gi'
import { getMyTransactions } from '../../redux/Slices/transactionsSlice'
import moment from 'moment'
import ClockLoader from 'react-spinners/ClockLoader'
import accounting from 'accounting'
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';


const Transactions = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    



    useEffect(() => {
        console.log('page===', page)
        dispatch(getMyTransactions({ page: page }))
    }, [dispatch, page]);

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    
    };

    const {
        transactions,
        loading,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = useSelector(state => state.transactions)
    return (
        <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative '>
            <h1 className='lg:px-[7rem] top-[15rem] p-4 text-white font-semibold text-xl flex items-center fixed lg:top-40'>
                Transactions <GiChecklist className='ml-2 text-2xl text-white' />
            </h1>
            <div className='h-full pt-[20rem] lg:px-[16rem] md:px-[4rem] container px-4 z-50 relative'>
                <div className='bg-gray-100 w-full row rounded-xl h-full pt-3 shadow-2xl relative'>
                    <div className='p-4 lg:p-6 relative'>
                        <div className='flex justify-between mb-6 items-center'>
                            <h1 className='font-semibold'>Transactions</h1>
                            <SearchIcon className='w-6' />
                        </div>

                        {
                            loading ? <div className='h-36 w-full items-center justify-center flex  '><span className="loader"></span></div>  : !transactions?.length ? (
                                <div className="px-2 flex items-center justify-center p-4 h-full">
                                    <div className=' bg-gray-200 p-4 rounded-3xl'>
                                        No Transactions
                                    </div>
                                </div>
                            ) :
                                transactions && transactions.map((transaction) => (
                                    <div key={transaction?._id} className='w-full my-3 border-b border-gray-300 pb-3'>
                                        <h1 className='font-semibold text-[.9rem] flex items-center uppercase'>{transaction?.transactionType}{transaction?.transactionType === 'transfer' ? <BsArrowUpRight className='text-red-500' /> : <BsArrowDownLeft className='text-green-600' />}</h1>
                                        <div className='flex justify-between leading-5'>
                                            <div className='flex text-sm'>
                                                {
                                                    transaction?.status === 'pending' ?
                                                        <ClockLoader size={16} speedMultiplier={0.5} color='#AEA7A7B8' />
                                                        :
                                                        <h1 className={'font-semibold text-sm capitalize ' + (transaction.status === 'failed' && 'text-red-500 ') + (transaction?.status === 'complete' && ' text-green-600 ')}>{transaction?.status}</h1>
                                                }
                                                <h1 className='mx-2 text-gray-500 text-[.8rem] font-light lg:font-normal'>{moment(transaction?.createdAt).format('LLL')}</h1>
                                                <h1 className=' text-gray-500'>...{transaction?.accountId?.accountNumber.slice(-4)} {transaction?.accountId?.accountType}</h1>
                                            </div>
                                            <h1 className={'font-semibold  whitespace-nowrap ' + (transaction?.transactionType === 'transfer' ? 'text-red-500' : 'text-[#00A389]')}>
                                                {
                                                    transaction?.transactionType === 'transfer' ? '-' + accounting.formatMoney(transaction?.amount) : accounting.formatMoney(transaction?.amount)

                                                }
                                            </h1>
                                        </div>

                                    </div>
                                ))
                        }
                        {
                            (hasNextPage || hasPrevPage) && (
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel={<div className='flex items-center justify-center px-2 py-1'>  <FaChevronRight /> </div>}
                                    previousLabel={<div className='flex items-center justify-center px-2 py-1'>  <FaChevronLeft /> </div>}
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1}
                                    pageCount={totalPages}
                                    renderOnZeroPageCount={null}
                                    containerClassName={" flex items-center justify-center w-full "}
                                    activeClassName={"duration-300 ease-out mx-2  bg-teal-600 text-white rounded-full px-2 py-1 flex items-center justify-center border-white border"}
                                    pageLinkClassName={"px-2 py-1 rounded-full"}
                                    nextClassName={"rounded-full mx-2 border-teal-500 border  flex items-center justify-center"}
                                    previousClassName={"rounded-full mx-2 border-teal-500 border  flex items-center justify-center"}
                                />
                            )

                        }





                    </div>
                </div>
            </div>


        </div>
    )
}

export default Transactions