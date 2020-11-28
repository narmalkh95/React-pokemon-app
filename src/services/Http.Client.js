import "whatwg-fetch";

const BaseUrl = process.env.REACT_APP_ServerUrl;

export const HandleResponseState = res => res || false;

export const Post = (url, headers = {}, body = {}, plainBody = false) => {
	if (!headers.Accept) {
		headers.Accept = "application/json, */*";
	}

	return fetch(BaseUrl + "/" + url, {
		method: "POST",
		headers,
		body: plainBody ? body : JSON.stringify(body).toString()
	})
		.then(response => response.json())
		.catch(data => {
			console.log("Error", data);
		});
};

export const Delete = (url, headers = {}, body = {}, authorized = false, plainBody = false) => {
	return fetch(BaseUrl + "/" + url, {
		method: "DELETE",
		headers,
		body: plainBody ? body : JSON.stringify(body).toString()
	})
		.then(response => response.json())
		.catch(data => {
			console.log("Error", data);
		});
};

export const Get = (url, headers = {}) => {
	if (!headers.Accept) {
		headers.Accept = "application/json, */*";
	}

	return fetch(BaseUrl + "/" + url, {
		method: "GET",
		headers
	})
		.then(response => response.json())
		.catch(data => {
			console.log("Error", data);
		});
};

export const Put = (url, headers = {}, body = {}) => {
	if (!headers["Content-Type"]) {
		headers["Content-Type"] = "application/json";
	}
	
	return fetch(BaseUrl + "/" + url, {
		method: "PUT",
		headers,
		body: JSON.stringify(body).toString()
	})
		.then(response => response.json())
		.catch(data => {
			console.log("Error", data);
		});
};
