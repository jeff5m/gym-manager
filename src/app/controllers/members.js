const { age, date } = require('../../lib/utils');
const Member = require('../models/Member')

module.exports = {
	index(req, res) {

		Member.all(function (members) {
			return res.render('members/index', { members });
		})
	},
	create(req, res) {
		Member.instructorsSelectOptions(function(options) {
			return res.render('members/create', { instructorOptions: options });
		})
	},
	post(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}
		
		const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.email,
      date(req.body.birth).iso,
      req.body.blood,
      req.body.weight,
			req.body.height,
			req.body.instructor
		]
		
		Member.create(values, function(member) {
      return res.redirect(`/members/${member.id}`)
		})

	},
	show(req, res) {
		Member.find(req.params.id, function(member) {
			if(!member) return res.send('Member not found')

			member.birth = date(member.birth).birthDay
			
			return res.render('members/show', { member });
		})

	},
	edit(req, res) {
		Member.find(req.params.id, function(member) {
			if (!member) return res.send('Member not found!')

			member.birth = date(member.birth).iso
			
			Member.instructorsSelectOptions(function(options) {
				return res.render('members/edit', { member, instructorOptions: options });
			})
		})

		return;
	},
	put(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}
		
		const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.gender,
      req.body.email,
      req.body.blood,
      req.body.weight,
			req.body.height,
			req.body.instructor,
      req.body.id
		]
		
		Member.update(values, function() {
			return res.redirect(`members/${req.body.id}`)
		})

		return;
	},
	delete(req, res) {
		Member.delete(req.body.id, function() {
			return res.redirect('/members')
		})
		return;
	},
}
