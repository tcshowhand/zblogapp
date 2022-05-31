import config from '../config.js';

const api = config.domain + '/zb_system/api.php';

const urls = {
  settings: api + '?mod=ytecn&act=info',
  home: api + '?mod=ytecn&act=list&sortby=PostTime&order=desc',
  sortslist: api + '?mod=ytecn&act=clist&sortby=Order',
  articleinfo: api + '?mod=post',
  category: api + '?mod=category&act=get',
  smtform: api + '?mod=ytecn&act=smtform',
  asklist: api + '?mod=ytecn&act=asklist',
  askinfo: api + '?mod=ytecn&act=askinfo',
  konglist: api + '?mod=ytecn&act=konglist',
  konginfo: api + '?mod=ytecn&act=konginfo',
  login: api + '?mod=member&act=login',
  pay: api + '?mod=ytecn&act=pay',
  cancelask: api + '?mod=ytecn&act=cancelask',
};

export default urls;