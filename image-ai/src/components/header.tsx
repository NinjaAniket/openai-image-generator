import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

type Props = {};

const Header = (props: Props) => {
	const { pathname } = useLocation();
	return (
		<header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b[#e6ebf4]'>
			<Link to='/'>
				<img src={logo} alt='logo' className='w-28 object-contain'></img>
			</Link>

			{pathname === "/" ? (
				<Link
					to='/create-post'
					className='font-inter font-medium bg-[#0b0f58]  text-white px-4 py-2 rounded-md'
				>
					Create
				</Link>
			) : (
				<Link
					to='/'
					className='font-inter font-medium bg-[#0b0f58]  text-white px-4 py-2 rounded-md'
				>
					Home
				</Link>
			)}
		</header>
	);
};

export default Header;
