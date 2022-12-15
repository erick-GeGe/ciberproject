import { useState } from 'react'
import Url from './url';
import { Link } from 'react-router-dom';

function Digitalcert() {
	const [urls, setUrls] = useState([])

	function handleValidate() {
		var txt_url = document.getElementById('v_url').value;
		if (txt_url) {
			validate_url(txt_url)
		}
		document.getElementById('v_url').value = "";
	}

	function clearUrls() {
		setUrls([])
	}

	function readFile(e) {
		var archivo = e.target.files[0];
		if (!archivo) {
			return;
		}
		var lector = new FileReader();
		lector.onload = async function (e) {
			var contenido = e.target.result;

			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({ urls: contenido })
			};
			const response = await fetch('http://143.198.224.105:3000/urls', requestOptions);
			const data = await response.json();
			console.log(data)
			setUrls([...data, ...urls])
		};
		lector.readAsText(archivo);
	}


	async function validate_url(url) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ url })
		};
		const response = await fetch('http://143.198.224.105:3000/url', requestOptions);
		const data = await response.json();
		console.log(data)
		setUrls([data, ...urls])
	}


	return (
		<div className="bg-slate-700 h-screen py-3">
			<div className='bg-slate-700'>

				<div className='flex justify-center'>
					<h1 className=' bg-slate-800 py-6 text-center text-6xl text-white font-sans font-extrabold w-full '>
						Digital Certificates Trust Verifier
					</h1>
				</div>
				<div className='grid-cols-4 gap-4 flex items-center justify-center mt-5 mx-8'>
                    <Link className='bg-slate-600 text-white rounded-lg text-lg hover:bg-gray-700 hover:border-gray-900 hover:border-2 hover:cursor-pointer w-4/12 text-center ' to="/truststore" state={{ browser: "edge" }} >Truststore Microsoft Edge</Link>
                    <Link className='bg-slate-600 text-white rounded-lg text-lg hover:bg-gray-700 hover:border-gray-900 hover:border-2 hover:cursor-pointer w-4/12 text-center ' to="/truststore" state={{ browser: "firefox" }}>Truststore Mozilla Firefox</Link>
                    <Link className='bg-slate-600 text-white rounded-lg text-lg hover:bg-gray-700 hover:border-gray-900 hover:border-2 hover:cursor-pointer w-4/12 text-center ' to="/truststore" state={{ browser: "chrome" }}>Truststore Google Chrome</Link>
				</div>
				<div className='bg-slate-800 w-8/12 py-8 my-4 mx-auto text-white rounded-lg px-14 '>
					<p className='text-white py-2 text-2xl'>Ingrese el link o archivo para verificar: </p>
					<div className='flex flex-row text-gray-400 py-2 text-2xl'>
						<input
							className='w-4/5 mr-10 text-base rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-900 focus:outline-none px-4'
							placeholder='Ingrese aqui el url a analizar'
							type="text"
							id='v_url' />
						<button className='ml-10 bg-gray-200 text-black px-5 rounded-md py-0 h-9 hover:bg-gray-400 text-base leading-7 my-auto'
							onClick={handleValidate}
						>Validar</button>
						<button className='ml-10 bg-gray-200 text-black px-5 rounded-md py-0 h-9 hover:bg-gray-400 text-base leading-7 my-auto'
							onClick={clearUrls}
						>Limpiar</button>
					</div>
					<input type="file" id="file-input" onChange={readFile} />
				</div>
				<div className='flex flex-col items-center justify-center text-white'>
					{
						urls.map((singleUrl, id) => {
							return <Url
								key={id} url={singleUrl.url}
								cert={singleUrl.cert}
								edge_l={singleUrl.edge_l}
								firefox_l={singleUrl.firefox_l}
								chrome_l={singleUrl.chrome_l}
								certs={singleUrl.certificates}
							></Url>
						})
					}
				</div>
			</div>
		</div>
	)
}

export default Digitalcert
