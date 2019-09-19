$(document).ready(function () {
	
	getEmployees();
	$("#newEmpBtn").on("click", function (e) {
		// toggle new employee buttons
		$("#newForm").toggle();
	});
	// Read all employees
	function getEmployees() {
		$('#employeeBody').html('');
		$.ajax({
			url: 'http://localhost:3000/employees',
			method: 'GET',
			dataType: 'json',
			data: {
				test: 'test data'
			},
			success: function (data) {
				$(data).each(function (i, employee) {
					$('#employeeBody').append($("<tr>")
						.append($("<td>").append(employee.id))
						.append($("<td>").append(employee.name))
						.append($("<td>").append(employee.bank_name))
						.append($("<td>").append(employee.account_number))
						.append($("<td>").append(employee.qualification))
						.append($("<td>").append(employee.designation))
						.append($("<td>").append(employee.level))
						.append($("<td>").append(`${employee.salary}`))
						.append($("<td>").append(employee.payment_status))
						.append($("<td>").append(`
					<i class = "far fa-edit editEmp" data-empid="` + employee.id + `"></i>
					<i class = "fas fa-trash deleteEmp" data-empid="` + employee.id + `"></i>
										`)));
				});
				loadButtons();
			},
			error: function () {
				alert('error loading employees')
			}
		});
	}
	function searchEmployee(){
		$("#search-box").on("keyup",function(){
			var value = $(this).val().toLowerCase();
			$("#employeeBody").filter(function(){
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	}
	// Get one employee
	function getOneEmployee(num) {
	
		$.ajax({
			url: 'http://localhost:3000/employees/' +num,
			method: 'GET',
			dataType: 'json',
			success: function (data) {
				$($("#updateForm")[0].updateEmpId).val(data.id);
				$($("updateForm")[0].updateName).val(data.name);
				$($("updateForm")[0].updateBank).val(data.bank_name);
				$($("updateForm")[0].updateAcct).val(data.account_number);
				$($("updateForm")[0].updateDes).val(data.designation);
				$($("updateForm")[0].updateLevel).val(data.level);
				$($("updateForm")[0].updateSalary).val(data.salary);
				$($("updateForm")[0].updatePayStat).val(data.payment_status);
				$("#updateForm").show();

			},
			error: function () {
				alert('error getting one employee')
			}
		});
	}
	$("#submitEmployee").on("click", function (e) {
		let data = {
			id: $($("#newForm")[0].empId).val(),
			name: $($("#newForm")[0].name).val(),
			bank_name: $($("#newForm")[0].bank).val(),
			account_number: $($("#newForm")[0].acct).val(),
			qualification: $($("#newForm")[0].qualif).val(),
			designation:$($("#newForm")[0].des).val(),
			level: $($("#newForm")[0].level).val(),
			salary: $($("#newForm")[0].salary).val(),
			payment_status: $($("#newForm")[0].payStat).val()
		}
		postEmployee(data);
		$("#newForm").trigger("reset");
		$("#newForm").toggle();
		e.preventDefault();
	});

	function postEmployee(data) {
		
		$.ajax({
			url: 'http://localhost:3000/employees',
			method: 'POST',
			dataType: 'json',
			data: data,
			success: function (data) {
				console.log(data);
				//the function below is called to refresh the table
				getEmployees();
			},
			error: function () {
				alert('error adding employee')
			}

		});
	}
	// function for loading buttons and attaching it to each employee's id
	function loadButtons() {
		$(".editEmp").click(function (e) {
			getOneEmployee($($(this)[0]).data("empId"));
			e.preventDefault();
		});
		$(".deleteEmp").click(function (e) {
			deleteEmployee($($(this)[0]).data("empid"));
			e.preventDefault();
		});
	}
	//update employee function
	function putEmployee(num, data) {
		num = $("#updateEmpId").val();
		$.ajax({
			url: 'http://localhost:3000/employees/' +num,
			method: 'PUT',
			dataType: 'json',
			data: data,
			success: function (data) {
				console.log(data);
				getEmployees();
			},
			error: function () {
				alert('error updating employee');
			}
		});
	}
	$("#updateEmployee").on("click",function(e){
		let data = {
			id: $($("#updateForm")[0].updateEmpId).val(),
			name: $($("#updateForm")[0].updateName).val(),
			bank_name: $($("#updateForm")[0].updateBank).val(),
			account_number: $($("#updateForm")[0].updateAcct).val(),
			qualification: $($("#updateForm")[0].updateQualif).val(),
			designation:$($("#updateDes")[0].updateDes).val(),
			level: $($("#updateForm")[0].updateLevel).val(),
			salary: $($("#updateForm")[0].updateSalary).val(),
			payment_status: $($("#updateForm")[0].updatePayStat).val()
		}
		putEmployee($($("#updateForm")[0].empId).val(),data);
		$("#updateForm").trigger("reset");
		$("#updateForm").toggle();
	});
	function deleteEmployee(num) {
		$.ajax({
			url: 'http://localhost:3000/employees/' + num,
			method: 'DELETE',
			dataType: 'json',
			success: function (data) {
				alert('employee deleted successfully!')
				console.log(data);
				getEmployees();
			},
			error:function(){
				alert('error deleting employee');
			}

		});
	}
});