loadingMsg({
    id: 'infoListWrap',
    message: '加载中'
})
loadingMsg({
    id: 'welfareWrap',
    message: '加载中'
})

//朗朗口腔墙信息请求
$.ajax({
    url: './data/index.php', //请求的url地址路径
    dataType: 'json', //返回格式为json
    async: true, 
    cache: false,
    data: {
        'categoryId': "123456"
    }, //参数值
    type: 'post', //请求方式
    beforeSend: function () {
        //请求前的处理
    },
    success: function (result) {
        let infoListWrap = document.getElementById('infoListWrap')
        if (!result.data || result.data.length === 0) {
            loadingMsg({
                id: 'infoListWrap',
                message: '数据加载失败'
            })
            return false
        }
        //请求成功的处理
        let ul = "<ul class='clearfix'>"

        result.data.forEach((item, i) => {
            item.src = './images/list00' + (i + 1) + '.jpg'
            ul += `<figure>
            <img src='${item.src}' alt='${item.title}'>
            <figcaption>${item.title}</figcaption>
            <p>${item.dec}</p>
            </figure>`

        })

        ul += '</ul>'

        setTimeout(function () {
            infoListWrap.innerHTML = ul
        }, 3000)
    },
    complete: function () {
        //请求完成的处理
    },
    error: function () {
        //请求失败时的处理
        loadingMsg({
            id: 'infoListWrap',
            message: '数据加载失败'
        })
    }
})

//公益墙数据请求
$.ajax({
    url: './data/index.php', //请求的url地址路径
    dataType: 'json', //返回格式为json
    async: true,
    cache: false, 
    data: {
        'module': 'welfare',
        'categoryId': "10000"
    }, //参数值
    type: 'post', //请求方式
    success: function (result) {
        result.data.forEach((item, i) => {
            item.myUrl = './images/welfare0' + (i + 1) + '.jpg'
        })

        let welfareList = document.getElementById('welfareWrap')
        let html = ''

        if (!result.data || result.data.length === 0) {
            loadingMsg({
                id: 'welfareWrap',
                message: '数据加载失败'
            })
            return false
        }
        html += `<div class="row">
            <div class="content-flex">
                <div class="content-flex-big">
                    <img src="${result.data[0].myUrl}" alt="${result.data[0].title}">
                </div>
                <div class="content-flex-small" style='background-color:#${result.data[0].bgColor}'>
                    <div class="content-dec">
                        <h4 class='title'>${result.data[0].title}</h4>
                        <time data-time='${result.data[0].date}'>${result.data[0].date}</time>
                        <i class='line'></i>
                        <a href="" class="link-more">
                            查看更多
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>`

        result.data.forEach((item, index) => {
            if (index != 0) {
                html += `<div class="row">
            <div class="content-flex">
                <div class="content-flex-big ${item.color}" style='background-color:#${item.bgColor}'>
                    <div class="content-dec">
                        <h4 class='title'>${item.title}</h4>
                        <time data-time='${item.date}'>${item.date}</time>
                        <i class='line'></i>
                        <p class="dec">${item.dec}</p>
                        <a href="" class="link-more">
                            查看更多
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <div class="content-flex-small">
                    <img src="${item.imgUrl}" alt="${item.title}">
                </div>
            </div>
        </div>`
            }
        })
        setTimeout(function () {
            welfareList.innerHTML = html
        }, 2000)
    },
    error: function () {
        //请求失败时的处理
        loadingMsg({
            id: 'welfareWrap',
            message: '数据加载失败'
        })
    }
})

//资讯动态数据请求
let tagMenu = document.getElementsByClassName('tab-menu')[0]
$.ajax({
    url: './data/newsCategory.php', //请求的url地址路径
    dataType: 'json', //返回格式为json
    timeout: 5000,
    async: false, //请求是否异步，默认为异步，这也是ajax的重要特性
    cache: false, //是否读取缓存
    data: {
        'module': 'news',
    }, //参数值
    type: 'post', //请求方式
    success: function (req) {
        let data = req.data
        let menuHtml = ''
        if (!data || data.length === 0) {
            loadingMsg({
                id: 'welfareWrap',
                message: '数据加载失败'
            })
            return false
        }
        data.forEach((item, index) => {
            let className = ''
            if (index === 0) {
                className = 'current'
            }
            menuHtml += `<a data-request = 'false' href="javascript:void(0)" onclick='loadNewsData({_this:this , id:${item.id} , index:${index}})' title='${item.category}' class='${className}'>${item.categoryName}</a>`
        })
        setTimeout(function () {
            tagMenu.innerHTML = menuHtml
            loadNewsData({
                _this: tagMenu.children[0],
                id: data[0].id,
                index: 0
            })
        }, 2500)
    },
    error: function () {
        //请求失败时的处理
        loadingMsg({
            id: 'welfareWrap',
            message: '数据加载失败'
        })
    }
})


function loadNewsData(params) {
    //选中高光显示
    let aItem = tagMenu.children
    for (let i = 0; i < aItem.length; i++) {
        aItem[i].className = ''
    }
    params._this.className = 'current'


    //显示指定的内容区域
    let = tabContentWrap = document.getElementById('tab-content-wrap').children
    for (let i = 0; i < tabContentWrap.length; i++) {
        tabContentWrap[i].style.display = 'none'
    }
    tabContentWrap[params.index].style.display = 'block'
    
    //判断数据是否已经读取过了，如果已经读取则不执行
    let getRequest = params._this.getAttribute('data-request')
    if (getRequest === 'false') {
        $.ajax({
            url: './data/indexNews.php', //请求的url地址路径
            dataType: 'json', //返回格式为json
            timeout: 5000,
            data: JSON.stringify({
                'categoryId': params.id,
            }), //参数值
            headers: {
                'Content-Type': "application/json; charset = utf-8"
            },
            type: 'POST', //请求方式
            success: function (req) {
                console.log(req)
                let data = req.data

                let html = `<div class='row-container gutter-15 padding-top-73 padding-bottom-102'><div class="row-wrap">`
                data.forEach((item, i) => {
                    let timeData = item.time.split(' ')
                    console.log(timeData)
                    item.imgUrl = './images/news0' + (i + 1) + '.jpg'

                    html += `
                        <div class='col-item-3'>
                        <div class="item">
                            <div class='img-cover' style="background-image:url('${item.imgUrl}')">
                            <img src="./images/blank/indexNews.png" alt="${item.title}" style='width:100%'>
                            </div>
                            <div class='figure-content padding-top-24'>
                            <h4 class="title">${item.title}</h4>
                            <time data-time='${timeData[0]}' pubtime='${timeData[0]}'>${timeData[0]}</time>
                            <i class="line"></i>
                            <p class="dec">${item.dec}</p>
                            <a href="" class="link-more">
                            查看更多
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            </a>
                            </div>
                        </div>
                        </div>`
                })
                html += `</div></div>`
                tabContentWrap[params.index].innerHTML = html
                params._this.setAttribute('data-request', 'true')
            },
            error: function () {
                //请求失败时的处理
                loadingMsg({
                    id: 'welfareWrap',
                    message: '数据加载失败'
                })
            }
        })
    }
}