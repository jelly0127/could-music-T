import request from '../util/request'

//用户登录
export const loginInfo = data => {
    return request({
        method: 'POST',
        url: '/login/cellphone',
        data
    })
}

//获取用户信息接口
export const getUser = (uid) => {
    return request({
        method: 'get',
        url: '/user/detail',
        params: {
            uid
        }
    })
}

//获取歌曲详情接口
export const getMusicDetail = (...ids) => {
    return request({
        method: 'get',
        url: `/song/detail?ids=${ids}`,

    })
}

//获取歌词
export const getMusicLyric = id => {
    return request({
        method: 'get',
        url: `/lyric?id=${id}`,

    })
}


//获取轮播图接口
export const getBanner = () => {
    return request({
        method: 'get',
        url: '/banner',
    })
}

//推荐歌单接口
export const getPersonalized = params => {
    return request({
        method: 'get',
        url: '/personalized',
        params: {
            limit: 10
        }
    })
}

//最新音乐接口
export const getNewSongs = () => {
    return request({
        method: 'get',
        url: '/personalized/newsong',

    })
}

//推荐mv接口
export const getMvs = () => {
    return request({
        method: 'get',
        url: '/personalized/mv',
    })
}

//点击播放音乐接口
export const playSongs = (id) => {
    return request({
        method: 'get',
        url: '/song/url',
        params: {
            id
        }
    })
}

//获取顶部标签不同国家歌曲接口
export const topDates = (cat = "全部", limit = 1) => {
    return request({
        method: 'get',
        url: '/top/playlist/highquality',
        params: {
            limit,
            cat
        }
    })
}

//获取歌单列表接口
export const ListDates = (cat = "全部", limit = 10,
    offset) => {
    return request({
        method: 'get',
        url: '/top/playlist/',
        params: {
            limit,
            offset,
            cat
        }
    })
}

//获取最新音乐数据接口
export const songLists = (type = "0") => {
    return request({
        method: 'get',
        url: '/top/song',
        params: {
            type
        }
    })
}

//获取mv数据接口
export const mvLists = (type, area, order, limit, offset) => {
    return request({
        method: 'get',
        url: '/mv/all',
        params: {
            type,
            area,
            order,
            limit,
            offset
        }
    })
}

//搜索接口
export const getSearch = (keywords, type, limit, offset) => {
    return request({
        method: 'get',
        url: '/search',
        params: {
            keywords,
            type,
            limit,
            offset
        }
    })
}

//获取歌单详情接口
export const getListDetail = (id) => {
        return request({
            method: 'get',
            url: '/playlist/detail',
            params: {
                id
            }
        })
    }
    //获取歌曲评论接口
export const getComment = (id) => {
        return request({
            method: 'get',
            url: '/comment/music',
            params: {
                id
            }
        })
    }
    //获取热评接口
export const getHotComment = (id, type) => {
    return request({
        method: 'get',
        url: '/comment/hot',
        params: {
            id,
            type
        }
    })
}

//获取最新评论接口
export const getNewComment = (id, limit, offset) => {
    return request({
        method: 'get',
        url: '/comment/playlist',
        params: {
            id,
            limit,
            offset
        }
    })
}

//获取mv接口
export const getMvDetail = (id) => {
    return request({
        method: 'get',
        url: '/mv/url',
        params: {
            id
        }
    })
}

//获取mv详情接口
export const getMvsDetails = (mvid) => {
    return request({
        method: 'get',
        url: '/mv/detail',
        params: {
            mvid
        }
    })
}

//获取mv评论接口
export const getMvsComment = (id, limit, offset) => {
    return request({
        method: 'get',
        url: '/comment/mv',
        params: {
            id,
            limit,
            offset
        }
    })
}

//获取相关mv接口
export const getSiMiMvs = (mvid) => {
    return request({
        method: 'get',
        url: '/simi/mv',
        params: {
            mvid
        }
    })
}

//获取mv评论列表接口
export const getMvsList = (id, limit, offset) => {
    return request({
        method: 'get',
        url: '/comment/mv',
        params: {
            id,
            limit,
            offset
        }
    })
}