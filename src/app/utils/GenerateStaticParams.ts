export const generateStaticParams = async ({
	params,
}: {
	params: { pageNumber: string; sortType: string };
}) => {
	if (params.pageNumber === "1") {
		return [
			{ pageNumber: "1", sortType: params.sortType },
			{ pageNumber: "2", sortType: params.sortType },
		];
	} else {
		return [{ pageNumber: "1", sortType: params.sortType }];
	}
};
