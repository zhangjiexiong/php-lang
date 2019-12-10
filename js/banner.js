// //获取 最外面的 div 【显示范围的盒子】
let slideWrap = document.getElementById('slide-wrap');
// //获取 存放 ul 的div 【存放所有图片于一行的盒子】
let slideContent = slideWrap.getElementsByClassName('slide-content')[0];
// //获取 图片对象 [li]
let liItem = slideContent.getElementsByTagName('li');
// //获取可视区的宽度
let viewWidth = document.documentElement.clientWidth || document.body.clientWidth;

//设置 轮播图 索引 暂存值
let num = 0;
//轮播图开关，防卡死
let flag = false;
//标记定时器
let flagTimer = null;
//自动播放定时器
let autoTimer = null;

// //设置滚动对象的宽度
slideContent.style.width = viewWidth * liItem.length + 'px';
for (let i = 0; i < liItem.length; i++) {
    liItem[i].style.width = viewWidth + 'px';
}

//获取分页的按钮对象
let aItem = slideWrap.getElementsByClassName('slide-nav')[0].getElementsByTagName('a');
for (let j = 0; j < aItem.length; j++) {
    aItem[j].onclick = function(){
        num = j
        imgSlide(j)
    }
}

//自动滚动轮播图
autoTimer = setInterval(function(){
    num++;
    num = num > liItem.length-1?0:num;
    imgSlide(num)
},2000)

slideWrap.onmouseenter = function(){
    clearInterval(autoTimer)
}
slideWrap.onmouseleave = function(){
    autoTimer = setInterval(function(){
        num++;
        num = num > liItem.length-1?0:num;
        imgSlide(num)
    },2000)
}

//获取 上一张 和 下一张 的按钮 并注册点击事件
let prev = slideWrap.getElementsByClassName('slide-prev')[0]
let next = slideWrap.getElementsByClassName('slide-next')[0]

prev.onclick = function(){
    if(flag){return }
    flag = true;
    num--;
    num = num < 0?liItem.length-1:num;  
    imgSlide(num)

}
next.onclick = function(){
    if(flag){return }
    flag = true;
    num++;
    num = num > liItem.length-1?0:num;
    imgSlide(num)
}







//分页按钮高光切换
function toogleHigh(num){
    for(let k = 0;k<aItem.length;k++){
        aItem[k].className = ''
    }
    aItem[num].className='current'
}

//轮播图滚动方法
function imgSlide(index){
    let left = index * viewWidth
    slideContent.style.left = -left + 'px';
    flagTimer = setTimeout(function(){
        flag = false
        clearTimeout(flagTimer)
    },1000)
    toogleHigh(num)
}



