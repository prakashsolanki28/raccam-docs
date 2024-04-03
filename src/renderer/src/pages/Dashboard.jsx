/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleRight } from "react-icons/fa6";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../assets/css/myswiper.css'
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
// Images
import Merge_pdf from '../assets/images/merge_pdf.jpeg';
import Split_pdf from '../assets/images/split_pdf.jpeg';
import Compress_pdf from '../assets/images/compress_pdf.jpeg';

function Dashboard() {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-md-flex align-items-center mb-3 mx-2">
                        <div className="mb-md-0 mb-3">
                            <h3 className="font-weight-bold mb-0">Hello, PHQ</h3>
                            <p className="mb-0">
                                Welcome to phqDocs dashboard, manage your files and documents
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-0 mb-4" />
            <div className="card shadow-xs border mb-4 pb-3">
                <div className="card-header pb-0 p-3">
                    <h6 className="mb-0 font-weight-semibold text-lg">PDF Document</h6>
                    <p className="text-sm mb-1">
                        Esay to modify and create pdf document
                    </p>
                </div>
                <div className="card-body p-3">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="mySwiper"
                        style={{ width: '100%' }}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1
                            },
                            640: {
                                slidesPerView: 1
                            },
                            768: {
                                slidesPerView: 2
                            },
                            1024: {
                                slidesPerView: 3
                            },
                            1700: {
                                slidesPerView: 4
                            }
                        }}
                    >
                        <SwiperSlide>
                            <div className="card card-background border-radius-xl card-background-after-none align-items-start mb-4">
                                <div className="full-background" style={{ backgroundImage: `url('${Merge_pdf}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
                                <span className="mask bg-dark opacity-1 border-radius-sm"></span>
                                <div className="card-body text-start p-3 w-100">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link to="/dashboard/pdf/merge">
                                                <div className="blur shadow d-flex align-items-center w-100 border-radius-md border border-white mt-8 p-3">
                                                    <div className="w-50">
                                                        <p className="text-dark text-sm font-weight-bold mb-1">Merge Pdf</p>
                                                        <p className="text-xs text-secondary mb-0">
                                                            Merge multiple pdf into one
                                                        </p>
                                                    </div>
                                                    <span className='text-dark text-sm font-weight-bold ms-auto'>
                                                        <FaChevronRight size={20} />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card card-background border-radius-xl card-background-after-none align-items-start mb-4">
                                <div className="full-background" style={{ backgroundImage: `url('${Split_pdf}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
                                <span className="mask bg-dark opacity-1 border-radius-sm"></span>
                                <div className="card-body text-start p-3 w-100">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link to="/dashboard/pdf/split">
                                                <div className="blur shadow d-flex align-items-center w-100 border-radius-md border border-white mt-8 p-3">
                                                    <div className="w-50">
                                                        <p className="text-dark text-sm font-weight-bold mb-1">Split Pdf</p>
                                                        <p className="text-xs text-secondary mb-0">
                                                            Split pdf into multiple files by page Range
                                                        </p>
                                                    </div>
                                                    <span className="text-dark text-sm font-weight-bold ms-auto">
                                                        <FaChevronRight size={20} />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card card-background border-radius-xl card-background-after-none align-items-start mb-4">
                                <div className="full-background" style={{ backgroundImage: `url('${Compress_pdf}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
                                <span className="mask bg-dark opacity-1 border-radius-sm"></span>
                                <div className="card-body text-start p-3 w-100">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link to="/">
                                                <div className="blur blur-hover shadow d-flex align-items-center w-100 border-radius-md border border-white mt-8 p-3">
                                                    <div className="w-50">
                                                        <p className="text-dark text-sm font-weight-bold mb-1">Compress Pdf Size</p>
                                                        <p className="text-xs text-secondary mb-0">
                                                            Compress pdf size to reduce file size
                                                        </p>
                                                    </div>
                                                    <span className="text-dark text-sm font-weight-bold ms-auto">
                                                        <FaChevronRight size={20} />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                {/* Expolore all */}
                <hr className="my-0" />
                <div className="card-footer text-end pe-5 pb-0">
                    <Link to="/" className="text-primary text-sm font-weight-bold d-flex justify-content-end align-items-center">Explore all  <FaAngleRight className='ms-2' />
                    </Link>
                </div>

                <Link to="/dashboard/video/crop">Crop Video</Link>
            </div >
        </>
    );
}

export default Dashboard;

// 746


/*
    // make responsive
                        breakpoints={{
                            0: {
                                slidesPerView: 1
                            },
                            640: {
                                slidesPerView: 1
                            },
                            768: {
                                slidesPerView: 2
                            },
                            1024: {
                                slidesPerView: 3
                            },
                            1700: {
                                slidesPerView: 4
                            }
                        }}
*/