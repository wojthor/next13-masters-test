"use client";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { SendReview } from "@/app/cart/actions";

export const RevievForm = ({ productId }: { productId: string }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [email, setEmail] = useState("");
	const [rating, setRating] = useState(0);

	console.log(productId);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<form data-testid="add-review-form" onSubmit={handleSubmit} className="flex w-1/3">
			<div className="space-y-12">
				<div className=" border-gray-900/10 pb-12">
					<h2 className="text-2xl font-semibold leading-7 text-gray-900">Recenzje klientów</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Jeśli korzystałeś z tego produktu, podziel się swoimi myślami z innymi klientami.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<p className="block text-sm font-medium leading-6 text-gray-900">Tytuł recenzji</p>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										name="headline"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<p className="block text-sm font-medium leading-6 text-gray-900">Opis</p>
							<div className="mt-2">
								<textarea
									id="description"
									name="content"
									rows={3}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
						</div>
						<div className="sm:col-span-4">
							<Stack spacing={1}>
								<Rating
									name="rating"
									defaultValue={0}
									value={rating}
									onChange={(event, newValue) => {
										if (newValue) {
											setRating(newValue);
										}
									}}
									precision={1}
									readOnly={false}
								/>
							</Stack>
						</div>

						<div className="sm:col-span-4">
							<p className="block text-sm font-medium leading-6 text-gray-900">Autor</p>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="text"
										name="name"
										id="username"
										autoComplete="username"
										value={author}
										onChange={(e) => setAuthor(e.target.value)}
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div className="sm:col-span-4">
							<p className="block text-sm font-medium leading-6 text-gray-900">Email</p>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="email"
										name="email"
										id="email"
										autoComplete="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>
					<button
						onClick={async () => {
							console.log(productId);

							setDescription(description);
							setEmail(email);
							setAuthor(author);
							setRating(rating);
							setTitle(title);
							await SendReview(productId, title, description, author, email, rating);
							window.location.reload();
							setDescription("");
							setEmail("");
							setAuthor("");
							setRating(0);
							setTitle(" ");
						}}
						className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					>
						Zatwierdź recenzje
					</button>
				</div>
			</div>
		</form>
	);
};
