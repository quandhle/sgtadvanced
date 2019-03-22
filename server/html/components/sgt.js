class SGT_template{
	constructor(elementConfig){
		this.domElements = elementConfig;
		this.createdStudents = {};
		this.key = 1;
		this.id = [];
		this.data = {};
		this.studentAverage = null;

		this.handleCancel = this.handleCancel.bind( this );
		this.createStudent = this.createStudent.bind( this );
		this.handleAdd = this.handleAdd.bind( this );
		this.deleteStudent = this.deleteStudent.bind( this );
		this.handleDataUpdate = this.handleDataUpdate.bind (this);

	}
	
	addEventHandlers(){
		$(this.domElements.addButton).on('click', this.handleAdd);
		$(this.domElements.cancelButton).on('click', this.handleCancel);
	}
	
	clearInputs(){
		this.domElements.nameInput.val('');
		this.domElements.courseInput.val('');
		this.domElements.gradeInput.val('');
	}
	
	handleCancel(){
		this.clearInputs();
	}
	
	handleAdd(){
		var name = this.domElements.nameInput.val();
		var course = this.domElements.courseInput.val();
		var grade = this.domElements.gradeInput.val();

		this.createStudent(name, course, grade);

		this.handleDataUpdate();
 
		this.displayAllStudents();
	}
	
	displayAllStudents(){
		this.domElements.displayArea.empty();
		for (var key in this.data) {
			this.domElements.displayArea.append(this.data[key].render());
		}

		this.displayAverage();
	}
	
	displayAverage(){
		var count = 0;
		var sum = 0;
		for (var key in this.data) {
			sum+=this.data[key].data.grade;
			count++;
		}

		this.domElements.averageArea.text((sum/count).toFixed(2));
	}
	
	createStudent(name, course, grade, id){
		if (!!id && !this.data.id) {
			for (var key in this.data) {
				if (this.data[key].data.id === id) {
					return false;
				}
				break;
			}
			this.data[this.key] = new Student(id, name, course, grade, this.deleteStudent);
			this.key++;
			this.id.push(id);
			return true;
		} else if (!id) {
			var id = 1;
			if (this.id.length !== 0) {
				id = Math.max(...this.id)+1;
			}
			this.data[id] = new Student(id, name, course, grade, this.deleteStudent);
			this.id.push(id);
			this.key++;
			return true
		} else if (!!this.data) {
			return false;
		}
	}
	
	doesStudentExist(id){
		if (this.id.indexOf(id) !== -1) {
			return true
		} else {
			return false
		}
	}
	
	readStudent(id){
		var studentArray = [];
		for (var key in this.data) {
			studentArray.push(this.data[key]);
		}
		if (!!id) {
			for (var i=0; i<studentArray.length; i++) {
				if (studentArray[i].data.id === id) {
					return studentArray[i];
				}
			}
			return false;
		} else {
			return studentArray;
		}
	}
	/* updateStudent - 
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose: 
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params: 
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return: 
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(){
	}

	deleteStudent(id){
		for (var key in this.data) {
			if (this.data[key].data.id === id) {
				this.handleDeleteDataUpdate(this.data[key].data.id);
				delete this.data[key];
				this.displayAverage();
				return true;
			}
		}
		return false;
	}

	handleDataUpdate() {
		$.ajax({
			dataType: 'json',
			data: {
					api_key: 'aLYUe9Ghnr',
					name: this.domElements.nameInput.val(),
					course: this.domElements.courseInput.val(),
					grade: this.domElements.gradeInput.val()
				},
			method: 'post',
			url: '/api/grades',
			success: function(response) {
			}
		});
	}

	getUpdate() {
		$("#displayArea").empty();
		$.ajax({
			dataType: 'json',
			// data: {api_key: 'aLYUe9Ghnr'},
			method: 'get',
			url: 'api/grades',
			success: function(response) {
				for (var i=0; i<response.data.length; i++) {
					SGT.createStudent(response.data[i].name, response.data[i].course, response.data[i].grade, response.data[i].id);
				}
				SGT.displayAllStudents();
				SGT.displayAverage();
				console.log(response);
			}
		})
	}

	handleDeleteDataUpdate(id) {
		$.ajax({
			dataType: 'json',
			url: '/api/grades?student_id='+id,
			method: 'delete',
			success: function(response) {
				console.log(response);
			}
		});
	}
}