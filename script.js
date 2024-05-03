document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    const studentRecords = document.getElementById('studentRecords');

    function renderStudentRecords() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        studentRecords.innerHTML = '';
        students.forEach(function (student, index) {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student');
            studentDiv.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>ID:</strong> ${student.id}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Contact No.:</strong> ${student.contactNo}</p>
        <button class="editButton" data-index="${index}">Edit</button>
        <button class="deleteButton" data-index="${index}">Delete</button>
      `;
            studentRecords.appendChild(studentDiv);
        });
    }

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const student = {
            name: formData.get('studentName'),
            id: formData.get('studentID'),
            email: formData.get('email'),
            contactNo: formData.get('contactNo')
        };
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudentRecords();
        registrationForm.reset();
    });

    studentRecords.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteButton')) {
            const index = event.target.dataset.index;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            renderStudentRecords();
        }
        if (event.target.classList.contains('editButton')) {
            const index = event.target.dataset.index;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            const student = students[index];
            registrationForm.elements['studentName'].value = student.name;
            registrationForm.elements['studentID'].value = student.id;
            registrationForm.elements['email'].value = student.email;
            registrationForm.elements['contactNo'].value = student.contactNo;
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            renderStudentRecords();
        }
    });

    renderStudentRecords();
});