import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<Main />
			<Product />
		</div>
	);
}