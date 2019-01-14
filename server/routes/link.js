import Link from '../models/link';
import { responseClient } from '../util';

//get 获取所有链接
exports.getLinkList = (req, res) => {
  let keyword = req.query.keyword || '';
  let type = Number(req.query.type); // 1: 友情链接 2: 博主个人链接 如果是空就是所有的链接
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;
  let conditions = {}; //req
  if (type) {
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = {
        $and: [{ $or: [{ type: type }] }, { $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] }],
      };
    } else {
      conditions = { type };
    }
  } else {
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = { $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] };
    }
  }

  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };

  Link.count(conditions, (err, count) => {
    if (err) {
      console.error('Error:' + err)
    } else {
      responseData.count = count;
      // 待返回的字敦
      let fields = {
        _id: 1,
        name: 1,
        desc: 1,
        type: 1,
        url: 1,
        icon: 1,
        state: 1,
        create_time: 1,
      };
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };
      Link.find(conditions, fields, options, (error, result) => {
        if (err) {
          console.error('Error:' + error)
        } else {
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }
      });
    }
  });
};

//post 添加链接
 exports.addLink = (req, res) => {
	let { name, desc, icon, url, type } = req.body;
	Link.findOne({
		name,
	})
		.then(result => {
			if (!result) {
				let link = new Link({
					name,
					desc,
					icon,
					url,
					type,
				});
				link
					.save()
					.then(data => {
						responseClient(res, 200, 0, '添加成功', data);
					})
					.catch(err => {
						throw err;
					});
			} else {
				responseClient(res, 200, 1, '该链接名已存在');
			}
		})
		.catch(err => {
			responseClient(res);
		});
};
