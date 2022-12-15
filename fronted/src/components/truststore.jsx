import React from "react";
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Truststore() {
    const location = useLocation()
    const { browser } = location.state

    let browser_title = ""
    let url = ""
    if (browser == "edge") {
        browser_title = "Microsoft Edge"

    }
    else if (browser == "firefox") {
        browser_title = "Mozilla Firefox"

    }
    else {
        browser_title = "Google Chrome"

    }
    const certs = [0, 0, 0]
    const num_cert = 1

    return (
        <div className="bg-slate-700 h-screen py-3">
            <div className='bg-slate-700'>
                <div className='flex justify-center bg-slate-800 py-6 '>

                    <Link className="bg-white mx-5 leading-9 h-8 px-3 rounded-md hover:bg-gray-500" to={"/"}>Volver</Link>
                    <h1 className=' text-center text-2xl text-white font-sans font-extrabold w-full '>
                        Trust Store {browser_title}
                    </h1>
                </div>
                <div className="my-5 py-4 px-4 mx-6 grid-cols-3 flex items-center justify-center">
                    <p className="bg-slate-600 text-lg text-gray-200 w-4/12 mx-4 py-2 text-center rounded-md">Numero total de certificados: {num_cert}</p>
                    <p className="bg-slate-600 text-lg text-gray-200 w-4/12 mx-4 py-2 text-center rounded-md">Tipos de llaves utilizadas: {num_cert}</p>
                    <p className="bg-slate-600 text-lg text-gray-200 w-4/12 mx-4 py-2 text-center rounded-md">Tamaños de llaves utilizadas: {num_cert}</p>
                </div>

                <p className="text-white bg-gray-700 py-4 text-xl text-center">CD mas nuevos</p>
                <div>
                    <div className='mx-auto grid-cols-3 flex items-center justify-center bg-slate-700 px-4 py-2 text-white text-lg  w-9/12'>
                        <div className='w-6/12 text-center'>
                            Certificado Digital
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Desde
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Hasta
                        </div>
                    </div>
                    {
                        certs.map((certificate, id) => {
                            return <div key={id} className='grid-cols-3 flex items-center justify-center bg-slate-600 text-gray-300 px-4 py-3 mx-auto w-9/12'>
                                <div className='w-6/12 text-center'>
                                    test 1
                                </div>
                                <div className='w-3/12 text-center'>
                                    periodo desde
                                </div>
                                <div className='w-3/12 text-center'>
                                    hasta
                                </div>

                            </div>
                        })
                    }
                </div>

                <p className="text-white bg-gray-700 py-4 my-5 text-xl text-center">CD mas longevos</p>
                <div className="">
                    <div className='mx-auto grid-cols-3 flex items-center justify-center bg-slate-700 px-4 py-2 text-white text-lg w-9/12'>
                        <div className='w-6/12 text-center'>
                            Certificado Digital
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Desde
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Hasta
                        </div>
                    </div>
                    {
                        certs.map((certificate, id) => {
                            return <div key={id} className='mx-auto grid-cols-3 flex text-gray-300 items-center justify-center bg-slate-600 px-4 py-3 w-9/12'>
                                <div className='w-6/12 text-center'>
                                    test 1
                                </div>
                                <div className='w-3/12 text-center'>
                                    periodo desde
                                </div>
                                <div className='w-3/12 text-center'>
                                    hasta
                                </div>

                            </div>
                        })
                    }
                </div>

                <p className="text-white bg-gray-700 py-4 my-5 text-xl text-center">Todos los CDs</p>
                <div className="pb-5">
                    <div className='grid-cols-3 flex items-center justify-center bg-slate-700 px-4 py-2 text-white text-lg mx-auto w-9/12'>
                        <div className='w-6/12 text-center'>
                            Certificado Digital
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Desde
                        </div>
                        <div className='w-3/12 text-center'>
                            Periodo Validez - Hasta
                        </div>
                    </div>
                    {
                        certs.map((certificate, id) => {
                            return <div key={id} className='grid-cols-3 flex items-center justify-center bg-slate-600 text-gray-300  px-4 py-3 mx-auto w-9/12'>
                                <div className='w-6/12 text-center'>
                                    test 1
                                </div>
                                <div className='w-3/12 text-center'>
                                    periodo desde
                                </div>
                                <div className='w-3/12 text-center'>
                                    hasta
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Truststore
