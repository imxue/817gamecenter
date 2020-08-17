import request from "../utils/request";

// 线路类型
export const getLineType = param => {
  return request({
    url: `/server_management/line_type/getall?offset=${param.offset}&limit=${param.limit}`,
    method: "get",
    data: param
  });
};

export const addLineType = param => {
  return request({
    url: "/server_management/line_type/add",
    method: "post",
    data: param
  });
};

export const editLineType = param => {
  return request({
    url: "/server_management/line_type/edit",
    method: "post",
    data: param
  });
};

//服务器分组
export const getBTServerGroup = param => {
  return request({
    url: `server_management/bt_server_group/getall?offset=${param.offset}&limit=${param.limit}`,
    method: "get"
  });
};
export const addBTServerGroup = param => {
  return request({
    url: "server_management/bt_server_group/add",
    method: "post",
    data: param
  });
};
export const editBTServerGroup = param => {
  return request({
    url: "server_management/bt_server_group/edit",
    method: "post",
    data: param
  });
};

export const getBTServer = ({
  offset,
  limit,
  type,
  groupid,
  linetypeid,
  ip,
  orderby
}) => {
  type = type === 999 ? "" : type;
  return request({
    url: `server_management/bt_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&type=${type}&groupid=${groupid}&linetypeid=${linetypeid}&ip=${ip}`,
    method: "get"
  });
};

export const addBTServer = param => {
  return request({
    url: `server_management/bt_server/add`,
    method: "post",
    data: param
  });
};
export const editBTServer = param => {
  return request({
    url: `server_management/bt_server/edit`,
    method: "post",
    data: param
  });
};
// btserver Runconfig
export const setRunConfig = param => {
  return request({
    url: `/server_management/bt_server/setRunConfig`,
    method: "post",
    data: param
  });
};
export const setBtTrickRunConfig = param => {
  return request({
    url: `/server_management/bt_tracker/setRunConfig`,
    method: "post",
    data: param
  });
};
export const getbtServerRunConfig = serverid => {
  return request({
    url: `/server_management/bt_server/getRunConfig?serverid=${serverid}`,
    method: "GET"
  });
};

// 做种服务器配置
export const getDoSeedServer = ({
  offset,
  limit,
  orderby = "",
  linetypeid = "",
  ip = ""
}) => {
  linetypeid = linetypeid === 0 ? "" : linetypeid;
  return request({
    url: `/server_management/do_seed_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&linetypeid=${linetypeid}&ip=${ip}`,
    method: "get"
  });
};
// 添加做种服务器
export const addDoSeedServer = param => {
  return request({
    url: `/server_management/do_seed_server/add`,
    method: "post",
    data: param
  });
};
// 启用
export const enableDoSeedServer = param => {
  return request({
    url: `/server_management/do_seed_server/enable`,
    method: "post",
    data: param
  });
};

export const disenableDoSeedServer = param => {
  return request({
    url: `/server_management/do_seed_server/disable`,
    method: "post",
    data: param
  });
};

export const getbtClientConfig = () => {
  return request({
    url: `/server_management/bt_client_config/getall`,
    method: "get"
  });
};
export const setbtClientConfig = param => {
  return request({
    url: `/server_management/bt_client_config/setRunConfig`,
    method: "post",
    data: param
  });
};

export const getbtClientRunConfig = () => {
  return request({
    url: `/server_management/bt_client_config/getall`,
    method: "get"
  });
};

// 获取
export const getbtTracker = ({
  offset,
  limit,
  orderby = "",
  type,
  linetypeid = "",
  ip = ""
}) => {
  return request({
    url: `/server_management/bt_tracker/getall?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&type=${type}&linetypeid=${linetypeid || ""}&ip=${ip || ""}`,
    method: "get"
  });
};

// 获取
export const getBtTrackerRunConfig = serverid => {
  return request({
    url: `server_management/bt_tracker/getRunConfig?serverid=${serverid}`,
    method: "get"
  });
};

// 获取
export const addbtTracker = param => {
  return request({
    url: `/server_management/bt_tracker/add`,
    method: "post",
    data: param
  });
};

// 编辑tracker
export const editbtTracker = param => {
  return request({
    url: `/server_management/bt_tracker/edit`,
    method: "post",
    data: param
  });
};

// 获取
export const getFtpServer = ({
  offset,
  limit,
  orderby = "",
  linetypeid = "",
  ip = ""
}) => {
  return request({
    url: `/server_management/ftp_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&linetypeid=${linetypeid}&ip=${ip}`,
    method: "get"
  });
};

