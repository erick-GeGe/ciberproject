import { useState } from 'react'
import React from "react"



export default function Url({ url, certs, edge_l, firefox_l, chrome_l }) {
    const [visible, setVisible] = useState(true)

    function showCertificates() {
        if (visible)
            setVisible(false)
        else
            setVisible(true)
    }
    console.log('url values')
    console.log(edge_l, chrome_l, firefox_l)

    return (
        <div className='bg-gray-800 content-center w-9/12 rounded-lg m-4  mr-0'>
            <div className='grid-cols-4 gap-4 flex items-center justify-center hover:cursor-pointer' onClick={showCertificates} >
                <h3 className='text-base my-4 inline-block w-6/12 px-5'  >{url}</h3>
                <div className='inline-block w-2/12 py-5'>
                    <p className='text-center pr-7 text-lg py-3'>Microsoft Edge</p>
                    {(() => {
                        if (edge_l == 0) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input checked id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else if (edge_l == 1) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" />
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
                <div className='inline-block w-2/12 pb-3'>
                    <p className='text-center pr-7 text-lg py-3'>Mozilla Firefox</p>
                    {(() => {
                        if (firefox_l == 0) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input checked id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else if (firefox_l == 1) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" />
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
                <div className='inline-block w-2/12 pb-3'>
                    <p className='text-center pr-7 text-lg py-3'>Google Chrome</p>
                    {(() => {
                        if (chrome_l == 0) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input checked id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else if (chrome_l == 1) {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" disabled />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div class="flex flex-wrap">
                                    <div class="flex items-center mr-4">
                                        <input id="red-radio" type="radio" class="w-16 h-12 text-red-600 bg-gray-100 border-gray-300 accent-red-500 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="green-radio" type="radio" class="w-16 h-12 text-green-600 bg-yellow-100 border-gray-300 accent-yellow-300 focus:ring-2" disabled />
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input checked id="purple-radio" type="radio" class="w-16 h-12 text-purple-600 bg-gray-100 border-gray-300 accent-green-500 focus:ring-2" />
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
            <div className='bg-slate-600 rounded-md' hidden={visible}>
                <p className='px-4 py-1 text-lg text-center font-bold'>Certificados</p>
                <div className='grid-cols-6 flex items-center justify-center bg-gray-700 px-4 py-2'>
                    <div className='w-1/12 text-center'>
                        Certificado Digital
                    </div>
                    <div className='w-11/12 grid-cols-5 flex items-center justify-center'>
                        <div className='w-2/12 text-center'>
                            Subject name
                        </div>
                        <div className='w-2/12 text-center'>
                            Issuer name
                        </div>
                        <div className='w-2/12 text-center'>
                            Periodo de validez
                        </div>
                        <div className='w-3/12 text-center'>
                            Info llave prublica
                        </div>
                        <div className='w-3/12 text-center'>
                            Serial Number
                        </div>
                    </div>
                </div>

                {
                    certs.map((certificate, id) => {
                        return <div key={id} className='grid-cols-6 flex items-center justify-center bg-gray-600 px-4 py-2'>
                            <div className='w-1/12 text-center'>
                                {certificate.cert}
                            </div>
                            <div className='w-11/12 grid-cols-5 flex items-center justify-center'>
                                <div className='w-2/12 text-center'>
                                    {certificate.subject}
                                </div>
                                <div className='w-2/12 text-center'>
                                    {certificate.issuer}
                                </div>
                                <div className='w-2/12 text-center px-4'>
                                    {certificate.periodo}
                                </div>
                                <div className='w-3/12 text-center'>
                                    {certificate.info}
                                </div>
                                <div className='w-3/12 text-center'>
                                    {certificate.constraints}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div >
    )
}