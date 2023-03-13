import { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";

interface IcardProps {
	data: any;
	title: string;
}

const RenderCards = ({ data, title }: IcardProps) => {
	if (data?.length > 0)
		return data.map((post: any) => <Card key={post.id} {...post} />);

	return (
		<h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
	);
};

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [allPosts, setAllPosts] = useState<null>(null);

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const response = await fetch("http://localhost:8080/api/v1/post", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const result = await response.json();

				setAllPosts(result.data.reverse());
			}
		} catch (e) {
			alert(e);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>
					Gallery of AI generated images
				</h1>

				<div className='mt-10'>
					{loading ? (
						<div className='flex justify-center items-center'>
							<Loader />
						</div>
					) : (
						<>
							<div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
								<RenderCards data={allPosts} title='No posts found' />
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
