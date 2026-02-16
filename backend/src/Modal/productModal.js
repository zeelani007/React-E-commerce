import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    keyfeatures: { type: String },
    brand: { type: String },
    productcode: { type: String },
    sku: { type: String },

    // Pricing
    new_price: { type: Number },
    old_price: { type: Number },
    discount: { type: String },

    // Classification
    category: { type: String },
    subcategory: { type: String },
    gender: { type: String },
    type: { type: String },

    // Inventory
    hsn: { type: Number },
    stock: { type: Number },
    netqty: { type: String },
    size: { type: String },
    color: { type: String },

    // Material & Build
    primarymaterial: { type: String },
    durability: { type: String },

    // Safety & Compliance
    safetycompliance: { type: String },
    returnpolicy: { type: String },

    // Assembly & Parts
    assemblyrequired: { type: String },
    removableparts: { type: String },
    numberofcomponents: { type: String },
    contentinside: { type: String },

    // Cleaning & Maintenance
    cleaning: { type: String },

    // Electronics
    bluetooth: { type: String },
    batteryoperated: { type: String },
    warranty: {type: String},

    // Physical Details
    weight: { type: String },

    // Images
    image: [
      {
        url: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

const productModal = mongoose.model('products', productSchema);

export default productModal;