// add Ftp
export const addFtpServer = param => {
  return request({
    url: `/server_management/ftp_server/add`,
    method: "post",
    data: param
  });
};
// add Ftp
export const editFtpServer = param => {
  return request({
    url: `/server_management/ftp_server/edit`,
    method: "post",
    data: param
  });
};

export const getClusterLginServer = ({
  offset,
  limit,
  orderby = "",
  linetypeid = "",
  ip = ""
}) => {
  return request({
    url: `/server_management/cluster_login_server/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&linetypeid=${linetypeid}&ip=${ip}`,
    method: "get"
  });
};

export const addClusterLginServer = params => {
  return request({
    url: `/server_management/cluster_login_server/add`,
    method: "post",
    data: params
  });
};
export const editClusterLginServer = params => {
  return request({
    url: `/server_management/cluster_login_server/edit`,
    method: "post",
    data: params
  });
};
// 游戏管理
export const addGameCmpany = params => {
  return request({
    url: `/game_management/game_company/add`,
    method: "post",
    data: params
  });
};
// 游戏管理
export const editGameCmpany = params => {
  return request({
    url: `/game_management/game_company/edit`,
    method: "post",
    data: params
  });
};

export const getGameCompany = param => {
  return request({
    url: `/game_management/game_company/getall?offset=${param.offset}&limit=${param.limit}`,
    method: "get"
  });
};

export const getGameType = param => {
  return request({
    url: `/game_management/game_type/getall?offset=${param.offset}&limit=${param.limit}`,
    method: "get"
  });
};

export const editGameType = params => {
  return request({
    url: `/game_management/game_type/edit`,
    method: "post",
    data: params
  });
};
export const addGameType = params => {
  return request({
    url: `/game_management/game_type/add`,
    method: "post",
    data: params
  });
};

export const addGameblacklist = params => {
  return request({
    url: `/game_management/game_type_blacklist/add`,
    method: "post",
    data: params
  });
};
export const getGameblacklist = () => {
  return request({
    url: `/game_management/game_type_blacklist/getall`,
    method: "get"
  });
};
export const editGameblacklist = params => {
  return request({
    url: `/game_management/game_type_blacklist/getall`,
    method: "get",
    data: params
  });
};

export const getGame = ({ offset, limit, orderby, typeid, firstletter }) => {
  typeid = typeid === 0 ? "" : typeid;
  return request({
    url: `/game_management/game/getall?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&typeid=${typeid || ""}&firstletter=${firstletter || ""}`,
    method: "get"
  });
};
export const addGame = params => {
  return request({
    url: `/game_management/game/add`,
    method: "post",
    data: params
  });
};
export const editGame = params => {
  return request({
    url: `/game_management/game/edit`,
    method: "post",
    data: params
  });
};

export const getGameVersionconfig = ({
  offset,
  limit,
  orderby,
  typeid,
  firstletter
}) => {
  return request({
    url: `/game_management/game_version_config/getall?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&typeid=${typeid || ""}&firstletter=${firstletter || ""}`,
    method: "get"
  });
};
export const addGameVersionconfig = params => {
  return request({
    url: `/game_management/game_version_config/add`,
    method: "post",
    data: params
  });
};
export const editGameVersionconfig = params => {
  return request({
    url: `/game_management/game_version_config/edit`,
    method: "post",
    data: params
  });
};

export const getbtGroupGame = ({
  offset,
  limit,
  orderby,
  typeid,
  firstletter
}) => {
  return request({
    url: `/game_management/bt_group_game/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&typeid=${typeid}&firstletter=${firstletter}`,
    method: "GET"
  });
};

export const allocateGame = params => {
  return request({
    url: `/game_management/bt_group_game/allocate`,
    method: "post",
    data: params
  });
};

export const getServerStatus = () => {
  return request({
    url: `/event_monitoring/server_status/getall`,
    method: "GET"
  });
};

export const getGameStatus = ({
  offset,
  limit,
  orderby,
  state,
  typeid,
  firstletter
}) => {
  state = state === 999 ? "" : state;
  typeid = typeid === 0 ? "" : typeid;
  return request({
    url: `/event_monitoring/game_status/getall?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&state=${state || ""}&typeid=${typeid ||
      ""}&firstletter=${firstletter || ""}`,
    method: "GET"
  });
};

