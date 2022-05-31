import { notification } from 'antd';
import axios from 'axios';
import { NotificationWarning } from '../utils/constants';

const API = axios.create({
	baseURL: "http://localhost:30002"
});

const ResponseOnFulfilled = (response: any) => {
	return response;
};

const ResponseOnReject = (error: any) => {
	// const data = error.response?.data;
	// if (data?.state === "FAILURE") {
	// 	switch (data?.errorResponse.responseCode) {
	// 		case Notification.DUPLICATE_EMAIL:
	// 			ThrowNotification(Notification.WARNING_DUPLICATE_EMAIL);
	// 			break;
	// 		case Notification.EMAIL_NOT_VALIDATED:
	// 			ThrowNotification(Notification.WARNING_EMAIL_NOT_VALIDATED);
	// 			break;
	// 		default:
	// 			data.errorResponse?.errors.map((e: ErrorData) => {
	// 				ThrowNotification(`${e.displayMessage.replace("{nome_campo}", e.input)}`);
	// 			});
	// 	}
	// } else {
	// 	ThrowNotification(Notification.WARNING_UNEXPECTED_ERROR);
	// }
	return Promise.reject(error);
};

const ThrowNotification = (description: string) => {
	notification.warning({
		message: NotificationWarning.MESSAGE,
		description: description,
	});
};

API.interceptors.response.use(ResponseOnFulfilled, ResponseOnReject);

export { API };
