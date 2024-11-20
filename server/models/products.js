const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    catName: {
        type: String,
        default: ''
    },
    catId: {
        type: String,
        default: ''
    },
    subCatId: {
        type: String,
        default: ''
    },
    subCat: {
        type: String,
        default: ''
    },
    subCatName: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        required: true,
    },
    productRam: [
        {
            type: String,
            default: null,
        }
    ],
    size: [
        {
            type: String,
            default: null,
        }
    ],
    productWeight: [
        {
            type: String,
            default: null,
        }
    ],
    location: [
        {
            value: {
                type: String,
            },
            label: {
                type: String,
            }
        },
    ],
    // Dinh dưỡng
    nutritionalInfo: {
        calories:
        {
            type: Number,
            required: false,
            default: ''
        },
        protein:
        {
            type: Number,
            required: false,
            default: ''
        },
        carbohydrates:
        {
            type: Number,
            required: false,
            default: ''
        },
        fat:
        {
            type: Number,
            required: false,
            default: ''
        },
        sugar: {
            type: Number,
            required: false,
            default: ''
        },
        fiber:
        {
            type: Number,
            required: false,
            default: ''
        },
        vitamins:
        {
            type: [String],
            required: false
        },
        minerals:
        {
            type: [String],
            required: false
        },
    },

    // Loại sản phẩm
    productType: {
        type: String,
        enum: ['weight_loss', 'weight_gain', 'muscle_building', 'general_health', 'immune_support', 'vitamin', 'protein'],
        default: 'general_health'
    },

    // Độ tuổi khuyến nghị
    recommendedAge: {
        type: String,
        enum: ['children', 'adults', 'elderly'],
        default: 'adults'
    },

    // Chế độ ăn uống
    dietTypes: {
        type: [String],
        enum: ['vegan', 'vegetarian', 'gluten_free', 'low_carb', 'keto', 'paleo'],
        default: []
    },

    // Tình trạng sức khỏe hỗ trợ
    healthConditionsSupported: {
        type: [String],
        enum: ['diabetes', 'high_blood_pressure', 'cholesterol', 'arthritis', 'heart_disease'],
        default: []
    },

    // Hướng dẫn sử dụng
    usageInstructions: {
        type: String,
        required: false
    },

    // Dị ứng thực phẩm
    allergens: {
        type: [String],
        enum: ['gluten', 'soy', 'dairy', 'nuts', 'egg', 'fish', 'shellfish'],
        default: []
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})


productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
