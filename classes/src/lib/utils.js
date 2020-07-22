module.exports = {
	age(timestamp) { // object name is the function name
		const today = new Date();
		const birthDate = new Date(timestamp);
		
		// 2019 - 1984 = 35
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		
		// 11 - 12 = -1
		// 11 - 11 = 0
		if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
			age = age - 1;
		}
	
		return age;
	},

	date(timestamp) {
		const date = new Date(timestamp);

		// yyyy
		const year = date.getUTCFullYear();
		// mm
		const month = `0${date.getUTCMonth() + 1}`.slice(-2);
		// dd
		const day = `0${date.getUTCDate()}`.slice(-2);

		return {
			day,
			month,
			year,
			/*Format*/ iso: `${year}-${month}-${day}`,
			birthDay: `${day}/${month}`
		};
	}
};

