const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
    try {
        const { title, ImageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body
        if (!title || !coords) {
            return res.status(404).send({
                success: false,
                message: 'please provide title and address',
            });

        }
        const newResturant = new resturantModel({ title, ImageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
        await newResturant.save();
        res.status(200).send({
            success: true,
            message: 'New Resturant Create SuccessFully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in create user REST Api',
            error
        })

    }


}
const getresturantdata = async (req, res) => {
    try {
        const resturant = await resturantModel.find({})
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: 'no resturant Avalible'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturant.length,
            resturant
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'this is worrong '
        })

    }

}
const getByIdResturantData = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            res.status(404).send({
                success: false,
                message: 'Please proviud the Currect Id'
            })
        }
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            res.status(404).send({
                success: false,
                message: 'no resturant found',
            })
        }
        res.status(200).send({
            success: true,
            resturant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'this not working the API'
        })

    }
}

// delet resturantDatata 
const deletResturantData = async (req, res) => {
    try {
        const resturantDelete = req.params.id
        if (!resturantDelete) {
            return res.status(404).send({
                success: false,
                message: 'Please Enter the Id'
            })
        }
        const resturantById = await resturantModel.findByIdAndDelete(resturantDelete);
        if (!resturantById) {
            res.status(404).send({
                success: false,
                message: 'no resturant found',
            })
        }
        res.status(200).send({
            success: true,
            message: "successfull Deleted data"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'NOt Working the API'
        })

    }


}
module.exports = {
    createResturantController,
    getresturantdata,
    getByIdResturantData,
    deletResturantData
}