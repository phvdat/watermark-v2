import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocalStorage } from 'usehooks-ts'
import './Upload.css'

function UploadForm() {

	const [formValueLocal, setFormValueLocal] = useLocalStorage('formValueLocal', JSON.stringify({
		logoUrl: '',
		logoWidth: 1000,
		logoHeight: 1000,
		imageWidth: 1000,
		imageHeight: 1000,
		quality: 50,
		idTelegram: '',
		shopName: ''
	}))

	const { register, handleSubmit, formState: { errors } } = useForm(
		{
			defaultValues: JSON.parse(formValueLocal)
		});
	const [message, setMessage] = React.useState(null);

	const onSubmit = async (data) => {
		// Reset download link
		setMessage(null);
		const formData = new FormData();
		formData.append('excelFile', data.excelFile[0]);
		formData.append('logoUrl', data.logoUrl);
		formData.append('logoWidth', data.logoWidth);
		formData.append('logoHeight', data.logoHeight);
		formData.append('imageWidth', data.imageWidth);
		formData.append('imageHeight', data.imageHeight);
		formData.append('quality', data.quality);
		formData.append('idTelegram', data.idTelegram);
		formData.append('shopName', data.shopName);
		try {
			await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/process`, formData);
			const { excelFile, ...formLocal } = data
			setFormValueLocal(JSON.stringify(formLocal))
		} catch (error) {
			console.error('Error uploading the Excel file:', error);
		}
		finally {
			setMessage('Processing the images, waiting and check telegram message...');
		}
	};

	return (
		<div className='container'>
			<h1>Image Processing</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="excelFile">Excel File:</label>
					<input type="file" id="excelFile" {...register('excelFile', { required: true })} />
					{errors.excelFile && <p className='error'>This field is required</p>}
				</div>
				<div>
					<label htmlFor="logoUrl">Logo URL:</label>
					<input type="text" id="logoUrl" {...register('logoUrl', { required: true })} />
					{errors.logoUrl && <p className='error'>This field is required</p>}
				</div>
				<div>
					<label htmlFor="idTelegram">Id Telegram:</label>
					<input type="text" id="idTelegram" {...register('idTelegram', { required: true })} />
					{errors.idTelegram && <p className='error'>Require field</p>}
				</div>
				<div>
					<label htmlFor="shopName">Shop name:</label>
					<input type="text" id="shopName" {...register('shopName', { required: true })} />
					{errors.shopName && <p className='error'>Require field</p>}
				</div>
				<div>
					<label htmlFor="logoWidth">Logo Width:</label>
					<input type="number" id="logoWidth" {...register('logoWidth', { min: 0 })} />
					{errors.logoWidth && <p className='error'>Logo width must be a positive number</p>}
				</div>
				<div>
					<label htmlFor="logoHeight">Logo Height:</label>
					<input type="number" id="logoHeight" {...register('logoHeight', { min: 0 })} />
					{errors.logoHeight && <p className='error'>Logo height must be a positive number</p>}
				</div>
				<div>
					<label htmlFor="imageWidth">Image Width:</label>
					<input type="number" id="imageWidth" {...register('imageWidth', { min: 0 })} />
					{errors.imageWidth && <p className='error'>Image width must be a positive number</p>}
				</div>
				<div>
					<label htmlFor="imageHeight">Image Height:</label>
					<input type="number" id="imageHeight" {...register('imageHeight', { min: 0 })} />
					{errors.imageHeight && <p className='error'>Image height must be a positive number</p>}
				</div>
				<div>
					<label htmlFor="quality">Quality:</label>
					<input type="number" id="quality" {...register('quality', { min: 0, max: 100 })} />
					{errors.quality && <p className='error'>Quality height must be a positive number</p>}
				</div>

				<button type="submit" disabled={message}>Upload and Process</button>
				{message && <p>{message}</p>}
			</form>
		</div>
	);
}

export default UploadForm;