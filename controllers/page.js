const Page = require('../models/page');
const User = require('../models/user');
async function create(req, res, next) {
  const pageData = req.body;
  const userId = req.user._id;
  pageData.userId = userId;
  if(req.createdAt){
    pageData.createdAt = req.createdAt;
    pageData.updatedAt = Date.now;
  }
  try {
    var page = await Page.create(pageData);
  } catch ({ message }) {
    next({
      status: 400,
      message
    })
  }
  res.json(page);
}

async function getAll(req, res, next) {
  try {
    var pages = await Page.find({})

  } catch ({ message }) {
    return next({
      status: 500,
      message
    })
  }
  res.json(pages)
}

async function getPagesByUserLogin(req, res, next) {
  const { login } = req.params;
  try {

    var user = await User.findOne({ login })
  } catch ({ message }) {
    return next({
      status: 500,
      message
    })
  }
  if(!user){
    return next({
      status: 404,
      message: `User not found`
    })
  }

  try {
    var pages = await Page.find({userId: user._id})
  } catch ({message}) {
    return next({
      status: 500,
      message
    })
  }
  res.json(pages);
}
async function daletePage(req, res, next) {
  const _id  = req.params.id;
  const userId = req.user._id;

  try {
    var page = await Page.findById(_id);
  } catch ({message}) {
    return next({
      status: 500,
      message
    })
  }

  if(!page){
    return next({
      status: 404,
      message: `Page not found`
    })
  } 

  if(userId.toString() !== page.userId.toString()){
    return next({
      status: 403,
      message: `Permission denied`
    })
  }

  try {
    page.remove();
  } catch ({message}) {
    return nex({
      status: 500, 
      message
    })
    
  }
  return res.json({message: 'success'});
}
// async function updatePage(req, res, next) {
//   const _id  = req.params.id;
//   const userId = req.user._id;

//   try {
//     var page = await Page.findById(_id);
//   } catch ({message}) {
//     return next({
//       status: 500,
//       message
//     })
//   }

//   if(!page){
//     return next({
//       status: 404,
//       message: `Page not found`
//     })
//   } 

//   if(userId.toString() !== page.userId.toString()){
//     return next({
//       status: 403,
//       message: `Permission denied`
//     })
//   }

//   try {
//     var created = page.createdAt;
//     page.remove();

//   } catch ({message}) {
//     return nex({
//       status: 500, 
//       message
//     })
    
//   }
//   req.createdAt = created;
//   return create(req,res, next)
// }

module.exports = { create, getAll, daletePage, getPagesByUserLogin }