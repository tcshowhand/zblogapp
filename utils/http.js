import config from '../config.js';

const api = config.domain + '/zb_system/api.php';

const urls = {
  settings: api + '?mod=ytecn&act=info',
  home: api + '?mod=post&act=list&sortby=PostTime&order=desc',
  sortslist: api + '?mod=category&act=list&sortby=Order',
  articleinfo: api + '?mod=post',
  category: api + '?mod=category&act=get',
  smtform: api + '?mod=ytecn&act=smtform',
  asklist: api + '?mod=ytecn&act=asklist',
  askinfo: api + '?mod=ytecn&act=askinfo',
  konglist: api + '?mod=ytecn&act=konglist',
  konginfo: api + '?mod=ytecn&act=konginfo',
  login: api + '?mod=member&act=login',
  pay: api + '?mod=ytecn&act=pay',
  adid: config.adid,
  ad1: config.ad1,
  ad2: config.ad2,
  ad3: config.ad3,
};

export default urls;