import mongoose from 'mongoose';

let ProductSchema = new mongoose.Schema(
    {
        p_id: Number,
        title: String,
        category: String,
        price: Number,
        description: String,
        image:{
            type:String,
        }
    },
    { timestamps: true },
);

//overriding our id with object id of mongodb object
// ProductSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

const Product = mongoose.model("Product", ProductSchema);
export default Product;