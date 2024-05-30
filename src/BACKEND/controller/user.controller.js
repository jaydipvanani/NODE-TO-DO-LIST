let { userservices } = require("../services")



let adduser = async (req, res) => {


    try {
        let body = req.body;
        console.log("🚀 ~ adduser ~ body:", body)

        let email = body.email;
        let duplicate = await userservices.findemail(email);

        if (duplicate) {
            throw new Error(`${duplicate.email} user allready exist`);
        }

        let result = await userservices.adduser(body);
        console.log("🚀 ~ adduser ~ result:", result)

        if (!result) {
            throw new Error("something went wrong")
        }


        res.status(201).json({
            message: "user create succesfully",
            result,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }



}


let getuser = async (req, res) => {
    let result = await userservices.getuser();
    res.status(200).json({
        message: "user get succesfully",
        result,
    })
}


let deleteuser = async (req, res) => {
    console.log(req.params);
    let { id } = req.params

    let result = await userservices.deleteuser(id)
    res.status(201).json({
        message: "user delete succesfully",
        result,
    })
}

let updateuser = async (req, res) => {
    let { id } = req.params;
    console.log("🚀 ~ updateuser ~ id:", id)
    let body = req.body;
    console.log("🚀 ~ updateuser ~ body:", body)

    let result = await userservices.updateuser(id, body);
    res.status(201).json({
        message: "user update successfully",
        result,
        updatedata: body
    })

}

module.exports = { adduser, getuser, deleteuser, updateuser }