export const getcurrentValidData = () => {
  return request({
    url: `/event_monitoring/current_valid_data/getall`,
    method: "GET"
  });
};

export const getGamedoseedVersion = ({
  offset,
  limit,
  orderby,
  firstletter
}) => {
  return request({
    url: `/event_monitoring/game_doseed_version/getall?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&firstletter=${firstletter || ""}`,
    method: "GET"
  });
};

export const getjsonFileLog = ({
  offset,
  limit,
  orderby,
  startdate,
  enddate,
  status
}) => {
  return request({
    url: `/event_monitoring/json_file_log/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&startdate=${startdate}&enddate=${enddate}&status=${status}`,
    method: "GET"
  });
};
export const getGameById = id => {
  return request({
    url: `/game_management/game/getGameById?center_id=${id}`,
    method: "get"
  });
};
// 获取地区
export const getarea = () => {
  return request({
    url: `base_setting/area_code/getall`,
    method: "get"
  });
};
// 根据ip查询游戏

export const getGameListByIp = ip => {
  return request({
    url: `/base_setting/sysbase/startHttpRequest`,
    method: "post",
    param: ip
  });
};
// 查询已启用的线路类型

export const getAllenabled = () => {
  return request({
    url: `/server_management/line_type/getallenabled`,
    method: "get"
  });
};
// /game_management/game_company/getallenabled
export const getAllGameCompanyenabled = () => {
  return request({
    url: `/game_management/game_company/getallenabled`,
    method: "get"
  });
};

// 查询已启用的Bt分组
export const getAllBtServerGroupenabled = () => {
  return request({
    url: `/server_management/bt_server_group/getallenabled`,
    method: "get"
  });
};
// 查询已启用的游戏分类
export const getAllGameTypeenabled = () => {
  return request({
    url: `/game_management/game_type/getallenabled`,
    method: "get"
  });
};
// 验证 线路名称
export const verifyNameUnique = name => {
  return request({
    url: `/server_management/line_type/verifyNameUnique?name=${name}`,
    method: "get"
  });
};
// /server_management/bt_server_group / verifyNameUnique ? name = 默认

export const verifyBtServerNameUnique = name => {
  return request({
    url: `/server_management/bt_server_group/verifyNameUnique?name=${name}`,
    method: "get"
  });
};

// /server_management/bt_server_group / verifyNameUnique ? name = 默认分组
export const verifyDefaultUnique = () => {
  return request({
    url: `/server_management/line_type/verifyDefaultUnique`,
    method: "get"
  });
};
// /game_management/game_company/verifyNameUnique?name=腾讯

export const verifyGameCompanyUnique = name => {
  return request({
    url: `/game_management/game_company/verifyNameUnique?name=${name}`,
    method: "get"
  });
};
// /game_management/game_type/verifyNameUnique?name=单机游戏

export const verifyGameCompanyGroupUnique = name => {
  return request({
    url: `/game_management/game_type/verifyNameUnique?name=${name}`,
    method: "get"
  });
};
// 127.0.0.1:12830/game_management/game_type/verifyDisplayNameUnique?displayname=单机游戏

export const verifyGameCompanyGroupDisplalyUnique = name => {
  return request({
    url: `/game_management/game_type/verifyDisplayNameUnique?displayname=${name}`,
    method: "get"
  });
};
// /game_management/game/verifyDisplayNameUnique?displayname
export const verifyGameDisplalyUnique = name => {
  return request({
    url: `/game_management/game/verifyDisplayNameUnique?displayname?displayname=${name}`,
    method: "get"
  });
};
export const verifyGameNameUnique = name => {
  return request({
    url: `/game_management/game/verifyNameUnique?name=${name}`,
    method: "get"
  });
};

export const getforcePushPeriod = () => {
  return request({
    url: `/game_management/force_push_period/getall`,
    method: "get"
  });
};

export const addforcePushPeriod = data => {
  return request({
    url: `/game_management/force_push_period/add`,
    method: "post",
    data
  });
};

export const editforcePushPeriod = data => {
  return request({
    url: `/game_management/force_push_period/edit`,
    method: "post",
    data
  });
};

export const getClickEvent = data => {
  return request({
    url: `/event_monitoring/game_click_statistics/getall?offset=${data.offset}&limit=${data.limit}&date=${data.date}&typeid=${data.typeid}&firstletter=${data.firstletter}`,
    method: "get"
  });
};
