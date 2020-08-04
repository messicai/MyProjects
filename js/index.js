window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    var focusWidth = focus.offsetWidth
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        var timer = setInterval(function() {
            arrow_r.click()
        }, 3000)
    })
    var ol = focus.querySelector('ol')
    var ul = focus.querySelector('ul')
    for (i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li')
        li.setAttribute('index', i)
        ol.appendChild(li)
        li.addEventListener('click', function() {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            var index = this.getAttribute('index')
            num = index
            circle = index
            console.log(index);
            console.log(focusWidth);

            this.className = 'current'
            animate(ul, -index * focusWidth)
        })
    }
    ol.children[0].className = 'current'
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    var num = 0
    var circle = 0
    var flag = true //节流阀//
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false //关闭节流阀
            if (num == 4) {
                ul.style.left = '0'
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, function() {
                flag = true //打开节流阀
            })
            circle++
            if (circle == 4) {
                circle = 0
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[circle].className = 'current'
        }
    })
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false //关闭节流阀
            if (num == 0) {
                ul.style.left = -num * focusWidth + 'px'
                num = ul.children.length - 1
            }
            num--
            animate(ul, -num * focusWidth, function() {
                flag = true //打开节流阀
            })
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[circle].className = 'current'
        }
    })
    var timer = setInterval(function() {
        arrow_r.click()
    }, 3000)

})

// jquery部分
$(function() {
    var tooltop = $(".floor").offset().top;
    var flag = true
    $(window).scroll(function() {
        if (flag) {
            if ($(document).scrollTop() >= tooltop) {
                $(".fixedtool").stop().fadeIn()
            } else {
                $(".fixedtool").stop().fadeOut()
            }
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("fixedcolor").siblings().removeClass("fixedcolor")
                }
            })
        }
    })
    $(".fixedtool li").click(function() {
        flag = false
        console.log($(this).index());
        var offtop = $(".floor .w").eq($(this).index()).offset().top
        $("body,html").stop().animate({
            scrollTop: offtop
        }, function() {
            flag = true
        })
        $(this).addClass("fixedcolor").siblings().removeClass("fixedcolor")

    })
})