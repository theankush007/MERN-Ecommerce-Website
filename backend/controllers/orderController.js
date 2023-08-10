const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create new order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,

    })

    res.status(201).json({
        success:true,
        order,
    })

});

// Get single Order

exports.getSingleOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email"); // populate function go to user (first argument) schema and take -- name and email and give us
    
    if(!order){
        return next(new ErrorHander("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order,
    })

})



// Get logged in user Order

exports.myOrders = catchAsyncErrors(async (req,res,next)=>{

    const orders = await Order.find({user:req.user._id});


    

    res.status(200).json({
        success:true,
        orders,
    })

})


// Get all Orders --Admin

exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    });


    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})


// update Orders Status --Admin

exports.updateOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id",404));
    }


    if(order.orderStatus==="Delivered"){
        return next(new ErrorHander("You have already deliverd this order",404));
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(o)=>{
            await updateStoke(o.product,o.quantity)
        });
    }

    order.orderStatus = req.body.status;
    
    if(req.body.status==="Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false});



    res.status(200).json({
        success:true,
    })
});



async function updateStoke(id,quantity){
    const product = await Product.findById(id);

    product.Stock-=quantity
    await product.save({validateBeforeSave:false})
}


// delete Orders --Admin
 
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id",404));
    }


    await order.remove()

    res.status(200).json({
        success:true,
    })
})