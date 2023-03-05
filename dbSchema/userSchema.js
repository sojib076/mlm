const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
   
  },
  password: {
    type: String,
   
  },
  children: [
    {
      name: {
        type: String,
       
      },
      email: {
        type: String,
     
      },
      password: {
        type: String,
      
      }, children: [
        {
          name: {
            type: String,
          },
          email: {
            type: String,
           
          },
          password: {
            type: String,
            
          },
          children: [
            {
              name: {
                type: String,
              },
              email: {type: String},
              password: {type: String},
            }
          ]
        }
      ]
     
    }
  ]
});

module.exports = userSchema;
