//发送请求
const ajaxRequest = (url, method) => {
  const promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    // 指定通信过程中状态改变时的回调函数
    const handler = function () {
      // 4表示请求已完成并且响应已准备好
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(this.response)
          // document.querySelector('#resultBox').innerHTML = xhr.responseText
        } else {
          reject(new Error(this.statusText))
          // document.querySelector('#resultBox').innerHTML = xhr.responseText
        }
      }
    }
    xhr.onreadystatechange = handler
    xhr.onerror = function (e) {
      document.write(e)
    }

    // open方式用于指定HTTP动词、请求的网址、是否异步
    xhr.open(method, url, true)

    //请求头

    //用来指定服务器返回数据（xhr.response）的类型
    xhr.responseType = 'json'

    // 发送HTTP请求
    xhr.send(null)
  })
  return promise
}

const el0 = document.querySelector('#test0')
el0.addEventListener('click', () => {
  const url = 'http://127.0.0.1:3000/test0', method = 'GET'
  ajaxRequest(url, method).then(data => {
    console.log(data, 'data_test0')
  }, error => {
    throw error
  })
})


const el1 = document.querySelector('#test1')
el1.addEventListener('click', () => {
  const url = 'http://127.0.0.1:3000/test1'
  let options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(url, options).then(data => {
    console.log(data, 'data')
    console.log(data.json(), 'data.json()')
    return data.json()
  }).then(res => {
    console.log(res, 'test1_res') // res是最终的结果
  })
})