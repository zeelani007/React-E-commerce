import Target from "../Modal/TargetModal.js"

// ad target
export const addTarget = async (req, res) => {
    try {
        const {target} = req.body;
        if(!target) {
            return res.status(404).json({message: "Target is required"})
        }
            const existingTarget = await Target.findOne({target});
            if(existingTarget) 
                return res.status(409).json({message: "Target already exists"});
            const targets = new Target({target})
            await targets.save();
            res.status(201).json({message: "Target created", target})
        }
        catch(error) {
            res.status(500).json({message: "Server error", error})
        }
    }

    // get target
    export const getAllTarget = async (req, res) => {
        try {
            const targets = await Target.find().sort({createdAt: -1});
            res.status(200).json({targets})
        }catch(error) {
            res.status(500).json({message: "Server error", error})
        }
    } 

    // delete target
    export const deleteTarget = async (req, res) => {
        try {
            const {id} = req.params
            const targetdelete = await Target.findOneAndDelete({_id: id})
            if(!targetdelete) {
                return res.status(404).json({message: "Target not found"})
            }
            res.status(202).json({message: "Target deleted successfully"})
        } catch(error) {
            res.status(500).json({message: "Failed to delete Target server error", error})
        }
    }


