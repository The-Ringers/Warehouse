const addEmployee = (req, res) => {
    console.log('hit add employee')
    res.status(200).send()
}

const getEmployees = (req, res) => {
    console.log('hit get employees')
    res.status(200).send()
}

const editEmployee = (req, res) => {
    console.log('hit edit employee')
    res.status(200).send()
}

const deleteEmployee = (req, res) => {
    console.log('hit delete employee')
    res.status(200).send()
}

module.exports = {
    addEmployee,
    getEmployees,
    editEmployee,
    deleteEmployee
}