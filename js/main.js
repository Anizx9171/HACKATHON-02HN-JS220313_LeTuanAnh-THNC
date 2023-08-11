let students = [
    { id: 1 + Math.round(Math.random() * 1000000), name: "Lê Tuấn rnh", email: "anizx9171@gmail.com", phone: '0398205122', country: 1024, gender: "Nam" },
    { id: 1 + Math.round(Math.random() * 1000000), name: "Lê Tuấn dnh", email: "anizx9171@gmail.com", phone: '0198205122', country: 1024, gender: "Nam" },
    { id: 1 + Math.round(Math.random() * 1000000), name: "Lê Tuấn anh", email: "anizx9171@gmail.com", phone: '0598205122', country: 1024, gender: "Nam" },
];

let nameStudent = document.getElementById("name")
let emailStudent = document.getElementById("email")
let phoneStudent = document.getElementById("phoneNumber")
let country = document.getElementById("Countryside")

//Vẽ
function printStudent(arr) {
    let str = ""
    arr.forEach((value) => {
        return str += `<tr>
                    <td>${value.id}</td><td>${value.name}</td><td>${value.email}</td>
                    <td>${value.phone}</td><td>${value.country}</td><td>${value.gender}</td>
                    <td class="acction">
                        <a onclick="editStudent(${value.id})">Edit</a> | <a onclick="deleteStudent(${value.id})">Delete</a>
                    </td>
                </tr>`
    })
    document.querySelector("tbody").innerHTML = ""
    document.querySelector("tbody").innerHTML = str
}

printStudent(students)

let indexUpdateGlobal = null;

//xóa studen
function deleteStudent(id) {
    let index = students.findIndex((value) => value.id == id)
    students.splice(index, 1)
    printStudent(students)
}

//lấy id update và hiện giá trị lên ô input
function editStudent(id) {
    let indexEdit = students.findIndex((e) => { return e.id == id })
    console.log(indexEdit);
    if (indexEdit > -1) {
        console.log(students[indexEdit].name);
        indexUpdateGlobal = indexEdit
        nameStudent.value = students[indexEdit].name
        emailStudent.value = students[indexEdit].email
        phoneStudent.value = students[indexEdit].phone
        country.value = students[indexEdit].country
    }
}

//Thêm mới + update
document.getElementById("form_push").addEventListener("submit", function (event) {
    event.preventDefault()

    //Lấy giá trị ô radio
    let gender
    let radio = document.getElementsByName("gender");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked === true) {
            gender = radio[i].value;
        }
    }

    // sửa
    if (indexUpdateGlobal != null) {
        students[indexUpdateGlobal].name = nameStudent.value,
            students[indexUpdateGlobal].email = emailStudent.value,
            students[indexUpdateGlobal].phone = phoneStudent.value,
            students[indexUpdateGlobal].country = country.value,
            students[indexUpdateGlobal].gender = gender,
            printStudent(students)
        indexUpdateGlobal = null
        this.reset()
        return
    }

    //them mới
    let idauto = 1 + Math.round(Math.random() * 1000000)
    let newStudent = {
        id: idauto,
        name: nameStudent.value,
        email: emailStudent.value,
        phone: phoneStudent.value,
        country: country.value,
        gender: gender,
    }
    students.push(newStudent)
    printStudent(students)
    this.reset()
})

//Tìm kiếm 
function search() {
    // lấy chữ từ ô tìm kiếm
    const textSearch = document.getElementById("search_input").value
    // dùng filter lọc ra những đứa có tên mà trong tên có chữ giống với chữ cần tìm bằng includes, 
    const filterStudent = students.filter(student => student.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    // vẽ lại mảng
    printStudent(filterStudent)
}

// Xếp theo alpha b
function arrange() {
    students.sort((a, b) => a.name.localeCompare(b.name))
    printStudent(students)
}