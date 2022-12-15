import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Digitalcert from './components/digitalcert'
import Truststore from './components/truststore'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route name="trust" path="/truststore" element={<Truststore />} />
				<Route path="/" element={<Digitalcert />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
