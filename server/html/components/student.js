class Student{
	constructor(id, name, course, grade, deleteCallback=()=>{}){
		this.data = {
			id: id,
			name: name,
			course: course,
			grade: parseInt(grade)
		}
		this.deleteCallback = deleteCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operations: null,
			deleteButton: null
		}

		this.handleDelete = this.handleDelete.bind( this );
	}
	
	update(key, value){
		if (this.data[key]) {
			if (!isNaN(value)) {
				this.data[key] = parseFloat(value);
				this.domElements[key] = parseFloat(value);
			} else {
				this.data[key] = value;
				this.domElements[key] = value;
			}
		}
		$("td:nth-child(1)").text(this.domElements.name);
		$("td:nth-child(2)").text(this.domElements.course);
		$("td:nth-child(3)").text(this.domElements.grade);
		
	}
	
	getData(){
		return this.data;
	}
	
	render(){
		this.domElements.name = this.data.name;
		this.domElements.grade = this.data.grade;
		this.domElements.course = this.data.course;
		this.domElements.row = $("<tr>").append($("<td>").text(this.domElements.name))
			.append($("<td>").text(this.domElements.course))
			.append($("<td>").text(this.domElements.grade))
			.append($("<td>")
				.append($("<button>").text('delete')
					.on('click', this.handleDelete)));
		return this.domElements.row;
	}
	
	handleDelete(){
		this.domElements.row.remove();
		this.deleteCallback(this.data.id);
	}
}