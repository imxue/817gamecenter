import request from '../utils/request'

// 线路类型
export const getLineType = (param)=> {
    return request({
        url:"/server_management/line_type/getall",
        method: "get",
        data:param
    })
}

export const addLineType = (param)=> {
    return request({
        url:"/server_management/line_type/add",
        method: "post",
        data:param
    })
}

export const editLineType = (param)=> {
    return request({
        url:"/server_management/line_type/edit",
        method: "post",
        data:param
    })
}

 //服务器分组
export const getBTServerGroup = (param)=> {
    return request({
        url:"server_management/bt_server_group/getall",
        method: "get",
        data:param
    })
}
export const addBTServerGroup = (param)=> {
    return request({
        url:"server_management/bt_server_group/add",
        method: "post",
        data:param
    })
}
export const editBTServerGroup = (param)=> {
    return request({
        url:"server_management/bt_server_group/edit",
        method: "post",
        data:param
    })
}

export const getBTServer = ({offset,limit,type,groupid,linetypeid,ip})=> {
    return request({
        url:`server_management/bt_server/getall?offset=${offset}&limit=${limit || ''}&orderby&type=${type}&groupid=${groupid  || ''}&linetypeid=${linetypeid  || ''}&ip=${ip  || ''}`,
        method: "get",
    })
}

export const addBTServer = (param)=> {
    return request({
        url:`server_management/bt_server/add`,
        method: "post",
        data:param
    })
}
export const editBTServer = (param)=> {
    return request({
        url:`server_management/bt_server/edit`,
        method: "post",
        data:param
    })
}

export const setRunConfig = (param)=> {
    return request({
        url:`/server_management/bt_server/setRunConfig`,
        method: "post",
        data:param
    })
}
// 做种服务器配置
export const getDoSeedServer = (offset,limit,orderby,linetypeid,ip)=> {
    return request({
        url:`/server_management/do_seed_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&linetypeid=${linetypeid || ''}&ip=${ip || ''}`,
        method: "get",
    })
}
// 添加做种服务器
export const addDoSeedServer = (param)=> {
    return request({
        url:`/server_management/do_seed_server/add`,
        method: "post",
        data:param
    })
}
// 启用
export const enableDoSeedServer = (param)=> {
    return request({
        url:`/server_management/do_seed_server/enable`,
        method: "post",
        data:param
    })
}

export const disenableDoSeedServer = (param)=> {
    return request({
        url:`/server_management/do_seed_server/disable`,
        method: "post",
        data:param
    })
}

export const getbtClientConfig = ()=> {
    return request({
        url:`/server_management/bt_client_config/getall`,
        method: "get",
    })
}
// 获取
export const getbtTracker = (offset,limit,orderby,type,linetypeid,ip)=> {
    return request({
        url:`/server_management/bt_tracker/getall?offset=${offset}&limit=${limit}&orderby=${orderby || ''}&type=${type || ''}&linetypeid=${linetypeid || ""}&ip=${ip || ''}`,
        method: "get",
    })
}

// 获取
export const addbtTracker = (param)=> {
    return request({
        url:`/server_management/bt_tracker/add`,
        method: "post",
        data:param
    })
}

// 编辑tracker
export const editbtTracker = (param)=> {
    return request({
        url:`/server_management/bt_tracker/edit`,
        method: "post",
        data:param
    })
}

// 获取
export const getFtpServer = (offset,limit,orderby,linetypeid,ip)=> {
    return request({
        url:`/server_management/ftp_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby || ''}&linetypeid=${linetypeid || ''}&ip=${ip || ''}`,
        method: "get",
    })
}

// add Ftp
export const addFtpServer = (param)=> {
    return request({
        url:`/server_management/ftp_server/add`,
        method: "post",
        data:param
    })
}
// add Ftp
export const editFtpServer = (param)=> {
    return request({
        url:`/server_management/ftp_server/edit`,
        method: "post",
        data:param
    })
}



export const getClusterLginServer = (offset,limit,orderby,linetypeid,ip)=> {
    return request({
        url:`/server_management/cluster_login_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby  ||''}&linetypeid=${linetypeid || ''}&ip=${ip || ''}`,
        method: "get",
    })
}

export const addClusterLginServer = (params)=> {
    return request({
        url:`/server_management/cluster_login_server/add`,
        method: "post",
        data:params
    })
}
export const editClusterLginServer = (params)=> {
    return request({
        url:`/server_management/cluster_login_server/edit`,
        method: "post",
        data:params
    })
}


// 获取地区 ip
export const getarea = (param)=> {
    return request({
        url:`base_setting/area_code/getall`,
        method: "get",
        data:param
    })
}