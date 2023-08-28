const express = require("express")
const restorantController = require('../controllers/restorant.controller');
const reviewController = require("./../controllers/review.controller")

const express = require('express');

const authMiddleware = require("./../middlewares/auth.middlewares")

const restorantMiddleware = require("./../middlewares/restorant.middleware")

const reviewMiddleware = require("./../middlewares/review.middleware")

const router = express.Router();

router
.route("/")
.get(restorantController.findAll)
.post(authMiddleware.protect,
    authMiddleware.restricTo("admin"),
    restorantController.create
    )

router

.route("/:id")
.get(restorantMiddleware.existRestorant,restorantController.findOne)
.patch(restorantMiddleware.existRestorant,authMiddleware.protect,authMiddleware.restricTo("admin"),restorantController.update)
.delete(restorantMiddleware.existRestorant,authMiddleware.protect,authMiddleware.restricTo("admin"),restorantController.delete) 

router.use(authMiddleware.protect)

router.post("/reviews/:id",
restorantMiddleware.existRestorant,
reviewController.create)

router
.use(
    "/reviews/:restorantId/:id", 
    reviewMiddleware.existReview,
    restorantMiddleware.existRestorant
    )
.route("/reviews/:restorantId/:id")
.patch(authMiddleware.protectAdmin,reviewController.update)
.delete(authMiddleware.protectAdmin,reviewController.delete)

module.exports = router