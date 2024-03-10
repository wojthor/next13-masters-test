import { format } from "date-fns/format";

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return format(date, "dd.MM.yyyy ");
};
