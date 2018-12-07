/**
 * @description 비동기 처리 공통 함수
 * @param {string} url
 * */


export const get = ((url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject('Error:' + xhr.status);
                }
            }
        };

        xhr.open('GET', url);
        xhr.send();

    });
});

export const jsonPost = ((url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject('Error:' + xhr.status);
                }
            }
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data));

    });
});

export const jsonPut = ((url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject('Error:' + xhr.status);
                }
            }
        };


        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    })
});


export const formPut = ((url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject('Error: ' + xhr.status);
                }
            }
        };

        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(data);
    })
});