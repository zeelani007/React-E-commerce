import express from "express"
const addressRouter = express.Router();

import {
    addAddressItemController,
    getAddressItemController,
    updateAddressItemController,
    deleteAddressItemController
} from "../Controller/AddressController.js";

addressRouter.post('/address', addAddressItemController)
addressRouter.get('/address/:userId', getAddressItemController)
addressRouter.put('/address/:addressId', updateAddressItemController)
addressRouter.delete('/address/:addressId', deleteAddressItemController)


export default addressRouter;