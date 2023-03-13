import { ChangeEventHandler, MouseEventHandler } from "react";

interface IForm {
	labelName: string;
	type: string;
	name: string;
	placeholder: string;
	value: string;
	handleChange?: ChangeEventHandler<HTMLInputElement>;
	isSurpriseMe?: boolean;
	handleSurpriseMe?: MouseEventHandler<HTMLButtonElement>;
}

const FormField = ({
	labelName,
	type,
	name,
	placeholder,
	value,
	handleChange,
	isSurpriseMe,
	handleSurpriseMe,
}: IForm) => {
	return (
		<div>
			<div className='flex items-center gap-2 mb-2'>
				<label
					htmlFor={name}
					className='block text-sm font-medium text-gray-900'
				>
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
						type='button'
						onClick={handleSurpriseMe}
					>
						Random prompt
					</button>
				)}
			</div>
			<input
				value={value}
				{...{ type, placeholder, name }}
				required
				onChange={handleChange}
				id={name}
				className='bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
			/>
		</div>
	);
};
export default FormField;
