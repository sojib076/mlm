
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const User = require('../dbSchema/userSchema');
const alluser = mongoose.model('user', User);
const bcrypt = require('bcryptjs');


// Create a function to find a child user with less than 4 children
async function findChild(parentUser) {
  const children = parentUser.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].children.length < 4) {
      return children[i];
    }
  }
  return null;
}

router.post('/', async (req, res) => {
  const hasdPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const newuser = new alluser({
      name: req.body.name,
      password: hasdPassword,
      email: req.body.email,
    });
    const parentUser = await alluser.findOne({ sponid: 'ref100' });
    if (parentUser.children.length < 4) {
      parentUser.children.push(newuser);
      await parentUser.save();
      return res.status(200).json({ message: 'Child user created', data: parentUser });
    } else {
      let currentuser= parentUser;
      for (let i = 0; i < currentuser.children.length; i++) {
        const childUser = parentUser.children[i];
        if (childUser.children.length < 4) {
          childUser.children.push(newuser);
          await parentUser.save();
          return res.status(200).json({ message: 'Child user created fsdfd', data: childUser });
        }else{
           const currentuser =parentUser.children;
            for (let i = 0; i < currentuser.length; i++) {
            const childUser = currentuser[i];
            console.log(childUser);
            }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
// const user = new alluser({
//   name: req.body.name,
//   password: req.body.password,
//   email: req.body.email,
// });
// user.save()
// res.status(200).json({
//   message: 'User created',
// });