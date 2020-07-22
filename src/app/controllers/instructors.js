const { age, date } = require('../../lib/utils');

module.exports = {
	index(req, res) {
		return res.render('instructors/index');
	},
	create(req, res) {
		return res.render('instructors/create');
	},
	post(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}

		let { avatar_url, birth, name, services, gender } = req.body;

		return;
	},
	show(req, res) {
		// req.query = is any query parameters.
		// req.body = is the actual body of the request
		// req.params = is route parameters. Can catch more than one

		return;
	},
	edit(req, res) {
		return;
	},
	put(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}

		let { avatar_url, birth, name, services, gender } = req.body;

		return;
	},
	delete(req, res) {
		return;
	},
}
