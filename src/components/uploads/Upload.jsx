import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Upload.css'

function UploadForm() {
	const { register, handleSubmit, setError, formState: { errors } } = useForm(
		{
			defaultValues: {
				logoWidth: 1200,
				logoHeight: 1200,
				imageWidth: 1200,
				imageHeight: 1200
			}
		});
	const [downloadLink, setDownloadLink] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const onSubmit = async (data) => {
		// Reset download link
		setDownloadLink(null);
		setLoading(true);
		const formData = new FormData();
		formData.append('excelFile', data.excelFile[0]);
		formData.append('logoUrl', data.logoUrl);
		formData.append('logoWidth', data.logoWidth);
		formData.append('logoHeight', data.logoHeight);
		formData.append('imageWidth', data.imageWidth);
		formData.append('imageHeight', data.imageHeight);

		try {
			const response = await axios.post('http://localhost:8000/process', formData);
			setDownloadLink(response.data.downloadLink);
		} catch (error) {
			console.error('Error uploading the Excel file:', error);
		}
		finally {
			setLoading(false);
		}
	};

	return (
		<div className='container'>
			<h1>Image Processing</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="excelFile">Excel File:</label>
					<input type="file" id="excelFile" {...register('excelFile', { required: true })} />
					{errors.excelFile && <span>This field is required</span>}
				</div>
				<div>
					<label htmlFor="logoUrl">Logo URL:</label>
					<input type="text" id="logoUrl" {...register('logoUrl')} />
				</div>
				<div>
					<label htmlFor="logoWidth">Logo Width:</label>
					<input type="number" id="logoWidth" {...register('logoWidth', { min: 0 })} />
					{errors.logoWidth && <span>Logo width must be a positive number</span>}
				</div>
				<div>
					<label htmlFor="logoHeight">Logo Height:</label>
					<input type="number" id="logoHeight" {...register('logoHeight', { min: 0 })} />
					{errors.logoHeight && <span>Logo height must be a positive number</span>}
				</div>
				<div>
					<label htmlFor="imageWidth">Image Width:</label>
					<input type="number" id="imageWidth" {...register('imageWidth', { min: 0 })} />
					{errors.imageWidth && <span>Image width must be a positive number</span>}
				</div>
				<div>
					<label htmlFor="imageHeight">Image Height:</label>
					<input type="number" id="imageHeight" {...register('imageHeight', { min: 0 })} />
					{errors.imageHeight && <span>Image height must be a positive number</span>}
				</div>
				<button type="submit">Upload and Process</button>
			</form>
			{/* Render download link if available */}
			{downloadLink && !loading && (
				<div>
					<p>Processing completed! Download the ZIP file:</p>
					<a href={downloadLink} download>Download ZIP</a>
				</div>
			)}
		</div>
	);
}

export default UploadForm;