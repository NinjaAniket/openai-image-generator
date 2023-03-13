import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import preview from "../assets/preview.png";
import { getRandomPrompts } from "../utils";

type form = {
	name: string;
	prompt: string;
	photo: string;
};

const CreatePost = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState<form>({ name: "", prompt: "", photo: "" });
	const [generatingImg, setGeneratingImg] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	function handleChange(e: { target: { name: string; value: string } }) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSurpriseMe() {
		const randomPrompt = getRandomPrompts(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	}

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (form.prompt && form.photo) {
			setLoading(true);

			try {
				const response = await fetch("http://localhost:8080/api/v1/post", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify(form),
				});
				await response.json();
				navigate("/");
			} catch (e) {
				alert(e);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please enter a prompt to generate a image");
		}
	};

	async function handleGenerateImage() {
		if (form.prompt) {
			try {
				setGeneratingImg(true);

				if (form.photo) setForm({ ...form, photo: "" });
				const response = await fetch("http://localhost:8080/api/v1/ai", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});

				const data = await response.json();
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} catch (e) {
				alert(e);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert("Please enter a prompt");
		}
	}

	const noValues = !form.name || !form.prompt || !form.photo;

	return (
		<section className='max-w-7xl mx-auto'>
			<h1 className='font-extrabold text-[#222328] text-[32px]'>
				Generate Images with description
			</h1>
			<form className='mt-16 max-w-3xl'>
				<div className='flex flex-col gap-5'>
					<FormField
						labelName='your name'
						type='text'
						name='name'
						placeholder='john doe'
						value={form.name}
						{...{ handleChange }}
					/>
					<FormField
						labelName='prompt'
						type='text'
						name='prompt'
						placeholder='john doe'
						value={form.prompt}
						{...{ handleChange }}
						isSurpriseMe
						{...{ handleSurpriseMe }}
					/>
					<div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className='w-full h-full object-contain'
							/>
						) : (
							<img
								src={preview}
								alt='preview'
								className='w-9/12 h-9/12 object-contain opacity-40'
							/>
						)}

						{generatingImg && (
							<div
								className='absolute inset-0 z-0 flex
                            justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg
                            '
							>
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className='mt-5 flex gap-5'>
					<button
						type='button'
						onClick={handleGenerateImage}
						className='text-white text-sm w-full sm:w-auto px-5 py-2.5 bg-green-700 font-medium'
					>
						{generatingImg ? "Generating..." : "Generate"}
					</button>
				</div>

				<div className='mt-10'>
					<p className='mt-2  mb-4 text-[#66e75] text-[14px]'>
						Add to Gallery?
					</p>
					<button
						onClick={handleSubmit}
						disabled={noValues}
						type='button'
						className={
							noValues
								? " bg-[#070935] text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
								: "mt-3 text-white bg-[#070935]  font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						}
					>
						{loading ? "Sharing" : "Save now"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreatePost;

//if using just fe
// try {
// 	setGeneratingImg(true);
// 	const response = await openai.createImage({
// 		prompt: form.prompt,
// 		n: 1,
// 		size: "1024x1024",
// 		response_format: "b64_json",
// 	});
// 	console.log({ response });

// 	const photo = response.data.data[0].b64_json;

// 	// const data = await photo.json();
// 	setForm({ ...form, photo: `data:image/jpeg;base64,${photo}` });

// }
