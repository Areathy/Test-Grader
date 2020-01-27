var schoolGrade = [];

function collectData() {
    let regNumber = document.getElementById("regnumber").value;
    let studentName = document.getElementById("sname").value;
    let testScore = document.getElementById("testscore").value;
    let examScore = document.getElementById("examscore").value;
    let editData = document.getElementById("edit-data").value;

    let totalScore = parseInt(testScore) + parseInt(examScore);
    if (regNumber === "" || studentName === "" || testScore === "" || examScore === "" || totalScore === "") {
        return document.querySelector(".error").textContent = "Some fields are missing"
    }

    regNumber = regNumber.trim()
    studentName = studentName.trim()
    testScore = testScore.trim()
    examScore = examScore.trim()
    let splitName = studentName.split(" ")
    if (splitName.length !== 2) {
        return document.querySelector(".error").textContent = "First and Last Name Required"
    } else {
        document.querySelector(".error").textContent = " "
    }

    // check reg number
    let checkReg = schoolGrade.filter(e => e.regnumber === regNumber)
    if (editData === "" && checkReg.length > 0) {
        return document.querySelector(".error").textContent = "Reg no already exist"
    }


    let students = {
        regnumber: regNumber,
        sname: studentName,
        testscore: testScore,
        examscore: examScore,
        totalscore: totalScore,
        grade: function () {
            if (totalScore >= 75 && totalScore <= 100) {
                regstn = "A"
            } else if (totalScore >= 65 && totalScore <= 74) {
                regstn = "B"
            } else if (totalScore >= 50 && totalScore <= 64) {
                regstn = "C"
            } else if (totalScore >= 45 && totalScore <= 49) {
                regstn = "D"
            } else if (totalScore >= 40 && totalScore <= 44) {
                regstn = "E"
            } else if (totalScore >= 0 && totalScore <= 39) {
                regstn = "F"
            } else {
                regstn = "Not Applicable!"
            }
            return regstn;
        }
    };


    if (editData !== "") {
        let checkReg = schoolGrade.filter((e, i) => {
            schoolGrade[i].sname = studentName
            schoolGrade[i].testscore = testScore
            schoolGrade[i].examscore = examScore
            schoolGrade[i].totalscore = totalScore
            schoolGrade[i].grade = () => students.grade()
        })
        let allInput = document.querySelectorAll('input')
        allInput.forEach(e => {
            e.value = ''
        })
        editData = ''
        return

    }
    editData = ''

    schoolGrade.push(students);
    let allInput = document.querySelectorAll('input')
    allInput.forEach(e => {
        e.value = ''
    })



    document.getElementById("table1").innerHTML = schoolGrade.length;
}



function viewGrade() {
    document.getElementById("table2").innerHTML = ""
    var limit = schoolGrade.length;
    var table = document.createElement("table");
    var row = table.insertRow();
    let cellHeadReg = row.insertCell();
    cellHeadReg.innerHTML = "<b>" + "Registration No" + "</b>"
    let cellSname = row.insertCell();
    cellSname.innerHTML = "<b>" + "Student Name" + "</b>"
    let cellTscore = row.insertCell();
    cellTscore.innerHTML = "<b>" + "Test Score" + "</b>"
    let cellEscore = row.insertCell();
    cellEscore.innerHTML = "<b>" + "Exam Score" + "</b>"
    let cellTotalscore = row.insertCell();
    cellTotalscore.innerHTML = "<b>" + "Total Score" + "</b>"
    let cellGrade = row.insertCell();
    cellGrade.innerHTML = "<b>" + "Grade" + "</b>" + "<br>"
    let cellEdit = row.insertCell();
    cellEdit.innerHTML = "<b>" + "Action" + "</b>" + "<br>"
    row = table.insertRow();

    for (var i = 0; i < limit; i++) {
        let cellregno = row.insertCell();
        cellregno.innerHTML = schoolGrade[i].regnumber
        let cellsname = row.insertCell();
        cellsname.innerHTML = schoolGrade[i].sname
        let celltestscore = row.insertCell();
        celltestscore.innerHTML = schoolGrade[i].testscore
        let cellexam = row.insertCell();
        cellexam.innerHTML = schoolGrade[i].examscore
        let celltot = row.insertCell();
        celltot.innerHTML = schoolGrade[i].totalscore
        let cellgrade = row.insertCell();
        cellgrade.innerHTML = schoolGrade[i].grade()
        let edit = document.createElement("button")
        edit.type = "button"
        edit.textContent = "Edit"
        edit.className = "editt"
        edit.id = schoolGrade[i].regnumber
        let remove = document.createElement("button")
        remove.type = "button"
        remove.textContent = "Delete"
        remove.className = "deletee"
        remove.id = schoolGrade[i].regnumber
        let celledit = row.insertCell();
        celledit.appendChild(edit)
        celledit.appendChild(remove)
        row = table.insertRow();
    }
    document.getElementById("table2").appendChild(table)

    let deleteBtn = document.querySelectorAll(".deletee")
    for (let i of deleteBtn) {
        i.onclick = (e) => {
            let clickId = e.target.id
            schoolGrade = schoolGrade.filter(e => e.regnumber !== clickId)
            viewGrade()
        }
    }

    let editBtn = document.querySelectorAll(".editt")
    for (let i of editBtn) {
        i.onclick = (e) => {
            let clickId = e.target.id
            let editRecord = schoolGrade.filter(e => e.regnumber === clickId)
            document.getElementById("edit-data").value = clickId
            document.getElementById("regnumber").value = editRecord[0].regnumber
            document.getElementById("sname").value = editRecord[0].sname
            document.getElementById("testscore").value = editRecord[0].testscore
            document.getElementById("examscore").value = editRecord[0].examscore
        }
    }

}